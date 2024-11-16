import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { MedicalrecordService } from '../../../services/medicalrecord.service';

@Component({
  selector: 'app-historiaclinicaperiodo',
  standalone: true,
  imports: [BaseChartDirective, FormsModule, CommonModule],
  templateUrl: './historiaclinicaperiodo.component.html',
  styleUrl: './historiaclinicaperiodo.component.css'
})
export class HistoriaclinicaperiodoComponent implements OnInit{
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1, // Asegura que los números en el eje Y sean enteros
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          // Personaliza los tooltips para mostrar dni y fullName
          label: (context) => {
            const dataIndex = context.dataIndex;
            const item = this.chartData[dataIndex];
            return ` ${item.fullName}: ${context.raw} citas`;
          }
        }
      }
    }
  };
  barChartLabels: number[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  
  date1: string = ''; // Fecha de inicio
  date2: string = ''; // Fecha de fin
  chartData: any[] = []; // Para almacenar los datos completos (dni, fullName, cantidad)

  constructor(private ms: MedicalrecordService) {}

  ngOnInit(): void {}


  isDateRangeValid(): boolean {
    const startDate = new Date(this.date1);
    const endDate = new Date(this.date2);
    return startDate <= endDate;
  }
  getData(): void {

    

    if (this.date1 && this.date2) {

      if (!this.isDateRangeValid()) {
        alert("La fecha de inicio no puede ser mayor a la fecha final.");
        return;
      }

      this.ms.getHistoriaClinicaPeriodo(this.date1, this.date2).subscribe((data) => {
        this.chartData = data;
        
        this.barChartLabels = data.map((item) => item.idMedicalRecord);
        this.barChartData = [
          {
            data: data.map((item) => item.idMedicalRecord),
            label: 'Historia clinica por fecha',
            backgroundColor: [
              '#27AE60',
              '#009782',
              '#92AA83',
              '#E0EDC5',
            ],
            borderColor: 'rgba(173, 216, 230, 1)',
            borderWidth: 1,
          },
        ];
      });
    }
  }
}
