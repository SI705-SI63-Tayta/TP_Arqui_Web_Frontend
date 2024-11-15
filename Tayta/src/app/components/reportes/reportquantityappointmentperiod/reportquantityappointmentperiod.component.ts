import { Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartDataset, ChartOptions, ChartType, registerables } from 'chart.js';
import { AppointmentService } from '../../../services/appointment.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
Chart.register(...registerables);

@Component({
  selector: 'app-reportquantityappointmentperiod',
  standalone: true,
  imports: [BaseChartDirective, FormsModule, CommonModule],
  templateUrl: './reportquantityappointmentperiod.component.html',
  styleUrl: './reportquantityappointmentperiod.component.css'
})
export class ReportquantityappointmentperiodComponent implements OnInit {
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
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  
  date1: string = ''; // Fecha de inicio
  date2: string = ''; // Fecha de fin
  chartData: any[] = []; // Para almacenar los datos completos (dni, fullName, cantidad)

  constructor(private as: AppointmentService) {}

  ngOnInit(): void {}

  // Función para validar el rango de fechas
  isDateRangeValid(): boolean {
    const startDate = new Date(this.date1);
    const endDate = new Date(this.date2);
    return startDate <= endDate;
  }
  getData(): void {

    

    if (this.date1 && this.date2) {

      if (!this.isDateRangeValid()) {
        alert("La fecha de inicio no puede ser mayor a la fecha final.");
        return; // Detener la ejecución si las fechas no son válidas
      }

      this.as.getCantidadCitasByPeriod(this.date1, this.date2).subscribe((data) => {
        // Guardamos los datos completos para usarlos en los tooltips
        this.chartData = data;
        
        // Configuramos las etiquetas y los datos del gráfico
        this.barChartLabels = data.map((item) => item.dni);
        this.barChartData = [
          {
            data: data.map((item) => item.cantidad),
            label: 'Cantidad de citas',
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
