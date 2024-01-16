import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FlaskService {

  constructor(private http:HttpClient) { }
  GetHisto(src:any){
    return this.http.post(`http://127.0.0.1:5000/upload/hist`,
      {base64_image:src})
  }
  GetDominant(src:any){
    return this.http.post(`http://127.0.0.1:5000/upload/dominant`,
      {base64_image:src})
  }

  GetImageDetails(src:any){
    return this.http.post(`http://127.0.0.1:5000/upload/`,
      {base64_image:src})
  }

}
