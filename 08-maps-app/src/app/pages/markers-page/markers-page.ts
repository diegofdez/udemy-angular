import { AfterViewInit, Component, ElementRef, signal, viewChild } from '@angular/core';
import { JsonPipe } from '@angular/common';
import mapboxgl, { LngLatLike } from 'mapbox-gl';
import {v4 as UUIDv4} from 'uuid';
import { environment } from '../../../environments/environment';

mapboxgl.accessToken = environment.mapboxKey

interface Marker {
  id: string;
  marker: mapboxgl.Marker;
  color: string;
}

@Component({
  selector: 'app-markers-page',
  imports: [JsonPipe],
  templateUrl: './markers-page.html',
})
export class MarkersPage implements AfterViewInit {
  divElement = viewChild<ElementRef>('map');
  map = signal<mapboxgl.Map | null>(null);
  markers = signal<Marker[]>([]);

  async ngAfterViewInit(): Promise<void> {
    if (!this.divElement()?.nativeElement) return;

    await new Promise(resolve => setTimeout(resolve, 100));

    const element = this.divElement()!.nativeElement;
    console.log(element);


    const map = new mapboxgl.Map({
      container: element, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-122.41, 37.80], // starting position [lng, lat]
      zoom: 14 // starting zoom
    });

    // const marker = new mapboxgl.Marker({
    //     draggable: true,
    //     color: '#fffafa'
    //   })
    //   .setLngLat([-122.41, 37.80])
    //   .addTo(map);

    // marker.on('dragend', (event) => {
    //   const lngLat = event.target.getLngLat();
    //   console.log({lngLat});
    // });

    this.mapListeners(map);
  }

  mapListeners( map: mapboxgl.Map) {
    console.log('Map loaded');

    map.on('click', (event) => this.mapClick(event));

    this.map.set(map);
  }

  mapClick(event: mapboxgl.MapMouseEvent) {
    if (!this.map()) return;

    const map = this.map()!;
    const { lng, lat } = event.lngLat;
    console.log({ lng, lat });

    const color = '#xxxxxx'.replace(/x/g, () => (Math.random() * 16 | 0).toString(16));

    const marker = new mapboxgl.Marker({
        color: color
      })
      .setLngLat([lng, lat])
      .addTo(map);

    const newMarker: Marker = {
      id: UUIDv4(),
      marker: marker,
      color: color
    };

    this.markers.update((markers) => [newMarker, ...markers]);

    console.log(this.markers());
  }

  flyToMarker(lngLat: LngLatLike) {
    if (!this.map()) return;

    this.map()?.flyTo({
      center: lngLat, zoom: 14
    });
  }

  deleteMarker(marker:Marker) {
    if (!this.map()) return;
    const map = this.map()!;

    marker.marker.remove();
    this.markers.update((markers) => markers.filter(m => m.id !== marker.id));
  }

}
