import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  @ViewChild('email') email;
  @ViewChild('password') password;

  constructor(public navCtrl: NavController, public navParams: NavParams, private fire: AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  registerUser() {
    this.fire.auth.createUserWithEmailAndPassword(this.email.value, this.password.value)
    .then(data => {

    })
    .catch(error => {

    })
  }

}
