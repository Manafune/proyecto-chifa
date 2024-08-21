import { Injectable, signal } from "@angular/core";
import { CierreCajaResponse } from "../ganancias-list/cierre-caja.model";

@Injectable({
    providedIn: 'root'
})

export class CierreCajaService{
    private url = 'http://localhost:8080/api/cierre-caja';

    async obtenerCierres(page: number): Promise<{ content: CierreCajaResponse[], totalPages: number }> {
        try {
            const response = await fetch(`${this.url}?page=${page - 1}`);
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
            return { content: [], totalPages: 0 };
        }
      }

    async calcularCierreDeCaja(): Promise<CierreCajaResponse | null> {
        try {
            const response = await fetch(this.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                if (response.status === 400) {
                    throw new Error('Ya se ha realizado un cierre de caja para el día de hoy.');
                } else {
                    throw new Error('Error al realizar el cierre de caja.');
                }
            }

            return await response.json();
        } catch (error) {
            if (error instanceof Error) {
                // Ahora TypeScript sabe que 'error' es de tipo 'Error'
                console.error('Error al calcular cierre de caja:', error.message);
                alert(error.message); // Mostrar pop-up en caso de error
            } else {
                console.error('Error desconocido:', error);
                alert('Ocurrió un error inesperado');
            }
            return null;
        }
    }
}