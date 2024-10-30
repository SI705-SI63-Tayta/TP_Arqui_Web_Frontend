import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarAppointmentComponent } from "./listar-appointment/listar-appointment.component";

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [RouterOutlet, ListarAppointmentComponent],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css'
})
export class AppointmentComponent implements OnInit{
  constructor(public route:ActivatedRoute){}
  ngOnInit(): void {
    
  }
}
