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
    console.log(this.relations())
  }

  home(){
    this.router.navigate([''])
  }

  deletePokemon(pkm: TeamMember){
    const newList = this.time().membros.filter(item => item != pkm)
    this.time().membros = newList
  }

}
