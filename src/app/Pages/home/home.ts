import { Component, OnInit, signal } from '@angular/core';
import { Card } from "../../Components/card/card";
import { Pokemon } from '../../Services/pokemon';
import { Buscar } from "../../Components/buscar/buscar";
import { Router } from '@angular/router';
import { ICard } from '../../Interfaces/ICard.interface';
import { Time } from '../../Services/time';
import { TeamCard } from '../../Components/team-card/team-card';
@Component({
  selector: 'app-home',
  imports: [Card, Buscar, TeamCard],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  pokemons: any = null
  pkms = signal<ICard[]>([])
  times:any = null
  constructor(private timeService:Time, private router: Router){
    this.times = this.timeService.times
  }

  pesq(event: ICard[]){
    this.pkms.set(event)
  }

  allPokemons(){
    this.router.navigate(['pokemons'])
  }

}
