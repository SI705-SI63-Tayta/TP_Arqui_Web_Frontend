import { Component, OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MedicalRecord } from '../../../models/MedicalRecord';
import { MedicalrecordService } from '../../../services/medicalrecord.service';
import { UserService } from '../../../services/user.service';


@Component({
  selector: 'app-listarmedicalrecord',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './listarmedicalrecord.component.html',
  styleUrl: './listarmedicalrecord.component.css'
})
export class ListarmedicalrecordComponent implements OnInit{
  dataSource:MatTableDataSource<MedicalRecord> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3']

  constructor(private mS:MedicalrecordService, private uS:UserService){}

  ngOnInit(): void {
    this.mS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
    })
  }

}
