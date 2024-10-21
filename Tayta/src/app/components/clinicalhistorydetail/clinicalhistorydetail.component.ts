import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarclinicalhistorydetailComponent } from './listarclinicalhistorydetail/listarclinicalhistorydetail.component';

@Component({
  selector: 'app-clinicalhistorydetail',
  standalone: true,
  imports: [RouterOutlet, ListarclinicalhistorydetailComponent],
  templateUrl: './clinicalhistorydetail.component.html',
  styleUrl: './clinicalhistorydetail.component.css'
})
export class ClinicalhistorydetailComponent {
  constructor(public route:ActivatedRoute){}

}
