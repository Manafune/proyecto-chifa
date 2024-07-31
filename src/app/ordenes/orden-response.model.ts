export interface DetalleOrdenResponse{
    productoId:number;
    nombreProducto:string;
    cantidad:number;
}

export interface OrdenResponse{
    id:number;
    mesaId:number;
    fechaHora:string;
    estado: string;
    detallesOrden: DetalleOrdenResponse[];
    
}
