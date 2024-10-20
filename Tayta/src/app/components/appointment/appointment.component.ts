import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css'
})
export class AppointmentComponent  implements OnInit{
  constructor(public route:ActivatedRoute){}
}
