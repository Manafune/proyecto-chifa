export interface FacturaResponse {
    id: number;
    ordenId: number;
    fecha: string;
    total: number;
    pagada: boolean;
    detalles: DetalleOrdenResponse[];
  }
  
  export interface DetalleOrdenResponse {
    productoId: number;
    nombre: string;
    cantidad: number;
    subtotal: number;
  }