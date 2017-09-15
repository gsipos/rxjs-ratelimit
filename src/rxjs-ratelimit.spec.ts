import './rxjs-ratelimit';
import { TestScheduler } from 'rxjs/testing/TestScheduler';

describe('rxjs ratelimit', () => {
    const assertEqual = (actual, expected) => expect(actual).toEqual(expected);
    let scheduler = new TestScheduler(assertEqual);

    let count: number;
    let window: number;
    let src: string; //source
    let exp: string; //expected

    beforeEach(() => {
        scheduler = new TestScheduler(assertEqual);
    });

    const testMarbles = () => { 
        const source = scheduler.createColdObservable(src);
        scheduler.expectObservable(source.rateLimit(count, window, scheduler)).toBe(exp);
        scheduler.flush();
    };

    it('rate 1 window 50 ', () => {
        count = 1;
        window = 50;
        src = 'abcd-------------';
        exp = 'a----b----c----d-';

        testMarbles();
    });

    it('rate 2 window 40 ', () => {
        count = 2;
        window = 40;
        src = 'abc----------------';
        exp = 'ab--c--------------';

        testMarbles();
    });

    it('rate 5 window 100 ', () => {
        count = 5;
        window = 100;
        src = 'abcdef-g------aa----';
        exp = 'abcde-----fg--aa----';

        testMarbles();
    });

});