export function zavrsetak(datum:Date,trajanje:number):String{
    datum.setMinutes(datum.getMinutes()+trajanje);
    return datum.toLocaleTimeString();
}