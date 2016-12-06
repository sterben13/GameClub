import { User } from './../../class/user';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user = new User('', '', '', '', '', '', '', '');
  userSelect = new User('', '', '', '', '', '', '', '');
  users: User[];

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userService.findall().then((dataJson) => {
      console.log(dataJson);
      this.users = dataJson;
    }).catch((err) => {
      console.log(err);
    });
  }

  selectUser(user: User) {
    $('#myModal').modal('show');
    this.userSelect = user;
    console.log(user);
    console.log(this.userSelect);
  }

  delete() {
    this.userService.delete(this.userSelect._id).then(() => {
      this.users = this.users.filter(u => u !== this.userSelect);
      this.userSelect = new User('', '', '', '', '', '', '', '');
      $('#myModal').modal('hide');
    }).catch((err) => {
      console.log(err);
    });
  }

  getMyPicture(user) {
    return `http://localhost:3001${user.foto}`;
  }
}
