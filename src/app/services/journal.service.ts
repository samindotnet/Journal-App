import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData,query, orderBy ,doc, updateDoc, deleteDoc} from '@angular/fire/firestore';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';

export interface JournalEntry{
  id?: string
  content:string
  createdAt: any
}

@Injectable({
  providedIn: 'root'
})
export class JournalService {


  constructor(private firestore: Firestore, private auth: Auth) { }

  async addEntry(content: string){
    const user = this.auth.currentUser
    if(!user) throw new Error('User not logged in')
    
    const  journalRef = collection(this.firestore, `users/${user.uid}/journals`)
    return addDoc(journalRef, {
      content,
      createdAt: new Date(),
    })
  }

  getEntries(): Observable<JournalEntry[]>{
    return new Observable((observer) => {
      onAuthStateChanged(this.auth, (user) => {
        if(user) {
          const journalRef = collection(this.firestore, `users/${user.uid}/journals`)
          const q = query(journalRef,orderBy('createdAt', 'desc'))
          collectionData(q, {idField:'id'}).subscribe(entries =>{
            observer.next(entries as JournalEntry[])
          })
        } else{
          observer.next([])
        }
      })
    })
  }

  async updateEntry(entryId: string, content: string){
    const user = this.auth.currentUser
    if(!user) throw new Error('User not logged in')
    
    const entryRef = doc(this.firestore, `users/${user.uid}/journals/${entryId}`)
    return updateDoc(entryRef, {
      content,
      updatedAt: new Date()
    })
  }

  async deleteEntry(entryId: string){
    const user = this.auth.currentUser
    if(!user) throw new Error('User not logged in')

    const entryRef = doc(this.firestore, `users/${user.uid}/journals/${entryId}`)
    return deleteDoc(entryRef)
  }
  
}
