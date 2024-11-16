import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ClinicalHistoryDetail } from '../../../models/ClinicalHistoryDetail';
import { ClinicaldetailhistoryService } from '../../../services/clinicaldetailhistory.service';
import { MedicalrecordService } from '../../../services/medicalrecord.service';
import { RecipeService } from '../../../services/recipe.service';
import { AppointmentService } from '../../../services/appointment.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-creareditarclinicalhistorydetail',
  standalone: true,
  imports: [MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule, MatSelectModule],
  templateUrl: './creareditarclinicalhistorydetail.component.html',
  styleUrl: './creareditarclinicalhistorydetail.component.css'
})
export class CreareditarclinicalhistorydetailComponent {
  form: FormGroup = new FormGroup({});
  clinicalhistorydetail: ClinicalHistoryDetail = new ClinicalHistoryDetail;

  id: number = 0;
  edicion: boolean = false;
  listaId: { value: number; viewValue: number }[] = [];
  listaReceta: { value: number; viewValue: number }[] = [];
  listaCita: { value: number; viewValue: number }[] = [];

  constructor(
    private cS: ClinicaldetailhistoryService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private mrS:MedicalrecordService,
    private rS:RecipeService,
    private aS:AppointmentService
  ){}

  ngOnInit(): void {

    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      //trae los datos
      this.init();
      this.getData();
    });
    this.form = this.formBuilder.group({
      hidDetalleHistoria: [''],
      hmedicalRecord: ['', [Validators.required]],
      hrecipe: ['', [Validators.required]],
      happointment: ['', [Validators.required]],
      hdiagnostico: ['', [Validators.required]],
      });
  }

  insertar(): void {
    if (this.form.valid) {
      this.clinicalhistorydetail.idDetalleHistoria=this.form.value.hidDetalleHistoria;
      this.clinicalhistorydetail.medicalRecord.idMedicalRecord= this.form.value.hmedicalRecord;
      this.clinicalhistorydetail.recipe.idRecipe=this.form.value.hrecipe;
      this.clinicalhistorydetail.appointment.idAppointment=this.form.value.happointment;
      this.clinicalhistorydetail.diagnostico=this.form.value.hdiagnostico
      if (this.edicion) {
        this.cS.update(this.clinicalhistorydetail).subscribe((data) => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      } else {
        this.cS.insert(this.clinicalhistorydetail).subscribe((data) => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      }
      this.router.navigate(['detallehistoriaclinica'])
    }else{

    }

  }

  init() {
    if (this.edicion) {
      this.cS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hidDetalleHistoria: new FormControl(data.idDetalleHistoria),
          hmedicalRecord: new FormControl(data.medicalRecord.idMedicalRecord),
          hrecipe: new FormControl(data.recipe.idRecipe,),
          happointment: new FormControl(data.appointment.idAppointment),
          hdiagnostico: new FormControl(data.diagnostico),
        });
      });
    }
  }

  getData() {
    this.mrS.list().subscribe((data) => {
      this.listaId = data.map(m => ({
        value: m.idMedicalRecord,
        viewValue: m.idMedicalRecord
      }))
    });

    this.rS.list().subscribe((data) => {
      this.listaReceta = data.map(m => ({
        value: m.idRecipe,
        viewValue: m.idRecipe
      }))
    });

    this.aS.list().subscribe((data) => {
      this.listaCita = data.map(m => ({
        value: m.idAppointment,
        viewValue: m.idAppointment
      }))
    });


  }
}
