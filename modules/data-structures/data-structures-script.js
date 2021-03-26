class LinkedList {
  constructor() {
    this.start = null;
    this.end = null;
  }
  append(value) {
    const newElement = {
      value: value,
      nextNode: null,
    };
    if (this.end) {
      this.end.nextNode = newElement;
    }
    this.end = newElement;
    if (!this.start) {
      this.start = newElement;
    }
  }
  toArray() {
    const elements = [];
    let element = this.start;
    if (!element) return;
    while (element) {
      elements.push(element);
      element = element.next;
    }
  }
}

const myDataStructure = new LinkedList();

myDataStructure.append('s');
myDataStructure.append('u');
myDataStructure.append('p');
myDataStructure.append('e');
myDataStructure.append('r');

console.log(myDataStructure.toArray());
