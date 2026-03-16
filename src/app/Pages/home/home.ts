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
  pkm = signal<ICard>({
    nome: '',
    tipo1: '',
    tipo2: '',
    sprite: '',
    id: ''
  })

  pesq(event: ICard){
    const d = event
    this.pkm.set(d)
  }

  allPokemons(){
    this.router.navigate(['pokemons'])
  }

}
