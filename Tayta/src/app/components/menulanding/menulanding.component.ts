import { Component, OnInit, ViewChild } from '@angular/core';
import { ToolbarComponent } from "../toolbar/toolbar.component";
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatDrawer, MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { BreakpointObserver } from '@angular/cdk/layout';
@Component({
  selector: 'app-menulanding',
  standalone: true,
  imports: [ToolbarComponent,RouterLink,MatToolbarModule,MatIconModule,MatButtonModule,MatSidenav,MatSidenavModule,MatListModule,RouterOutlet,MatMenuModule],
  templateUrl: './menulanding.component.html',
  styleUrl: './menulanding.component.css'
})
export class MenulandingComponent {

}
