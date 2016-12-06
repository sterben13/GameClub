import { Game } from './../../class/game';
import { Copia } from './../../class/copia';
import { CopyService } from './../../services/copy.service';
import { User } from './../../class/user';
import { ActivatedRoute } from '@angular/router';
import { GamesService } from './../../services/games.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit, OnDestroy {
  private sub: any; //me permite optener los parametros de la url
  type: string; //tipo de registro y me permite visualizar ciertos bloque de html
  user: User;
  copy: Copia;
  game: Game;
  files: File[]; //variable auxiliar para guardar una file
  image: string = 'http://localhost:3001/public/images/default/user.png'; //variable auxiliar para visualizar una imagen
  update = false;
  estados: string[] = ["ok", "dañado", "perdido", "irreparable"];
  clasificacionesGames = ['RP - Rating Pending', 'EC - Early Childhood ', 'E - Everyone', 'E10+ - Everyone 10+',
    'T - Teen', 'M - Mature', 'AO - Adults Only'];

  constructor(
    private userService: UserService,
    private gamesService: GamesService,
    private copyService: CopyService,
    private route: ActivatedRoute,
    private location: Location
  )
  { }

  ngOnInit() {
    //obtenemos los parametros de la url
    this.sub = this.route.params.subscribe(params => {
      this.type = params['type'];
      switch (this.type) {
        case 'user':
          this.user = new User('', '', '', '', '', this.image, '', '');
          if (params['id']) {
            this.update = true;
            this.userService
              .findById(params['id'])
              .then((user) => {
                this.user = user;
                this.image = `http://localhost:3001${user.foto}`;
              })
              .catch((err) => {
                console.log(err);
              });
          }
          break;

        case 'copy':
          console.log(params['id']);
          this.copy = new Copia(params['id'], this.estados[0], true);
          this.game = new Game('', '', '', '', '', [], [], '', [], [], this.image);
          this.gamesService.findById(params['id']).then((game)=>{
            this.game = game;
            console.log(game);
          }).catch((err)=>{
            console.log(err);
          });
          break;

        case 'game':
          this.game = new Game('', '', '', '', '', [], [], '', [], [], this.image);
          if (params['id']) {
            console.log(params['id']);
            this.update = true;
            this.gamesService
              .findById(params['id'])
              .then((game) => {
                console.log(game);
                this.game = game;
                this.image = `http://localhost:3001${game.imagen}`;
              }).catch((err) => {
                console.log(err);
              });
          }else{
            this.image = 'http://localhost:3001/public/images/default/game.png';
          }
          break;
        default:
          break;
      }
      //checamos si es un vamos a actualizar o crear

    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onChange(event) {
    this.files = event.srcElement.files;
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (e) => {
        this.image = e.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  onSubmitUser(form: NgForm) {
    let data = new FormData();
    data.append('nombre', form.controls['nombre'].value);
    data.append('apellidos', form.controls['apellidos'].value);
    data.append('telefono', form.controls['telefono'].value);
    data.append('direccion', form.controls['direccion'].value);
    data.append('email', form.controls['email'].value);
    data.append('password', form.controls['password'].value);
    console.log(data);
    if (!this.update) {
      if (this.files != null || this.files != undefined) {
        data.append('foto', this.files[0]);
      } else {
        data.append('foto', '/public/images/default/user.png');
      }
      this.userService.create(data).then((user) => {
        this.files = null;
        console.log(user);
        this.goBack();
      }).catch((err) => {
        console.log(err);
      });
    } else {
      if (this.files != null || this.files != undefined) {
        data.append('foto', this.files[0]);
      } else {
        data.append('foto', this.user.foto);
      }
      this.userService
        .update(this.user._id, data)
        .then((user) => {
          this.goBack();
        })
        .catch((err) => {
          console.log(err);
          this.goBack();
        });
    }
  }

  onSubmitCopy(form: NgForm) {
    let json = {}
    json['idGame'] = form.controls['idGame'].value;
    json['estado'] = form.controls['estado'].value;
    json['disponibilidad'] = 'true';
    this.copyService
      .create(json)
      .then((copy) => {
        console.log(copy);
        this.goBack();
      }).catch((err) => {
        console.log(err);
      });
  }

  onSubmitGame(form: NgForm) {
    let data = new FormData();
    data.append('title', form.controls['title'].value);
    data.append('resumen', form.controls['resumen'].value);
    data.append('clasificacion', form.controls['clasificacion'].value);
    data.append('desarrollador', form.controls['desarrollador'].value);
    data.append('plataformas', [form.controls['plataformas'].value]);
    data.append('genero', [form.controls['genero'].value]);
    data.append('modo', [form.controls['modo'].value]);
    if (!this.update) {
      if (this.files != null || this.files != undefined) {
        data.append('imagen', this.files[0]);
      } else {
        data.append('imagen', '/public/images/default/game.png');
      }
      this.gamesService.create(data).then((game) => {
        this.files = null;
        console.log(game);
        this.goBack();
      }).catch((err) => {
        console.log(err);
      });
    } else {
      if (this.files != null || this.files != undefined) {
        data.append('imagen', this.files[0]);
      } else {
        data.append('imagen', this.game.imagen);
      }
      this.gamesService
        .update(this.game._id, data)
        .then((game) => {
          this.goBack();
        })
        .catch((err) => {
          console.log(err);
          this.goBack();
        });
    }
  }
  
  getCoverImage(game) { 
    return `http://localhost:3001${game.imagen}`; 
  } 
  

  goBack(): void {
    this.location.back();
  }
}