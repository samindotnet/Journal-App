import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, IonCard, IonCardContent,IonCardHeader,IonCardSubtitle,IonButton,IonButtons,IonIcon, IonItem, IonLabel, IonToolbar, IonTitle, IonHeader, IonContent} from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { JournalService, JournalEntry } from 'src/app/services/journal.service';
import { Observable, of } from 'rxjs';
import {ToastController} from '@ionic/angular'
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-journals',
  templateUrl: './journals.page.html',
  styleUrls: ['./journals.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule

  ]
})
export class JournalsPage implements OnInit {
  entries$: Observable<JournalEntry[]> = of([])
  constructor(
    private auth: AuthService, 
    private router: Router, 
    private journal: JournalService,
    private toastCtrl: ToastController
  ) { }

  logout(){
    this.auth.logout().then(() =>
    this.router.navigateByUrl('/login'))
  }

  gotoAdd(){
    this.router.navigate(['/add-journal'])
  }

  ngOnInit() {
    this.entries$ = this.journal.getEntries()
  }

  async delete(entryId: string){
    try{
      await this.journal.deleteEntry(entryId)
      this.showToast('Entry deleted')
    } catch{
      this.showToast('Failed to delete entry', 'danger')
    }
  }

  async edit(entry: JournalEntry){
    const newContent = prompt('Edit your journal:', entry.content)
    if(newContent !== null && newContent.trim() !== ''){
      try{
        await this.journal.updateEntry(entry.id!, newContent)
        this.showToast('Entry updated')
      }
      catch{
        this.showToast('Failed to update entry','danger')
      }
    }
  }

  async showToast(message: string, color: string='success'){
    const toast = await this.toastCtrl.create({
      message,
      duration:2000,
      color,
    })
    toast.present()
  }
}
