import { Component, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [];

  @ViewChild( MatPaginator ) paginador: MatPaginator;
  public displayedColumns: string[] = ['id','nombre','apellido','correo','fecha','acciones'];
  public dataSource = new MatTableDataSource();

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe((clientes) => {
      this.clientes = clientes;

      this.dataSource.data = this.clientes;
      this.dataSource.paginator = this.paginador;
    });
  }

  delete(cliente: Cliente): void {
    Swal.fire({
      title: 'Estas seguro?',
      text: `¿Eliminar al cliente: "${cliente.nombre} ${cliente.apellido}"?`,
      icon: 'warning',
      showCancelButton: true,
      /*confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',*/
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar',      
    }).then((result) => {
      if (result.isConfirmed) {

        this.clienteService.delete(cliente.id)
        .subscribe( (response) => {
          this.clientes = this.clientes.filter(cli => cli !== cliente)
          Swal.fire(
            'Cliente Eliminado!',
            `Cliente "${cliente.nombre}" eliminado con éxito`,
            'success'
          )
        });
        
      }
    })    

  }

}
