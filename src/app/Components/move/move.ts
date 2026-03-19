import { Component, input, OnInit, signal } from '@angular/core';
import { Pokemon } from '../../Services/pokemon';
import { IMove } from '../../Interfaces/IMove.interface';
import MockMove from '../../Mocks/mockMove';

@Component({
  selector: 'app-move',
  imports: [],
  templateUrl: './move.html',
  styleUrl: './move.scss',
})
export class Move implements OnInit{
  moveName = input.required<string>()
  move = signal<IMove>(MockMove.giveEmptyMove())

  constructor(private pokemonService: Pokemon){}

  ngOnInit(): void {
    this.pokemonService.getMoveCached(this.moveName()).subscribe((moveInfo)=>{
      this.move.set(moveInfo)
    })
  }
}
