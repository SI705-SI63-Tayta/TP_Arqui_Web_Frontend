import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-recipe-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  templateUrl: './recipe-dialog.component.html',
  styleUrl: './recipe-dialog.component.css'
})
export class RecipeDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
