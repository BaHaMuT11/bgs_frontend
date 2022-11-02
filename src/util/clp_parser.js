export const obtenerCLP = function(number){
    return new Intl.NumberFormat('es-CL', {style: 'currency',currency: 'CLP'}).format(number)
}