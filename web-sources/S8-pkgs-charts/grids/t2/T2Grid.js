

import { S8Object } from '/S8-api/S8Object.js';
import { S8WebFront } from '/S8-pkgs-ui-carbide/S8WebFront.js';
import { T1GridCard } from '/S8-pkgs-charts/tables/t1/T1GridCard.js';
import { OutputOverlay } from '/S8-pkgs-charts/overlay/OutputOverlay.js';



/**
 * 
 */
S8WebFront.CSS_import('/S8-pkgs-charts/grids/t2/T2Grid.css');


export class T2Grid extends S8Object {



    /**
     * @type{OutputOverlay}
     */
    outputOverlay;

    constructor(){
        super();
        const _this = this;

        this.wrapperNode = document.createElement("div");
        this.wrapperNode.classList.add("t2grid-wrapper");

        this.coreNode = document.createElement("div");
        this.coreNode.classList.add("t2grid-core");
        this.wrapperNode.appendChild(this.coreNode);

        
        this.wrapperNode.addEventListener("click", function (event) {
            _this.S8_vertex.runVoid("on-click");
            event.stopPropagation();
        }, false);


        /* <uptodate-overlay> */
        this.outputOverlay = new OutputOverlay(this);
        this.wrapperNode.appendChild(this.outputOverlay.getLayerNode());
        /* </uptodate-overlay> */

    }

    S8_render(){ /* continuous rendering approach... */ }

    getEnvelope(){
        return this.wrapperNode;
    }


    onSync() {
        this.S8_vertex.runVoid("on-sync");
    }

    

    /**
     * 
     * @param {T1GridCard[]} cards 
     */
    S8_set_cards(cards){

        /* clear wrapper node content */
       while(this.coreNode.hasChildNodes()){ this.coreNode.removeChild(this.coreNode.lastChild); }
       
       /* append cards */
       cards.forEach(card => this.coreNode.appendChild(card.getEnvelope()));
    }



    S8_set_overlayState(code) {
        this.outputOverlay.setState(code);
    }

    S8_set_overlayMessage(message) {
        this.outputOverlay.setMessage(message);
    }


    S8_dispose(){ /* continuous rendering approach... */ }
}