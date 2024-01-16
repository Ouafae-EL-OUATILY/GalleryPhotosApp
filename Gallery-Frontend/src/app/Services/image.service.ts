import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  Images:any = []
  constructor(private http:HttpClient) { }

  SaveImage(ThemeId:any,userId:any,title:any,src:any){


    return this.http.post(`http://127.0.0.1:3000/image`,
      {ThemeId,userId,title,src})

  }
  getUserImages(userId:any){
    return this.http.get(`http://127.0.0.1:3000/image/users/${userId}`)

  }
  editImage(ImageId:string,Id:string){
    return this.http.put(`http://127.0.0.1:3000/image/${ImageId}`,{
      Id:Id
    })
  }
  deleteImage(ImageId:string){
    return this.http.delete(`http://127.0.0.1:3000/image/${ImageId}`)
  }

  SaveImgDetails(ImageId:string,dominant:any,Histogram:any,moment:any){
    console.log(dominant,"YYYYYYYYYYYy")
    return this.http.put(`http://127.0.0.1:3000/image/Details/${ImageId}`,{
      Histogram: {Red:Histogram.red,Green:Histogram.green,Blue:Histogram.blue},dominant:dominant,moment:moment
    })
  }

}
