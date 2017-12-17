import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { MainPage } from '../main/main';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  @ViewChild('displayName') displayName;
  @ViewChild('email') email;
  @ViewChild('password') password;
  firedata = firebase.database().ref('/users');

  constructor(public navCtrl: NavController, public navParams: NavParams, private fire: AngularFireAuth, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  registerUser() {
    this.fire.auth.createUserWithEmailAndPassword(this.email.value, this.password.value)
    .then(() => {
        this.firedata.child(this.fire.auth.currentUser.uid).set({
          uid: this.fire.auth.currentUser.uid,
          displayName: this.displayName.value
        })
      })
    .then(data => {
      this.navCtrl.setRoot(MainPage);
    })
    .catch(error => {
      this.alert(this.greekifyMessage(error.message));
    })
  }

  alert(message: string) {
    this.alertCtrl.create({
      title: 'Εγγραφή απέτυχε',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  greekifyMessage(message: string) {
    var greekMessage = 'Λάθος στοιχεία.';
    if (message == 'The email address is badly formatted.') {
      greekMessage = 'Το email δεν έχει σωστή μορφή.';
    } else if (greekMessage == 'The password must be 6 characters long or more.') {
      greekMessage = 'Ο κωδικός πρέπει να έχει περισσότερα απο 6 χαρακτήρες.';
    } else if (greekMessage == 'The email address is already in use by another account.') {
      greekMessage = 'Το email χρησιμοποιείται.';
    }
    return greekMessage;
  }

}
