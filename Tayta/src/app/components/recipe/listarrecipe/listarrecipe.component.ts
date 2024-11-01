import { Component, OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Recipe } from '../../../models/Recipe';
import { RecipeService } from '../../../services/recipe.service';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { LoginService } from '../../../services/login.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-listarrecipe',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterLink,CommonModule,MatCardModule, MatButtonModule],
  templateUrl: './listarrecipe.component.html',
  styleUrl: './listarrecipe.component.css'
})
export class ListarrecipeComponent implements OnInit{
  dataSource:MatTableDataSource<Recipe> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3','c4','c5','c6','c7']
  constructor(private rS:RecipeService,
    private lS:LoginService
  ){}

  idCliente:number=0;

  ngOnInit(): void {
    this.idCliente=this.lS.getId();

    this.rS.getRecetasByCliente(this.idCliente).subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
    });
    this.rS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  eliminar(id: number) {
    this.rS.delete(id).subscribe((data) => {
      this.rS.getRecetasByCliente(id).subscribe((data) => {
        this.rS.setList(data);
      });
    });
  }

  isAdmin(){
    return this.lS.showRole()==='ADMINISTRADOR';
  }

  isDoctor(){
    return this.lS.showRole()==='DOCTOR';
  }

  isEnfermero(){
    return this.lS.showRole()==='ENFERMERO';
  }

  isCliente(){
    return this.lS.showRole()==='CLIENTE';
  }

}
