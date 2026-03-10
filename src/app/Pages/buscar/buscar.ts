import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-buscar',
  imports: [],
  templateUrl: './buscar.html',
  styleUrl: './buscar.scss',
})
export class Buscar {
  barra = new FormGroup({
    busca: new FormControl(''),
  })

  pesquisar(){
    if(this.barra.controls['busca'].value){
      
    }
  }
}
