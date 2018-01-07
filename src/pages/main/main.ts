import { Component } from '@angular/core';
import { IonicPage, NavController, Platform } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { LocationTrackerProvider } from '../../providers/location-tracker/location-tracker';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, CameraPosition, MarkerOptions, Marker } from '@ionic-native/google-maps';

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {
  map: any;

  constructor(public navCtrl: NavController, private fire: AngularFireAuth, public platform: Platform, public locationTracker: LocationTrackerProvider, private geolocation: Geolocation, private googleMaps: GoogleMaps) {
    platform.ready().then(() => {
      let watch = this.geolocation.watchPosition();
      watch.subscribe((data) => {
        let position = new LatLng(data.coords.latitude, data.coords.latitude);
        this.loadMap(data.coords.latitude, data.coords.longitude);
        this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
          console.log('Map is ready!');
          this.loadMarker(position);
        });
        this.loadMarker(position);
      });

    });
  }

  loadMap(latitude, longitude) {
    this.map = new GoogleMap('map', {
      'controls': {
        'compass': true,
        'myLocationButton': true,
        'indoorPicker': true,
        'zoom': true
      },
      'gestures': {
        'scroll': true,
        'tilt': true,
        'rotate': true,
        'zoom': true
      },
      'camera': {
        'target': {
          'lat': latitude,
          'lng': longitude
        },
        'tilt': 30,
        'zoom': 15,
        'bearing': 50
      }
    });
  }

  loadMarker(position) {
    this.map.addMarker({
      title: 'Είσαι εδώ',
      position: position
    }).showInfoWindow();
  }

  start(){
    this.locationTracker.startTracking();
  }
 
  stop(){
    this.locationTracker.stopTracking();
  }

}
