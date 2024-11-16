import { Component, OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Appointment } from '../../../models/Appointment';
import { AppointmentService } from '../../../services/appointment.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { LoginService } from '../../../services/login.service';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from '../../confirm-delete-dialog/confirm-delete-dialog.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { RecipeService } from '../../../services/recipe.service';
@Component({
  selector: 'app-listar-appointment',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterLink,RouterModule,MatCardModule,CommonModule, MatMenuModule, MatButtonModule],
  templateUrl: './listar-appointment.component.html',
  styleUrl: './listar-appointment.component.css'
})
export class ListarAppointmentComponent implements OnInit{
  dataSource:MatTableDataSource<Appointment> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3','c4','c5','c6','c7']

  constructor(private aS:AppointmentService, private lS:LoginService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private rS:RecipeService,
    private router: Router,
  ){}
  idUser: number=0;
  role: string="";
  ngOnInit(): void {
    this.role=this.lS.showRole();
    this.idUser=this.lS.getId();

    if(this.isCliente()){
      this.aS.getCitasByCliente(this.idUser).subscribe((data)=>{
        this.dataSource=new MatTableDataSource(data);
      });
    }else if(this.isPersonal()){
      this.aS.getCitasByPersonal(this.idUser).subscribe((data)=>{
        this.dataSource=new MatTableDataSource(data);
      });
    }else if(this.isAdministrador()){
      this.aS.list().subscribe((data)=>{
        this.dataSource=new MatTableDataSource(data);
      });
    }
    this.aS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });

  }

  isPersonal(){
    return (this.lS.showRole()==='DOCTOR' || this.lS.showRole()==='ENFERMERO');
  }

  isCliente(){
    return this.lS.showRole()==='CLIENTE';
  }

  isAdministrador(){
    return this.lS.showRole()==='ADMINISTRADOR';
  }


  eliminar(id: number) {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      data: { message: '¿Estás seguro de que deseas eliminar esta cita?' }  // Mensaje del cuadro de confirmación
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {  // Si el usuario confirma
        if (this.role === "CLIENTE") {
          this.aS.delete(id).subscribe(
            (data) => {
              this.aS.getCitasByCliente(this.idUser).subscribe((data) => {
                this.aS.setList(data);
              });
              this.snackBar.open('Eliminado correctamente', 'Cerrar', {
                duration: 5000,
                horizontalPosition: 'center',
                verticalPosition: 'bottom',
              });

            },
            (error) => {
              if (error.status === 400) {
                this.snackBar.open('No se puede eliminar la cita: La cita ya ha sido atendida.', 'Cerrar', {
                  duration: 5000,
                  horizontalPosition: 'center',
                  verticalPosition: 'bottom',
                });
              } else {
                this.snackBar.open('Hubo un error al eliminar la cita. Inténtalo de nuevo.', 'Cerrar', {
                  duration: 5000,
                  horizontalPosition: 'center',
                  verticalPosition: 'bottom',
                });
              }
            }
          );
        } else if (this.role === "DOCTOR" || this.role === "ENFERMERO") {
          this.aS.delete(id).subscribe(
            (data) => {
              this.aS.getCitasByPersonal(this.idUser).subscribe((data) => {
                this.aS.setList(data);
              });
              this.snackBar.open('Eliminado correctamente', 'Cerrar', {
                duration: 5000,
                horizontalPosition: 'center',
                verticalPosition: 'bottom',
              });

            },
            (error) => {
              if (error.status === 400) {
                this.snackBar.open('No se puede eliminar la cita: La cita ya ha sido atendida.', 'Cerrar', {
                  duration: 5000,
                  horizontalPosition: 'center',
                  verticalPosition: 'bottom',
                });
              } else {
                this.snackBar.open('Hubo un error al eliminar la cita. Inténtalo de nuevo.', 'Cerrar', {
                  duration: 5000,
                  horizontalPosition: 'center',
                  verticalPosition: 'bottom',
                });
              }
            }
          );
        }else if(this.role==='ADMINISTRADOR'){
          this.aS.delete(id).subscribe(
            (data) => {
              this.aS.list().subscribe((data) => {
                this.aS.setList(data);
              });
              this.snackBar.open('Eliminado correctamente', 'Cerrar', {
                duration: 5000,
                horizontalPosition: 'center',
                verticalPosition: 'bottom',
              });

            },
            (error) => {
              if (error.status === 400) {
                this.snackBar.open('No se puede eliminar la cita: La cita ya ha sido atendida.', 'Cerrar', {
                  duration: 5000,
                  horizontalPosition: 'center',
                  verticalPosition: 'bottom',
                });
              } else {
                this.snackBar.open('Hubo un error al eliminar la cita. Inténtalo de nuevo.', 'Cerrar', {
                  duration: 5000,
                  horizontalPosition: 'center',
                  verticalPosition: 'bottom',
                });
              }
            }
          );
        }
      }
    });
  }


  handleRecetaAction(idCita: number, action: 'crear' | 'editar' | 'eliminar') {
    this.rS.getRecetaPorCita(idCita).subscribe(receta => {
      if (receta) {
        switch (action) {
          case 'crear':
            this.showSnackbar('La cita ya cuenta con una receta');
            break;
          case 'editar':
            this.router.navigate(['/recetas/ediciones', receta.idRecipe, idCita]);
            break;
          case 'eliminar':
            this.rS.delete(receta.idRecipe).subscribe((data) => {
              this.rS.list().subscribe((data)=>{
                this.rS.setList(data)
              });
              this.showSnackbar('Se eliminó correctamente la receta');
            });
            break;
        }
      } else {
        if (action === 'crear') {
          this.router.navigate(['/recetas/registrar', idCita]);
        } else {
          this.showSnackbar('Esta cita todavía no cuenta con una receta');
        }
      }
    });
  }

  private showSnackbar(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }






}
