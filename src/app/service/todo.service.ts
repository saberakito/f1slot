import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http } from '@angular/http';
import { map,catchError,tap } from 'rxjs/operators';
import { Observable,of} from 'rxjs';
interface registerData{
  success:boolean,
  message:string,
  data:string,
  register_text_detail:string,
  type:string
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http:Http, private http2: HttpClient) { }

private local = window.location.origin;
//private local = "http://localhost";

checkKey(token){
  return this.http.get("http://botmula.com/api/api_check_key.php?token="+token,{}).pipe(map((res)=>res.json()));
}

loggedInStatus = false;
setLoggedIn(value: boolean){
  localStorage.setItem("login", 'success');
  this.loggedInStatus = value;
}
get isLoggedIn(){
  return this.loggedInStatus
}
ValidateUser(username,password){

  return this.http2.post<myData>(this.local+'/api/adjustSlot.php',{ac:'loginMember',username:username,password:password});

//  return this.http2.get<myData>('http://wbox.xyz/apis/memlogin.z?mem_code='+username+'&mem_codeTrans='+password);
 // return this.http2.post<myData>(this.local+'/api/dataAdjustSport.php?ac=loginMember',{username:username,password:password});
// return this.http2.post<myData>(this.local+'/api/dataAdjustSport.php?ac=checkMember',{mem_code:username,mem_codeTrans:password});
}

ValidateUserLink(scode:string){
  // return this.http2.get<myData>('http://wbox.xyz/apis/memlogin.z?mem_code='+username+'&mem_codeTrans='+password+'&fbclid=IwAR25LK6mq1AJT099GRF7TzxAXk1be7eBOcZ1Me-R9yMrhajasm4kM3IYz2w');
  // return this.http2.post<myData>(this.local+'/api/dataAdjustSport.php?ac=loginMember',{username:username,password:password});
  return this.http2.post<myData>(this.local+'/api/adjustSlot.php',{ac:"checkMemberLink",scode:scode});
 }

getDataReward(){
  return this.http.post(this.local+"/api/adjustSlot.php",{ac:"getDataReward"}).pipe(map((res)=>res.json()));
}

getAllGame(){
  
  return this.http.post(this.local+"/api/adjustSlot.php",{ac:"getAllGame"}).pipe(map((res)=>res.json()));
}

getAllDataGame(game_id){
  
  return this.http.post(this.local+"/api/adjustSlot.php",{ac:"getAllDataGame",game_id:game_id}).pipe(map((res)=>res.json()));
}

showJackpot(gd_g_id){
  
  return this.http.post(this.local+"/api/adjustSlot.php",{ac:"showJackpot",gd_g_id:gd_g_id}).pipe(map((res)=>res.json()));
}

updateJackpot(data){
  
  return this.http.post(this.local+"/api/adjustSlot.php",{ac:"updateJackpot",data:data}).pipe(map((res)=>res.json()));
}

addPercent(){
  
  return this.http.post(this.local+"/api/cronjob_slot.php",{ac:"addPercent"});
}

deleteCreditGameSlot(){
  if(JSON.parse(localStorage.getItem('data_member'))!=null){
    var member_id = JSON.parse(localStorage.getItem('data_member')).member_id;
  }
  return this.http2.post<myData>(this.local+'/api/adjustSlot.php',{ac:"deleteCreditGame",member_id:member_id});
}
getCreditGameSlot(){
  if(JSON.parse(localStorage.getItem('data_member'))!=null){
    var member_id = JSON.parse(localStorage.getItem('data_member')).member_id;
  }
  return this.http2.post<myData>(this.local+'/api/adjustSlot.php',{ac:"getCreditGame",member_id:member_id});
}
updateCreditGameSlot(data){
  if(JSON.parse(localStorage.getItem('data_member'))!=null){
    var member_id = JSON.parse(localStorage.getItem('data_member')).member_id;
  }
  return this.http2.post<myData>(this.local+'/api/adjustSlot.php',{ac:"updateCreditGame",data:data,member_id:member_id});
}



getSettingWebToken(type){
  if(JSON.parse(sessionStorage.getItem('data_token'))!=null){
    var member_id = JSON.parse(sessionStorage.getItem('data_token')).member_id;
  }
  return this.http2.post<myData>(this.local+'/api/adjustBarcara.php',{ac:"getSettingWebToken",type:type,m_id:member_id});
}


getSettingWeb(type){
  if(JSON.parse(localStorage.getItem('data_member'))!=null){
    var member_id = JSON.parse(localStorage.getItem('data_member')).member_id;
  }
  return this.http2.post<myData>(this.local+'/api/adjustBarcara.php',{ac:"getSettingWeb",type:type,m_id:member_id});
}

getSettingWebBorder(type){
  if(JSON.parse(localStorage.getItem('data_member'))!=null){
    var member_id = JSON.parse(localStorage.getItem('data_member')).member_id;
  }
  return this.http2.post<myData>(this.local+'/api/adjustBarcara.php',{ac:"getSettingWebBorderFront",type:type,m_id:member_id});
}

getSettingWebTheme(type){
  if(JSON.parse(localStorage.getItem('data_member'))!=null){
    var member_id = JSON.parse(localStorage.getItem('data_member')).member_id;
  }
  return this.http2.post<myData>(this.local+'/api/adjustBarcara.php',{ac:"getSettingWebThemeFront",type:type,m_id:member_id});
}


getDataFormula(){
  if(JSON.parse(localStorage.getItem('data_member'))!=null){
    var m_id = JSON.parse(localStorage.getItem('data_member')).member_id;
  }
  return this.http.post(this.local+"/api/adjustBarcara.php",{ac:'getDataFormula',m_id:m_id}).pipe(map((res)=>res.json()));
}

getDataFormulaDefault(){
  if(JSON.parse(localStorage.getItem('data_member'))!=null){
    var m_id = JSON.parse(localStorage.getItem('data_member')).member_id;
  }
  return this.http.post(this.local+"/api/adjustBarcara.php",{ac:'getDataFormulaDefault',m_id:m_id}).pipe(map((res)=>res.json()));
}


getDataGameBacala(logic){
  
  return this.http.get(this.local+"/api/api_get_data.php?logic_id="+logic,{}).pipe(map((res)=>res.json()));
}

getResultGame(roomId,typecasino,logic_id:any=1){
  return this.http.post(this.local+"/api/api_get_result.php",{ac:'getResultGame',roomId:roomId,typecasino:typecasino,logic_id:logic_id}).pipe(map((res)=>res.json()));
}

getPredict(roomId,typecasino,logic_id:any=1){
  return this.http.post(this.local+"/api/api_get_predict.php",{ac:'getPredict',roomId:roomId,typecasino:typecasino,logic_id:logic_id}).pipe(map((res)=>res.json()));
}

createPredictService(game_type,room_id,bet_data,card_data){
  if(JSON.parse(localStorage.getItem('data_member'))!=null){
    var member_id = JSON.parse(localStorage.getItem('data_member')).member_id;
  }
  return this.http2.post<myData>(this.local+'/api/adjustBarcara.php',{ac:"createPredictService",game_type:game_type,room_id:room_id,bet_data:bet_data,card_data:card_data,m_id:member_id});
}

deletePredictService(game_type,room_id,bet_data,card_data){
  if(JSON.parse(localStorage.getItem('data_member'))!=null){
    var member_id = JSON.parse(localStorage.getItem('data_member')).member_id;
  }
  return this.http2.post<myData>(this.local+'/api/adjustBarcara.php',{ac:"deletePredictService",game_type:game_type,room_id:room_id,bet_data:bet_data,card_data:card_data,m_id:member_id});
}



updateCreditGame(data){
  if(JSON.parse(localStorage.getItem('data_member'))!=null){
    var member_id = JSON.parse(localStorage.getItem('data_member')).member_id;
  }
  return this.http2.post<myData>(this.local+'/api/adjustBarcara.php',{ac:"updateCreditGame",data:data,member_id:member_id});
}

getCreditGame(){
  if(JSON.parse(localStorage.getItem('data_member'))!=null){
    var member_id = JSON.parse(localStorage.getItem('data_member')).member_id;
  }
  return this.http2.post<myData>(this.local+'/api/adjustBarcara.php',{ac:"getCreditGame",member_id:member_id});
}








getContactText(){
  // return this.http.post<adjustpageData>(this.host_config+'/api/dataAdjust.php',{ac:"saveAdjustPage",data:data});
  return this.http2.post<myData>(this.local+'/api/dataAdjustSport.php',{ac:"getDataContact"});
 }

getDataAds(){
    
  return this.http.post(this.local+"/api/dataAdjustSport.php",{ac:"getDataAds"}).pipe(map((res)=>res.json()));
}
getSettingWebAdsLink(){
  if(JSON.parse(localStorage.getItem('data'))!=null){
    var member_id = JSON.parse(localStorage.getItem('data')).member_id;
  }
  return this.http2.post<myData>(this.local+'/api/dataAdjustSport.php',{ac:"getSettingWebLinkAds",type:'3',m_id:member_id});
}


checkToken(){
  const httpOptions = {
    headers: new HttpHeaders({
       
        'Authorization':localStorage.getItem("token_key")
      })
    };
    return this.http2.post<myData>(this.local+'/api/dataAdjustSport.php', {ac:'checkToken'}, httpOptions).pipe(tap(stat => stat),
      catchError(this.handleError<myData>('stats')));
    
}

  getTodoList(data){
    if(data==1){
      return this.http.get(this.local+"/api/getNews.php?type=1&ac=all").pipe(map((res)=>res.json()));
    }else{
      return this.http.get(this.local+"/api/getNews.php?type=1").pipe(map((res)=>res.json()));
    }
  }
  
  getTextPromotion(){
    return this.http.post(this.local+"/api/dataAdjust.php",{ac:"getPromotion",type:2}).pipe(map((res)=>res.json()));
  }


  getDataListReward(){
    if(JSON.parse(localStorage.getItem('data'))!=null){
      var member_id = JSON.parse(localStorage.getItem('data')).member_id;
    }
    
    return this.http.post(this.local+"/api/dataAdjustSport.php",{ac:"getDataListReward",m_id:member_id}).pipe(map((res)=>res.json()));
  }

  getDataGame2(data){
    return this.http.post(this.local+"/api/dataAdjustSport.php",{ac:"getDataGameZean",member_id:data}).pipe(map((res)=>res.json()));
  }
  
  getSeason(){
    return this.http2.post<season>(this.local+'/api/dataAdjustSport.php',{ac:"getSeasonForGame"});
  }
  
  getAllSeason(){
    return this.http2.post<season>(this.local+'/api/dataAdjustSport.php',{ac:"getAllSeason"});
  }

  getGameArray(m_id){
    if(JSON.parse(localStorage.getItem('data'))!=null){
      var member_id = JSON.parse(localStorage.getItem('data')).member_id;
    }
    
    return this.http.post(this.local+"/api/dataAdjustSport.php",{ac:"getGameArray",m_id:m_id}).pipe(map((res)=>res.json()));
  }

  getGameArray_Form_id(ss_id,m_id){

    return this.http.post(this.local+"/api/dataAdjustSport.php",{ac:"getGameArray_Form_id",m_id:m_id,ss_id:ss_id}).pipe(map((res)=>res.json()));
  }
  
  getDataGameAllMem(){
    if(JSON.parse(localStorage.getItem('data'))!=null){
      var member_id = JSON.parse(localStorage.getItem('data')).member_id;
    }
    
    return this.http.post(this.local+"/api/dataAdjustSport.php",{ac:"getDataGameAllMem",m_id:member_id}).pipe(map((res)=>res.json()));
  }


  getDataGameAllMemBySeason(data){
    if(JSON.parse(localStorage.getItem('data'))!=null){
      var member_id = JSON.parse(localStorage.getItem('data')).member_id;
    }
    
    return this.http.post(this.local+"/api/dataAdjustSport.php",{ac:"getDataGameAllMemBySeason",m_id:member_id,ss_id:data}).pipe(map((res)=>res.json()));
  }

  getDataMember(m_id){
    if(JSON.parse(localStorage.getItem('data'))!=null){
      var member_id = JSON.parse(localStorage.getItem('data')).member_id;
    }
    
    return this.http.post(this.local+"/api/dataAdjustSport.php",{ac:"getDataMember",m_id:m_id}).pipe(map((res)=>res.json()));
  }
  getSummary(m_id){
    if(JSON.parse(localStorage.getItem('data'))!=null){
      var member_id = JSON.parse(localStorage.getItem('data')).member_id;
    }
    
    return this.http.post(this.local+"/api/dataAdjustSport.php",{ac:"getSummary",m_id:m_id}).pipe(map((res)=>res.json()));
  }
  
  saveNickName(nickname){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
          'Authorization':localStorage.getItem("token_key")
        })
      };
     
      return this.http2.post<myData>(this.local+'/api/dataAdjustSport.php', {ac:'saveNickName',nickname:nickname}, httpOptions).pipe(tap(stat => stat),
      catchError(this.getDataError<myData>('stats')));
  }
  saveGame(hd_id,team_win){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
          'Authorization':localStorage.getItem("token_key")
        })
      };
     
      return this.http2.post<myData>(this.local+'/api/dataAdjustSport.php', {ac:'saveGame',hd_id:hd_id,team_win:team_win}, httpOptions).pipe(tap(stat => stat),
      catchError(this.getDataError<myData>('stats')));
  }
  getGame(){
    const httpOptions = {
      headers: new HttpHeaders({
          'Authorization':localStorage.getItem("token_key")
        })
      };
     
      return this.http2.post<myData>(this.local+'/api/dataAdjustSport.php', {ac:'getGame'}, httpOptions).pipe(tap(stat => stat),
      catchError(this.getDataError<myData>('stats')));


    //return this.http2.post<contactData>(this.local+'/api/dataAdjustSport.php',{ac:"getGame"});
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      localStorage.clear();
      window.location.reload();
      // console.error(error);   
      // console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
   
  private getDataError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
     
      return of(result as T);
    };
  }











  getCredit(member_id){
    //return this.httpjson.post('http://localhost:4800',{ac:"getMember"}).pipe(map((res)=>res.json()));
    return this.http.post(this.local+'/api/bacara/dataAdjustBar.php',{ac:"getCredit",member_id:member_id}).pipe(map((res)=>res.json()));
  }
  getHandicap(){
    //return this.httpjson.post('http://localhost:4800',{ac:"getMember"}).pipe(map((res)=>res.json()));
    return this.http.post(this.local+'/api/dataAdjustSport.php',{ac:"getHandicap"}).pipe(map((res)=>res.json()));
  }
  getHandicap_result_from_date(date){
      
    //return this.httpjson.post('http://localhost:4800',{ac:"getMember"}).pipe(map((res)=>res.json()));
    return this.http.post(this.local+'/api/dataAdjustSport.php',{ac:"getHandicap_result_from_date",date:date}).pipe(map((res)=>res.json()));
  }
  getHandicap_member_id(member_id){
    //return this.httpjson.post('http://localhost:4800',{ac:"getMember"}).pipe(map((res)=>res.json()));
    return this.http.post(this.local+'/api/dataAdjustSport.php',{ac:"getHandicap_member",member_id:member_id}).pipe(map((res)=>res.json()));
  }
  getHandicap_tded_yesterday(){
    //return this.httpjson.post('http://localhost:4800',{ac:"getMember"}).pipe(map((res)=>res.json()));
    return this.http.post(this.local+'/api/dataAdjustSport.php',{ac:"getHandicap_tded_yesterday"}).pipe(map((res)=>res.json()));
  }

  getHandicap_tded_report(){
    //return this.httpjson.post('http://localhost:4800',{ac:"getMember"}).pipe(map((res)=>res.json()));
    return this.http.post(this.local+'/api/dataAdjustSport.php',{ac:"getHandicap_tded_report"}).pipe(map((res)=>res.json()));
  }

  getHandicap_tded_report_selcet(tded_yeaer,tded_month){
    //return this.httpjson.post('http://localhost:4800',{ac:"getMember"}).pipe(map((res)=>res.json()));
    return this.http.post(this.local+'/api/dataAdjustSport.php',{ac:"getHandicap_tded_report_selcet",tded_yeaer:tded_yeaer,tded_month:tded_month}).pipe(map((res)=>res.json()));
  }
  

  getHandicap_tded(member_id){
    //return this.httpjson.post('http://localhost:4800',{ac:"getMember"}).pipe(map((res)=>res.json()));
    return this.http.post(this.local+'/api/dataAdjustSport.php',{ac:"getHandicap_tded",member_id:member_id}).pipe(map((res)=>res.json()));
  }


  getHandicap_by_id(member_id,id){
    //return this.httpjson.post('http://localhost:4800',{ac:"getMember"}).pipe(map((res)=>res.json()));
    return this.http.post(this.local+'/api/dataAdjustSport.php',{ac:"getHandicap_by_id",member_id:member_id,id:id}).pipe(map((res)=>res.json()));
  }


  getHandicap_game(member_id){
    //return this.httpjson.post('http://localhost:4800',{ac:"getMember"}).pipe(map((res)=>res.json()));
    return this.http.post(this.local+'/api/dataAdjustSport.php',{ac:"getHandicap_game",member_id:member_id}).pipe(map((res)=>res.json()));
  }

  getHandicap_game_step(member_id){
    //return this.httpjson.post('http://localhost:4800',{ac:"getMember"}).pipe(map((res)=>res.json()));
    return this.http.post(this.local+'/api/dataAdjustSport.php',{ac:"getHandicap_game_step",member_id:member_id}).pipe(map((res)=>res.json()));
  }

  getHandicap_game_score(member_id){
    //return this.httpjson.post('http://localhost:4800',{ac:"getMember"}).pipe(map((res)=>res.json()));
    return this.http.post(this.local+'/api/dataAdjustSport.php',{ac:"getHandicap_game_score",member_id:member_id}).pipe(map((res)=>res.json()));
  }

  getHandicap_game_play(member_id){
    //return this.httpjson.post('http://localhost:4800',{ac:"getMember"}).pipe(map((res)=>res.json()));
    return this.http.post(this.local+'/api/dataAdjustSport.php',{ac:"getHandicap_game_play",member_id:member_id}).pipe(map((res)=>res.json()));
  }

  getHandicap_game_play_step(member_id){
    //return this.httpjson.post('http://localhost:4800',{ac:"getMember"}).pipe(map((res)=>res.json()));
    return this.http.post(this.local+'/api/dataAdjustSport.php',{ac:"getHandicap_game_play_step",member_id:member_id}).pipe(map((res)=>res.json()));
  }

  get_step(member_id){
    //return this.httpjson.post('http://localhost:4800',{ac:"getMember"}).pipe(map((res)=>res.json()));
    return this.http.post(this.local+'/api/dataAdjustSport.php',{ac:"get_step",member_id:member_id}).pipe(map((res)=>res.json()));
  }

  getHandicapFromDate(data,member_id){
      
    //return this.httpjson.post('http://localhost:4800',{ac:"getMember"}).pipe(map((res)=>res.json()));
    return this.http.post(this.local+'/api/dataAdjustSport.php',{ac:"getHandicapFromDate",date:data,member_id:member_id}).pipe(map((res)=>res.json()));
  }
  getHandicapGraph(){
    //return this.httpjson.post('http://localhost:4800',{ac:"getMember"}).pipe(map((res)=>res.json()));
    return this.http.post(this.local+'/api/dataAdjustSport.php',{ac:"getHandicapGraph"}).pipe(map((res)=>res.json()));
  }

  getDaTaGame(date_start:any=null,date_stop:any=null){
    //return this.httpjson.post('http://localhost:4800',{ac:"getMember"}).pipe(map((res)=>res.json()));
    return this.http.post(this.local+'/api/dataAdjustSport.php',{ac:"getDaTaGame",date_start:date_start,date_stop:date_stop}).pipe(map((res)=>res.json()));
  }

  getDaTaGameScore(date_start:any=null,date_stop:any=null){
    //return this.httpjson.post('http://localhost:4800',{ac:"getMember"}).pipe(map((res)=>res.json()));
    return this.http.post(this.local+'/api/dataAdjustSport.php',{ac:"getDaTaGameScore",date_start:date_start,date_stop:date_stop}).pipe(map((res)=>res.json()));
  }
 
  getDaTaGameSumScore(date_start:any=null,date_stop:any=null){
    //return this.httpjson.post('http://localhost:4800',{ac:"getMember"}).pipe(map((res)=>res.json()));
    return this.http.post(this.local+'/api/dataAdjustSport.php',{ac:"getDaTaGameSumScore",date_start:date_start,date_stop:date_stop}).pipe(map((res)=>res.json()));
  }
  

  saveHandicap(id,member_id){
      
    //return this.httpjson.post('http://localhost:4800',{ac:"getMember"}).pipe(map((res)=>res.json()));
    return this.http2.post<myData>(this.local+'/api/dataAdjustSport.php',{ac:"saveHandicap",hd_id:id,member_id:member_id});
  }

  saveHandicapScore(member_id,hd_id,data_score_home,data_score_away){
    //return this.httpjson.post('http://localhost:4800',{ac:"getMember"}).pipe(map((res)=>res.json()));
    return this.http2.post<myData>(this.local+'/api/dataAdjustSport.php',{ac:"saveHandicapScore",hd_id:hd_id,member_id:member_id,data_score_home:data_score_home,data_score_away:data_score_away});
  }

  saveHandicapSumScore(member_id,hd_id,data_sum_score){
    //return this.httpjson.post('http://localhost:4800',{ac:"getMember"}).pipe(map((res)=>res.json()));
    return this.http2.post<myData>(this.local+'/api/dataAdjustSport.php',{ac:"saveHandicapSumScore",hd_id:hd_id,member_id:member_id,data_sum_score:data_sum_score});
  }

  saveDataGame(m_id,data){
      
    //return this.httpjson.post('http://localhost:4800',{ac:"getMember"}).pipe(map((res)=>res.json()));
    return this.http2.post<myData>(this.local+'/api/dataAdjustSport.php',{ac:"saveDataGame",m_id:m_id,data:data});
  }

  saveDataGame_step(m_id,data){ // old_calDataGame_step
      
    //return this.httpjson.post('http://localhost:4800',{ac:"getMember"}).pipe(map((res)=>res.json()));
    return this.http2.post<myData>(this.local+'/api/dataAdjustSport.php',{ac:"saveDataGame_step",m_id:m_id,data:data});
  }

  setGameSelect(hd_id){
      
    //return this.httpjson.post('http://localhost:4800',{ac:"getMember"}).pipe(map((res)=>res.json()));
    return this.http2.post<myData>(this.local+'/api/dataAdjustSport.php',{ac:"setGameSelect",hd_id:hd_id});
  }

  calDataGame_step(m_id,data){
      
    //return this.httpjson.post('http://localhost:4800',{ac:"getMember"}).pipe(map((res)=>res.json()));
    return this.http2.post<myData>(this.local+'/api/dataAdjustSport.php',{ac:"calDataGame_step",m_id:m_id,data:data});
  }


  getDataGame(m_id){
    //return this.httpjson.post('http://localhost:4800',{ac:"getMember"}).pipe(map((res)=>res.json()));
    return this.http.post(this.local+'/api/dataAdjustSport.php',{ac:"getDataGame",m_id:m_id}).pipe(map((res)=>res.json()));
  }


  

  saveMember(member_code,member_code_tran){
      
    //return this.httpjson.post('http://localhost:4800',{ac:"getMember"}).pipe(map((res)=>res.json()));
    return this.http2.post<myData>(this.local+'/api/dataAdjustSport.php',{ac:"saveMember",member_code:member_code,member_code_tran:member_code_tran});
  }

  autoLogin(scode){
      
    //return this.httpjson.post('http://localhost:4800',{ac:"getMember"}).pipe(map((res)=>res.json()));
    return this.http2.post<myData>(this.local+'/api/dataAdjustSport.php',{ac:"autoLogin",scode:scode});
  }

  getChart(){
      
    //return this.httpjson.post('http://localhost:4800',{ac:"getMember"}).pipe(map((res)=>res.json()));
    return true;
  }

  updateCredit(member_code,member_code_tran){
    return this.http2.post<myData>(this.local+'/api/dataAdjustSport.php?ac=updateCredit',{mem_code:member_code,mem_codeTrans:member_code_tran});
  }
  updateCreditSave(member_code,member_code_tran,object){
    return this.http2.post<myData>(this.local+'/api/dataAdjustSport.php?ac=updateCreditSave',{mem_code:member_code,mem_codeTrans:member_code_tran,creditArray:object});
  }

  getDateGame_played(m_id){
    //return this.httpjson.post('http://localhost:4800',{ac:"getMember"}).pipe(map((res)=>res.json()));
    return this.http.post(this.local+'/api/dataAdjustSport.php',{ac:"getDateGame_played",m_id:m_id}).pipe(map((res)=>res.json()));
  }

  getDateGameScore_played(m_id){
    //return this.httpjson.post('http://localhost:4800',{ac:"getMember"}).pipe(map((res)=>res.json()));
    return this.http.post(this.local+'/api/dataAdjustSport.php',{ac:"getDateGameScore_played",m_id:m_id}).pipe(map((res)=>res.json()));
  }

  getDateGameSumScore_played(m_id){
    //return this.httpjson.post('http://localhost:4800',{ac:"getMember"}).pipe(map((res)=>res.json()));
    return this.http.post(this.local+'/api/dataAdjustSport.php',{ac:"getDateGameSumScore_played",m_id:m_id}).pipe(map((res)=>res.json()));
  }

  check_play(m_id){
    //return this.httpjson.post('http://localhost:4800',{ac:"getMember"}).pipe(map((res)=>res.json()));
    return this.http.post(this.local+'/api/dataAdjustSport.php',{ac:"check_play",m_id:m_id}).pipe(map((res)=>res.json()));
  }

  check_play_step(m_id){
    //return this.httpjson.post('http://localhost:4800',{ac:"getMember"}).pipe(map((res)=>res.json()));
    return this.http.post(this.local+'/api/dataAdjustSport.php',{ac:"check_play_step",m_id:m_id}).pipe(map((res)=>res.json()));
  }
  checkWinGame(m_id,date){
    //return this.httpjson.post('http://localhost:4800',{ac:"getMember"}).pipe(map((res)=>res.json()));
    return this.http.post(this.local+'/api/dataAdjustSport.php',{ac:"checkWinGame",m_id:m_id,date_data:date}).pipe(map((res)=>res.json()));
  }











  setLoggedInRubsub(value: boolean){
    localStorage.setItem("login_rubsub", 'success');
    this.loggedInStatus = value;
  }
  loginRubsub(username,password){
   return this.http2.post<myData>(this.local+'/api/dataAdjustSport.php',{ac:'loginRubsub',username:username,password:password});
  }

  registerRubSub(form){
    if(JSON.parse(localStorage.getItem('data_member'))!=null){
      var member_code = JSON.parse(localStorage.getItem('data_member')).member_code;
    }
    return this.http2.post<myData>(this.local+'/api/dataAdjustSport.php',{ac:"saveRubSub",data:form,a_link_username:member_code});
  }

  getRubSub(){
    if(JSON.parse(localStorage.getItem('data_member'))!=null){
      var member_code = JSON.parse(localStorage.getItem('data_member')).member_code;
    }
    return this.http2.post<myData>(this.local+'/api/dataAdjustSport.php',{ac:"getRubSub",a_link_username:member_code});
  }


  getClick(id){
    return this.http2.post<myData>(this.local+'/api/dataAdjustSport.php',{ac:"getClick",id:id});
  }
  updateClick(id){
    return this.http2.post<myData>(this.local+'/api/dataAdjustSport.php',{ac:"updateClick",id:id});
  }



  
}
interface myData{
  data:string,
  success:any,
  message:string,
  result:any
}
interface contactData{
  success:boolean,
  message:string,
  data:string,
  contact_text_detail:string,
  type:string
}

interface season{
  data:any,
  ss_id:any,
  ss_name:any,
  ss_date_start:any,
  ss_date_stop:any,
}