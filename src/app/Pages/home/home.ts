import { Component, OnInit } from '@angular/core';
import { Card } from "../../Components/card/card";
import { Pokemon } from '../../Services/pokemon';

@Component({
  selector: 'app-home',
  imports: [Card],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  constructor(private pokemonService: Pokemon){}
  pokemons: any = null
  nome:string | null = null

  ngOnInit(): void {
    this.pokemonService.getPokemons().subscribe({
      next: (pkms:any) => {
        this.pokemons = pkms
  
        if (pkms.results){
          this.nome = this.pokemons.results[654].name
        }
      },
      error: (err) => {
        console.log('Erro home:', err)
      }
    })
  }

}
