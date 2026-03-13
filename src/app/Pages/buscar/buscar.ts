import { Component, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-buscar',
  imports: [ReactiveFormsModule],
  templateUrl: './buscar.html',
  styleUrl: './buscar.scss',
})
export class Buscar {
  pesquisa = output<string>()

  barra = new FormGroup({
    busca: new FormControl(''),
  })

  pesquisar(){
    if(this.barra.controls['busca'].value){
      this.pesquisa.emit(this.barra.controls['busca'].value)
    }
  }
}
