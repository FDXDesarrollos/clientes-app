import { Injectable } from '@angular/core';
import { of, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { formatDate, DatePipe } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser'; 
import Swal from 'sweetalert2';

import { Cliente } from './cliente';
import { Region } from './region';
//import { CLIENTES } from './clientes.json';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private urlEndPoint: string = 'http://localhost:9090/api/clientes';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient,
              private router: Router,
              private sanitizer: DomSanitizer) { }

  getRegiones(): Observable<Region[]>{
    return this.http.get<Region[]>(this.urlEndPoint + '/regiones');
  }

  getClientes(page: number): Observable<any>{
    //return of(CLIENTES);
    //return this.http.get<Cliente[]>(this.urlEndPoint);

    return this.http.get<Cliente[]>(this.urlEndPoint + '/page/' + page).pipe(
      map( (response: any) => {  //  Formateo de datos con Map
        (response.content as Cliente[]).map( cliente => {
          cliente.nombre = cliente.nombre.toUpperCase();
          cliente.apellido = cliente.apellido.toUpperCase();
          
          if(cliente.imagen) {
            //cliente.imagen = 'data:image/jpeg;base64,' + cliente.imagen;
            let objectURL = 'data:image/jpeg;base64,' + cliente.imagen;
            cliente.imagen = this.sanitizer.bypassSecurityTrustUrl(objectURL);
            //console.log(cliente.id + ' : ' + cliente.imagen);
          }
          else{
            cliente.imagen = '../../assets/img/no-user.png';
          }

          //  Formato de fecha con formatDate
          //cliente.fecha = formatDate(cliente.fecha, 'dd/MM/yyyy', 'es-MX');

          //  Formato de fecha con DatePipe
          /*let datePipe = new DatePipe('es-MX');
          cliente.fecha = datePipe.transform(cliente.fecha, 'fullDate');*/

          return cliente;
        });

        return response;
      })
    );
  }

  getCliente(id:string): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`)
    .pipe(
      catchError( (err) => {
        this.router.navigate(['/clientes']);
          console.log(err.error.mensaje);
          Swal.fire('Error al editar', err.error.mensaje, 'error');
          return throwError( () => err );
      })
    );
  }

  create(cliente: Cliente): Observable<Cliente>{
    console.log( cliente );
    return this.http.post(this.urlEndPoint, cliente, {headers: this.httpHeaders})
    .pipe(
      map( (response: any) => response.cliente as Cliente),
      catchError( (err) => {

        if( err.status == 400 ){
          return throwError( () => err);
        }

        console.log(err.error.mensaje);
        Swal.fire('Error al registrar', err.error.mensaje + '<br><br>' + err.error.error, 'error');
        return throwError( () => err );
      })
    );
  }

  update(cliente: Cliente): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders})
    .pipe(
      catchError( (err) => {
        console.log(err.error.mensaje);
        Swal.fire('Error al editar', err.error.mensaje, 'error');
        return throwError( () => err );
      })
    );    
  }

  delete(id: number): Observable<any>{
    return this.http.delete<any>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders})
    .pipe(
      catchError( (err) => {
        console.log(err.error.mensaje);
        Swal.fire('Error al eliminar', err.error.mensaje, 'error');
        return throwError( () => err );
      })
    );    
  }

  subirImagen(id: string, archivo: File): Observable<HttpEvent<{}>>{
    let formData = new FormData();
    formData.append("id", id);
    formData.append("imagen", archivo);

    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData, { reportProgress: true });
    
    return this.http.request(req)
    .pipe(
      //map( (response: any) => response.cliente as Cliente),
      catchError( (err) => {
        console.log(err.error.mensaje);
        Swal.fire(err.error.mensaje, err.error.error, 'error');
        return throwError( () => err );
      })      
    );
  }
  




}
