import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Review } from '../models/Review';

const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private url=`${base_url}/resenas`



  constructor(private http:HttpClient) {  }


  list(){
    return this.http.get<Review[]>(this.url);
  }






}
