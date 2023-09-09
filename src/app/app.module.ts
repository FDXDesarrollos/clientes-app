import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatIconModule } from '@angular/material/icon'; 
import { MatDividerModule } from '@angular/material/divider'; 
import { MatMenuModule } from '@angular/material/menu';

//import { MatTableModule } from '@angular/material/table';
//import { MatPaginatorModule } from '@angular/material/paginator';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
//import { MatNativeDateModule } from '@angular/material/core';

import { DirectivaComponent } from './directiva/directiva.component';
import { ClientesComponent } from './clientes/clientes.component';
import { FormComponent } from './clientes/form.component';
import { PaginadorComponent } from './clientes/paginador/paginador.component';
import { DetalleComponent } from './clientes/detalle/detalle.component';
import { LoginComponent } from './usuarios/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

import { AuthInterceptor } from './usuarios/interceptors/auth.interceptor';
import { TokenInterceptor } from './usuarios/interceptors/token.interceptor';

/***  Configuración global para la internacionalización de LocaleData   ***/
/***  para formato de fechas, monedas, currency   ***/
import localeES from '@angular/common/locales/es-MX';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeES, 'es-MX');
/************************************************************************ */


@NgModule({
  declarations: [
    AppComponent,
    DirectivaComponent,
    ClientesComponent,
    PagenotfoundComponent,
    FormComponent,
    PaginadorComponent,
    DetalleComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatMenuModule,
    //MatTableModule,
    //MatPaginatorModule,
    MatDatepickerModule, MatMomentDateModule,
    FormsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-MX' },  //  Se agrega esta linea entre {...} para poder usar el formato en las vistas
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],   
  
  bootstrap: [AppComponent]
})
export class AppModule { }
