import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Person } from '../models/person.model';
import { URL_SERVICIOS } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private httpClient: HttpClient) { }

  get() {
    return this.httpClient.get(URL_SERVICIOS + '/persons');
  }

  save(person: Person) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(URL_SERVICIOS + '/persons', person, { headers: headers });
  }

  put(person: Person) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.put(URL_SERVICIOS + '/persons/' + person.id, person, { headers: headers });
  }

  getById(id: string) {
    return this.httpClient.get(URL_SERVICIOS + '/persons/' + id);
  }

  delete(id: string) {
    return this.httpClient.delete(URL_SERVICIOS + '/persons/' + id);
  }
}
