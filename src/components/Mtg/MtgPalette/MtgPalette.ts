import { MtgColorEx } from "../MtgCards"

export type MtgPalette = { 
    colors:{[key in MtgColorEx]:{
        circle:string,
        border:string,
        background:string
    }},
    symbol:string
}

export const MtgPaletteDefault:MtgPalette={
    colors:{
        B:{
            circle:'#848484',
            border:'#222222',
            background:'#bbbbbb',
        },
        U:{
            circle:'#67c1f5',
            border:'#0077b6',
            background:'#c6dce7'
        },
        W:{
            circle:'#fcfbc2',
            border:'#d3c69f',
            background:'#f2f4ef'
        },
        G:{
            circle:'#27b569',
            border:'#007b38',
            background:'#bfd3c9'
        },
        R:{
            circle:'#f95556',
            border:'#df4939',
            background:'#e1a085'
        },
        C:{
            circle:'#cccccc',
            border:'#bbbbbb',
            background:'#dddddd'
        },
        M:{
            circle:'never',
            border:'never',
            background:'#cfb560'
        }
    },

    symbol:'#222222'
}

