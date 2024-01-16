import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { MainPageComponent } from './main-page/main-page.component';
import { CustomImageComponent } from './custom-image/custom-image.component';
import { DescripteursComponent } from './descripteurs/descripteurs.component';
import { SimilarsComponent } from './similars/similars.component';
const routes: Routes = [
  { path: 'signup', component: SignUpComponent },
  { path: 'signin', component: SignInComponent },
  { path: '', component: HomeComponent },
  { path: 'main', component: MainPageComponent },
  { path: 'custom', component: CustomImageComponent },
  { path: 'descripteurs', component: DescripteursComponent},
  { path:'similars', component: SimilarsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
