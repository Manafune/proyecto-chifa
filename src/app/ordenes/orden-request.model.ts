export interface DetalleOrdenRequest{
    productoId:number;
    cantidad:number;
}

export interface OrdenRequest{
    mesaId:number;
    detallesOrden: DetalleOrdenRequest[];
    fechaHora:string;
}
