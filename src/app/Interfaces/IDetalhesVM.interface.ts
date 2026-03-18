import { IEvolution } from "./IEvolutionVM.interface";

export interface IDetalhesVM{
  id: number;
  name: string;
  sprite: string;
  types: string[];

  stats: Stat[];
  moves: string[];

  evolutions: IEvolution

  rawPokemon: any;
  rawSpecies: any;
  rawEvolution: any;
};

type Stat = {
    name: string;
    value: number;
    percent: number
    color: string
}
