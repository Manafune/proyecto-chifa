export interface CierreCajaResponse {
    id: number;
    fechaCierre: string;
    ventasTotales: number;
    efectivoEnCaja: number;
    diferencia: number;
    fechaHoraRegistro: string;
}