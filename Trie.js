/**
 * Seminar 2.5 Simple Trie
 */


class TrieNode {
    constructor(key) {
        this.key = key;
        this.children = {};
        this.isWord = false;
    }
}


class Trie {
    constructor() {
        this.root = new TrieNode(null);
    }

    insert(word) {
        // TODO Insert word symbol by symbol

    }

    hasNode(word){
        // TODO Check is word in Trie
        return false;
    }

    getAllNodes(){
        // TODO returns all nodes as array
        return [];
    }
}

module.exports = { Trie };
