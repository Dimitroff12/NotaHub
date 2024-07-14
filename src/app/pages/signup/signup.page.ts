import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  regForm : FormGroup

  constructor(private toastController: ToastController,private loadingController: LoadingController,private authService:AuthServiceService,private router: Router, public formBuilder: FormBuilder) { 

  }

  ngOnInit() {
    // this.signUP()
    this.regForm = this.formBuilder.group({
      fullname:['',
        [Validators.required]
      ],
      contact:['',
      [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(10),
        // Validators.min(10)
      ]
    ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      password: ['', [
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-8])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'),
        Validators.required,
      ],
    ],
    });
  }
  get errorControl() {
    return this.regForm.controls;
  }
  // async signUpWithGoogle(){
  //   const loading = await this.loadingController.create();
  //   // await loading.present();

  //   const user = await this.authService.GoogleAuth().then((re)=>{
  //     console.log(re);
      
  //     // this.router.navigate(['/home'])
  //   })
  // }
 
  async signUP(){
    const loading = await this.loadingController.create();
    await loading.present();
    if (this.regForm.valid) {

      const user = await this.authService.registerUser(this.regForm.value.email, this.regForm.value.password,this.regForm.value.fullname).catch((err) => {
        this.presentToast(err)
        console.log(err);
        loading.dismiss();
      })

      if (user) {
        loading.dismiss();
        this.router.navigate(['/home'])
      }
    } else {
      return console.log('Please provide all the required values!');
    }
  }
  
  async presentToast(message: undefined) {
    console.log(message);
    
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'top',
    });

    await toast.present();
  }
}
