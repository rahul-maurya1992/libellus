import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SesizarilePage } from '../sesizarile/sesizarile';

/**
 * Generated class for the SesizarileDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sesizarile-detail',
  templateUrl: 'sesizarile-detail.html',
})
export class SesizarileDetailPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SesizarileDetailPage');
  }
  close(){
    this.navCtrl.setRoot(SesizarilePage);
  }
}
