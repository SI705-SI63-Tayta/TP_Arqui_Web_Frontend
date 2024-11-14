import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { JwtRequest } from '../models/jwtRequest';
import { isPlatformBrowser } from '@angular/common';



const base_url=environment.base;
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url=`${base_url}/Users`;
  private url_login=`${base_url}/login`;

  constructor(private http:HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  login(request: JwtRequest){
    return this.http.post(this.url_login,request);
  }

  verificar() {
    if (isPlatformBrowser(this.platformId)) {
      let token = sessionStorage.getItem('token');
      return token != null;
    }
    return false;
  }

  showRole() {
    if (isPlatformBrowser(this.platformId)) {
      let token = sessionStorage.getItem('token');
      if (!token) {
        // Manejar el caso en el que el token es nulo.
        return null; // O cualquier otro valor predeterminado dependiendo del contexto.
      }
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
      return decodedToken?.role;
    }
    return null;
  }

  showUsername() {
    if (isPlatformBrowser(this.platformId)) {
      let token = sessionStorage.getItem('token');
      if (!token) {
        return null;
      }
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
      console.log(decodedToken);
      return decodedToken?.username;
    }
    return null;
  }


  userLogin(nombre:string):Observable<User>{
    return this.http.get<User>(`${this.url}/nombreusuario?username=${nombre}`);
  }

  getId() {
    if (isPlatformBrowser(this.platformId)) {
      let token = sessionStorage.getItem('token');
      if (!token) {
        return null;
      }
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
      console.log(decodedToken);

      let id = decodedToken?.id;
      if (id) {
        id = parseInt(id, 10);
        if (isNaN(id)) {
          return null;
        }
      }
      return id;
    }
    return null;
  }
}
