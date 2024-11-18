import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';
import { LoginService } from '../../services/login.service';
import { MatMenuModule } from '@angular/material/menu';
import { NotificationService } from '../../services/notification.service';
import { Notification } from '../../models/Notification';
import { MatDialog } from '@angular/material/dialog';
import { NotificationDialogComponent } from '../notification-dialog/notification-dialog.component';
import { MatBadgeModule } from '@angular/material/badge';

interface MenuItem {
  icon: string;
  label: string;
  route: string;
}

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbarModule, MatSidenavModule, MatButtonModule, MatIconModule, MatDividerModule, MatListModule, RouterOutlet, CommonModule, RouterModule, MatMenuModule, MatBadgeModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent implements OnInit {
  @ViewChild(MatSidenav, { static: true })
  sidenav!: MatSidenav;
  menuItems: MenuItem[] = [];
  notifications: Notification[] = [];
  role: string = "";
  username: string = "";
  idCliente: number = 0;

  constructor(private observer: BreakpointObserver,
    private lS: LoginService,
    private router: Router,
    private nS: NotificationService,
    private dialog: MatDialog
  ) {

  }
  ngOnInit(): void {
    this.role = this.lS.showRole();
    this.username = this.lS.showUsername();
    this.idCliente = this.lS.getId();
    this.observer.observe(["(max-width:800px)"])
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = "over";
          this.sidenav.close();
        } else {
          this.sidenav.mode = "side";
          this.sidenav.open();
        }
      })
    this.loadItems();

    this.nS.getNotificationsByCliente(this.idCliente).subscribe(noti => {
      this.notifications = noti; // Asignamos las notificaciones al array
    });

  }

  loadItems() {
    if (this.role === 'CLIENTE') {
      this.menuItems = [
        { icon: 'add_location', label: 'Registrar Cita', route: '/citas/registrar' },//LISTO
        { icon: 'layers', label: 'Ver Citas', route: '/citas' },//LISTO
        { icon: 'directions_run', label: 'Registrar Actividades', route: '/actividades/registrar' },//LISTO
        { icon: 'directions_walk', label: 'Ver Actividades', route: '/actividades' },//LISTO
        { icon: 'local_hospital', label: 'Ver Recetas', route: '/recetas' },//LISTO
        { icon: 'add_comment', label: 'Registrar reseña', route: '/resenas/registrar' },//LISTO
        { icon: 'person', label: 'Ver Reseñas', route: '/resenas' },//LISTO
      ];
    } else if (this.role === 'DOCTOR' || this.role === 'ENFERMERO') {
      this.menuItems = [
        { icon: 'layers', label: 'Ver Citas', route: '/citas' },//LISTO
        { icon: 'person', label: 'Ver Reseñas', route: '/resenas' },//LISTO
        { icon: 'view_list', label: 'Registrar Historia Clinica', route: '/historiaclinica/registrar' },//LISTO
        { icon: 'view_headline', label: 'Ver Historia Clinica', route: '/historiaclinica' },//LISTO
        { icon: 'view_module', label: 'Registrar Detalle Historia', route: '/detallehistoriaclinica/registrar' },
        { icon: 'view_quilt', label: 'Ver Detalle Historia', route: '/detallehistoriaclinica' },
      ]



    } else if (this.role === 'ADMINISTRADOR') {
      this.menuItems = [
        { icon: 'add_location', label: 'Registrar Cita', route: '/citas/registrar' },//LISTO
        { icon: 'layers', label: 'Ver Citas', route: '/citas' },//LISTO
        { icon: 'directions_run', label: 'Registrar Actividades', route: '/actividades/registrar' },//LISTO
        { icon: 'directions_walk', label: 'Ver Actividades', route: '/actividades' },//LISTO
        { icon: 'local_hospital', label: 'Ver Recetas', route: '/recetas' },//LISTO
        { icon: 'add_comment', label: 'Registrar reseña', route: '/resenas/registrar' },//LISTO
        { icon: 'person', label: 'Ver Reseñas', route: '/resenas' },//LISTO
        { icon: 'view_list', label: 'Registrar Historia Clinica', route: '/historiaclinica/registrar' },//LISTO
        { icon: 'view_headline', label: 'Ver Historia Clinica', route: '/historiaclinica' },//LISTO
        { icon: 'view_module', label: 'Registrar Detalle Historia', route: '/detallehistoriaclinica/registrar' },
        { icon: 'view_quilt', label: 'Ver Detalle Historia', route: '/detallehistoriaclinica' },


        { icon: 'equalizer', label: 'Ver reporte cantidad', route: '/reportes/modocitas' },//EMERZON
        { icon: 'equalizer', label: 'Ver reporte citas periodo', route: '/reportes/Cantidadcitasperiodo' },//EMERZON
        { icon: 'equalizer', label: 'Top5 personal', route: '/reportes/top5personal' },//RENZO
        { icon: 'equalizer', label: 'Recetas finalizas cliente', route: '/reportes/recipesfinished' },//RENZO
        { icon: 'equalizer', label: 'Calificacion mayor a 3', route: '/reportes/listaCalificacionmayor3' },//ANTONIO
        { icon: 'equalizer', label: 'Historiaclinicaperiodo', route: '/reportes/Historiaclinicaperiodo' },//ANTONIO
        { icon: 'equalizer', label: 'Rol por usuario', route: '/reportes/rolporusuario' },//ALBERTO
        { icon: 'equalizer', label: 'BuscarporDNI', route: '/reportes/Buscarpordni' },//ALBERTO
        { icon: 'equalizer', label: 'Pacientes por Personal', route: '/reportes/listpatientsbystaff' },//BRUNO
        { icon: 'equalizer', label: 'Pacientes por Fecha', route: '/reportes/listpatientsbydate' },//BRUNO
      ]
    }

  }
  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  modifyProfile() {
    // Lógica para modificar el perfil
    this.router.navigate(['usuarios/ediciones']);
  }

  openNotificationDialog(notification: Notification): void {
    const dialogRef = this.dialog.open(NotificationDialogComponent, {
      data: { notification: notification }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  closeSession() {
    this.navigateTo("/login");
    sessionStorage.clear();
  }


}
