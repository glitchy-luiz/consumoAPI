import { Component, effect, input, OnInit, signal } from '@angular/core';
import { Pokemon } from '../../Services/pokemon';
import { ICard } from '../../Interfaces/ICard.interface';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card{

  pokemon = input.required<ICard>()
  objPkm = signal<ICard | null>(null)
  
  constructor(private pokemonService: Pokemon){
    effect(()=>{
      this.objPkm.set(this.pokemon())
    })
    // effect(() => {
    //   const id = this.pokemon().id;
    //   this.reset()
      
    //   if (!id) { return; }

    //   this.pokemonService.getPokemonByName(id).subscribe({
    //     next: (pkm: any) => {
    //       this.nome.set(pkm?.name)
    //       this.type1 = pkm?.types?.[0]?.type?.name ?? 'desconhecido';
    //       this.type2 = pkm?.types?.[1]?.type?.name ?? '';
    //       this.sprite = pkm?.sprites?.front_default ?? '';
    //       this.idNumber = pkm?.id
    //     },
    //     error: (err) => {
    //       console.error(err);
    //       this.reset()
    //     }
    //   });
    // })
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
}
