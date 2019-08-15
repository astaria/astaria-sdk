include("./sjcl/sjcl.js");
include("./sjcl/convenience.js");
include("./sjcl/bitArray.js");
include("./sjcl/codecString.js");
include("./sjcl/codecBytes.js");
include("./sjcl/codecBase64.js");
include("./sjcl/codecBase58.js");
include("./sjcl/codecBase58Check.js");
include("./sjcl/codecBytes.js");
include("./sjcl/codecHex.js");
include("./sjcl/sha256.js");
include("./sjcl/ripemd160.js");
include("./sjcl/aes.js");
include("./sjcl/ccm.js");
include("./sjcl/random.js");
include("./sjcl/bn.js");
include("./sjcl/ecc.js");
include("./sjcl/pbkdf2.js");
include("./sjcl/scrypt.js");
include("./sjcl/hmac.js");
include("./sha3.js");

Crypto = (function() {
    sjcl.random.addEntropy(random(1024));

    return {};
})();

Crypto.__encrypt_params = {
    "iv":"tjp81jkAzUpW1bI9gLDDpg==", // iv Base64 encoded
    "v":1,                           // version
    "iter":1000,                     // iteration count
    "ks":128,                        // key size in bits
    "ts":64,                         // authentication strength
    "mode":"ccm",                    // mode
    "cipher":"aes",                  // cipher
    "salt":"lx06UoJDNys=",           // key derivation salt
}

Crypto.sha256 = {
    hash : function(data) {
        return sjcl.hash.sha256.hash(data);
    }
};

Crypto.keccak256 = {
    hash : function(data) {
        return sjcl.codec.hex.toBits(
            Sha3.hash256(sjcl.codec.hex.fromBits(data), {
                "msgFormat":"hex-bytes",
                "padding":"keccak",
                "outFormat":"hex"
            })
        );
    }
}

Crypto.ripemd160 = {
    hash : function(data) {
        return sjcl.hash.ripemd160.hash(data);
    }
};

Crypto.ecdsa = {
    generate_keys : function(curve, secret) {
        return sjcl.ecc.ecdsa.generateKeys(
            curve, 0, secret
        );
    },
    secret_key : function(curve, secret) {
        return new sjcl.ecc.ecdsa.secretKey(
            curve, sjcl.bn.fromBits(secret)
        );
    },
    curve_from_name : function(name) {
        return sjcl.ecc.curves[name];
    }
};

Crypto.base58 = {
    encode : function(bits) {
        return sjcl.codec.base58.fromBits(bits);
    },
    decode : function(string) {
        return sjcl.codec.base58.toBits(string);
    }
};

Crypto.base58.check = {
    encode : function(version, bits, checksum_fn) {
        return sjcl.codec.base58Check.fromBits(version, bits, checksum_fn);
    },
    decode : function(string, checksum_fn) {
        return sjcl.codec.base58Check.toBits(string, checksum_fn)
    }
};

Crypto.encrypt = function(password, plaintext) {
    return sjcl.encrypt(password, plaintext, Crypto.__encrypt_params);
}

Crypto.decrypt = function(password, ciphertext) {
    return sjcl.decrypt(password, ciphertext);
}

Crypto.number_from_bits = function(bits) {
    return sjcl.bn.fromBits(bits);
};

Crypto.number_to_bits = function(number) {
    return number.toBits();
};

Crypto.number_from_hex = function(hex) {
    return new sjcl.bn(hex);
};

Crypto.number_from_value = function(value) {
    return new sjcl.bn(value);
};

Crypto.string_to_bits = function(string) {
    return sjcl.codec.utf8String.toBits(string);
};

Crypto.bytes_from_bits = function(bits) {
    return sjcl.codec.bytes.fromBits(bits);
};

Crypto.bytes_to_bits = function(bytes) {
    return sjcl.codec.bytes.toBits(bytes);
};

Crypto.hex_from_bits = function(bits) {
    return sjcl.codec.hex.fromBits(bits);
};

Crypto.hex_to_bits = function(hex) {
    return sjcl.codec.hex.toBits(hex);
};

Crypto.bits_slice = function(bits, start, end) {
    return sjcl.bitArray.bitSlice(bits, start, end);
};

Crypto.bits_extract = function(bits, start, length) {
    return sjcl.bitArray.extract(bits, start, length);
};

Crypto.version = function() {
    return "1.0";
};

__MODULE__ = Crypto;

