import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { MedicalrecordService } from '../../../services/medicalrecord.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MedicalRecordDateDTO } from '../../../models/MedicalRecordDateDTO';
import { AppointmentService } from '../../../services/appointment.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-historiaclinicaperiodo',
  standalone: true,
  imports: [FormsModule, CommonModule,MatDatepickerModule,MatTableModule,MatInputModule, MatButtonModule],
  templateUrl: './historiaclinicaperiodo.component.html',
  styleUrl: './historiaclinicaperiodo.component.css'
})
export class HistoriaclinicaperiodoComponent{

  reporteData: MatTableDataSource<MedicalRecordDateDTO> = new MatTableDataSource();
  startDate: Date | null = null;
  endDate: Date | null = null;
  displayedColumns: string[] = ['dni', 'diagnostico'];

  constructor(private mrS: MedicalrecordService) {}


  getData(): void {
    if (this.startDate && this.endDate) {
      const formattedStartDate = this.startDate.toLocaleDateString('en-GB').split('/').join('-');
      const formattedEndDate = this.endDate.toLocaleDateString('en-GB').split('/').join('-');

      this.mrS.getHistoriaClinicaPeriodo(formattedStartDate, formattedEndDate)
        .subscribe((data: MedicalRecordDateDTO[]) => {
          this.reporteData = new MatTableDataSource(data);
        });
    }
  }

}
