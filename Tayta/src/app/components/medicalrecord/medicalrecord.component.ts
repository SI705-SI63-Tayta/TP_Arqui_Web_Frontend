import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarmedicalrecordComponent } from './listarmedicalrecord/listarmedicalrecord.component';

@Component({
  selector: 'app-medicalrecord',
  standalone: true,
  imports: [RouterOutlet, ListarmedicalrecordComponent],
  templateUrl: './medicalrecord.component.html',
  styleUrl: './medicalrecord.component.css'
})
export class MedicalrecordComponent {
  constructor(public route:ActivatedRoute){}
}
