import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/products.model';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(products: Product[], term:string): Product[] {
    return products.filter((product) => product.title.toLowerCase().includes(term.toLocaleLowerCase()));
  }

}
