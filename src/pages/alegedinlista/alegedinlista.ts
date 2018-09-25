import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController } from 'ionic-angular';
import { ItemsProvider } from '../../providers/items/items';
import { FormGroup, FormBuilder } from '@angular/forms';

/**
 * Generated class for the AlegedinlistaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-alegedinlista',
  templateUrl: 'alegedinlista.html',
})
export class AlegedinlistaPage {
  institutions: any = [];
  currentPage: any;
  totalPage: any;
  listform: FormGroup;
  lastPage: any;
  constructor(public menuCtrl: MenuController,public navCtrl: NavController, public navParams: NavParams, public itemPro: ItemsProvider, public formBuilder: FormBuilder) {
    // this.institutions = [{ id: 2, name: 'SC TRANSURB SA' }, { id: 3, name: 'BIBLIOTECA JUDETEANA V.A URECHIA GALATI' }, { id: 4, name: 'CENTRUL CULTURAL DUNAREA DE JOS GALATI' },
    // { id: 5, name: 'COMPLEXUL MUZEAL DE STIINTELE NATURII "RASVAN ANGHELUTA"' }, { id: 6, name: 'S.C. DRUMURI SI PODURI S.A. GALATI' }, { id: 7, name: 'SC APA CANAL SA' }, { id: 8, name: 'SC CALORGAL SA' }]
    this.getUnSubscribedData();
  }
  ngOnInit() {
    this.listform = this.formBuilder.group({
      alege: [false]
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AlegedinlistaPage');
    console.log(this.institutions.length);
  }

  
  getUnSubscribedData() {
    this.itemPro.getUnSubscribedInstitutions(1,15).map(res => res.json()).subscribe(response => {
      console.log(response);
      this.currentPage = 1;
      this.institutions = [];
      this.totalPage = response.total;
      this.lastPage = response.last_page;
      response.data.forEach(value => {
        this.institutions.push(value);
      });
    }, error => {
      console.error(error);
      this.itemPro.presentToast('Nu am putut aduce institutiile de la server ! Va rugam incercati mai tarziu !', 4500, 'bottom');
    })
  }

  LoadMoreData(pageno){
    this.itemPro.getUnSubscribedInstitutions(pageno,15).map(res => res.json()).subscribe(response => {
      console.log(response);
      response.data.forEach(value => {
        this.institutions.push(value);
      });
      this.lastPage = response.last_page;
    }, error => {
      console.error(error);
      this.itemPro.presentToast('Nu am putut aduce institutiile de la server ! Va rugam incercati mai tarziu !', 4500, 'bottom');
    })
  }

  choosefromlist(institutionId, index, listval) {
    console.log(institutionId);
    console.log(index);
    console.log(listval.value.alege);
    if (listval.value.alege) {
      if (!institutionId) return;
      this.itemPro.subscribeToInstitution(institutionId).map(res => res.json()).subscribe(response => {
        console.log(response);
        this.listform.patchValue({
          alege:false
        })
        this.getUnSubscribedData();
      }, error => {
        console.error(error);

      })
    }
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
  tooglemenu(){
    console.log('toogle');
    this.menuCtrl.enable(false, 'menu2');
    this.menuCtrl.enable(true, 'menu3');
    this.menuCtrl.toggle('right');
  }
}
