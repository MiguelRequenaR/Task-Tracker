//Utilidades para manejar las fechas
export function formDate(isoString: string) : string {
    //Convertimos el isoString a un fecha
    const date =  new Date(isoString)
    //Obtenemos el formato de fecha
    const format = new Intl.DateTimeFormat('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
    return format.format(date)
}