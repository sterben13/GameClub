import { PrestamoService } from './services/prestamo.service';
import { CopyService } from './services/copy.service';
import { UserService } from './services/user.service';
import { GamesService } from './services/games.service';
import { CopySearchService } from './services/copy-search.service';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { GamesComponent } from './components/games/games.component';
import { RouterModule } from '@angular/router';

import { UserComponent } from './components/user/user.component';
import { CreateComponent } from './components/create/create.component';
import { DetailComponent } from './components/detail/detail.component';
import { PrestamoComponent } from './components/prestamo/prestamo.component';

@NgModule({
  declarations: [
    AppComponent,
    GamesComponent,
    UserComponent,
    CreateComponent,
    DetailComponent,
    PrestamoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: '',
        children: [
          {
            path: 'games',
            component: GamesComponent,
          },
          {
            path: 'user',
            component: UserComponent,
          },
          {
            path: 'detail/:type/:id',
            component: DetailComponent
          },
          {
            path: 'create/:type',
            component: CreateComponent
          },
          {
            path: 'create/:type/:id',
            component: CreateComponent
          },
          {
            path: 'update/:type/:id',
            component: CreateComponent
          },
          {
            path:'prestamos',
            component: PrestamoComponent
          }
        ]
      }
    ])
  ],
  providers: [
    GamesService, 
    UserService, 
    CopyService,
    CopySearchService,
    PrestamoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
