

import { NeObject } from '/S8-core-bohr-neon/NeObject.js';

import { S8WebFront } from '/S8-pkgs-ui-carbide/S8WebFront.js';

import { C2dGridCard } from './C2dGridCard.js';



/**
 * 
 */
S8WebFront.CSS_import('/S8-pkgs-charts/grid/C2dGrid.css');

export class C2dGrid extends NeObject {

    constructor(){
        super();
        this.wrapperNode = document.createElement("div");
        this.wrapperNode.classList.add("c2dgrid-wrapper");

        this.coreNode = document.createElement("div");
        this.coreNode.classList.add("c2dgrid-core");
        this.wrapperNode.appendChild(this.coreNode);

        let _this = this;
        this.wrapperNode.addEventListener("click", function (event) {
            _this.S8_vertex.runVoid("on-click");
            event.stopPropagation();
        }, false);
    }

    S8_render(){ /* continuous rendering approach... */ }

    getEnvelope(){
        return this.wrapperNode;
    }
    

    /**
     * 
     * @param {C2dGridCard[]} cards 
     */
    S8_set_cards(cards){

        /* clear wrapper node content */
       while(this.coreNode.hasChildNodes()){ this.coreNode.removeChild(this.coreNode.lastChild); }
       
       /* append cards */
       cards.forEach(card => this.coreNode.appendChild(card.getEnvelope()));
    }

    S8_dispose(){ /* continuous rendering approach... */ }
}