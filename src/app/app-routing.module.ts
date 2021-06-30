import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Components

import { LoginComponent } from '@components/auth/login/login.component';
import { EmpresasListComponent } from '@components/empresas/empresas-list/empresas-list.component';
import { EmpresasDetailComponent } from '@components/empresas/empresas-detail/empresas-detail.component';
import { PersonasListComponent } from '@components/personas/personas-list/personas-list.component';
import { PersonasDetailComponent } from '@components/personas/personas-detail/personas-detail.component';
import { DepartamentosLocalidadesComponent } from '@components/departamentos-localidades/departamentos-localidades.component';
import { DashboardComponent } from '@components/dashboard/dashboard.component';
import { InicioComponent } from '@components/inicio/inicio.component';
import { EmpresasCreateComponent } from '@components/empresas/empresas-create/empresas-create.component';
import { PersonasCreateComponent } from '@components/personas/personas-create/personas-create.component';


const routes: Routes = [
  {path: 'login',component: LoginComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home',component: InicioComponent, children: [
    {path: '',redirectTo: 'dashboard', pathMatch: 'full'},
    {path: 'dashboard',component: DashboardComponent},
    {path: 'empresas',component: EmpresasListComponent},
    {path: 'empresas/create',component: EmpresasCreateComponent},
    {path:  'personas',component: PersonasListComponent},
    {path:  'departamentos-localidades', component: DepartamentosLocalidadesComponent},
    { path:   'empresas/:id/detail', component: EmpresasDetailComponent},
    {path:  'personas/:id/detail',component: PersonasDetailComponent},
    {path:  'personas/create', component: PersonasCreateComponent}
  ]},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
