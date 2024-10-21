import { Component, OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { ClinicalHistoryDetail } from '../../../models/ClinicalHistoryDetail';
import { ClinicaldetailhistoryService } from '../../../services/clinicaldetailhistory.service';

@Component({
  selector: 'app-listarclinicalhistorydetail',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './listarclinicalhistorydetail.component.html',
  styleUrl: './listarclinicalhistorydetail.component.css'
})
export class ListarclinicalhistorydetailComponent implements OnInit{
  dataSource: MatTableDataSource<ClinicalHistoryDetail> = new MatTableDataSource();
  displayedColumns:string[]=['c1', 'c2', 'c3', 'c4', 'c5']
  constructor(private cS:ClinicaldetailhistoryService){}
  ngOnInit(): void {
    this.cS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
    })
  }

}
