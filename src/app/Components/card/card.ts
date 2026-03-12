import { AfterViewChecked, ChangeDetectorRef, Component, DestroyRef, effect, inject, input, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { Pokemon } from '../../Services/pokemon';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card implements OnInit{
  
  nome = input.required<string>();
  
  type1 = signal('');
  type2 = '';
  sprite = '';
  
  constructor(private pokemonService: Pokemon){}

  ngOnInit(): void {
    const nome = this.nome();
    if (!nome) { return; }

    this.pokemonService.getPokemonByName(nome).subscribe({
      next: (pkm: any) => {
        this.type1.set(pkm?.types?.[0]?.type?.name ?? 'desconhecido');
        this.type2 = pkm?.types?.[1]?.type?.name ?? '';
        this.sprite = pkm?.sprites?.front_default ?? '';
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
