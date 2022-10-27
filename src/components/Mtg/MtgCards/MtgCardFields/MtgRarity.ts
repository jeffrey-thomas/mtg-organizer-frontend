export namespace MtgRarity{
    export const values = ['common', 'uncommon', 'rare', 'mythic', 'special', 'bonus'] as const

    export function isValid(value:string):value is MtgRarity{
        return values.includes(value as MtgRarity);
    }
}

export type MtgRarity = typeof MtgRarity.values[number]