import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../../services/appointment.service';
import { ListPatientsByStaffDTO } from '../../../models/ListPatientsByStaffDTO';
import { UserService } from '../../../services/user.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-listpatientsbystaff',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    RouterLink,
    RouterModule,
    MatCardModule,
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    FormsModule,
    MatSelectModule
  ],
  templateUrl: './listpatientsbystaff.component.html',
  styleUrl: './listpatientsbystaff.component.css',
})
export class ListpatientsbystaffComponent implements OnInit{
  reporteData: MatTableDataSource<ListPatientsByStaffDTO> = new MatTableDataSource();
  nameStaff: number =0;
  listaMedicos: { value: number; viewValue: string }[] = [];
  displayedColumns: string[] = ['c1', 'c2', 'c3']

  constructor(private apS: AppointmentService, private usS: UserService) {}

  
  getData(): void {
    
    this.apS.listPatientsByStaff(this.nameStaff).subscribe((data: ListPatientsByStaffDTO[]) => {
      console.log(data); // Verifica el contenido de los datos
      this.reporteData = new MatTableDataSource(data);
    });
  }

  getMedicos() {
    this.usS.getMedicos().subscribe((data) => {
      this.listaMedicos = data.map((u) => ({
        value: u.idUser,
        viewValue: u.fullName,
      }));
    });
  }

  ngOnInit(): void {
    this.getMedicos()
    this.nameStaff=this.nameStaff;
  }
}
