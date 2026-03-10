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
  pokemons: any = {}
  nome:string = ''

  ngOnInit(): void {
    this.pokemonService.getPokemons().subscribe((pkms) => {
      this.pokemons = pkms
      console.log(this.pokemons)
      this.nome = this.pokemons.results[468].name
    })
  }

}
