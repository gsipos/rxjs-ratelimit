# rxjs-ratelimit
Ratelimit operator for rxjs. 
Useful for api calls that have sliding window quota.

## Example usage
Use following code for limiting events in `1000ms` to a maximum of `5`.
```typescript
    import 'rxjs-observable';

    sourceObservable
        .rateLimit(5, 1000)
        .subscribe(event => doSomething(event));
```

## Token bucket
It uses token bucket algorithm. 
There are specified amount of tokens.
Once a value is emitted, it consumes a token. 
Tokens are regenerated after a while. 
It allows for short bursts of values to go through. 
When there are no tokens left, the value have to wait for a token to regenerate in order to be emitted.
