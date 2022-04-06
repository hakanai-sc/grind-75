/**
 * 733. Flood Fill
 * 
 * An image is represented by an m x n integer grid image where image[i][j] represents the pixel value of the image.
 * You are also given three integers sr, sc, and newColor. You should perform a flood fill on the image starting from the pixel image[sr][sc].
 * To perform a flood fill, consider the starting pixel, plus any pixels connected 4-directionally to the starting pixel of the same color as the starting pixel, plus any pixels connected 4-directionally to those pixels (also with the same color), and so on. Replace the color of all of the aforementioned pixels with newColor.
 * Return the modified image after performing the flood fill.
 */

/*
    this one initially gave me some drama because i had the coordinates of the image
    wrong. you have realize that the y axis is the first index, and the x axis is
    the second. it would pass on some test cases and i had to draw the image to see
    what was going wrong in each step.

    i chose to implement this algorithm by using a stack. the stack is used to
    queue up pixels we need to go fill. it works as follows:

    1. fill the pixel we're at with the new color
    2. state we have visited this location.
    3. look north, east, south and west of us. if we haven't been to these places,
       and they have the starting color, we need to fill them. add them to the stack

    this solution varies wildly in performance on leetcode. i have had it be
    "faster than 99.54%" and then in some other cases "faster than 5.54%". memory
    usage appears to be good.
*/

function floodFill(image: number[][], sr: number, sc: number, newColor: number): number[][] {
    // written by hakanai @ https://github.com/hakanai-sc/grind-75
    // what color are we starting with?
    const beginColor = image[sr][sc];
    const heightMax = image.length - 1;
    // we are going to assume a square image.
    const widthMax  = image[0].length - 1;

    // as we will be walking around and coloring new pixels,
    // and walking then, a stack/queue feels like the right ds
    // to use in this case
    const pixelStack:Array<[number, number]> = [[sr, sc]];

    // create a hashmap for fast lookups of places we have already been
    // so we don't route back to where we came from.
    const visited = {};
    
    // make a little function that makes it easier for us to
    // check if where we want to go actually is a valid point
    const withinBounds = function(coord:[number, number]):boolean {
        const result = 
            coord[0] >= 0 && coord[0] <= heightMax &&
            coord[1] >= 0 && coord[1] <= widthMax;
        return result;
    }
    
    while (pixelStack.length > 0) {
        let coord = pixelStack.pop();
        if (!coord) { 
            break;
        }
        const y = coord[0];
        const x = coord[1];
        
        // paint this pixel
        image[y][x] = newColor;
        // don't backtrack
        visited[`${y}:${x}`] = true;

        // walk north, east, south and west
        // if it exists, hasn't been visited
        // and happens to have the same color as the begin color
        const n:[number, number] = [y+1, x];
        if (withinBounds(n) && !visited[`${n[0]}:${n[1]}`] && image[n[0]][n[1]] === beginColor) {
            pixelStack.push(n);
        }
        const e:[number, number] = [y, x+1];
        if (withinBounds(e) && !visited[`${e[0]}:${e[1]}`] && image[e[0]][e[1]] === beginColor) {
            pixelStack.push(e);
        }
        const w:[number, number] = [y, x-1];
        if (withinBounds(w) && !visited[`${w[0]}:${w[1]}`] && image[w[0]][w[1]] === beginColor) {
            pixelStack.push(w);
        }
        const s:[number, number] = [y-1, x];
        if (withinBounds(s) && !visited[`${s[0]}:${s[1]}`] && image[s[0]][s[1]] === beginColor) {
            pixelStack.push(s);
        }
    }

    return image;
};

