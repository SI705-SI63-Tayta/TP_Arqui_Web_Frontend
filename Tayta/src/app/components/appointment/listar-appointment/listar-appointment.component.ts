import { Component, OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Appointment } from '../../../models/Appointment';
import { AppointmentService } from '../../../services/appointment.service';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
<<<<<<< HEAD
import { LoginService } from '../../../services/login.service';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-listar-appointment',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterLink,RouterModule,MatCardModule,CommonModule],
=======
@Component({
  selector: 'app-listar-appointment',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterLink],
>>>>>>> 2fe96d804b2c99e8084df3b1509ec6c9d5c2ee45
  templateUrl: './listar-appointment.component.html',
  styleUrl: './listar-appointment.component.css'
})
export class ListarAppointmentComponent implements OnInit{
  dataSource:MatTableDataSource<Appointment> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3','c4','c5','c6','c7']

<<<<<<< HEAD
  constructor(private aS:AppointmentService, private lS:LoginService){}
  idCliente:number=0;
  ngOnInit(): void {
    this.idCliente=this.lS.getId();

    this.aS.getCitasByCliente(this.idCliente).subscribe((data)=>{
=======
  constructor(private rS:AppointmentService){}

  ngOnInit(): void {
    this.rS.list().subscribe((data)=>{
>>>>>>> 2fe96d804b2c99e8084df3b1509ec6c9d5c2ee45
      this.dataSource=new MatTableDataSource(data);
    });
    this.rS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  eliminar(id: number) {
<<<<<<< HEAD
    this.aS.delete(id).subscribe((data) => {
      this.aS.getCitasByCliente(this.idCliente).subscribe((data) => {
        this.aS.setList(data);
=======
    this.rS.delete(id).subscribe((data) => {
      this.rS.list().subscribe((data) => {
        this.rS.setList(data);
>>>>>>> 2fe96d804b2c99e8084df3b1509ec6c9d5c2ee45
      });
    });
  }

}
