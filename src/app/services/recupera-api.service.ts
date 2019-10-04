import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecuperaAPIService {

  constructor(
    private http: HTTP,
    private http2: HttpClient,
    private platform: Platform) {
    this.getUsers().then(data => {
      console.log(data);
    }).catch(error => {
      console.error(error);
    });
   }

  getUsers() {
    if (!this.platform.is('mobile')) {
      return this.http2.get('https://reqres.in/api/users').toPromise();
    } else {
      return this.http.get('https://reqres.in/api/users', {}, {});
    }
  }
}
