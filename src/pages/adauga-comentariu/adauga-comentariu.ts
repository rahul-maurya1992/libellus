import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormsModule, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ItemsProvider } from '../../providers/items/items';

/**
 * Generated class for the AdaugaComentariuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-adauga-comentariu',
  templateUrl: 'adauga-comentariu.html',
})
export class AdaugaComentariuPage {
  commentForm: any;
  patitionId: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController, public formBuilder: FormBuilder,public itemPro:ItemsProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdaugaComentariuPage');
    this.patitionId = this.navParams.get('itemId');
  }

  ngOnInit(): any {
    console.log('ngOnInit');
    this.commentForm = this.formBuilder.group({
      body: ['', [Validators.required]],
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  sendComment(formdata){
    var postdata = {
      body:formdata.value.body,
      official_petition:this.patitionId
    }
    console.log(postdata);
    this.itemPro.postComment(postdata).map(res=>res.json()).subscribe(response=>{
      console.log(response);
      this.viewCtrl.dismiss();
    })
  }
}
