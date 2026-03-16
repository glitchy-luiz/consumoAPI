import { Component, OnInit, signal } from '@angular/core';
import { Card } from "../../Components/card/card";
import { Pokemon } from '../../Services/pokemon';
import { Buscar } from "../../Components/buscar/buscar";
import { Router } from '@angular/router';
import { ICard } from '../../Interfaces/ICard.interface';
@Component({
  selector: 'app-home',
  imports: [Card, Buscar],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  constructor(private pokemonService: Pokemon, private router: Router){}
  pokemons: any = null
  pkms = signal<ICard[]>([])

  pesq(event: ICard[]){
    this.pkms.set(event)
  }

  allPokemons(){
    this.router.navigate(['pokemons'])
  }

}
