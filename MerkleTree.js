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

    /** Recurcive, layer by layer concatenate leaves.
     * returns: Concatenated leaves hash
     */
    getConcatLeaves(leaves){
        if (leaves.length == 1) {
            return leaves[0];
        }
        else {
            const concatLeaves = [];
            for (let i = 0; i < leaves.length; i+=2) {
                const l1 = leaves[i];
                const l2 = leaves[i+1];
                if (l2){
                    concatLeaves.push(concatHashes(l1, l2));
                } else {
                    concatLeaves.push(l1);
                }
            }
            return this.getConcatLeaves(concatLeaves);
        }
    }

    /** Merkle proof  */
    getProof(index, layer = this.leaves, proof = []) {
        if (layer.length === 1) return proof;
        const newLayer = [];
        for (let i = 0; i < layer.length; i += 2) {
            let left = layer[i];
            let right = layer[i + 1];
            if (!right) {
                newLayer.push(left);
            }
            else {
                newLayer.push(concatHashes(left, right));

                if (i === index || i === index - 1) {
                    let isLeft = !(index % 2);
                    proof.push({
                        hash: isLeft ? right : left,
                        left: !isLeft
                    });
                }
            }
        }

        return this.getProof(Math.floor(index / 2), newLayer, proof);
    }

}


function verifyProof(proof, nodeHash, rootHash) {
    // TODO Verify proof chain

}


module.exports = {MerkleTree, verifyProof }
