import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICard } from '../Interfaces/ICard.interface';
import MockCard from '../Mocks/mockCard';
import { map, Observable, of, shareReplay } from 'rxjs';
import { IMove } from '../Interfaces/IMove.interface';
import MockMove from '../Mocks/mockMove';

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
    return this.http.get(this.url + 'type/' + type)
  }

  getPokemonSpecies(specie: string){
    return this.http.get(this.url + 'pokemon-species/' + specie)
  }

  getMoveByName(name: string){
    return this.http.get(this.url + 'move/' + name)
  }

  getAbilityByName(name: string){
    return this.http.get(this.url + 'ability/' + name)
  }

  getByUrl(url: string){
    return this.http.get(url)
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

  transformMoveObj(move:any): IMove{
    const m = MockMove.giveEmptyMove()
    m.nome = move.name
    m.tipo = move.type.name
    m.classe = move.damage_class.name
    m.descricao = move.effect_entries[1].effect
    m.poder = move.power
    m.acuracia = move.accuracy
    m.pp = move.pp
    m.prioridade = move.priority
    m.chanceEfeito = move.effect_chance

    if(m.chanceEfeito){
      const desc = m.descricao.replace(
        "$effect_chance%", m.chanceEfeito.toString() + "% "
      )
      m.descricao = desc
    }
    return m
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

  private moveCache = new Map<string, IMove>();
  private moveInflight = new Map<string, Observable<IMove>>()

  getMoveCached(name: string): Observable<IMove> {
    const key = name.toLowerCase();

    const cached = this.moveCache.get(key);
    if (cached) return of(cached);

    const inFlight = this.moveInflight.get(key);
    if (inFlight) return inFlight;

    const $req = this.getMoveByName(key).pipe(
      map((move) => this.transformMoveObj(move)),
      shareReplay(1)
    )

    this.moveInflight.set(key, $req)

    return $req.pipe(
      map((move) => {
        this.moveCache.set(key, move)
        this.moveInflight.delete(key)
        return move
      })
    )
  }
}
