export class Departamento {
    public nombre;
    public id;
    public Localidads;
    
    constructor(id:number,nombre: string,Localidads:Array<any>){
        this.id = id;
        this.nombre = nombre;
        this.Localidads = Localidads;
    }
}