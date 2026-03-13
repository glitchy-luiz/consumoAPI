import { Component, DestroyRef, effect, inject, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Pokemon } from '../../Services/pokemon';
import { ICard } from '../../Interfaces/ICard.interface';

@Component({
  selector: 'app-buscar',
  imports: [ReactiveFormsModule],
  templateUrl: './buscar.html',
  styleUrl: './buscar.scss',
})
export class Buscar {
  pesquisa = output<ICard>()
  // pokemon = signal<ICard>({
  //   nome: '',
  //   tipo1: '',
  //   tipo2: '',
  //   sprite: '',
  //   id: ''
  // })
  // loading = signal(false)

  barra = new FormGroup({
    busca: new FormControl(''),
  })

  constructor(private pokemonService: Pokemon, private destroyRef: DestroyRef){}

  pesquisar(){
    const termo = this.barra.controls['busca'].value?.trim();
    if (!termo) {
      return;
    }

    this.pokemonService.getPokemonByName(termo).subscribe((pkm: any | null) => {
      if (!pkm) return;
      const card:ICard = this.pokemonService.transformCardObj(pkm);
      this.pesquisa.emit(card);
    })
  }
}
