import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {
  email: string;

  constructor(public navCtrl: NavController, private fire: AngularFireAuth) {
    this.email = this.fire.auth.currentUser.email;
  }

}
