import { Component, input } from '@angular/core';
import { ITeam } from '../../Interfaces/ITeam.interface';

@Component({
  selector: 'app-team-card',
  imports: [],
  templateUrl: './team-card.html',
  styleUrl: './team-card.scss',
})
export class TeamCard {
  time = input<ITeam>()
}
