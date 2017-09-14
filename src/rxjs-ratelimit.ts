import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/timer';
import { Scheduler } from 'rxjs/Scheduler';
import { async } from 'rxjs/scheduler/async';

Observable.prototype.rateLimit = function (count: number, slidingWindowTime: number, scheduler = async) {
    let tokens = count;
    const tokenChanged = new BehaviorSubject(tokens);
    const consumeToken = () => tokenChanged.next(--tokens);
    const renewToken = () => tokenChanged.next(++tokens);
    const availableTokens = tokenChanged.filter(() => tokens > 0);

    return this.mergeMap(value =>
        availableTokens
            .take(1)
            .map(() => {
                consumeToken();
                Observable.timer(slidingWindowTime, scheduler).subscribe(renewToken);
                return value;
            }));
}

declare module 'rxjs/Observable' {
    interface Observable<T> {
        rateLimit(count: number, slidingWindowTime: number, scheduler?: Scheduler): Observable<T>
    }
}