/**
 * 242. Valid Anagram
 * 
 * Given two strings s and t, return true if t is an anagram of s, and false otherwise.
 */


/*
    an anagram simply assumes that all the letters in s are in t. there are
    a few ways to cut this: for example, sorting both s and t and then checking
    along the length of them.

    i solved this converting `s` into a hash map for fast lookups and then
    checked `t` against the hashmap, making sure i had enough of that character
    to match for the anagram.

    the algorithm below takes `s` and then makes a map of how many occurrences
    of that character is found - like a "character bank". after this, we then
    go through t and lookup in the map if we have a "bank balance" of that
    character. if we do, we debit one from the map.

    if we don't have any more of the characters, or don't have the character
    in the map at all, then it's not an anagram.
*/

function isAnagram(s: string, t: string): boolean {
    // written by hakanai @ https://github.com/hakanai-sc/grind-75

    // can't be an anagram if they aren't the same length
    if (s.length !== t.length) {
        return false;
    }
    
    const map = {};
    let i:number, len:number;

    // make the "bank" of characters by looking at all chars in s
    for (i = 0, len = s.length; i < len; i++) {
        const char = s[i];

        // if it exists in the map, then add 1 to bank
        if (char in map) {
            map[char]++;
        } else {
            // add this new character to the map
            map[char] = 1;
        }
    }

    // now look through t, drawing on the bank we made in "map"
    for (i = 0, len = t.length; i < len; i++) {
        const char = t[i];
        if (char in map) {
            // we have the character, so decrement
            map[char]--;
            if (map[char] == 0) {
                // we are now out of characters, so strike the key
                // so we end up failing `if char in map`
                delete map[char];
            }
        } else {
            // we don't have one of these at all, so return false
            return false;
        }
    }

    // if we got here, the bank is actually depleted and map has
    // no keys, per the logic above. if L29 conditional didnt exist
    // we would want to check to see if any keys are left in map
    return true;
};