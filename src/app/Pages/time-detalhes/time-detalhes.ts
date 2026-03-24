import { Component, OnInit, signal } from '@angular/core';
import { Time } from '../../Services/time';
import { ActivatedRoute } from '@angular/router';
import { ITeam } from '../../Interfaces/ITeam.interface';
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
  time:ITeam = MockTeam.giveEmptyTeam()
  relations = signal<IRelations | null>(null)
  constructor(private activeRoute: ActivatedRoute, private timeService: Time, private tipoService: Tipos){}

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
      const id = params.get('id')
      if (!id) return
      this.loadInfo(id)
    })
  }
  
  async loadInfo(id:string){
    this.time = await this.timeService.getTeam(id)!
    this.relations.set(this.tipoService.mergeRelationsList(this.time.cobertura))
    console.log(this.relations())
  }


}
