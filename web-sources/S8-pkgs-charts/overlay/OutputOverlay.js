

import { S8WebFront } from '/S8-pkgs-ui-carbide/S8WebFront.js';



/**
 * 
 */
S8WebFront.CSS_import('/S8-pkgs-charts/overlay/OutputOverlay.css');



export class OutputOverlay {


    underlying;


    /**
     * @type{HTMLDivElement}
     */
    overlayNode;

    /**
   * @type{HTMLDivElement}
   */
    boxNode;

    isSyncRequestable = false;

    static OUT_OF_SYNC_CODE = 0;
    static SYNCING_CODE = 1;
    static SYNCED_CODE = 2;
    static FAILED_CODE = 3;





    constructor(underlying) {

        this.underlying = underlying;

        /* <uptodate-overlay> */
        this.overlayNode = document.createElement("div");
        this.overlayNode.classList.add("output-overlay");



        this.boxNode = document.createElement("div");
        this.boxNode.classList.add("output-overlay-box");
        this.boxNode.setAttribute("state", "synced");

        this.iconNode = document.createElement("div");
        this.iconNode.classList.add("output-overlay-icon");
        S8WebFront.SVG_insertByName(this.iconNode, "octicons/sync.svg", 64, 64);
        this.boxNode.appendChild(this.iconNode);

        this.messageNode = document.createElement("div");
        this.messageNode.classList.add("output-overlay-message");
        this.boxNode.appendChild(this.messageNode);

        this.overlayNode.appendChild(this.boxNode);


        const _this = this;
        this.overlayNode.addEventListener("click", function (event) {
            if(_this.isSyncRequestable){
                event.stopPropagation();
                _this.setState(OutputOverlay.SYNCING_CODE);
                _this.underlying.onSync();
            }
        });
        /* </uptodate-overlay> */

        /* init as out of sync */
        this.setState(OutputOverlay.OUT_OF_SYNC_CODE);
    }


    getLayerNode() {
        return this.overlayNode;
    }


    setState(code) {
        switch (code) {

            default:
            case OutputOverlay.OUT_OF_SYNC_CODE:
                this.overlayNode.setAttribute("state", "out-of-sync");
                S8WebFront.SVG_insertByName(this.iconNode, "octicons/sync.svg", 64, 64);
                this.isSyncRequestable = true;
                break;

            case OutputOverlay.SYNCING_CODE:
                this.overlayNode.setAttribute("state", "syncing");
                this.isSyncRequestable = false;
                break;

            case OutputOverlay.SYNCED_CODE:
                this.overlayNode.setAttribute("state", "synced");
                this.isSyncRequestable = false;
                break;

            case OutputOverlay.FAILED_CODE:
                this.overlayNode.setAttribute("state", "failed");
                S8WebFront.SVG_insertByName(this.iconNode, "octicons/x.svg", 64, 64);
                this.isSyncRequestable = false;
                break;
        }
    }


    setMessage(message) {
        this.messageNode.innerHTML = message;
    }

}