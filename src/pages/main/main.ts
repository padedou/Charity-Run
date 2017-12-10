import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {
  email: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private fire: AngularFireAuth) {
    this.email = this.fire.auth.currentUser.email;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
  }

}
