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

  barra = new FormGroup({
    busca: new FormControl(''),
  })

  constructor(private pokemonService: Pokemon, private destroyRef: DestroyRef){}

  pesquisar(){
    const termo = this.barra.controls['busca'].value?.trim();
    if (!termo) {
      return;
    }
// req trocada para verificar cache, e com isso o return já vem tratado
    this.pokemonService.getCardCached(termo).subscribe((pkm: any | null) => {
      if (!pkm) return;
      // const card:ICard = this.pokemonService.transformCardObj(pkm);
      this.pesquisa.emit(pkm);
    })
  }
}
