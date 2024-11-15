import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../models/User';
import { Role } from '../../models/Role';
import { UserService } from '../../services/user.service';
import { RoleService } from '../../services/role.service';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,CommonModule,MatFormFieldModule,MatInputModule,MatButtonModule,ReactiveFormsModule,MatIconModule,MatSelectModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  form:FormGroup = new FormGroup({});
  user: User = new User();
  id: number=0;
  rol:Role = new Role();
  hidePassword: boolean = true;

  constructor(
    private uS:UserService,
    private rS:RoleService,
    private router:Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar
  ){}

  listaRol: { value: string; viewValue: string }[] = [
    { value: '1', viewValue: 'Enfermero' },
    { value: '2', viewValue: 'Doctor' },
    { value: '3', viewValue: 'Cliente' },
    { value: '4', viewValue: 'Administrador' },
  ];

  ngOnInit(): void {
    this.route.params.subscribe((data: Params)=>{
      this.id = data['id'];
    });

    this.form = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.maxLength(50), Validators.email]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      address: ['', [Validators.required, Validators.maxLength(250)]],
      dni: ['', [Validators.required,, Validators.pattern(/^\d{8}$/)]],
      rol: ['', Validators.required],
    });
  }

  registrar(): void {
    if (this.form.valid) {
      const username = this.form.value.username;
      const dni = this.form.value.dni;

      // Validar que el username no exista
      this.uS.exitsByUsername(username).subscribe((usernameExists: boolean) => {
        if (usernameExists) {
          this.form.controls['username'].setErrors({ usernameTaken: true });
          this.snackbar.open('Ya existe un usuario con este username', '', {
            duration: 3000,
          });
        } else {
          // Validar que el DNI no exista
          this.uS.exitsByDNI(dni).subscribe((dniExists: boolean) => {
            if (dniExists) {
              this.form.controls['dni'].setErrors({ dniTaken: true });
              this.snackbar.open('Ya existe un usuario con este DNI', '', {
                duration: 3000,
              });
            } else {
              // Asignar los valores del formulario al usuario
              console.log(this.form.value);
              this.user.fullName = this.form.value.fullName;
              this.user.email = this.form.value.email;
              this.user.username = this.form.value.username;
              this.user.password = this.form.value.password;
              this.user.address = this.form.value.address;
              this.user.dni = this.form.value.dni;
              this.user.enabled = true;
              this.user.role.idRol = this.form.value.rol;

              // Insertar el usuario en la base de datos
              this.uS.insert(this.user).subscribe(() => {
                this.uS.list().subscribe((data) => {
                  this.uS.setList(data);
                });
              });
              this.router.navigate(['login']);
            }
          });
        }
      });
    } else {
      this.snackbar.open('Por favor completa todos los campos correctamente.', '', {
        duration: 3000,
      });
    }
  }


}
