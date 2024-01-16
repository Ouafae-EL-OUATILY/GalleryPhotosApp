import { Component ,OnInit} from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {ImagesService} from "../Services/image.service";
import {ThemeService} from "../Services/theme.service";
import {SignInService} from "../Services/signin.service";
import { initFlowbite } from 'flowbite';
import {FlaskService} from '../Services/flask.service'

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  images: Image[] = [];

  addImage(image: Image): void {
    this.images.push(image);
  }

  deleteImage(image: Image): void {
    this.images = this.images.filter(i => i !== image);
  }

}

interface Image {
  id:string
  src: string;
  alt: string;
  themeId:string;
  moment:any;
  histogram:any;
  dominant:any;
  selected: boolean;
}

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  constructor(private router: Router,private FlaskSrv:FlaskService,private SignIn:SignInService,private ImageSrv :ImagesService,private ThemeSrv:ThemeService) { }

  images: Image[] = [];
  ThemeImages : Image [] = [];
  themes:any[]=[];
  user:any = null;
  themename:string = "";
  themeId:string = "";
  selectedImage: Image | null = null;
  isEditing: boolean = false;
  croppedImage: string | null = null;
  sidebarVisible1: boolean = true;

  ngOnInit(){
    this.user = this.SignIn.getUserData();
    initFlowbite();

    if(!this.user){
      this.router.navigate(['/']);
    }


    this.ThemeSrv.getUserThemes(this.user._id).subscribe((themes :any)=>{
      this.ThemeSrv.themes=themes;
      this.themes=themes;
      this.themeId = themes[0]._id ;
      console.log(this.ThemeSrv.themes,"---------THEME111-----");
    });
    this.ImageSrv.getUserImages(this.user._id).subscribe((Imgs:any)=>{
      for(let img of Imgs){
        this.images.push({id:img._id,src: img.src, alt: img.Name, selected: false,
          themeId:img.ThemeId,moment:img.moment,histogram:img.Histogram,dominant:img.dominant})
        this.ThemeImages.push({id:img._id,src: img.src, alt: img.Name, selected: false,
          themeId:img.ThemeId,moment:img.moment,histogram:img.Histogram,dominant:img.dominant})
      }
    })
  }
  onFileSelected(event: Event): void {

    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      for (let i = 0; i < inputElement.files.length; i++) {
        console.log(i,File.length)
        const file = inputElement.files[i];
        const reader = new FileReader();
        reader.onload = () => {
          const img = reader.result as string ;
          var Id = ""
          this.ImageSrv.SaveImage(this.themeId,this.user._id,file.name,img).subscribe((result :any) => {
            //console.log(result,"SUCCESSES")
            Id = result._id ;
            this.FlaskSrv.GetImageDetails(img).subscribe((result:any)=>{
              this.images.push({ id:result._id,src: img, alt: file.name, selected: false,themeId:result.ThemeId,
                moment:result.color_moments,histogram:result.histogram,dominant:result.dominant_colors});
              this.ThemeImages.push({ id:result._id,src: img, alt: file.name, selected: false,themeId:result.ThemeId,
                moment:result.color_moments,histogram:result.histogram,dominant:result.dominant_colors});
              this.ImageSrv.SaveImgDetails(Id,result.dominant_colors,result.histogram,result.color_moments).subscribe((result)=>
              {
                console.log(result,"Sv details")
              },(error) => {
                console.log(error,"Err while trying to save details")
              })
            },(error)=>{
              console.log(error,"ERROR WHILE TRYING TO GET IMAGE DETAILS")
            })
          },(error)=>{
            console.log(error,"ERROR")
          })

        };
        reader.readAsDataURL(file);
    }}


  }

  deleteSelectedImages(img:Image): void {
    this.images = this.images.filter(image =>  image.id!=img.id);
    this.ThemeImages = this.ThemeImages.filter(image =>  image.id!=img.id);
    this.ImageSrv.deleteImage(img.id).subscribe();
  }
  toggleImageSelection(image: Image): void {
    image.selected = !image.selected;
  }
  downloadImage(image: Image): void {
    const link = document.createElement('a');
    link.href = image.src; // Set the image URL as the download link
    link.download = 'image.png'; // Set the default download filename (you can customize this if needed)
    link.click(); // Programmatically trigger the download
  }
  editImage(imageSrc: string,image:Image): void {
    console.log(image.themeId,"IN EDIT")
    this.router.navigate(['/custom', { src: imageSrc , ImageId:image.id , alt:image.alt,themeId:image.themeId }]);
  }

  showDetais(image:Image){

  }

  logout(){
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }


  addtheme(){
    this.ThemeSrv.CreateTheme(this.themename,this.user._id).subscribe(
      (response) => {
        // Handle the success response
      },
      (error) => {
        // Handle the error response
        console.error('Error:', error);
      });


    location.reload();

  }

  GetThemePics(id:string){
    this.ThemeImages = this.images.filter(img=> img.themeId == id);
    this.themeId = id;
  }

  reset(){
    this.ThemeImages = this.images;
  }
  displayDescripteurs(image:Image): void{
    this.router.navigate(['/descripteurs', {imageData: JSON.stringify(image)}]);
  }
  search(image:Image): void{
    this.router.navigate(['/similars', {imageData: JSON.stringify(image)}]);
  }
}

