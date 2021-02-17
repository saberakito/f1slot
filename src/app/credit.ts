import {  OnInit } from '@angular/core';
import { TodoService } from 'src/app/service/todo.service';
export class NavbarComponent implements OnInit {
    constructor(private TodoService:TodoService) { }
    public member_name:string;
    public member_id:string;
    public string_secur:string;
    css_game:any;
    menu_counting = 7;
    credit:any = 0;
    ngOnInit() {
  
     
    }
    getCredit(){
        this.TodoService.getCreditGame().subscribe(data => {
          if(data.success==true){
            this.credit = data['credit'];
          }
        });
      } 
  }