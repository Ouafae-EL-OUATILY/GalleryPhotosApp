import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SignInService {
  user:any
  constructor(private http:HttpClient) {

  }
  getUserData(){
    const data :string|any =  localStorage.getItem('user')
    return  JSON.parse(data);

  }
  getUser(email:string,password:string){
    console.log(email,password)
    return this.http.get(`http://127.0.0.1:3000/users/signIn/password=${password}&email=${email}`)
  }
}
