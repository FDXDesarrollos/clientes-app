import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

import Swal from 'sweetalert2';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, 
              private router: Router){}  

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(err =>{
        if(err.status == 401){  //  credenciales de autenticación no válidas
          if(this.authService.isAuthenticated()){
            this.authService.logout();
          }
    
          this.router.navigate(['/login']);
        }
    
        if(err.status == 403){
          Swal.fire('Acceso denegado', `Usuario ${this.authService.usuario.username} sin acceso al recurso`, 'warning');
          this.router.navigate(['/clientes']);
        }

        return throwError( () => err );
      })
    );
  }
}