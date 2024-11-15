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
  idCliente: number=0;
  constructor(
    private formBuilder: FormBuilder,
    private dS: DailyactivitiesService,
    private router: Router,
    private route: ActivatedRoute,
    private lS:LoginService
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



  init() {
    if (this.edicion) {
      this.dS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idActivity),
          nombreHabito: new FormControl(data.habits),
        });
        this.activities.user.idUser=data.user.idUser;
      });
    }
  }


}
