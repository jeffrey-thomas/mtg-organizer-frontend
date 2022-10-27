export namespace MtgColor{
    export const values = ["W", "U", "B", "R", "G"] as const;

    export const isMtgColor=(value:string):value is MtgColor=>{
        return values.includes(value as MtgColor);
    }
}

export type MtgColor = typeof MtgColor.values[number]

export type MtgColorEx = MtgColor | "C" | "M"