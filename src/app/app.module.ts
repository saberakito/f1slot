import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';



import { NavbarComponent } from './navbar/navbar.component';
import { MenuComponent } from './components/menu/menu.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';


import { NgImageSliderModule } from 'ng-image-slider';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { TodoService } from './service/todo.service';
import { HttpModule } from '@angular/http';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './service/auth.service';
import { ErrorComponent } from './components/error/error.component';
import { sanitizeHtmlPipe } from './sanitize-html.pipe';
import {SlideshowModule} from 'ng-simple-slideshow';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { LoginComponent } from './components/login/login.component';


import { MDBBootstrapModule } from 'angular-bootstrap-md';
// import { ColorSketchModule } from 'ngx-color/sketch';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';



import { SlickCarouselModule } from 'ngx-slick-carousel';



import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'http://localhost:4444', options: {} };

import { ChartModule } from 'angular2-chartjs';
import {ProgressBarModule} from "angular-progress-bar";
import { GameScoreComponent } from './componenets/game-score/game-score.component';
import { GameSumScoreComponent } from './componenets/game-sum-score/game-sum-score.component';
// import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { LobbyComponent } from './components/lobby/lobby.component';


import { SelectGameComponent } from './components/select-game/select-game.component';
import { RoomComponent } from './components/select-game/room/room.component';

const appRoutes:Routes = [
  
  // {path:"home", component:HomeComponent, canActivate:[AuthGuard]},
  {path:"select_game", component:SelectGameComponent, canActivate:[AuthGuard]},
  {path:"select_game", children:[
  {path:"room/:id", component:RoomComponent, canActivate:[AuthGuard]}
  ]},
  // {path:"sa_game", component:SaGameComponent, canActivate:[AuthGuard]},
  // {path:"sa_game/:id", component:SaGameComponent, canActivate:[AuthGuard]},
  // {path:"sa_game", children:[
  //   {path:"room/:id/:logic_id", component:RoomComponent, canActivate:[AuthGuard]}
  // ]},
  // {path:"sexy_game", component:SexyGameComponent, canActivate:[AuthGuard]},
  // {path:"sexy_game", children:[
  //   {path:"room/:id/:logic_id", component:RoomComponentSexy, canActivate:[AuthGuard]}
  // ]},

  // {path:"wm_game", component:WmGameComponent, canActivate:[AuthGuard]},
  // {path:"wm_game/:id", component:WmGameComponent, canActivate:[AuthGuard]},
  // {path:"wm_game", children:[
  //   {path:"room/:id/:logic_id", component:RoomComponentWa, canActivate:[AuthGuard]}
  // ]},

  // {path:"855_game", component:EightGameComponent, canActivate:[AuthGuard]},
  // {path:"855_game/:id", component:EightGameComponent, canActivate:[AuthGuard]},
  // {path:"855_game", children:[
  //   {path:"room/:id/:logic_id", component:RoomComponentEight, canActivate:[AuthGuard]}
  // ]},

  // {path:"dg_game", component:DgGameComponent, canActivate:[AuthGuard]},
  // {path:"dg_game/:id", component:DgGameComponent, canActivate:[AuthGuard]},
  // {path:"dg_game", children:[
  //   {path:"room/:id/:logic_id", component:RoomComponentDg, canActivate:[AuthGuard]}
  // ]},


  // {path:"gd_game", component:GdGameComponent, canActivate:[AuthGuard]},
  // {path:"gd_game/:id", component:GdGameComponent, canActivate:[AuthGuard]},
  // {path:"gd_game", children:[
  //   {path:"room/:id/:logic_id", component:RoomComponentGd, canActivate:[AuthGuard]}
  // ]},



  {path:"login", component:LoginComponent, canActivate:[AuthGuard]},
 // {path:"lobby", component:LobbyComponent, canActivate:[AuthGuard]},
  { path:"404", component:ErrorComponent },
  { path:"", redirectTo:'/select_game', pathMatch:'full' },
  { path:"**", component:ErrorComponent },
]
@NgModule({
  declarations: [
    ErrorComponent,
    AppComponent,
    RegisterComponent,
    NavbarComponent,
    MenuComponent,
    HomeComponent,
    LoginComponent,
    sanitizeHtmlPipe,
    GameScoreComponent,
    GameSumScoreComponent,
    LobbyComponent,
    SelectGameComponent,
    RoomComponent
  ],
  imports: [
    SocketIoModule.forRoot(config),
    NgbModule.forRoot(),
    NgbTooltipModule,
    TooltipModule,
    BsDropdownModule,
    ModalModule,
    ChartModule,
    ProgressBarModule,
   
    BrowserModule,
    FormsModule,
    // ColorSketchModule,
    MDBBootstrapModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgImageSliderModule,
    HttpModule,
    HttpClientModule,
    NgxPaginationModule,
    SlideshowModule,
    // BsDatepickerModule.forRoot(),
    RouterModule.forRoot(appRoutes,{scrollPositionRestoration: 'enabled'}),
    BrowserAnimationsModule,
    SlickCarouselModule 
  ],
  exports: [ sanitizeHtmlPipe ],
  providers: [TodoService, AuthGuard,AuthService,CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {}
