import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonText, IonTextarea, IonButton } from '@ionic/angular/standalone';
import { JournalService } from 'src/app/services/journal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-journal',
  templateUrl: './add-journal.page.html',
  styleUrls: ['./add-journal.page.scss'],
  standalone: true,
  imports: [IonTextarea, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton]
})
export class AddJournalPage implements OnInit {
  content = ''
  error = ''
  constructor(private journal: JournalService, private router: Router) { }

  async save(){
    if(!this.content.trim()) return
    try{
      await this.journal.addEntry(this.content)
      this.router.navigateByUrl('/journals')
    } catch(err){
      this.error = 'Could not save entry'
    }
  }
  cancel(){
    this.router.navigate(['/journals'])
  }

  ngOnInit() {
  }

}
