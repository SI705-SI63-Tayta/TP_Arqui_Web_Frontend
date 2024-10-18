import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';
const base_url=environment.base


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url=`${base_url}/Users`
  constructor(private http:HttpClient) { }

  list(){
    return this.http.get<User[]>(this.url);
  }
}
