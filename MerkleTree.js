/**
 * Seminar 2.4 Simple Merkle Tree
 */


function concatHashes(a, b) {
    return `Hash(${a} + ${b})`;
} 


class MerkleTree {
    constructor(leaves) {
        this.leaves = leaves;
    }

    getRoot() {
        // TODO 1 
    }

    getProof(index) {
        // TODO 2
    }
}


function verifyProof(proof, node, root) {
    // TODO 3
}


module.exports = {MerkleTree, verifyProof }
