import { Component, Inject, OnInit, signal } from '@angular/core';
import { Time } from '../../Services/time';
import { ActivatedRoute, Router } from '@angular/router';
import { ITeam, TeamMember } from '../../Interfaces/ITeam.interface';
import MockTeam from '../../Mocks/mockTeam';
import { Tipos } from '../../Services/tipos';
import { IRelations } from '../../Interfaces/ITipo.interface';

@Component({
  selector: 'app-time-detalhes',
  imports: [],
  templateUrl: './time-detalhes.html',
  styleUrl: './time-detalhes.scss',
})
export class TimeDetalhes implements OnInit{
  // time:ITeam = MockTeam.giveEmptyTeam()
  time = signal<ITeam>(MockTeam.giveEmptyTeam())
  relations = signal<IRelations | null>(null)
  constructor(
    private activeRoute: ActivatedRoute, 
    private timeService: Time, 
    private router: Router,
    @Inject(Tipos) private tipoService:Tipos
  ){}

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
      const id = params.get('id')
      if (!id) return
      this.loadInfo(id)
    })
  }
  
  async loadInfo(id:string){
    this.time.set(await this.timeService.getTeam(id)!)
    this.relations.set(this.tipoService.mergeRelationsList(this.time().cobertura))
  }

  home(){
    this.router.navigate([''])
  }

  deletePokemon(pkm: TeamMember){
    this.timeService.deletePokemonToTeam(this.time().nome, pkm, pkm.tipoRelation)
    this.ngOnInit()
  }

  details(pkm: TeamMember){
    this.router.navigate(['detalhes/' + pkm.pokemon.id])
  }

  statsHandle(pkm: any){
    const maxStats:number = 255
    
    const getColor = (percent: number) => {
      if (percent < 30) return '#e53935';
      if (percent < 60) return '#fbc02d';
      return '#43a047';
    };

    const stats = pkm.stats.map((stat:any) => {
      const value = stat.base_stat
      const percent = Math.round((value / maxStats) * 100)
      return{
        name: stat.stat.name.toUpperCase(), 
        value,
        percent,
        color: getColor(percent)
      }
    })
    return stats
  }

}
