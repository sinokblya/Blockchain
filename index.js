// Copied from: https://university.alchemy.com/course/ethereum

class TXO {
    constructor(owner, amount) {
        
    }
    spend() {
        
    }
}


class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}


class Tree {
    constructor() {
        this.root = null;
    }

    addNext(parent, child){
    }

    addNode(node){
    }

    hasNext(parent, data){
    }

    hasNode(data){
    }
}


function concatHashes(a, b) {
    return `Hash(${a} + ${b})`;
} 


function verifyProof(proof, node, root) {
}


class MerkleTree {

    constructor(leaves) {
        this.leaves = leaves;
    }

    getConcatLeaves(leaves){
    }

    getRoot() {
    }

    getProof(index, layer = this.leaves, proof = []) {
    }
}


class TrieNode {
    constructor(key) {
        this.key = key;
        this.children = null;
        this.isWord = false;
    }
}


class Trie {
    constructor() {
        this.root = new TrieNode(null);
    }
    insert(word) {
    }
}


module.exports = { TXO, Node, Tree, Trie, MerkleTree, verifyProof }
