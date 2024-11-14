import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from './../../../../../node_modules/chart.js/dist/types/index.d';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { RecipeService } from '../../../services/recipe.service';

@Component({
  selector: 'app-recipesfinishedclient',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './recipesfinishedclient.component.html',
  styleUrl: './recipesfinishedclient.component.css'
})
export class RecipesfinishedclientComponent implements OnInit {
  barCharOptions:ChartOptions={
    responsive: true,
  };
  barChartLabels: string[]=[]
  barChartType: ChartType='pie'
  barChartLegend=true
  barChartData: ChartDataset[]=[]

  constructor(private rS:RecipeService){}

  ngOnInit(): void {
    this.rS.recipesFinishedPerClient().subscribe((data) => {
      this.barChartLabels = data.map(i => i.full_name);

      this.barChartData = [
        {
          data: data.map(item => item.quantity),
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
