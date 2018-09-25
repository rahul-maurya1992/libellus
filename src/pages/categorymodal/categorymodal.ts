import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ItemsProvider } from '../../providers/items/items';

/**
 * Generated class for the CategorymodalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categorymodal',
  templateUrl: 'categorymodal.html',
})
export class CategorymodalPage {
  categorylist: any = [];
  selecteddata: any = [];
  categoryForm: FormGroup;
  searchText:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public formBuilder: FormBuilder,public itemPro: ItemsProvider ) {
    /****** Array for list the categories ***************/
    this.categorylist = [{ id: 1, name: 'Categorii' }, { id: 2, name: 'Transport public' }, { id: 3, name: 'Salubritate' }, { id: 4, name: 'Impozite si taxe' }, { id: 5, name: 'Domeniul public' },
    { id: 6, name: 'Drumuri / Iluminat' }, { id: 7, name: 'Retele de apa calda' }, { id: 8, name: 'Ordine si domeniul public' }, { id: 9, name: 'Retele de apa si canalizare' }, { id: 10, name: 'Spatii verzi' },
    { id: 11, name: 'Biciclisti' }, { id: 12, name: 'Parcari' }, { id: 13, name: 'Cultura' }]
    //this.Getcategorylist();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategorymodalPage');
    if(localStorage.getItem('categorylist')){
      console.log(JSON.parse(localStorage.getItem('categorylist')));
      var cato = JSON.parse(localStorage.getItem('categorylist'));
      this.categoryForm.patchValue({
        category:cato.category
      })
    }
  }
  ngOnInit(): any {
    console.log('ngOnInit');

    this.categoryForm = this.formBuilder.group({
      category: this.formBuilder.array(this.categorylist.map(x => {console.log(x)}))
    });
  }
  onInput(evt) {
    console.log(evt.data);
  }
  update(catname, catid, event) {
    console.log(catname);
    console.log(catid);
    console.log(event);
    if (event == true) {
      var a = { name: catname, id: catid, value: event };
      this.selecteddata.push(a)
    }

  }
  cancel() {
    this.navCtrl.pop();
  }

  dismiss(data) {
    console.log(data.value);
    localStorage.setItem('categorylist',JSON.stringify(data.value));
    data.value.category.forEach((value,key) => {
      console.log(value);
      console.log(key);
      if(value == true){
        console.log(this.categorylist[key]);
        this.selecteddata.push(this.categorylist[key]);
      }
    });
    console.log(this.selecteddata);
    this.viewCtrl.dismiss({ selected: this.selecteddata });
  }

  reset(formdata){
    console.log(formdata.value);
    this.selecteddata = [];
    localStorage.removeItem('categorylist');
    this.viewCtrl.dismiss({ selected: this.selecteddata });
  }
  Getcategorylist(){
    this.itemPro.getCategory().map(res=>res.json()).subscribe(response=>{
      console.log(response);
      this.categorylist = response.data;
    })
  }
}
