import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http:HttpClient) { }

  CreateUser<T>(username:string,email:string,password:string):Observable<T>{

    let res =  this.http.post<T>(`http://127.0.0.1:3000/users`,
      {username,email,password})

    return res
  }
}
