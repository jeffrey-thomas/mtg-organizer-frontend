import { MtgRarity } from "./MtgCardFields"
import { MtgCardLayout } from "./MtgCardFields"
import { MtgCardFace } from "./MtgCardFace"
import { MtgColor } from "."

export interface MtgCardData{
    id:string,
    multiverse_ids:number[],
    lang:string,

    card_faces?:MtgCardFace[],
    cmc:number,
    color_identity:MtgColor[],
    colors:MtgColor[],
    color_indicator:MtgColor[],
    hand_modifier?:string,
    keywords:string[]
    layout:MtgCardLayout,
    life_modifier?:string,
    loyalty?:string,
    mana_cost?:string,
    name:string,
    oracle_text?:string,
    oversized:boolean,
    power?:string,
    produced_mana?:MtgColor[],
    toughness?:string,
    type_line:string,

    artist?:string,
    collector_number:string,
    digital:boolean,
    flavor_text?:string,
    image_uris:{
        small:string,
        normal:string,
        large:string,
        art_crop:string,
        border_crop:string,
        png:string,
    },
    rarity:MtgRarity,
    set:string,
    set_name:string,
}

export namespace MtgCardData{
    export const Empty:MtgCardData={
        id:'loading...',
        multiverse_ids:[0],
        lang:'loading...',
    
        card_faces:[

        ],
        cmc:0,
        color_identity:[],
        colors:[],
        color_indicator:[],
        hand_modifier:'loading...',
        keywords:[],
        layout:'normal',
        life_modifier:'loading...',
        loyalty:'loyalty...',
        mana_cost:'loyalty...',
        name:'loyalty...',
        oracle_text:'loyalty...',
        oversized:false,
        power:'*',
        produced_mana:[],
        toughness:'*',
        type_line:'loading...',
    
        artist:'loading...',
        collector_number:'...',
        digital:false,
        flavor_text:'loading...',
        image_uris:{
            small:'loading...',
            normal:'loading...',
            large:'loading...',
            art_crop:'loading...',
            border_crop:'loading...',
            png:'loading...',
        },
        rarity:'common',
        set:'loading...',
        set_name:'loading...',

    }
}
