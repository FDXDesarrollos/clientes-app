import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser'; 

import { Cliente } from './cliente';
import { Region } from './region';
//import { CLIENTES } from './clientes.json';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private urlEndPoint: string = 'http://localhost:9090/api/clientes';

  constructor(private http: HttpClient,
              private router: Router,
              private sanitizer: DomSanitizer) { }

  getRegiones(): Observable<Region[]>{
    return this.http.get<Region[]>(this.urlEndPoint + '/regiones')  //  , {headers: this.agregarAutorizacion()}
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
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`)  //  , {headers: this.agregarAutorizacion()}
    .pipe(
      catchError( (err) => {
        if(err.status != 401 && err.error.mensaje){
          this.router.navigate(['/clientes']);
          console.error(err.error.mensaje);
        }
        
        return throwError( () => err );
      })
    );
  }

  create(cliente: Cliente): Observable<Cliente>{
    console.log( cliente );
    return this.http.post(this.urlEndPoint, cliente)  //  , {headers: this.agregarAutorizacion()}
    .pipe(
      map( (response: any) => response.cliente as Cliente),
      catchError( (err) => {
        if( err.status == 400 ){
          return throwError( () => err);
        }

        if(err.error.mensaje){
          console.error(err.error.mensaje);
        }

        return throwError( () => err );
      })
    );
  }

  update(cliente: Cliente): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente) //  , {headers: this.agregarAutorizacion()}
    .pipe(
      catchError( (err) => {

        if(err.status == 400){
          return throwError( () => err );
        }

        if(err.error.mensaje){
          console.error(err.error.mensaje);
        }

        return throwError( () => err );
      })
    );    
  }

  delete(id: number): Observable<any>{
    return this.http.delete<any>(`${this.urlEndPoint}/${id}`)   //  , {headers: this.agregarAutorizacion()}
    .pipe(
      catchError( (err) => {

        if(err.error.mensaje){
          console.error(err.error.mensaje);
        }
        
        return throwError( () => err );
      })
    );    
  }

  subirImagen(id: string, archivo: File): Observable<HttpEvent<{}>>{
    let formData = new FormData();
    formData.append("id", id);
    formData.append("imagen", archivo);

    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData, { 
      reportProgress: true //, headers: httpHeaders
    });
    
    return this.http.request(req)
  }
  
}
