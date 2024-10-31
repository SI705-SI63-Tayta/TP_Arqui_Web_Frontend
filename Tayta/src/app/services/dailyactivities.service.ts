import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { DailyActivities } from '../models/DailyActivities';
import { Subject } from 'rxjs';
const base_url=environment.base


@Injectable({
  providedIn: 'root'
})
export class DailyactivitiesService {
  private url=`${base_url}/actividades_diarias`
  private listaCambio=new Subject<DailyActivities[]>();
  constructor(private http:HttpClient) { }

  list(){
    return this.http.get<DailyActivities[]>(this.url);
  }

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
}
