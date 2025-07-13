import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonButton } from '@ionic/angular/standalone';
import { Auth, sendPasswordResetEmail } from '@angular/fire/auth';
import { Router } from '@angular/router';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
  standalone: true,
  imports: [IonButton, IonInput, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ResetPasswordPage implements OnInit {
  email =''
  message =''
  error=''
  constructor(private auth: Auth, private router: Router) { }

  async reset(){
    try{
      await sendPasswordResetEmail(this.auth,this.email)
      this.message='Check your email for reset instructions'
      this.error = ''
    } catch(err){
      this.message=''
      this.error='Failed to send reset email'
    }
  }

  goToLogin(){
    this.router.navigate(['/login'])
  }


  ngOnInit() {
  }

}
