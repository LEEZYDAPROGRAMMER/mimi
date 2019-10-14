import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

import 'firebase/firestore';
@Injectable({
  providedIn: 'root'
})
export class MimiService {
  database = firebase.database();
  userID
  userEmail
  todoTemp=[]
  data:string=""
  user
  currentSession
  categoriesLoop =[]
  currentUser
  currentSessionId
  userProfile = []
  currentState : boolean  
  todos=[]
  //
  
  
  newToDoName : string="";
  newToDoTime : string="";
   
  editedName :string="";
  editedTime :string="";
  //
   constructor() { }
 
 dbfire=firebase.firestore();
   rtE()
   {
 
    return this.data
   }
   login(email,password)
   {
    console.log(email,password,"signin details serv")
   return  firebase.auth().signInWithEmailAndPassword(email,password).then((result)=>{
    this.setCurrentSession(firebase.auth())
       console.log("user is logged in")
       return result
     }).catch((error)=> {
       // Handle Errors here.
       var errorCode = error.code;
       var errorMessage = error.message;
       // ...
       console.log(errorMessage)
       
       return errorMessage
     });
 
   }
   signup(name,email,password)
   {
    
    console.log(name,email,password,"signup details serv")
   return  firebase.auth().createUserWithEmailAndPassword(email,password).then((user)=>{
    this.setCurrentSession(firebase.auth())
       console.log("user is registered");
        this.userID=user['user'].uid;
        this.userEmail=user['user'].email;
       
        firebase.database().ref('users/' + this.userID).set({
         username: name,
         email: email,
         password : password
 
       });
      return user
     }).catch((error)=> {
       // Handle Errors here.
       var errorCode = error.code;
       var errorMessage = error.message;
      return errorMessage
       // ...
       console.log(errorMessage)
       this.data=errorMessage
       console.log(this.data)
      
     });
    
   }
 
   resetPassword(email)
   {
     
     firebase.auth().sendPasswordResetEmail(email).catch((error)=> {
       // Handle Errors here.
       var errorCode = error.code;
       var errorMessage = error.message;
 
       console.log(errorMessage)
       // ...
      
     }).then((result)=>{
       
       console.log("password reset is sent");
     });
 
   }
 
   
   logout()
   {
     firebase.auth().signOut().catch((error)=> {
       // Handle Errors here.
       var errorCode = error.code;
       var errorMessage = error.message;
 
       console.log(errorMessage)
       // ...
      
     }).then((result)=>{
       
       console.log("user is logged out");
     });
 
   }

 ///////add todo
addTodo(newToDoName,newToDoTime)
{
 let userID=this.readCurrentSession()
 console.log(newToDoName,newToDoTime)
     this.dbfire.collection("todos").add({
       name: newToDoName,
       time: newToDoTime,
      userID:  userID.uid
     }).then((data)=>{
 
       console.log(data)
     }).catch((error)=>{

     })
   
    

}
 ///////update todo
updateTodo(todos,editName,editTime)
{
//name
  this.dbfire.collection("todos").doc(todos.todoKey).update('name',editName).then((data)=> {

    console.log("Document name successfully updated!",data);
}).catch(function(error) {
    console.error("Error updating document: ", error);
});
//time
this.dbfire.collection("todos").doc(todos.todoKey).update('time',editTime).then((data)=> {

  console.log("Document time successfully updated!",data);
}).catch(function(error) {
  console.error("Error updating document: ", error);
});

}
rtTodo()
{
  this.getTodos()
 console.log(this.todos,"hh")
  return this.todos
}
 ///////get todos
 getTodos()
 {
 
   let ans=[]
   let ans2=[]
   let user=this.readCurrentSession()
   let userID=user.uid

  this.dbfire.collection("todos").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
     
     // ans.push(doc.data())
      console.log(doc.id, '=>', doc.data());
      this.todoTemp.push({
        todoKey: doc.id,
        name: doc.data().name,
        time: doc.data().time,
        userID: doc.data().userID
      })
        console.log(this.todoTemp,"todo array")
        console.log(name,"todo array")
    
        console.log(this.todoTemp.length,"todo array SIZE")
    //  this.todoTemp.push()
      
    });
    console.log(this.todoTemp.length,"todo array SIZE")
    for(let x=0;x<this.todoTemp.length;x++)
    {
     console.log(this.todoTemp[x].userID,"userid at x")
 
         if(this.todoTemp[x].userID===userID)
         {
             this.todos.push(this.todoTemp[x])
 
         }
 
    }
});
console.log(this.todoTemp,"todo array")



console.log(ans,"ans array")
  

 }
 ///////delete todo
 deleteTodo(todos)
 {
  this.dbfire.collection("todos").doc(todos.todoKey).delete().then((data)=> {
    console.log("Document successfully deleted!",data);
}).catch(function(error) {
    console.error("Error removing document: ", error);
});
   
 }
  ///set user session start
 setCurrentSession(user){
  console.log("running");
  var uid
  if (user !== null){
    uid = user.currentUser.uid;
    this.user = user.currentUser
    console.log(uid);
    
    var userRoot = firebase.database().ref("Users").child(uid)
    userRoot.once("value", snap => {
      //console.log(userRoot);
      let values = snap.val()
        console.log(values["name"]);
        console.log(values["email"]);
        this.userProfile.push({
        key: snap.key,
        displayName : values["name"],
        email : values["email"],

        })
    })  
  }
   this.currentSessionId = uid
   console.log(uid);
   console.log(user);
   console.log(this.user);  
}
   ///set user session end
   destroyUserData(){
    this.userProfile.pop()
    console.log(this.userProfile);
    
  }
  readCurrentSession(){
    console.log(this.user);
    return this.user
  }

  returnUserProfile(){
    console.log(this.userProfile);
    return this.userProfile
  }



 }
