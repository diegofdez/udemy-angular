import { AfterViewInit, Component, ElementRef, input, signal, viewChild } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { environment } from '../../../environments/environment';

mapboxgl.accessToken = environment.mapboxKey;

/**
 * Width: 100%
 * Height: 260px
 *
 * coordinates
 */

@Component({
  selector: 'app-mini-map',
  imports: [],
  templateUrl: './mini-map.html',
})
export class MiniMap implements AfterViewInit {
  divElement = viewChild<ElementRef>('map');
  lngLat = input.required<{ lng: number; lat: number }>();
  zoom = input<number>(14);

  async ngAfterViewInit(): Promise<void> {
    if (!this.divElement()?.nativeElement) return;

    await new Promise(resolve => setTimeout(resolve, 100));

    const element = this.divElement()!.nativeElement;
    console.log(element);

    const map = new mapboxgl.Map({
      container: element, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat(), // starting position [lng, lat]
      zoom: this.zoom(), // starting zoom
      interactive: false,
    });

    new mapboxgl.Marker({
        color: '#fffafa'
      })
      .setLngLat(this.lngLat())
      .addTo(map);
  }

}
