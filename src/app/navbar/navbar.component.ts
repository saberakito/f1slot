import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { TodoService } from 'src/app/service/todo.service';
import {Router, NavigationEnd} from "@angular/router";
import * as $ from 'jquery';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  @ViewChild('closebutton') closebutton;
  @Input() credit: any;
  constructor(private router:Router,private serviceMenu:TodoService) { }
  public menus:Todo[];
  public member_name:string;
  public member_id:string;
  public string_secur:string;
  css_game:any;
  menu_counting = 7;
  url:any;
  ngOnInit() {
    this.serviceMenu.getSettingWeb('1').subscribe(data => {
      this.url = data['url'];
    });
    if(localStorage.data_member!=null){
      var objArray = JSON.parse(localStorage.data_member);
      this.member_name = objArray.member_name+' '+objArray.member_lastname;
      this.member_id = objArray.member_id;
      this.string_secur = "ออกจากระบบ";
    }else{
      this.string_secur = "เข้าสู่ระบบ";
    }
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        var check_url = event.url.split("/")[1];
        if(check_url=='sa_game'){
          this.css_game = 'nav_bg_sa';
        }else if(check_url=='sexy_game'){
          this.css_game = 'nav_bg_sexy';
        }else if(check_url=='wmcasino'){
          
        }
        this.css_game = 'nav_bg_sa';
      }
    });
    this.serviceMenu.getCreditGame().subscribe(data => {
      if(data.success==true){
        this.member_name = data['member_name'];
        this.credit = data['credit'];
        if(this.credit<=0){
          alert('เครดิตของคุณไม่พอ');
          this.router.navigate(['/select_game']);
        }
      }
    });
  }
 
  receivedChildMessage:any;
  getMessage(message: string) {
    console.log('NAVBAR'+message);
    this.receivedChildMessage = message;
  }


  updateCredit(){
    if($("#credit_code").val()!=null){
      this.serviceMenu.updateCreditGame($("#credit_code").val()).subscribe(data => {
        if(data.success==true){
          alert('เติมเครดิตแล้ว');
          this.closebutton.nativeElement.click();
          this.serviceMenu.getCreditGame().subscribe(data => {
            if(data.success==true){
              this.credit = data['credit'];
            }
          });
        }
      });
    }
    
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
    this.string_secur = "เข้าสู่ระบบ";
    if(localStorage.data_member!=null){
      var objArray = JSON.parse(localStorage.data_member);
      this.member_name = objArray.member_name+' '+objArray.member_lastname;
      this.member_id = objArray.member_id;
    }
  }

}




interface Todo{
  menu_id:number;
  menu_name:string;
  menu_detail:string;
  menu_route:string;
  menu_type:string;
  menu_sort:string;
}
