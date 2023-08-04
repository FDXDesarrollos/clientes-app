import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

import { Cliente } from './cliente';
import { CLIENTES } from './clientes.json';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor() { }

  getClientes(): Observable<Cliente[]>{
    return of(CLIENTES);
  }
  
}
