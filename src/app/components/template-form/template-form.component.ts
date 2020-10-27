import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  firstName: string;
  lastName: string;
  emailAddress: string;

  constructor() { }

  ngOnInit(): void {
  }

  saveForm(formdata) {
    console.log('Soy el método saveForm!');
    console.log('Este es el formdata', formdata);
    // if (formdata.status === 'INVALID') {
    //   return;
    // }


    const { nombre, apellido, email } = formdata.value;
    this.firstName = nombre;
    this.lastName = apellido;
    this.emailAddress = email;
  }

}
