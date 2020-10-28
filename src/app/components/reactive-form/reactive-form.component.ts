import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/services/validators.service';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {

  forma: FormGroup;

  constructor(private fb: FormBuilder,
              private validadores: ValidatorsService) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  get nombreInvalido(): boolean {
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched;
  }

  get apellidoInvalido(): boolean {
    return this.forma.get('apellido').invalid && this.forma.get('apellido').touched;
  }

  get emailInvalido(): boolean {
    return this.forma.get('email').invalid && this.forma.get('email').touched;
  }

  // Para acceder al contenido de HOBBIES
  get hobbies(): FormArray {
    return this.forma.get('hobbies') as FormArray;
  }

  createForm(): void {
    this.forma = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3), this.validadores.isAdmin]],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$')], this.validadores.emailExists],
      direccion: this.fb.group({
        calle: ['', Validators.required],
        ciudad: ['', Validators.required],
        pais: ['', Validators.required],
      }),
      hobbies: this.fb.array([])
    });
  }

  saveForm(): void {
    console.log('FORMULARIO', this.forma);
    // this.loadDataToForm();
    // this.forma.reset({
    //   nombre: 'Valor por defecto tras reset'
    // });
  }

  // loadDataToForm() {
  //   this.forma.setValue({
  //     nombre: '',
  //     apellido: 'Otilia',
  //     email: 'prueba@prueba.com',
  //     direccion: {
  //       calle: 'De la Amargura',
  //       ciudad: 'Hey',
  //       pais: 'Narnia'
  //     }
  //   });
  // }

  addHobby(): void {
    this.hobbies.push( this.fb.control('', Validators.required) );
  }

  deleteHobby(id: number): void {
    this.hobbies.removeAt(id);
  }

}
