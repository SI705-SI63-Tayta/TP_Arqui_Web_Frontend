import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { MedicalRecord } from '../models/MedicalRecord';
import { Subject } from 'rxjs';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class MedicalrecordService {
  private url=`${base_url}/HistoriaClinica`;
  private listaCambio = new Subject<MedicalRecord[]>();

  constructor(private http:HttpClient) { }

  list(){
    return this.http.get<MedicalRecord[]>(this.url);
  }

  insert(mr:MedicalRecord){
    return this.http.post(this.url, mr)
  }

  setList(listaNueva:MedicalRecord[]){
    this.listaCambio.next(listaNueva);
  }

  getList(){
    return this.listaCambio.asObservable();
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<MedicalRecord>(`${this.url}/${id}`);
  }

  update(mr: MedicalRecord) {
    return this.http.put(this.url, mr);
  }
}

