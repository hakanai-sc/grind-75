/**
 * 704. Binary Search
 * 
 * Given an array of integers nums which is sorted in ascending order, and an integer
 * target, write a function to search target in nums. If target exists, then return its
 * index. Otherwise, return -1.
 * 
 * You must write an algorithm with O(log n) runtime complexity.
 */

/*
    what is dumb about this question is the question itself. the fastest leetcode
    solution i am aware of to solving this problem is:

    return nums.indexOf(target);

    which solves the problem in the top 5% of solutions. but
    they want us to implement https://en.wikipedia.org/wiki/Binary_search_algorithm

    note that it is sorted in ascending order so we can.
*/
function search(nums: number[], target: number): number {
    // written by hakanai @ https://github.com/hakanai-sc/grind-75
    // set the range limits, begin and end
    let begin = 0;
    let end = nums.length - 1;

    // while the range doesn't invert...
    while (begin <= end) {
        // get the middle of our range
        let midpoint = Math.floor((begin + end) / 2);

        // if less, move the beginning range forward to where we are
        if (nums[midpoint] < target) {
            begin = midpoint + 1;
        }
        // if more, move the end range in from where we are
        else if (nums[midpoint] > target) {
            end = midpoint - 1;
        }
        // return the midpoint
        else {
            return midpoint;
        }
    }
    // we exhausted the range and found nothing.
    return -1;
};
