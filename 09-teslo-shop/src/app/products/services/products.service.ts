import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '@auth/interfaces/user.interface';
import { Gender, Product, ProductsResponse } from '@products/interfaces/product.interface';
import { forkJoin, map, Observable, of, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;

interface Options {
  limit?: number;
  offset?: number;
  gender?: string;
}

const emptyProduct: Product = {
  id: 'new',
  title: '',
  price: 0,
  description: '',
  slug: '',
  stock: 0,
  sizes: [],
  gender: Gender.Men,
  tags: [],
  images: [],
  user: {} as User
};

@Injectable({providedIn: 'root'})
export class ProductsService {
  private http = inject(HttpClient);

  private productsCache = new Map<string, ProductsResponse>();
  private productCache = new Map<string, Product>();

  getProducts(options: Options): Observable<ProductsResponse> {
    const { limit = 9, offset = 0, gender = '' } = options;

    const key = `${limit}-${offset}-${gender}`;

    if (this.productsCache.has(key)) {
      return of(this.productsCache.get(key)!);
    }

    return this.http.get<ProductsResponse>(`${baseUrl}/products`, {
        params: {
          limit,
          offset,
          gender,
        }
      })
      .pipe(
        tap(response => console.log(response)),
        tap(response => this.productsCache.set(key, response))
      );
  }

  getProductByIdSlug(idSlug: string): Observable<Product> {
    if (this.productCache.has(idSlug)) {
      return of(this.productCache.get(idSlug)!);
    }

    return this.http.get<Product>(`${baseUrl}/products/${idSlug}`)
      .pipe(
        tap(response => console.log(response)),
        tap(response => this.productCache.set(idSlug, response))
      );
  }

  getProductById(id: string): Observable<Product> {
    if (id === 'new') {
      return of(emptyProduct);
    }

    if (this.productCache.has(id)) {
      return of(this.productCache.get(id)!);
    }

    return this.http.get<Product>(`${baseUrl}/products/${id}`)
      .pipe(
        tap(response => console.log(response)),
        tap(response => this.productCache.set(id, response))
      );
  }

  updateProduct(
    id: string,
    productLike: Partial<Product>,
    imageFileList?: FileList
  ): Observable<Product> {
    const currentImages = productLike.images ?? [];

    return this.uploadImages(imageFileList)
    .pipe(
      map(imageNames => ({
        ...productLike,
        images: [...currentImages, ...imageNames]
      })),
      switchMap(updatedProductLike =>
        this.http.patch<Product>(`${baseUrl}/products/${id}`, updatedProductLike)),
      tap(response => console.log('Producto actualizado', response)),
      tap(response => this.updateProductCache(response))
    );

  }

  createProduct(
    productLike: Partial<Product>,
    imageFileList?: FileList
  ): Observable<Product> {
    console.log('Creando producto', productLike);

    return this.http.post<Product>(`${baseUrl}/products`, productLike)
      .pipe(
        tap(response => console.log('Respuesta del servidor', response)),
        tap(response => this.updateProductCache(response))
      )
  }

  updateProductCache(product: Product): void {
    const productId = product.id;

    this.productCache.set(productId, product);

    // Actualizar la cache de listados de productos
    this.productsCache.forEach(productResponse => {
      productResponse.products = productResponse.products
      .map(currentProduct =>
        currentProduct.id === productId ? product : currentProduct
      );
    });

    console.log('Cache actualizada');
  }

  uploadImages(images?: FileList): Observable<string[]> {
    if (!images || images.length === 0) {
      return of([]);
    }

    const uploadObservables = Array.from(images)
      .map(image => this.uploadImage(image));

    return forkJoin(uploadObservables)
      .pipe(
        tap(response => console.log('Imágenes subidas', response))
      );
  }

  uploadImage(imageFile: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', imageFile);

    return this.http.post<{ fileName: string }>(`${baseUrl}/files/product`, formData)
      .pipe(
        map(response => response.fileName)
      );
  }
}
