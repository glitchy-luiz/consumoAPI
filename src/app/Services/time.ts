import { Injectable, signal } from '@angular/core';
import { ITeam, TeamMember } from '../Interfaces/ITeam.interface';

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

  addPokemonToTeam(teamNome: string, pokemon: TeamMember) {
    this._times.update(times =>
      times.map(team =>
        team.nome === teamNome
          ? { ...team, membros: [...team.membros, pokemon] }
          : team
      )
    );
  }

  getTeam(id: string) {
    return this.times().find(t => t.id === id) ?? null;
  }

}
