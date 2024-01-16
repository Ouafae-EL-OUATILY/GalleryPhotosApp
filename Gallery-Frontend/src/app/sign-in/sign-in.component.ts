import { Component } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
import {SignInService} from '../Services/signin.service';
import {ThemeService} from '../Services/theme.service'



@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']

})
export class SignInComponent {

  message : string = ""
  mess:string=""
  constructor(private router: Router , private route : ActivatedRoute , private signIn:SignInService,private ThemeSrv:ThemeService) { }
  ngOnInit(): void {



    this.route.params.subscribe(params => {
      this.mess = params['message'] || "" ;
    });
  }

  email: string = '';
  password: string = '';

  onSignIn() {
    this.signIn.getUser(this.email,this.password).subscribe((user:any) => {
      if (user){
        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['/main']);
      }else{
        this.message="either ur password or email is not correct,try again";
        this.mess=''
        this.password=""
      }
    });

  }
}
