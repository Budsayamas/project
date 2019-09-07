import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FirestoreServiceProvider } from '../../providers/firestore-service/firestore-service';
import { FormBuilder, Validators } from '@angular/forms';
@IonicPage()
@Component({
  selector: 'page-care',
  templateUrl: 'care.html',
})
export class CarePage {

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
  public hospital: string;
  public symptom: string;
  public date: string;
  public time: string;
  public vaccine: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public db: FirestoreServiceProvider,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController) {

    let today = new Date();
    console.log(today);
    let dd = String(today.getDate());
    let mm = String(today.getMonth() + 1);
    let yyyy = today.getFullYear();
    let toDay = dd + " / " + mm + " / " + yyyy;
    console.log("today is:" + toDay);
    this.form = formBuilder.group({
      'name': ['', Validators.required],
      'birthday': ['', Validators.required],
      'dogorcat': ['', Validators.required],
      'breed': ['', Validators.required],
      'sex': ['', Validators.required],
      // 'petowner': ['', Validators.required],
      'color': ['', Validators.required],
      'imageName': ['', Validators.required],
      'care': ['', Validators.required],
      'schedule': ['', Validators.required]
    });
  }
  ionViewDidLoad() {
    let alert: any = this.alertCtrl.create({
      title: "คำเตือน",
      subTitle: "เมื่อทำการเพิ่มข้อมูลระบบจะไม่สามารถแก้ไขประวัติการรักษาได้เนื่องจากป้องกันการเปลี่ยนแปลงหรือการลบข้อมูล จึงขอให้ผู้ใช้กรุณาตรวจสอบข้อมูลก่อนเพิ่ม",
      buttons: ['รับทราบ']
    });
    alert.present();
    let editDoc = this.navParams.get("editDoc");
    this.docID = editDoc.docid;
    this.name = editDoc.name;
    this.birthday = editDoc.birthday;
    this.care = editDoc.care;
    this.schedule = editDoc.schedule;
    // console.log(editDoc);

    console.log(this.care);

    if (!this.care) {
      this.care = "";
    }
    if (!this.schedule) {
      this.schedule = "";
    }

    console.log(editDoc);
    this.dogorcat = editDoc.dogorcat;
    if (this.dogorcat == "dog") {
      this.dogorcat1 = "สุนัข";
    } else {
      this.dogorcat1 = "แมว";
    }
    this.sex = editDoc.sex;
    // this.petowner=editDoc.petowner;

    this.color = editDoc.color;

    this.imageName = editDoc.imageName;
    console.log(editDoc);
    this.breed = editDoc.breed;
    if (this.sex == "male") {
      this.sex1 = "เพศผู้";
    } else {
      this.sex1 = "เพศเมีย";
    }

  }
  updateDocument(formValue){
    if (!this.vaccine) {
      var vac = "ไม่มี";
    }
    if (this.date && this.time && this.hospital) {
      if (!this.vaccine) {
        var vac = "ไม่มี"; 
        if (this.care == "") {
          this.care = this.date + "*" + this.time + "*" + this.hospital + "*" + this.symptom + "*" + vac;
        } else {
          this.care = this.date + "*" + this.time + "*" + this.hospital + "*" + this.symptom + "*" + vac + "+" + this.care;
        }
      }else{
        if (this.care == "") {
          this.care = this.date + "*" + this.time + "*" + this.hospital + "*" + this.symptom + "*" + this.vaccine;
        } else {
          this.care = this.date + "*" + this.time + "*" + this.hospital + "*" + this.symptom + "*" + this.vaccine + "+" + this.care;
        }
      }
      console.log(this.care);
      this.db.updateDocument(this.db.COLLECTION, this.docID, {
        name: this.name,
        birthday: this.birthday,
        dogorcat: this.dogorcat,
        breed: this.breed,
        sex: this.sex,
        // petowner: this.petowner, 
        color: this.color,
        imageName: this.imageName,
        care: this.care,
        schedule: this.schedule
      }).then((data) => {
        this.displayAlert("อัพเดท", "ข้อมูล" + this.name + "อัพเดทสำเร็จ");
        this.navCtrl.pop();
      }).catch((error) => {
        console.log(error);

        this.displayAlert("ล้มเหลว", "อัพเดทล้มเหลว");
      })
    } else {
      let alert: any = this.alertCtrl.create({
        title: "ล้มเหลว",
        subTitle: 'กรุณากรอกข้อมูลให้ครบ',
        buttons: ['รับทราบ']
      });
      alert.present();
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

  Check() {
    console.log(this.vaccine);
    console.log(this.vaccine.toString());
    console.log(this.dogorcat);

  }
}
