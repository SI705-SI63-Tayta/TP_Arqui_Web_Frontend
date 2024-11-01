import { Component, OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Appointment } from '../../../models/Appointment';
import { AppointmentService } from '../../../services/appointment.service';
import { RouterLink, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { LoginService } from '../../../services/login.service';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-listar-appointment',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterLink,RouterModule,MatCardModule,CommonModule],
  templateUrl: './listar-appointment.component.html',
  styleUrl: './listar-appointment.component.css'
})
export class ListarAppointmentComponent implements OnInit{
  dataSource:MatTableDataSource<Appointment> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3','c4','c5','c6','c7']

  constructor(private aS:AppointmentService, private lS:LoginService){}
  idCliente:number=0;
  ngOnInit(): void {
    this.idCliente=this.lS.getId();

    this.aS.getCitasByCliente(this.idCliente).subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
    });
    this.aS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  eliminar(id: number) {
    this.aS.delete(id).subscribe((data) => {
      this.aS.getCitasByCliente(this.idCliente).subscribe((data) => {
        this.aS.setList(data);
      });
    });
  }

}
