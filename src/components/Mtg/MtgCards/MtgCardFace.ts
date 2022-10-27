import { MtgCardLayout, MtgColor } from "./MtgCardFields";

export interface MtgCardFace{
    artist?:string,
    cmc?:number,
    color_indicator?:MtgColor[],
    colors?:MtgColor[],
    flavor_text?:string,
    illustration_id?:string,
    image_uris?:{
        small?:string,
        normal?:string,
        large?:string,
        art_crop?:string,
        border_crop?:string,
        png?:string
    },
    layout?:MtgCardLayout,
    loyalty?:string,
    mana_cost:string,
    name:string,
    oracle_text?:string,
    power?:string,
    toughness?:string,
    type_line?:string,
    watermark?:string
}