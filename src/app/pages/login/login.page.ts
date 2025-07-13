import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonButton} from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonInput, IonButton, IonInput,FormsModule]
})
export class LoginPage implements OnInit {
  email = ''
  password = ''
  error = ''
  constructor(private auth: AuthService, private router: Router) { }


  async login(){
    try{
      await this.auth.login(this.email,this.password)
      this.router.navigateByUrl('/journals',{replaceUrl:true})
    } catch(err){
      this.error = 'Login failed. Check your credentials'
    }
  }

  gotoRegister(){
    this.router.navigate(['/register'])
  }

  gotoResetPassword(){
    this.router.navigate(['/reset-password'])
  }
  ngOnInit() {
  }

}
