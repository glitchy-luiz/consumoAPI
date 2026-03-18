export interface IEvolution {
    stages: EvolutionStage[][];
}

export type Requirement ={
    trigger: string;
    minLevel?: number;
    item?: string;
    heldItem?: string;
    minHappiness?: number;
    timeOfDay?: string;
    knownMove?: string;
}

export type EvolutionStage ={
    name: string;
    sprite: string;
    requirements: Requirement[];
}