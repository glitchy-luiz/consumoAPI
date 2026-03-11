import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

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
}
