export interface Orden{
    id:number;
    mesaId: string;
    fechaHora: string;
    estado: string;
    detallesOrden: DetalleOrden[];
    total: number;
}

export interface DetalleOrden{
    productoId:number;
    nombreProducto: string;
    cantidad:number;
}
