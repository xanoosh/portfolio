class LinkedList {
  constructor() {
    this.head = null; //first el
    this.tail = null; //last el
  }
  append(val) {
    const newNode = { value: val, next: null };
    if (this.tail) this.tail.next = newNode;
    this.tail = newNode;
    if (!this.head) this.head = newNode;
  }
  prepend(val) {
    //current head has to be linked here, or js garbage collector will ewentually delete it
    const newNode = { value: val, next: this.head };
    this.head = newNode;
    if (!this.tail) this.tail = newNode;
  }
  toArray() {
    const nodes = [];
    let currentNode = this.head;
    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }
    //false if empty
    return nodes.length > 0 && nodes;
  }
}

const test = new LinkedList();

console.table(test.toArray());
test.append('test');
test.append(true);
test.append(777);
console.table(test.toArray());
test.prepend('First');
console.table(test.toArray());
