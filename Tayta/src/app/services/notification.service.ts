import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Notification } from '../models/Notification';




const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

   private url=`${base_url}/notificaciones`

  constructor(private http:HttpClient) { }

  list(){
    return this.http.get<Notification[]>(this.url);
  }

}
