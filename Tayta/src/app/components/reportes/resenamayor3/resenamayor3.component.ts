import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Review } from '../../../models/Review';
import { ReviewService } from '../../../services/review.service';

@Component({
  selector: 'app-resenamayor3',
  standalone: true,
  imports: [NgFor],
  templateUrl: './resenamayor3.component.html',
  styleUrl: './resenamayor3.component.css'
})
export class Resenamayor3Component implements OnInit{
  reviews: Review[] = [];

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.reviewService.listarcalificacionmayor3().subscribe(
      (data) => {
        this.reviews = data;
      },
      (error) => {
        console.error('Error fetching comments', error);
      }
    );
  }

}
