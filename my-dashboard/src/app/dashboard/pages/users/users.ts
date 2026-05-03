import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UsersService } from '@services/users.service';
import { TitleComponent } from "@shared/title/title.component";

@Component({
  selector: 'app-users',
  imports: [TitleComponent, RouterLink],
  templateUrl: './users.html',
})
export default class Users {
  public usersService = inject(UsersService);
}
