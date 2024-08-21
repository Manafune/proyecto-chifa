import { Injectable, signal } from "@angular/core";
import { Producto } from "../producto-add/producto.model";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private url = `${environment.API_URL}/api/productos`;
  private products = signal< Producto[]> ([]);

  constructor() {}

  async obtenerProductosDisponibles(): Promise<Producto[]> {
    try {
      const response = await fetch(`${this.url}/listardisponible`);
      if (!response.ok)  throw new Error('Network response was not ok');
      
      const data: Producto[] = await response.json();
      this.products.set(data)
      return data;
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
      return [];
    }
  }

  async obtenerProductos(pagina: number = 0, tamaño: number = 10): Promise<{ products: Producto[], totalPages: number }> {
    try {
      const response = await fetch(`${this.url}?page=${pagina}&size=${tamaño}`);
      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      this.products.set(data.content); // Assuming `data.content` contains the product list
      return {
        products: data.content,
        totalPages: data.totalPages // Assuming `data.totalPages` contains total pages
      };
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
      return { products: [], totalPages: 0 };
    }
  }

  getProducts(): Producto[] {
    return this.products();
  }

  async registrar(registro: Producto) {
    try {
      
      const response=  await  fetch(this.url,{
          method: 'POST',
          headers: {'Content-Type': 'application/json'  },
          body: JSON.stringify(registro),
      })
      if (!response.ok) {
        // Handle the error response here
        const errorDetail = await response.text(); // Get error details if any
        throw new Error(`Error: ${response.status} - ${errorDetail}`);
      }
     const result:unknown=await response.json()
     return result
    } catch (error) {
      console.log(error)
      throw new Error("error en los datos")
    }
      
   }
  async editar(id: number, producto: Producto) {
    try{
      const response = await fetch(`${this.url}/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(producto)
      });
      if (!response.ok) {
        // Handle the error response here
        const errorDetail = await response.text(); // Get error details if any
        throw new Error(`Error: ${response.status} - ${errorDetail}`);
      }
      const result: unknown = await response.json();
      return result;
    } catch (error) {
      console.log(error);
      throw new Error('Error al editar producto');
    }
  }
  
  async obtenerProductoPorId(id: number): Promise<Producto> {
    try {
      const response = await fetch(`${this.url}/${id}`);
      if (!response.ok) throw new Error('Network response was not ok');
      
      const producto: Producto = await response.json();
      return producto;
    } catch (error) {
      console.error('Error al obtener el producto:', error);
      throw error;
    }
  }

  async cambiarDisponibilidad(id: number) {
    try {
      const response = await fetch(`${this.url}/${id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
      });
      if (!response.ok) {
        const errorDetail = await response.text();
        throw new Error(`Error: ${response.status} - ${errorDetail}`);
      }
    } catch (error) {
      console.error('Error al cambiar disponibilidad:', error);
      throw error;
    }
  }
}

