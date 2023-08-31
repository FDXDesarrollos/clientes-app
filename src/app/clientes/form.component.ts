import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from './cliente.service';
import Swal from 'sweetalert2';

import { Cliente } from './cliente';
import { Region } from './region';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  public titulo: string = "Nuevo Cliente";
  public cliente: Cliente = new Cliente();
  public regiones: Region[];
  public errores!: string[];

  constructor(private clienteService: ClienteService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.show();

    this.clienteService.getRegiones().subscribe(regiones => this.regiones = regiones);
  }

  show(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];

      if( id ){
        this.clienteService.getCliente(id)
        .subscribe( (cliente) => this.cliente = cliente );
      }

    });
  }

  public create(): void {
    this.clienteService.create(this.cliente).subscribe({
      next:
      cliente => {
        this.router.navigate(['/clientes']);
        Swal.fire('Nuevo cliente', `Cliente "${cliente.nombre}" registrado correctamente`, 'success');
        
      },
      error:
      err => {
        this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    });
  }

  public update(): void {
    this.clienteService.update(this.cliente)
    .subscribe( (response: any) => {
      Swal.fire('Cliente Acualizado', `${response.mensaje} de Cliente: <br> ${response.cliente.nombre}`, 'success');
      this.router.navigate(['/clientes']);
      },
      (err: any) => {
        this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );
  }

  public selecRegion(obj1: Region, obj2: Region): boolean{  //  El 1er objeto corresponde a cada una de las regiones del ngFor y el 2do en el objeto que esta asignado al cliente
    if(obj1 === undefined && obj2 === undefined){ return true; }
    return (obj1 == null || obj2 == null) ? false : obj1.id === obj2.id;
  }

}
