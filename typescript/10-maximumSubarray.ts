/**
 * 53. Maximum Subarray
 * 
 * Given an integer array nums, find the contiguous subarray (containing at least one 
 * number) which has the largest sum and return its sum.
 * 
 * A subarray is a contiguous part of an array.
 */

/*
    https://en.wikipedia.org/wiki/Maximum_subarray_problem

    this is a known problem in computer science; we are going to implement
    kadane's algorithm. kadane's algorithm is an O(n) solution to the problem.
    how does it work?

    note that we cannot just use normal kadane's algorithm which allows for empty
    subarrays. instead, we have to have a subarray that contains at least one 
    number. this is the important catch.

    from wikipedia:

    > For the variant of the problem which disallows empty subarrays, best_sum 
    > should be initialized to negative infinity instead[11] and also in the for loop
    > current_sum should be updated as max(x, current_sum + x).[note 7] In that case,
    > if the input contains no positive element, the returned value is that of the
    > largest element (i.e., the value closest to 0), or negative infinity if the 
    > input was empty. For correctness, an exception should be raised when the input
    > array is empty, since an empty array has no maximum subarray.
*/

function maxSubArray(nums: number[]): number {
    // written by hakanai @ https://github.com/hakanai-sc/grind-75

    let currentSum = 0;
    let bestSum = Number.MIN_SAFE_INTEGER; // don't use MIN_VALUE here
    for (let i = 0, ilen = nums.length; i < ilen; i++) {
        // this currentSum shift is what we have to do to always make sure we
        // at least pay attention to avoid empty subarrays.
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        // which is better? where we are now, or where we were?
        bestSum = Math.max(bestSum, currentSum);
    }
    return bestSum;
};