/**
 * 121. Best Time To Buy And Sell Stock
 * 
 * You are given an array prices where prices[i] is the price of a given stock
 * on the ith day.
 * 
 * You want to maximize your profit by choosing a single day to buy one stock
 * and choosing a different day in the future to sell that stock.
 *
 * Return the maximum profit you can achieve from this transaction. If you cannot
 * achieve any profit, return 0.
**/

/*

    the first pass at this is to just run two loops inside each other
    and then look. if i start at index i, and then check prices across
    all things after it, we can exhaustively check everything. this works
    until you get a lot of values and then you exceed the time limit. see
    "maxProfitNaive" for the fast/slow pointer pattern version.

    so lets think a bit about the data. it helped for me to visualize it.
    what we really want to know is the biggest range between two y values
    on a graph over time where t is the index of the array. so we can run
    through it once, keeping the min value and the profit at time t.

*/

function maxProfit(prices: number[]): number {
    
    // first, short circuit on the edge cases
    if (!Array.isArray(prices) || prices.length === 0) {
        return 0;
    }

    // set our best profit to the worst profit
    let bestProfit:number = 0;

    // set our best price to the worst price
    let bestPrice:number = Number.MAX_SAFE_INTEGER;

    // iterate
    for (let i = 0, plen = prices.length; i < plen; i++) {

        // check if the profit gained at this step is better
        // than what we had previously
        let currentProfit = prices[i] - bestPrice;
        if (currentProfit > bestProfit) {
            bestProfit = currentProfit;
        }
        
        // check if the price here is better than what we
        // had previously
        if (prices[i] < bestPrice) {
            bestPrice = prices[i];
        }
    }

    return bestProfit;
};



/**
 * This is the naive solution that will run out of time.
 */
function maxProfitNaive(prices: number[]): number {
    
    // first, short circuit on the edge cases
    if (!Array.isArray(prices) || prices.length === 0) {
        return 0;
    }

    // capture best profit. we actually don't care
    // about the days to do it here, so this is all
    // we track
    let bestProfit:number = 0;

    for (let i = 0, plen = prices.length; i < plen; i++) {
        // note we set this loop up to chase, depending on
        // what "i" is.
        for (let j = i + 1, jlen = plen; j < jlen; j++) {

            // calculate profit based upon where "i" and "j" are.
            let profit = prices[j] - prices[i];
            if (profit > bestProfit) {
                // if it's the best, make it the best.
                bestProfit = profit;
            }
        }
    }

    return bestProfit;
};