import { NgModule } from '@angular/core';
import { BrowserModule, HAMMER_GESTURE_CONFIG, HammerModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { StyleClassModule } from 'primeng/styleclass';
import { HomeComponent } from './home/home.component';
import { MainPageComponent } from './main-page/main-page.component';
import { GalleriaModule } from 'primeng/galleria';
import { FileUploadModule } from 'primeng/fileupload';
import { SidebarModule } from 'primeng/sidebar';
import { ImageModule } from 'primeng/image';
import { CustomImageComponent } from './custom-image/custom-image.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { LyHammerGestureConfig, LY_THEME, LY_THEME_NAME, StyleRenderer, LyTheme2 } from '@alyle/ui';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MinimaLight } from '@alyle/ui/themes/minima';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import {NgxImageCompressService} from 'ngx-image-compress';
import {MatSliderModule} from '@angular/material/slider';
import {HttpClientModule} from "@angular/common/http";
import { DescripteursComponent } from './descripteurs/descripteurs.component';
import { CardModule } from 'primeng/card';
import { SimilarsComponent } from './similars/similars.component';
import { KnobModule } from 'primeng/knob';
import { SliderModule } from 'primeng/slider';
@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    HomeComponent,
    MainPageComponent,
    CustomImageComponent,
    DescripteursComponent,
    SimilarsComponent,
  ],
  imports: [
    MatSliderModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    StyleClassModule,
    GalleriaModule,
    FileUploadModule,
    SidebarModule,
    ImageModule,
    ImageCropperModule,
    BrowserAnimationsModule,
    HammerModule,
    NgxImageZoomModule,
    HttpClientModule,
    CardModule,
    KnobModule,
    SliderModule,
  ],
  providers: [
    { provide: HAMMER_GESTURE_CONFIG, useClass: LyHammerGestureConfig },
    StyleRenderer,
    LyTheme2,
    { provide: LY_THEME_NAME, useValue: 'minima-light' },
    { provide: LY_THEME, useClass: MinimaLight, multi: true },
    NgxImageCompressService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
