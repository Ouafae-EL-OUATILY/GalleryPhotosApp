import { Component } from '@angular/core';
import  { Router } from '@angular/router';
import {SignupService} from '../Services/signup.service';
import {ThemeService} from '../Services/theme.service'




interface User {
  _id:string
  Name:string
  email: string;
  password:string
  // Define other properties here
}






@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent {
  Name : string = '';
  mess :string=''
  email: string = '';
  password: string = '';
  constructor(private router: Router,private signup:SignupService,private ThemeSrv:ThemeService) { }

  onSignUp() {
    // Implement your sign-up logic here
    this.signup.CreateUser<User>(this.Name,this.email,this.password).subscribe((user:User) => {

        this.router.navigate(['/signin' , { message: "ur account was created successfully try to log in" }]);
        this.ThemeSrv.CreateTheme("Default",user._id).subscribe()




  },()=>{
      this.mess="This email already used try another one"
      this.password=""
      this.Name=""
      this.email=""
    })
}
}
