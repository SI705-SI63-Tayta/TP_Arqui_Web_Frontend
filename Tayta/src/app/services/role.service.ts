import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Role } from '../models/Role';
import { Observable, Subject } from 'rxjs';
import { QuantityUserperRolDTO } from '../models/QuantityUserperRolDTO';
const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private url=`${base_url}/Roles`

  private listaCambio = new Subject<Role[]>();
  constructor(private http:HttpClient) { }

  list(){
    return this.http.get<Role[]>(this.url);
  }
  insert(r:Role){
    return this.http.post(this.url,r)
  }

  setList(listaNueva:Role[]){
    this.listaCambio.next(listaNueva);
  }

  getList(){
    return this.listaCambio.asObservable();
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<Role>(`${this.url}/${id}`);
  }

  update(r: Role) {
    return this.http.put(this.url, r);
  }

  getQuantityUserRol(): Observable<QuantityUserperRolDTO[]> {
    return this.http.get<QuantityUserperRolDTO[]>(`${this.url}/CantidadUsuariosPorRol`);
  }
}
