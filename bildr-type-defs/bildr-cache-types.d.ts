//  module bildrCacheTypes {
interface BildrDBCache {
    actions: group<action>,
    actionsTypes: group<actionType>
    elementsTypes: group<elementType>
    elements: group<element>,
    forms: group<form>,
    functions: group<functon>,
    pageHeader: group<pageHeader>,
    css: group<styleClass>,
    currentUser: group<currentUser>,
    filtersSets: group<filterSet>,
    url: group<route>
}

interface route extends nameIdDeleted{
    request: string
    value: string
}

interface group<T> extends nameId {
    projectID: string;
    recs: T[]
}

interface Array<T>  {
    SortedGet(id: string| number): {obj :T};
}

interface filterSet extends nameIdDeleted {
    type: string,
    groupID: string
}

interface actionType extends nameIdDeleted {
    opts: {
        coreType: any,
        archived?: boolean,
        marketplace?: {
            actionTypeID: string,
            checksum: string
        },
        sharedID?: string,
        settings: {
            displayName: string,
            actionTypeIcon?: string
        }
    };
}

interface currentUser extends nameIdDeleted {
    25: string,
    26: string,
    27: string,
    loginID: string
}

interface elementType extends nameIdDeleted {
    opts: {
        coreType: any;
        archived?: boolean;
        marketplace?: {
            actionTypeID: string,
            checksum: string
        };
        sharedID?: string;
        settings: {
            displayName: string,
            elementTypeIcon: string
        }
    };
}

interface functon extends nameIdDeleted {
    modifiedDate?: any;
    type: any,
    opts: any,
    JsCode: any
}

interface form extends nameIdDeleted {
    opts: formOpts;
    objsTree?: element[];
    actions: action[];
}

interface formOpts {
    archived?: boolean;
    resonanceDataListeners?: resonanceDataListener[];
    newRevisionActID?: actId | undefined;
    notAuthenticatedActID?: actId | undefined;
    reConnectedActID?: actId | undefined;
    notConnectedActID?: actId | undefined;
    onLoadAct?: actId | undefined;
    autoSaveActionID?: actId | undefined;
    mainStyleClass: string;
    pageDependencies: {pageID: string}[]
    stylesApplied: { id: string }[]
}

type actId = string | number;

interface resonanceDataListener {
    actID: actId | undefined;

}

interface action extends nameIdDeleted {
    opts: {
        arguments: actionArgument[],
    };
    formID: string;
    type: string;
}

interface actionArgument {
    hideFromInstances?: number
    defaultType?: string
    name: string;
    displayName: string;
    argumentType?: string;
    argumentTypeName?: string;
    argumentID?: string;
    thisIsAVariableName?: boolean
}

interface actionArgumentActionsArray extends actionArgument {
    value: actionRef[] | null;
}

interface actionArgumentStaticText extends actionArgument {
    type: string
    value: string;
    thisIsAVariableName: boolean;
}

interface actionArgumentVariable extends actionArgument {
    type: string
    value: string;
    partialValue?: string;
    path?: string;
    variableName: string;
}

interface actionArgumentFilterset extends actionArgument {
    filters?: {
        fieldsToFilterArray: {
            valueToFilterWith: actionArgumentVariable[]
        }[]
    }[]
}

interface actionArgumentElement extends actionArgumentVariable {
}

/**
 * @param type Only exists if a value is set
 * @param value Only exists if a value is set
 */
interface actionArgumentStaticActions extends actionArgument {
    type?: string;
    value?: string;
}

interface styleClass extends nameIdDeleted {
    opts: {
        /**
         * Only available on Primairy Style (value = 1)
         */
        mainStyle?: number
        /**
         * Only available on State (value = 1)
         */
        state?: number
        /**
         * Only available on State. Reference to (main) styleClass id
         */
        fromStyleID?: string
    }
}

interface element extends nameIdDeleted {
    items: element[] | undefined;
    opts: {
        arguments?: actionArgument[];
        events: event[];
        mainStyleClass: string;
        stylesApplied: { id: string }[]
        externalClassNames: string;
        binding?: {
            /** applicable when element binding a data collecion */
            elementData?: {
                dataTableID: string,
                fieldsArray: string,
            }
            /** applicable when element binding a data field */
            dataTableID: string;
            
            /** appicable when element binding a variable */
            fromVariable: string;  // 0 = not bound, 1 = bound
            fromVariableName?: string;
        }
    };
    formID: string;
    type: string;
    typeObj: elementType;
}

interface event {
    actID: string | null;
    code: string;
    eventID: number;
    _arrayIndex: number;
}

interface nameIdDeleted extends nameId {
    deleted?: number;
}

interface nameId {
    name: string;
    id: string | number;
}

interface actionsArray {
    value: actionRef[];
}

interface actionRef extends nameId { }

interface formInstance extends nameIdDeleted { }

interface brwForm {
    brObj: brwObj;
    name: any;
    form: formInstance;
    cBrwForms: brwForm[];
    _vars: { [key: string]: any }
}

interface brwObj {
    HTML: HTMLElement,
    brwForm: brwForm,
    childBrwFrm: brwForm,
    of: any
}

interface pageHeader extends nameIdDeleted {
    opts: {
        loadInStudio?: boolean,
        systemCreated?: boolean,
        systemType: string
    }
    value: string
}
// }