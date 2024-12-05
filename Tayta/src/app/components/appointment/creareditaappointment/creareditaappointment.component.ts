import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { Appointment } from '../../../models/Appointment';
import { AppointmentService } from '../../../services/appointment.service';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { ToolbarComponent } from "../../toolbar/toolbar.component";
import { LoginService } from '../../../services/login.service';
import { UserService } from '../../../services/user.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MapmodalComponent } from '../../mapmodal/mapmodal.component';
import { DialogRef } from '@angular/cdk/dialog';


@Component({
  selector: 'app-creareditaappointment',
  standalone: true,
  imports: [MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule, ToolbarComponent, RouterModule, MatDialogModule, FormsModule, MapmodalComponent],
  templateUrl: './creareditaappointment.component.html',
  styleUrl: './creareditaappointment.component.css'
})
export class CreareditaappointmentComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  form2: FormGroup = new FormGroup({});
  appointment: Appointment = new Appointment;
  role: string = "";

  id: number = 0;
  edicion: boolean = false;
  flagForm: boolean = false;
  modoPresencial: boolean = false;
  userLocation: { lat: number; lng: number } | null = null;
  constructor(
    private aS: AppointmentService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private lS: LoginService,
    private uS: UserService,
    private _matDialog: MatDialog,
  ) { }
  listaModo: { value: string; viewValue: string }[] = [
    { value: 'Virtual', viewValue: 'Virtual' },
    { value: 'Presencial', viewValue: 'Presencial' },
  ];
  idUser: number = 0;
  idCliente: number = 0;
  listaMedicos: { value: number; viewValue: string }[] = [];
  listaClientes: { value: number; viewValue: string }[] = [];
  ngOnInit(): void {
    this.idUser = this.lS.getId();
    this.role = this.lS.showRole();
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] > 0;
      //trae los datos
      this.init();
      this.getMedicos();
      if(this.isAdministrador()){
        this.getClientes();
      }

    });

    if (this.isAdministrador()) {
      this.form2 = this.formBuilder.group({
        codigo: [''],
        fecha: ['', Validators.required],
        razon: ['', Validators.required],
        modo: ['', Validators.required],
        descripcion: ['', Validators.required],
        cliente: ['', Validators.required],
        personal: ['', Validators.required]
      });

      this.form2.get('modo')?.valueChanges.subscribe((value) => {
        this.modoPresencial = value === 'Presencial'; // Actualiza la variable si es presencial
      });
    }

    this.form = this.formBuilder.group({
      codigo: [''],
      fecha: ['', Validators.required],
      razon: ['', Validators.required],
      modo: ['', Validators.required],
      descripcion: ['', Validators.required],
      personal: ['', Validators.required]
    });

    this.form.get('modo')?.valueChanges.subscribe((value) => {
      this.modoPresencial = value === 'Presencial'; // Actualiza la variable si es presencial
    });
  }
  insertar(): void {
    if (this.form.valid && this.flagForm) {
      this.appointment.idAppointment = this.form.value.codigo;
      this.appointment.date = this.form.value.fecha;
      this.appointment.reason = this.form.value.razon;
      this.appointment.mode = this.form.value.modo;
      this.appointment.description = this.form.value.descripcion;
      this.appointment.userCliente.idUser = this.idUser;
      this.appointment.userPersonal.idUser = this.form.value.personal;

      if (this.isCliente()) {
        if (this.edicion) {
          this.aS.update(this.appointment).subscribe((data) => {
            this.aS.getCitasByCliente(this.idUser).subscribe((data) => {
              this.aS.setList(data);
            });
          });
        } else {
          this.aS.insert(this.appointment).subscribe((data) => {
            this.aS.getCitasByCliente(this.idUser).subscribe((data) => {
              this.aS.setList(data);
            });
          });
        }
      } else if (this.isPersonal()) {
        if (this.edicion) {
          this.aS.update(this.appointment).subscribe((data) => {
            this.aS.getCitasByPersonal(this.idUser).subscribe((data) => {
              this.aS.setList(data);
            });
          });
        } else {
          this.aS.insert(this.appointment).subscribe((data) => {
            this.aS.getCitasByPersonal(this.idUser).subscribe((data) => {
              this.aS.setList(data);
            });
          });
        }
      }

      this.router.navigate(['citas']);
    }
  }

  insertar2(): void {
    if (this.form2.valid && this.flagForm) {
      this.appointment.idAppointment = this.form2.value.codigo;
      this.appointment.date = this.form2.value.fecha;
      this.appointment.reason = this.form2.value.razon;
      this.appointment.mode = this.form2.value.modo;
      this.appointment.description = this.form2.value.descripcion;
      this.appointment.userCliente.idUser = this.form2.value.cliente;
      this.appointment.userPersonal.idUser = this.form2.value.personal;

      if (this.isAdministrador()) {
        if (this.edicion) {
          //console.log("entre a eicion");
          this.aS.update(this.appointment).subscribe((data) => {
            this.aS.list().subscribe((data) => {
              this.aS.setList(data);
            });
          });
        } else {
          console.log("tambinn estoy aqui")
          this.aS.insert(this.appointment).subscribe((data) => {
            this.aS.list().subscribe((data) => {
              this.aS.setList(data);
            });
          });
        }
      }

      this.router.navigate(['citas']);
    }
  }

  flagUpdate(): void {
    this.flagForm = true;
    //console.log(this.flagForm);
  }

  init() {
    if (this.edicion) {

      if(this.isCliente() || this.isPersonal()){
        this.aS.listId(this.id).subscribe((data) => {
          this.form = new FormGroup({
            codigo: new FormControl(data.idAppointment),
            fecha: new FormControl(data.date),
            razon: new FormControl(data.reason),
            modo: new FormControl(data.mode),
            descripcion: new FormControl(data.description),
            personal: new FormControl(data.userPersonal.idUser),
          });
          this.appointment.latitude = data.latitude;
          this.appointment.longitude = data.longitude;
        });
      }else if(this.isAdministrador()){
        this.aS.listId(this.id).subscribe((data) => {
          this.form2 = new FormGroup({
            codigo: new FormControl(data.idAppointment),
            fecha: new FormControl(data.date),
            razon: new FormControl(data.reason),
            modo: new FormControl(data.mode),
            descripcion: new FormControl(data.description),
            cliente: new FormControl(data.userCliente.idUser),
            personal: new FormControl(data.userPersonal.idUser),
          });
          this.appointment.latitude = data.latitude;
          this.appointment.longitude = data.longitude;
        });
      }

    }
  }

  getMedicos() {
    this.uS.getMedicos().subscribe((data) => {
      this.listaMedicos = data.map(u => ({
        value: u.idUser,
        viewValue: u.fullName
      }))
    });
  }

  getClientes() {
    this.uS.getClientes().subscribe((data) => {
      this.listaClientes = data.map(u => ({
        value: u.idUser,
        viewValue: u.fullName
      }))
    });
  }

  openModal(): void {
    const dialogRef = this._matDialog.open(MapmodalComponent, {
      width: '600px',
      height: '800px',
      disableClose: true,
      data: {
        latitude: this.appointment.latitude,
        longtitude: this.appointment.longitude
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        if (result.lat && result.lng) {
          //console.log('Latitud:', result.lat);
          //console.log('Longitud:', result.lng);
          this.appointment.latitude = result.lat;
          this.appointment.longitude = result.lng;
        } else {
          console.log('Los datos de ubicación no son válidos');
        }
      } else {
        //console.log("No recibí nada del modal");
      }
    });
  }

  isPersonal() {
    return (this.lS.showRole() === 'DOCTOR' || this.lS.showRole() === 'ENFERMERO');
  }

  isCliente() {
    return this.lS.showRole() === 'CLIENTE';
  }

  isAdministrador() {
    return this.lS.showRole() === 'ADMINISTRADOR';
  }

}
