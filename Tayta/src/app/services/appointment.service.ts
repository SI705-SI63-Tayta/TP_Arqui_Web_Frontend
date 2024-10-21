import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Appointment } from '../models/Appointment';
const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
private url=`${base_url}/cita`
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Appointment[]>(this.url);
  }
}
