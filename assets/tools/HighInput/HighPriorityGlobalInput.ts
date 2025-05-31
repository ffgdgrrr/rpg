import { Event, EventTarget, input } from "cc";

export class HighPriorityGlobalInput extends EventTarget implements IEventDispatcher {

    constructor(priority = 999) {
        super();
        this.priority = priority;
        input['_registerEventDispatcher'](this);
    }

    readonly priority: number;

    dispatchEvent(event: Event): boolean {
        this.emit(event.type, event);
        return true;
    }
}

interface IEventDispatcher {
    readonly priority: number;
    dispatchEvent(event: Event): boolean;
}

export const highPriorityGlobalInput = new HighPriorityGlobalInput();

