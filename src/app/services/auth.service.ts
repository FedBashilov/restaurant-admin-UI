import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private currentAdminSubject = new BehaviorSubject<string>( '' );
  currentAdmin = this.currentAdminSubject.asObservable();

  public PHP_API_SERVER = "http://localhost";

  constructor(private httpClient: HttpClient) {
    this.currentAdminSubject.next( this.getJWT() );
  }


  getJWT(): string{
    return localStorage.getItem("jwt") || '';
  }

  setJWT(jwt: string){
    localStorage.setItem("jwt", jwt);
    this.currentAdminSubject.next( jwt );
  }


  login(login: any, password: any): Observable<any>{
    return this.httpClient.post<any>(`${this.PHP_API_SERVER}/API.php/admins/login`, {data: { login: login, password: password }});
  }

  logout(){
    localStorage.removeItem("jwt");
    this.currentAdminSubject.next( '' );
  }


}
