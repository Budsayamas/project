import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {PhoneServiceProvider } from '../../providers/Phone-service/Phone';




@IonicPage()
@Component({
  selector: 'page-add-phone',
  templateUrl: 'add-phone.html',
})
export class AddPhonePage {

  public form: any;
    public veterinarian: string;
    public PhoneNum: any;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public db: PhoneServiceProvider,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController) {

    this.form = formBuilder.group({
     
      'veterinarian': ['', Validators.required],
      'PhoneNum': ['', Validators.required]
      
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPetPage');
  }

  saveDocument(formValue) {
    //** [EDIT] insert some code for save document here
    this.db.addDocument(this.db.COLLECTION,{
     
      veterinarian: this.veterinarian,
      PhoneNum: this.PhoneNum,
    }).then((data) =>{
      
      this.displayAlert("Document added", "The document"+ this.PhoneNum+"was successfully added");
      this.clearInputForm();
    }).catch((eror)=>{
      this.displayAlert("Adding document failed",eror.message)

    });

    
  }

  displayAlert(title: string, message: string): void {
    let alert: any = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['Done']
    });
    alert.present();
  }

  clearInputForm() {
  
    this.veterinarian= "";
    this.PhoneNum = "";
   
  }
}
