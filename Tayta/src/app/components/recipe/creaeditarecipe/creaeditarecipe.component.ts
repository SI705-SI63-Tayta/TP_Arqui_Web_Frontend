import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { Recipe } from '../../../models/Recipe';
import { RecipeService } from '../../../services/recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { Appointment } from '../../../models/Appointment';
import { AppointmentService } from '../../../services/appointment.service';
import { NotificationService } from '../../../services/notification.service';
import { Notification } from '../../../models/Notification';
@Component({
  selector: 'app-creaeditarecipe',
  standalone: true,
  imports: [MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,],
  templateUrl: './creaeditarecipe.component.html',
  styleUrl: './creaeditarecipe.component.css'
})
export class CreaeditarecipeComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  recipe: Recipe = new Recipe();

  id: number = 0;
  edicion: boolean = false;
  appointment: Appointment = new Appointment(); // Para almacenar la cita asociada a la receta
  notification: Notification = new Notification();
  idCliente: number = 0;
  appointmentId:number=0;
  listaEstado: { value: string; viewValue: string }[] = [
    { value: 'ACTIVO', viewValue: 'Activo' },
    { value: 'FINALIZADO', viewValue: 'Finalizado' },
  ];

  constructor(
    private rS: RecipeService,
    private formBuilder: FormBuilder,
    private nS:NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private lS: LoginService,
    private appointmentService: AppointmentService // Servicio para obtener la cita
  ) { }

  ngOnInit(): void {
    this.idCliente = this.lS.getId();

    // Capturar el idAppointment desde la ruta
    this.route.params.subscribe((data: Params) => {
      this.appointmentId = data['idAppointment']; // Parámetro que viene en la URL
      this.edicion = data['id'] != null;
      this.id = data['id'] || 0; // ID de receta, si existe
      this.loadAppointment(this.appointmentId); // Cargar la cita relacionada
      this.init();
    });

    // Inicializar el formulario
    this.form = this.formBuilder.group({
      codigo: [''],
      descripcion: ['', Validators.required],
      fechainicio: ['', Validators.required],
      fechafin: ['', Validators.required],
      estado: ['', Validators.required],
    });
  }

  loadAppointment(idAppointment: number): void {
    this.appointmentService.listId(idAppointment).subscribe((data: Appointment) => {
      this.appointment = data;
      this.recipe.appointment = this.appointment;
    });
  }

  insertar(): void {
    if (this.form.valid) {
      this.recipe = this.recipe || new Recipe();
      this.recipe.idRecipe = this.form.value.codigo;
      this.recipe.description = this.form.value.descripcion;
      this.recipe.startDate = this.form.value.fechainicio;
      this.recipe.endDate = this.form.value.fechafin;
      this.recipe.state = this.form.value.estado;

      if (this.edicion) {
        this.rS.update(this.recipe).subscribe(() => {
          this.rS.getRecetasByCliente(this.idCliente).subscribe((data) => {
            this.rS.setList(data);
          });
        });
        this.router.navigate(['recetas']);
      } else {
        this.rS.insert(this.recipe).subscribe((savedRecipe: Recipe) => {
          console.log("Receta guardada:", savedRecipe);

          if (savedRecipe && savedRecipe.idRecipe) {
            this.recipe = savedRecipe;

            // Llama a la nueva función para guardar la notificación
            this.guardarNotificacion(
              `${savedRecipe.idRecipe}`,
              savedRecipe.idRecipe,
              this.appointment.userCliente.idUser
            );

            this.router.navigate(['citas']);
          } else {
            console.error("Error: No se obtuvo un id válido de la receta.");
          }
        });
      }
    }
  }

  // Nueva función para guardar la notificación
  guardarNotificacion(mensaje: string, idRecipe: number, idUser: number): void {
    const notification = new Notification();
    notification.message = mensaje;
    notification.recipe.idRecipe = idRecipe; // Solo el idRecipe
    notification.user.idUser=idUser; // Solo el idUser

    console.log("Notificación a guardar:", notification);

    this.nS.insert(notification).subscribe(() => {
      this.nS.getNotificationsByCliente(this.idCliente).subscribe((data) => {
        this.nS.setList(data);
      });
    });
  }




  init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idRecipe),
          descripcion: new FormControl(data.description),
          fechainicio: new FormControl(data.startDate),
          fechafin: new FormControl(data.endDate),
          estado: new FormControl(data.state)
        });
      });
    }
  }
}
