import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  public titulo: string = "Nuevo Cliente";
  public cliente: Cliente = new Cliente();

  constructor(private clienteService: ClienteService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.show();
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
    this.clienteService.create(this.cliente)
    .subscribe( cliente => {
        Swal.fire('Nuevo cliente', `Cliente "${cliente.nombre}" registrado correctamente!`, 'success');
        this.router.navigate(['/clientes']);
      }
    );
  }

  public update(): void {
    this.clienteService.update(this.cliente)
    .subscribe( cliente => {
      Swal.fire('Cliente Acualizado', `Cliente "${cliente.nombre}" actualizado correctamente!`, 'success');
      this.router.navigate(['/clientes']);
    })
  }

}
