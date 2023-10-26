const sha256 = require('js-sha256');

class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable {

  constructor(numBuckets = 4) {
    this.count = 0;
    this.capacity = numBuckets;
    this.data = new Array(this.capacity).fill(null);
  }



  hash(key) {
    let hash = sha256(key);
    return (parseInt(`0x${hash.substring(0, 8)}`, 16));
  }

  hashMod(key) {
    return (this.hash(key) % this.capacity);
  }

  insertNoCollisions(key, value) {
    let index = this.hashMod(key);
    let kvp = new KeyValuePair(key, value);
    this.data[index] = kvp;
    this.count++;
  }

  insertWithHashCollisions(key, value) {
    let index = this.hashMod(key);
    let kvp = new KeyValuePair(key, value);
    console.log(this.count, this.capacity)
    if (this.count === this.capacity) {
      throw new Error('hash collision or same key/value pair already exists!')
    }
  }

  insert(key, value) {
    // Your code here
  }

}


module.exports = HashTable;
