import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ItemsProvider } from '../../providers/items/items';
import { SesizarePage } from '../sesizare/sesizare';

/**
 * Generated class for the ContulmeuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contulmeu',
  templateUrl: 'contulmeu.html',
})
export class ContulmeuPage {
  toggleColor: any;
  currentUser: any;
  accountForm: FormGroup;
  isToggled: any = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public itemPro: ItemsProvider, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContulmeuPage');
    //console.log(localStorage.getItem('currentUser'));
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.currentUser);
    this.accountForm.patchValue({
      email: this.currentUser.email,
      name: this.currentUser.name,
      last_name: this.currentUser.last_name,
      phone_number: this.currentUser.phone_number,
      notifications_status: this.currentUser.notification_active

    })
  }

  ngOnInit(): any {
    console.log('ngOnInit');
    this.accountForm = this.formBuilder.group({
      email: ['', [Validators.required, this.emailValidator.bind(this)]],
      name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      phone_number: ['', [Validators.required]],
      notifications_status: [false]
    });
  }

  emailValidator(control: FormControl): { [s: string]: boolean } {
    if (!(control.value.toLowerCase().match('^[a-z0-9]+(\.[_a-z0-9]+)+([@{1}])+(\.[a-z0-9-]+)+([.{1}])(\.[a-z]{1,15})$'))) {
      return { invalidEmail: true };
    }
  }

  isValid(field: string) {
    let formField = this.accountForm.get(field);
    return formField.valid || formField.pristine;
  }

  toggleChange(event) {
    console.log('toogle change');
    console.log(event.value);
    this.itemPro.ToggleNotification().map(res => res.json()).subscribe(response => {
      console.log(response);
      var localvalue = JSON.parse(localStorage.getItem('currentUser'));
      localvalue.notification_active = response.notification_active;
      localStorage.setItem('currentUser', JSON.stringify(localvalue));
    }, error => {
      console.info(error);
      this.itemPro.presentToast('Setarile de notificari nu au putut fi modificate', 4500, 'bottom');
    })
  }

  submit(formdata) {
    console.log(formdata.value);
    var postdata = {
      "name": formdata.value.name,
      "last_name": formdata.value.last_name,
      "email": formdata.value.email,
      "notifications_status": formdata.value.notifications_status,
      "phone_number": formdata.value.phone_number
    }
    console.log(postdata);
    this.itemPro.updateUserProfile(postdata).map(res=>res.json()).subscribe(response => {
      console.log(response[0]);
      var localvalue = JSON.parse(localStorage.getItem('currentUser'));
      localvalue.name = response[0].name;
      localvalue.last_name = response[0].last_name;
      localvalue.phone_number = response[0].phone_number;

      // let user = {
      //   name:response[0].name,
      //   last_name:response[0].last_name,
      //   email:response[0].email,
      //   phone_number:response[0].phone_number
      // }
      localStorage.setItem('currentUser', JSON.stringify(localvalue));
      this.navCtrl.setRoot(SesizarePage);
    })
  }
}
