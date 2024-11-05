import { Component, OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MedicalRecord } from '../../../models/MedicalRecord';
import { MedicalrecordService } from '../../../services/medicalrecord.service';
import { UserService } from '../../../services/user.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-listarmedicalrecord',
  standalone: true,
  imports: [MatTableModule,MatIconModule,RouterModule,MatButtonModule],
  templateUrl: './listarmedicalrecord.component.html',
  styleUrl: './listarmedicalrecord.component.css'
})
export class ListarmedicalrecordComponent implements OnInit{
  dataSource:MatTableDataSource<MedicalRecord> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3','eliminar','editar']

  constructor(private mS:MedicalrecordService, private uS:UserService){}

  ngOnInit(): void {
    this.mS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
    })

    this.mS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number) {
    this.mS.delete(id).subscribe((data)=>{
      this.mS.list().subscribe((data)=>{
        this.mS.setList(data);
      })
    })
  }

}
