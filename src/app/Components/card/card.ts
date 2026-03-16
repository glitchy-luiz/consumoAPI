import { Component, effect, input, OnInit, signal } from '@angular/core';
import { Pokemon } from '../../Services/pokemon';
import { ICard } from '../../Interfaces/ICard.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card{

  pokemon = input.required<ICard>()
  objPkm = signal<ICard | null>(null)
  
  constructor(private router:Router){
    effect(()=>{
      this.objPkm.set(this.pokemon())
    })
  }
  
  reset(){
    this.objPkm.set({
      nome: '',
      tipo1: '',
      tipo2: '',
      sprite: '',
      id: ''
    })
  }

  openDetails(){
    this.router.navigate(['detalhes/' + this.objPkm()?.id])
  }
}
