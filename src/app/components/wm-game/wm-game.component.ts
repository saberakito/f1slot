import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TodoService } from 'src/app/service/todo.service';
declare var toggleMenuFomular;
const temp1 = require('./wm-game.component.html');
const temp2 = require('./wm-game2.component.html');
const temp3 = require('./wm-game3.component.html');
@Component({
  selector: 'app-wm-game',
  templateUrl: temp1+temp2+temp3,
  styleUrls: ['./wm-game.component.css']
})

export class WmGameComponent implements OnInit {
  array_name_logic:any;
  constructor(private router:Router,private TodoService:TodoService) { 
    setInterval(() => {
      this.now = new Date();
      //this.getData();
    }, 4);
    this.getData(); 
    this.id = setInterval(() => {
      this.getData(); 
    }, 5000);
  }
    css_game:any;
    data_game:any;
    time: Date;
    now:any;
    id:any;
    new_select_logic:any=1;
    urlborder:any;
    getData(){
      this.TodoService.getDataGameBacala(this.new_select_logic).subscribe(data => {
        debugger;
        this.data_game = data.wmcasino;
      })
    }
    ngOnInit() {
      $(".temp2").remove();
      $(".temp3").remove();
      if(localStorage.getItem("login")!="success"&&localStorage.getItem("data_member")==null){
        this.router.navigate(['/login']);
      }

      this.TodoService.getSettingWebBorder('2').subscribe(data => {
        this.urlborder = data['url'];
      });

      // this.TodoService.getDataFormulaDefault().subscribe(data => {
      //   this.new_select_logic = data.data['nl_id'];
      // });
      // this.TodoService.getDataFormula().subscribe(data => {
      //   this.array_name_logic = data.data;
      // });
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          var check_url = event.url.split("/")[1];
          if(check_url=='sa_game'){
            this.css_game = 'nav_bg_sa';
          }else if(check_url=='sexy_game'){
            //this.css_game = 'nav_bg_sexy';
            
          }
          this.css_game = 'nav_bg_sa';
        }
      });
    }
    ngOnDestroy() {
        if (this.id) {
          clearInterval(this.id);
        }
    }

    toggleMenu(){
      toggleMenuFomular();
    }
    selectLogic(e,id){
      for(var i =0;i<=$(".list-group-item").length;i++){
        $($(".list-group-item")[i]).removeClass('active-menu')
      //  $((".list-group-item")[i]).removeClass('active-menu');
      }
      $(e.currentTarget).addClass('active-menu');
      //alert(id);
      this.new_select_logic = id;
      this.TodoService.getDataGameBacala(this.new_select_logic).subscribe(data => {
        this.data_game = data.wmcasino;
      })
    }
  }