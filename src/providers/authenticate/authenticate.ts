import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { ToastController } from 'ionic-angular';
/*
  Generated class for the AuthenticateProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthenticateProvider {

  apiUrl = 'https://libellus.ro/serve/api/v1/';

  accountObject: {};
  constructor(public http: Http,public toastCtrl:ToastController) {
    console.log('Hello AuthenticateProvider Provider');
  }
  
  /*
    Login with email and password
    Call:authenticate.ts
  */
 
  login(email, password) {
    let data = new FormData();
    data.append("email", email);
    data.append("password", password);
    console.log(data);
    // return false;
    return fetch(this.apiUrl + 'auth/login?type=local', {
      method: 'POST',
      body: data,
      credentials: 'include',
    }).then(response => response.json()).catch(function (err) {
      console.log(err);
    });
  }

  /*
   Registration with email and password
   Call:creeaza.ts
   */
  Registration(formdata){
    console.log(formdata);
    this.accountObject = {
      name:formdata.name,
      last_name:formdata.last_name,
      username:formdata.username,
      email:formdata.email,
      phone_number:formdata.phone_number,
      password:formdata.password,
      password_confirmation:formdata.password_confirmation,
      isUsrMember:formdata.isUsrMember,
      acceptTermsAndConditions:formdata.acceptTermsAndConditions
    }
    return this.http.post(this.apiUrl + 'auth/register?type=local',formdata)
  }

  /*
  Recovery password by email
  Call: forgotpassword.ts
  */
 recoveryPassword(recoveryEmail){
  return this.http.post(this.apiUrl + 'auth/reset',recoveryEmail);
 }

 /*
 Recovery password by code 
 Call:resetpassbycode.ts
 */

Resetpassbycode(resetObject){
  return this.http.post(this.apiUrl + 'resetPassword',resetObject);
}

/*
Contact us page
Call: contacteaza-ne.ts
*/

sendContactMessage(messageObject){
  return this.http.post(this.apiUrl+'contact',messageObject);
}

 /* Common toast message function */
 presentToast(msg,duration,position) {
  let toast = this.toastCtrl.create({
    message: msg,
    duration: duration,
    position: position
  });
  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
}
}
