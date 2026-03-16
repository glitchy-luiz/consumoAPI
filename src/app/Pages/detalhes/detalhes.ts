import { Component, OnInit, signal } from '@angular/core';
import { Pokemon } from '../../Services/pokemon';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalhes',
  imports: [],
  templateUrl: './detalhes.html',
  styleUrl: './detalhes.scss',
})
export class Detalhes implements OnInit{
  pokedexId: string | null = null
  pokemon:any = signal('')

  constructor(private pokemonService:Pokemon, private activeRoute:ActivatedRoute){
  }
  
  ngOnInit(): void {
    this.pokedexId = this.activeRoute.snapshot.paramMap.get('id')
    this.pokemonService.getPokemonByName(this.pokedexId!).subscribe({
      next: (pkm:any) => {
        this.pokemon.set(pkm)
        console.log(pkm)
      },
      error: (err)=>{
        console.log(err)
      }
    })
  }
}
