import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DailyActivities } from '../../../models/DailyActivities';
import { DailyactivitiesService } from '../../../services/dailyactivities.service';
import { UserService } from '../../../services/user.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-listardailyactivities',
  standalone: true,
  imports: [MatTableModule,  MatIconModule, RouterModule,MatButtonModule],
  templateUrl: './listardailyactivities.component.html',
  styleUrl: './listardailyactivities.component.css'
})
export class ListardailyactivitiesComponent implements OnInit{
  dataSource:MatTableDataSource<DailyActivities> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2','eliminar','editar']

  constructor(private dS:DailyactivitiesService, private uS:UserService, private lS:LoginService){}
  idCliente: number=0;

  ngOnInit(): void {
    this.idCliente=this.lS.getId();
    this.dS.getActivitiesByCliente(this.idCliente).subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
    })
    this.dS.getList().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
    })
  }

  eliminar(id: number) {
    this.dS.delete(id).subscribe((data)=>{
      this.dS.getActivitiesByCliente(this.idCliente).subscribe((data)=>{
        this.dS.setList(data);
      })
    })
  }

}
