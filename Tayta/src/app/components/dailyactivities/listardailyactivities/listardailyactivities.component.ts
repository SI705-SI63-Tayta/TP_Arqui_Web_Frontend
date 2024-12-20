import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DailyActivities } from '../../../models/DailyActivities';
import { DailyactivitiesService } from '../../../services/dailyactivities.service';
import { UserService } from '../../../services/user.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listardailyactivities',
  standalone: true,
  imports: [MatTableModule,  MatIconModule, RouterModule,MatButtonModule, CommonModule],
  templateUrl: './listardailyactivities.component.html',
  styleUrl: './listardailyactivities.component.css'
})
export class ListardailyactivitiesComponent implements OnInit{
  dataSource:MatTableDataSource<DailyActivities> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2','c3','eliminar','editar']

  constructor(private dS:DailyactivitiesService, private uS:UserService, private lS:LoginService){}
  idCliente: number=0;

  ngOnInit(): void {
    if(this.isCliente()){
      this.idCliente=this.lS.getId();
      this.dS.getActivitiesByCliente(this.idCliente).subscribe((data)=>{
        this.dataSource=new MatTableDataSource(data);
      })
    }else if (this.isAdministrador()){
      this.dS.list().subscribe((data)=>{
        this.dataSource=new MatTableDataSource(data);
      })
    }

    this.dS.getList().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
    })
  }

  eliminar(id: number) {
    if(this.isCliente()){
      this.dS.delete(id).subscribe((data)=>{
        this.dS.getActivitiesByCliente(this.idCliente).subscribe((data)=>{
          this.dS.setList(data);
        })
      })
    }else if(this.isAdministrador()){
      this.dS.delete(id).subscribe((data)=>{
        this.dS.list().subscribe((data)=>{
          this.dS.setList(data);
        })
      })
    }

  }


  isPersonal() {
    return (this.lS.showRole() === 'DOCTOR' || this.lS.showRole() === 'ENFERMERO');
  }

  isCliente() {
    return this.lS.showRole() === 'CLIENTE';
  }

  isAdministrador() {
    return this.lS.showRole() === 'ADMINISTRADOR';
  }

}
