import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DailyactivitiesComponent } from "./components/dailyactivities/dailyactivities.component";
import { RoleComponent } from "./components/role/role.component";
import { UserComponent } from "./components/user/user.component";
import { MedicalrecordComponent } from './components/medicalrecord/medicalrecord.component';
import { ClinicalHistoryDetail } from './models/ClinicalHistoryDetail';
import { ClinicalhistorydetailComponent } from './components/clinicalhistorydetail/clinicalhistorydetail.component';
import { AppointmentComponent } from "./components/appointment/appointment.component";
import { NotificationComponent } from "./components/notification/notification.component";
import { RecipeComponent } from "./components/recipe/recipe.component";
import { ReviewComponent } from "./components/review/review.component";
import { MenulandingComponent } from "./components/menulanding/menulanding.component";
import { ToolbarComponent } from "./components/toolbar/toolbar.component";
import { LoginComponent } from "./components/login/login.component";
import { LoginService } from './services/login.service';
import { ListarAppointmentComponent } from "./components/appointment/listar-appointment/listar-appointment.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MedicalrecordComponent, DailyactivitiesComponent, RoleComponent, UserComponent, ClinicalhistorydetailComponent, AppointmentComponent, NotificationComponent, RecipeComponent, ReviewComponent, MenulandingComponent, ToolbarComponent, LoginComponent, ListarAppointmentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Tayta';
  role: string = '';
  usuario: string = '';

  constructor(private lS: LoginService) { }

  close() {
    sessionStorage.clear();
  }

  verificar() {
    this.role = this.lS.showRole();
    this.usuario = this.lS.showUsername();

    return this.lS.verificar();
  }

  isAdministrador() {
    return this.role === 'ADMINISTRADOR';
  }

  isCliente() {
    return this.role === 'CLIENTE';
  }

  isDoctor() {
    return this.role === 'DOCTOR';
  }

  isEnfermero() {
    return this.role === 'ENFERMERO';
  }
}
