//Objective is to remove all consecutive nodes in a linked list that add up to 0

class Node {
    constructor(val, next = null) { //if next is not given, assume it is empty
      this.val = val
      this.next = next
    }
}

class LinkedList {
    constructor() {
      this.head = null
    }

    addNodeToBack(data) {
        let current = this.head //initialize to beginning
    
        if (!this.head) { //if the list is empty...
            this.head = new Node(data)
        } else {
            while (current.next) {
                current = current.next //move along the list
            }
            current.next = new Node(data)
        }
    }
}

let head = new Node(1)
head.next = new Node(2)
head.next.next = new Node(-3)
head.next.next.next = new Node(3)
head.next.next.next.next = new Node(1)


//O(n) solution that uses a hashmap to keep track of prefix sums and if
//a sum appears again, we remove the nodes in between from the list

let newNode = new Node(0)
newNode.next = head
let sum = 0
let map = {0: [newNode]}

while (head) {
    sum += head.val 
    
    //If the sum already exists, we skip over all values in between the current node
    //and the previous node that had that sum
    //For reference, if we subtract two prefix sums of same value from one another, we get 0
    if (sum in map) {
        for (let node of map[sum]) {
            node.next = head.next
        }
    }
    
    if (!map[sum]) {
        map[sum] = [head]
    } else {
        map[sum].push(head)
    }
    
    head = head.next
}

return newNode.next