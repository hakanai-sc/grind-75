/**
 * 21. Merge Two Sorted Lists
 *
 * You are given the heads of two sorted linked lists list1 and list2.
 * Merge the two lists in a one sorted list. The list should be made by
 * splicing together the nodes of the first two lists.
 *
 * Return the head of the merged linked list.
 */


/*
    this is the merge step of a merge sort.
    we move along the list and add them to a new list.

    this is a place where we need to remember that in javascript
    class and object references are passed *by reference* not by value
    so we really do get something close to pointers for .next and the 
    list nodes.
    
    a lot of people create new nodes and copy the value over, but why
    not just copy in the whole node structure instead of making new
    ones all the time
*/

/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
**/
function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
    // written by hakanai @ https://github.com/hakanai-sc/grind-75

    // edge case: make sure list1 and list2 are not empty
    const L1NotExists:boolean = !(list1);
    const L2NotExists:boolean = !(list2);
    
    // be defensive
    if (L1NotExists && L2NotExists) {
        return null;
    }
    if (L1NotExists) {
        return list2;
    }
    if (L2NotExists) {
        return list1;
    }

    // create a head for a "new" list that we will return
    // as the merged version of the list.
    let head = null;
    
    // we will also need to track our last position in the list,
    // so create a cursor to do so.
    let cursor;

    // first, set the head
    if (list1.val < list2.val) {
        // copy the value into head
        head = list1;
        // set cursor to the head
        cursor = head;
        // move the list along.
        list1 = list1.next;
        // set the "next" value of the node in head to null.
        // we don't want the whole list, and list1 is still
        // tracking the reference
        head.next = null;
    } else {
        head = list2;
        cursor = head;
        list2 = list2.next;
        head.next = null;
    }

    // we will MOVE nodes off the list to the new one
    // so we can use a WHILE until both lists are null.
    while (list1 !== null && list2 !== null) {
        // we always need to take the LESSER of the values
        // and add it to the list we link along.
        if (list1.val < list2.val) {
            // create a new node on the list
            cursor.next = list1;
            // increment list1 forward
            list1 = list1.next;
            // remove the pointer to next
            cursor.next.next = null;
            // set cursor forward
            cursor = cursor.next;
        } else {
            cursor.next = list2;
            list2 = list2.next;
            cursor.next.next = null;
            cursor = cursor.next;
        }
    }

    // in the case of uneven lists, we'll need to iterate
    // to exhaust them
    while (list1) {
        cursor.next = list1;
        list1 = list1.next;
        cursor.next.next = null;
        cursor = cursor.next;
    }

    while (list2) {
        cursor.next = list2;
        list2 = list2.next;
        cursor.next.next = null;
        cursor = cursor.next;
    }

    // cursor will be the tail, so return head
    return head;
};
