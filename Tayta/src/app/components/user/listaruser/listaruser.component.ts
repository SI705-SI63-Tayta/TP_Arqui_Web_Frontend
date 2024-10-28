import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { User } from '../../../models/User';
import { UserService } from '../../../services/user.service';
import { RoleService } from '../../../services/role.service';

@Component({
  selector: 'app-listaruser',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './listaruser.component.html',
  styleUrl: './listaruser.component.css'
})
export class ListaruserComponent implements OnInit{
  dataSource: MatTableDataSource<User> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8']

  constructor(private uS:UserService, private rS:RoleService){}

  ngOnInit(): void {
    this.uS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
    })
  }
}
