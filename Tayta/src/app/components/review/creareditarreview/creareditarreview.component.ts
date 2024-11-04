import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Review } from '../../../models/Review';
import { ReviewService } from '../../../services/review.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-creareditarreview',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, ReactiveFormsModule, CommonModule],
  templateUrl: './creareditarreview.component.html',
  styleUrl: './creareditarreview.component.css'
})
export class CreareditarreviewComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  review: Review = new Review();

  edicion: boolean = false;
  id: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private rS: ReviewService,
    private router: Router,
    private route: ActivatedRoute,
    private lS:LoginService
  ) { }


  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;

      this.init();
    });

    this.form = this.formBuilder.group({
      codigo: [''],
      puntuacion: ['', Validators.required],
      comentario: ['', Validators.required],
      userCliente: ['', Validators.required],
      userPersonal: ['', Validators.required],
    });
  }
  insertar(): void {
    if (this.form.valid) {
      this.review.idReview = this.form.value.codigo;
      this.review.scoreReview = this.form.value.puntuacion;
      this.review.commentReview = this.form.value.comentario;
      this.review.userCliente.idUser = this.form.value.userCliente;
      this.review.userPersonal.idUser = this.form.value.userPersonal;

      if(this.edicion){
        this.rS.update(this.review).subscribe((data)=>{
          this.rS.getList().subscribe((data)=>{
            this.rS.setList(data);
          });
        });
      }else{
        this.rS.insert(this.review).subscribe((data)=>{
          this.rS.getList().subscribe((data)=>{
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
          userCliente: new FormControl(data.userCliente.idUser),
          userPersonal: new FormControl(data.userPersonal.idUser),
        });
      });
    }
  }

}
