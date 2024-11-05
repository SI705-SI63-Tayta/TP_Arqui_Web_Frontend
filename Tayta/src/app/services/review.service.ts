import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Review } from '../models/Review';
import { map, Observable, Subject } from 'rxjs';

const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private url=`${base_url}/resenas`
  constructor(private http:HttpClient) { }
  private listaCambio = new Subject<Review[]>();
  list(){
    return this.http.get<Review[]>(this.url);
  }
  insert(r: Review) {
    return this.http.post(this.url, r);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Review[]) {
    this.listaCambio.next(listaNueva);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<Review>(`${this.url}/${id}`);
  }

  update(r: Review) {
    return this.http.put(this.url, r);
  }

  getResenasByPersonal(id:number): Observable<Review[]>{
    return this.list().pipe(
      map(re=>re.filter(r=>r.userPersonal.idUser===id))
    );
  }

}
