import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { MedicalRecord } from '../models/MedicalRecord';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class MedicalrecordService {
  private url=`${base_url}/HistoriaClinica`;

  constructor(private http:HttpClient) { }

  list(){
    return this.http.get<MedicalRecord[]>(this.url);
    }
}
