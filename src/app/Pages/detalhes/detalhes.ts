import { Component, OnInit, signal } from '@angular/core';
import { Pokemon } from '../../Services/pokemon';
import { ActivatedRoute, Router } from '@angular/router';
import { IDetalhesVM } from '../../Interfaces/IDetalhesVM.interface';
import { firstValueFrom } from 'rxjs';
import { EvolutionStage, IEvolution, Requirement } from '../../Interfaces/IEvolutionVM.interface';

@Component({
  selector: 'app-detalhes',
  imports: [],
  templateUrl: './detalhes.html',
  styleUrl: './detalhes.scss',
})
export class Detalhes implements OnInit{
  detalhes = signal<IDetalhesVM | null>(null)
  showMoves: boolean = false

  constructor(private pokemonService:Pokemon, private activeRoute:ActivatedRoute, private router:Router){}
  
  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
      const id = params.get('id')
      if (!id) return
      this.loadDetails(id)
    })
  }
  
  async loadDetails(id: string){
    this.detalhes.set(null)
    
    const pokemon: any = await firstValueFrom(
      this.pokemonService.getPokemonByName(id)
    );

    const species: any = await firstValueFrom(
      this.pokemonService.getPokemonSpecies(pokemon.species.name)
    );

    const evolutionChain: any = await firstValueFrom(
      this.pokemonService.getByUrl(species.evolution_chain.url)
    );
    console.log(pokemon)

    const stats = this.statsHandle(pokemon)
    const moves = pokemon.moves.map((m:any) => m.move.name)

    
    const evolutionVM: IEvolution = {
        stages: buildEvolutionStages(evolutionChain.chain),
      };

    await hydrateEvolutionSprites(evolutionVM, this.pokemonService);


    this.detalhes.set({
      id: pokemon.id,
      name: pokemon.name,
      sprite: pokemon.sprites.front_default,
      types: pokemon.types.map((t:any) => t.type.name),

      stats: stats,
      moves: moves,
      evolutions: evolutionVM,

      rawPokemon: pokemon,
      rawSpecies: species,
      rawEvolution: evolutionChain,
    });

  }

  statsHandle(pkm: any){
    const maxStats:number = 255
    
    const getColor = (percent: number) => {
      if (percent < 30) return '#e53935';
      if (percent < 60) return '#fbc02d';
      return '#43a047';
    };

    const stats = pkm.stats.map((stat:any) => {
      const value = stat.base_stat
      const percent = Math.round((value / maxStats) * 100)
      return{
        name: stat.stat.name.toUpperCase(), 
        value,
        percent,
        color: getColor(percent)
      }
    })
    return stats
  }

  home(){
    this.router.navigate([''])
  }

  goToEvolution(name: string){
    console.log('clicked')
    this.router.navigate(['detalhes/', name])
  }
}

function mapEvolutionRequirements(detail: any): Requirement {
  return {
    trigger: detail.trigger?.name,
    minLevel: detail.min_level ?? undefined,
    item: detail.item?.name,
    heldItem: detail.held_item?.name,
    minHappiness: detail.min_happiness ?? undefined,
    timeOfDay: detail.time_of_day || undefined,
    knownMove: detail.known_move?.name,
  };
}

function buildEvolutionStages(chain: any): EvolutionStage[][] {
  const stages: EvolutionStage[][] = [];

  function traverse(node: any, level: number) {
    if (!stages[level]) {
      stages[level] = [];
    }

    stages[level].push({
      name: node.species.name,
      sprite: '',
      requirements: node.evolution_details.map(mapEvolutionRequirements),
    });

    
    // if(stages[level].length > 1){
    //   console.log(stages[level][1].requirements)
    // } else{
    //   console.log(stages[level][0].requirements)
    // }

    node.evolves_to.forEach((next: any) => {
      traverse(next, level + 1);
    });

    // for (let i = 0; i < stages[level].length; i++) {
    //   console.log(stages[level][i].requirements)
    // }
  }

  traverse(chain, 0);

  return stages;
}

async function hydrateEvolutionSprites(
  evolutions: IEvolution,
  pokemonService: Pokemon
) {
  for (const stage of evolutions.stages) {
    for (const evo of stage) {
      const pkm:any = await pokemonService
        .getPokemonByName(evo.name)
        .toPromise(); // ou firstValueFrom

      evo.sprite = pkm.sprites.front_default;
    }
  }
}
