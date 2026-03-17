import { Component, OnInit, signal } from '@angular/core';
import { Pokemon } from '../../Services/pokemon';
import { ActivatedRoute, Router } from '@angular/router';
import { subscribe } from 'diagnostics_channel';

@Component({
  selector: 'app-detalhes',
  imports: [],
  templateUrl: './detalhes.html',
  styleUrl: './detalhes.scss',
})
export class Detalhes implements OnInit{
  pokedexId: string | null = null
  pokemon:any = signal('')
  speciesInfo: any = signal('')
  evolution: any = signal('')
  showMoves: boolean = false
  evoInfo: any = signal([])

  constructor(private pokemonService:Pokemon, private activeRoute:ActivatedRoute, private router:Router){}
  
  ngOnInit(): void {
    this.pokedexId = this.activeRoute.snapshot.paramMap.get('id')
    this.pokemonService.getPokemonByName(this.pokedexId!).subscribe({
      next: (pkm:any) => {
        this.pokemon.set(pkm)
        console.log(pkm)
        this.loadSpecies()
      },
      error: (err)=>{
        console.log(err)
      }
    })

  }
  
  loadSpecies(){
    this.pokemonService.getPokemonSpecies(this.pokemon().species.name).subscribe((specie) => {
      this.speciesInfo.set(specie)
      console.log(specie)
      this.loadEvolutions()
    })
  }

  loadEvolutions(){
    this.pokemonService.getByUrl(this.speciesInfo().evolution_chain.url).subscribe((evo) => {
      this.evolution.set(evo)
      console.log(evo)
    })
  }

  verifyEvolution(){
    if(this.evolution().chain.evolves_to[0]){
      const detail = this.evolution().chain.evolution_details
      const name = this.evolution().chain.species.name
    }
  }

  home(){
    this.router.navigate([''])
  }
}
