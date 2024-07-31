import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { OrdenRequest } from "../ordenes/orden-request.model";

@Injectable({
    providedIn: 'root'
})
export class OrderService{
    private url = 'http://localhost:8080/api/ordenes'

    constructor(){

    }
    async insertar(registro: OrdenRequest) {
      try {
        
        const response=  await  fetch(this.url,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'  },
            body: JSON.stringify(registro),
        })
       const result:unknown=await response.json()
       return result
      } catch (error) {
        console.log(error)
        throw new Error("error en los datos")
      }
        
     }
}