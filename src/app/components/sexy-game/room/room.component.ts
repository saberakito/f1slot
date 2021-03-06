import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TodoService } from 'src/app/service/todo.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../../../navbar/navbar.component';
import * as $ from 'jquery';
declare var require: any;
const temp1 = require('./room.component.html');
const temp2 = require('./room.component2.html');
const temp3 = require('./room.component3.html');
@Component({
  selector: 'app-room',
  templateUrl: temp1+temp2+temp3,
  styleUrls: ['./room.component.css']
})
export class RoomComponentSexy implements OnInit {
  @Output() credit = new EventEmitter<string>();
  public navItems = NavbarComponent;
  constructor(private router:Router,private route:ActivatedRoute,private TodoService:TodoService) {
    this.sub = this.route.params.subscribe(params => {
      this.id2 =  params['id'];
      this.logic_id = params['logic_id'];
     

      // set theme and call game
      this.TodoService.getSettingWebTheme('3').subscribe(data => {
        this.theme = data.data['website_description'];
        var obj = $('[class*="temp"]');
        var obj_view;
        for(var i=0;i<obj.length;i++){
          if($(obj[i]).attr('class')!=this.theme){
            $('.'+$(obj[i]).attr('class')).remove();
          }else{
            obj_view = $(obj[i]).attr('class');
          }
        }
        $('.'+obj_view).css('display','inline');
        this.getData(this.id2); 
        this.getResutl(this.id2); 
        this.getPredict(this.id2); 
      })


      this.id = setInterval(() => {
        this.getData(this.id2);
        
      }, 5000);
    });
  }
  data_game:any;
  id:any;
  id2:any;
  sub:any;
  data_array:any;
  themp_data:any;
  first_step:any = 1;
  list_result:any;
  predict:any;
  step:any = 0;
  percent:any;
  step_type:any;
  percent_t_result:any =0;
  percent_b_result:any =0;
  percent_p_result:any =0;
  
  logic_id:any;
  objNewGame:any;
  objOldGame:any;
  cardGame:any;
  sumResult:any;
  sumWin:any;
  sumLose:any;
  percentWin:any;
  percentLose:any;
  getPredict(id){
    this.TodoService.getPredict(id,'sexygame',this.logic_id).subscribe(data => {
    if(data.result.p_predict!=null){
      this.predict = data.result.p_predict;
    }
     this.percent = data.percent;
      this.step = data.result.p_win_step;
      this.step_type = data.result.p_type;
     
      
    });
  }
  getResutl(id){
    this.TodoService.getResultGame(id,'sexygame',this.logic_id).subscribe(data => {
     console.log(data);
      this.list_result = data.result;
      this.sumResult = data.result.length;
      this.sumWin = parseInt(data.result[0].countWin);
      this.sumLose = parseInt(data.result[0].countLose);
      this.percentWin = (parseInt(this.sumWin) * 100) / this.sumResult;
      this.percentWin = parseFloat(this.percentWin).toFixed(2);

      this.percentLose = (parseInt(this.sumLose) * 100) / this.sumResult;
      this.percentLose = parseFloat(this.percentLose).toFixed(2);
    });
  }

  search(nameKey, myArray){
      for (var i=0; i < myArray.length; i++) {
          if (myArray[i].room_id == nameKey) {
              return myArray[i];
          }
      }
  }

  card1:any;
  card2:any;
  card3:any;
  card4:any;
  card5:any;
  card6:any;
  getData(id){
    this.TodoService.getDataGameBacala(this.logic_id).subscribe(data => {
      


      var resultObject = this.search(id, data['sexy_game']);
      console.log(resultObject);
    //console.log(resultObject);
      //reset predict
      // if(resultObject['b_data']==null||resultObject['b_data']==''){
      //   this.deletePredic();
      // }
      // //*  ทำนาย  *//
      // this.data_game = resultObject;
      // this.objNewGame = resultObject['b_data'];
      // //debugger;
      // if(this.objOldGame!=null){
      //   if(this.objOldGame!=this.objNewGame){
      //     //debugger;
      //     this.createPredic();
          
      //   }
      // }
      // //*  ทำนาย  *//
      this.data_game = resultObject;
      this.objOldGame = resultObject['b_data'];
     // debugger;
      this.card1 = this.data_game.card1;
      this.card2 = this.data_game.card2;
      this.card3 = this.data_game.card3;
      this.card4 = this.data_game.card4;
      this.card5 = this.data_game.card5;
      this.card6 = this.data_game.card6;
      if(this.data_game['b_data']==""&&this.first_step == 2){
        //reset table
        location.reload();
      }
      if(this.themp_data != this.data_game['b_data']&&this.first_step != 1){
        this.percent_t_result = (this.data_game.count_t*100/this.data_game.allresult).toFixed(0);
        this.percent_b_result = (this.data_game.count_b*100/this.data_game.allresult).toFixed(0);
        this.percent_p_result = (this.data_game.count_p*100/this.data_game.allresult).toFixed(0);
        if(this.percent_t_result=='NaN'){
          this.percent_t_result =0;
        }
        if(this.percent_b_result=='NaN'){
          this.percent_b_result =0;
        }
        if(this.percent_p_result=='NaN'){
          this.percent_p_result =0;
        }
        var data_old = this.themp_data;
        var data_new = this.data_game['b_data'];
        var dataInsertToTable = data_new.split(data_old);
        this.betStat(dataInsertToTable[1],id);
        this.creditDelete();
        this.themp_data = this.data_game['b_data'];
      }else if(this.first_step == 1){
        this.percent_t_result = (this.data_game.count_t*100/this.data_game.allresult).toFixed(0);
        this.percent_b_result = (this.data_game.count_b*100/this.data_game.allresult).toFixed(0);
        this.percent_p_result = (this.data_game.count_p*100/this.data_game.allresult).toFixed(0);
        if(this.percent_t_result=='NaN'){
          this.percent_t_result =0;
        }
        if(this.percent_b_result=='NaN'){
          this.percent_b_result =0;
        }
        if(this.percent_p_result=='NaN'){
          this.percent_p_result =0;
        }
        this.themp_data = this.data_game['b_data'];
        var array_result = this.data_game['b_data'].split("");
        for(var i = 0; i<array_result.length;i++){
          this.betStat(array_result[i],id);
        }
        if(array_result.length!=0){
          this.first_step = 2;
        }
        
      }
      
    })
  }

  

  
  theme:any;
  ngOnInit() {
    
    // $('.temp1').remove();
    // $('.temp3').remove();
    // $('.temp2').css('display','inline');
   
    
    if(localStorage.getItem("login")!="success"&&localStorage.getItem("data_member")==null){
      this.router.navigate(['/login']);
    }

    
    
  }

  ngOnDestroy() {
    if (this.id) {
      clearInterval(this.id);
    }
  }
  public indexTd = 0;
  public indexTr = 1;
  public arrayTr:[];
  public indexTrTd = [];
  public countingBet = 0;
  counting_p:any;
  percent_p:any;
  percent_t:any;
  counting_t:any;
  percent_b:any;
  counting_b:any;
  
  result_bet(data){
    //$('.img_result_area').addClass('animate__rubberBand');
    $('.result_area').css('display','block');
    $('.img_result_area').attr('src','/assets/images/content/'+data+'.png');
    setTimeout(function(){
      //$('.img_result_area').removeClass('animate__rubberBand');
      $('.result_area').fadeOut();
    },2000)
  }

  betStat(data_type,id){
        this.countingBet++;
        if(data_type=='P'){
          this.result_bet('p');
          $($($('.tr'+this.indexTr).find('td')[this.indexTd]).find('div')[0]).html('<img style="margin-top: 10%;width: 80%;" src="/assets/images/content/p.png" class="img-fluid d-block mx-auto">');
        // $($('.tr'+this.indexTr).find('td')[this.indexTd]).html('<div class="chips_player" style="background-image: url(/assets/images/icon/P.png); background-size: 30px 30px; width:30px;height:30px; margin: 4px;">&nbsp;</div>');
          $($($('.tr'+this.indexTr).find('td')[this.indexTd]).find('div')[0]).select();
          this.counting_p++;
        // this.percent_p = (this.countingBet/100)*this.counting_p;

          this.percent_p = (1/((this.countingBet/100)/this.counting_p)).toFixed(0);
          this.percent_t = (1/((this.countingBet/100)/this.counting_t)).toFixed(0);
          this.percent_b = (1/((this.countingBet/100)/this.counting_b)).toFixed(0);
          
        }else if(data_type=='T'){
          this.result_bet('t');
          $($($('.tr'+this.indexTr).find('td')[this.indexTd]).find('div')[0]).html('<img style="margin-top: 10%;width: 80%;" src="/assets/images/content/t.png" class="img-fluid d-block mx-auto">');
          //$($('.tr'+this.indexTr).find('td')[this.indexTd]).html('<div class="chips_banker" style="background-image: url(/assets/images/icon/T.png); width:30px;height:30px;   background-size: 30px 30px;  margin: 4px;">&nbsp;</div>');
          $($($('.tr'+this.indexTr).find('td')[this.indexTd]).find('div')[0]).select();
          this.counting_t++;

          this.percent_p = (1/((this.countingBet/100)/this.counting_p)).toFixed(0);
          this.percent_t = (1/((this.countingBet/100)/this.counting_t)).toFixed(0);
          this.percent_b = (1/((this.countingBet/100)/this.counting_b)).toFixed(0);
        }else if(data_type=='B'){
          this.result_bet('b');
          $('.img_result_area').attr('src','/assets/images/content/b.png');
          $($($('.tr'+this.indexTr).find('td')[this.indexTd]).find('div')[0]).html('<img style="margin-top: 10%;width: 80%;" src="/assets/images/content/b.png" class="img-fluid d-block mx-auto">');
          //$($('.tr'+this.indexTr).find('td')[this.indexTd]).html('<div class="chips_tie" style="background-image: url(/assets/images/icon/B.png); width:30px;height:30px;  background-size: 30px 30px;  margin: 4px;">&nbsp;</div>');
         $($($('.tr'+this.indexTr).find('td')[this.indexTd]).find('div')[0]).select();
          this.counting_b++;
          this.percent_p = (1/((this.countingBet/100)/this.counting_p)).toFixed(0);
          this.percent_t = (1/((this.countingBet/100)/this.counting_t)).toFixed(0);
          this.percent_b = (1/((this.countingBet/100)/this.counting_b)).toFixed(0);
        }
        if(this.indexTrTd[this.indexTr]==null&&this.indexTd!=1){
          this.indexTrTd[this.indexTr] = [];
          this.indexTrTd[this.indexTr]  = this.indexTd;
          this.indexTd = 0;
        }else{
          this.indexTrTd[this.indexTr]  = this.indexTd;
        }
        this.indexTr++;
        if(this.indexTr==7){
          this.indexTr = 1;
          this.indexTd ++;
        }
        if(this.indexTd==12){
          this.indexTd = 0;
        }
        this.getResutl(id); 
        this.getPredict(this.id2); 
        
  }

  creditDelete(){
    this.TodoService.deleteCreditGame().subscribe(data => {
      this.getCredit();
    });
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
}
