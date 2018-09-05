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
    return this.http.get('https://libellus.ro/serve/api/v1/petition/fetchOwnPetitions?page=' + page + '&perPage=' + perPage + '&sort=createdAt ' + sort, { withCredentials: true });
  }

  /************* Enable/ Disable push notification *****************/
  ToggleNotification() {
    return this.http.get(this.apiUrl + 'user/toggleNotificationForUser', { withCredentials: true });
  }

  /************** Update user profile data **************/
  updateUserProfile(data) {
    console.log(data);
    if (!data.id) {
      throw new Error('id parameter missing in subscribeToInstitution; institutionsService');
    }
    return this.http.put(this.apiUrl + 'user/' + data.id, data, { withCredentials: true });
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
  subscribeToInstitution(associationId, page, perPage) {
    if (!associationId) {
      throw new Error('id parameter missing in subscribeToInstitution; institutionsService');
    }
    return this.http.get(this.apiUrl + 'subscription/subscribeToInstitution?page=' + page + '&perPage=' + perPage + '&association=' + associationId, { withCredentials: true });
  }

  /*
  Function to get list of subscribed institution
  Call:abonari-institutii.ts
  */
  getSubscribedInstitutions(page, perPage) {
    return this.http.get(this.apiUrl + 'subscription/subscribedAssociations?page=' + page + '&perPage=' + perPage, { withCredentials: true });
  }

  /*
   Function to unsubscribe the list 
   Call:abonari-institutii.ts
   */
  unsubscribeFromInstitution(institutionId, page, perPage) {
    if (!institutionId) {
      throw new Error('id parameter missing in subscribeToInstitution');
    }
    return this.http.get(this.apiUrl + 'subscription/unsubscribeToInstitution?page=' + page + '&perPage=' + perPage, { withCredentials: true })
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
