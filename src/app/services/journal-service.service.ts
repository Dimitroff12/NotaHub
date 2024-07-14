import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Firestore, addDoc, collection, collectionData, doc, docData, query, updateDoc, where } from '@angular/fire/firestore';

import { AuthServiceService } from '../auth-service.service';

import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { deleteDoc } from 'firebase/firestore';
// import 'firebase/compat/firestore';
// import firebase from "firebase/compat/app";


export class Journal{
  id? : string;
  userId:string;
  title: string;
  content:string;
  createdAt:any

  constructor(userId: string, title: string, content: string, createdAt: any) {
    this.userId = userId;
    this.title = title;
    this.content = content;
    this.createdAt = createdAt;
  }
  
}

@Injectable({
  providedIn: 'root'
})
export class JournalServiceService {

  private journalCollection:any
  private userId:any 

  constructor(private firestore:Firestore,private authService:AuthServiceService) {
    this.authService.getProfile().then(user => {

      this.userId = user?.uid;
      console.log(user?.uid);
      // this.journalCollection = co;;

    }).catch(error => {
      console.error('Error getting user profile:', error);
    });
  }


   addJournal(journal:Journal){
    journal.userId = this.userId;
    console.log(journal);
    
    const jouralRef = collection(this.firestore, 'notes');
    
    return addDoc(jouralRef,journal)
  }

  getJournals(userId:any): Observable<Journal[]> {
    
    const jouralRef = collection(this.firestore, 'notes')
    
    const  refq =  query(jouralRef,where('userId','==',userId))
    return collectionData(refq,{ idField: 'id'}) as Observable<Journal[]>
  }

   getUser(){
     this.authService.getProfile().then(user =>{
      this.userId = user?.uid
      console.log(this.userId);
    })

   return this.userId
  }


  getJournalById(id:any) : Observable<Journal>{
      const journalRef = doc(this.firestore,`notes/${id}`)
      return docData(journalRef,{ idField: 'id'}) as Observable<Journal>
  }
  
  removeJournal(id:any){
    const journalRef = doc(this.firestore, `notes/${id}`)
    return deleteDoc(journalRef)
  }

  updateJournal(journal:Journal){
    const journalRef = doc(this.firestore,`notes/${journal.id}`)
    return updateDoc(journalRef,{title:journal.title,content:journal.content})
  }


}
