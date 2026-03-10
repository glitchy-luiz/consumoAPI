import { Component, input, OnInit } from '@angular/core';
import { Pokemon } from '../../Services/pokemon';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card implements OnInit{
  constructor(private pokemonService:Pokemon){}
  nome = input.required<string>()
  type1:string = ''
  sprite: string= ''

  ngOnInit(): void {
    this.pokemonService.getPokemonByName(this.nome()).subscribe((pkm: any) => {
      this.type1 = pkm.types[0].type.name
      this.sprite = pkm.sprites.front_default
    })
  }

}
