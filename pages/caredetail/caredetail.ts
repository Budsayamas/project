import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController, ToastController } from 'ionic-angular';
import { FirestoreServiceProvider } from '../../providers/firestore-service/firestore-service';
import { FormBuilder, Validators } from '@angular/forms';
import { CareeditPage } from '../careedit/careedit';

@IonicPage()
@Component({
  selector: 'page-caredetail',
  templateUrl: 'caredetail.html',
})
export class CaredetailPage {

  public docID: string;
  public currentImage: any;
  public name: string;
  public birthday: string;
  public dogorcat: string;
  public breed: string;
  public sex: string;
  // public petowner: string;
  public sex1: string;
  public dogorcat1: string;
  public color: string;
  public imageName: string;
  public care: string;
  public hospital: string;
  public symptom: string;
  public date: string;
  all = [];
  vac = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public db: FirestoreServiceProvider,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    private toastController: ToastController,
    private actionsheetCtrl: ActionSheetController) {

    let today = new Date();
    console.log(today);
    let dd = String(today.getDate());
    let mm = String(today.getMonth() + 1);
    let yyyy = today.getFullYear();

    let toDay = dd + " / " + mm + " / " + yyyy;
    console.log("today is:" + toDay);
  }
  ionViewDidLoad() {
    let editDoc = this.navParams.get("editDoc");
    this.docID = editDoc.docid;
    this.name = editDoc.name;
    this.birthday = editDoc.birthday;
    this.care = editDoc.care;
    console.log(this.care);
    if (!this.care) {
      this.care = "";
    }
    console.log(editDoc);
    this.dogorcat = editDoc.dogorcat;
    if (this.dogorcat == "dog") {
      this.dogorcat1 = "สุนัข";
    } else {
      this.dogorcat1 = "แมว";
    }
    this.sex = editDoc.sex;
    // this.petowner = editDoc.petowner;
    this.color = editDoc.color;
    this.imageName = editDoc.imageName;
    console.log(editDoc);
    this.breed = editDoc.breed;
    if (this.sex == "male") {
      this.sex1 = "เพศผู้";
    } else {
      this.sex1 = "เพศเมีย";
    }

    console.log(this.care);

    if (this.care) {
      var list = this.care.split("+");
      
      console.log(list);
      for (let i = 0; i < list.length; i++) {
        this.all[i] = list[i].split("*");
        console.log(this.all[i]); 
        console.log(this.all[i][0]);
        console.log(this.all[i][1]);
        console.log(this.all[i][2]);
        console.log(this.all[i][3]);
        console.log(this.all[i][4]);
      }
      
      
    }
    


  }

}
