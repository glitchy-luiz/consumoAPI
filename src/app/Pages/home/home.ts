import { Component, OnInit } from '@angular/core';
import { Card } from "../../Components/card/card";
import { Pokemon } from '../../Services/pokemon';
import { Buscar } from "../buscar/buscar";

@Component({
  selector: 'app-home',
  imports: [Card, Buscar],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  constructor(private pokemonService: Pokemon){}
  pokemons: any = null
  nome:string | null = null
  pesquisa: string = '654'

  ngOnInit(): void {
    this.pokemonService.getPokemons().subscribe({
      next: (pkms:any) => {
        this.pokemons = pkms
  
        if (pkms.results){
          const p = parseInt(this.pesquisa)
          console.log(p)
          this.nome = this.pokemons.results[p].name
        }
      },
      error: (err) => {
        console.log('Erro home:', err)
      }
    })
  }

  buscar(event:string){
    this.pokemonService.getPokemons().subscribe({
      next: (pkms:any) => {
        this.pokemons = pkms
  
        if (pkms.results){
          const p = parseInt(event)
          console.log(p)
          this.nome = this.pokemons.results[p].name
        }
      },
      error: (err) => {
        console.log('Erro home:', err)
      }
    })
  }

}
