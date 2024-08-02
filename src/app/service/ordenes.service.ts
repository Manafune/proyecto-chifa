import { Injectable, signal } from "@angular/core";
import { OrdenRequest } from "../ordenes/orden-request.model";
import { Orden } from "../lista-ordenes/orden.model";

@Injectable({
    providedIn: 'root'
})
export class OrderService{
    private url = 'http://localhost:8080/api/ordenes'
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

     async listarOrden(): Promise<Orden[]>{
      try{
        const response = await fetch(this.url);
        if (!response.ok)  throw new Error('Network response was not ok');
      
        const data: Orden[] = await response.json();
        this.orders.set(data)
        console.log(this.orders())
        return data;
      }
      catch(error){
        console.error('There has been a problem with your fetch operation:', error);
        return [];
      }
     }

     getOrders(): Orden[]{
      return this.orders();
     }

}