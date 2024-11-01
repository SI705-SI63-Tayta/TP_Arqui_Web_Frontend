import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { Recipe } from '../../../models/Recipe';
import { RecipeService } from '../../../services/recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';
@Component({
  selector: 'app-creaeditarecipe',
  standalone: true,
  imports: [MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,],
  templateUrl: './creaeditarecipe.component.html',
  styleUrl: './creaeditarecipe.component.css'
})
export class CreaeditarecipeComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  recipe: Recipe = new Recipe;

  id: number = 0;
  edicion: boolean = false;
  constructor(
    private rS: RecipeService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private lS:LoginService
  ) {}

  idCliente:number=0;
  listaModo: { value: string; viewValue: string }[] = [
    { value: 'Virtual', viewValue: 'Virtual' },
    { value: 'Prescencial', viewValue: 'Prescencial' },
  ];
  ngOnInit(): void {
    this.idCliente=this.lS.getId();
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
    codigo: [''],
      descripcion: ['', Validators.required],
      fechainicio: ['', Validators.required],
      fechafin: ['', Validators.required],
      estado: ['', Validators.required],
    });
  }
  insertar(): void {
    if (this.form.valid) {
      this.recipe.idRecipe = this.form.value.codigo;
      this.recipe.description=this.form.value.descripcion;
      this.recipe.startDate=this.form.value.fechainicio;
      this.recipe.endDate=this.form.value.estado;

      if (this.edicion) {
        this.rS.update(this.recipe).subscribe((data) => {
          this.rS.getRecetasByCliente(this.idCliente).subscribe((data) => {
            this.rS.setList(data);
          });
        });
      } else {
        this.rS.insert(this.recipe).subscribe((data) => {
          this.rS.getRecetasByCliente(this.idCliente).subscribe((data) => {
            this.rS.setList(data);
          });
        });
      }
    }
    this.router.navigate(['recetas']);
  }
  init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
        codigo: new FormControl(data.idRecipe),
        descripcion: new FormControl(data.description),
        fechainicio: new FormControl(data.startDate),
        fechafin: new FormControl(data.endDate),
        estado: new FormControl(data.state)
        });
      });
    }
  }
}
