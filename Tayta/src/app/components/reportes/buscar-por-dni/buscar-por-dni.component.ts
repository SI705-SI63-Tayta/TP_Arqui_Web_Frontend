import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { RoleService } from '../../../services/role.service';
import { ClinicaldetailhistoryService } from '../../../services/clinicaldetailhistory.service';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-buscar-por-dni',
  standalone: true,
  imports: [BaseChartDirective, CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    NgIf],
  templateUrl: './buscar-por-dni.component.html',
  styleUrl: './buscar-por-dni.component.css'
})
export class BuscarPorDNIComponent implements OnInit {


  listauser: any[] = [];
  dni: string = ''; // Variable para almacenar el nombre del usuario ingresado

  constructor(private sA: ClinicaldetailhistoryService) {}

  ngOnInit(): void {

  }

  fetchIncidentsByUser(dni1:string): void {
    if (dni1.trim() !== '') {
      this.sA.getuserperdni(dni1).subscribe(
        data => {
          this.listauser = data;
          console.log(data);
        },
        
        error => {
          console.error('Error fetching incidents:', error);
        }
      );
    } else {
      console.error('Nombre del usuario no puede estar vacío.');
    }
  }







}
