import { Component, OnInit, ViewChild } from '@angular/core';
import { tap, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

//import { MatTableDataSource } from '@angular/material/table';
//import { MatPaginator } from '@angular/material/paginator';

import { Cliente } from './cliente';
import { ModalService } from './detalle/modal.service';
import { ClienteService } from './cliente.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  public paginador: any;
  public clienteSelec: Cliente;
  public clientes: Cliente[] = [];

  /*@ViewChild( MatPaginator ) paginador: MatPaginator;
  public displayedColumns: string[] = ['id','nombre','apellido','correo','fecha','acciones'];
  public dataSource = new MatTableDataSource();*/

  constructor(private clienteService: ClienteService,
              private modalService: ModalService,
              private activatedRoute: ActivatedRoute) { }

  /*ngOnInit(): void {
    this.clienteService.getClientes()
    .pipe(
      tap(clientes => {
        console.log('ClientesComponent: ');
        (clientes).forEach(cliente => {
          console.log(cliente.nombre);
        });
      })
    )    
    .subscribe((clientes) => {
      this.clientes = clientes;

      this.dataSource.data = this.clientes;
      this.dataSource.paginator = this.paginador;
    });
  }*/

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe( params => {
        let page: number = Number( params.get('page') );

        if(!page){
          page = 0;
        }

        this.clienteService.getClientes(page)
        .pipe(
          tap((response: any) => {
            console.log('Tap - ClientesComponent: ');

            /*(response.content as Cliente[]).forEach(cliente => {
              console.log(cliente.id + ' : ' + cliente.nombre + ' : ' + cliente.imagen);
            });*/
          })
        )
        .subscribe((response: any) => {
          this.paginador = response;
          this.clientes = response.content as Cliente[];
        });
    });

    // Suscripción al 'EventEmitter' de 'modalService' para procesar el cliente emitido
    this.modalService.notificarUpload.subscribe( clienteEmitido => {
      //  Recorrer listado de clientes con el 'map' ya que este nos permite modificar
      this.clientes = this.clientes.map(clienteLista => {
        if(clienteLista.id == clienteEmitido.id){
          clienteLista.imagen = 'data:image/jpeg;base64,' + clienteEmitido.imagen;
        }

        return clienteLista;
      });
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
          this.clientes = this.clientes.filter(cli => cli !== cliente);
          Swal.fire(
            'Cliente Eliminado!',
            `Cliente "${cliente.nombre}" eliminado con éxito`,
            'success'
          );
        });
        
      }
    })    

  }

  verDetalle(cliente: Cliente): void{
    this.clienteSelec = cliente;
    this.modalService.abrirModal();
  }

}
