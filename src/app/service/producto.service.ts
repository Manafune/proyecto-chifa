import { Injectable, signal } from "@angular/core";
import { Producto } from "../producto-add/producto.model";

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private url = 'http://localhost:8080/api/productos';
  private products = signal< Producto[]> ([]);

  constructor() {}

  async obtenerProductos(): Promise<Producto[]> {
    try {
      const response = await fetch(this.url);
      if (!response.ok)  throw new Error('Network response was not ok');
      
      const data: Producto[] = await response.json();
      this.products.set(data)
      console.log(this.products())
      return data;
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
      return [];
    }
  }

  getProducts(): Producto[] {
    return this.products();
  }
}
