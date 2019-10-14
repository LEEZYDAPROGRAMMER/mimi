import { MimiService } from '../mimi.service';
import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import {FormControl,FormGroup} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email
 password
passForm
  constructor(public user:MimiService, public alertController: AlertController ,public toastController: ToastController,public route: Router,formBuilder : FormBuilder) 
  { 
    this.passForm=formBuilder.group(
    {
          
          email: ['',Validators.required],
          password: ['',Validators.required]
         
     });
    }
 
  


  async resetPassword() {
    const alert = await this.alertController.create({
      header: 'Email',
      inputs: 
      [
        {
          name: 'email',
          type: 'email',
          placeholder: 'enter your email'
        }
  
      ],
      buttons: 
      [
        {
          
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Send',
          handler: (email) => {
            this.user.resetPassword(email.email)
            console.log(email);
          }
        
        }
      ]

    });
    await alert.present();
  }

  login()
  {
    this.email = this.passForm.get('email').value
    this.password = this.passForm.get('password').value

    console.log(this.email,this.password,"logIn")
   this.user.login(this.email,this.password).then((result)=>{
           
    if(result.operationType=="signIn")
    {
         
    this.route.navigate(['/home'])
       this.presentToast()
        
    }
    else
    {

          this.presentAlert(result)

    }
      })

 
   
   this.email=null;
   this.password=null;
  }
  logout()
  {

    this.user.logout()
  }

  ngOnInit() 
  {

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
    message: 'You have successfully logged in',
    duration: 2000,
    color: "primary"
  });
  toast.present();
}

}



