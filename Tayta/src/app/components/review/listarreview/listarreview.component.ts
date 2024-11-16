import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Review } from '../../../models/Review';
import { ReviewService } from '../../../services/review.service';
import { UserService } from '../../../services/user.service';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-listarreview',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './listarreview.component.html',
  styleUrl: './listarreview.component.css'
})

export class ListarreviewComponent implements OnInit {

  dataSource: MatTableDataSource<Review> = new MatTableDataSource();

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5']

  constructor(private rS: ReviewService, private uS: UserService, private lS: LoginService) { }
  role: string = "";
  idUser: number = 0;

  ngOnInit(): void {
    this.role = this.lS.showRole();
    this.idUser = this.lS.getId();

    if (this.role === "CLIENTE" || this.role==='ADMINISTRADOR') {

    this.rS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    })
    } else if (this.role === "DOCTOR" || this.role === "ENFERMERO") {

    this.rS.getResenasByPersonal(this.idUser).subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    })
    }

    this.rS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    })
  }


}
