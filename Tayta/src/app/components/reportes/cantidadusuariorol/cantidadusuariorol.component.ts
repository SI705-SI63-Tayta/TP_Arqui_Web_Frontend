import { Component, OnInit } from '@angular/core';

import { BaseChartDirective } from 'ng2-charts';
import { RoleService } from '../../../services/role.service';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-cantidadusuariorol',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './cantidadusuariorol.component.html',
  styleUrl: './cantidadusuariorol.component.css'
})
export class CantidadusuariorolComponent implements OnInit {

  barCharOptions:ChartOptions={
    responsive: true,
  };
  barChartLabels: string[]=[]
  barChartType: ChartType='bar'
  barChartLegend=true
  barChartData: ChartDataset[]=[]

  constructor(private reS:RoleService){}

  ngOnInit(): void {
    this.reS.getQuantityUserRol().subscribe((data) => {
      this.barChartLabels = data.map(i => i.nombreRol);

      this.barChartData = [
        {
          data: data.map(item => item.cantidad),
          label: 'Cantidad de usuarios por rol',
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
