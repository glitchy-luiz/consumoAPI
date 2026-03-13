import { Component, OnInit, signal } from '@angular/core';
import { Pokemon } from '../../Services/pokemon';
import { Card } from "../../Components/card/card";
import { Router } from '@angular/router';
import { Buscar } from "../../Components/buscar/buscar";
import { ICard } from '../../Interfaces/ICard.interface';

@Component({
  selector: 'app-pokemons',
  imports: [Card, Buscar],
  templateUrl: './pokemons.html',
  styleUrl: './pokemons.scss',
})
export class Pokemons implements OnInit {
  pkm = signal<ICard>({
    nome: '',
    tipo1: '',
    tipo2: '',
    sprite: '',
    id: ''
  })
  pokemonsList = signal<ICard[]>([])

  constructor(private pokemonService: Pokemon, private router:Router){}

  ngOnInit(): void {
    this.pokemonService.getPokemons().subscribe({
      next: (pkms:any)=> {
        for (let i in pkms.results) {
          this.pokemonService.getPokemonByName(pkms.results[i].name).subscribe((poke:any)=>{
            const listItem = this.pokemonService.transformCardObj(poke)
            this.pokemonsList.update(prev => [...prev, listItem])
          })
        }
        // console.log(this.pokemonsList())
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  pesq(event:ICard){
    const d = event
    this.pkm.set(d)
  }

  home(){
    this.router.navigate([''])
  }
}
