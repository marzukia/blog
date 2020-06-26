---
author: "Andryo Marzuki"
title: "Writing a Cellular Automata in Python"
date: "2020-06-25"
description: "Creating Conway's Game of Life cellular automata in Python after using mainly C# and TypeScript over the last few months."
tags: [
    "Python"
]
---

When I started learning and using Python 2 years ago, I had no real previous experience of coding under my belt. I had done some small projects in `HTML` and `PHP` a very longtime ago, but that experience was certainly no longer helpful. 

Over the last little while I've solely focused on using `C#` for my side/fun projects which has meant I've become a little rusty when it comes to `Python`. I thought a fun coding exercise would be to do [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life), a cellular automata.

I have done this project in the past in both `Python` and `TypeScript`. I wanted to see how my thought process has changed while coding in `Python` given the fact I now think in ways other then the 'Pythonic' way. 

The rules of Conway's Game of Life are as follows:

1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.
2. Any live cell with two or three live neighbours lives on to the next generation.
3. Any live cell with more than three live neighbours dies, as if by overpopulation.
4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

Here's the [completed code](https://github.com/marzukia/cell-automata) in case you were interested. 

## Wait... I Can't Do That?

After spending so much time in `C#` and `TypeScript` I've become very accustomed to my `types` and `interfaces` and I definitely wouldn't want to code without them. At time of writing, `Python` presently only supports [type hints](https://docs.python.org/3/library/typing.html) which was introduced in [PEP484](https://www.python.org/dev/peps/pep-0484/) and last updated in [PEP591](https://www.python.org/dev/peps/pep-0591/). I have tried to use these type hints before on my other projects such as [sqlstate](https://github.com/marzukia/sqlstate) but my general opinion of them is that they are woefully inadequate.

At the moment, there is no way to explicitly type something and then enforce it. You can use methods such as `isinstance()` but this approach normally kicks up a fuss as soon as you try to pass it more complex types. For example, I wanted to do something as basic as `isinstance(tuple_var, Tuple[int, int])`... unfortunately `isinstance()` doesn't support "Parametrized Tuples". I may very well be wrong here and there may be a way to do so, but as far as I can see it's not *currently* supported. 

For a language which has an ethos of "Explicit over Implicit" it's ironic that typing is not on the top of their list. There's probably an argument to be made regarding balancing the accessibility of the language versus strict typing but I think `Python`, but I can't see myself using `Python` as my go-to language without this feature.

With that being said, libraries such as `numpy` and `pandas` are still excellent. For data-heavy or data-centric analysis/work, I'd still spin up a `jupyter` notebook and get exploring. 

With this complaint over, onwards with the code!

## Class Definitions

My completed code consists of `Grid` object which consists of a an array of `Cell` objects, `width` and `height`. The definition of it's properties are as follows:

```python
class Grid:
    def __init__(self, width: int, height: int):
        self._width = width
        self._height = height
        self._cells = self.generate_cells()
        self.update_cell_neighbours()

    @property
    def cells(self):
        return self._cells

    @property
    def width(self):
        return self._width

    @property
    def height(self):
        return self._height
```

**Note**: I've not included the functions in the above excerpt as I will discuss it further in this post.

The `Cell` object will represent each cell in the grid, it will have an `id`, `state`, `neighbours`, `live_neigbours`. 

```python
class Cell:
    def __init__(self):
        self._id: str = uuid4().hex
        self._position: Position
        self._state: bool
        self._neighbours: Iterable[str]
        self._live_neighbours: int

    def __str__(self):
        return f"{self.id}, {self.state}"

    @property
    def id(self):
        return self._id

    @property
    def position(self):
        return self._position

    @position.setter
    def position(self, position: Position):
        self._position = position

    @property
    def state(self):
        return self._state

    @state.setter
    def state(self, state: bool):
        self._state = state

    @property
    def neighbours(self):
        return self._neighbours

    @neighbours.setter
    def neighbours(self, neighbours: Iterable[str]):
        self._neighbours = neighbours

    @property
    def live_neighbours(self):
        return self._live_neighbours

    @live_neighbours.setter
    def live_neighbours(self, live_neighbours: int):
        self._live_neighbours = live_neighbours
```

## Creating the Grid

In order to populate the `Grid`, we need to pass `width` and `height` as constructors into it.  Once our `Grid` object has been instantiated, the following `Class` function is called:

```python
def generate_cells(self) -> Iterable[Cell]:
    cells = []

    for h in range(self.height):
        for w in range(self.width):
            cell = Cell()
            cell.state = True if random() > 0.90 else False
            cell.position = (w, h)
            cells.append(cell)

    return cells
```

This returns an array of `Cell` objects which cover the entirety of the `Grid`. For our initial population, we randomly set only 10% of our `Cell` objects to have a `true` state (i.e. they're alive).

## Finding Neighbours

The logic of the cellular automata hinges on being able to know how many live neighbours any given `Cell` has. For a `2d` grid such as the one we're making, each cell will have `8` neighbours. For this exercise, I've decided to treat the grid as a continuous object; if we had a `32x32` grid, row `0` touches row `32`, column `0` touches column `32`.

Each `Cell` will have a property which will contain a `str` array of `Id`. This will allow us to quickly find the `neighbours` of that cell going forward. 

```python
def update_cell_neighbours(self) -> None:
    max_x = max([c.position[0] for c in self.cells])
    max_y = max([c.position[1] for c in self.cells])

    def check_distance(cell: Cell, target: Cell) -> bool:
        x, y = cell.position
        tx, ty = target.position

        xArr = [x, x - 1, x + 1]
        if (x + 1 > max_x):
            xArr.append(0)

        if (x - 1 < 0):
            xArr.append(max_x)

        yArr = [y, y - 1, y + 1]
        if (y + 1 > max_y):
            yArr.append(0)

        if (y - 1 < 0):
            yArr.append(max_y)

        if (tx in xArr) and (ty in yArr):
            return True if (tx, ty) != (x, y) else False
        else:
            return False

    for cell in self.cells:
        neighbours: Iterable[str] = []
        _n = list(filter(lambda t: check_distance(cell, t), self.cells))
        _n = [cell.id for cell in _n]
        neighbours += _n
        cell.neighbours = neighbours
```

The logic of this function is as follows:

1. Create an array of `x` coordinates which are valid. If `x + 1` would exceed `max(x)` then return `0`, inversely if `x - 1` would fall below `0` then return `max(x)`.
2. Create an array of `y` coordinates which are valid. If `y + 1` would exceed `max(y)` then return `0`, inversely if `y - 1` would fall below `0` then return `max(y)`.
3. For every `target`, compare `x` and `y` to above arrays. If `tx`, `ty` do not equal `x`, `y` return `True`.
4. Rather than returning the entire `Cell` return the `Cell.id`

## Updating the Grid State

Now that we know the neighbours of each `Cell` we can find out the state of its `neighbours` whether they are alive or dead. As noted above, this is determined by the `Cell.state` with `True` being alive, and `False` being dead. 

```python
def update_cells_state(self):
    def count_live_neighbours(neighbours: Iterable[str]) -> int:
        def fn(target: Cell) -> bool:
            if (target.id in neighbours) and (target.state):
                return True
            else:
                return False

        live_neighbours = list(filter(fn, self.cells))

        return len(live_neighbours)

    def calculate_state(state: bool, count: int) -> bool:
        switcher = {
            True: {
                2: True,
                3: True
            },
            False: {
                3: True
            }
        }

        result = switcher[state].get(count, False)

        return result

    for cell in self.cells:
        count = count_live_neighbours(cell.neighbours)
        cell.live_neighbours = count
        cell.state = calculate_state(cell.state, count)
```

The above code should be fairly explanatory. We get the `Cell.state` and count of `neighbours` which are alive, then pass that through a `calculate_state()` to update the `Cell.state`.

Another little bug bear with `Python` was the fact that I had to use a `dict` as there is no inbuilt way to `switch`. 

## Rendering the Grid

I couldn't think of a better way to do this without using third party libraries. So... I just did a fairly hacky way to render the grid at each step.

```python
def render_grid(self) -> None:
    grid: str = ""

    for h in range(self.height):
        row = list(filter(lambda r: r.position[1] == h, self.cells))
        grid += "".join(
            [str(r.live_neighbours)
                if r.state
                else " "
                for r in row]
        )
        grid += "\n"

    os.system('cls')
    print(grid)
```

## Running the Program

With all of the above done, I execute the program with a simple `main()` function. 

```python
def main():
    grid = Grid(24, 24)

    while(True):
        grid.update_cells_state()
        grid.render_grid()


if (__name__ == "__main__"):
    main()
```

Run the program and watch it run!

## Closing Thoughts

This was an interesting exercise for me. I hadn't really done much `Python` coding in awhile and I'm very surprised to see how poor of an experience I had coding in it. After using strongly typed languages, it plain felt wrong to use it for this type of thing. 

I will probably try this in `C#` using `Unity` to do something cool with it.
