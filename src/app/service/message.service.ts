import { EventEmitter, Injectable } from '@angular/core';

import { Config } from '../config';

@Injectable()
export class MessageService {
    display = new EventEmitter<{display: boolean, type: string, value: string}>();
    postAction  = new EventEmitter<{action: string, object: string}>();

    constructor(private config: Config) {}  
    
    setMessage(data: {type: string, value: string, action: any, object: any}) {
        this.display.emit({ display: true, type: data.type, value: data.value });
        setTimeout(() => { 
            this.display.emit({ display: false, type: undefined, value: undefined });
            if (data.action) {
                this.postAction.emit({ action: data.action, object: data.object});
            }
        }, this.config.timer);
    }
}
