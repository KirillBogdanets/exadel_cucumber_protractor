'use strict';

class Memory{
    setter(key, value){
       this[key] = value;
    };

    getter(key) {
        return this[key];
    }
}

module.exports = new Memory();