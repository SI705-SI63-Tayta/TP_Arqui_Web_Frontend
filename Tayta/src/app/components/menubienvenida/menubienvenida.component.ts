import { Component, OnInit } from '@angular/core';
import { ToolbarComponent } from "../toolbar/toolbar.component";
import { MatIconModule } from '@angular/material/icon';
import { LoginService } from '../../services/login.service';
import { UserService } from '../../services/user.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menubienvenida',
  standalone: true,
  imports: [ToolbarComponent, MatIconModule,RouterModule],
  templateUrl: './menubienvenida.component.html',
  styleUrls: ['./menubienvenida.component.css']
})
export class MenubienvenidaComponent implements OnInit {
  name: string = "";
  username: string = "";
  role: string = "";
  menuItems!: [];





  constructor(private lS: LoginService, private uS: UserService) {}

  ngOnInit() {
    this.verificar();
  }

  verificar() {
    this.role = this.lS.showRole();
    this.username = this.lS.showUsername();
    this.getFullname();
    
    return this.lS.verificar();
  }

  getFullname() {
    this.lS.userLogin(this.username).subscribe((data) => {
      this.name = data.fullName;
    });
  }


}
