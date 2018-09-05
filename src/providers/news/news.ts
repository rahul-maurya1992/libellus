import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the NewsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NewsProvider {

  constructor(public http: Http) {
    console.log('Hello NewsProvider Provider');
  }

  GetPublicNotification(association,page,perPage){
    return this.http.get('https://libellus.ro/serve/api/v1/notif?populate='+association+'&page='+page+'&perPage='+perPage);
  }

}
