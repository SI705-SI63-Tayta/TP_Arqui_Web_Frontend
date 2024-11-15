import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ClinicalHistoryDetail } from '../../../models/ClinicalHistoryDetail';
import { ClinicaldetailhistoryService } from '../../../services/clinicaldetailhistory.service';

@Component({
  selector: 'app-creareditarclinicalhistorydetail',
  standalone: true,
  imports: [MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule],
  templateUrl: './creareditarclinicalhistorydetail.component.html',
  styleUrl: './creareditarclinicalhistorydetail.component.css'
})
export class CreareditarclinicalhistorydetailComponent {
  form: FormGroup = new FormGroup({});
  clinicalhistorydetail: ClinicalHistoryDetail = new ClinicalHistoryDetail;

  id: number = 0;
  edicion: boolean = false;

  constructor(
    private cS: ClinicaldetailhistoryService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {

    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      //trae los datos
      this.init();
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
}
