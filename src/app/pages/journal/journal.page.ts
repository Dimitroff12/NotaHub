import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Journal, JournalServiceService } from 'src/app/services/journal-service.service';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.page.html',
  styleUrls: ['./journal.page.scss'],
})
export class JournalPage implements OnInit {
  @Input() id: string;
  journal : Journal 


  constructor(private journalService:JournalServiceService,private toastCtrl: ToastController,private modalCtrl: ModalController,) { }

  ngOnInit() {
    console.log(this.id);
    
    this.journalService.getJournalById(this.id).subscribe(res =>{
      this.journal = res
    })
  }

  async updateJournal(){
    this.journalService.updateJournal(this.journal)
    const toast = await this.toastCtrl.create({
      message: "Jounal Updated",
      duration:2000
    })
    toast.present()
    this.modalCtrl.dismiss()
  }

  async deleteJounal(){
   await this.journalService.removeJournal(this.id)
    this.modalCtrl.dismiss()
  }
  

}
