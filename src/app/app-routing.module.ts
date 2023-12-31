import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DirectivaComponent } from './directiva/directiva.component';
import { ClientesComponent } from './clientes/clientes.component';
import { FormComponent } from './clientes/form.component';
import { LoginComponent } from './usuarios/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

import { AuthGuard } from './usuarios/guards/auth.guard';
import { RoleGuard } from './usuarios/guards/role.guard';


const routes: Routes = [
  {path: '', redirectTo: 'clientes', pathMatch: 'full'},
  {path: 'directiva', component: DirectivaComponent},
  {path: 'clientes', component: ClientesComponent},
  {path: 'clientes/form', component: FormComponent, canActivate:[AuthGuard, RoleGuard], data:{role:'ROLE_ADMIN'}},
  {path: 'clientes/form/:id', component: FormComponent, canActivate:[AuthGuard, RoleGuard], data:{role:'ROLE_ADMIN'}},
  {path: 'clientes/page/:page', component: ClientesComponent},
  {path: 'login', component: LoginComponent},
  {path: '**', component: PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
