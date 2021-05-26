export interface Funcion {
    Id: number,
    Descripcion: string,
    IdFuncionPadre: number,
    IdFuncionPadreNavigation: Funcion
}