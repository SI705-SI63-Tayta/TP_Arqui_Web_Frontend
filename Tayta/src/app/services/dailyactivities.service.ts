import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { DailyActivities } from '../models/DailyActivities';
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
}
