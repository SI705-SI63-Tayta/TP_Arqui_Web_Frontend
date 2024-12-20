import { Component, OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { ClinicalHistoryDetail } from '../../../models/ClinicalHistoryDetail';
import { ClinicaldetailhistoryService } from '../../../services/clinicaldetailhistory.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { Recipe } from '../../../models/Recipe';
import { RecipeDialogComponent } from '../../recipe-dialog/recipe-dialog.component';

@Component({
  selector: 'app-listarclinicalhistorydetail',
  standalone: true,
  imports: [MatTableModule,  MatIconModule, RouterModule,MatButtonModule],
  templateUrl: './listarclinicalhistorydetail.component.html',
  styleUrl: './listarclinicalhistorydetail.component.css'
})
export class ListarclinicalhistorydetailComponent implements OnInit{
  dataSource: MatTableDataSource<ClinicalHistoryDetail> = new MatTableDataSource();
  displayedColumns:string[]=['c1', 'c2', 'c3', 'c4', 'c5','c6','eliminar','editar']
  constructor(private cS:ClinicaldetailhistoryService,
    private dialog: MatDialog
  ){}
  ngOnInit(): void {
    this.cS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
    })
    this.cS.getList().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
    })
  }
  eliminar(id: number) {
    this.cS.delete(id).subscribe((data)=>{
      this.cS.list().subscribe((data)=>{
        this.cS.setList(data);
      })
    })
  }

  openRecipeDialog(recipe: Recipe): void {
    this.dialog.open(RecipeDialogComponent, {
      data: recipe
    });
  }



}
