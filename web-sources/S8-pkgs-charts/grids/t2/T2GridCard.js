

import { S8Object } from "/S8-api/S8Object.js";
import { S8WebFront } from "/S8-pkgs-ui-carbide/S8WebFront.js";



export class T2GridCard extends S8Object {



    /**
     * @type{Popover}
     */
    popover = null;


    constructor(){
        super();

        this.cardNode = document.createElement("div");
        this.cardNode.classList.add("t2grid-card");

        /* <left-column> */
        this.leftColumnNode = document.createElement("div");
        this.leftColumnNode.classList.add("t2grid-card-left");


        this.legendNode = document.createElement("div");
        this.legendNode.classList.add("t2grid-card-legend");
        this.leftColumnNode.appendChild(this.legendNode);
      
        this.iconNode = document.createElement("div");
        this.iconNode.classList.add("t2grid-card-icon");
        this.leftColumnNode.appendChild(this.iconNode);

        this.cardNode.appendChild(this.leftColumnNode);
        /* </left-column> */

        /* <right-column> */
        this.rightColumnNode = document.createElement("div");
        this.rightColumnNode.classList.add("t2grid-card-right");
       

        this.contentNode = document.createElement("div");
        this.contentNode.classList.add("t2grid-card-content");
        this.rightColumnNode.appendChild(this.contentNode);

        this.cardNode.appendChild(this.rightColumnNode);
        /* </right-column> */

      
        let _this = this;
        this.isPopoverAttached = false;
        this.cardNode.addEventListener("click", function (event) {
            _this.S8_vertex.runVoid("on-click");
            event.stopPropagation();
        }, false);

    }

    getEnvelope() {
        return this.cardNode;
    }





    attachPopover() {
        this.popoverBox.attach(this.cardNode);
    }

    detachPopover() {
        this.popoverBox.detach();
    }


    /**
     * 
     * @param {Popover} popover
     */
    S8_set_popover(popover) {
        if (popover != null) {
            this.popover = popover;
            this.cardNode.appendChild(this.popover.getEnvelope());
            //this.popover.attach(this.cardNode);

            /* focus on node */
            this.popover.show();
        }
        else if (popover == null && this.popover != null) {
            this.cardNode.removeChild(this.popover.getEnvelope());
            this.popover = null;
        }
    }




   

    /**
     * 
     * @param {code} legend 
     */
    S8_set_icon(code) {
        S8WebFront.SVG_insertByCode(this.iconNode, code, 64, 64);
    }



   

    /**
     * 
     * @param {string} legend 
     */
    S8_set_legend(name) {
        this.legendNode.innerHTML = name;
    }





    /**
    * 
    * @param {*} table 
    */
    S8_set_content(content) {
        while(this.contentNode.firstChild) { this.contentNode.removeChild(this.contentNode.lastChild); }
        this.contentNode.appendChild(content.getEnvelope());
    }

    /**
     * 
     * @param {string} cards
     */
    S8_set_isSelected(isSelected) {
        if (isSelected) {
            this.containerNode.setAttribute("selected", '');
        }
        else {
            this.containerNode.removeAttribute("selected");
        }
    }

    S8_render() { /* continuous rendering approach... */ }

    S8_dispose() { /* continuous rendering approach... */ }

}