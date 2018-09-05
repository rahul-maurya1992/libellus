import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';
import { SesizarePage } from '../sesizare/sesizare';

/**
 * Generated class for the ContacteazaNePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contacteaza-ne',
  templateUrl: 'contacteaza-ne.html',
})
export class ContacteazaNePage {
  ContactForm:FormGroup;


  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public authenticatePro: AuthenticateProvider,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContacteazaNePage');
    this.ContactForm.patchValue({
      county:'Galati',
      town:'Galati'
    })
  }

  ngOnInit(): any {
    console.log('ngOnInit');
    this.ContactForm = this.formBuilder.group({
      title: ['', Validators.required],
      name: ['', Validators.required],
      county: ['', Validators.required],
      town: ['', Validators.required],
      content: [''],
      phone_number: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9]+(\.[_a-z0-9]+)+([@{1}])+(\.[a-z0-9-]+)+([.{1}])(\.[a-z]{1,15})$')]],
    });
  }

  emailValidator(control: FormControl): { [s: string]: boolean } {
    if (!(control.value.toLowerCase().match('^[a-z0-9]+(\.[_a-z0-9]+)+([@{1}])+(\.[a-z0-9-]+)+([.{1}])(\.[a-z]{1,15})$'))) {
      return { invalidEmail: true };
    }
  }
  isValid(field: string) {
    let formField = this.ContactForm.get(field);
    return formField.valid || formField.pristine;
  }
  contact(formdata){
    console.log(formdata.value);
    this.authenticatePro.sendContactMessage(formdata.value).subscribe(data=>{
      console.log(data.json());
      this.authenticatePro.presentToast('Sesizarea a fost trimisa cu succes !',4500,'bottom');
      this.navCtrl.setRoot(SesizarePage);
    },(error)=>{
      console.log(error);
      this.authenticatePro.presentToast('Mesajul dumneavoastra a fost trimis cu succes !',4500,'bottom');
    })

  }
}
