import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

import { switchMap } from 'rxjs';

import { User } from '@interfaces/req-resp';
import { UsersService } from '@services/users.service';
import { TitleComponent } from "@shared/title/title.component";

@Component({
  selector: 'app-user',
  imports: [TitleComponent],
  template: `
    <app-title [title]="titleLabel()"></app-title>

    @if (user()) {
      <section>
        <img [srcset]="user()?.avatar" [alt]="user()?.first_name">

        <div>
          <h3>{{ user()?.first_name }} {{ user()?.last_name }}</h3>
          <p>{{ user()?.email }}</p>
        </div>
      </section>
    }
    @else {
      <p>Cargando informacion</p>
    }
  `
})
export default class UserComponent {
  private route = inject(ActivatedRoute);
  private usersService = inject(UsersService);

  titleLabel = computed(() => {
    if (this.user()) {
      return `User Details: ${this.user()?.first_name} ${this.user()?.last_name}`;
    }
    return `User ${this.route.snapshot.params['id']} Details`;
  })

  // public user = signal<User | undefined>(undefined);
  public user = toSignal(
    this.route.params.pipe(
      switchMap(params => this.usersService.getUserById(params['id']))
    )
  )
}
