// Copied from: https://university.alchemy.com/course/ethereum

const { assert } = require('chai');
const TXO = require('./index').TXO;
const Tree = require('./index').Tree;
const Node = require('./index').Node;
const Trie = require('./index').Trie;
const MerkleTree = require('./index').MerkleTree;
const verify = require('./index').verifyProof;


describe('TXO', function () {
    const address = "1DBS97W3jWw6FnAqdduK1NW6kFo3Aid1N6";
    const amount = 10;
    const txo = new TXO(address, amount);

    describe('constructor', () => {
        it('should set the owner', () => {
            assert.equal(txo.owner, address);
        });
        it('should set the amount', () => {
            assert.equal(txo.amount, amount);
        });
        it('should set spent to false', () => {
            assert.equal(txo.spent, false);
        });
    });

    describe('spend', () => {
        it('should set spent to true', () => {
            txo.spend();
            assert.equal(txo.spent, true);
        });
    });
});


describe('tree', () => {
    const tree = new Tree();

    it('should have a null root', () => {
        assert.strictEqual(tree.root, null);
    });

    describe('after adding 5', () => {
        before(() => {
            tree.addNode(new Node(5));
        });

        it('should have a root', () => {
            assert(tree.root, "did not find a root on the tree");
            assert.equal(tree.root.data, 5);
        });

        it('should find 5', () => {
            assert(tree.hasNode(5), "did not find a node with data 5");
        });

        it('should not find 4', () => {
            assert.isNotTrue(tree.hasNode(4));
        });

        describe('after adding 3', () => {
            before(() => {
                tree.addNode(new Node(3));
            });

            it('should have add a left to the root', () => {
                assert(tree.root.left, "did not find a left node on the root!");
                assert.equal(tree.root.left.data, 3);
            });

            it('should find 3', () => {
                assert(tree.hasNode(3), "did not find a node with data 3");
            });

            it('should not find 4', () => {
                assert.isNotTrue(tree.hasNode(4));
            });

            describe('after adding 4', () => {
                before(() => {
                    tree.addNode(new Node(4));
                });

                it('should have add to the left node', () => {
                    assert(tree.root.left.right, "did not find a right on the left node on the root!");
                    assert.equal(tree.root.left.right.data, 4);
                });

                it('should find 4', () => {
                    assert(tree.hasNode(4), "did not find a node with data 4");
                });
            });
        });

        describe('after adding 7', () => {
            before(() => {
                tree.addNode(new Node(7));
            });

            it('should have add a right to the root', () => {
                assert(tree.root.right, "did not find a right node on the root!");
                assert.equal(tree.root.right.data, 7);
            });

            it('should find 7', () => {
                assert(tree.hasNode(7), "did not find a node with data 7");
            });
        });
    });
});


describe('merkle proof verification', function() {
  describe('a given merkle tree', function() {
    const leaves = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
    const root = "Hash(Hash(Hash(Hash(A + B) + Hash(C + D)) + Hash(Hash(E + F) + Hash(G + H))) + Hash(Hash(I + J) + K))";
    let tree; 
    beforeEach(() => {
      tree = new MerkleTree(leaves.slice(0));
    });

    describe('untampered proofs', function() {
      leaves.forEach((_, i) => {
        it(`should verify the proof for leaf index ${i}`, function() {
          const proof = tree.getProof(i);
          assert.equal(verify(proof, leaves[i], root), true);
        });
      });
    });

    describe('tampered proofs', function() {
      describe('verifying a different node with a proof', function() {
        it('should not verify the proof', function() {
          let proof = tree.getProof(2);
          assert.equal(verify(proof, leaves[3], root), false);
        });
      });

      describe('verifying a different root', function() {
        it('should not verify the proof', function() {
          let proof = tree.getProof(2);
          const badRoot = "Hash(Hash(Hash(Hash(A + C) + Hash(C + D)) + Hash(Hash(E + F) + Hash(G + H))) + Hash(Hash(I + J) + K))";
          assert.equal(verify(proof, leaves[2], badRoot), false);
        });
      });

      describe('flipping a nodes position', function() {
        it('should not verify the proof', function() {
          let proof = tree.getProof(3);
          proof[1].left = !proof[1].left;
          assert.equal(verify(proof, leaves[3], root), false);
        });
      });

      describe('editing a hash', function() {
        it('should not verify the proof', function() {
          let proof = tree.getProof(5);
          proof[2].data = "Q";
          assert.equal(verify(proof, leaves[5], root), false);
        });
      });
    });
  });
});



describe('Trie', () => {
    describe('with a single word', () => {
        let trie;
        beforeEach(() => {
            trie = new Trie();
            trie.insert('hey');
        });

        it('should connect the root to the first letter', () => {
            const firstNode = trie.root.children['h'];
            assert.equal(firstNode.key, 'h', 'expected the `key` of the first node to be `h`');
            assert(firstNode.children['e'], 'expected the `children` of the first node to have a connection to the next letter');
            assert.equal(firstNode.isWord, false, 'expected the `isWord` of the first node to be `false`');
        });

        it('should connect the root to the second letter', () => {
            const firstNode = trie.root.children['h'];
            const secondNode = firstNode.children['e'];
            assert.equal(secondNode.key, 'e', 'expected the `key` of the first node to be `e`');
            assert(secondNode.children['y'], 'expected the `children` of the second node to have a connection to the next letter');
            assert.equal(secondNode.isWord, false, 'expected the `isWord` of the second node to be `false`');
        });

        it('should connect the root to the third letter', () => {
            const firstNode = trie.root.children['h'];
            const secondNode = firstNode.children['e'];
            const thirdNode = secondNode.children['y'];
            assert.equal(thirdNode.key, 'y', 'expected the `key` of the first node to be `y`');
            assert.equal(Object.keys(thirdNode.children).length, 0, 'expected to have no `children` for the final node');
            assert.equal(thirdNode.isWord, true, 'expected the `isWord` of the final node to be `true`');
        });
    });

    describe('with three words', () => {
        let trie;
        let words = ['helipad', 'hello', 'hermit'];
        beforeEach(() => {
            trie = new Trie();
            words.forEach(word => trie.insert(word));
        });

        words.forEach((word) => {
            describe(`for ${word}`, () => {
                it('should connect to the final letter', () => {
                    const finalNode = word.split("").reduce((node, letter) => node.children[letter], trie.root);
                    assert(finalNode);
                    assert.equal(finalNode.isWord, true, "expected the final node `isWord` to be set to true");
                });
            });
        });
    });
});

