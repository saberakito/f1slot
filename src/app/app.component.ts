import { Component,ViewChild } from '@angular/core';

import { AuthService } from './service/auth.service';
import { Router,NavigationEnd, ActivatedRoute, Params } from '@angular/router';
import { NgImageSliderComponent } from 'ng-image-slider';
import { CookieService } from 'ngx-cookie-service';
import { TodoService } from 'src/app/service/todo.service';
import * as AOS from 'aos';
import * as $ from 'jquery';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'casino';
  constructor(private activatedRoute: ActivatedRoute,private todoServcie:TodoService,private _authService:AuthService, private _router:Router, private cookie:CookieService,private router:Router){

  }
  @ViewChild('nav') slider: NgImageSliderComponent;
  public close_popup = "0";
  public adjust_page_image_name:string;
  public adjust_page_image_type:string;
  public website_title:string;
  imageObject: Array<object> = [{
      image: '/assets/images/content/slide1.jpg',
      thumbImage: '/assets/images/content/slide2.jpg'
  }, {
      image: '/assets/images/content/slide2.jpg',
      thumbImage: '/assets/images/content/slide1.jpg',
      //title: 'Image with title' //Optional: You can use this key if you want to show title
  },{
      image: '/assets/images/content/slide3.jpg',
      thumbImage: '/assets/images/content/slide3.jpg',
      //title: 'Image with title' //Optional: You can use this key if you want to show title
  }
  ];
  credit: string;
  getMessage(message: string) {
    console.log(message);
    this.credit = message;
  }
  prevImageClick() {
      this.slider.prev();
  }

  nextImageClick() {
      this.slider.next();
  }

  closePopup() {
    this.cookie.set("close_popup", "1",1);
    this.close_popup = '1';
  }
  public class_checkShow:string;
  showHeader = true;
  member_name:any;
  member_id:any;
  member_code_tran:any;
  credit_code:any;
  bg_image:any;
  ngOnInit() {

    if(localStorage.data_member!=null){
      var objArray = JSON.parse(localStorage.data_member);
      this.member_name = objArray.member_code;
      this.member_id = objArray.member_id;
      this.member_code_tran = objArray.member_code_tran;
    }
    
   
    // this.todoServcie.getCredit(this.member_id).subscribe((response)=>{
    //   this.credit_member = response.data.member_credit;
    //   //this.users = response.data;
    // });

    
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        var check_url = event.url.split("/")[1];
        var token = check_url.split("?token=")[1];
        if(check_url=='lobby'||check_url=='login'||check_url=='game'||check_url=='game_score'||check_url=='game_sumScore'){
          this.showHeader = false;
         // $('body').css('background','unset');
         // this.class_checkShow = "content_100";
        }else{
          this.showHeader = true;
         // this.class_checkShow = "container bg_content";
        // this.class_checkShow = "container bg_content";
        }

        if(token!=null){
          this.todoServcie.checkKey(token).subscribe(data => {
            this.todoServcie.ValidateUser(data[0],data[2]).subscribe(data => {
              if(data.success==true){
                sessionStorage.setItem("data_token",JSON.stringify(data.data));
                location.reload();
              }
            });
          });
        }
        
      //  this.showHeader = this.activatedRoute.firstChild.snapshot.data.showHeader !== false;
      }
    });

   
   
    AOS.init();
   
    var close_popup_value =  this.cookie.get("close_popup");
    if(close_popup_value=='1'){
      this.close_popup = '1';
    }
    document.body.classList.add('bg-img');
    if(localStorage.getItem('web_status')=='2'){
      this._router.navigate(['/404']);
      return false;
    }
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
    if(localStorage.data_member!=null){
      var objArray = JSON.parse(localStorage.data_member);
      this.member_name = objArray.member_code;
      this.member_id = objArray.member_id;
      
    }
    location.reload();
  }
  date1:any;
  date2:any;
  time_start:any;
  credit_member:any;
  public checkTime(data){
    
    this.date1 = new Date(); // 9:00 AM
    var year = this.date1.getFullYear();
    var month = this.date1.getMonth();
    var days = this.date1.getDate();
    var res = data.split(":");
    this.date2 = new Date(year, month, days, res[0], res[1]); // 5:00 PM
   
    // the following is to handle cases where the times are on the opposite side of
    // midnight e.g. when you want to get the difference between 9:00 PM and 5:00 AM
    
    if (res[0]>=0&&res[0]<10) {
      this.date2.setDate(this.date2.getDate() + 1);
    }
    var diff = this.date2 - this.date1;
    this.time_start = diff;
    if(diff<0){
      return false;
    }
    
  }

  public updateCredit(data1,data2){
    this.todoServcie.updateCredit(this.member_name,this.member_code_tran).subscribe((response)=>{
      if(response.result==true){
        var object = response.data;
        this.todoServcie.updateCreditSave(this.member_name,this.member_code_tran,object).subscribe((response2)=>{
         // console.log(response2);
          if(response2.success==true){
            alert(response2.message);
            this.credit_member = response2.data;
          }else{
            alert('ฝากเงินเข้าระบบเพื่อรับ Credit');
          }
        });
      }
     
    });
    
  }
}

