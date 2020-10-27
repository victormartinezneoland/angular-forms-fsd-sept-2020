import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {

  forma: FormGroup;

  constructor(private fb: FormBuilder) {
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

  createForm(): void {
    this.forma = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$')]],
      direccion: this.fb.group({
        calle: ['', Validators.required],
        ciudad: ['', Validators.required],
        pais: ['', Validators.required],
      })
    });
  }

  saveForm(): void {
    console.log(this.forma);
    // this.loadDataToForm();
    this.forma.reset({
      nombre: 'Valor por defecto tras reset'
    });
  }

  loadDataToForm() {
    this.forma.setValue({
      nombre: '',
      apellido: 'Otilia',
      email: 'prueba@prueba.com',
      direccion: {
        calle: 'De la Amargura',
        ciudad: 'Hey',
        pais: 'Narnia'
      }
    });
  }

}
