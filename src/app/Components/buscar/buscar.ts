import { Component, DestroyRef, effect, inject, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Pokemon } from '../../Services/pokemon';
import { ICard } from '../../Interfaces/ICard.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize, from, map, mergeMap, switchMap, toArray } from 'rxjs';

@Component({
  selector: 'app-buscar',
  imports: [ReactiveFormsModule],
  templateUrl: './buscar.html',
  styleUrl: './buscar.scss',
})
export class Buscar {
  pesquisa = output<ICard[]>()
  // carregando = signal<boolean>(false)

  barra = new FormGroup({
    busca: new FormControl(''),
  })

  constructor(private pokemonService: Pokemon, private destroyRef: DestroyRef){}

  pesquisar(){
    const termo = this.barra.controls['busca'].value?.trim();
    if (termo === '') this.pesquisa.emit([])
    // req trocada para verificar cache, e com isso o return já vem tratado
    this.pokemonService.getCardCached(termo!).pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: (pkm) =>{
        this.pesquisa.emit([pkm]);
        if (!pkm)  this.pesquisarTipo(termo!);
        console.log([pkm])
      },
      error: ()=>{
        this.pesquisarTipo(termo!)
      }
    })
  }

  pesquisarTipo(termo: string){
    // this.carregando.set(true)

    this.pokemonService.getPokemonsByType(termo)
    .pipe(
      switchMap((pkms:any) => {
        const names: string[] = (pkms?.pokemon ?? []).map((r: any) => r.pokemon.name);
        const indexed = names.map((name, index: number) => ({ name, index }));
        const limite = 10;

        return from(indexed).pipe(
          mergeMap(({name, index}) =>
            this.pokemonService.getCardCached(name).pipe(
              map((card) => ({card, index}))
            ),
            limite
          ),
          toArray(),
          map((items) => 
            items.sort((a,b) => a.index - b.index).map((x) => x.card)
          )
        );
      }),
      takeUntilDestroyed(this.destroyRef),
      // finalize(()=> this.carregando.set(false))
    )
    .subscribe((pkms: ICard[]) => {
      if (!pkms) return;
      this.pesquisa.emit(pkms);
    })
  }
}
