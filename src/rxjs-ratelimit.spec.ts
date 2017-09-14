import './rxjs-ratelimit';
import { TestScheduler } from 'rxjs/testing/TestScheduler';

describe('rxjs ratelimit', () => { 
    const assertEqual = (actual, expected) => expect(actual).toEqual(expected);
    let scheduler = new TestScheduler(assertEqual);

    let src: string; //source
    let exp: string; //expected
    
    beforeEach(() => {
        scheduler = new TestScheduler(assertEqual);
    });

    it('rate 1 window 50 ', () => {
        const count = 1;
        const window = 50;
        src = 'aaaa-------------';
        //50    ----| ----| ----| ----|
        exp = 'a----a----a----a-';

        const source = scheduler.createColdObservable(src);
        scheduler.expectObservable(source.rateLimit(count, window, scheduler)).toBe(exp);
        scheduler.flush();
    });

    it('rate 2 window 40 ', () => {
        const count = 2;
        const window = 40;
        src = 'aaa----------------';
        //40   ---|---|---|---|
        exp = 'aa--a--------------';

        const source = scheduler.createColdObservable(src);
        scheduler.expectObservable(source.rateLimit(count, window, scheduler)).toBe(exp);
        scheduler.flush();
    });

    it('rate 5 window 100 ', () => {
        const count = 5;
        const window = 100;
        src = 'aaaaaa-a------aa----';
        //40   ---|---|---|---|
        exp = 'aaaaa-----aa--aa----';

        const source = scheduler.createColdObservable(src);
        scheduler.expectObservable(source.rateLimit(count, window, scheduler)).toBe(exp);
        scheduler.flush();
    });

});