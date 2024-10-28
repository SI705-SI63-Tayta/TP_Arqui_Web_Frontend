import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Role } from '../models/Role';
const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private url=`${base_url}/Roles`

  constructor(private http:HttpClient) { }

  list(){
    return this.http.get<Role[]>(this.url);
  }
}
