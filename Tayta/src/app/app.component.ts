import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DailyactivitiesComponent } from "./components/dailyactivities/dailyactivities.component";
import { RoleComponent } from "./components/role/role.component";
import { UserComponent } from "./components/user/user.component";
import { MedicalrecordComponent } from './components/medicalrecord/medicalrecord.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MedicalrecordComponent, DailyactivitiesComponent, RoleComponent, UserComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Tayta';
}
