import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Appointment } from '../models/Appointment';
import { map, Observable, Subject } from 'rxjs';
import { AppointmentModeDTO } from '../models/AppointmentModeDTO';
import { AppointmentCountDTO } from '../models/AppointmentCountDTO';
const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
private url=`${base_url}/citas`
  constructor(private http:HttpClient) { }
  private listaCambio = new Subject<Appointment[]>();
  list(){
    return this.http.get<Appointment[]>(this.url);
  }
  insert(ap: Appointment) {
    return this.http.post(this.url, ap);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Appointment[]) {
    this.listaCambio.next(listaNueva);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<Appointment>(`${this.url}/${id}`);
  }

  update(ap: Appointment) {
    return this.http.put(this.url, ap);
  }

  getCitasByCliente(id:number): Observable<Appointment[]>{
    return this.list().pipe(
      map(ap=>ap.filter(a=>a.userCliente.idUser===id))
    );
  }

  getCitasByPersonal(id:number): Observable<Appointment[]>{
    return this.list().pipe(
      map(ap=>ap.filter(a=>a.userPersonal.idUser===id))
    );
  }

  getCantidadCitasByMode(): Observable<AppointmentModeDTO[]> {
    return this.http.get<AppointmentModeDTO[]>(`${this.url}/cantidadModoCitas`);
  }

  getCantidadCitasByPeriod(date1: string, date2: string): Observable<AppointmentCountDTO[]> {
    const url = `${this.url}/cantidadCitas?date1=${date1}&date2=${date2}`;
    return this.http.get<AppointmentCountDTO[]>(url);
}
}
