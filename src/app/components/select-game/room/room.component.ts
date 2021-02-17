import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { TodoService } from 'src/app/service/todo.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../../../navbar/navbar.component';
import {CookieService} from 'ngx-cookie-service';
import * as $ from 'jquery';
declare var testHoldon,myLoop: any
declare var require: any;
const temp1 = require('./room.component.html');
const temp2 = require('./room.component2.html');
const temp3 = require('./room.component3.html');
var processing_show = 0;
@Component({
  selector: 'app-room',
  templateUrl: temp1+temp2+temp3,
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  @ViewChild('closebutton') closebutton;
  @Output() credit = new EventEmitter<string>();
  public navItems = NavbarComponent;
  constructor(private cookieService:CookieService,private router:Router,private route:ActivatedRoute,private TodoService:TodoService) {
   
    this.sub = this.route.params.subscribe(params => {
      this.game_id =  params['id'];
      
    });
    
    this.interval = setInterval(() => {
     this.getJackpot(); 
     //this.getData();
    }, 5000);
  }
  data_game:any;
  cookieValue:any;
  game_id:any;
  sub:any;
  interval:any;
  theme:any;
  url_image:any;
  room_name:any;
  showJack:any=0;
  setJack:any=0;
  member_credit:any;
  
  showJackPort(data){
    if(processing_show == 0){
      processing_show = 1;
      this.url_image = 'http://f1slot888.com/upload/file/'+data.data.pupn_image_filename+'.'+data.data.pupn_image_type;
      this.room_name = data.data.gd_name;
      $('.bg_jackport').fadeIn();
      var deleteCredit = this.TodoService;
      var memberCredit = this.member_credit;
      setTimeout(function(){
        processing_show =0;
        $('.bg_jackport').fadeOut();
        deleteCredit.deleteCreditGameSlot().subscribe(data => {
          
          deleteCredit.getCreditGameSlot().subscribe(data => {
            if(data.success==true){
              memberCredit = data['credit'];
            }
            if(memberCredit<=0){
              alert('กรุณาเติม credit');
              this.router.navigate(['/select_game']);
            }
          })
          
        })
        
      },7000)
    }
    
  }
  
  getJackpot(){
    
    this.TodoService.showJackpot(this.game_id).subscribe(data => {
        console.log(data);
        
        if(data.success==true){
          this.room_name = data.data.gd_name;
          this.showJackPort(data);
          this.TodoService.updateJackpot(data).subscribe(data2 => { 
            this.TodoService.getCreditGameSlot().subscribe(data => {
              if(data.success==true){
                this.member_credit = data['credit'];
              }
              if( this.member_credit<=0){
                alert('กรุณาเติม credit');
                this.router.navigate(['/select_game']);
              }
            })
           
            
          });
        }
    });
  }
  addPercent(){
    this.TodoService.addPercent().subscribe(data => { 
     
    });
  }
  getData(){
    this.TodoService.getAllDataGame(this.game_id).subscribe(data => {
     
      this.data_game = data.data;
      this.url_image = 'http://f1slot888.com/upload/file/'+data.data[0].pupn_image_filename+'.'+data.data[0].pupn_image_type
     // console.log(data.data);
    })
  }
  ngOnInit() {
    if(localStorage.getItem("login")!="success"&&localStorage.getItem("data_member")==null){
      this.router.navigate(['/login']);
    }else{
     // this.member_credit = JSON.parse(localStorage.getItem("data_member")).member_credit;
      this.TodoService.getCreditGameSlot().subscribe(data => {
        
        if(data.success==true){
          this.member_credit = data['credit'];
        }
        if(this.member_credit<=0){
          alert('กรุณาเติม credit');
          this.router.navigate(['/select_game']);
        }
      })
     
    }
    
    this.getData();
   
    this.TodoService.getAllDataGame(this.game_id).subscribe(data => {
     
      this.data_game = data.data;
     var loadData = sessionStorage.getItem('loadData');
      if(loadData!='1'){
        sessionStorage.setItem('loadData','1');
        testHoldon('square-jelly-box','LOADING');
        $("#holdon-message").html("กำลังเจาะระบบและสแกน Server Slot API <br>");
        
        myLoop(this.data_game);
      }
     // console.log(data.data);
    })
    
  }
  logout(){
    window.localStorage.clear();
    localStorage.clear()
    this.router.navigate(['/login']);
  }
  ngOnDestroy() {
    if (this.game_id) {
      clearInterval(this.game_id);
    }
  }

  @Output() messageToEmit = new EventEmitter<string>();
  //credit:any=0;.
  credit_string:string;
  getCredit(){
    this.TodoService.getCreditGame().subscribe(data => {
      if(data.success==true){
        this.credit = data['credit'];
        this.credit_string = data['credit'];
        $(".credit_text").html(this.credit_string);
      }
    });
  }  

  updateCredit(){
    if($("#credit_code").val()!=null){
      this.TodoService.updateCreditGameSlot($("#credit_code").val()).subscribe(data => {
        if(data.success==true){
          alert('เติมเครดิตแล้ว');
          this.closebutton.nativeElement.click();
          this.TodoService.getCreditGame().subscribe(data => {
            if(data.success==true){
              this.member_credit = data['credit'];
            }
          });
        }
      });
    }
    
  }
}


