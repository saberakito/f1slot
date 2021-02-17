import { Component, OnInit, ViewChild } from '@angular/core';
import { NgImageSliderComponent } from 'ng-image-slider';
import { TodoService } from 'src/app/service/todo.service';
import {Router,NavigationEnd} from "@angular/router"
import * as $ from 'jquery';
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';
export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor(private todoServcie:TodoService,private router:Router) { }
  @ViewChild('nav') slider: NgImageSliderComponent;

  options = {
    fullWidth: true
  };
  public member_name:string;
  public member_code_tran:string;
  public member_id:string;
  public bsInlineValue:any;
  public date_data:any;
  public credit_member:any;
  public time_start:any;
  public date1:any;
  public date2:any;
  public showHeader:any;
  public hdd_display_:any;
  public image_name_1:any;
  public image_name_2:any;
  public image_name_3:any;
 
  public image_type_1:any;
  public image_type_2:any;
  public image_type_3:any;

  public image_name_4:any;
  public image_type_4:any;
  link_ads1:any;
  link_ads2:any;
  link_ads3:any;
  link_ads4:any;
  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        var check_url = event.url.split("/")[2];
        if(check_url!='game'){
          this.showHeader = true;
        }else{
          this.showHeader = false;
        }
      //  this.showHeader = this.activatedRoute.firstChild.snapshot.data.showHeader !== false;
      }
    });
  }
}

