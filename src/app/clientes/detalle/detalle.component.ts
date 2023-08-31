import { Component, OnInit, Input } from '@angular/core';
import { HttpEventType } from '@angular/common/http';
//import { ActivatedRoute } from '@angular/router';

import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import { ModalService } from './modal.service';

import Swal from 'sweetalert2';


@Component({
  selector: 'cliente-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  public titulo: string = 'Detalle de Cliente';
  public imagenSelec: File;
  public nombreImagen: string = 'Selecciona imagen';
  public progreso: number = 0;
  public imageBlob: any;
  

  @Input() cliente: Cliente;

  constructor(private clienteService: ClienteService,
              public modalService: ModalService,
              //private activatedRoute: ActivatedRoute
              ) {  }

  ngOnInit(): void {
    /*** Bloque comentado ya que se implementa unformulario modal como un componente anidado (hijo) 
     * y no es necesario recuperar el 'id' de la ruta ***/

    /*this.activatedRoute.paramMap.subscribe(params => {
      let id: string = params.get('id');
      
      if(id){
        this.clienteService.getCliente( id ).subscribe(cliente => {
            this.cliente = cliente;

            if(this.cliente.imagen) {
              this.thumbnail = 'data:image/jpeg;base64,' + this.cliente.imagen;
              //let objectURL = 'data:image/jpeg;base64,' + this.cliente.imagen;
              //this.thumbnail = this.sanitizer.bypassSecurityTrustUrl(objectURL);
            }
        });
      }

    });*/
  }

  ngOnChanges(): void {
    this.imageBlob = this.cliente.imagen;
  }

  selecImagen(event): void{
    this.progreso = 0;
    this.imagenSelec = event.target.files[0];
    this.nombreImagen = this.imagenSelec.name;

    //console.log( this.imagenSelec );
    
    if(this.imagenSelec.type.indexOf('image') < 0){
      this.imagenSelec = null;
      this.nombreImagen = 'Selecciona imagen';
      Swal.fire('Error !', 'El archivo debe ser del tipo imagen', 'error');
    }

    if(this.imagenSelec.size > (1024*1024)){
      this.imagenSelec = null;
      this.nombreImagen = 'Selecciona imagen';      
      Swal.fire('Error !', 'La imagen debe ser menor a 1MB', 'error');
    }
  }

  subirImagen(): void{
    if(!this.imagenSelec){
      Swal.fire('Error !', 'Debe seleccionar una imagen', 'error');
    }
    else {
      this.clienteService.subirImagen(String(this.cliente.id), this.imagenSelec)
      .subscribe(event => {
        if(event.type === HttpEventType.UploadProgress){
          this.progreso = Math.round( (event.loaded/event.total)*100 );
        } else if( event.type === HttpEventType.Response ) {
          let response: any = event.body;
          this.cliente = response.cliente;

          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.imageBlob = e.target.result;
          };
          reader.readAsDataURL(this.imagenSelec);

          // Emisión del objeto 'cliente' mediante el 'modalService' para actualizar la imagen del listado
          this.modalService.notificarUpload.emit( this.cliente );

          Swal.fire('Exíto!', response.mensaje, 'success');
          this.imagenSelec = null;
          this.nombreImagen = 'Selecciona imagen';
        }
      });
    }
  }

  cerrarModal(): void{
    this.progreso = 0;
    this.imageBlob = null;
    this.imagenSelec = null;
    this.nombreImagen = 'Selecciona imagen';
    this.modalService.cerrarModal();
  }

}
