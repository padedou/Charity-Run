import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { LocationTrackerProvider } from '../../providers/location-tracker/location-tracker';

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {
  email: string;

  constructor(public navCtrl: NavController, private fire: AngularFireAuth, public locationTracker: LocationTrackerProvider) {
    this.email = this.fire.auth.currentUser.email;
  }

  start(){
    this.locationTracker.startTracking();
  }
 
  stop(){
    this.locationTracker.stopTracking();
  }

}
