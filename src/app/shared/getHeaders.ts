import { Headers } from "@angular/http";

export const GetHeaders = () => {
    let header: Headers;
    header = new Headers();
    header.append('Content-Type', 'application/x-www-form-urlencoded');
    header.append('Access-Control-Allow-Origin', '*');
    return header;
}
