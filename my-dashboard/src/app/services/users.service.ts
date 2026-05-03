import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { User, UserResponse, UsersResponse } from '@interfaces/req-resp';
import { delay, map } from 'rxjs';

interface State {
  users: User[];
  loading: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private http = inject(HttpClient);

  #state = signal<State>({
    users: [],
    loading: true
  });

  public users = computed(() => this.#state().users);
  public loading = computed(() => this.#state().loading);

  constructor() {
    this.http.get<{ data: UsersResponse }>('https://reqres.in/api/users')
      .pipe( delay(2000) )
      .subscribe(response => {
        this.#state.set({
          loading: false,
          users: response.data.data
        })
      });

  }


  getUserById(id:string) {
    return this.http.get<{ data: UserResponse }>(`https://reqres.in/api/users/${id}`)
      .pipe(
        delay(2000),
        map(response => response.data.data)
      )

  }
}
