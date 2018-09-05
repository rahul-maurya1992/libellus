import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';
import { AuthenticationPage } from '../authentication/authentication';

/**
 * Generated class for the ForgotpasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgotpassword',
  templateUrl: 'forgotpassword.html',
})
export class ForgotpasswordPage {
  forgotpasswordForm: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public authenticatePro: AuthenticateProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotpasswordPage');
  }
  ngOnInit(): any {
    console.log('ngOnInit');
    this.forgotpasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, this.emailValidator.bind(this)]]
    });
  }
  emailValidator(control: FormControl): { [s: string]: boolean } {
    if (!(control.value.toLowerCase().match('^[a-z0-9]+(\.[_a-z0-9]+)+([@{1}])+(\.[a-z0-9-]+)+([.{1}])(\.[a-z]{1,15})$'))) {
      return { invalidEmail: true };
    }
  }
  isValid(field: string) {
    let formField = this.forgotpasswordForm.get(field);
    return formField.valid || formField.pristine;
  }

  recoverpassword(formdata) {
    console.log(formdata.value);
    this.authenticatePro.recoveryPassword(formdata.value).subscribe(Response => {
      console.log(Response);
      console.log('Email sent');
      this.authenticatePro.presentToast('E-mailul cu instructiunile de resetare a fost trimis cu succes la adresa '+formdata.value.email, 4500, 'bottom');
      this.navCtrl.setRoot(AuthenticationPage);
    }, error => {
      console.log('error');
      this.authenticatePro.presentToast('Este posibil ca e-mailul sa nu existe in baza de date.', 4500, 'bottom');
    })
  }


}
