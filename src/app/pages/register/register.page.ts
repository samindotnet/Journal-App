import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonInput } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonInput]
})
export class RegisterPage implements OnInit {
  email=''
  password=''
  error=''
  constructor(private auth: AuthService, private router:Router) { }

  async register(){
    try{
      await this.auth.register(this.email, this.password)
      this.router.navigateByUrl('/journals', {replaceUrl:true})
    } catch(err){
      this.error = 'Registration failed. Try again'
    }
  }

  gotoLogin(){
    this.router.navigate(['/login'])
  }
  ngOnInit() {
  }

}
