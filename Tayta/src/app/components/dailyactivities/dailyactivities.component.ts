import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListardailyactivitiesComponent } from './listardailyactivities/listardailyactivities.component';

@Component({
  selector: 'app-dailyactivities',
  standalone: true,
  imports: [RouterOutlet,ListardailyactivitiesComponent],
  templateUrl: './dailyactivities.component.html',
  styleUrl: './dailyactivities.component.css'
})
export class DailyactivitiesComponent {
  constructor(public route:ActivatedRoute){}
}
