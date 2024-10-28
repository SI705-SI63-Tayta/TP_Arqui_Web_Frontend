import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { Appointment } from '../../../models/Appointment';
import { AppointmentService } from '../../../services/appointment.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-creareditaappointment',
  standalone: true,
  imports: [MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule],
  templateUrl: './creareditaappointment.component.html',
  styleUrl: './creareditaappointment.component.css'
})
export class CreareditaappointmentComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  appointment: Appointment = new Appointment;
  
  id: number = 0;
  edicion: boolean = false;
  constructor(
    private aS: AppointmentService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  listaModo: { value: string; viewValue: string }[] = [
    { value: 'Virtual', viewValue: 'Virtual' },
    { value: 'Prescencial', viewValue: 'Prescencial' },
  ];
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      //trae los datos
      this.init();
    });
    this.form = this.formBuilder.group({
      codigo: [''],
        fecha: ['', Validators.required],
        razon: ['', Validators.required],
        modo: ['', Validators.required],
        descripcion: ['', Validators.required],
      });
    }
    insertar(): void {
      if (this.form.valid) {
        this.appointment.idAppointment = this.form.value.codigo;
        this.appointment.date=this.form.value.fecha;
        this.appointment.reason=this.form.value.razon;
        this.appointment.mode=this.form.value.modo;
        this.appointment.description=this.form.value.descripcion;
      
        if (this.edicion) {
          this.aS.update(this.appointment).subscribe((data) => {
            this.aS.list().subscribe((data) => {
              this.aS.setList(data);
            });
          });
        } else {
          this.aS.insert(this.appointment).subscribe((data) => {
            this.aS.list().subscribe((data) => {
              this.aS.setList(data);
            });
          });
        }
      }
      this.router.navigate(['citas']);
    }
    init() {
      if (this.edicion) {
        this.aS.listId(this.id).subscribe((data) => {
          this.form = new FormGroup({
            codigo: new FormControl(data.idAppointment),
          fecha: new FormControl(data.date),
          razon: new FormControl(data.reason),
          modo: new FormControl(data.mode),
          descripcion: new FormControl(data.description),
          });
        });
      }
    }
}
