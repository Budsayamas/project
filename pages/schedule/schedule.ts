import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { FirestoreServiceProvider } from '../../providers/firestore-service/firestore-service';
import { FormBuilder, Validators } from '@angular/forms';
/**
 * Generated class for the SchedulePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
})
export class SchedulePage {

  public form: any;
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
  public schedule: string;
  public date: string;
  public time: string;
  public title: string;
  public description: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public db: FirestoreServiceProvider,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController) {

      this.form = formBuilder.group({
        'name': ['', Validators.required],
        'birthday': ['', Validators.required],
        'dogorcat': ['', Validators.required],
        'breed': ['', Validators.required],
        'sex': ['', Validators.required],
        // 'petowner': ['', Validators.required],
        'color': ['', Validators.required], 
        'imageName': ['', Validators.required],
        'care':['',Validators.required],
        'schedule':['',Validators.required]
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SchedulePage');
    let alert: any = this.alertCtrl.create({
      title: "คำเตื่อน",
      subTitle: "เมื่อทำการเพิ่มข้อมูลระบบจะไม่สามารถแก้ไขประวัติการรักษาได้เนื่องจากป้องกันการเปลี่ยนแปลงหรือการลบข้อมูล จึงขอให้ผู้ใช้กรุณาตรวจสอบข้อมูลก่อนเพิ่ม",
      buttons: ['รับทราบ']
    });
    alert.present();
    let editDoc =this.navParams.get("editDoc");
    this.docID=editDoc.docid;
    this.name=editDoc.name;
    this.birthday=editDoc.birthday;
    this.care=editDoc.care;
    this.schedule=editDoc.schedule;
    if(!this.schedule){
      this.schedule="";
    }
    this.dogorcat = editDoc.dogorcat;
    this.sex=editDoc.sex;
    this.color=editDoc.color;
    this.imageName=editDoc.imageName;
    this.breed = editDoc.breed;
  }
  ADD(formValue){
    
    if(this.schedule==""){
      this.schedule += this.title+"/"+this.description+"/"+this.date+"/"+this.time
    }else{
      this.schedule += this.title+"/"+this.description+"/"+this.date+"/"+this.time+","
    }
    if(this.title&&this.description&&this.date&&this.time){
      this.db.updateDocument(this.db.COLLECTION,this.docID,{
        name: this.name,
        birthday: this.birthday,
        dogorcat: this.dogorcat,
        breed: this.breed,
        sex: this.sex,
        // petowner: this.petowner, 
        color:this.color,
        imageName: this.imageName,
        care:this.care,
        schedule:this.schedule
      }).then((data)=>{
        this.displayAlert("อัพเดท","ข้อมูล"+ this.name + "อัพเดทสำเร็จ");
        this.navCtrl.pop();
      }).catch((error)=>{
        console.log(error);
        
        this.displayAlert("ล้มเหลว","อัพเดทล้มเหลว");
      })
    }
    
  }
  displayAlert(title: string, message: string): void {
    let alert: any = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['เสร็จสิ้น']
    });
    alert.present();
  }
}
