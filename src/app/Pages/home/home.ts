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
  nome = ''

  ngOnInit(): void {
    this.pokemonService.getPokemons().subscribe((pkms) => {
      this.pokemons = pkms
    })
    console.log(this.pokemons)
    console.log(this.pokemons.results[0].name)
    // this.nome = this.pokemons.result[0].name
  }

}
