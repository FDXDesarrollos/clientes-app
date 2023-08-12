import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatIconModule } from '@angular/material/icon'; 
import { MatDividerModule } from '@angular/material/divider'; 
import { MatMenuModule } from '@angular/material/menu';
import { DirectivaComponent } from './directiva/directiva.component';
import { ClientesComponent } from './clientes/clientes.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { FormComponent } from './clientes/form.component';
import { FormsModule } from '@angular/forms';

/***  Configuración global para la internacionalización de LocaleData   ***/
/***  para formato de fechas, monedas, currency   ***/
import localeES from '@angular/common/locales/es-MX';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeES, 'es-MX');
/****************************************************************** */


@NgModule({
  declarations: [
    AppComponent,
    DirectivaComponent,
    ClientesComponent,
    PagenotfoundComponent,
    FormComponent
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
    FormsModule
  ],
  providers: [{provide: LOCALE_ID, useValue: 'es-MX'}],   //  Se agrega esta linea entre {...} para poder usar el formato en las vistas
  bootstrap: [AppComponent]
})
export class AppModule { }
