export interface GoogleBook {
    items: [{
        accessInfo: any;
        etag: any;
        id: any;
        kind: any;
        saleInfo: any;
        searchInfo: any;
        selfLink: any;
        volumeInfo: {
            authors: any;
            imageLinks: any;
            pageCount: any;
            publishedDate: any;
            publisher: any;
            title: any;
        };
    }];
    kind: any;
    totalItems: any;
}