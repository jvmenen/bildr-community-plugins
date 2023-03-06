import { BildrPluginRightSide } from "./BildrPluginRightSide";

/**
 * @public
 */
export class BildrPluginLeftSide extends BildrPluginRightSide {
    left: string = '0px';
    constructor(name: string, pageUrl: string) {
        super(name, pageUrl);
    }

    public override renderPage(): void {
        if (!this._divElem) {
            // CREATE plugin div/iframe
            let elem = this.document.createElement('div');
            elem.id = this._divId;
            elem.setAttribute('name', this._name);
            elem.style.cssText = "width:0px;height:100vh;top:48px;left:-350px;right:unset;bottom:unset;border:none;background:#ffffff;position: fixed;z-index: 100004;overflow: hidden;position:absolute;transition: left 300ms ease-in-out 0s;";
            elem.innerHTML = `<iframe id='${this._frameId}' src='${this.pageUrl}' style='all:unset;width:100%;height:100%';background-color:#292c33></iframe>`;
            // add to document (right side)
            this.document.body.appendChild(elem);

            // Animation end handler
            elem.addEventListener('transitionend', _e => {
                // when the animation is finished, "hide" it when out of view
                // prevents UI issues when the Studio canvas is scaled
                if (elem.style.left != this.left) { elem.style.width = '0px'; }
            });

            this._divElem = elem;
        }
    }
    public override hide() {
        this._divElem.style.left = "-350px";
    }

    public override show() {
        this._divElem.style.width = '350px';
        this._divElem.style.left = this.left;
    }

    public override get isVisible() {
        return this._divElem.style.left == this.left;
    }
}