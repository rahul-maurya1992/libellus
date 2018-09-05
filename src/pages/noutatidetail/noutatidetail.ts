import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NoutatiPage } from '../noutati/noutati';

/**
 * Generated class for the NoutatidetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-noutatidetail',
  templateUrl: 'noutatidetail.html',
})
export class NoutatidetailPage {
  notifydetail: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(this.navParams.get('data'));
    this.notifydetail = this.navParams.get('data');
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad NoutatidetailPage');

  }
  
close(){
  this.navCtrl.setRoot(NoutatiPage);
}
}
