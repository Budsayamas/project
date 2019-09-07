import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { FirestoreServiceProvider } from '../../providers/firestore-service/firestore-service';
import { FormBuilder,Validators } from '@angular/forms';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  email:any;
  password: any;

  form:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController,
    public provider: FirestoreServiceProvider,
    public formBuilder: FormBuilder
    ) {
      this.form =formBuilder.group({
        'email': ['',Validators.email],
        password:['',[
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20)

        ]
      ],
      });

    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    let credentials ={
      email: this.email,
      password: this.password
    }
    this.provider.signInWithEmail(credentials).then(
      (result) => {
        // let result;
        // result = this.provider.result;
        console.log(result)
        this.alertCtrl.create({
          title: "เข้าสู่ระบบด้วย    "+ this.email+"",
          buttons:[{
            text: "ตกลง",
            handler:() =>{
              this.navCtrl.setRoot(HomePage,{
                email: this.email
                // result: result
              })
            }
          }]
        }).present();
      }
    ).catch((error) =>{
      console.log(error);
      this.alertCtrl.create({
        title: 'การเข้าสู่ระบบไม่ถูกต้อง',
        buttons: [
          {
            text: 'ปิด',
            role: 'cancel',
            handler:() =>
            {
              console.log('close alert');
            }
          }
        ]
      }).present();
    });
  }
 

  register(){
    this.navCtrl.push(RegisterPage);
  }

}
