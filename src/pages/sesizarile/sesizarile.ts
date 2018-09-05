import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SesizarileDetailPage } from '../sesizarile-detail/sesizarile-detail';
import { FilterSesizariPage } from '../filter-sesizari/filter-sesizari';
import { TrimiteSesizarePage } from '../trimite-sesizare/trimite-sesizare';
import { ItemsProvider } from '../../providers/items/items';

/**
 * Generated class for the SesizarilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sesizarile',
  templateUrl: 'sesizarile.html',
})
export class SesizarilePage {
  sesizarile: any = [];
  currentPage: any = 1;
  totalPage: any;
  lastPage:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public itemPro: ItemsProvider) {
    console.log(this.navParams.get('statusObj'));
    this.FilterFunc();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SesizarilePage');

  }
  getComplaints() {
    this.itemPro.getComplaint(1, 7, 'DESC').subscribe(data => {
      console.log(data.json());
      this.currentPage = 1;
      this.sesizarile = [];
      this.lastPage = data.json().last_page;
      var res = data.json();
      res.data.forEach(value => {
        this.sesizarile.push(value);
      });
      this.totalPage = res.last_page
    })
  }

  Loadmoredata(pageno) {
    this.itemPro.getComplaint(pageno, 7, 'DESC').subscribe(data => {
      console.log(data.json());
      var res = data.json();
      res.data.forEach(value => {
        this.sesizarile.push(value);
      });
      //this.totalPage = res.last_page
      this.lastPage = data.json().last_page;
    })
  }

  detail() {
    this.navCtrl.setRoot(SesizarileDetailPage);
  }

  search() {
    this.navCtrl.setRoot(FilterSesizariPage);
  }

  add() {
    this.navCtrl.setRoot(TrimiteSesizarePage);
  }

  FilterFunc() {
    if (this.navParams.get('statusObj')) {
      if (this.navParams.get('statusObj').status == "all") {
        this.getComplaints();
      } else {
        this.itemPro.getComplaint(1, 7, 'DESC').subscribe(data => {
          console.log(data.json());
          var res = data.json();
          this.currentPage = 1;
          res.data.forEach(value => {
            console.log(value.status);
            if (value.status == this.navParams.get('statusObj').status) {
              this.sesizarile.push(value);
            }
          });
          this.totalPage = res.last_page
        })
      }
    } else {
      this.getComplaints();
    }
  }

  /*********** function for refresher *************/
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.getComplaints();
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 500);
  }

  /********** function for infinite scroll ***************/
  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    this.currentPage = this.currentPage + 1;
    this.Loadmoredata(this.currentPage);
    setTimeout(() => {
      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }
}
