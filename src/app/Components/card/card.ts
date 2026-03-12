import { Component, effect, input, OnInit, signal } from '@angular/core';
import { Pokemon } from '../../Services/pokemon';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card{
  
  nome = input.required<string>();
  
  type1 = signal('');
  type2 = '';
  sprite = '';
  
  constructor(private pokemonService: Pokemon){
    effect(() => {
      const nome = this.nome();
      this.reset()
      
      if (!nome) { return; }

      this.pokemonService.getPokemonByName(nome).subscribe({
        next: (pkm: any) => {
          this.type1.set(pkm?.types?.[0]?.type?.name ?? 'desconhecido');
          this.type2 = pkm?.types?.[1]?.type?.name ?? '';
          this.sprite = pkm?.sprites?.front_default ?? '';
        },
        error: (err) => {
          console.error(err);
          this.reset()
        }
      });
    })
  }
  
  reset(){
    this.type1.set('')
    this.type2 = ''
    this.sprite = ''
  }
}
