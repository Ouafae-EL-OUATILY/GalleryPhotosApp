import { Component } from '@angular/core';
import {SignInService} from '../Services/signin.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private signIn : SignInService,private router: Router ) {
  }
  ngOnInit(){
    if(this.signIn.getUserData()){
      this.router.navigate(['/main']);
    }

  }

}
