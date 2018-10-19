export function newEvent(eventName: string, bubbles: boolean = false, cancelable: boolean = false) {
    let evt = document.createEvent('CustomEvent'); // proper way for Phantom
    evt.initCustomEvent(eventName, bubbles, cancelable, null);
    return evt;
}
