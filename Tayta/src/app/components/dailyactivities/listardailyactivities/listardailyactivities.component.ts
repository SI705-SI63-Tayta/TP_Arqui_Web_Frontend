import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DailyActivities } from '../../../models/DailyActivities';
import { DailyactivitiesService } from '../../../services/dailyactivities.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-listardailyactivities',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './listardailyactivities.component.html',
  styleUrl: './listardailyactivities.component.css'
})
export class ListardailyactivitiesComponent implements OnInit{
  dataSource:MatTableDataSource<DailyActivities> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3']

  constructor(private dS:DailyactivitiesService, private uS:UserService){}

  ngOnInit(): void {
    this.dS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
    })
  }

}
