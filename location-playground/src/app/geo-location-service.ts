import { Injectable, EventEmitter } from "@angular/core";

declare type GeoLocationServiceState = "disabled" | "searching" | "tracking";


// https://gist.github.com/sasha7/0c32f3686eb49d44ccc8

@Injectable({
    providedIn: 'root',
  })
export class GeoLocationService {

    private state: GeoLocationServiceState;
    private watchNumber: number;

    public positionChanged: EventEmitter<any>;

    constructor() {
        this.watchNumber = -1;
        this.positionChanged = new EventEmitter();
        this.state = "disabled";
    }

    public getState(): GeoLocationServiceState {
        return this.state;
    }

    public enable() {
        switch (this.state) {
            case "disabled":
                this.startWatching();
                return;
            case "searching":
            case "tracking":
                return;

        }
    }
    public disable() {
        switch (this.state) {
        case "disabled":
            return;
        case "searching":
        case "tracking":
            this.stopWatching();
            return;
        }
    }

    private startWatching() {
        if (window.navigator && window.navigator.geolocation) {
            this.state = "searching";
            this.watchNumber = window.navigator.geolocation.watchPosition(
                (position) => {
                    this.state = "tracking";
                    this.positionChanged.next(position);
                },
                (error) => {
                    // sending error will terminate the stream
                    this.positionChanged.next(null);
                    this.disable();
                },
                {
                    enableHighAccuracy: true,
                    timeout: 5000
                });
        }
    }

    private stopWatching() {
        if (this.watchNumber !== -1) {
            window.navigator.geolocation.clearWatch(this.watchNumber);
            this.watchNumber = -1;
            this.state = "disabled";
        }
    }
}