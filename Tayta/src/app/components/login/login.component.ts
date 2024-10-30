import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { JwtRequest } from '../../models/jwtRequest';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoleService } from '../../services/role.service';
import { Role } from '../../models/Role';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit{

  constructor(private lS:LoginService,
    private rS:RoleService,
    private router:Router,
    private snackBar: MatSnackBar,
    private route:ActivatedRoute
  ){}

  username: string='';
  password: string='';
  mensaje: string = '';
  id:number=0;
  rol:Role=new Role();
  role:string="";
  idR:string="";
  hidePassword: boolean = true;

  ngOnInit(): void {
    this.route.params.subscribe((data: Params)=>{
      this.id=data['id'];
    })
  }

  login(){
    let request = new JwtRequest();
    request.username=this.username;
    request.password=this.password;

    this.lS.login(request).subscribe((data:any)=>{
      sessionStorage.setItem('token',data.jwttoken);
      this.router.navigate(['menubienvenida']);
    },
    (error)=>{
      this.mensaje = 'Contraseña o usuario incorrectas';
      this.snackBar.open(this.mensaje, 'Aviso', { duration: 2000 });
    }
  );
  this.role=this.lS.showRole();
  this.idR=this.lS.getId();
  }


}
