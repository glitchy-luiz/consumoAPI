import { Component, DestroyRef, OnInit, signal } from '@angular/core';
import { Pokemon } from '../../Services/pokemon';
import { Card } from "../../Components/card/card";
import { Router } from '@angular/router';
import { Buscar } from "../../Components/buscar/buscar";
import { ICard } from '../../Interfaces/ICard.interface';
import { finalize, from, map, mergeMap, switchMap, toArray } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  carregando = signal<boolean>(false)
  error = signal<string | null>(null)

  constructor(private pokemonService: Pokemon, private router:Router, private destroyRef: DestroyRef){}

  ngOnInit(): void {
    this.loadAll()
  }

  loadAll(){
    this.carregando.set(true)
    this.error.set(null)
    this.pokemonsList.set([])

    this.pokemonService.getPokemons()
    .pipe(
      switchMap((pkms:any) => {
        const names: string[] = (pkms?.results ?? []).map((r: any) => r.name);
        const indexed = names.map((name: string, index: number) => ({ name, index }));
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
      finalize(()=> this.carregando.set(false))
    )
    .subscribe({
      next: (pkms:any)=> {
        this.pokemonsList.set(pkms)
      },
      error: (err) => {
        console.log(err)
        this.error.set(`Erro ao carregar pokemons ${err}`)
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
