import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DailyActivities } from '../../../models/DailyActivities';
import { DailyactivitiesService } from '../../../services/dailyactivities.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { User } from '../../../models/User';

@Component({
  selector: 'app-creareditardailyactivities',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, ReactiveFormsModule, CommonModule],
  templateUrl: './creareditardailyactivities.component.html',
  styleUrl: './creareditardailyactivities.component.css'
})
export class CreareditardailyactivitiesComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  activities: DailyActivities = new DailyActivities();

  edicion: boolean = false;
  id: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private dS: DailyactivitiesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;

      this.init();
    });

    this.form = this.formBuilder.group({
      codigo: ['', Validators.required],
      nombreHabito: ['', Validators.required],
      codigoUser: ['', Validators.required]
    })
  }

  insertar(): void {
    console.log('Insertar método llamado'); // Confirmación inicial
    if (this.form.valid) {
      this.activities.idDailyActivities = this.form.value.codigo;
      this.activities.habits = this.form.value.nombreHabito;
      this.activities.user = new User();
      this.activities.user.idUser = this.form.value.codigoUser;

      console.log('Estado de validación - codigo:', this.form.get('codigo')?.valid);
      console.log('Estado de validación - nombreHabito:', this.form.get('nombreHabito')?.valid);
      console.log('Estado de validación - codigoUser:', this.form.get('codigoUser')?.valid);


      this.dS.insert(this.activities).subscribe({
        next: () => {
          console.log('Datos guardados exitosamente'); // Confirmación de guardado
          this.dS.list().subscribe((lista) => {
            this.dS.setList(lista);
          });
          this.router.navigate(['actividades']);
        },
        error: (err) => console.error('Error al guardar:', err) // Log para error
      });
    } else {
      console.warn('Formulario inválido'); // Mensaje si el formulario es inválido
    }
  }



  init() {
    if (this.edicion) {
      this.dS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idDailyActivities),
          nombreHabito: new FormControl(data.habits),
          codigoUser: new FormControl(data.user.idUser), // Asegúrate de utilizar solo el ID aquí
        });
      });
    }
  }


}
