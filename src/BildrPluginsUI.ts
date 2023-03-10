import { BildrPluginLeftSide } from "./BildrPluginLeftSide";
import { BildrPluginManager } from "./BildrPluginManager";

declare var WEBPACKDEFINE_PRODUCTION: boolean

class BildrPluginsUI extends BildrPluginLeftSide {

    constructor() {
        let scriptUrl = ""
        if (WEBPACKDEFINE_PRODUCTION) {
            scriptUrl = "https://communityplugins.bildr.com/";
        }
        else {
            scriptUrl = "https://p1a6bee8b69e94699b5845bcfc8906d9b.bildr.com/"
        }

        super("BildrPluginsUI", scriptUrl)
        this.addAction("hidePlugin", () => { this.hide() });
        this.addActionObject(new LoadPluginScriptAndShowAction(document));
        this.addActionObject(new LoadPluginScriptAction(document));
        this.addAction("getProjectName", () => {
            let id = location.href.split("=");
            return id[1];
        });
    }
}

class LoadPluginScriptAndShowAction {
    private _document: Document;

    constructor(document: Document) {
        this._document = document
    }

    get name() {
        return "loadPluginScriptAndShow"
    };

    execFunc(args: any) {
        // Hide the visible plugin(s) (except me=BildrPluginsUI)
        BildrPluginManager.getVisiblePlugins().forEach(plugin => {
            if (plugin.name != "BildrPluginsUI") {
                plugin.hide();
            }
        });
        if (!BildrPluginManager.isRegistered(args.pluginName)) {
            var script = this._document.createElement("script");
            script.src = args.src;
            script.onload = () => {
                BildrPluginManager.showPlugin(args.pluginName);
            };
            this._document.head.appendChild(script);
        } else {
            BildrPluginManager.showPlugin(args.pluginName)
        }

    }
}

// Use this Action to load a plugin script and to run actions
// from the plugin on page load without showing the plugin.
class LoadPluginScriptAction {
    private _document: Document;

    constructor(document: Document) {
        this._document = document
    }

    get name() {
        return "loadPluginScript"
    };

    execFunc(args: any) {
        if (!BildrPluginManager.isRegistered(args.pluginName)) {
            var script = this._document.createElement("script");
            script.src = args.src;
            this._document.head.appendChild(script);
        }

    }
}

class PluginToolBarButton {
    static pluginsMenuItemDivId = "bildrPluginsMenuItem";
    static sideMenuBarDivCss = "css_23071.css_23052";

    static canAddPluginToBildrUI() {
        let sideMenuBarExists = PluginToolBarButton.getSideMenuBar() != undefined;
        let bildrPluginsMenuExists = PluginToolBarButton.getPluginsMenuItemDiv() != undefined;

        return sideMenuBarExists || bildrPluginsMenuExists;
    }

    private static getPluginsMenuItemDiv() {
        return document.getElementById("menu-studio-plugins");
    }

    private static getFileMenu() {
        return document.querySelectorAll('.css_moPKBBFqHkuJTheJOhSioQ')[0];
    }

    static getSideMenuBar() {
        return document.querySelector(`.${PluginToolBarButton.sideMenuBarDivCss}`);
    }

    static create() {
        if (!document.getElementById(PluginToolBarButton.pluginsMenuItemDivId)) {
            // init page for smooth sliding in and not seeing the page load
            let bildrPlugins = new BildrPluginsUI();
            if (!BildrPluginManager.isRegistered(bildrPlugins.name)) {
                BildrPluginManager.register(bildrPlugins)
            }

            // add the plugin menu item
            let bildrPluginsMenu = PluginToolBarButton.getPluginsMenuItemDiv() as HTMLDivElement;
            if (bildrPluginsMenu) {
                // enable the plugin menu item
                PluginToolBarButton.pluginsMenuItemDivId = bildrPluginsMenu.id;
                bildrPluginsMenu.style.opacity = "1";
                let bildrPluginsMenuObj = (bildrPluginsMenu as unknown as { brwObj: any }).brwObj;
                let evMouseEnter = bildrPluginsMenuObj.evs.mouseenter;

                addEventHandlers(bildrPluginsMenuObj, bildrPluginsMenu, [{
                    "eventID": 0,
                    "code": "click",
                    "actID": "89QiHjCXJ0i3MZiFFvC8vA"
                },
                    evMouseEnter
                ])
            }

            // Handle click on button, inside the plugin or outside the plugin (auto hide)
            // Mind the config param capture: true on the addEventListener
            document.body.addEventListener('click', e => {

                var target = e.target as HTMLElement;

                // assume the click is outside the plugin / div
                let action = "hide";
                let visiblePlugins = BildrPluginManager.getVisiblePlugins();

                while (target) {
                    if (target == null) return;

                    // Ignore click inside the plugin / div
                    let clickedInPlugin = visiblePlugins.find(p => p.isSameDivElem(target));
                    if (clickedInPlugin) {
                        action = "";
                        break;
                    }
                    // Handles click on plugins button (and image and tekst)
                    if (target.id == PluginToolBarButton.pluginsMenuItemDivId) {
                        action = "toggle";
                        break;
                    }
                    target = target.parentNode as HTMLElement;
                }

                if (action == "hide") {
                    visiblePlugins.forEach(p => p.hide());
                }
                if (action == "toggle") {
                    bildrPlugins.toggleVisibility();
                }

            }, { capture: true })

        }
    }
}

function initializeMutationObservers() {
    var onStudioLoadObservers = [];
    // set up marketplace button as soon as top bar is available
    onStudioLoadObservers.push(new MutationObserver(function (_mutations, me) {
        // `me` is the MutationObserver instance
        if (PluginToolBarButton.canAddPluginToBildrUI()) {
            // stop observing
            me.disconnect();
            PluginToolBarButton.create();
        }
    }));
    return onStudioLoadObservers;
}

/**
 * @public
 */
export function initPluginManagerUI() {

    // prevent running this script when not in Bildr Studio
    if (location.href.indexOf("https://www.bildr.com/studio?projectName=") != -1 ||
        location.href.indexOf("https://www.bildrtest.com/studio?projectName=") != -1) {
        // start observing
        var onStudioLoadObservers = initializeMutationObservers();

        onStudioLoadObservers.forEach(observer => {
            observer.observe(document, {
                childList: true,
                subtree: true
            });
        });
    }
}
