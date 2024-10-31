import { Component, OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { ClinicalHistoryDetail } from '../../../models/ClinicalHistoryDetail';
import { ClinicaldetailhistoryService } from '../../../services/clinicaldetailhistory.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listarclinicalhistorydetail',
  standalone: true,
  imports: [MatTableModule,  MatIconModule, RouterModule],
  templateUrl: './listarclinicalhistorydetail.component.html',
  styleUrl: './listarclinicalhistorydetail.component.css'
})
export class ListarclinicalhistorydetailComponent implements OnInit{
  dataSource: MatTableDataSource<ClinicalHistoryDetail> = new MatTableDataSource();
  displayedColumns:string[]=['c1', 'c2', 'c3', 'c4', 'c5','eliminar','editar']
  constructor(private cS:ClinicaldetailhistoryService){}
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



}
