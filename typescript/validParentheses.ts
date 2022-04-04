/**
 * 20. Valid Parentheses
 * Given a string s containing just the characters '(', ')', '{', '}', '[' and ']',
 * determine if the input string is valid.
 * An input string is valid if:
 *  Open brackets must be closed by the same type of brackets.
 *  Open brackets must be closed in the correct order.
**/


/*
nesting things... sounds like a good application of the stack.

in this, we need to make sure that our brackets:
    1. always have a corresponding closing bracket
    2. nest in such a way that we don't cross brackets e.g. ([]) is ok, not ([)]
    3. can nest each bracket scope indefinitely deeper e.g. ({{{{}}}}) is ok

we can use the stack for this because once we see a closing brace
we should immediately know that there should have been bracket of the same
type ahead of it.

so what we will do is push the expected close to the stack, and when we reach a closing
bracket, pop the bracket off of the stack and see if it is the one we are
expecting. if it isn't, we have failed one of the conditions above.

at the end of the string, if we have any brackets left, we will not have
triggered a pop so we can just check and return the boolean of if the length is zero.
*/

function isValid(s: string): boolean {
    // we will be constantly looking at a set of brackets.
    // might as well default to the hashmap construct to make
    // the lookups easier on us.
    const brackets = {
        '{': '}',
        '[': ']',
        '(': ')'
    };

    // use an Array as a "stack", because it is LIFO-capable.
    let parenStack = [];

    // precache length to slen to stop the length lookup on every iteration.
    for (let i = 0, slen = s.length; i < slen; i ++) {
        let char = s[i];
        if (char in brackets) {
            // this is an opening brace of one of the types
            // we are expecting. add the closing paren to the stack.
            parenStack.push(brackets[char]);
        } else {
            // this should be a closing brace that matches the one we pushed
            // onto the stack previously. if the stack is empty, or we have the wrong
            // closing brace when we pop, then we have not nested properly somewhere.
            if (parenStack.length === 0) {
              return false;
            }

            // Let's now pop the expected character from the stack.
            let expectedChar = parenStack.pop();
            // is this the expected character?
            if (expectedChar !== char) {
              return false;
            }
        }
    }

    // return whether or not there's anything on the stack.
    // if there is, something was left unclosed.
    return parenStack.length === 0;
}
