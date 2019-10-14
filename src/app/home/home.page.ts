import { Component } from '@angular/core';
import { MimiService } from '../mimi.service';

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
  
  constructor(public mi: MimiService) 
  {
     this.toDo=this.mi.rtTodo();
  }
  ngOnInit() 
  {

  }
  addTodo(addName,addTime)
  {
     this.mi.addTodo(addName,addTime);
   this.addName=null
   this.addTime=null
  }
  deleteTodo(todos)
 {
     
  this.mi.deleteTodo(todos)
 }
 updateTodo(todos,editName,editTime)
 {
     
  this.mi.updateTodo(todos,editName,editTime)
  this.editName=null
  this.editTime=null
 }
  
}
