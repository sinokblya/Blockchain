const { assert } = require('chai');
const TXO = require('../TXO').TXO;
const SHA256 = require('ethereum-cryptography/sha256').sha256;
const utf8ToBytes = require('ethereum-cryptography/utils').utf8ToBytes;


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
        it('should not spent twice', () => {
            assert.throws(() => txo.spend(), 'Already spended!');
        });
    });

    describe('hash', () => {
        it('should have valid hash', () => {
            const validHash = SHA256(utf8ToBytes(txo.owner + txo.amount));
            assert.deepEqual(txo.hash, validHash);
        })
    })
});
