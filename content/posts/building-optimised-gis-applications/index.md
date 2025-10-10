---
author: "Andryo Marzuki"
title: "Performant Spatial Apps with PostGIS: 8 Years of Head‑Banging"
date: "2025-09-28"
slug: "building-high-performance-spatial-apps"
aliases:
    - "/posts/building-optimised-gis-applications/"
description: "Practical strategies to make GIS apps fast: spatial indexing, ST_Subdivide, partitioning, vector tiles (MVT), caching, and React MapLibre layering with Django/PostGIS."
categories:
    - Geospatial
    - Engineering
    - Backend
tags:
    - GIS
    - PostGIS
    - MapLibre
    - Vector Tiles
    - MVT
    - Django
    - Python
    - Spatial Indexing
    - Performance
    - Caching
keywords:
    - postgis performance
    - maplibre vector tiles
    - mvt tiles postgis
    - spatial indexing gist sp-gist
    - st_subdivide postgis
    - django gis
    - react maplibre
    - vector tiles caching
    - partitioned tables postgresql
    - gis query optimization
canonicalURL: "https://mrzk.io/posts/building-high-performance-spatial-apps/"
draft: false
---


If you've read the title of the post and actually clicked this post I'm going to make an assumption that you are already someone who has technical knowledge in this domain, as such, this post will be quite technical and go into some of the most important things I've learnt over the last eight years.

Modern spatial applications face unique challenges when dealing with large geospatial datasets, real-time mapping interfaces, and complex spatial queries. In other words, it can often be an _extreme_ pain in the ass to get things working smoothly.  In retrospect, I've spent an embarrassing amount of time wrestling with spatial web applications. What started as a small side-project turned into a career, and finally into what I can only describe as a love-hate relationship with anything involving coordinates and polygons.

The most frustrating theme I encountered during this journey was just how opaque (or out of date) everything seemed to be. You'd think after decades of people building mapping applications, there would be comprehensive guides on how to make them not perform like absolute rubbish. Instead, you get fragments of knowledge scattered across blog posts, Stack Overflow answers, and the occasional conference talk that leaves you with more questions than answers (or worse yet, _"edit: nvm fixed it"_).

The spatial development community seems to have this unspoken agreement that everyone should figure things out the hard way. However, I've never been one to gatekeep information, so this post will attempt to document everything I wish someone had told me when I first started building spatial applications that needed to handle more than a dozen points without bringing the browser to its knees.

---

**Preamble**

* My experience has been using PostGIS as my spatial database and various ORMs as my server, however, most of my examples will show Django examples when showing pseudo/boilerplate code. 
* The database of your web application is incredibly important as it's what you'll want to use as the main backbone of any spatial functionality or activity. For example, if you have the ability to directly serve spatial tables already rendered as GeoJSON or MVT, you should do that. Whilst you can use your application layer to do some manipulation, it will be infinitely slower than leveraging your database.

* For all of the suggestions/tricks in this post, you'll need to do the mental calculus whether or not the benefits from introducing some of these tweaks is greater than the introduced complexity overhead.

---

## TL;DR

- Index properly: GiST for polygons/complex geometries, SP‑GiST for large clustered points. Use compound indexes when filtering by attributes + geometry.
- Optimize queries early: use bbox predicates first (`&&`), avoid unnecessary `ST_Transform` on indexed columns, and `EXPLAIN` regularly.
- Subdivide big geometries: `ST_Subdivide` during ETL to let the planner prune quickly; keep originals only if you need perfect visuals.
- Partition large tables: choose keys that match common filters so the planner prunes partitions; keep constraints and indexes tight.
- Serve MVT from PostGIS: generate tiles in the DB (`ST_AsMVTGeom`/`ST_AsMVT`), and cache aggressively.
- Frontend sanity: use MapLibre “overlay anchors” to control layer order; push heavy serialization to the client only when clustering demands it.

## Spatial Indexing Strategy

The foundation of any high-performance spatial application lies in proper spatial indexing. Like any index, spatial indexes are way for your database to effectively filter our large volumes of irrelevant rows, it does this by creating a bounding box over a geometry.

![_images/bbox.png](https://postgis.net/workshops/postgis-intro/_images/bbox.png)

PostGIS provides several indexing options, each suited for different use cases:

```sql
-- Standard GiST spatial index for general geometry queries
CREATE INDEX idx_spatial_geom ON spatial_table USING GIST(geom);

-- Compound indexes for filtered spatial queries
CREATE INDEX idx_spatial_type_geom ON spatial_table USING GIST(category_id, geom);

-- SP-GiST for point data with natural clustering
CREATE INDEX idx_points_spgist ON point_table USING SPGIST(location);
```

**Key Principles:**

- Use GiST indexes for polygons and complex geometries
- Consider SP-GiST for point datasets with natural clustering patterns
- Create compound indexes when filtering by attributes and geometry together
- Monitor index usage and rebuild when fragmentation occurs

 **Gotchas:**

* Don't assume that a simple geometry can be effectively indexed. If, for example, you have a very large square across the entire country, that index is essentially useless. 
* Watch your projections, if you're using an `ST_Transform` in a query and the index of the geometry column has been done in the original projection, that spatial index will not be used.

_**When to use / Trade‑offs**: Always index geometry columns used for spatial predicates; compound indexes help mixed filters but increase write cost and disk usage._

## Geometry Subdivision for Performance

Large and/or complex geometries can severely impact query performance. One of the most effective techniques I've discovered is using PostGIS's `ST_Subdivide` function during your ETL process to break down unwieldy polygons into manageable chunks.

However, it should be important that this is not something you should always do universally. Subdividing geometries adds additional complexity to your application, so when deciding whether or not to subdivide, I always do the mental calculus in determining whether the increased complexity is worth the performance increases.

If you reduce this concept its simplest form, you can think of it like this - having a  large spatial index is essentially the same as having no index, subdivision enables the query engine to eliminate the majority of a large geometry. 

### Implementation Approaches

Practically, I think implementation options of implementing geometry subdivision in your application can boil down to the following approaches:

1. Using ETL process; and/or
2. Using specially structured queries; and/or
3. Using your application layer.

All have their own complexity overheads and advantages which I'll talk through in more detail in the next few subsections. Note, you may need to do more than one depending on what you're doing with the data.

_**When to use / Trade‑offs**: Subdivide when geometries are large/complex and queried spatially; it speeds intersects/tiling but adds ETL/storage complexity and requires careful query routing._

---

In some ways, this is generally the easiest option to do if you want a simple implementation of this approach. The idea is that you implement additional database layers where you can transform any of the source spatial data into its subdivided parts before merging into your public layer.

If visual representation of spatial data is not required in the frontend or, if you want to handle aggregating/union the geometries in the application layer you may not need to maintain the original geometries. In this scenario, your implementation of the would almost be as simple as the following:

{{<mermaid>}}
flowchart LR
subgraph db
	subgraph load
		load.foobar
	end
	subgraph staging
		staging.foobar
	end
	subgraph public
		public.foobar
	end
end
spatial.gpkg -- ogr2ogr --> load.foobar -- st_subdivide --> staging.foobar -- geom --> public.foobar
{{</mermaid>}}

If you want to maintain the original geometries for visual purposes, for data lineage, accuracy, or any number of other reasons, your approach would look something like:

{{<mermaid>}}
flowchart LR
subgraph db
	subgraph load
		load.foobar
	end
	subgraph staging
		staging.foobar
	end
	subgraph optimised
		optimised.foobar_geometries
	end
	subgraph public
		public.foobar
	end
end
spatial.gpkg -- ogr2ogr --> load.foobar --> staging.foobar -- st_subdivide --> optimised.foobar_geometries 
staging.foobar -- geom --> public.foobar
{{</mermaid>}}

This approach is generally more complex as there's more moving parts. You'll need to implement specific application logic or a specific approach in how you query your data to ensure you utilise the subdivided geometries for any expensive operations. Additionally, depending on the size of the dataset, things like storage may need to be taken into account when doing your mental calculus. 

**ETL Basic Example**

```sql
-- Step 1: Load raw data into staging
CREATE TABLE staging.foobar AS 
SELECT 
    id,
    name,
    category,
    geom
FROM load.foobar;

-- Step 2: Create subdivided table directly
CREATE TABLE public.foobar AS
SELECT 
    id,
    name,
    category,
    ST_Subdivide(geom, 256) as geom  -- 256 vertices max per subdivision
FROM staging.foobar
WHERE ST_IsValid(geom);

-- Step 3: Add spatial index for performance
CREATE INDEX idx_foobar_geom ON public.foobar USING GIST (geom);
```

**ETL Maintaining Original Geometries Example**

```sql
-- Step 1: Staging table (original geometries)
CREATE TABLE staging.foobar AS 
SELECT 
    id,
    name,
    category,
    area_km2,
    geom as original_geom
FROM load.foobar;

-- Step 2: Create optimized subdivisions for spatial operations
CREATE TABLE optimised.foobar_geometries AS
SELECT 
    id,
    generate_series(1, ST_NumGeometries(subdivided_geom)) as subdivision_id,
    ST_GeometryN(subdivided_geom, generate_series(1, ST_NumGeometries(subdivided_geom))) as geom
FROM (
    SELECT 
        id,
        ST_Collect(ST_Subdivide(original_geom, 256)) as subdivided_geom
    FROM staging.foobar
    WHERE ST_IsValid(original_geom)
) subdivisions;

-- Step 3: Public table with original geometries for display
CREATE TABLE public.foobar AS
SELECT 
    id,
    name,
    category,
    area_km2,
    original_geom as geom  -- Keep original for visual accuracy
FROM staging.foobar;

-- Step 4: Indexes for both tables
CREATE INDEX idx_foobar_public_geom ON public.foobar USING GIST (geom);
CREATE INDEX idx_foobar_optimised_geom ON optimised.foobar_geometries USING GIST (geom);
CREATE INDEX idx_foobar_optimised_id ON optimised.foobar_geometries (id);
```

**Query Examples**

```sql
-- Use optimised table for expensive spatial operations
SELECT DISTINCT f.id, f.name
FROM public.foobar f
WHERE f.id IN (
    SELECT DISTINCT og.id
    FROM optimised.foobar_geometries og
    WHERE ST_Intersects(og.geom, ST_GeomFromText('POINT(144.9631 -37.8136)', 4326))
);

-- Generate MVT tiles using subdivided geometries for better performance
SELECT ST_AsMVT(tile_data, 'foobar_layer') as mvt
FROM (
    SELECT 
        f.id,
        f.name,
        f.category,
        ST_AsMVTGeom(
            og.geom,
            ST_TileEnvelope($1, $2, $3),  -- z, x, y parameters
            4096,
            256
        ) as geom
    FROM optimised.foobar_geometries og
    JOIN public.foobar f ON f.id = og.id
    WHERE ST_Intersects(
        og.geom, 
        ST_Transform(ST_TileEnvelope($1, $2, $3), 4326)
    )
) tile_data
WHERE geom IS NOT NULL

-- Refresh subdivided geometries after data updates
TRUNCATE optimised.foobar_geometries;

INSERT INTO optimised.foobar_geometries (id, subdivision_id, geom)
SELECT 
    id,
    generate_series(1, ST_NumGeometries(subdivided_geom)) as subdivision_id,
    ST_GeometryN(subdivided_geom, generate_series(1, ST_NumGeometries(subdivided_geom))) as geom
FROM (
    SELECT 
        id,
        ST_Collect(ST_Subdivide(geom, 256)) as subdivided_geom
    FROM public.foobar
    WHERE ST_IsValid(geom)
    AND updated_at > (SELECT COALESCE(MAX(created_at), '1970-01-01') FROM optimised.foobar_geometries)
) subdivisions;
```

---

**Note**: If you're using an ORM like Django, the simplest approach in actually implementing the usage of these subdivided geometries (if stored separately) is to create or override the manager of your data model.

 **Gotchas:**

* You may need to adjust your subdivision approach and add additional additional parameters in determining subdivision candidates. For example, if you have an extremely large square covering the entire planet, any index will be useless.
* The optimal number of vertices to subdivide by will depend on the infrastructure you have available. 

## Table Partitioning for Aggregated/Large Datasets

When designing web applications which have multi-tenancy or SaaS-esque, it's important to reduce the amount of "configuration by code" that's required. Spatial tables in particular are a bit of a pain in things like spatial projections, etc. In the spatial applications I've built, I generally go for a "common" or "normalised" table approach where I destructure spatial tables into a set of tables. This means I can load entirely new datasets into an application without any code changes.

However, this means that optimisation is extremely important as some tables have at times are in the billions of rows. Partitioning is crucial for applications dealing with large volumes of spatial records. However, the specific strategy in how you implement partitioning will be dependent on what your application is doing and the context of your datasets.

For example, if you were doing the same approach as I normally do, you would structure your table something like:

```sql
-- Partition by data category for optimized query performance
CREATE TABLE spatial_data (
    id SERIAL,
    category_id INTEGER,
    geom GEOMETRY,
    properties JSONB,
	  primary key (id, category_id)
) PARTITION BY LIST (category_id);
```

You'll also need a way to create, delete and manage partitions. Assuming usage of an ORM like Django, my approach is to use something like a `post_save` receiver which watches changes. If you're not using the ORM to load the data and using direct loads e.g. `ogr2ogr`, `psql` - you'll need to make sure these partitions are created through migrations (or similar concept).

```python
# Use database signals for automatic partition creation
@receiver(post_save, sender=SpatialData)
def ensure_partition_exists(sender, instance, **kwargs):
    partition_name = f"spatial_data_{instance.category_id}"
    create_partition_if_not_exists(partition_name, instance.category_id)
```

**Gotchas**

* If performance is still poor, make sure you've got your indexes set up correctly. Partition tables will have multi-column primary indexes generally.
* Depending on the scale of your data, you'll likely need to add additional partitioning rules such as country of dataset, or even state/locality, etc.

_**When to use / Trade‑offs**: Use partitioning when tables are huge or retention/tenancy splits are natural; you’ll gain planner pruning and maintenance wins at the cost of more DDL and index overhead._

## Query Optimization Techniques

**Spatial Query Optimization:**

```sql
-- Use bounding box queries before expensive spatial operations
SELECT * FROM spatial_table
WHERE geom && ST_MakeEnvelope(xmin, ymin, xmax, ymax, 4326)
  AND ST_Intersects(geom, target_geometry);

-- Leverage spatial relationship hierarchy
-- ST_Intersects (fast) -> ST_Contains (medium) -> ST_Within (detailed)
```

**Performance Monitoring:**
```sql
-- Monitor spatial query performance
EXPLAIN (ANALYZE, BUFFERS)
SELECT * FROM spatial_table
WHERE ST_DWithin(geom, point_geometry, 1000);
```

## Vector Tiles for High-Performance Mapping

For a very long time, I was stuck using an old version of Leaflet for the frontend of one of the applications I was developing. This was entirely due to the fact that the application was forced to use a whole load of outdated internal repositories. However, a few years ago I had switched the majority of my projects to using MapLibre and vector tiles were a complete game changer for me... they are the *absolute* best.

Instead of sending structured JSON (or GeoJSON) to your client, you send protobuf vector tiles directly to MapLibre. It essentially copies the same approach that raster tiles use, i.e. using x, y, zoom to limit both data retrieved and fidelity of data based on how your map is positioned and zoomed.  

### Implementation Approaches

The below is a high level overview of how I've generally structured my applications. Depending on the complexity of your needs, you may forgo serving vector tiles from your backend entirely if all you need is basically visualisation purposes. For example, [Martin](https://martin.maplibre.org/) is a pretty awesome library I've used on some no-server projects.

However, if you do have a server in the mix, your setup will likely end up looking like:

{{<mermaid>}}
sequenceDiagram
    participant Client as React+MapLibre
    participant API as Django
    participant Cache as Redis
    participant DB as PostGIS

    Client->>API: Request tile /z/x/y.mvt
    API->>Cache: Check cache key

    alt Cache Hit
        Cache-->>API: Return cached MVT
        API-->>Client: Binary MVT data
    else Cache Miss
        API->>DB: Query spatial data
        DB->>DB: ST_AsMVT generation
        DB-->>API: Binary MVT
        API->>Cache: Store with infinite TTL
        API-->>Client: Binary MVT data
    end
{{</mermaid>}}

In this scenario, whilst the server/application layer will be serving the vector tiles, we want to almost exclusively use the database to do this operation as it's expensive.  

_**When to use / Trade‑offs**: Serve MVT for dynamic, interactive maps at scale; DB‑generated tiles are fast and cacheable but shift CPU to the database—monitor load and cache aggressively._

#### Routing

I generally like to structure my endpoints in this type of pattern:

```
GET /api/tiles/{layer}/{z}/{x}/{y}.mvt
GET /api/tiles/{layer}/{z}/{x}/{y}.mvt?filter={encoded_filter}
```

In the case of Django my implementation approach would be to create a selector that executes my MVT directly into an HTTP response, here's a generic boilerplate I created for myself when scaffolding new projects.

```py
@router.get("/layer/{zoom}/{x}/{y}", response=bytes)
def my_tile_view(request, zoom, x, y):
    queryset = SpatialModel.objects.filter(active=True)
    return spatial_queryset_to_tile(
        queryset=queryset,
        zoom=zoom,
        x=x,
        y=y,
        geometry_field='geometry',
        property_fields=['name', 'category', 'value'],
        layer_name='my_layer'
    )
```

#### Helpers

My preference in serving MVT using an ORM like Django is to directly serve the output of the PostGIS function as a response.

```python
from typing import List, NamedTuple, Optional
from django.db import connection, models
from django.http import HttpResponse


class TileCoordinate(NamedTuple):
    zoom: int
    x: int
    y: int


def generate_tile_envelope(tile: TileCoordinate) -> str:
    return f"ST_SetSRID(ST_TileEnvelope({tile.zoom}, {tile.x}, {tile.y}), 3857)"


def queryset_to_mvt_response(
    queryset: models.QuerySet,
    tile: TileCoordinate,
    geometry_field: str = "geom",
    property_fields: Optional[List[str]] = None,
    layer_name: str = "default_layer",
    source_srid: int = 4326,
) -> HttpResponse:
    """
    Convert Django QuerySet to Mapbox Vector Tile HTTP response.

    Args:
        queryset: Django QuerySet containing spatial data
        tile: Tile coordinate object
        geometry_field: Name of geometry field in model
        property_fields: List of fields to include as properties (auto-detected if None)
        layer_name: Name for the MVT layer
        source_srid: Source SRID of geometry data

    Returns:
        HttpResponse containing MVT binary data with appropriate headers
    """
    # Auto-detect fields if not provided
    if property_fields is None:
        property_fields = []
        model = queryset.model
        for field in model._meta.get_fields():
            if (
                field.concrete
                and not field.is_relation
                and not field.one_to_one
                and not (field.many_to_one and field.related_model)
                and getattr(field, "column", field.name) != geometry_field
            ):
                property_fields.append(getattr(field, "column", field.name))

    # Generate base SQL from QuerySet
    base_query, query_params = queryset.query.get_compiler("default").as_sql()

    # Generate tile envelope
    tile_envelope = generate_tile_envelope(tile)

    # Build MVT SQL query
    property_columns = ", ".join(f"t.{field}" for field in property_fields)

    mvt_sql = f"""
        WITH tile_bounds AS (
            SELECT 
                {tile_envelope} AS envelope,
                {tile_envelope}::box2d AS bbox
        ),
        tile_data AS (
            SELECT
                ST_AsMVTGeom(
                    ST_Transform(t.{geometry_field}, 3857), 
                    tile_bounds.bbox,
                    4096,  -- tile extent
                    256,   -- buffer pixels
                    true   -- clip geometry
                ) AS geom,
                {property_columns}
            FROM ({base_query}) t
            CROSS JOIN tile_bounds
            WHERE ST_Intersects(
                ST_Transform(t.{geometry_field}, 3857), 
                tile_bounds.envelope
            )
        )
        SELECT ST_AsMVT(tile_data.*, '{layer_name}', 4096) 
        FROM tile_data
        WHERE geom IS NOT NULL;
    """

    # Execute query and get MVT binary data
    with connection.cursor() as cursor:
        cursor.execute(mvt_sql, query_params)
        result = cursor.fetchone()
        mvt_data = result[0] if result and result[0] else b""

    # Create HTTP response with appropriate headers
    response = HttpResponse(mvt_data, content_type="application/x-protobuf")
    response["Content-Disposition"] = (
        f'attachment; filename="tile_{tile.zoom}_{tile.x}_{tile.y}.mvt"'
    )
    response["Content-Encoding"] = "gzip"
    response["Cache-Control"] = "public, max-age=3600"  # Cache for 1 hour

    return response


# Convenience function for common use cases
def spatial_queryset_to_tile(
    queryset: models.QuerySet, zoom: int, x: int, y: int, **kwargs
) -> HttpResponse:
    """
    Convenience wrapper for generating MVT tiles from spatial QuerySets.

    Args:
        queryset: Django QuerySet with spatial data
        zoom: Tile zoom level
        x: Tile x coordinate
        y: Tile y coordinate
        **kwargs: Additional arguments passed to queryset_to_mvt_response

    Returns:
        HttpResponse with MVT data
    """
    tile = TileCoordinate(zoom=zoom, x=x, y=y)
    return queryset_to_mvt_response(queryset, tile, **kwargs)

```

**Gotchas**

* It's important when using an ORM like Django you do not just execute raw SQL without using the ORM's connection class. In this case, I know that Django sanitises any inputs meaning that vulnerabilities like SQL injection are not possible. While this is not entirely related to MVTs, the amount of time I've been able to execute SQL injection of spatial apps to grab the data I'm after is pretty shocking. 
* Where possible, I always want to use the ORM to generate the base query. This means I can leverage all normal `QuerySet` and `Manager` functions prior to executing the query. This is useful where you have things like filters, or require calculations involving one or more tables.  

## Point Clustering for Large Datasets

One of my current bug bears with MapLibre is the fact that MVT layers currently lack built-in clustering support. When dealing with massive point datasets (>1M points) which require visualisation and clustering, we are sadly not able to use vector tiles.

In these cases, we still need to fall back to JSON/GeoJSON to enable clustering functionality. To do this we essentially have to do everything we can to minimise the time it takes to serialise the data, and the time it takes for the payload to reach the client.

---

There's a finite limit of how far we can optimise in this case before we hit diminishing (or negative) returns. My general approach in dealing with this type of scenario is as follows:

1. Enable compression (e.g. gzip) middleware
2. Minimise the data being sent to the frontend by:
   1. Sending _only_ the required data in an array of tuples; and/or
    2. Removing whitespace; and/or
   3. Reducing precision of coordinates; then
3. Utilise a cache if dataset is not dynamic/variable; then
4. Move serialisation/structuring of data to frontend library like `@turf` to structure the tuples into a valid `FeatureCollection`

I've been able to reduce payloads by nearly 90% doing the above changes cutting payload transfer time from 40s to under a few seconds.

---

**Tangent**: As an offtopic comment, while I was still stuck using Leaflet I had implemented server-side clustering by creating a ladder of zoom grids. However, the complexity this added was significant and was generally inferior to what's available out the box with MapLibre. For those reasons I'm not going to give advice on that front here. 

---

Here's a boilerplate example I've generalised from one of my personal projects.

```python
@router.get('/spatial-layer')
def spatial_layer_endpoint(
    queryset: QuerySet,
    geometry_field: str = "geom",
    snap_precision: float = 0.00001,
    coordinate_precision: int = 5,
) -> List[Tuple[int, float, float]]:
    """
    Generic spatial layer endpoint that returns optimized coordinate data.
    
    Args:
        queryset: Base QuerySet to filter and process
        geometry_field: Name of geometry field in the model
        snap_precision: ST_SnapToGrid precision (affects accuracy vs performance)
        coordinate_precision: Number of decimal places for lat/lng rounding
        
    Returns:
        List of tuples: (id, longitude, latitude)
    """
    
    # Apply spatial optimizations
    optimized_queryset = (
        queryset
        .annotate(snap_geom=SnapToGrid(geometry_field, snap_precision))
        .annotate(
            lat=Round(GeomLat("snap_geom"), coordinate_precision),
            lng=Round(GeomLng("snap_geom"), coordinate_precision),
        )
        .values_list("id", "lng", "lat")
    )
    
    # Convert to list for JSON serialization
    # Note: values_list is used instead of values() to minimize payload
    return list(optimized_queryset)

```

**Gotchas**

* Avoid using ORM serializers, they will significantly slow things down.
* Whilst you can optimise the payload to the browser into a small size (e.g. 4mb), you'll likely run into memory issues with the browser itself. This becomes quite common when you exceed a million points; it's very browser dependent on how it handles memory. 
* If you're using persisted states in your frontend, you need to be careful how data is being stored in the client state (especially ith large amount of records).

_**When to use / Trade‑offs**: Use tuple streams + client clustering when you truly need clustering today; payloads shrink, but the client pays in memory/CPU—watch browser limits._

## Implementing Response Caching

Spatial queries are slow and expensive, even with all the optimisations in the world some queries can be extremely slow especially if the query is a complex one. 

Caching is an easy boon to performance if you can justify the additional complexity overhead. In many of my use cases, spatial data is _generally_ slow to update (if ever), and in instances where I need to purely visualise the data, caching is a useful tool as it means that a call that would've otherwise hit the database is now being served through memory. In this particular scenario, I am only caching static-ish spatial data with triggers to invalidate the cache on any ETL change.

My general approach is to create a basic route decorator which determines whether to hit the cache or database:

```py
def cache_with_infinite_ttl(func):
    """Cache static geospatial data indefinitely"""
    @wraps(func)
    def wrapper(*args, **kwargs) -> Any:
        cache_key: str = f"static:{func.__name__}:{hash(str(args) + str(kwargs))}"
        result: Optional[Any] = cache.get(cache_key)
        if result is None:
            result = func(*args, **kwargs)
            cache.set(cache_key, result)  # No expiration
        return result
    return wrapper
```

Then simply wrap my endpoint with the cache decorator:

```py
@cache_with_infinite_ttl  # Static geospatial data
def get_static_vector_tile(zoom: int, x: int, y: int, layer_type: str) -> bytes:
    return generate_tile(zoom, x, y, layer_type)
```

My preference is to have a common prefix which I can use to easily do a bulk cache invalidation if required.
```
Static data: "mvt:{layer}:{zoom}:{x}:{y}"
Dynamic data: "mvt:{layer}:{zoom}:{x}:{y}:{filter_hash}"
```

**Gotchas**

* With an additional cache like `redis` implemented, you will essentially have multiple layers of caching. It's important you understand how you will manage invalidation of response across your application.

{{<mermaid>}}
graph TB
    subgraph "Client Layer"
        A[Browser Cache]
        B[Service Worker Cache]
    end

_**When to use / Trade‑offs**: Cache static‑ish tiles and layer responses; invalidation strategy is the hard part—plan keys and triggers upfront._

    subgraph "CDN Layer"
        C[CloudFront/CDN]
    end

    subgraph "Application Layer"
        D[Redis Cache]
        E[Application Memory Cache]
    end

    subgraph "Database Layer"
        F[PostGIS Buffer Cache]
        G[OS File System Cache]
    end

    A --> C
    B --> C
    C --> D
    D --> E
    E --> F
    F --> G
{{</mermaid>}}



## Forcing React MapLibre Order

Another quirk of MapLibre which drives me somewhat insane is the race conditions that often occur with how it loads its layers; this is specifically an issue when using `react-map-gl`. Because of how React works, it can quickly get hacky and messy when you start using the map's ref directly to trigger reordering of layers.

A hack that I've came up with is a concept called an 'overlay anchor'. Basically, you create empty layers (as many as you need) which act as anchors for the layers being loaded. This means you can safely use `beforeId` without worrying about race conditions.

```tsx
import { Source, Layer } from 'react-map-gl/maplibre'

export default function OverlayAnchor() {
  return (
    <Source
      id="__overlay-anchor__"
      type="geojson"
      data={{ type: 'FeatureCollection', features: [] }}
    >
      <Layer
        id="__overlay-top__"
        type="symbol"
        source="__overlay-anchor__"
        layout={{ visibility: 'none' }}
      />
      <Layer
        id="__overlay-second__"
        type="symbol"
        beforeId="__overlay-top__"
        source="__overlay-anchor__"
        layout={{ visibility: 'none' }}
      />
      <Layer
        id="__overlay-third__"
        type="symbol"
        beforeId="__overlay-second__"
        source="__overlay-anchor__"
        layout={{ visibility: 'none' }}
      />
    </Source>
  )
}
```

## Conclusion

Building high-performance spatial applications requires a holistic approach that combines database optimisation, efficient data formats, intelligent caching, and thoughtful architecture decisions. After eight years of making every mistake possible, I can confidently say that implementing these strategies will save you from the pain I've endured.

The key to success lies in understanding your specific use case, measuring performance continuously, and optimising iteratively. Don't try to implement everything at once - you'll drive yourself mad. Start with the foundations (proper indexing and partitioning), then layer on vector tiles, caching, and progressive loading techniques to create truly optimised spatial experiences.

Remember that spatial application performance isn't just about raw speed, but also about providing smooth, responsive user experiences that scale gracefully as your data and user base grow. And if you've made it this far through my rambling, you're probably the type of person who cares enough about performance to actually implement these suggestions.

The spatial web development community needs more people sharing their hard-won knowledge. If this guide helps you avoid even half the headaches I've encountered, then the time spent writing it was worthwhile. Now go forth and build something cool (and performant).

