import { Component } from '@angular/core';
import { MimiService } from '../mimi.service';
import { LoadingController } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  addName 
  addTime 
  toDo
  editName 
  editTime

  Info;
  
  constructor(public mi: MimiService,public loadingController: LoadingController) 
  {
    this.toDo=[]

   this.getdata()
   console.log(moment(this.addTime).format());
  }
  getdata()
  {
    return new Promise((resolve, reject) => {
      this.mi.rtTodo().then(data =>{
     
        console.log( data.length);
        for( let x = 0; x < data.length; x++ )
        {
         console.log(x);
         
        this.toDo.push({ 
          todoKey:  data[x].todoKey,
          name:  data[x].name,
          time:  data[x].time,
          userID:  data[x].userID})
    
        }
      console.log(this.toDo,"LAST ONE")

     })
    })
  
  }
  ngOnInit() 
  {
  // this.presentLoading();
  }
  addTodo(addName,addTime)
  {
    this.toDo=[]
    
     this.mi.addTodo(addName,addTime);
  
     this.presentLoading();
   this.addName=null
   this.addTime=null
  }

  deleteTodo(todos)
 {
  this.toDo=[]

  this.mi.deleteTodo(todos)
  this.presentLoading();
  
 }
 updateTodo(todos,editName,editTime)
 {
  this.toDo=[]
  this.mi.updateTodo(todos,editName,editTime)
 
  this.presentLoading();
  this.editName=null
  this.editTime=null
 }

 async presentLoading() {
  const loading = await this.loadingController.create({
    message: 'loading...',
    duration: 4000
  });
  await loading.present();
  this.getdata()
  loading.dismiss()
}
  
}
