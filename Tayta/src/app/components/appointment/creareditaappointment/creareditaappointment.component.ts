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
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
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
export class CreareditaappointmentComponent implements OnInit{
  form: FormGroup = new FormGroup({});
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
    private lS:LoginService,
    private uS:UserService,
    private _matDialog:MatDialog,
  ) {}
  listaModo: { value: string; viewValue: string }[] = [
    { value: 'Virtual', viewValue: 'Virtual' },
    { value: 'Presencial', viewValue: 'Presencial' },
  ];
  idUser:number=0;
  listaMedicos: { value: number; viewValue: string }[] = [];
  ngOnInit(): void {
    this.idUser=this.lS.getId();
    this.role=this.lS.showRole();
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] >0;
      //trae los datos

      this.init();
      this.getMedicos();

    });
    this.form = this.formBuilder.group({
        codigo: [''],
        fecha: ['', Validators.required],
        razon: ['', Validators.required],
        modo: ['', Validators.required],
        descripcion: ['', Validators.required],
        personal:['',Validators.required]
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

        if(this.role==="CLIENTE"){
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
        }else if( this.role==="DOCTOR" || this.role==="ENFERMERO"){
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

    flagUpdate(): void {
      this.flagForm = true;
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
          personal: new FormControl(data.userPersonal.idUser),
          });
          this.appointment.latitude=data.latitude;
          this.appointment.longitude=data.longitude;
        });
      }
    }

    getMedicos(){
      this.uS.getMedicos().subscribe((data) => {
        this.listaMedicos = data.map(u=>({
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
          latitude:this.appointment.latitude,
          longtitude:this.appointment.longitude
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {

          if (result.lat && result.lng) {
            console.log('Latitud:', result.lat);
            console.log('Longitud:', result.lng);
            this.appointment.latitude = result.lat;
            this.appointment.longitude = result.lng;
          } else {
            console.log('Los datos de ubicación no son válidos');
          }
        } else {
          console.log("No recibí nada del modal");
        }
      });
    }

}
