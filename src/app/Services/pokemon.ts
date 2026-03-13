import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICard } from '../Interfaces/ICard.interface';

@Injectable({
  providedIn: 'root',
})
export class Pokemon {
  private url:string = 'https://pokeapi.co/api/v2/'
  private http = inject(HttpClient)

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
    const pokemon: ICard = {
      nome: '',
      tipo1: '',
      tipo2: '',
      sprite: '',
      id: ''
    }
    pokemon!.nome = pkm?.name
    pokemon!.tipo1 = pkm?.types?.[0]?.type?.name ?? 'desconhecido';
    pokemon!.tipo2 = pkm?.types?.[1]?.type?.name ?? '';
    pokemon!.sprite = pkm?.sprites?.front_default ?? '';
    pokemon!.id = pkm?.id
    return pokemon
  }
}
