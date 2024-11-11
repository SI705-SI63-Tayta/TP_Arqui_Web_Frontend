import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-notification-dialog',
  standalone: true,
  imports: [MatDialogModule,MatButtonModule],
  templateUrl: './notification-dialog.component.html',
  styleUrl: './notification-dialog.component.css'
})
export class NotificationDialogComponent  implements OnInit{
  constructor(@Inject(MAT_DIALOG_DATA) public data: { notification: any },
public rS:RecipeService) { }
  citades:string="";

  ngOnInit(): void {
    // Llamamos a obtenerReceta con el idRecipe que viene en la notificación
    const idRecipe = Number(this.data.notification.message);
    
    this.obtenerReceta(idRecipe);
  }


  obtenerReceta(id: number): void {
    this.rS.listId(id).subscribe((data) => {
      this.citades = data.description; // Asignamos la descripción
    }, error => {
      console.error('Error al obtener la receta', error);
    });
  }
}
