import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MedicalRecord } from '../../../models/MedicalRecord';
import { MedicalrecordService } from '../../../services/medicalrecord.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/User';



@Component({
  selector: 'app-creaeditamedicalrecord',
  standalone: true,
  imports: [
    MatDatepickerModule,
    MatButtonModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatNativeDateModule
  ],
  templateUrl: './creaeditamedicalrecord.component.html',
  styleUrl: './creaeditamedicalrecord.component.css'
})
export class CreaeditamedicalrecordComponent {
  form: FormGroup = new FormGroup({});
  listaUsuarios: User[] = [];
  medicalrecord: MedicalRecord = new MedicalRecord;

  id: number = 0;
  edicion: boolean = false;

  constructor(
    private mS: MedicalrecordService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private uS: UserService,
  ){}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      //trae los datos
      this.init();
    });
    this.form = this.formBuilder.group({
      hcodigo: [''],
      hfecha: ['', Validators.required],
      husuario: ['', Validators.required],
    });
    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
  }
  insertar(): void {
    if (this.form.valid) {
      this.medicalrecord.idMedicalRecord=this.form.value.hcodigo;
      this.medicalrecord.dateMedicalRecord= this.form.value.hfecha;
      this.medicalrecord.u.idUser = this.form.value.husuario;
      if (this.edicion) {
        this.mS.update(this.medicalrecord).subscribe((data) => {
          this.mS.list().subscribe((data) => {
            this.mS.setList(data);
          });
        });
      } else {
        this.mS.insert(this.medicalrecord).subscribe((data) => {
          this.mS.list().subscribe((data) => {
            this.mS.setList(data);
          });
        });
      }
      this.router.navigate(['historiaclinica']);
    }
  }
  init() {
    if (this.edicion) {
      this.mS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.idMedicalRecord),
          hfecha: new FormControl(data.dateMedicalRecord),
          husuario: new FormControl(data.u.idUser),
        });
      });
    }
  }

}
