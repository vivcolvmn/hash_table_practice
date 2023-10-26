const sha256 = require('js-sha256');

class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class newError extends Error{
  constructor(str, isColision){
    super(str)
    this.isColision = isColision;
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


    //if key already exists at this index
    let current = this.data[index]
    while (current){
      if (current.key === key){
        throw new newError('hash collision or same key/value pair already exists!', false)
      }
      current = current.next
    }

    //error if at capacity or same key-value
    if (this.count >= this.capacity) {
        throw new newError('hash collision or same key/value pair already exists!', true)
    }

    this.data[index] = kvp;
    this.count++;
  }

  insertWithHashCollisions(key, value) {
    try {
      this.insertNoCollisions(key, value);
    } catch (error) {
      let index = this.hashMod(key);
      let kvp = new KeyValuePair(key, value);

      //does this key exist in the list at this index.
      // console.log(this.data)
      if (error.isColision){
        kvp.next = this.data[index];
        this.data[index] = kvp;
        this.count++
      } else {
        let current = this.data[index]
        while (current){
          if (current.key === key){
            current.value = value;
          }
          current = current.next
        }
      }
    }
  }

  insert(key, value) {
    this.insertWithHashCollisions(key, value)
  }

}


module.exports = HashTable;
