import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartDataset, ChartOptions, ChartType, registerables } from 'chart.js';
import { AppointmentService } from '../../../services/appointment.service';
Chart.register(...registerables);

@Component({
  selector: 'app-reportappointmentmode',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './reportappointmentmode.component.html',
  styleUrl: './reportappointmentmode.component.css'
})
export class ReportappointmentmodeComponent {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  //barChartType: ChartType = 'pie';
  barChartType: ChartType = 'doughnut';
  

  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private as: AppointmentService) {}

  ngOnInit(): void {
    this.as.getCantidadCitasByMode().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.mode);
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
