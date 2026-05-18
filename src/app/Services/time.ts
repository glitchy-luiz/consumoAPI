import { Injectable, signal } from '@angular/core';
import { ITeam, TeamMember, TeamStatComparison } from '../Interfaces/ITeam.interface';
import { IRelations } from '../Interfaces/ITipo.interface';

@Injectable({
  providedIn: 'root',
})
export class Time {
  
  private _times = signal<ITeam[]>([]);
  times = this._times.asReadonly();

  addTeam(nome: string) {
    this._times.update(times => [
      ...times,
      {
        id: crypto.randomUUID(),
        nome,
        membros: [],
        cobertura: [],
        status: ''
      }
    ]);
  }

  addPokemonToTeam(teamNome: string, pokemon: TeamMember, cobertura: IRelations[]) {
    this._times.update(times =>
      times.map(team =>
        team.nome === teamNome
          ? { ...team, membros: [...team.membros, pokemon], cobertura: [...team.cobertura, ...cobertura ] }
          : team
      )
    );
  }

  deletePokemonToTeam(teamNome: string, pokemon: TeamMember, cobertura: IRelations[]) {
    this._times.update(times =>
      times.map(team =>
        team.nome === teamNome
          ? { 
            ...team, 
            membros: team.membros.filter(m => m !== pokemon), 
            cobertura: team.cobertura.filter(c => !cobertura.includes(c)) 
          }
          : team
      )
    );
  }

  getTeam(nome: string) {
    return this.times().find(t => t.nome === nome) ?? null;
  }

  getStatsComparison(team: ITeam): TeamStatComparison[] {
    const map = new Map<string, TeamStatComparison>();

    for (const membro of team.membros) {
      const pokemon = membro.pokemon;

      for (const stat of pokemon.stats) {
        const entry = map.get(stat.name);

        if (!entry) {
          map.set(stat.name, {
            statName: stat.name,
            maxValue: stat.value,
            winners: [pokemon.id],
          });
          continue;
        }

        if (stat.value > entry.maxValue) {
          entry.maxValue = stat.value;
          entry.winners = [pokemon.id];
          continue;
        }

        if (stat.value === entry.maxValue) {
          entry.winners.push(pokemon.id);
        }
      }
    }

    return Array.from(map.values());
  }

}
