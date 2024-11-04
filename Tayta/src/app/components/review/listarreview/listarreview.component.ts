import { Component, OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Review } from '../../../models/Review';
import { ReviewService } from '../../../services/review.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-listarreview',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './listarreview.component.html',
  styleUrl: './listarreview.component.css'
})

export class ListarreviewComponent implements OnInit{

dataSource:MatTableDataSource<Review>= new MatTableDataSource();

displayedColumns:string[]=['c1', 'c2', 'c3', 'c4', 'c5']

constructor(private reS:ReviewService, private uS:UserService){}

ngOnInit(): void {
    this.reS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
    })

    this.reS.getList().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
    })
}


}
