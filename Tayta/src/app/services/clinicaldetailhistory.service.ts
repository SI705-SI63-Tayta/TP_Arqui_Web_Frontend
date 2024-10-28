import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { ClinicalHistoryDetail } from '../models/ClinicalHistoryDetail';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class ClinicaldetailhistoryService {
  private url = `${base_url}/Detalle_historiaclinica`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<ClinicalHistoryDetail[]>(this.url);
  }
}
