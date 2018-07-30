import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';

import { Config } from '../config';

@Injectable()
export class MessageService {
    display = new Subject<{display: boolean, type: string, value: string}>();
    postAction  = new Subject<{action: string, object: string}>();

    constructor(private config: Config) {}  
    
    setMessage(data: {type: string, value: string, action: any, object: any}) {
        this.display.next({ display: true, type: data.type, value: data.value });
        setTimeout(() => {
            this.display.next({ display: false, type: undefined, value: undefined });
            if (data.action) {
                this.postAction.next({ action: data.action, object: data.object});
            }
        }, this.config.timer);
    }
}
