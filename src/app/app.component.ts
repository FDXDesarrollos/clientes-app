import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';


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

  constructor(private observer: BreakpointObserver) {}

  ngOnInit(){

  }

  ngAfterViewInit(): void {
    this.observer.observe(["(max-width: 800px)"]).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

  logout(){

  }

}
