import { Component, OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Recipe } from '../../../models/Recipe';
import { RecipeService } from '../../../services/recipe.service';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-listarrecipe',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterLink],
  templateUrl: './listarrecipe.component.html',
  styleUrl: './listarrecipe.component.css'
})
export class ListarrecipeComponent implements OnInit{
  dataSource:MatTableDataSource<Recipe> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3','c4','c5','c6','c7']

  constructor(private rS:RecipeService){}

  ngOnInit(): void {
    this.rS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
    });
    this.rS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  eliminar(id: number) {
    this.rS.delete(id).subscribe((data) => {
      this.rS.list().subscribe((data) => {
        this.rS.setList(data);
      });
    });
  }

}
