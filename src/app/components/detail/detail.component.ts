import { PrestamoService } from './../../services/prestamo.service';
import { CopyService } from './../../services/copy.service';
import { GamesService } from './../../services/games.service';
import { UserService } from './../../services/user.service';

import { Copia } from './../../class/copia';
import { User } from './../../class/user';
import { Game } from './../../class/game';
import { Prestamo } from './../../class/prestamo';

import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy {
  type: string;
  private sub: any;
  user = new User('', '', '', '', '', '', '', '');
  game = new Game('', '', '', '', '', [], [], '', [], [], '');
  copias: Copia[];
  prestamos : Prestamo[];
  id: string;

  constructor(
    private userServices: UserService,
    private gamesService: GamesService,
    private copyService: CopyService,
    private prestamoService: PrestamoService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.type = params['type'];
      this.id = params['id'];
    });
    switch (this.type) {
      case 'user':
        this.userServices.findById(this.id).then((user) => {
          this.user = user;
          this.prestamoService
            .prestamosByUser(this.user._id)
            .then((doc) => {
              this.prestamos=doc;
            })
            .catch((err) => {
              console.log(err);
            });
        });

        break;
      case 'game':
        this.gamesService.findById(this.id).then((game) => {
          this.game = game;
          this.copyService
            .all(game._id)
            .then((copies) => {
              this.copias = copies;
            }).catch((err) => {

            });
        });
        break;
      default:
        break;
    }

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getImage(user: User) {
    return `http://localhost:3001${this.user.foto}`;
  }

  goBack() {
    this.location.back();
  }

  getCoverImage(game) {
    return `http://localhost:3001${game.imagen}`;
  }
}
