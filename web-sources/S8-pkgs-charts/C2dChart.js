


export const C2dNumberFormats = {

    STD2 : new Intl.NumberFormat('en-US', { 
        notation: "standard",
        maximumFractionDigits: 2,
        useGrouping: false
    }),


    STD3 : new Intl.NumberFormat('en-US', { 
        notation: "standard",
        maximumFractionDigits: 3,
        useGrouping: false
    }),


    STD4 : new Intl.NumberFormat('en-US', { 
        notation: "standard",
        maximumFractionDigits: 4,
        useGrouping: false
    }),


    STD6 : new Intl.NumberFormat('en-US', { 
        notation: "standard",
        maximumFractionDigits: 6,
        useGrouping: false
    }),

    SCI2 : new Intl.NumberFormat('en-US', { 
        notation: "scientific",
        maximumSignificantDigits: 2,
        useGrouping: false
    }),

    SCI3 : new Intl.NumberFormat('en-US', { 
        notation: "scientific",
        maximumSignificantDigits: 3,
        useGrouping: false
    }),


    SCI4 : new Intl.NumberFormat('en-US', { 
        notation: "scientific",
        maximumSignificantDigits: 4,
        useGrouping: false
    }),

    SCI6 : new Intl.NumberFormat('en-US', { 
        notation: "scientific",
        maximumSignificantDigits: 6,
        useGrouping: false
    })
    


};


/**
 * @type{Map<string, Intl.NumberFormat>}
 */
export const C2dNumberFormatsMap = new Map();


/** STD2 */
C2dNumberFormatsMap.set(0x22, C2dNumberFormats.STD2);
C2dNumberFormatsMap.set(0x23, C2dNumberFormats.STD3);
C2dNumberFormatsMap.set(0x24, C2dNumberFormats.STD4);
C2dNumberFormatsMap.set(0x25, C2dNumberFormats.STD6);

C2dNumberFormatsMap.set(0x42, C2dNumberFormats.SCI2);
C2dNumberFormatsMap.set(0x43, C2dNumberFormats.SCI3);
C2dNumberFormatsMap.set(0x44, C2dNumberFormats.SCI4);
C2dNumberFormatsMap.set(0x46, C2dNumberFormats.SCI6);
