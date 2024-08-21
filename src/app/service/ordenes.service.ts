import { Injectable, signal } from "@angular/core";
import { OrdenRequest } from "../ordenes/orden-request.model";
import { Orden } from "../lista-ordenes/orden.model";

@Injectable({
    providedIn: 'root'
})
export class OrderService{
    private url = 'http://localhost:8081/api/ordenes'
    private orders = signal< Orden[]>([]);
    constructor(){

    }
    async insertar(registro: OrdenRequest) {
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

     async listarOrden(pagina: number = 0, tamanoPagina: number = 10): Promise<{ content: Orden[], totalElements: number }>{
      try{
        const response = await fetch(`${this.url}?page=${pagina}&size=${tamanoPagina}`);
        if (!response.ok)  throw new Error('Network response was not ok');
      
        const data = await response.json();
        this.orders.set(data.content);
        console.log(this.orders());
        return data;
      }
      catch(error){
        console.error('There has been a problem with your fetch operation:', error);
        return { content: [], totalElements: 0 }
      }
     }

     getOrders(): Orden[]{
      return this.orders();
     }

     async servirOrden(id: number): Promise<void> {
      try {
        const response = await fetch(`${this.url}/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          const errorDetail = await response.text();
          throw new Error(`Error: ${response.status} - ${errorDetail}`);
        }
        // Optionally refresh the list of orders
        await this.listarOrden();
      } catch (error) {
        console.error('Error al servir la orden:', error);
      }
    }

}