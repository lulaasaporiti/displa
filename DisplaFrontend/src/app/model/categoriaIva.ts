export interface CategoriaIVA {
    Id: number,
    Descripcion: string,
    Tasa?: number,
    SobreTasa?: number,
    Discrimina?: boolean,
    Recateg?: boolean,
    CodigoRECE?: number,
    Borrado: boolean
}