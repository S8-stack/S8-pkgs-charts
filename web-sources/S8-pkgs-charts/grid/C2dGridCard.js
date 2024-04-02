

import { NeObject } from "/S8-core-bohr-neon/NeObject.js";




export class C2dGridCard extends NeObject {



    /**
     * @type{Popover}
     */
    popover = null;


    constructor(){
        super();

        this.cardNode = document.createElement("div");
        this.cardNode.classList.add("c2dgrid-card");

        this.chartNode = document.createElement("div");
        this.chartNode.classList.add("c2dgrid-card-chart");
        this.cardNode.appendChild(this.chartNode);

        this.legendNode = document.createElement("div");
        this.legendNode.classList.add("c2dgrid-card-legend");
        this.cardNode.appendChild(this.legendNode);


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
    * @param {string} cards 
    */
    S8_set_chart(chart) {
        while(this.chartNode.firstChild) { this.chartNode.removeChild(this.chartNode.lastChild); }
        this.chartNode.appendChild(chart.getEnvelope());
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