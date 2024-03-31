

export const WebSVG = {};





export class BoundingBox {

     /** @type{number} */
     xMin = 0.0;

     /** @type{number} */
     xMax = 0.0;
 
     /** @type{number} */
     yMin = 0.0;
 
     /** @type{number} */
     yMax = 0.0;
 
    /** @type{boolean} */
    isBoundingBoxInitialized = false;


    constructor(){
    }

    clear() {
        this.isBoundingBoxInitialized = false;
    }

    /**
     * 
     * @param {number} x 
     * @param {number} y 
     */
    update(x, y) {
        if (!this.isBoundingBoxInitialized) {
            this.xMin = x;
            this.xMax = x;
            this.yMin = y;
            this.yMax = y;
            this.isBoundingBoxInitialized = true;
        }
        else {
            this.xMin = Math.min(this.xMin, x);
            this.xMax = Math.max(this.xMax, x);
            this.yMin = Math.min(this.yMin, y);
            this.yMax = Math.max(this.yMax, y);
        }
    }

}


/**
 * 
 */
export class WebSVG_ViewPort {

    /**
     * 
     */
    width = 800;

    /**
     * 
     */
    height = 600;

    /**
     * 
     */
    marginTop = 40;
    marginBottom = 40;
    marginLeft = 40;
    marginRight = 40;



    scalingFactor = 1.0;


    /**
     * 
     */
    xOffset = 0.0;

    yOffset = 0.0;


  
    /**
     * 
     * @param {BoundingBox} bounds 
     */
    rescale(bounds) {

        /* constraint 1 : xScalingFactor * xMin + xOffset = margin */
        /* constraint 2 : xScalingFactor * xMax + xOffset = width - margin */
        let xScalingFactor = (this.width - this.marginLeft - this.marginRight) / (bounds.xMax - bounds.xMin);

        /* constraint 1 : yScalingFactor * yMin + yOffset = margin */
        /* constraint 2 : yScalingFactor * xMax + yOffset = height - margin */
        let yScalingFactor = (this.height - this.marginTop - this.marginBottom) / (bounds.yMax - bounds.yMin);

        /* x is limiting */
        if (xScalingFactor < yScalingFactor) {
            this.scalingFactor = xScalingFactor;
            this.xOffset = this.marginLeft - this.scalingFactor * bounds.xMin;
            this.yOffset = 0.5 * this.height - this.scalingFactor * 0.5 * (bounds.yMin + bounds.yMax);
            /* constraint : scalingFactor * (yMin + yMax)/2 + yOffset = height/2 */
        }
        else {
            this.scalingFactor = yScalingFactor;
            this.yOffset = this.marginTop - this.scalingFactor * bounds.yMin;
            this.xOffset = 0.5 * this.width - this.scalingFactor * 0.5 * (bounds.xMin + bounds.xMax);
        }
    }


    /**
     * 
     * @param {number} x 
     * @returns {number}
     */
    xTranform(x) {
        return x * this.scalingFactor + this.xOffset;
    }


    /**
     * 
     * @param {number} y 
     * @returns {number}
     */
    yTranform(y) {
        return this.height - (y * this.scalingFactor + this.yOffset);
    }

    /**
    * 
    * @param {double} y 
    * @returns 
    */
    sTranform(l) {
        return l * this.scalingFactor;
    }

}


WebSVG.DISABLED_FEATURE_CODE = 0x00;


/** Normalized thicknesses */
WebSVG.getStrokeThicknessByCode = function(code) {
	switch(code) {
		case 0x22 : return "0.100"; /* ONE_TENTH - 1/10 */
		case 0x23 : return "0.125"; /* ONE_EIGHTH - 1/8 */
		case 0x24 : return "0.250"; /* ONE_QUARTER - 1/4 */
		case 0x25 : return "0.333"; /* ONE_THIRD - 1/3 */
		case 0x32 : return "0.500"; /* HALF - 1/2 */
		case 0x33 : return "0.667"; /* TWO_THIRDS - 2/3 */
		case 0x34 : return "0.750"; /* THREE_QUARTERS - 3/4 */
		default : 
		case 0x42 : return "1.000"; /* ONE - 1 */
		case 0x43 : return "1.250"; /* ONE_AND_ONE_QUARTER - 1-1/4 */
		case 0x44 : return "1.333"; /* ONE_AND_ONE_THIRD - 1-1/3 */
		case 0x52 : return "1.500"; /* ONE_AND_A_HALF - 1-1/2 */
		case 0x53 : return "1.667"; /* ONE_AND_TWO_THIRDS - 1-2/3 */
		case 0x54 : return "1.750"; /* ONE_AND_THREE_QUARTERS - 1-3/4 */
		case 0x63 : return "2.000"; /* TWO - 2 */
		case 0x64 : return "2.500"; /* TWO_AND_A_HALF - 2-1/2 */
		case 0x82 : return "3.000"; /* THREE - 3 */
		case 0x84 : return "4.000"; /* FOUR - 4 */
		case 0x85 : return "5.000"; /* FIVE - 5 */
		case 0x86 : return "6.000"; /* SIX - 6 */
		case 0x87 : return "7.000"; /* SEVEN - 7 */
		case 0x88 : return "8.000"; /* EIGHT - 8 */
		case 0x89 : return "9.000"; /* NINE - 9 */
		case 0x92 : return "10.000"; /* TEN - 10 */
	}
};


/** Normalized solidity */
WebSVG.getStrokeSolidityByCode = function(code) {
	switch(code) {
		default : 
		case 0x0 : return "1"; /* SOLID - solid */
		case 0x3 : return "2 2"; /* SMALL_DASH - small-dash */
		case 0x4 : return "4 1"; /* LONG_DASH - long-dash */
	}
};


/** Normalized stroke colors */
WebSVG.getStrokeColorByCode = function(code) {
	switch(code) {
		default : 
		case 0x0 : return "rgba(0, 0, 0, 1.00)"; /* black */
		case 0x1 : return "rgba(255, 255, 255, 1.00)"; /* white */
		case 0x12 : return "rgba(255, 0, 0, 1.00)"; /* red */
		case 0x13 : return "rgba(0, 255, 0, 1.00)"; /* green */
		case 0x14 : return "rgba(0, 0, 255, 1.00)"; /* blue */
		case 0x21 : return "rgba(247, 247, 247, 1.00)"; /* light grey 1 */
		case 0x22 : return "rgba(223, 223, 223, 1.00)"; /* light grey 2 */
		case 0x23 : return "rgba(199, 199, 199, 1.00)"; /* mid grey */
		case 0x24 : return "rgba(182, 182, 182, 1.00)"; /* mid grey */
		case 0x26 : return "rgba(143, 143, 143, 1.00)"; /* grey */
		case 0x27 : return "rgba(136, 248, 248, 1.00)"; /* dark grey */
		case 0x42 : return "rgba(0, 255, 193, 1.00)"; /* fresh green */
	}
};


/** Normalized fill colors */
WebSVG.getFillColorByCode = function(code) {
	switch(code) {
		case 0x0 : return "rgba(0, 0, 0, 0.00)"; /* none */
		default : 
		case 0x2 : return "rgba(0, 0, 0, 1.00)"; /* black */
		case 0x1 : return "rgba(255, 255, 255, 1.00)"; /* white */
		case 0x12 : return "rgba(0, 0, 0, 1.00)"; /* red */
		case 0x13 : return "rgba(240, 192, 0, 1.00)"; /* green */
		case 0x14 : return "rgba(15, 63, 255, 1.00)"; /* blue */
		case 0x13 : return "rgba(143, 62, 248, 1.00)"; /* grey */
		case 0x13 : return "rgba(248, 227, 143, 1.00)"; /* grey */
		case 0x13 : return "rgba(143, 62, 248, 1.00)"; /* grey */
		case 0x22 : return "rgba(252, 240, 193, 1.00)"; /* fresh green */
		case 0x23 : return "rgba(243, 206, 57, 1.00)"; /* lime */
	}
};
