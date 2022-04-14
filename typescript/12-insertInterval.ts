/**
 * 57. Insert Interval
 * 
 * You are given an array of non-overlapping intervals intervals where 
 * intervals[i] = [starti, endi] represent the start and the end of 
 * the ith interval and intervals is sorted in ascending order 
 * by starti. You are also given an interval 
 * newInterval = [start, end] that represents the start and end of 
 * another interval.
 * 
 * Insert newInterval into intervals such that intervals is still 
 * sorted in ascending order by starti and intervals still does not 
 * have any overlapping intervals (merge overlapping intervals if 
 * necessary).
 * 
 * Return intervals after the insertion.
 */


/*
    the easiest way to solve this is to add all the intervals from the beginning
    just to it, then interleave the overlapping interval, then append the others.
*/


function insert(intervals: number[][], newInterval: number[]): number[][] {
    // written by hakanai @ https://github.com/hakanai-sc/grind-75

    let idx:number = 0;
    const ilen:number = intervals.length;
    const ret:Array<Array<number>> = [];

    // case 1: no overlap in beginning
    while (idx < ilen && intervals[idx][1] < newInterval[0]) {
        ret.push(intervals[idx]);
        idx++;
    }

    // case 2: overlap
    while (idx < ilen && newInterval[1] >= intervals[idx][0]) {
        newInterval[0] = Math.min(newInterval[0], intervals[idx][0]);
        newInterval[1] = Math.max(newInterval[1], intervals[idx][1]);
        idx++;
    }
    ret.push(newInterval);

    // case 3: no overlap, at the end
    while (idx < ilen) {
        ret.push(intervals[idx]);
        idx++;
    }
    return ret;
};

