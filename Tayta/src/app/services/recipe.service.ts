import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../models/Recipe';
const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
private url=`${base_url}/receta`
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Recipe[]>(this.url);
  }
}
