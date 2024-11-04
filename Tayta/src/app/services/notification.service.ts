import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Notification } from '../models/Notification';
import { Subject } from 'rxjs';


const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private url=`${base_url}/notificaciones`
  constructor(private http:HttpClient) { }
  private listaCambio = new Subject<Notification[]>();
  list(){
    return this.http.get<Notification[]>(this.url);
  }
  insert(n: Notification) {
    return this.http.post(this.url, n);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Notification[]) {
    this.listaCambio.next(listaNueva);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<Notification>(`${this.url}/${id}`);
  }

  update(n: Notification) {
    return this.http.put(this.url, n);
  }

}
