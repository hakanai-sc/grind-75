/**
 * twoSum
 * https://leetcode.com/problems/two-sum/
 * Difficulty: Easy
 * Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
 *
 * You may assume that each input would have exactly one solution, and you may not use the same element twice.
 * You can return the answer in any order.
 **/

/*
How this works:

We need to know if two numbers add up to a sum. To do this, we need to look at each element
of the array and see if there is another element in the array that is the subtractive complement
we can use. If we have `target`, how do we get it in nums?

We can start looking through the array, starting with nums[0]. OK, so what plus nums[0] adds up to
target? That would be (target - nums[0]). So the easy approach would be to just iterate through
the whole array looking for the index of target - nums[0]) and returning both indices.

This is very slow, O(n^2) at worst case.

So how can we speed up lookups? Hashmaps, which give us O(1) lookup. We can copy the values and
make a map of [complement] => index, then we can just look up the complement if we have it in the
hash map.

This gives us a new algorithm of making a map of complement => index, and then starting at
0 in the nums array and looking up the complement from the hashmap instead of another search of
the array.

However, we can also just check for a "hit" even if we aren't fully done with the array and make it
even faster, so we don't take up as much space as well. That's how this algorithm works.

Time complexity: O(n)
Space complexity: O(n)
*/

function twoSum(nums: number[], target: number): number[] {
    // written by hakanai @ https://github.com/hakanai-sc/grind-75
    // create a JS object
    let map = {};

    // we need an index counter, so use a for loop to iterate "i" for us to give us the
    // current array index we are going to add into map (remember complement => index.)
    for (let i = 0; i < nums.length; i++) {
        // calculate the complement
        let complement = target - nums[i];

        // check: do we already have this complement in the map?
        // if so, just return i (where we are) and map[complement] (where we have been that had it).
        if (complement in map) {
            return [i, map[complement]];
        }

        // we haven't reached the complement yet, so add it to the map and continue.
        map[nums[i]] = i;
    }

    // we should not get here per the problem, but let's be defensive
    // and throw an error here since it is wrong.
    return new Error(`Search exhausted, no sum found.`);
};

