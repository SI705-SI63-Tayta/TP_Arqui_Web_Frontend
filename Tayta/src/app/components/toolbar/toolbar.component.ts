import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';
import { LoginService } from '../../services/login.service';

interface MenuItem {
  icon: string;
  label: string;
  route: string;
}

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbarModule,MatSidenavModule,MatButtonModule,MatIconModule,MatDividerModule,MatListModule,RouterOutlet,CommonModule,RouterModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent implements OnInit {
  @ViewChild(MatSidenav, {static:true})
  sidenav!:MatSidenav;
  menuItems: MenuItem[] = [];

  @Input() role:string="";
  constructor(private observer:BreakpointObserver,
    private lS:LoginService,
    private router:Router
  ){
    
  }
  ngOnInit(): void {
    this.role=this.lS.showRole();
    this.observer.observe(["(max-width:800px)"])
    .subscribe((res)=>{
      if(res.matches){
        this.sidenav.mode="over";
        this.sidenav.close();
      }else{
        this.sidenav.mode="side";
        this.sidenav.open();
      }
    })
    this.loadItems();
  }

  loadItems() {
    if (this.role === 'CLIENTE') {
      this.menuItems = [
        { icon: 'home', label: 'Registrar Cita', route: '/citas/registrar' },
        { icon: 'person', label: 'Ver Citas', route: '/citas' },
        { icon: 'person', label: 'Registrar Actividades', route: '/actividades/registrar' },
        { icon: 'person', label: 'Ver Actividades', route: '/actividades' },
        { icon: 'person', label: 'Ver Recetas', route: '/recetas/listar' }
      ];
    }
  }
  navigateTo(route: string) {
    this.router.navigate([route]);
  }
  
}
