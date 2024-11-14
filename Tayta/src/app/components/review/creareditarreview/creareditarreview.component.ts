import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Review } from '../../../models/Review';
import { ReviewService } from '../../../services/review.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { MatSelectModule } from '@angular/material/select';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-creareditarreview',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, ReactiveFormsModule, CommonModule,MatSelectModule],
  templateUrl: './creareditarreview.component.html',
  styleUrl: './creareditarreview.component.css'
})
export class CreareditarreviewComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  review: Review = new Review();

  edicion: boolean = false;
  id: number = 0;
  idCliente: number=0;

  listaMedicos: { value: number; viewValue: string }[] = [];
  puntuaciones: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(
    private formBuilder: FormBuilder,
    private rS: ReviewService,
    private router: Router,
    private route: ActivatedRoute,
    private lS:LoginService,
    private uS:UserService
  ) { }


  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;

      this.init();
      this.getMedicos();
      this.idCliente=this.lS.getId();
    });

    this.form = this.formBuilder.group({
      codigo: [''],
      puntuacion: ['', Validators.required],
      comentario: ['', Validators.required],
      personal: ['', Validators.required],
    });
  }
  insertar(): void {
    if (this.form.valid) {
      this.review.idReview = this.form.value.codigo;
      this.review.scoreReview = this.form.value.puntuacion;
      this.review.commentReview = this.form.value.comentario;
      this.review.userCliente.idUser =this.idCliente;
      this.review.userPersonal.idUser = this.form.value.personal;

      if(this.edicion){
        this.rS.update(this.review).subscribe((data)=>{
          this.rS.getList().subscribe((data)=>{
            this.rS.setList(data);
          });
        });
      }else{
        this.rS.insert(this.review).subscribe((data)=>{
          this.rS.list().subscribe((data)=>{
            this.rS.setList(data);
          });
        });
      }
      this.router.navigate(['resenas']);

    }
  }



  init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idReview),
          puntuacion: new FormControl(data.scoreReview),
          comentario: new FormControl(data.commentReview),
          userPersonal: new FormControl(data.userPersonal.idUser),
        });
        this.review.userCliente.idUser=data.userCliente.idUser;
        this.review.userPersonal.idUser=data.userPersonal.idUser;
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

}
