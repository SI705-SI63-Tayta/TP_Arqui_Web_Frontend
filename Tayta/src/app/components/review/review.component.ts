import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { ListarreviewComponent } from './listarreview/listarreview.component';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [RouterOutlet,ListarreviewComponent],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent {

  constructor(public route:ActivatedRoute){}

}
