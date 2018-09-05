import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NoutatiPage } from '../noutati/noutati';
import { TrimiteSesizarePage } from '../trimite-sesizare/trimite-sesizare';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';
import { CookieService } from 'ngx-cookie-service';
import { PetitiiPublicePage } from '../petitii-publice/petitii-publice';


/**
 * Generated class for the SesizarePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sesizare',
  templateUrl: 'sesizare.html',
})
export class SesizarePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public authenticatePro: AuthenticateProvider,public cookie:CookieService) {

  }

  ionViewDidLoad() {
    
    console.log('ionViewDidLoad SesizarePage');
  }

  noutati(){
    this.navCtrl.setRoot(NoutatiPage);
  }
  Trimiti(){
    if(localStorage.getItem('currentUser')){
      this.navCtrl.setRoot(TrimiteSesizarePage);
    }else{
      this.authenticatePro.presentToast('trebuie sa fiti logat pentru a vizita aceasta pagina!',4500,'bottom');
    }
  }
  patitions(){
    if(localStorage.getItem('currentUser')){
      this.navCtrl.setRoot(PetitiiPublicePage);
    }else{
      this.authenticatePro.presentToast('trebuie sa fiti logat pentru a vizita aceasta pagina!',4500,'bottom');
    }
    
  }

}
