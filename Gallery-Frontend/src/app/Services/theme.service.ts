import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  constructor(private http:HttpClient) { }
  themes:any=[]
  CreateTheme(Name:string,userId:string){

    return this.http.post(`http://127.0.0.1:3000/theme`,
      {Name,userId})
  }
  getUserThemes(userId:string){
    return this.http.get(`http://127.0.0.1:3000/theme/user/${userId}`)
  }
}
