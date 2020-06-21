---
author: "Andryo Marzuki"
title: "Creating a Genetic Algorithm to Recreate Images"
date: "2020-06-21"
description: "This article discusses and outlines the process of making a genetic algorithm in C# which attempts to recreate an image using mechanisms of natural selection choosing the most 'optimal offspring' to achieve a target."
tags: [
    "CSharp", "Genetic Algorithm",
]
---

Have you ever heard of a genetic algorithm?

In the context of sexual reproduction, an offspring inherits half of it's mother's genes and half of it's father's genes. The inheritance of genes occurs completely randomly, the offspring's genes are a random mixture of it's two parents. 

This amalgamation of genes means that the offspring gains a combination of both negative and positive familiar traits. If you have a tall mother, and a short father with stocky legs you may end up being a tall man with stocky legs. Or you may end up being a short girl with lanky legs.

Random mutations also occur on during reproduction which can cause negative or positive effects to occur. This means that your offspring may by chance, get a mutation which causes them to have one stocky leg and one lanky leg.

Natural selection is the key mechanism of evolution whereby those with favourable genes are more likely to survive than those who do not. For example, imagine an ancient human who had a mutation which provided him greater than average strength in his arms, as a result, he was able to throw spears farther than his peers. In this scenario, this advantage in his ability to hunt has given him an evolutionary advantage over other humans in his environment; this in turn provides him a greater chance of propagating his genes to the next generation.

So why the heck am I talking about evolutionary natural selection? A genetic algorithm essentially applies this same general logic in how it optimizes itself to the target we set for it. A genetic algorithm is a [metaheuristic](https://en.wikipedia.org/wiki/Metaheuristic) inspired by natural selection. Practically, it's a super novel way to optimize (in a very unoptimal way) a model.

## Design Methodology

The complete code for this project can be found [here](https://github.com/marzukia/gacs).

**Note**: I realise using names such as `genes` and `genomes` is a little silly considering this a computer program, but it's not really a genetic algorithm without genes.

For the processes of designing our genetic algorithm, we need to outline the process of how it will attempt to mimic the process of natural selection. For this particular project, I've structured it as follows:

1. Specify a 'Goal' which the algorithm will score itself against, for this project our goal is a picture we'd like to re-create.
2. Convert our goal into a gene which can be used to compare against.
3. Randomly generate a population of genes which contain a representation of your goal.
4. For each gene, compare it to your goal. Keep the top `n` genes.
5. Use these genes to populate the next generation, randomly mutate these genes to introduce variability.
6. Repeat steps 3 to 5 until you reach a desired state.

## The Setup

For my genetic algorithm I stuck with using a `24x24` jpeg wihout any transparent pixels. This was purely because I wanted to keep it simple and not have to worry about `alpha`. Also, when I tried larger images it took considerably longer.

I used a `parentPoolSize` of `3` meaning that for every given generation of offsrping, I select `3` parents to seed the next generation. To ensure that enough genetic diversity is created through mutation and reproduction, the overall offspring pool size will be `parentPoolSize ^ 4`. This means that every generation, I have a total population of `81` offspring, of which `3` is selected to seed the next generation.

Each offspring is represented as `Genome` object which is defined as follows:

```ts
class Genome
{
    public int width;
    public int height;
    public Genome srcGenome;
    public double mutation_rate;
    public Color [,] genes;
    public double loss;
}
```

Our `genes` consists of a `Color [,]`. This array is what use to generate the images you'll see in the next section, it's also what we use to score and optimize our model to reach our goal.

Our program will initialize a random array of `81` `Genome` objects.

From there, our `3` parents will be chosen, they will subsequently generate another `81` `Genome` objects, and then rinse and repeat. During this time, random mutations have a `1%` chance of occuring on individual pixels - these mutations introduce new traits (colors) into the population which can be selected through our loss function.

## The Loss Function

The most important thing in making this algorithm work is our loss model, i.e. how do we instruct the algorithm what is good and what is bad?

Our loss function is expressed as `sqrt((r - ry)^2 + (b - by)^2 + (g - gy)^2)`. For every given pixel, we calculate the squared loss for red, green and blue colours. We sum these loss values, then take the square root.

```ts
public void CalculateLoss()
{
    Color [,] srcGenes = this.srcGenome.genes;
    double loss = 0;
    int w; int h;
    for ( w = 0; w < this.width; w++ )
    {
        for ( h = 0; h < this.height; h++ )
        {
            var srcGene = srcGenes[w, h];
            var targetGene = this.genes[w, h];
            double r_loss = Math.Pow(srcGene.R - targetGene.R, 2);
            double g_loss = Math.Pow(srcGene.G - targetGene.G, 2);
            double b_loss = Math.Pow(srcGene.B - targetGene.B, 2);
            double pixel_loss = Math.Sqrt(r_loss + g_loss + b_loss);
            loss += pixel_loss;
        }
    }
    this.loss = Math.Round(loss, 4);
}
```

## It's-a Me, Mario!

<img src="/images/gacs.png" width="100%"/>

The image above shows, a scaled version of each `24x24` image.

1. Our source image
2. The output at generation `0`
3. The output at generation `500`
4. The output at generation `2000`
5. The output at generation `23000`

Our algorithm has the most drastic changes occuring in our first `1000` generations. As it continues on, the differences between generations become considerably less significant.

## Closing Thoughts

This was a super fun project and I highly recommend you give it a try. I'll probably do this again in the future with larger images. 

If I do any further updates to this algorithm I will post it here.

I hope you've enjoyed my write up and good luck!