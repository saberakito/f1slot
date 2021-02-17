import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { TodoService } from 'src/app/service/todo.service';
import { switchMap, map } from 'rxjs/operators';
import { interval } from 'rxjs';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-wmcasino',
  templateUrl: './wmcasino.component.html',
  styleUrls: ['./wmcasino.component.css']
})
export class WmcasinoComponent implements OnInit {
  now:any;
  sub:any;
  formula_id:any = 1;
  constructor(private route:ActivatedRoute,private router:Router,private TodoService:TodoService) { 
    setInterval(() => {
      this.now = new Date();
      //this.getData();
    }, 4);
    this.getData(); 
    //this.id = setInterval(() => {
      this.getData(); 
    //}, 5000);
    this.sub = this.route.params.subscribe(params => {
      this.formula_id =  params['id'];
    });
  }
  css_game:any;
  data_game:any;
  time: Date;
  id:any;
  array_name_logic:any;
  logic_id:any;
  getData(){
    this.TodoService.getDataGameBacala(this.logic_id).subscribe(data => {
      this.data_game = data['wmcasino'];
      
    })
  }
  ngOnInit() {
    if(localStorage.getItem("login")!="success"&&localStorage.getItem("data_member")==null){
      this.router.navigate(['/login']);
    }
    
    // this.TodoService.getDataFormula().subscribe(data => {
    //   this.array_name_logic = data.data;
    // });


    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        var check_url = event.url.split("/")[1];
        if(check_url=='sa_game'){
          this.css_game = 'nav_bg_sa';
        }else if(check_url=='sexy_game'){
          this.css_game = 'nav_bg_sexy';
        }
      }
    });
    // this.data_game = interval(5000).pipe(
    //   switchMap(() => this.TodoService.getDataGameBacala()),    
    //   map(res => res.results)
    //   )
    // interval(10000).subscribe(x =>  this.TodoService.getDataGameBacala().subscribe(data => {
    //   this.data_game = data.sa_game;
    //   console.log(this.data_game);
    // }));
    
  }

  ngOnDestroy() {
    if (this.id) {
      clearInterval(this.id);
    }
  }
  id_logic:any;
  setLogic(id_logic){
    this.id_logic = id_logic;
  }

}

