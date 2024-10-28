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

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MedicalrecordComponent, DailyactivitiesComponent, RoleComponent, UserComponent, ClinicalhistorydetailComponent, AppointmentComponent, NotificationComponent, RecipeComponent, ReviewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Tayta';
}
