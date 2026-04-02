import { Component, input } from '@angular/core';
import { ITeam } from '../../Interfaces/ITeam.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team-card',
  imports: [],
  templateUrl: './team-card.html',
  styleUrl: './team-card.scss',
})
export class TeamCard {
  time = input<ITeam>()
  constructor(private router: Router){}

  timeDetalhe(){
    this.router.navigate(['timeDetalhes/' + this.time()?.nome])
  }
}
