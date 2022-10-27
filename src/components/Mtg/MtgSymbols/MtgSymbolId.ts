export namespace MtgSymbolId{
    export const values = [ 
        "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
        "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "½",
        "100", "1000000", "∞", "B", "C", "G", "P", "Q", "R", "S", "T", "U", "W", "X", "Y", "Z",
        "W/U" , "W/B" , "U/B" , "U/R" , "B/R" , "B/G" , "R/G" , "R/W" ,"G/W" ,"G/U" ,
        "2/W" , "2/U" , "2/B" , "2/R" , "2/G" , "B/P" , "G/P" , "R/P" , "U/P" , "W/P" , "HR" , "HW" ,
        "W/U/P" , "W/B/P" , "U/B/P" , "U/R/P" , "B/R/P" , "B/G/P" , "R/G/P" , "R/W/P" , "G/W/P" , "G/U/P"
    ] as const;    

    export function isValid(value:string):value is MtgSymbolId{
        return values.includes(value as MtgSymbolId);
    }
}

export type MtgSymbolId = typeof MtgSymbolId.values[number]     

