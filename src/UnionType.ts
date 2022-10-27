export class UnionType<T>{
    
    values:T[];

    constructor(values:T[]){
        this.values = values;
    }
}