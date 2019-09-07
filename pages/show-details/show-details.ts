import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirestoreServiceProvider } from '../../providers/firestore-service/firestore-service';

@IonicPage()
@Component({
  selector: 'page-show-details',
  templateUrl: 'show-details.html',
})
export class ShowDetailsPage {

  private data:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private service:FirestoreServiceProvider ) {
    this.getDetails();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowDetailsPage');
  }
  collection: any = "Dog";
  document:any = "Bleeding";
  getDetails(){
    this.service.getDetail().then(
      (data)=>{
        console.log(JSON.stringify(data));
        console.log(data.name);
        this.data = data;
      },
      (error)=>{
        console.log(error);
      }
    )
  }

}
