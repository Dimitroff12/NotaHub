import { Component, OnInit,ViewChild } from '@angular/core';
import { IonModal, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Journal, JournalServiceService } from 'src/app/services/journal-service.service';
import { JournalPage } from '../journal/journal.page';

@Component({
  selector: 'app-journals',
  templateUrl: './journals.page.html',
  styleUrls: ['./journals.page.scss'],
})
export class JournalsPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;

  title:string
  note:string
  userId:any

  selectedJournal:Journal={
  userId: '',
  title: '',
  content: '',
  createdAt: undefined,
}
  journals:Journal[] = []
  constructor(private modalCtrl: ModalController,private toastCtrl: ToastController,private loadingController: LoadingController,private journalServive:JournalServiceService,private authService:AuthServiceService) {
   }


  addJournal(){
       
      this.journalServive.addJournal(
        {userId:"", title:this.title,content:this.note,createdAt:new Date()}
      )?.then(async ()=>{
        this.title =''
        this.note = ''
        const toast = await this.toastCtrl.create({
          message: "Jounal added successful",
          duration:2000
        })
        toast.present()
      }).catch(async (error)=>{
        const toast = await this.toastCtrl.create({
          message: error,
          duration:2000
        })
        toast.present()
        
      })
    
  }
 
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }
  
  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      console.log(ev.detail.data);
    }
  }

  confirm() {
    this.modal.dismiss('confirm');
    this.addJournal()
  }

  ngOnInit() {
    this.authService.getProfile().then(user => {
      this.userId = user?.uid;
      console.log(user?.uid);
      this.journalServive.getJournals(this.userId).subscribe(res =>{
        this.journals = res
        console.log(this.journals);
        
    })
    }).catch(error => {
      console.error('Error getting user profile:', error);
    });
  }

  async openJournal(journal:Journal){
    const modal = await this.modalCtrl.create({
      component:JournalPage,
      componentProps:{id:journal.id},
      breakpoints: [0, 0.5, 0.8],
      initialBreakpoint: 0.6
    })

    await modal.present()
  }

}
