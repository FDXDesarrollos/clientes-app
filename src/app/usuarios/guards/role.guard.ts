import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService,
    private router: Router){}  

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      if(!this.authService.isAuthenticated()){
        this.router.navigate(['/login']); 
        return false;
      }

      let role = route.data['role'] as string;
      console.log(role);

      if(this.authService.tienePermiso(role)){
        return true;
      }

      Swal.fire('Acceso denegado', `Usuario ${this.authService.usuario.username} sin acceso al recurso`, 'warning');
      this.router.navigate(['/clientes']);      

    return false;
  }
  
}
