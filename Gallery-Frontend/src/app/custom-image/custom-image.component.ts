import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ImageCroppedEvent, ImageTransform} from 'ngx-image-cropper';
import {NgxImageCompressService} from 'ngx-image-compress';
import {ImagesService} from '../Services/image.service';
import {SignInService} from "../Services/signin.service";
import {FlaskService} from '../Services/flask.service'


@Component({
  selector: 'app-custom-image',
  templateUrl: './custom-image.component.html',
  styleUrls: ['./custom-image.component.css']
})
export class CustomImageComponent implements OnInit {

  rotation = 0;
  imageUrl: string = '';
  galleryImageUrl: string = '';
  imgChangeEvt: any ='';
  cropImgPreview: any ='';
  inCropMode: boolean = false;
  myThumbnail=this.imageUrl;
  inZoomMode: boolean = false;
  inDomMode:boolean = false;
  inHistogramMode:boolean = false;
  inMomentMode: boolean = false;
  HistogramSrc:string="";
  DominantSrc:string="";
  MomentSrc: string="";
  imgResultBeforeCompression: string = this.imageUrl;
  imgResultAfterCompression: string = '';
  inCompressMode: boolean = false;
  img:string="";
  canvasRotation = 0;
  ratio: number=50;
  quality: number = 50;
  transform: ImageTransform = {};
  scale=1;

  a_mean :string="";
  b_mean :string="";
  l_mean :string="";
  a_std :string="";
  b_std :string="";
  l_std :string="";
  a_skew :string="";
  b_skew :string="";
  l_skew :string="";
  a_kurtosis :string="";
  b_kurtosis :string="";
  l_kurtosis :string="";
  Momentsrc: string[] =[];



  User :any = null;
  EditedImage:any=null;

  constructor(private flaskSrv:FlaskService, private route: ActivatedRoute,private SingInSrv:SignInService,private imageCompress: NgxImageCompressService,private ImageSrv:ImagesService)  { }

  ngOnInit(): void {
    this.User = this.SingInSrv.getUserData();
    this.route.params.subscribe(params => {
      this.imageUrl = params['src'];
      this.EditedImage = {id:params['ImageId'], alt:params['alt'],themeId:params['themeId']}
      console.log(this.EditedImage,"EDITED");
      this.galleryImageUrl = this.imageUrl;
    });
  }

  onFileChange(event: any): void {
    this.imgChangeEvt = event;
  }
  cropImg(e: ImageCroppedEvent) {
    this.cropImgPreview = e.base64;
  }

  rotateLeft() {
    this.canvasRotation--;
    this.flipAfterRotate();
  }

  rotateRight() {
    this.canvasRotation++;
    this.flipAfterRotate();
  }

  private flipAfterRotate() {
    const flippedH = this.transform.flipH;
    const flippedV = this.transform.flipV;
    this.transform = {
      ...this.transform,
      flipH: flippedV,
      flipV: flippedH,
    };
  }

  flipHorizontal() {
    this.transform = {
      ...this.transform,
      flipH: !this.transform.flipH,
    };
  }

  flipVertical() {
    this.transform = {
      ...this.transform,
      flipV: !this.transform.flipV,
    };
  }

  resetImage() {
    this.scale = 1;
    this.rotation = 0;
    this.canvasRotation = 0;
    this.transform = {};
  }

  updateRotation() {
    this.transform = {
      ...this.transform,
      rotate: this.rotation,
    };
  }
    imgLoad (){}

    initCropper() {}

    imgFailed () {}
    toggleCropMode() {
      this.inCropMode = true;
        this.inZoomMode = false;
        this.inCompressMode = false;
      this.inDomMode = false;
      this.inHistogramMode = false;
      this.inMomentMode = false;
    }

    toggleZoomMode() {
      this.inZoomMode = true;
        this.inCropMode = false;
        this.inCompressMode = false;
      this.inDomMode = false;
      this.inHistogramMode = false;
      this.inMomentMode = false;
    }
    compressFile() {

          this.imageCompress
              .compressFile(this.imageUrl, 1, this.ratio, this.quality) // 50% ratio, 50% quality
              .then(compressedImage => {
                  this.imgResultAfterCompression = compressedImage;
                  console.log('Size in bytes after compression is now:', this.imageCompress.byteCount(compressedImage));
              });
  }

  toggleCompressMode(){
    this.inCompressMode = true;
    this.inZoomMode = false;
    this.inCropMode = false;
    this.inDomMode = false;
    this.inHistogramMode = false;
    this.inMomentMode = false;
  }
  toggleDomMode(){
    this.inCompressMode = false;
    this.inZoomMode = false;
    this.inCropMode = false;
    this.inDomMode = true;
    this.inHistogramMode = false;
    this.inMomentMode = false;
    this.flaskSrv.GetDominant(this.imageUrl).subscribe((res:any)=>{
      this.DominantSrc = res.data;
    })

  }
  toggleHistogramMode(){
    this.inCompressMode = false;
    this.inZoomMode = false;
    this.inCropMode = false;
    this.inDomMode = false;
    this.inMomentMode = false;
    this.inHistogramMode = true;
    this.flaskSrv.GetHisto(this.imageUrl).subscribe((res:any)=>{
      this.HistogramSrc = res.data;
    })

  }

  toggleMomentMode(){

    this.inCompressMode = false;
    this.inZoomMode = false;
    this.inCropMode = false;
    this.inDomMode = false;
    this.inHistogramMode = false;
    this.inMomentMode = true;
  }
  saveChanges(src:string,func:string){
    this.ImageSrv.SaveImage(this.EditedImage.themeId,this.User._id,this.EditedImage.alt +" "+func+"PerfectImage",src).subscribe((result :any) => {
      console.log(result._id,"SUCCESSES")
      this.ImageSrv.editImage(this.EditedImage.id,result._id).subscribe((res)=>{
        console.log(res,"SUCCESSES EDITING ----------------------")
      })

    },(error)=>{
      console.log(error,"ERROR")
    })
  }

  }
  function saveChanges(src: any, string: any, func: any, string1: any): ((error: any) => void) | null | undefined {
    throw new Error('Function not implemented.');
  }