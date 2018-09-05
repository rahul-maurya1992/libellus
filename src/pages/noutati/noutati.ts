import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NoutatidetailPage } from '../noutatidetail/noutatidetail';
import { NewsProvider } from '../../providers/news/news';

/**
 * Generated class for the NoutatiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-noutati',
  templateUrl: 'noutati.html',
})
export class NoutatiPage {
  totalPage: any;
  currentPage: any = 1;
  notifications: any = [];
  lastPage:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public newsProvider: NewsProvider) {
    this.getNotification();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NoutatiPage');
  }

  getNotification() {
    this.newsProvider.GetPublicNotification('association', 1, 5).subscribe(response => {
      console.log(response.json());
      this.totalPage = response.json().total;
      this.currentPage = 1;
      this.lastPage = response.json().last_page;
      this.notifications = [];
      response.json().data.forEach((value, key) => {
        value.content = this.htmlToPlaintext(value.content);
        this.notifications.push(value);
      });
    })
  }

  getMoreNotification(page) {
    this.newsProvider.GetPublicNotification('association', page, 5).subscribe(response => {
      // console.log(response.json());
      response.json().data.forEach((value, key) => {
        value.content = this.htmlToPlaintext(value.content);
        this.notifications.push(value);
      });
      this.lastPage = response.json().last_page;
    })
  }

  detail(notify) {
    this.navCtrl.setRoot(NoutatidetailPage, { data: notify });
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    // console.log(this.currentPage);
    // console.log(this.totalPage);
    if (this.currentPage < this.totalPage) {
      this.currentPage = this.currentPage + 1;
      this.getMoreNotification(this.currentPage)
    }
    setTimeout(() => {

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }
  /*********** function for refresher *************/
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.getNotification();
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 500);
  }

  htmlToPlaintext(text) {
    return text ? String(text).replace(/<[^>]+>/gm, '') : '';
  }
}
