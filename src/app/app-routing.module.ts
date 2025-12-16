import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LayoutPrincipalComponent } from './layout/layout-principal/layout-principal.component';
import { CalendarComponent } from './calendar/calendar.component';
import { PublicGuard } from './guards/public.guard';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { EsqueciSenhaComponent } from './esqueci-senha/esqueci-senha.component';
//import { pathToFileURL } from 'url';


const routes: Routes = [
  {path: '', redirectTo: 'auth/login', pathMatch: 'full'},
  {path: 'auth/login', component: LoginComponent, canActivate: [PublicGuard] },
  {path: 'auth/register', component: RegisterComponent, canActivate: [PublicGuard]},
  {path: 'auth/esqueci-senha', component: EsqueciSenhaComponent, canActivate: [PublicGuard]},
  {path: 'main', component: LayoutPrincipalComponent, canActivate: [AuthGuardGuard] , children: [
    {path: '', redirectTo: 'calendar', pathMatch: 'full'},
    { path: 'calendar', component: CalendarComponent },
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
