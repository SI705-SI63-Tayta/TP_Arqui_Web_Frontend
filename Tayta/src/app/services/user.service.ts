import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';
import { map, Observable, Subject } from 'rxjs';
const base_url=environment.base


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url=`${base_url}/Users`
  private ListaCambio = new Subject<User[]>()
  constructor(private http:HttpClient) { }

  list(){
    return this.http.get<User[]>(this.url);
  }

  insert(u:User){
    return this.http.post(this.url,u);
  }

  setList(ListaNueva:User[]){
    this.ListaCambio.next(ListaNueva);
  }

  getList(){
    return this.ListaCambio.asObservable();
  }

  listId(id: number){
    return this.http.get<User>(`${this.url}/${id}`);
  }

  update(u:User){
    return this.http.put(this.url,u);
  }

  eliminar(id: number){
    return this.http.delete(`${this.url}/${id}`);
  }

  exitsByUsername(username: string):Observable<boolean>{
    return this.http.get<boolean>(`${this.url}/?username=${username}`);
  }

  getMedicos(): Observable<User[]> {
    return this.list().pipe(
      map(users => users.filter(user => user.role.tipoRol === 'DOCTOR' || user.role.tipoRol === 'ENFERMERO'))
    );
  }

}
