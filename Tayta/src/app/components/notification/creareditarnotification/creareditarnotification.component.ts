import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Notification } from '../../../models/Notification';
import { NotificationService } from '../../../services/notification.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-creareditarnotification',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, ReactiveFormsModule, CommonModule],
  templateUrl: './creareditarnotification.component.html',
  styleUrl: './creareditarnotification.component.css'
})
export class CreareditarnotificationComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  notification: Notification = new Notification();

  edicion: boolean = false;
  id: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private nS: NotificationService,
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
      mensaje: ['', Validators.required],
      userCliente: ['', Validators.required],
      idReceta: ['', Validators.required],
    });
  }
  insertar(): void {
    if (this.form.valid) {
      this.notification.idNotification = this.form.value.codigo;
      this.notification.message = this.form.value.mensaje;
      this.notification.user.idUser = this.form.value.userCliente;
      this.notification.recipe.idRecipe = this.form.value.idReceta;

      if(this.edicion){
        this.nS.update(this.notification).subscribe((data)=>{
          this.nS.getList().subscribe((data)=>{
            this.nS.setList(data);
          });
        });
      }else{
        this.nS.insert(this.notification).subscribe((data)=>{
          this.nS.list().subscribe((data)=>{
            this.nS.setList(data);
          });
        });
      }
      this.router.navigate(['notificaciones']);

    }
  }



  init() {
    if (this.edicion) {
      this.nS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idNotification),
          mensaje: new FormControl(data.message),
          userCliente: new FormControl(data.user.idUser),
          idReceta: new FormControl(data.recipe.idRecipe),
        });
      });
    }
  }
}
