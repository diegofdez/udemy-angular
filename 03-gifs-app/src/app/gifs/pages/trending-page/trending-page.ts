import { AfterViewInit, Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { GifService } from '../../services/gifs.service';
import { ScrollStateService } from '../../../shared/services/scroll-state.service';

@Component({
  selector: 'app-trending-page',
  templateUrl: './trending-page.html',
})
export default class TrendingPage implements AfterViewInit {
gifService = inject(GifService);
  scrollStateService = inject(ScrollStateService);

  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');

  ngAfterViewInit(): void {
    const div = this.scrollDivRef()?.nativeElement as HTMLDivElement;
    if (!div) return;

    div.scrollTop = this.scrollStateService.trendingScrollState();
  }

  onScroll(event: Event) {
    const div = this.scrollDivRef()?.nativeElement as HTMLDivElement;
    if (!div) return;

    const scrollTop = div.scrollTop;
    const clientHeight = div.clientHeight;
    const scrollHeight = div.scrollHeight;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 100;

    console.log({ scrollTop, clientHeight, scrollHeight, scrollTotal: scrollTop + clientHeight, isAtBottom });

    this.scrollStateService.trendingScrollState.set(scrollTop);

    if (isAtBottom) {
      this.gifService.loadTrendingGifs();
    }
  }
}
