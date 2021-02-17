import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/service/todo.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  constructor( private router:Router,private TodoService:TodoService) {
    // subscribe to router event
    
   }
  url:any;
  ngOnInit() {



    if(localStorage.getItem("login")!="success"&&localStorage.getItem("data_member")==null){
      this.router.navigate(['/login']);
    }
    this.TodoService.getSettingWeb('1').subscribe(data => {
      this.url = data['url'];
    });
   

  }

}
