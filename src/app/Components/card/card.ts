import { Component, effect, input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Pokemon } from '../../Services/pokemon';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card implements OnInit{
  nome = input.required<string>()
  type1:string = ''
  type2: string = ''
  sprite: string= ''
  loading = true
  
  constructor(private pokemonService:Pokemon){}
  
  ngOnInit(): void {
    const nome = this.nome()

    if (!nome) {
      console.warn('Nome inválido recebido pelo Card');
      this.loading = false;
      return;
    }

    this.pokemonService.getPokemonByName(this.nome()).subscribe({
      next: (pkm:any) =>{
        this.type1 = pkm.types[0].type.name
        this.type2 = pkm.types[1]?.type?.name || ''
        this.sprite = pkm.sprites.front_default
        this.loading = false
      },
      error: (error) =>{
        console.log(error)
        this.loading = false
      }
    })
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes['nome'] && changes['nome'].currentValue) {
  //     this.loading = true;
  //     this.pokemonService.getPokemonByName(this.nome()).subscribe({
  //       next: (pkm:any) =>{
  //         this.type1 = pkm.types[0].type.name
  //         this.type2 = pkm.types[1]?.type?.name || ''
  //         this.sprite = pkm.sprites.front_default
  //         this.loading = false
  //       },
  //       error: (error) =>{
  //         console.log(error)
  //         this.loading = false
  //       }
  //     });
  //   }
  // }

}
