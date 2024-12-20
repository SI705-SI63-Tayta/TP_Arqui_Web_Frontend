import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../models/Recipe';
import { map, Observable, Subject } from 'rxjs';
import { QuantityRecipesFinishedPerClientDTO } from '../models/QuantityRecipesFinishedPerClientDTO';
const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private url = `${base_url}/recipes`
  constructor(private http: HttpClient) { }
  private listaCambio = new Subject<Recipe[]>();
  list() {
    return this.http.get<Recipe[]>(this.url);
  }
  insert(r: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(this.url, r);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Recipe[]) {
    this.listaCambio.next(listaNueva);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<Recipe>(`${this.url}/${id}`);
  }

  update(veh: Recipe) {
    return this.http.put(this.url, veh);
  }

  recipesFinishedPerClient():Observable<QuantityRecipesFinishedPerClientDTO[]>{
    return this.http.get<QuantityRecipesFinishedPerClientDTO[]>(`${this.url}/recetasFinalizadas`);
  }


  getRecetasByCliente(id: number): Observable<Recipe[]> {
    return this.list().pipe(
      map(re => re.filter(r => r.appointment.userCliente.idUser === id))
    );
  }

  getRecetaByCita(idCita: number): Observable<Recipe[]> {
    return this.list().pipe(
      map(re => re.filter(r => r.appointment.idAppointment === idCita))
    );
  }

  getRecetaPorCita(idCita: number): Observable<Recipe | null> {
    return this.list().pipe(
      map(recetas => recetas.find(receta => receta.appointment.idAppointment === idCita) || null)
    );
  }



}
