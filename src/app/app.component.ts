import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthService } from './usuarios/auth.service';

import Swal from 'sweetalert2';


@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'Clientes App';
  @ViewChild( MatSidenav )
  sidenav!: MatSidenav;

  menuNav = [
    {name: "Dashboard", route: "#", icon: "timeline"},    
    {name: "Directiva", route: "directiva", icon: "category"},
    {name: "Clientes", route: "clientes", icon:"person"},
    {name: "About", route: "#", icon:"info"}
  ];

  constructor(private observer: BreakpointObserver, private router: Router, public authService: AuthService) {}

  ngAfterViewInit(): void {
    this.observer
    .observe(["(max-width: 800px)"])
    .pipe(delay(1), untilDestroyed(this))
    .subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });

    /*this.router.events
    .pipe(
      untilDestroyed(this),
      filter((e) => e instanceof NavigationEnd)
    )
    .subscribe(() => {
      if (this.sidenav.mode === 'over') {
        this.sidenav.close();
      }
    });*/
  }

  logout(){
    let username = this.authService.usuario.username;
    this.authService.logout();
    Swal.fire('Logout', `Sesión ${username} cerrada exitosamente`, 'info');
    this.router.navigate(['/login']);
  }

}


