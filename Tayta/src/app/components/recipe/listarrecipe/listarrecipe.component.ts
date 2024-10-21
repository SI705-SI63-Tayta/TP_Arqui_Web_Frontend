import { Component, OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Recipe } from '../../../models/Recipe';
import { RecipeService } from '../../../services/recipe.service';
@Component({
  selector: 'app-listarrecipe',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './listarrecipe.component.html',
  styleUrl: './listarrecipe.component.css'
})
export class ListarrecipeComponent implements OnInit{
  dataSource:MatTableDataSource<Recipe> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3','c4','c5']

  constructor(private rS:RecipeService){}

  ngOnInit(): void {
    this.rS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
    })
  }

}
