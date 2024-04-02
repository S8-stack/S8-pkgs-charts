

import { NeObject } from "/S8-core-bohr-neon/NeObject.js";




export class C2dGridChart extends NeObject {



    /**
     * @type{Popover}
     */
    popover = null;


    constructor(){
        super();

        this.wrapperNode = document.createElement("div");
        this.wrapperNode.classList.add("stdgrid-card-wrapper");

        this.cardNode = document.createElement("div");
        this.cardNode.classList.add("stdgrid-card-shape");
        this.wrapperNode.appendChild(this.cardNode);

        this.containerNode = document.createElement("div");
        this.containerNode.classList.add("stdgrid-card-access");
     
        this.picNode = document.createElement("div");
        this.picNode.classList.add("stdgrid-card-access-image");
        this.containerNode.appendChild(this.picNode);

        this.legendNode = document.createElement("div");
        this.legendNode.classList.add("stdgrid-card-access-title");
        this.containerNode.appendChild(this.legendNode);

        this.chartNode = document.createElement("div");
        this.chartNode.classList.add("stdgrid-card-access-info");
        this.containerNode.appendChild(this.chartNode);

        this.cardNode.appendChild(this.containerNode);

        let _this = this;
        this.isPopoverAttached = false;
        this.containerNode.addEventListener("click", function (event) {
            _this.S8_vertex.runVoid("on-click");
            event.stopPropagation();
        }, false);

    }

    getEnvelope() {
        return this.wrapperNode;
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
     * @param {string} legend 
     */
    S8_set_legent(name) {
        this.legendNode.innerHTML = name;
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