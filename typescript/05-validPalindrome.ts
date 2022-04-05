/**
 * 125. Valid Palindrome 
 * 
 * A phrase is a palindrome if, after converting all uppercase letters into lowercase 
 * letters and removing all non-alphanumeric characters, it reads the same forward and
 * backward. Alphanumeric characters include letters and numbers.
 * 
 * Given a string s, return true if it is a palindrome, or false otherwise.
 */

/*
    i was asked a variant of this on a faang software engineering
    interview once as my very first question i was asked.

    there's a "fast" solution calling into JS native code:
    
    return (s === s.split('').reverse().join(''));

    this is the answer i initially provided, and said it generally
    proves faster. this was acceptable to the engineer, but it's
    actually wrong.

    it is faster, but only until the code is run
    repeatedly in the VM, and then i suspect the index-based 
    approach is optimized by the jit compiler once it becomes a
    "hot" path. so there is no correct answer here as to which is
    the optimal one - it depends upon your solution.
    
    the "traditional" solution below is 56% faster in 
    safari benchmarks, but slower on leetcode by about 30%.
*/
function isPalindrome(s: string): boolean {
    // written by hakanai @ https://github.com/hakanai-sc/grind-75

    // prep the string: convert to single case and replace all non-alphanumerics.
    s = s.toLowerCase();
    s = s.replace(/[^a-z0-9]/g, "");

    // by the rules displayed, an empty string is a palindrome.
    if (s === "") {
        return true;
    }

    // we will create a 'front' pointer and a 'back' pointer
    // and meet in the middle. if the front matches the back
    // we have a palindrome.
    const len = s.length;
    let front = 0;
    let back = len - 1;
    while (front < back) {
        if (s[front] !== s[back]) {
            return false;
        }
        front++;
        back--;
    }
    return true;
};