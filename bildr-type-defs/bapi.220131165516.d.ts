 declare function bcore(): () => {
    f: {
        getArgValue(): any;
    };
};
 declare function auth(): {};
 declare function model(global: any): {
    helper: {};
    app: {};
    element: {};
    page: {
        page: any;
        title: string;
    };
};
 declare function proto(): {
    number: {};
    string: {
        Base64Decode(): any;
        ToDate(): Date;
        IsValidDate(): any;
        toJsObject(): any;
        Trim(): any;
        BapiSplit(sSplit: any): any;
        IsTrue(): boolean;
    };
    array: {};
    date: {};
    object: {};
};
