import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { ListPatientsByDateDTO } from '../../../models/ListPatientsByDateDTO';
import { AppointmentService } from '../../../services/appointment.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-listpatientsbydate',
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
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
  ],
  templateUrl: './listpatientsbydate.component.html',
  styleUrl: './listpatientsbydate.component.css',
})
export class ListpatientsbydateComponent {
  reporteData: MatTableDataSource<ListPatientsByDateDTO> =
    new MatTableDataSource();
  selectedDate: Date | null = null; // Cambiado a `selectedDate` para mayor claridad
  displayedColumns: string[] = ['c1']; // Nombres de columnas más descriptivos

  constructor(private apS: AppointmentService) {}

  getData(): void {
    if (this.selectedDate) {
      const formattedDate = this.selectedDate
        .toLocaleDateString('en-GB')
        .split('/')
        .join('-');

      this.apS
        .listPatientsByDate(formattedDate)
        .subscribe((data: ListPatientsByDateDTO[]) => {
          this.reporteData = new MatTableDataSource(data);
        });
    }
  }
}
