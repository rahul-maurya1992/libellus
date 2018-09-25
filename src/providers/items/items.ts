import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the ItemsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ItemsProvider {
  apiUrl = 'https://libellus.ro/serve/api/v1/';
  constructor(public http: Http, public toastCtrl: ToastController) {
    console.log('Hello ItemsProvider Provider');
  }

  postComplaint(data) {
    if (!data) {
      throw new Error('data parameter missing in postComplaint; complaintsService');
    }
    return this.http.post(this.apiUrl + 'petition', data, { withCredentials: true });
  }

  getComplaint(page, perPage, sort) {
    return this.http.get('https://libellus.ro/serve/api/v1/petition/fetchOwnPetitions?page=' + page + '&perPage=' + perPage + '&sort=createdAt ' + sort, { withCredentials: true});
  }

  /************* Enable/ Disable push notification *****************/
  ToggleNotification() {
    return this.http.get(this.apiUrl + 'user/toggleNotificationForUser', { withCredentials: true });
  }

  /************** Update user profile data **************/
  updateUserProfile(data) {
    console.log(data);
    return this.http.put(this.apiUrl + 'user/editSelf', data, { withCredentials: true });
  }

  /******* update user profile picture ****************/
  updateUserImage(data) {
    return this.http.put(this.apiUrl + 'profile-image', data, { withCredentials: true });
  }

  /*
  function for get alegedinlista 
  Call: alegedinlista.ts
  */
  getUnSubscribedInstitutions(page, perPage) {
    return this.http.get(this.apiUrl + 'subscription/unsubscribedAssociations?page=' + page + '&perPage=' + perPage, { withCredentials: true });
  }
  

  /*
  function to get subscribed institution
  Call: alegedinlista.ts
 */
  subscribeToInstitution(associationId) {
    if (!associationId) {
      throw new Error('id parameter missing in subscribeToInstitution; institutionsService');
    }
    return this.http.get(this.apiUrl + 'subscription/subscribeToInstitution?association=' + associationId, { withCredentials: true });
  }

  /*
  Function to get list of subscribed institution
  Call:abonari-institutii.ts
  */
  getSubscribedInstitutions(page, perPage) {
    console.log('data==========='+page,perPage);

    // return fetch(this.apiUrl + 'subscription/subscribedAssociations?page=' + page + '&perPage=' + perPage, {
    //   method: 'GET',
    //   credentials: 'include',
    // }).then(response => response.json()).catch(function (err) {
    //   console.log(err);
    // });
    return this.http.get(this.apiUrl + 'subscription/subscribedAssociations?page=' + page + '&perPage=' + perPage, { withCredentials: true });
  }

  /*
   Function to unsubscribe the list 
   Call:abonari-institutii.ts
   */
  unsubscribeFromInstitution(associationId) {
    if (!associationId) {
      throw new Error('id parameter missing in subscribeToInstitution');
    }
    return this.http.get(this.apiUrl + 'subscription/unsubscribeToInstitution?association=' + associationId, { withCredentials: true })
  }
  /*
   Function to get all category list
   Call: app.component.ts
   */
  getCategory(){
    return this.http.get(this.apiUrl+'structure?limit=10000',{ withCredentials: true });
  }

/*
Function to Filter the Unsubscribed institutii
Call: app.component.ts
*/
getFilteredInstitutions(structureId){
  console.log('hit it');
  //return this.http.get(this.apiUrl+'association',{params: {structure_id: structureId}});
return this.http.get(this.apiUrl+'association',{params: {structure_id: structureId}});
}

/*
Function to get public petitions
Call:petitii-publice.ts
*/

GetPublicPetitions(page,perPage){
  return this.http.get(this.apiUrl+'official_petition?page='+page+'&perPage='+perPage+'&populate=association,attachments&sort=createdAt DESC&where={}', { withCredentials: true});
}

/*
Function to get petition attachments
Call: peitii-publice.ts
*/

GetAttachments(attachmentIds){
console.log(attachmentIds);
var postdata = {"id":attachmentIds}
return this.http.get(this.apiUrl+'petition_attachment?where={"id":['+attachmentIds+']}');
}

/*
function for post comment
Call: adauga-commentariu.ts
*/
postComment(postdata){
  return this.http.post(this.apiUrl+'comments',postdata, { withCredentials: true});
}

  /* Common toast message function */
  presentToast(msg, duration, position) {
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
