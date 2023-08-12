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
  public errores!: string[];

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

}
