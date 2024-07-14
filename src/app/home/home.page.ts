import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  email :any
  nome  :any

  constructor(private authService:AuthServiceService,private router: Router) {

  }
  ngOnInit(): void {

    this.authService.getProfile().then(user => {
      this.email = user?.email;
      console.log(user?.email);
    }).catch(error => {
      console.error('Error getting user profile:', error);
    });
    
    
  }

  


 signOut(){
  this.authService.signOut().then(() =>{
    this.router.navigate(['/landing'])
  })
 }
}
