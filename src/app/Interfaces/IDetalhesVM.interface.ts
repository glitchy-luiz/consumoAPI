import { IEvolution } from "./IEvolutionVM.interface";

export interface IDetalhesVM{
  id: number;
  name: string;
  sprite: string;
  types: string[];

  abilities: Ability[]
  stats: Stat[];
  moves: string[];

  evolutions: IEvolution

  rawPokemon: any;
  rawSpecies: any;
  rawEvolution: any;
};

export type Stat = {
  name: string;
  value: number;
  percent: number
  color: string
}

export type Ability = {
  name: string
  hidden: boolean
  effect: string
  shortEffect: string
}
