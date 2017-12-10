import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { MainPage } from '../main/main';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  @ViewChild('email') email;
  @ViewChild('password') password;

  constructor(public navCtrl: NavController, public navParams: NavParams, private fire: AngularFireAuth, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  alert(message: string) {
    this.alertCtrl.create({
      title: 'Σύνδεση απέτυχε',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  loginUser() {
    this.fire.auth.signInWithEmailAndPassword(this.email.value, this.password.value)
    .then( data => {
      this.navCtrl.setRoot(MainPage);
    })
    .catch( error => {
      this.alert(error.message);
    })
  }

}
