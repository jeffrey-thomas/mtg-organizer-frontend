export namespace MtgCardLayout{
    export const values = [
        "normal", "split",  "flip",  "transform",  "modal_dfc",  "meld",  "leveler",  "class", 
        "saga",  "adventure",  "planar", "scheme", "vanguard", "token", "double_faced_token",
        "emblem", "augment", "host", "art_series", "reversible_card"
    ] as const;

    export function isValid(value:string):value is MtgCardLayout{
        return values.includes(value as MtgCardLayout);
    }
}

export type MtgCardLayout = typeof MtgCardLayout.values[number];
