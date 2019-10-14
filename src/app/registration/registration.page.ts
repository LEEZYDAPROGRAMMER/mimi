import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {FormControl,FormGroup} from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { MimiService } from '../mimi.service';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  name
  email
  password
 
  
passForm
  
patterns="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@!%*?&]).{8,}"
  
 
  constructor(public user:MimiService,public alertController: AlertController,public toastController: ToastController,public route: Router,formBuilder : FormBuilder) 
   {
    this.passForm=formBuilder.group(
      {
            
            email: ['',Validators.email],
            password: ['',Validators.pattern(this.patterns)],
           name: ['', Validators.pattern('[a-zA-Z]*')]
       });
  
   }
   signup()
   {
    this.name = this.passForm.get('name').value
    this.email = this.passForm.get('email').value
    this.password = this.passForm.get('password').value

       console.log(this.name,this.email, this.password,"registerdetails")
      this.user.signup(this.name,this.email,this.password).then((user)=>{
     
  if(user.operationType=="signIn")
    {
         
      this.route.navigate(['/login'])   
   this.presentToast()
        
    }
    else
    {

          this.presentAlert(user)

    }
      })
     //
    
  
    
   
  

      this.name=null;
      this.email=null;
      this.password=null;

    }

  ngOnInit() {
  }
  
  //user error
  async presentAlert(data) {
    const alert = await this.alertController.create({
      header: 'Bad Credentials',
      subHeader: 'Error',
      message:  data,
      buttons: ['OK']
    });

    await alert.present();
  }
  
  //user registered msg
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'You have successfully registered',
      duration: 2000,
      color: "primary"
    });
    toast.present();
  }

 
}
