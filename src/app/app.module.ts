import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import  {FormsModule} from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
//Interceptor

import { AuthInterceptor } from './interceptors/auth.interceptor';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from '@components/shared/header/header.component';
import { LoginComponent } from '@components/auth/login/login.component';
import { EmpresasListComponent } from '@components/empresas/empresas-list/empresas-list.component';
import { EmpresasDetailComponent } from '@components/empresas/empresas-detail/empresas-detail.component';
import { PersonasListComponent } from '@components/personas/personas-list/personas-list.component';
import { PersonasDetailComponent } from '@components/personas/personas-detail/personas-detail.component';
import { DepartamentosLocalidadesComponent } from '@components/departamentos-localidades/departamentos-localidades.component';
import { DashboardComponent } from '@components/dashboard/dashboard.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { SidebarMenuComponent } from './components/shared/sidebar-menu/sidebar-menu.component';
import { EmpresasCreateComponent } from '@components/empresas/empresas-create/empresas-create.component';
import { PersonasCreateComponent } from '@components/personas/personas-create/personas-create.component';
import { UserInfoComponent } from '@components/user-info/user-info.component';
import { NotFoundComponent } from '@components/not-found/not-found.component';


import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!

import { JwPaginationModule } from 'jw-angular-pagination';


//Pipes
import { FilterByNamePipe } from './pipes/filterByName/filter-by-name.pipe';
import { FilterByNameDepartmentPipe } from './pipes/filterByNameDepartment/filter-by-name-department.pipe';






FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin
  
]);
 
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    EmpresasListComponent,
    EmpresasDetailComponent,
    PersonasListComponent,
    PersonasDetailComponent,
    DepartamentosLocalidadesComponent,
    DashboardComponent,
    InicioComponent,
    SidebarMenuComponent,
    EmpresasCreateComponent,
    PersonasCreateComponent,
    UserInfoComponent,
    NotFoundComponent,
    FilterByNamePipe,
    FilterByNameDepartmentPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FullCalendarModule,
    JwPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AutocompleteLibModule
   
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,     
      useClass: AuthInterceptor,      
      multi: true                        


    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
