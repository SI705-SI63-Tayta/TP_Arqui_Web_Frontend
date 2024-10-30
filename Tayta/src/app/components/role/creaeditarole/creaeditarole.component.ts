import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Role } from '../../../models/Role';
import { RoleService } from '../../../services/role.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-creaeditarole',
  standalone: true,
  imports: [MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule],
  templateUrl: './creaeditarole.component.html',
  styleUrl: './creaeditarole.component.css'
})
export class CreaeditaroleComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  role: Role = new Role;

  id: number = 0;
  edicion: boolean = false;

  listaRoles: string[] = ['DOCTOR', 'ENFERMERO', 'CLIENTE', 'ADMINISTRADOR'];

  constructor(
    private rS: RoleService,
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
      hcodigo: [''],
      htipo: ['', [Validators.required, this.validarRolPermitido.bind(this)]]
      });
  }

  validarRolPermitido(control: FormControl): { [key: string]: boolean } | null {
    const valor = control.value.toUpperCase(); // Convertimos a mayúsculas
    if (!this.listaRoles.includes(valor)) {
      return { 'rolInvalido': true };
    }
    return null;
  }

  // Convertir a mayúsculas automáticamente
  convertirAMayusculas(): void {
    const valorActual = this.form.get('htipo')?.value || '';
    this.form.patchValue({ htipo: valorActual.toUpperCase() });
  }
  insertar(): void {
    if (this.form.valid) {
      this.role.idRol=this.form.value.hcodigo;
      this.role.tipoRol= this.form.value.htipo;
      if (this.edicion) {
        this.rS.update(this.role).subscribe((data) => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      } else {
        this.rS.insert(this.role).subscribe((data) => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      }
      this.router.navigate(['roles'])
    }else{
      // Esto marca los campos como "tocados" para que se muestren los errores
      this.form.markAllAsTouched();
    }
    
  }

  init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.idRol),
          htipo: new FormControl(data.tipoRol, [Validators.required, this.validarRolPermitido.bind(this)]),
        });
      });
    }
  }
}


