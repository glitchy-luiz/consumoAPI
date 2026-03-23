import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import MockTipo from '../Mocks/mockTipo';
import { IRelations, ITipo, Relation } from '../Interfaces/ITipo.interface';
import { firstValueFrom, map, Observable, of, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Tipos {
  private url = 'https://pokeapi.co/api/v2/type/'
  private tipoCache = new Map<string, ITipo>();
  private inflight = new Map<string, Observable<ITipo>>()

  constructor(private http: HttpClient){}

  getTypeByName(name:string){
    return this.http.get(this.url + name)
  }

  transformType(type:any): ITipo{
    const tipo:ITipo = MockTipo.giveEmptyTipo()
    tipo.nome = type.name
    // tipo.sprite = type.sprites["generation-vi"]["x-y"].name_icon
    tipo.sprite = type.sprites["generation-viii"]["sword-shield"].symbol_icon
    tipo.fraquezas = type.damage_relations.double_damage_from
    tipo.vantagens = type.damage_relations.double_damage_to
    tipo.resistencias = type.damage_relations.half_damage_from
    tipo.fraquezasOfencivas = type.damage_relations.half_damage_to
    tipo.imunidades = type.damage_relations.no_damage_from

    return tipo
  }

  getTipoCached(name: string): Observable<ITipo> {
    const key = name.toLowerCase();

    const cached = this.tipoCache.get(key);
    if (cached) return of(cached);

    const inFlight = this.inflight.get(key);
    if (inFlight) return inFlight;

    const $req = this.getTypeByName(key).pipe(
      map((tipo) => this.transformType(tipo)),
      shareReplay(1)
    )

    this.inflight.set(key, $req)

    return $req.pipe(
      map((tipo) => {
        this.tipoCache.set(key, tipo)
        this.inflight.delete(key)
        return tipo
      })
    )
  }

  async getDamageRelationsByTypes(types: ITipo[]){
    
    const relationsTypes: IRelations[] = await Promise.all(types.map(async (tipo) => {
      const relationsType:IRelations = {
        vantagens: await this.resolveRelations(tipo.vantagens),
        fraquezas: await this.resolveRelations(tipo.fraquezas),
        resistencias: await this.resolveRelations(tipo.resistencias),
        fraquezasOfencivas: await this.resolveRelations(tipo.fraquezasOfencivas),
        imunidades: await this.resolveRelations(tipo.imunidades)
      }
      return relationsType
    }))

    return relationsTypes

  }

  private async resolveRelations(typeNames: string[]): Promise<Relation[]> {
    const types = await Promise.all(
      typeNames.map((name:any) =>
        firstValueFrom(this.getTipoCached(name.name))
      )
    );

    return types.map(t => ({
      nome: t.nome,
      sprite: t.sprite
    }));
  }
}
