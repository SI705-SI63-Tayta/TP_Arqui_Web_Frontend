import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { NotificationService } from '../../../services/notification.service';
import { Notification } from '../../../models/Notification';
import {MatTableDataSource} from '@angular/material/table';
import { RecipeService } from '../../../services/recipe.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-listarnotification',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './listarnotification.component.html',
  styleUrl: './listarnotification.component.css'
})

export class ListarnotificationComponent implements OnInit{


  dataSource:MatTableDataSource<Notification>= new MatTableDataSource();

  displayedColumns:string[]=['c1', 'c2', 'c3', 'c4']

  constructor(private nS:NotificationService, private rS:RecipeService, private uS:UserService){}

  ngOnInit(): void {
    this.nS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);

    })
}


}
