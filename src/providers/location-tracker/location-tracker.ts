import { Injectable, NgZone } from '@angular/core';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import 'rxjs/add/operator/filter';

@Injectable()
export class LocationTrackerProvider {
  public watch: any;   
  public lat: number = 0;
  public lng: number = 0;

  constructor(public zone: NgZone, public backgroundGeolocation: BackgroundGeolocation, public geolocation: Geolocation) {
    
  }

  startTracking() {
    // Background Tracking for when the application is closed in the background
    let config = {
      desiredAccuracy: 0,
      stationaryRadius: 20,
      distanceFilter: 10,
      debug: true, //TODO change to false on release
      interval: 2000
    };
    this.backgroundGeolocation.configure(config).subscribe((location) =>  {
      this.zone.run(() => {
        this.lat = location.latitude;
        this.lng = location.longitude;
      });
    }, (err) => {
      console.log(err);
    });
    // Turn ON the background-geolocation system
    this.backgroundGeolocation.start();
    // Foreground Tracking for when the application is open
    let options = {
      fequency: 3000,
      enableHighAccuracy: true
    };
    this.watch = this.geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {
      // Run update inside of Angular's zone
      this.zone.run(() => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    });
  }

  stopTracking() {
    this.backgroundGeolocation.finish();
    this.watch.unsubscribe();
  }

}
