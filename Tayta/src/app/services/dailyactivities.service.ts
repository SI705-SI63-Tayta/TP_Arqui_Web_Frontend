import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { DailyActivities } from '../models/DailyActivities';
<<<<<<< HEAD
import { map, Observable, Subject } from 'rxjs';
=======
>>>>>>> 2fe96d804b2c99e8084df3b1509ec6c9d5c2ee45
const base_url=environment.base


@Injectable({
  providedIn: 'root'
})
export class DailyactivitiesService {
  private url=`${base_url}/actividades_diarias`

  constructor(private http:HttpClient) { }

  list(){
    return this.http.get<DailyActivities[]>(this.url);
  }
<<<<<<< HEAD

  insert(da:DailyActivities){
    return this.http.post(this.url,da);
  }

  setList(listaNueva:DailyActivities[]){
    this.listaCambio.next(listaNueva);
  }

  getList(){
    return this.listaCambio.asObservable();
  }

  listId(id:number){
    return this.http.get<DailyActivities>(`${this.url}/${id}`);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  update(da: DailyActivities) {
    return this.http.put(this.url, da);
  }

  getActivitiesByCliente(id:number): Observable<DailyActivities[]>{
    return this.list().pipe(
      map(ac=>ac.filter(a=>a.user.idUser===id))
    );
  }
=======
>>>>>>> 2fe96d804b2c99e8084df3b1509ec6c9d5c2ee45
}
