import { Component, OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Appointment } from '../../../models/Appointment';
import { AppointmentService } from '../../../services/appointment.service';
import { RouterLink, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { LoginService } from '../../../services/login.service';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from '../../confirm-delete-dialog/confirm-delete-dialog.component';
@Component({
  selector: 'app-listar-appointment',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterLink,RouterModule,MatCardModule,CommonModule],
  templateUrl: './listar-appointment.component.html',
  styleUrl: './listar-appointment.component.css'
})
export class ListarAppointmentComponent implements OnInit{
  dataSource:MatTableDataSource<Appointment> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3','c4','c5','c6','c7']

  constructor(private aS:AppointmentService, private lS:LoginService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ){}
  idUser: number=0;
  role: string="";
  ngOnInit(): void {
    this.role=this.lS.showRole();
    this.idUser=this.lS.getId();

    if(this.role==="CLIENTE"){
      this.aS.getCitasByCliente(this.idUser).subscribe((data)=>{
        this.dataSource=new MatTableDataSource(data);
      });
    }else if(this.role=== "DOCTOR" || this.role==="ENFERMERO"){
      this.aS.getCitasByPersonal(this.idUser).subscribe((data)=>{
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


}
