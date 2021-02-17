import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TodoService } from 'src/app/service/todo.service';
declare var testHoldon,myLoop: any

@Component({
  selector: 'app-select-game',
  templateUrl: './select-game.component.html',
  styleUrls: ['./select-game.component.css']
})

export class SelectGameComponent implements OnInit {
  @ViewChild('closebutton') closebutton;
  array_name_logic:any;
  public test = this.router;
  
  constructor(private elRef:ElementRef,private router:Router,private TodoService:TodoService) { 
    
    setInterval(() => {
      this.now = new Date();
      this.getData();
    }, 4000);
    this.getData(); 
    
  }
    css_game:any;
    data_game:any;
    time: Date;
    now:any;
    id:any;
    new_select_logic:any=1;
    urlborder:any;
    member_credit:any;
    image:any='https://images.unsplash.com/photo-1443890923422-7819ed4101c0?fm=jpg';
    defaultImage:any='https://www.placecage.com/1000/1000';
    data_length:any;
    getData(){
      this.TodoService.getAllGame().subscribe(data => {
        this.data_length = data.data.length;
        this.data_game = data.data;
      })
    }
    logout(){
      window.localStorage.clear();
      localStorage.clear()
      this.router.navigate(['/login']);
    }
    ngAfterViewInit() {
      
      this.TodoService.getAllGame().subscribe(data => {
        
        this.data_game = data.data;
        
        // testHoldon('square-jelly-box','LOADING');
        // $("#holdon-message").html("กำลังเจาะระบบและสแกน Server Slot API <br>");
        // var objText =this.data_game;
        // myLoop(objText);
       //this.myLoop(objText); 
        // for(var i =0;i<objText.length;i++){
        //   setTimeout(function(i){
        //     $("#holdon-message").append("API_"+objText[i].g_name);
        //   },1000,i);
        // }
        

      })
      
    }
  
    
                      //  start the loop
    member_name:any;
    ngOnInit() {
      if(localStorage.data_member!=null){
        var objArray = JSON.parse(localStorage.data_member);
        this.member_name = objArray.member_name+' '+objArray.member_lastname;
      }
      if(localStorage.getItem("login")!="success"&&localStorage.getItem("data_member")==null){
        this.router.navigate(['/login']);
      }else{
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

      this.TodoService.getSettingWebBorder('2').subscribe(data => {
        this.urlborder = data['url'];
      });

      // this.TodoService.getDataFormulaDefault().subscribe(data => {
      //   this.new_select_logic = data.data['nl_id'];
      // });
      // this.TodoService.getDataFormula().subscribe(data => {
      //   this.array_name_logic = data.data;
      // });
     
    }
    
    gotoRoom(data){
      debugger;
      this.test.navigate(['/select_game/room/'+data]);
    }
   public renderGame(data){
      var elRef_set = this.elRef.nativeElement;
      var gotoRoom_set = this.gotoRoom;
      for(var i=0;i<data.length;i++){
        elRef_set.querySelector('#game_'+i).addEventListener('click', gotoRoom_set.bind(this,data[i].g_id));
       // debugger;
        var url_images_game = "http://f1slot888.com/upload/file/"+data[i].pupn_image_filename+"."+data[i].pupn_image_type;
        $('#game_'+i).children().find('.game_text').html(data[i].g_name);
        $('#game_'+i).children().find('img').attr('src',url_images_game);
        //  $("#game_"+i).attr("(click)","gotoRoom("+data.data[i].g_id+")");
      }
      
    }
    counter(i: number) {
        return new Array(i);
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