import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarrecipeComponent } from "./listarrecipe/listarrecipe.component";

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [RouterOutlet, ListarrecipeComponent],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css'
})
export class RecipeComponent {
  constructor(public route:ActivatedRoute){}
}
