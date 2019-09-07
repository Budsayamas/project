import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PhoneServiceProvider  } from '../../providers/Phone-service/Phone';
/**
 * Generated class for the EditPhonePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-phone',
  templateUrl: 'edit-phone.html',
})
export class EditPhonePage {

  public form: any;
  public docID: string;
  public veterinarian: string;
  public PhoneNum: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public db:  PhoneServiceProvider ,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController) {
       
     
     
      this.form = formBuilder.group({
        
        'veterinarian': ['', Validators.required],
        'PhoneNum': ['', Validators.required]
        
      });
  }
  ionViewDidLoad() {
    let editDoc =this.navParams.get("editDoc");
   
    this.veterinarian=editDoc.veterinarian;
    this.PhoneNum=editDoc.PhoneNum;
    
 
   }
   updateDocument(formValue) {

    this.db.updateDocument(this.db.COLLECTION,this.docID,{
     
      veterinarian: this.veterinarian,
      PhoneNum: this.PhoneNum,
    }).then((data)=>{
      this.displayAlert("Update Succes","The document"+ this.PhoneNum+ "was successfully updated");
      this.navCtrl.pop();
    }).catch((error)=>{
      this.displayAlert("Error","Update document fail!");
    })

 }

 displayAlert(title: string, message: string): void {
   let alert: any = this.alertCtrl.create({
     title: title,
     subTitle: message,
     buttons: ['Done']
   });
   alert.present();
 }
}




