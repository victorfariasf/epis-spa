import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule} from '@angular/forms';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { LayoutPrincipalComponent } from './layout/layout-principal/layout-principal.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarComponent } from './calendar/calendar.component';
import { AccessibilityButtonComponent } from './accessibility-button/accessibility-button.component';
import { FormsModule } from '@angular/forms';
import { EventViewComponent } from './event-view/event-view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { EditarPerfilComponent } from './layout/editar-perfil/editar-perfil.component';
import { TurmasComponent } from './turmas/turmas.component';


@NgModule({
  declarations: [
    AppComponent,
    LayoutPrincipalComponent,
    LoginComponent,
    RegisterComponent,
    CalendarComponent,
    AccessibilityButtonComponent,
    EventViewComponent,
    EditarPerfilComponent,
    TurmasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModalModule,
    ReactiveFormsModule,
    FullCalendarModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbCollapseModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
