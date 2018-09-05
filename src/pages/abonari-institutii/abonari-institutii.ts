import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlegedinlistaPage } from '../alegedinlista/alegedinlista';
import { ItemsProvider } from '../../providers/items/items';

/**
 * Generated class for the AbonariInstitutiiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-abonari-institutii',
  templateUrl: 'abonari-institutii.html',
})
export class AbonariInstitutiiPage {
  listItems: any = [];
  currentPage:any;
  totalPage:any;
  lastPage: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public itemPro:ItemsProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AbonariInstitutiiPage');
    this.listItems = [{ 'name': 'Primaria Mun Galati' },
    { 'name': 'SC TRANSURB SA' }, { 'name': 'BIBLIOTECA JUDETEANA V.A URECHIA GALATI' }, { 'name': 'CENTRUL CULTURAL DUNAREA DE JOS GALATI' },
    { 'name': 'COMPLEXUL MUZEAL DE STIINTELE NATURII "RASVAN ANGHELUTA"' }, { 'name': 'S.C. DRUMURI SI PODURI S.A. GALATI' }, { 'name': 'SC APA CANAL SA' },
    { 'name': 'SC CALORGAL SA' }];
  }

  GetSUbscribedList() {
    this.itemPro.getSubscribedInstitutions(1,15).map(res=>res.json()).subscribe(response=>{
      console.log(response);
      this.currentPage = 1;
      this.totalPage = response.total;
      this.lastPage = response.last_page;
      this.listItems = [];
      response.data.forEach(value => {
        this.listItems.push(value);
      });
    },error=>{
      console.error(error);
    })
  }

  LoadMoreData(pageno){
    this.itemPro.getSubscribedInstitutions(pageno,15).map(res=>res.json()).subscribe(response=>{
      console.log(response);
      response.data.forEach(value => {
        this.listItems.push(value);
      });
      this.lastPage = response.last_page;
    },error=>{
      console.error(error);
    })
  }

  /******** Run function on unchecked ********/
  unSubscribeFromInstitution(institutionId){
    if ( !institutionId ) return;
    
    
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    // console.log(this.currentPage);
    // console.log(this.totalPage);
    if (this.currentPage < this.totalPage) {
      this.currentPage = this.currentPage + 1;
      this.LoadMoreData(this.currentPage)
    }
    setTimeout(() => {

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }
  alegedinlista() {
    this.navCtrl.setRoot(AlegedinlistaPage);
  }
}
