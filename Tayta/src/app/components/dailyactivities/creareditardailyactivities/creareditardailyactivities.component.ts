import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DailyActivities } from '../../../models/DailyActivities';
import { DailyactivitiesService } from '../../../services/dailyactivities.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { User } from '../../../models/User';
import { LoginService } from '../../../services/login.service';
import { UserService } from '../../../services/user.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-creareditardailyactivities',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, ReactiveFormsModule, CommonModule, MatSelectModule],
  templateUrl: './creareditardailyactivities.component.html',
  styleUrl: './creareditardailyactivities.component.css'
})
export class CreareditardailyactivitiesComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  form2: FormGroup = new FormGroup({});
  activities: DailyActivities = new DailyActivities();
  listaClientes: { value: number; viewValue: string }[] = [];

  edicion: boolean = false;
  id: number = 0;
  idCliente: number=0;
  constructor(
    private formBuilder: FormBuilder,
    private dS: DailyactivitiesService,
    private router: Router,
    private route: ActivatedRoute,
    private lS:LoginService,
    private uS:UserService
  ) { }

  ngOnInit(): void {
    this.idCliente=this.lS.getId();
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;

      this.init();
    });

    this.form = this.formBuilder.group({
      codigo: [''],
      nombreHabito: ['', Validators.required],
    });

    if(this.isAdministrador()){
      this.getClientes();
      this.form2 = this.formBuilder.group({
        codigo: [''],
        usuario: ['', Validators.required],
        nombreHabito: ['', Validators.required],
      });
    }

  }

  insertar(): void {
    if (this.form.valid) {
      this.activities.idActivity = this.form.value.codigo;
      this.activities.habits = this.form.value.nombreHabito;
      this.activities.user.idUser = this.idCliente;

      if(this.edicion){
        console.log("aqui entre");
        this.dS.update(this.activities).subscribe((data)=>{
          this.dS.getActivitiesByCliente(this.idCliente).subscribe((data)=>{
            this.dS.setList(data);
          });
        });
      }else{
        console.log("aqui no entre");
        this.dS.insert(this.activities).subscribe((data)=>{
          this.dS.getActivitiesByCliente(this.idCliente).subscribe((data)=>{
            this.dS.setList(data);
          });
        });
      }
      this.router.navigate(['actividades']);

    }
  }

  insertar2(): void {
    if (this.form2.valid) {
      this.activities.idActivity = this.form2.value.codigo;
      this.activities.habits = this.form2.value.nombreHabito;
      this.activities.user.idUser = this.form2.value.usuario;

      if(this.edicion){
        this.dS.update(this.activities).subscribe((data)=>{
          this.dS.list().subscribe((data)=>{
            this.dS.setList(data);
          });
        });
      }else{
        this.dS.insert(this.activities).subscribe((data)=>{
          this.dS.list().subscribe((data)=>{
            this.dS.setList(data);
          });
        });
      }
      this.router.navigate(['actividades']);

    }
  }




  init() {
    if (this.edicion) {
      if(this.isCliente()){
        this.dS.listId(this.id).subscribe((data) => {
          this.form = new FormGroup({
            codigo: new FormControl(data.idActivity),
            nombreHabito: new FormControl(data.habits),
          });
          this.activities.user.idUser=data.user.idUser;
        });
      }else if(this.isAdministrador()){
        this.dS.listId(this.id).subscribe((data) => {
          this.form2 = new FormGroup({
            codigo: new FormControl(data.idActivity),
            usuario: new FormControl(data.user.idUser),
            nombreHabito: new FormControl(data.habits),
          });
        });
      }

    }
  }

  isPersonal(){
    return (this.lS.showRole()==='DOCTOR' || this.lS.showRole()==='ENFERMERO');
  }

  isCliente(){
    return this.lS.showRole()==='CLIENTE';
  }

  isAdministrador(){
    return this.lS.showRole()==='ADMINISTRADOR';
  }

  getClientes() {
    this.uS.getClientes().subscribe((data) => {
      this.listaClientes = data.map(u => ({
        value: u.idUser,
        viewValue: u.fullName
      }))
    });
  }

}
