import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { server_url } from 'src/globals';
import { SubscriptionModel } from '../model/SubscriptionModel';

@Injectable({
  providedIn: 'root'
})
export class SubcriptionService {

  constructor(private http: HttpClient) { }

  subscribe(subscription: SubscriptionModel): Observable<SubscriptionModel> {
    return this.http.post<SubscriptionModel>(server_url + '/api/subscriptions', subscription);
  }

  isSubcribed(subscription: SubscriptionModel): Observable<boolean> {
    return this.http.post<boolean>(server_url + '/api/subscriptions/isSubscribed', subscription);
  }

  unsubscribe(subscription: SubscriptionModel): Observable<String> {
    let params = new HttpParams().append('ownerUsername', subscription.ownerUsername).append('subscriberUsername', subscription.subscriberUsername)
    return this.http.delete<String>(server_url + '/api/subscriptions/delete', {params: params})
  }
}
