

import { S8Object } from '/S8-api/S8Object.js';
import { S8WebFront } from '/S8-pkgs-ui-carbide/S8WebFront.js';
import { T1GridCard } from '/S8-pkgs-charts/tables/t1/T1GridCard.js';



/**
 * 
 */
S8WebFront.CSS_import('/S8-pkgs-charts/grids/t2/T2Grid.css');


export class T2Grid extends S8Object {



    /**
     * @type{HTMLDivElement}
     */
    upToDateOverlayNode;

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
        this.upToDateOverlayNode = document.createElement("div");
        this.upToDateOverlayNode.classList.add("t2grid-overlay");
        this.upToDateOverlayNode.setAttribute("up-to-date", "true");
        this.isUpToDate = true;
        S8WebFront.SVG_insertByName(this.upToDateOverlayNode, "octicons/sync.svg", 64, 64);

        this.upToDateOverlayNode.addEventListener("click", function (event) {
            event.stopPropagation();
            _this.upToDateOverlayNode.setAttribute("up-to-date", "syncing");
            _this.onSync();
        });
        this.wrapperNode.appendChild(this.upToDateOverlayNode);

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



    S8_set_isUpToDate(state) {
        this.upToDateOverlayNode.setAttribute("up-to-date", state ? "true" : "false");
    }


    S8_dispose(){ /* continuous rendering approach... */ }
}