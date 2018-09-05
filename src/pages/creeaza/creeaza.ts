import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events, ToastController } from 'ionic-angular';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { TemplateParseResult } from '@angular/compiler';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';
import { SesizarePage } from '../sesizare/sesizare';

/**
 * Generated class for the CreeazaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-creeaza',
  templateUrl: 'creeaza.html',
})
export class CreeazaPage {
  SignupForm: FormGroup;
  username: any;
  userdata: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public authenticatePro: AuthenticateProvider,
  public event:Events,public toastCtrl:ToastController ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreeazaPage');
    
  }
  ngOnInit(): any {
    console.log('ngOnInit');
    this.SignupForm = this.formBuilder.group({
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      username: ['', Validators.required],
      phone_number: ['', Validators.required],
      email: ['', [Validators.required, this.emailValidator.bind(this)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', [Validators.required]],
      isUsrMember: [false],
      acceptTermsAndConditions: [true, [Validators.required, this.terms.bind(this)]]
    }, { validator: this.matchingPasswords('password', 'password_confirmation') });
  }
  emailValidator(control: FormControl): { [s: string]: boolean } {
    if (!(control.value.toLowerCase().match('^[a-z0-9]+(\.[_a-z0-9]+)+([@{1}])+(\.[a-z0-9-]+)+([.{1}])(\.[a-z]{1,15})$'))) {
      return { invalidEmail: true };
    }
  }
  isValid(field: string) {
    let formField = this.SignupForm.get(field);
    return formField.valid || formField.pristine;
  }

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];
      if (password.value != confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }
  terms(terms) {
    console.log(terms.value);
    if (terms.value == false) {
      return { terms: false }
    }

  }

  name(formdata) {
    console.log(formdata.value.name);
    this.username = formdata.value.name;
    this.SignupForm.patchValue({
      username: formdata.value.name
    })
  }

  firstname(formdata) {
    console.log(formdata.value.firstname);
    console.log(this.username);
    this.SignupForm.patchValue({
      username: formdata.value.name + formdata.value.last_name
    })
  }

  signup(formdata) {
    console.log(formdata.value);
    this.authenticatePro.Registration(formdata.value).subscribe(response => {
      console.log(response);
      console.log(response.json());
      this.userdata = response.json();
      if (this.userdata.length > 0) {
        this.authenticatePro.presentToast('V-ati inregistrat cu succes !', 4500, 'bottom');
        localStorage.setItem('currentUser', JSON.stringify(this.userdata[0]));
        this.event.publish('loggedin', 'loggedin');
        this.navCtrl.setRoot(SesizarePage);
      }else{
        this.authenticatePro.presentToast('Va rugam incercati din nou !', 4500, 'bottom');
        
      }
    });
  }

}
