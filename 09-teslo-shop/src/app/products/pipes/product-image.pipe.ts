import { Pipe, type PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;

@Pipe({
  name: 'productImage',
})
export class ProductImagePipe implements PipeTransform {

  transform(value: null | string | string[]): any {
    if (value === null) {
      return './assets/images/no-image.jpg';
    }

    if (typeof value === 'string') {
      return this.cleanImageUrl(value);
    }

    if (Array.isArray(value) && value.length > 0) {
      return this.cleanImageUrl(value[0]);
    }

    return './assets/images/no-image.jpg';
  }

  private cleanImageUrl(imageUrl: string): string {
    if (imageUrl.startsWith('http') || imageUrl.startsWith('blob:')) {
      return imageUrl;
    }

    return `${baseUrl}/files/product/${imageUrl}`;
  }

}
