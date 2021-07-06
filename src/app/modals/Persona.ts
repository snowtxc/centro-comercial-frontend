export class Persona {

    public id: number;
    public nombre: string;
    public apellido: string;
    public email: string;
    public celular: string;
    public estado: string;
    
    constructor(id:number,nombre:string,apellido:string,email:string,celular:string,estado:string){
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.celular = celular;
        this.estado = estado;

    }
}