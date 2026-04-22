import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, tap } from 'rxjs';

const loadFromLocalStorage = (): Record<string, Gif[]> => {
  const history = localStorage.getItem('searchHistory');
  return history ? JSON.parse(history) : {};
}

@Injectable({providedIn: 'root'})
export class GifService {
  private http = inject(HttpClient);

  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(false);
  private trendingPage = signal(0);

  trendingGifsGroup = computed<Gif[][]>(() => {
    const groups = [];
    for (let i = 0; i < this.trendingGifs().length; i += 3) {
      groups.push(this.trendingGifs().slice(i, i + 3));
    }
    return groups;
  });

  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  saveToLocalStorage = effect(() => {
    const historyString = JSON.stringify(this.searchHistory());
    localStorage.setItem('searchHistory', historyString);
  });

  constructor() {
    this.loadTrendingGifs();
  }

  loadTrendingGifs() {
    if (this.trendingGifsLoading()) return;

    this.trendingGifsLoading.set(true);

    this.http.get<GiphyResponse>(`${ environment.giphyBaseUrl }/gifs/trending`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: '20',
        offset: (this.trendingPage() * 20).toString()
      }
    }).subscribe(response => {
      const gifs = GifMapper.mapGiphyItemsToGifArray(response.data);
      this.trendingGifs.update(current => [...current, ...gifs]);
      this.trendingGifsLoading.set(false);
      this.trendingPage.update(page => page + 1);
    });
  }

  searchGifs(query: string) {
    return this.http.get<GiphyResponse>(`${ environment.giphyBaseUrl }/gifs/search`, {
      params: {
        api_key: environment.giphyApiKey,
        q: query,
        limit: '20'
      }
    })
    .pipe(
      //map(({data}) => GifMapper.mapGiphyItemsToGifArray(data))
      map(({ data }) => data),
      map((giphyItems) => GifMapper.mapGiphyItemsToGifArray(giphyItems)),

      tap((gifs) => {
        this.searchHistory.update(history => {
          return {
            ...history,
            [query.toLowerCase()]: gifs
          }
        });
      })
    );
  }

  getHistoryGifs(query: string): Gif[] {
    return this.searchHistory()[query.toLowerCase()] ?? [];
  }
}
