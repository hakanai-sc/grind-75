/**
 * 973. K Closest Points to Origin
 * 
 * Given an array of points where points[i] = [xi, yi] represents a point on
 * the X-Y plane and an integer k, return the k closest points to the origin (0, 0).
 *
 * The distance between two points on the X-Y plane is the Euclidean 
 * distance (i.e., √(x1 - x2)2 + (y1 - y2)2).
 * 
 * You may return the answer in any order. The answer is guaranteed to be 
 * unique (except for the order that it is in).
 */

/*
    basically, we will need to keep track of all the distances to the origin.
    the points can arrive in basically any order, so we can't assume we can just
    take the first few, etc. and return them.

    what i did for this was to create a 3-tuple array where it is x, y, dist,
    then use Array.sort, map and slice to reduce to the array dimensions
    that the output requires.

    this felt relatively intuitive to solve in this way from doing data
    mangling in numpy for data science work
*/

function kClosest(points: number[][], k: number): number[][] {
    // written by hakanai @ https://github.com/hakanai-sc/grind-75

    // create a small function that does euclidean distance
    const distanceFromOrigin = (point:number[]):number => {
        return Math.abs(Math.sqrt(Math.pow(point[0], 2) + Math.pow(point[1], 2)));
    };

    // let's functionally program
    return points
    // map in the distance so all points are [dist, x, y]
    .map((point:number[]):[number, number,number] => {
        return [distanceFromOrigin(point), point[0], point[1]];
    })
    // sort by distance
    .sort((a, b) => {
        if (a[0] < b[0]) {
            return -1;
        } else if (a[0] > b[0]) {
            return 1;
        } else {
            return 0;
        }
    })
    // slice the ones we need to return off
    .slice(0, k)
    // remove the distance since we need (x, y) dimensions
    .map((val) => { 
        return val.slice(1);
    });

};