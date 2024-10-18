import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListaruserComponent } from "./components/user/listaruser/listaruser.component";
import { DailyactivitiesComponent } from "./components/dailyactivities/dailyactivities.component";
import { ListarroleComponent } from "./components/role/listarrole/listarrole.component";
import { RoleComponent } from "./components/role/role.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListaruserComponent, DailyactivitiesComponent, ListarroleComponent, RoleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Tayta';
}
