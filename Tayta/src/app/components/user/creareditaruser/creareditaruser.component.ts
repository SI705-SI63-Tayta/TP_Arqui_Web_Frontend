import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { User } from '../../../models/User';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-creareditaruser',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, ReactiveFormsModule, CommonModule],
  templateUrl: './creareditaruser.component.html',
  styleUrl: './creareditaruser.component.css'
})
export class CreareditaruserComponent {
  form: FormGroup = new FormGroup({});
  user: User = new User();

  edicion: boolean = false;
  id: number = 0;
  sendForm: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private uS: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private lS:LoginService
  ) { }


  ngOnInit(): void {
    this.id = this.lS.getId();
    this.edicion = this.id != null;

    this.init();

    this.form = this.formBuilder.group({
      codigo: [''],
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]], // Validación de email
      username: ['', Validators.required],
      currentPassword: ['', Validators.required],  // Contraseña actual
      newPassword: [''],      // Nueva contraseña, opcional
      address: ['', Validators.required],
      dni: ['', Validators.required],
    });
  }

  insertar(): void {
    if (this.form.valid) {
      const userData = {
        idUser: this.form.value.codigo,
        fullName: this.form.value.fullname,
        email: this.form.value.email,
        username: this.form.value.username,
        currentPassword: this.form.value.currentPassword,
        newPassword: this.form.value.newPassword,
        address: this.form.value.address,
        dni: this.form.value.dni,
      };

      this.uS.updateUserWithPassword(userData).subscribe({
        next: () => {
          alert('Usuario actualizado exitosamente.');
          this.router.navigate(['menubienvenida']);
        },
        error: (err) => {
          if(err.status===403){
            alert("No hubo coincidencia en la contraseña actual");
          }
        }
      });
    } else {
      alert('Por favor, completa todos los campos requeridos.');
    }
  }

  init() {
    if (this.edicion) {
      this.uS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idUser),
          fullname: new FormControl(data.fullName),
          email: new FormControl(data.email),
          username: new FormControl(data.username),
          currentPassword: new FormControl(),
          newPassword: new FormControl(),
          address: new FormControl(data.address),
          dni: new FormControl(data.dni),
        });
      });
    }
  }
}
