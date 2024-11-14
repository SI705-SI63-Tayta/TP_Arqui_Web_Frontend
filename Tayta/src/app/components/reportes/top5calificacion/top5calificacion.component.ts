import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from './../../../../../node_modules/chart.js/dist/types/index.d';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { ReviewService } from '../../../services/review.service';

Chart.register(...registerables);
@Component({
  selector: 'app-top5calificacion',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './top5calificacion.component.html',
  styleUrl: './top5calificacion.component.css'
})
export class Top5calificacionComponent implements OnInit{
  barCharOptions:ChartOptions={
    responsive: true,
  };
  barChartLabels: string[]=[]
  barChartType: ChartType='bar'
  barChartLegend=true
  barChartData: ChartDataset[]=[]

  constructor(private reS:ReviewService){}

  ngOnInit(): void {
    this.reS.top5CalificacionPersonal().subscribe((data) => {
      this.barChartLabels = data.map(i => i.full_name);

      this.barChartData = [
        {
          data: data.map(item => item.average),
          label: 'Promedio de calificación',
          backgroundColor: [
            '#FF6384', // Rosado
            '#36A2EB', // Azul claro
            '#FFCE56', // Amarillo
            '#4BC0C0', // Turquesa
            '#9966FF'  // Morado
          ],
          borderColor: [
            '#FF6384', // Rosado
            '#36A2EB', // Azul claro
            '#FFCE56', // Amarillo
            '#4BC0C0', // Turquesa
            '#9966FF'  // Morado
          ],
          borderWidth: 1
        }
      ];
    });
  }
}
