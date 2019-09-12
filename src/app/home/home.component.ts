import { Component, OnInit } from '@angular/core';
import { PersonService } from '../services/person.service';
import { Person } from '../models/person.model';
import { faEdit, faTrashAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faUserPlus= faUserPlus;
  persons: Person[];

  constructor(
    private _personService: PersonService) {
    this.getPersons();
  }

  ngOnInit() {
  }

  delete(personId: string) {
    Swal.fire({
      title: '¿Estás seguro que deseas eliminar a esta persona?',
      text: "No podrás revertir esto",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.value) {
        this._personService.delete(personId).subscribe(() => {
          Swal.fire(
            'Eliminado',
            'La persona fue removida del sistema',
            'success'
          )
          this.getPersons();

        }, (error) => {
          Swal.fire(
            'Error',
            'Error al remover persona: ' + error.error.message,
            'error'
          )
        });

      }
    })
  }

  getPersons() {
    this._personService.get().subscribe((persons: Person[]) => {
      this.persons = persons;
    });
  }

}
