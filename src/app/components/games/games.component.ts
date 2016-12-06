import { GamesService } from './../../services/games.service';
import { Component, OnInit } from '@angular/core';
import { Game } from './../../class/game';
import { Router } from '@angular/router';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  game = new Game('','','','','',[],[],'',[],[],''); 
  gameSelected = new Game('','','','','',[],[],'',[],[],''); 
  games: Game[]; 
   
  constructor( 
      private gameService: GamesService, 
      private router: Router 
  ) { }

  ngOnInit() {
    //this.gameServices.findAll();
    this.gameService.findAll().then((dataJson) => { 
      console.log(dataJson); 
      this.games= dataJson; 
    }).catch((err) => { 
      console.log(err); 
    }); 
  }

  selectGame(game: Game) { 
    $('#myModal').modal('show'); 
    this.gameSelected = game; 
    console.log(game); 
    console.log(this.gameSelected); 
  } 
 
  delete() { 
    this.gameService.delete(this.gameSelected._id).then(() => { 
      this.games = this.games.filter(u => u !== this.gameSelected); 
      this.gameSelected = new Game('','','','','',[],[],'',[],[],''); 
      $('#myModal').modal('hide'); 
    }).catch((err) => { 
      console.log(err); 
    }); 
  } 
 
  getCoverImage(game) { 
    return `http://localhost:3001${game.imagen}`; 
  } 
}
