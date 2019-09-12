import { Component, OnInit } from '@angular/core';
import { Person } from '../models/person.model';
import { PersonService } from '../services/person.service';
import Swal from 'sweetalert2'
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  person: Person = {
    name: "",
    email: "",
    cellphone: null,
    reason: ""
  };

  REASONS: string[] = ['Compra', 'Venta', 'Alquiler'];

  id: any;
  editing: boolean = false;

  constructor(
    private _personService: PersonService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {
      this.editing = true;
      this._personService.getById(this.id).subscribe((person: Person) => {
        if (person) {
          this.person = person;
        } else {
          Swal.fire({
            title: '¡Usuario no existe!',
            text: 'El usuario que intenta editar no existe ',
            type: 'warning',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Listo!'
          }).then((result) => {
            if (result.value) {
              this.router.navigate(['/home']);
            }
          });
        }

      }, (error) => {
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Algo salió mal: ' + error.error.message
        })
      });
    } else {
      this.editing = false;
    }
  }

  ngOnInit() {
  }

  savePerson(forma: NgForm) {

    if (this.editing) {
      this._personService.put(this.person).subscribe(() => {
        Swal.fire({
          title: '¡Visitante actualizado!',
          text: "El visitante fue actualizado exitosamente",
          type: 'success',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Listo!'
        }).then((result) => {
          if (result.value) {
            this.router.navigate(['/home']);
          }
        })
      }, (error) => {
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Algo salió mal: ' + error.error.message
        })
      });
    } else {
      this._personService.save(this.person).subscribe(() => {
        Swal.fire({
          title: '¡Visitante registrado!',
          text: this.person.name + " fue registrado satisfactoriamente",
          type: 'success',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Listo!'
        }).then((result) => {
          if (result.value) {
            this.router.navigate(['/home']);
          }
        })
      }, (error) => {
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Algo salió mal: ' + error.error.message
        })
      });
    }


  }
}
