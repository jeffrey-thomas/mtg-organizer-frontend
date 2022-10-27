import { MtgColor, MtgColorEx } from "../MtgCards";
import { MtgSymbolSvgId } from "./MtgSymbolSvgs"
import { MtgSymbolId } from "./MtgSymbolId";

type MtgSymbolElements={
    svgIds:[MtgSymbolSvgId] | [MtgSymbolSvgId, MtgSymbolSvgId],
    colorIds:[MtgColorEx] | [MtgColorEx, MtgColor]
};

export const MtgSymbolElements:{[key in MtgSymbolId]:MtgSymbolElements} = {
    0: { svgIds: ['0'], colorIds: ['C'] },
    1: { svgIds: ['1'], colorIds: ['C'] },
    2: { svgIds: ['2'], colorIds: ['C'] },
    3: { svgIds: ['3'], colorIds: ['C'] },
    4: { svgIds: ['4'], colorIds: ['C'] },
    5: { svgIds: ['5'], colorIds: ['C'] },
    6: { svgIds: ['6'], colorIds: ['C'] },
    7: { svgIds: ['7'], colorIds: ['C'] },
    8: { svgIds: ['8'], colorIds: ['C'] },
    9: { svgIds: ['9'], colorIds: ['C'] },
    10: { svgIds: ['10'], colorIds: ['C'] },
    11: { svgIds: ['11'], colorIds: ['C'] },
    12: { svgIds: ['12'], colorIds: ['C'] },
    13: { svgIds: ['13'], colorIds: ['C'] },
    14: { svgIds: ['14'], colorIds: ['C'] },
    15: { svgIds: ['15'], colorIds: ['C'] },
    16: { svgIds: ['16'], colorIds: ['C'] },
    17: { svgIds: ['17'], colorIds: ['C'] },
    18: { svgIds: ['18'], colorIds: ['C'] },
    19: { svgIds: ['19'], colorIds: ['C'] },
    20: { svgIds: ['20'], colorIds: ['C'] },
    '½': { svgIds: ['½'], colorIds: ['C'] },
    100: { svgIds: ['100'], colorIds: ['C'] },
    1000000: { svgIds: ['1000000'], colorIds: ['C'] },
    '∞': { svgIds: ['∞'], colorIds: ['C'] },

    //Variables
    X: { svgIds: ['X'], colorIds: ['C'] },
    Y: { svgIds: ['Y'], colorIds: ['C'] },
    Z: { svgIds: ['Z'], colorIds: ['C'] },

    //Basic Mana
    B: { svgIds: ['B'], colorIds: ['B'] },
    C: { svgIds: ['C'], colorIds: ['C'] },
    G: { svgIds: ['G'], colorIds: ['G'] },
    R: { svgIds: ['R'], colorIds: ['R'] },
    U: { svgIds: ['U'], colorIds: ['U'] },
    W: { svgIds: ['W'], colorIds: ['W'] },

    //Phyrexian Mana
    P: { svgIds: ['P'], colorIds: ['C'] },
    'B/P': { svgIds: ['P'], colorIds: ['B'] },
    'G/P': { svgIds: ['P'], colorIds: ['G'] },
    'R/P': { svgIds: ['P'], colorIds: ['R'] },
    'U/P': { svgIds: ['P'], colorIds: ['U'] },
    'W/P': { svgIds: ['P'], colorIds: ['W'] },

    //Snow
    S: { svgIds: ['S'], colorIds: ['C'] },

    //Actions
    T: { svgIds: ['T'], colorIds: ['C'] },
    Q: { svgIds: ['Q'], colorIds: ['C'] },

    //Hybrid Mana
    'W/U': { svgIds: ['W', 'U'], colorIds: ['W', 'U'] },
    'W/B': { svgIds: ['W', 'B'], colorIds: ['W', 'B'] },
    'U/B': { svgIds: ['U', 'B'], colorIds: ['U', 'B'] },
    'U/R': { svgIds: ['U', 'R'], colorIds: ['U', 'R'] },
    'B/R': { svgIds: ['B', 'R'], colorIds: ['B', 'R'] },
    'B/G': { svgIds: ['B', 'G'], colorIds: ['B', 'G'] },
    'R/G': { svgIds: ['R', 'G'], colorIds: ['R', 'G'] },
    'R/W': { svgIds: ['R', 'W'], colorIds: ['R', 'W'] },
    'G/W': { svgIds: ['G', 'W'], colorIds: ['G', 'W'] },
    'G/U': { svgIds: ['G', 'U'], colorIds: ['G', 'U'] },
    '2/W': { svgIds: ['2', 'W'], colorIds: ['C', 'W'] },
    '2/U': { svgIds: ['2', 'U'], colorIds: ['C', 'U'] },
    '2/B': { svgIds: ['2', 'B'], colorIds: ['C', 'B'] },
    '2/R': { svgIds: ['2', 'R'], colorIds: ['C', 'R'] },
    '2/G': { svgIds: ['2', 'G'], colorIds: ['C', 'G'] },

    'W/U/P': { svgIds: ['P', 'P'], colorIds: ['W', 'U'] },
    'W/B/P': { svgIds: ['P', 'P'], colorIds: ['W', 'B'] },
    'U/B/P': { svgIds: ['P', 'P'], colorIds: ['U', 'B'] },
    'U/R/P': { svgIds: ['P', 'P'], colorIds: ['U', 'R'] },
    'B/R/P': { svgIds: ['P', 'P'], colorIds: ['B', 'R'] },
    'B/G/P': { svgIds: ['P', 'P'], colorIds: ['B', 'G'] },
    'R/G/P': { svgIds: ['P', 'P'], colorIds: ['R', 'G'] },
    'R/W/P': { svgIds: ['P', 'P'], colorIds: ['R', 'W'] },
    'G/W/P': { svgIds: ['P', 'P'], colorIds: ['G', 'W'] },
    'G/U/P': { svgIds: ['P', 'P'], colorIds: ['G', 'U'] },

    'HR': { svgIds: ['R'], colorIds: ['R'] },
    'HW': { svgIds: ['W'], colorIds: ['W'] },
}