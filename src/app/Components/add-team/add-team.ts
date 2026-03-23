import { Component, inject, Inject, input } from '@angular/core';
import { ɵInternalFormsSharedModule, ReactiveFormsModule, FormGroup, FormControl } from "@angular/forms";
import { Time } from '../../Services/time';
import { ITeam, TeamMember } from '../../Interfaces/ITeam.interface';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IDetalhesVM } from '../../Interfaces/IDetalhesVM.interface';
import { IRelations } from '../../Interfaces/ITipo.interface';

@Component({
  selector: 'app-add-team',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './add-team.html',
  styleUrl: './add-team.scss',
})
export class AddTeam {
  times: ITeam[]
  // pokemon = input.required<TeamMember>()
  form = new FormGroup({
    titulo: new FormControl(''),
    time: new FormControl
  })

  // data = inject<TeamMember>(MAT_DIALOG_DATA)
  constructor(
    private timeService:Time, 
    private dialogRef: MatDialogRef<AddTeam>,
    @Inject(MAT_DIALOG_DATA) public data: {detalhes: IDetalhesVM, relations: IRelations[]}
  ){
    this.times = timeService.times()
  }

  adicionar(){
    const pokemon:TeamMember = {
      pokemon: this.data.detalhes,
      tipoRelation: this.data.relations
    }
    const titulo = this.form.controls.titulo.value
    const time = this.form.controls.time.value

    if(titulo){
      this.timeService.addTeam(titulo)
      this.timeService.addPokemonToTeam(titulo, pokemon)
    }

    if(time){
      this.timeService.addPokemonToTeam(time, pokemon)
    }
    this.dialogRef.close()
  }
}
