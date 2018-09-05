import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ItemsProvider } from '../../providers/items/items';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder,public itemPro:ItemsProvider,public toastCtrl:ToastController ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContulmeuPage');
    //console.log(localStorage.getItem('currentUser'));
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    //console.log(this.currentUser);
    this.accountForm.patchValue({
      email:this.currentUser.auth.email,
      name:this.currentUser.name,
      last_name:this.currentUser.last_name,
      phone_number:this.currentUser.phone_number,
      notifications_status:this.currentUser.notification_active

    })
  }

  ngOnInit(): any {
    console.log('ngOnInit');
    this.accountForm = this.formBuilder.group({
      email: ['', [Validators.required, this.emailValidator.bind(this)]],
      name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      phone_number: ['', [Validators.required]],
      notifications_status:['']
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
    this.itemPro.ToggleNotification().map(res=>res.json()).subscribe(response=>{
      console.log(response);
    },error=>{
      console.info(error);
      this.itemPro.presentToast('Setarile de notificari nu au putut fi modificate',4500,'bottom');
    })
  }

  submit(formdata){
    console.log(formdata.value);
    var postdata = {
      id:this.currentUser.id,
      auth:{email:formdata.value.email},
      name:formdata.value.name,
      last_name:formdata.value.last_name,
      phone_number:formdata.value.phone_number,
      notifications_status:formdata.value.notifications_status,
      password:"europa77"
    }
    this.itemPro.updateUserProfile(postdata).subscribe(response=>{
      console.log(response);
    })
  }
}
