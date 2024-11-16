import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { ClinicalHistoryDetail } from '../models/ClinicalHistoryDetail';
import { Observable, Subject } from 'rxjs';
import { SearchByDni } from '../models/SearchByDni';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class ClinicaldetailhistoryService {
  private url = `${base_url}/Detalle_historiaclinica`;
  private listaCambio = new Subject<ClinicalHistoryDetail[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<ClinicalHistoryDetail[]>(this.url);
  }
  insert(ch: ClinicalHistoryDetail) {
    return this.http.post(this.url, ch);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: ClinicalHistoryDetail[]) {
    this.listaCambio.next(listaNueva);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<ClinicalHistoryDetail>(`${this.url}/${id}`);
  }

  update(ch: ClinicalHistoryDetail) {
    return this.http.put(this.url, ch);
  }

  getuserperdni(dni: string): Observable<SearchByDni[]> {
    return this.http.get<SearchByDni[]>(`${this.url}/buscar?dni=${dni}`);
  }
}
