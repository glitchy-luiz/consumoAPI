import { Component, OnInit } from '@angular/core';
import { Time } from '../../Services/time';
import { ActivatedRoute } from '@angular/router';
import { ITeam } from '../../Interfaces/ITeam.interface';
import MockTeam from '../../Mocks/mockTeam';

@Component({
  selector: 'app-time-detalhes',
  imports: [],
  templateUrl: './time-detalhes.html',
  styleUrl: './time-detalhes.scss',
})
export class TimeDetalhes implements OnInit{
  time:ITeam = MockTeam.giveEmptyTeam()
  constructor(private activeRoute: ActivatedRoute, private timeService: Time){}

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
      const id = params.get('id')
      if (!id) return
      this.time = this.timeService.getTeam(id)!
    })
  }


}
