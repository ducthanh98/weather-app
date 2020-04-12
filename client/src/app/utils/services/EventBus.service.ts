import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { EventData } from '../model/EventData';
@Injectable({
    providedIn: 'root'
})
export class EventBusService {

    private subject$ = new Subject();

    constructor() { }


    emit(event$: EventData) {
        this.subject$.next(event$);
    }

    on(event: String, action): Subscription {

        return this.subject$.pipe(

            filter((e: EventData) => e.event === event),
            map((e: EventData) => e.value)

        )
            .subscribe(action)

    }
}
