import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICard } from '../Interfaces/ICard.interface';
import MockCard from '../Mocks/mockCard';
import { map, Observable, of, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Pokemon {
  private url:string = 'https://pokeapi.co/api/v2/'
  private http = inject(HttpClient)

  //cache basico | Map -> dicionario chique de chave, valor (set, get, has, delete)
  private cardCache = new Map<string, ICard>();
  // cache caso duas req precisem da resposta
  private inflight = new Map<string, Observable<ICard>>()

  getPokemons(){
    return this.http.get(this.url + 'pokemon?limit=100000&offset=0')
  }

  getPokemonByName(name: string){
    return this.http.get(this.url + '/pokemon/' + name)
  }

  getPokemonsByType(type: string){
    return this.http.get(this.url + '/type/' + type)
  }

  transformCardObj(pkm: any): ICard{
    const pokemon = MockCard.giveEmptyCard()
    pokemon!.nome = pkm?.name
    pokemon!.tipo1 = pkm?.types?.[0]?.type?.name ?? 'desconhecido';
    pokemon!.tipo2 = pkm?.types?.[1]?.type?.name ?? '';
    pokemon!.sprite = pkm?.sprites?.front_default ?? '';
    pokemon!.id = pkm?.id
    return pokemon
  }

  getCardCached(name: string): Observable<ICard> {
    const key = name.toLowerCase();

    const cached = this.cardCache.get(key);
    if (cached) return of(cached);

    const inFlight = this.inflight.get(key);
    if (inFlight) return inFlight;

    const req$ = this.getPokemonByName(key).pipe(
      map((pkm) => this.transformCardObj(pkm)),
      shareReplay(1)
    );

    this.inflight.set(key, req$);

    return req$.pipe(
      map((card) => {
        this.cardCache.set(key, card);
        this.inflight.delete(key);
        return card;
      })
    );

  }
}
