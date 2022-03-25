var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __commonJS = (cb, mod2) => function __require() {
  return mod2 || (0, cb[__getOwnPropNames(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, copyDefault, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toESM = (module2, isNodeMode) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", !isNodeMode && module2 && module2.__esModule ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// node_modules/@protobufjs/aspromise/index.js
var require_aspromise = __commonJS({
  "node_modules/@protobufjs/aspromise/index.js"(exports2, module2) {
    "use strict";
    module2.exports = asPromise;
    function asPromise(fn, ctx) {
      var params = new Array(arguments.length - 1), offset = 0, index = 2, pending = true;
      while (index < arguments.length)
        params[offset++] = arguments[index++];
      return new Promise(function executor(resolve, reject) {
        params[offset] = function callback(err) {
          if (pending) {
            pending = false;
            if (err)
              reject(err);
            else {
              var params2 = new Array(arguments.length - 1), offset2 = 0;
              while (offset2 < params2.length)
                params2[offset2++] = arguments[offset2];
              resolve.apply(null, params2);
            }
          }
        };
        try {
          fn.apply(ctx || null, params);
        } catch (err) {
          if (pending) {
            pending = false;
            reject(err);
          }
        }
      });
    }
  }
});

// node_modules/@protobufjs/base64/index.js
var require_base64 = __commonJS({
  "node_modules/@protobufjs/base64/index.js"(exports2) {
    "use strict";
    var base64 = exports2;
    base64.length = function length(string) {
      var p = string.length;
      if (!p)
        return 0;
      var n = 0;
      while (--p % 4 > 1 && string.charAt(p) === "=")
        ++n;
      return Math.ceil(string.length * 3) / 4 - n;
    };
    var b64 = new Array(64);
    var s64 = new Array(123);
    for (i = 0; i < 64; )
      s64[b64[i] = i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i - 59 | 43] = i++;
    var i;
    base64.encode = function encode(buffer, start2, end) {
      var parts = null, chunk = [];
      var i2 = 0, j = 0, t;
      while (start2 < end) {
        var b = buffer[start2++];
        switch (j) {
          case 0:
            chunk[i2++] = b64[b >> 2];
            t = (b & 3) << 4;
            j = 1;
            break;
          case 1:
            chunk[i2++] = b64[t | b >> 4];
            t = (b & 15) << 2;
            j = 2;
            break;
          case 2:
            chunk[i2++] = b64[t | b >> 6];
            chunk[i2++] = b64[b & 63];
            j = 0;
            break;
        }
        if (i2 > 8191) {
          (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
          i2 = 0;
        }
      }
      if (j) {
        chunk[i2++] = b64[t];
        chunk[i2++] = 61;
        if (j === 1)
          chunk[i2++] = 61;
      }
      if (parts) {
        if (i2)
          parts.push(String.fromCharCode.apply(String, chunk.slice(0, i2)));
        return parts.join("");
      }
      return String.fromCharCode.apply(String, chunk.slice(0, i2));
    };
    var invalidEncoding = "invalid encoding";
    base64.decode = function decode(string, buffer, offset) {
      var start2 = offset;
      var j = 0, t;
      for (var i2 = 0; i2 < string.length; ) {
        var c = string.charCodeAt(i2++);
        if (c === 61 && j > 1)
          break;
        if ((c = s64[c]) === void 0)
          throw Error(invalidEncoding);
        switch (j) {
          case 0:
            t = c;
            j = 1;
            break;
          case 1:
            buffer[offset++] = t << 2 | (c & 48) >> 4;
            t = c;
            j = 2;
            break;
          case 2:
            buffer[offset++] = (t & 15) << 4 | (c & 60) >> 2;
            t = c;
            j = 3;
            break;
          case 3:
            buffer[offset++] = (t & 3) << 6 | c;
            j = 0;
            break;
        }
      }
      if (j === 1)
        throw Error(invalidEncoding);
      return offset - start2;
    };
    base64.test = function test(string) {
      return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(string);
    };
  }
});

// node_modules/@protobufjs/eventemitter/index.js
var require_eventemitter = __commonJS({
  "node_modules/@protobufjs/eventemitter/index.js"(exports2, module2) {
    "use strict";
    module2.exports = EventEmitter;
    function EventEmitter() {
      this._listeners = {};
    }
    EventEmitter.prototype.on = function on(evt, fn, ctx) {
      (this._listeners[evt] || (this._listeners[evt] = [])).push({
        fn,
        ctx: ctx || this
      });
      return this;
    };
    EventEmitter.prototype.off = function off(evt, fn) {
      if (evt === void 0)
        this._listeners = {};
      else {
        if (fn === void 0)
          this._listeners[evt] = [];
        else {
          var listeners = this._listeners[evt];
          for (var i = 0; i < listeners.length; )
            if (listeners[i].fn === fn)
              listeners.splice(i, 1);
            else
              ++i;
        }
      }
      return this;
    };
    EventEmitter.prototype.emit = function emit(evt) {
      var listeners = this._listeners[evt];
      if (listeners) {
        var args = [], i = 1;
        for (; i < arguments.length; )
          args.push(arguments[i++]);
        for (i = 0; i < listeners.length; )
          listeners[i].fn.apply(listeners[i++].ctx, args);
      }
      return this;
    };
  }
});

// node_modules/@protobufjs/float/index.js
var require_float = __commonJS({
  "node_modules/@protobufjs/float/index.js"(exports2, module2) {
    "use strict";
    module2.exports = factory(factory);
    function factory(exports3) {
      if (typeof Float32Array !== "undefined")
        (function() {
          var f32 = new Float32Array([-0]), f8b = new Uint8Array(f32.buffer), le = f8b[3] === 128;
          function writeFloat_f32_cpy(val, buf, pos) {
            f32[0] = val;
            buf[pos] = f8b[0];
            buf[pos + 1] = f8b[1];
            buf[pos + 2] = f8b[2];
            buf[pos + 3] = f8b[3];
          }
          function writeFloat_f32_rev(val, buf, pos) {
            f32[0] = val;
            buf[pos] = f8b[3];
            buf[pos + 1] = f8b[2];
            buf[pos + 2] = f8b[1];
            buf[pos + 3] = f8b[0];
          }
          exports3.writeFloatLE = le ? writeFloat_f32_cpy : writeFloat_f32_rev;
          exports3.writeFloatBE = le ? writeFloat_f32_rev : writeFloat_f32_cpy;
          function readFloat_f32_cpy(buf, pos) {
            f8b[0] = buf[pos];
            f8b[1] = buf[pos + 1];
            f8b[2] = buf[pos + 2];
            f8b[3] = buf[pos + 3];
            return f32[0];
          }
          function readFloat_f32_rev(buf, pos) {
            f8b[3] = buf[pos];
            f8b[2] = buf[pos + 1];
            f8b[1] = buf[pos + 2];
            f8b[0] = buf[pos + 3];
            return f32[0];
          }
          exports3.readFloatLE = le ? readFloat_f32_cpy : readFloat_f32_rev;
          exports3.readFloatBE = le ? readFloat_f32_rev : readFloat_f32_cpy;
        })();
      else
        (function() {
          function writeFloat_ieee754(writeUint, val, buf, pos) {
            var sign = val < 0 ? 1 : 0;
            if (sign)
              val = -val;
            if (val === 0)
              writeUint(1 / val > 0 ? 0 : 2147483648, buf, pos);
            else if (isNaN(val))
              writeUint(2143289344, buf, pos);
            else if (val > 34028234663852886e22)
              writeUint((sign << 31 | 2139095040) >>> 0, buf, pos);
            else if (val < 11754943508222875e-54)
              writeUint((sign << 31 | Math.round(val / 1401298464324817e-60)) >>> 0, buf, pos);
            else {
              var exponent = Math.floor(Math.log(val) / Math.LN2), mantissa = Math.round(val * Math.pow(2, -exponent) * 8388608) & 8388607;
              writeUint((sign << 31 | exponent + 127 << 23 | mantissa) >>> 0, buf, pos);
            }
          }
          exports3.writeFloatLE = writeFloat_ieee754.bind(null, writeUintLE);
          exports3.writeFloatBE = writeFloat_ieee754.bind(null, writeUintBE);
          function readFloat_ieee754(readUint, buf, pos) {
            var uint = readUint(buf, pos), sign = (uint >> 31) * 2 + 1, exponent = uint >>> 23 & 255, mantissa = uint & 8388607;
            return exponent === 255 ? mantissa ? NaN : sign * Infinity : exponent === 0 ? sign * 1401298464324817e-60 * mantissa : sign * Math.pow(2, exponent - 150) * (mantissa + 8388608);
          }
          exports3.readFloatLE = readFloat_ieee754.bind(null, readUintLE);
          exports3.readFloatBE = readFloat_ieee754.bind(null, readUintBE);
        })();
      if (typeof Float64Array !== "undefined")
        (function() {
          var f64 = new Float64Array([-0]), f8b = new Uint8Array(f64.buffer), le = f8b[7] === 128;
          function writeDouble_f64_cpy(val, buf, pos) {
            f64[0] = val;
            buf[pos] = f8b[0];
            buf[pos + 1] = f8b[1];
            buf[pos + 2] = f8b[2];
            buf[pos + 3] = f8b[3];
            buf[pos + 4] = f8b[4];
            buf[pos + 5] = f8b[5];
            buf[pos + 6] = f8b[6];
            buf[pos + 7] = f8b[7];
          }
          function writeDouble_f64_rev(val, buf, pos) {
            f64[0] = val;
            buf[pos] = f8b[7];
            buf[pos + 1] = f8b[6];
            buf[pos + 2] = f8b[5];
            buf[pos + 3] = f8b[4];
            buf[pos + 4] = f8b[3];
            buf[pos + 5] = f8b[2];
            buf[pos + 6] = f8b[1];
            buf[pos + 7] = f8b[0];
          }
          exports3.writeDoubleLE = le ? writeDouble_f64_cpy : writeDouble_f64_rev;
          exports3.writeDoubleBE = le ? writeDouble_f64_rev : writeDouble_f64_cpy;
          function readDouble_f64_cpy(buf, pos) {
            f8b[0] = buf[pos];
            f8b[1] = buf[pos + 1];
            f8b[2] = buf[pos + 2];
            f8b[3] = buf[pos + 3];
            f8b[4] = buf[pos + 4];
            f8b[5] = buf[pos + 5];
            f8b[6] = buf[pos + 6];
            f8b[7] = buf[pos + 7];
            return f64[0];
          }
          function readDouble_f64_rev(buf, pos) {
            f8b[7] = buf[pos];
            f8b[6] = buf[pos + 1];
            f8b[5] = buf[pos + 2];
            f8b[4] = buf[pos + 3];
            f8b[3] = buf[pos + 4];
            f8b[2] = buf[pos + 5];
            f8b[1] = buf[pos + 6];
            f8b[0] = buf[pos + 7];
            return f64[0];
          }
          exports3.readDoubleLE = le ? readDouble_f64_cpy : readDouble_f64_rev;
          exports3.readDoubleBE = le ? readDouble_f64_rev : readDouble_f64_cpy;
        })();
      else
        (function() {
          function writeDouble_ieee754(writeUint, off0, off1, val, buf, pos) {
            var sign = val < 0 ? 1 : 0;
            if (sign)
              val = -val;
            if (val === 0) {
              writeUint(0, buf, pos + off0);
              writeUint(1 / val > 0 ? 0 : 2147483648, buf, pos + off1);
            } else if (isNaN(val)) {
              writeUint(0, buf, pos + off0);
              writeUint(2146959360, buf, pos + off1);
            } else if (val > 17976931348623157e292) {
              writeUint(0, buf, pos + off0);
              writeUint((sign << 31 | 2146435072) >>> 0, buf, pos + off1);
            } else {
              var mantissa;
              if (val < 22250738585072014e-324) {
                mantissa = val / 5e-324;
                writeUint(mantissa >>> 0, buf, pos + off0);
                writeUint((sign << 31 | mantissa / 4294967296) >>> 0, buf, pos + off1);
              } else {
                var exponent = Math.floor(Math.log(val) / Math.LN2);
                if (exponent === 1024)
                  exponent = 1023;
                mantissa = val * Math.pow(2, -exponent);
                writeUint(mantissa * 4503599627370496 >>> 0, buf, pos + off0);
                writeUint((sign << 31 | exponent + 1023 << 20 | mantissa * 1048576 & 1048575) >>> 0, buf, pos + off1);
              }
            }
          }
          exports3.writeDoubleLE = writeDouble_ieee754.bind(null, writeUintLE, 0, 4);
          exports3.writeDoubleBE = writeDouble_ieee754.bind(null, writeUintBE, 4, 0);
          function readDouble_ieee754(readUint, off0, off1, buf, pos) {
            var lo = readUint(buf, pos + off0), hi = readUint(buf, pos + off1);
            var sign = (hi >> 31) * 2 + 1, exponent = hi >>> 20 & 2047, mantissa = 4294967296 * (hi & 1048575) + lo;
            return exponent === 2047 ? mantissa ? NaN : sign * Infinity : exponent === 0 ? sign * 5e-324 * mantissa : sign * Math.pow(2, exponent - 1075) * (mantissa + 4503599627370496);
          }
          exports3.readDoubleLE = readDouble_ieee754.bind(null, readUintLE, 0, 4);
          exports3.readDoubleBE = readDouble_ieee754.bind(null, readUintBE, 4, 0);
        })();
      return exports3;
    }
    function writeUintLE(val, buf, pos) {
      buf[pos] = val & 255;
      buf[pos + 1] = val >>> 8 & 255;
      buf[pos + 2] = val >>> 16 & 255;
      buf[pos + 3] = val >>> 24;
    }
    function writeUintBE(val, buf, pos) {
      buf[pos] = val >>> 24;
      buf[pos + 1] = val >>> 16 & 255;
      buf[pos + 2] = val >>> 8 & 255;
      buf[pos + 3] = val & 255;
    }
    function readUintLE(buf, pos) {
      return (buf[pos] | buf[pos + 1] << 8 | buf[pos + 2] << 16 | buf[pos + 3] << 24) >>> 0;
    }
    function readUintBE(buf, pos) {
      return (buf[pos] << 24 | buf[pos + 1] << 16 | buf[pos + 2] << 8 | buf[pos + 3]) >>> 0;
    }
  }
});

// node_modules/@protobufjs/inquire/index.js
var require_inquire = __commonJS({
  "node_modules/@protobufjs/inquire/index.js"(exports, module) {
    "use strict";
    module.exports = inquire;
    function inquire(moduleName) {
      try {
        var mod = eval("quire".replace(/^/, "re"))(moduleName);
        if (mod && (mod.length || Object.keys(mod).length))
          return mod;
      } catch (e) {
      }
      return null;
    }
  }
});

// node_modules/@protobufjs/utf8/index.js
var require_utf8 = __commonJS({
  "node_modules/@protobufjs/utf8/index.js"(exports2) {
    "use strict";
    var utf8 = exports2;
    utf8.length = function utf8_length(string) {
      var len = 0, c = 0;
      for (var i = 0; i < string.length; ++i) {
        c = string.charCodeAt(i);
        if (c < 128)
          len += 1;
        else if (c < 2048)
          len += 2;
        else if ((c & 64512) === 55296 && (string.charCodeAt(i + 1) & 64512) === 56320) {
          ++i;
          len += 4;
        } else
          len += 3;
      }
      return len;
    };
    utf8.read = function utf8_read(buffer, start2, end) {
      var len = end - start2;
      if (len < 1)
        return "";
      var parts = null, chunk = [], i = 0, t;
      while (start2 < end) {
        t = buffer[start2++];
        if (t < 128)
          chunk[i++] = t;
        else if (t > 191 && t < 224)
          chunk[i++] = (t & 31) << 6 | buffer[start2++] & 63;
        else if (t > 239 && t < 365) {
          t = ((t & 7) << 18 | (buffer[start2++] & 63) << 12 | (buffer[start2++] & 63) << 6 | buffer[start2++] & 63) - 65536;
          chunk[i++] = 55296 + (t >> 10);
          chunk[i++] = 56320 + (t & 1023);
        } else
          chunk[i++] = (t & 15) << 12 | (buffer[start2++] & 63) << 6 | buffer[start2++] & 63;
        if (i > 8191) {
          (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
          i = 0;
        }
      }
      if (parts) {
        if (i)
          parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
        return parts.join("");
      }
      return String.fromCharCode.apply(String, chunk.slice(0, i));
    };
    utf8.write = function utf8_write(string, buffer, offset) {
      var start2 = offset, c1, c2;
      for (var i = 0; i < string.length; ++i) {
        c1 = string.charCodeAt(i);
        if (c1 < 128) {
          buffer[offset++] = c1;
        } else if (c1 < 2048) {
          buffer[offset++] = c1 >> 6 | 192;
          buffer[offset++] = c1 & 63 | 128;
        } else if ((c1 & 64512) === 55296 && ((c2 = string.charCodeAt(i + 1)) & 64512) === 56320) {
          c1 = 65536 + ((c1 & 1023) << 10) + (c2 & 1023);
          ++i;
          buffer[offset++] = c1 >> 18 | 240;
          buffer[offset++] = c1 >> 12 & 63 | 128;
          buffer[offset++] = c1 >> 6 & 63 | 128;
          buffer[offset++] = c1 & 63 | 128;
        } else {
          buffer[offset++] = c1 >> 12 | 224;
          buffer[offset++] = c1 >> 6 & 63 | 128;
          buffer[offset++] = c1 & 63 | 128;
        }
      }
      return offset - start2;
    };
  }
});

// node_modules/@protobufjs/pool/index.js
var require_pool = __commonJS({
  "node_modules/@protobufjs/pool/index.js"(exports2, module2) {
    "use strict";
    module2.exports = pool;
    function pool(alloc, slice2, size) {
      var SIZE = size || 8192;
      var MAX = SIZE >>> 1;
      var slab = null;
      var offset = SIZE;
      return function pool_alloc(size2) {
        if (size2 < 1 || size2 > MAX)
          return alloc(size2);
        if (offset + size2 > SIZE) {
          slab = alloc(SIZE);
          offset = 0;
        }
        var buf = slice2.call(slab, offset, offset += size2);
        if (offset & 7)
          offset = (offset | 7) + 1;
        return buf;
      };
    }
  }
});

// node_modules/protobufjs/src/util/longbits.js
var require_longbits = __commonJS({
  "node_modules/protobufjs/src/util/longbits.js"(exports2, module2) {
    "use strict";
    module2.exports = LongBits;
    var util2 = require_minimal();
    function LongBits(lo, hi) {
      this.lo = lo >>> 0;
      this.hi = hi >>> 0;
    }
    var zero2 = LongBits.zero = new LongBits(0, 0);
    zero2.toNumber = function() {
      return 0;
    };
    zero2.zzEncode = zero2.zzDecode = function() {
      return this;
    };
    zero2.length = function() {
      return 1;
    };
    var zeroHash = LongBits.zeroHash = "\0\0\0\0\0\0\0\0";
    LongBits.fromNumber = function fromNumber2(value) {
      if (value === 0)
        return zero2;
      var sign = value < 0;
      if (sign)
        value = -value;
      var lo = value >>> 0, hi = (value - lo) / 4294967296 >>> 0;
      if (sign) {
        hi = ~hi >>> 0;
        lo = ~lo >>> 0;
        if (++lo > 4294967295) {
          lo = 0;
          if (++hi > 4294967295)
            hi = 0;
        }
      }
      return new LongBits(lo, hi);
    };
    LongBits.from = function from(value) {
      if (typeof value === "number")
        return LongBits.fromNumber(value);
      if (util2.isString(value)) {
        if (util2.Long)
          value = util2.Long.fromString(value);
        else
          return LongBits.fromNumber(parseInt(value, 10));
      }
      return value.low || value.high ? new LongBits(value.low >>> 0, value.high >>> 0) : zero2;
    };
    LongBits.prototype.toNumber = function toNumber2(unsigned) {
      if (!unsigned && this.hi >>> 31) {
        var lo = ~this.lo + 1 >>> 0, hi = ~this.hi >>> 0;
        if (!lo)
          hi = hi + 1 >>> 0;
        return -(lo + hi * 4294967296);
      }
      return this.lo + this.hi * 4294967296;
    };
    LongBits.prototype.toLong = function toLong(unsigned) {
      return util2.Long ? new util2.Long(this.lo | 0, this.hi | 0, Boolean(unsigned)) : { low: this.lo | 0, high: this.hi | 0, unsigned: Boolean(unsigned) };
    };
    var charCodeAt = String.prototype.charCodeAt;
    LongBits.fromHash = function fromHash(hash) {
      if (hash === zeroHash)
        return zero2;
      return new LongBits((charCodeAt.call(hash, 0) | charCodeAt.call(hash, 1) << 8 | charCodeAt.call(hash, 2) << 16 | charCodeAt.call(hash, 3) << 24) >>> 0, (charCodeAt.call(hash, 4) | charCodeAt.call(hash, 5) << 8 | charCodeAt.call(hash, 6) << 16 | charCodeAt.call(hash, 7) << 24) >>> 0);
    };
    LongBits.prototype.toHash = function toHash() {
      return String.fromCharCode(this.lo & 255, this.lo >>> 8 & 255, this.lo >>> 16 & 255, this.lo >>> 24, this.hi & 255, this.hi >>> 8 & 255, this.hi >>> 16 & 255, this.hi >>> 24);
    };
    LongBits.prototype.zzEncode = function zzEncode() {
      var mask = this.hi >> 31;
      this.hi = ((this.hi << 1 | this.lo >>> 31) ^ mask) >>> 0;
      this.lo = (this.lo << 1 ^ mask) >>> 0;
      return this;
    };
    LongBits.prototype.zzDecode = function zzDecode() {
      var mask = -(this.lo & 1);
      this.lo = ((this.lo >>> 1 | this.hi << 31) ^ mask) >>> 0;
      this.hi = (this.hi >>> 1 ^ mask) >>> 0;
      return this;
    };
    LongBits.prototype.length = function length() {
      var part0 = this.lo, part1 = (this.lo >>> 28 | this.hi << 4) >>> 0, part2 = this.hi >>> 24;
      return part2 === 0 ? part1 === 0 ? part0 < 16384 ? part0 < 128 ? 1 : 2 : part0 < 2097152 ? 3 : 4 : part1 < 16384 ? part1 < 128 ? 5 : 6 : part1 < 2097152 ? 7 : 8 : part2 < 128 ? 9 : 10;
    };
  }
});

// node_modules/protobufjs/src/util/minimal.js
var require_minimal = __commonJS({
  "node_modules/protobufjs/src/util/minimal.js"(exports2) {
    "use strict";
    var util2 = exports2;
    util2.asPromise = require_aspromise();
    util2.base64 = require_base64();
    util2.EventEmitter = require_eventemitter();
    util2.float = require_float();
    util2.inquire = require_inquire();
    util2.utf8 = require_utf8();
    util2.pool = require_pool();
    util2.LongBits = require_longbits();
    util2.isNode = Boolean(typeof global !== "undefined" && global && global.process && global.process.versions && global.process.versions.node);
    util2.global = util2.isNode && global || typeof window !== "undefined" && window || typeof self !== "undefined" && self || exports2;
    util2.emptyArray = Object.freeze ? Object.freeze([]) : [];
    util2.emptyObject = Object.freeze ? Object.freeze({}) : {};
    util2.isInteger = Number.isInteger || function isInteger(value) {
      return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
    };
    util2.isString = function isString(value) {
      return typeof value === "string" || value instanceof String;
    };
    util2.isObject = function isObject(value) {
      return value && typeof value === "object";
    };
    util2.isset = util2.isSet = function isSet2(obj, prop) {
      var value = obj[prop];
      if (value != null && obj.hasOwnProperty(prop))
        return typeof value !== "object" || (Array.isArray(value) ? value.length : Object.keys(value).length) > 0;
      return false;
    };
    util2.Buffer = function() {
      try {
        var Buffer2 = util2.inquire("buffer").Buffer;
        return Buffer2.prototype.utf8Write ? Buffer2 : null;
      } catch (e) {
        return null;
      }
    }();
    util2._Buffer_from = null;
    util2._Buffer_allocUnsafe = null;
    util2.newBuffer = function newBuffer(sizeOrArray) {
      return typeof sizeOrArray === "number" ? util2.Buffer ? util2._Buffer_allocUnsafe(sizeOrArray) : new util2.Array(sizeOrArray) : util2.Buffer ? util2._Buffer_from(sizeOrArray) : typeof Uint8Array === "undefined" ? sizeOrArray : new Uint8Array(sizeOrArray);
    };
    util2.Array = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    util2.Long = util2.global.dcodeIO && util2.global.dcodeIO.Long || util2.global.Long || util2.inquire("long");
    util2.key2Re = /^true|false|0|1$/;
    util2.key32Re = /^-?(?:0|[1-9][0-9]*)$/;
    util2.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;
    util2.longToHash = function longToHash(value) {
      return value ? util2.LongBits.from(value).toHash() : util2.LongBits.zeroHash;
    };
    util2.longFromHash = function longFromHash(hash, unsigned) {
      var bits = util2.LongBits.fromHash(hash);
      if (util2.Long)
        return util2.Long.fromBits(bits.lo, bits.hi, unsigned);
      return bits.toNumber(Boolean(unsigned));
    };
    function merge(dst, src, ifNotSet) {
      for (var keys = Object.keys(src), i = 0; i < keys.length; ++i)
        if (dst[keys[i]] === void 0 || !ifNotSet)
          dst[keys[i]] = src[keys[i]];
      return dst;
    }
    util2.merge = merge;
    util2.lcFirst = function lcFirst(str) {
      return str.charAt(0).toLowerCase() + str.substring(1);
    };
    function newError(name) {
      function CustomError(message, properties) {
        if (!(this instanceof CustomError))
          return new CustomError(message, properties);
        Object.defineProperty(this, "message", { get: function() {
          return message;
        } });
        if (Error.captureStackTrace)
          Error.captureStackTrace(this, CustomError);
        else
          Object.defineProperty(this, "stack", { value: new Error().stack || "" });
        if (properties)
          merge(this, properties);
      }
      (CustomError.prototype = Object.create(Error.prototype)).constructor = CustomError;
      Object.defineProperty(CustomError.prototype, "name", { get: function() {
        return name;
      } });
      CustomError.prototype.toString = function toString2() {
        return this.name + ": " + this.message;
      };
      return CustomError;
    }
    util2.newError = newError;
    util2.ProtocolError = newError("ProtocolError");
    util2.oneOfGetter = function getOneOf(fieldNames) {
      var fieldMap = {};
      for (var i = 0; i < fieldNames.length; ++i)
        fieldMap[fieldNames[i]] = 1;
      return function() {
        for (var keys = Object.keys(this), i2 = keys.length - 1; i2 > -1; --i2)
          if (fieldMap[keys[i2]] === 1 && this[keys[i2]] !== void 0 && this[keys[i2]] !== null)
            return keys[i2];
      };
    };
    util2.oneOfSetter = function setOneOf(fieldNames) {
      return function(name) {
        for (var i = 0; i < fieldNames.length; ++i)
          if (fieldNames[i] !== name)
            delete this[fieldNames[i]];
      };
    };
    util2.toJSONOptions = {
      longs: String,
      enums: String,
      bytes: String,
      json: true
    };
    util2._configure = function() {
      var Buffer2 = util2.Buffer;
      if (!Buffer2) {
        util2._Buffer_from = util2._Buffer_allocUnsafe = null;
        return;
      }
      util2._Buffer_from = Buffer2.from !== Uint8Array.from && Buffer2.from || function Buffer_from(value, encoding) {
        return new Buffer2(value, encoding);
      };
      util2._Buffer_allocUnsafe = Buffer2.allocUnsafe || function Buffer_allocUnsafe(size) {
        return new Buffer2(size);
      };
    };
  }
});

// node_modules/protobufjs/src/writer.js
var require_writer = __commonJS({
  "node_modules/protobufjs/src/writer.js"(exports2, module2) {
    "use strict";
    module2.exports = Writer2;
    var util2 = require_minimal();
    var BufferWriter;
    var LongBits = util2.LongBits;
    var base64 = util2.base64;
    var utf8 = util2.utf8;
    function Op(fn, len, val) {
      this.fn = fn;
      this.len = len;
      this.next = void 0;
      this.val = val;
    }
    function noop3() {
    }
    function State(writer) {
      this.head = writer.head;
      this.tail = writer.tail;
      this.len = writer.len;
      this.next = writer.states;
    }
    function Writer2() {
      this.len = 0;
      this.head = new Op(noop3, 0, 0);
      this.tail = this.head;
      this.states = null;
    }
    var create2 = function create3() {
      return util2.Buffer ? function create_buffer_setup() {
        return (Writer2.create = function create_buffer() {
          return new BufferWriter();
        })();
      } : function create_array() {
        return new Writer2();
      };
    };
    Writer2.create = create2();
    Writer2.alloc = function alloc(size) {
      return new util2.Array(size);
    };
    if (util2.Array !== Array)
      Writer2.alloc = util2.pool(Writer2.alloc, util2.Array.prototype.subarray);
    Writer2.prototype._push = function push(fn, len, val) {
      this.tail = this.tail.next = new Op(fn, len, val);
      this.len += len;
      return this;
    };
    function writeByte(val, buf, pos) {
      buf[pos] = val & 255;
    }
    function writeVarint32(val, buf, pos) {
      while (val > 127) {
        buf[pos++] = val & 127 | 128;
        val >>>= 7;
      }
      buf[pos] = val;
    }
    function VarintOp(len, val) {
      this.len = len;
      this.next = void 0;
      this.val = val;
    }
    VarintOp.prototype = Object.create(Op.prototype);
    VarintOp.prototype.fn = writeVarint32;
    Writer2.prototype.uint32 = function write_uint32(value) {
      this.len += (this.tail = this.tail.next = new VarintOp((value = value >>> 0) < 128 ? 1 : value < 16384 ? 2 : value < 2097152 ? 3 : value < 268435456 ? 4 : 5, value)).len;
      return this;
    };
    Writer2.prototype.int32 = function write_int32(value) {
      return value < 0 ? this._push(writeVarint64, 10, LongBits.fromNumber(value)) : this.uint32(value);
    };
    Writer2.prototype.sint32 = function write_sint32(value) {
      return this.uint32((value << 1 ^ value >> 31) >>> 0);
    };
    function writeVarint64(val, buf, pos) {
      while (val.hi) {
        buf[pos++] = val.lo & 127 | 128;
        val.lo = (val.lo >>> 7 | val.hi << 25) >>> 0;
        val.hi >>>= 7;
      }
      while (val.lo > 127) {
        buf[pos++] = val.lo & 127 | 128;
        val.lo = val.lo >>> 7;
      }
      buf[pos++] = val.lo;
    }
    Writer2.prototype.uint64 = function write_uint64(value) {
      var bits = LongBits.from(value);
      return this._push(writeVarint64, bits.length(), bits);
    };
    Writer2.prototype.int64 = Writer2.prototype.uint64;
    Writer2.prototype.sint64 = function write_sint64(value) {
      var bits = LongBits.from(value).zzEncode();
      return this._push(writeVarint64, bits.length(), bits);
    };
    Writer2.prototype.bool = function write_bool(value) {
      return this._push(writeByte, 1, value ? 1 : 0);
    };
    function writeFixed32(val, buf, pos) {
      buf[pos] = val & 255;
      buf[pos + 1] = val >>> 8 & 255;
      buf[pos + 2] = val >>> 16 & 255;
      buf[pos + 3] = val >>> 24;
    }
    Writer2.prototype.fixed32 = function write_fixed32(value) {
      return this._push(writeFixed32, 4, value >>> 0);
    };
    Writer2.prototype.sfixed32 = Writer2.prototype.fixed32;
    Writer2.prototype.fixed64 = function write_fixed64(value) {
      var bits = LongBits.from(value);
      return this._push(writeFixed32, 4, bits.lo)._push(writeFixed32, 4, bits.hi);
    };
    Writer2.prototype.sfixed64 = Writer2.prototype.fixed64;
    Writer2.prototype.float = function write_float(value) {
      return this._push(util2.float.writeFloatLE, 4, value);
    };
    Writer2.prototype.double = function write_double(value) {
      return this._push(util2.float.writeDoubleLE, 8, value);
    };
    var writeBytes = util2.Array.prototype.set ? function writeBytes_set(val, buf, pos) {
      buf.set(val, pos);
    } : function writeBytes_for(val, buf, pos) {
      for (var i = 0; i < val.length; ++i)
        buf[pos + i] = val[i];
    };
    Writer2.prototype.bytes = function write_bytes(value) {
      var len = value.length >>> 0;
      if (!len)
        return this._push(writeByte, 1, 0);
      if (util2.isString(value)) {
        var buf = Writer2.alloc(len = base64.length(value));
        base64.decode(value, buf, 0);
        value = buf;
      }
      return this.uint32(len)._push(writeBytes, len, value);
    };
    Writer2.prototype.string = function write_string(value) {
      var len = utf8.length(value);
      return len ? this.uint32(len)._push(utf8.write, len, value) : this._push(writeByte, 1, 0);
    };
    Writer2.prototype.fork = function fork() {
      this.states = new State(this);
      this.head = this.tail = new Op(noop3, 0, 0);
      this.len = 0;
      return this;
    };
    Writer2.prototype.reset = function reset() {
      if (this.states) {
        this.head = this.states.head;
        this.tail = this.states.tail;
        this.len = this.states.len;
        this.states = this.states.next;
      } else {
        this.head = this.tail = new Op(noop3, 0, 0);
        this.len = 0;
      }
      return this;
    };
    Writer2.prototype.ldelim = function ldelim() {
      var head = this.head, tail = this.tail, len = this.len;
      this.reset().uint32(len);
      if (len) {
        this.tail.next = head.next;
        this.tail = tail;
        this.len += len;
      }
      return this;
    };
    Writer2.prototype.finish = function finish() {
      var head = this.head.next, buf = this.constructor.alloc(this.len), pos = 0;
      while (head) {
        head.fn(head.val, buf, pos);
        pos += head.len;
        head = head.next;
      }
      return buf;
    };
    Writer2._configure = function(BufferWriter_) {
      BufferWriter = BufferWriter_;
      Writer2.create = create2();
      BufferWriter._configure();
    };
  }
});

// node_modules/protobufjs/src/writer_buffer.js
var require_writer_buffer = __commonJS({
  "node_modules/protobufjs/src/writer_buffer.js"(exports2, module2) {
    "use strict";
    module2.exports = BufferWriter;
    var Writer2 = require_writer();
    (BufferWriter.prototype = Object.create(Writer2.prototype)).constructor = BufferWriter;
    var util2 = require_minimal();
    function BufferWriter() {
      Writer2.call(this);
    }
    BufferWriter._configure = function() {
      BufferWriter.alloc = util2._Buffer_allocUnsafe;
      BufferWriter.writeBytesBuffer = util2.Buffer && util2.Buffer.prototype instanceof Uint8Array && util2.Buffer.prototype.set.name === "set" ? function writeBytesBuffer_set(val, buf, pos) {
        buf.set(val, pos);
      } : function writeBytesBuffer_copy(val, buf, pos) {
        if (val.copy)
          val.copy(buf, pos, 0, val.length);
        else
          for (var i = 0; i < val.length; )
            buf[pos++] = val[i++];
      };
    };
    BufferWriter.prototype.bytes = function write_bytes_buffer(value) {
      if (util2.isString(value))
        value = util2._Buffer_from(value, "base64");
      var len = value.length >>> 0;
      this.uint32(len);
      if (len)
        this._push(BufferWriter.writeBytesBuffer, len, value);
      return this;
    };
    function writeStringBuffer(val, buf, pos) {
      if (val.length < 40)
        util2.utf8.write(val, buf, pos);
      else if (buf.utf8Write)
        buf.utf8Write(val, pos);
      else
        buf.write(val, pos);
    }
    BufferWriter.prototype.string = function write_string_buffer(value) {
      var len = util2.Buffer.byteLength(value);
      this.uint32(len);
      if (len)
        this._push(writeStringBuffer, len, value);
      return this;
    };
    BufferWriter._configure();
  }
});

// node_modules/protobufjs/src/reader.js
var require_reader = __commonJS({
  "node_modules/protobufjs/src/reader.js"(exports2, module2) {
    "use strict";
    module2.exports = Reader2;
    var util2 = require_minimal();
    var BufferReader;
    var LongBits = util2.LongBits;
    var utf8 = util2.utf8;
    function indexOutOfRange(reader, writeLength) {
      return RangeError("index out of range: " + reader.pos + " + " + (writeLength || 1) + " > " + reader.len);
    }
    function Reader2(buffer) {
      this.buf = buffer;
      this.pos = 0;
      this.len = buffer.length;
    }
    var create_array = typeof Uint8Array !== "undefined" ? function create_typed_array(buffer) {
      if (buffer instanceof Uint8Array || Array.isArray(buffer))
        return new Reader2(buffer);
      throw Error("illegal buffer");
    } : function create_array2(buffer) {
      if (Array.isArray(buffer))
        return new Reader2(buffer);
      throw Error("illegal buffer");
    };
    var create2 = function create3() {
      return util2.Buffer ? function create_buffer_setup(buffer) {
        return (Reader2.create = function create_buffer(buffer2) {
          return util2.Buffer.isBuffer(buffer2) ? new BufferReader(buffer2) : create_array(buffer2);
        })(buffer);
      } : create_array;
    };
    Reader2.create = create2();
    Reader2.prototype._slice = util2.Array.prototype.subarray || util2.Array.prototype.slice;
    Reader2.prototype.uint32 = function read_uint32_setup() {
      var value = 4294967295;
      return function read_uint32() {
        value = (this.buf[this.pos] & 127) >>> 0;
        if (this.buf[this.pos++] < 128)
          return value;
        value = (value | (this.buf[this.pos] & 127) << 7) >>> 0;
        if (this.buf[this.pos++] < 128)
          return value;
        value = (value | (this.buf[this.pos] & 127) << 14) >>> 0;
        if (this.buf[this.pos++] < 128)
          return value;
        value = (value | (this.buf[this.pos] & 127) << 21) >>> 0;
        if (this.buf[this.pos++] < 128)
          return value;
        value = (value | (this.buf[this.pos] & 15) << 28) >>> 0;
        if (this.buf[this.pos++] < 128)
          return value;
        if ((this.pos += 5) > this.len) {
          this.pos = this.len;
          throw indexOutOfRange(this, 10);
        }
        return value;
      };
    }();
    Reader2.prototype.int32 = function read_int32() {
      return this.uint32() | 0;
    };
    Reader2.prototype.sint32 = function read_sint32() {
      var value = this.uint32();
      return value >>> 1 ^ -(value & 1) | 0;
    };
    function readLongVarint() {
      var bits = new LongBits(0, 0);
      var i = 0;
      if (this.len - this.pos > 4) {
        for (; i < 4; ++i) {
          bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
          if (this.buf[this.pos++] < 128)
            return bits;
        }
        bits.lo = (bits.lo | (this.buf[this.pos] & 127) << 28) >>> 0;
        bits.hi = (bits.hi | (this.buf[this.pos] & 127) >> 4) >>> 0;
        if (this.buf[this.pos++] < 128)
          return bits;
        i = 0;
      } else {
        for (; i < 3; ++i) {
          if (this.pos >= this.len)
            throw indexOutOfRange(this);
          bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
          if (this.buf[this.pos++] < 128)
            return bits;
        }
        bits.lo = (bits.lo | (this.buf[this.pos++] & 127) << i * 7) >>> 0;
        return bits;
      }
      if (this.len - this.pos > 4) {
        for (; i < 5; ++i) {
          bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
          if (this.buf[this.pos++] < 128)
            return bits;
        }
      } else {
        for (; i < 5; ++i) {
          if (this.pos >= this.len)
            throw indexOutOfRange(this);
          bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
          if (this.buf[this.pos++] < 128)
            return bits;
        }
      }
      throw Error("invalid varint encoding");
    }
    Reader2.prototype.bool = function read_bool() {
      return this.uint32() !== 0;
    };
    function readFixed32_end(buf, end) {
      return (buf[end - 4] | buf[end - 3] << 8 | buf[end - 2] << 16 | buf[end - 1] << 24) >>> 0;
    }
    Reader2.prototype.fixed32 = function read_fixed32() {
      if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);
      return readFixed32_end(this.buf, this.pos += 4);
    };
    Reader2.prototype.sfixed32 = function read_sfixed32() {
      if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);
      return readFixed32_end(this.buf, this.pos += 4) | 0;
    };
    function readFixed64() {
      if (this.pos + 8 > this.len)
        throw indexOutOfRange(this, 8);
      return new LongBits(readFixed32_end(this.buf, this.pos += 4), readFixed32_end(this.buf, this.pos += 4));
    }
    Reader2.prototype.float = function read_float() {
      if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);
      var value = util2.float.readFloatLE(this.buf, this.pos);
      this.pos += 4;
      return value;
    };
    Reader2.prototype.double = function read_double() {
      if (this.pos + 8 > this.len)
        throw indexOutOfRange(this, 4);
      var value = util2.float.readDoubleLE(this.buf, this.pos);
      this.pos += 8;
      return value;
    };
    Reader2.prototype.bytes = function read_bytes() {
      var length = this.uint32(), start2 = this.pos, end = this.pos + length;
      if (end > this.len)
        throw indexOutOfRange(this, length);
      this.pos += length;
      if (Array.isArray(this.buf))
        return this.buf.slice(start2, end);
      return start2 === end ? new this.buf.constructor(0) : this._slice.call(this.buf, start2, end);
    };
    Reader2.prototype.string = function read_string() {
      var bytes = this.bytes();
      return utf8.read(bytes, 0, bytes.length);
    };
    Reader2.prototype.skip = function skip(length) {
      if (typeof length === "number") {
        if (this.pos + length > this.len)
          throw indexOutOfRange(this, length);
        this.pos += length;
      } else {
        do {
          if (this.pos >= this.len)
            throw indexOutOfRange(this);
        } while (this.buf[this.pos++] & 128);
      }
      return this;
    };
    Reader2.prototype.skipType = function(wireType) {
      switch (wireType) {
        case 0:
          this.skip();
          break;
        case 1:
          this.skip(8);
          break;
        case 2:
          this.skip(this.uint32());
          break;
        case 3:
          while ((wireType = this.uint32() & 7) !== 4) {
            this.skipType(wireType);
          }
          break;
        case 5:
          this.skip(4);
          break;
        default:
          throw Error("invalid wire type " + wireType + " at offset " + this.pos);
      }
      return this;
    };
    Reader2._configure = function(BufferReader_) {
      BufferReader = BufferReader_;
      Reader2.create = create2();
      BufferReader._configure();
      var fn = util2.Long ? "toLong" : "toNumber";
      util2.merge(Reader2.prototype, {
        int64: function read_int64() {
          return readLongVarint.call(this)[fn](false);
        },
        uint64: function read_uint64() {
          return readLongVarint.call(this)[fn](true);
        },
        sint64: function read_sint64() {
          return readLongVarint.call(this).zzDecode()[fn](false);
        },
        fixed64: function read_fixed64() {
          return readFixed64.call(this)[fn](true);
        },
        sfixed64: function read_sfixed64() {
          return readFixed64.call(this)[fn](false);
        }
      });
    };
  }
});

// node_modules/protobufjs/src/reader_buffer.js
var require_reader_buffer = __commonJS({
  "node_modules/protobufjs/src/reader_buffer.js"(exports2, module2) {
    "use strict";
    module2.exports = BufferReader;
    var Reader2 = require_reader();
    (BufferReader.prototype = Object.create(Reader2.prototype)).constructor = BufferReader;
    var util2 = require_minimal();
    function BufferReader(buffer) {
      Reader2.call(this, buffer);
    }
    BufferReader._configure = function() {
      if (util2.Buffer)
        BufferReader.prototype._slice = util2.Buffer.prototype.slice;
    };
    BufferReader.prototype.string = function read_string_buffer() {
      var len = this.uint32();
      return this.buf.utf8Slice ? this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + len, this.len)) : this.buf.toString("utf-8", this.pos, this.pos = Math.min(this.pos + len, this.len));
    };
    BufferReader._configure();
  }
});

// node_modules/protobufjs/src/rpc/service.js
var require_service = __commonJS({
  "node_modules/protobufjs/src/rpc/service.js"(exports2, module2) {
    "use strict";
    module2.exports = Service;
    var util2 = require_minimal();
    (Service.prototype = Object.create(util2.EventEmitter.prototype)).constructor = Service;
    function Service(rpcImpl, requestDelimited, responseDelimited) {
      if (typeof rpcImpl !== "function")
        throw TypeError("rpcImpl must be a function");
      util2.EventEmitter.call(this);
      this.rpcImpl = rpcImpl;
      this.requestDelimited = Boolean(requestDelimited);
      this.responseDelimited = Boolean(responseDelimited);
    }
    Service.prototype.rpcCall = function rpcCall(method, requestCtor, responseCtor, request, callback) {
      if (!request)
        throw TypeError("request must be specified");
      var self2 = this;
      if (!callback)
        return util2.asPromise(rpcCall, self2, method, requestCtor, responseCtor, request);
      if (!self2.rpcImpl) {
        setTimeout(function() {
          callback(Error("already ended"));
        }, 0);
        return void 0;
      }
      try {
        return self2.rpcImpl(method, requestCtor[self2.requestDelimited ? "encodeDelimited" : "encode"](request).finish(), function rpcCallback(err, response) {
          if (err) {
            self2.emit("error", err, method);
            return callback(err);
          }
          if (response === null) {
            self2.end(true);
            return void 0;
          }
          if (!(response instanceof responseCtor)) {
            try {
              response = responseCtor[self2.responseDelimited ? "decodeDelimited" : "decode"](response);
            } catch (err2) {
              self2.emit("error", err2, method);
              return callback(err2);
            }
          }
          self2.emit("data", response, method);
          return callback(null, response);
        });
      } catch (err) {
        self2.emit("error", err, method);
        setTimeout(function() {
          callback(err);
        }, 0);
        return void 0;
      }
    };
    Service.prototype.end = function end(endedByRPC) {
      if (this.rpcImpl) {
        if (!endedByRPC)
          this.rpcImpl(null, null, null);
        this.rpcImpl = null;
        this.emit("end").off();
      }
      return this;
    };
  }
});

// node_modules/protobufjs/src/rpc.js
var require_rpc = __commonJS({
  "node_modules/protobufjs/src/rpc.js"(exports2) {
    "use strict";
    var rpc = exports2;
    rpc.Service = require_service();
  }
});

// node_modules/protobufjs/src/roots.js
var require_roots = __commonJS({
  "node_modules/protobufjs/src/roots.js"(exports2, module2) {
    "use strict";
    module2.exports = {};
  }
});

// node_modules/protobufjs/src/index-minimal.js
var require_index_minimal = __commonJS({
  "node_modules/protobufjs/src/index-minimal.js"(exports2) {
    "use strict";
    var protobuf = exports2;
    protobuf.build = "minimal";
    protobuf.Writer = require_writer();
    protobuf.BufferWriter = require_writer_buffer();
    protobuf.Reader = require_reader();
    protobuf.BufferReader = require_reader_buffer();
    protobuf.util = require_minimal();
    protobuf.rpc = require_rpc();
    protobuf.roots = require_roots();
    protobuf.configure = configure2;
    function configure2() {
      protobuf.util._configure();
      protobuf.Writer._configure(protobuf.BufferWriter);
      protobuf.Reader._configure(protobuf.BufferReader);
    }
    configure2();
  }
});

// node_modules/protobufjs/minimal.js
var require_minimal2 = __commonJS({
  "node_modules/protobufjs/minimal.js"(exports2, module2) {
    "use strict";
    module2.exports = require_index_minimal();
  }
});

// node_modules/svelte/internal/index.mjs
function noop() {
}
function assign(tar, src) {
  for (const k in src)
    tar[k] = src[k];
  return tar;
}
function run(fn) {
  return fn();
}
function blank_object() {
  return /* @__PURE__ */ Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function is_function(thing) {
  return typeof thing === "function";
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
function is_empty(obj) {
  return Object.keys(obj).length === 0;
}
function create_slot(definition, ctx, $$scope, fn) {
  if (definition) {
    const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
    return definition[0](slot_ctx);
  }
}
function get_slot_context(definition, ctx, $$scope, fn) {
  return definition[1] && fn ? assign($$scope.ctx.slice(), definition[1](fn(ctx))) : $$scope.ctx;
}
function get_slot_changes(definition, $$scope, dirty, fn) {
  if (definition[2] && fn) {
    const lets = definition[2](fn(dirty));
    if ($$scope.dirty === void 0) {
      return lets;
    }
    if (typeof lets === "object") {
      const merged = [];
      const len = Math.max($$scope.dirty.length, lets.length);
      for (let i = 0; i < len; i += 1) {
        merged[i] = $$scope.dirty[i] | lets[i];
      }
      return merged;
    }
    return $$scope.dirty | lets;
  }
  return $$scope.dirty;
}
function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
  if (slot_changes) {
    const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
    slot.p(slot_context, slot_changes);
  }
}
function get_all_dirty_from_scope($$scope) {
  if ($$scope.ctx.length > 32) {
    const dirty = [];
    const length = $$scope.ctx.length / 32;
    for (let i = 0; i < length; i++) {
      dirty[i] = -1;
    }
    return dirty;
  }
  return -1;
}
function action_destroyer(action_result) {
  return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
}
var is_hydrating = false;
function start_hydrating() {
  is_hydrating = true;
}
function end_hydrating() {
  is_hydrating = false;
}
function append(target, node) {
  target.appendChild(node);
}
function insert(target, node, anchor) {
  target.insertBefore(node, anchor || null);
}
function detach(node) {
  node.parentNode.removeChild(node);
}
function element(name) {
  return document.createElement(name);
}
function text(data) {
  return document.createTextNode(data);
}
function space() {
  return text(" ");
}
function listen(node, event, handler, options) {
  node.addEventListener(event, handler, options);
  return () => node.removeEventListener(event, handler, options);
}
function attr(node, attribute, value) {
  if (value == null)
    node.removeAttribute(attribute);
  else if (node.getAttribute(attribute) !== value)
    node.setAttribute(attribute, value);
}
function set_custom_element_data(node, prop, value) {
  if (prop in node) {
    node[prop] = typeof node[prop] === "boolean" && value === "" ? true : value;
  } else {
    attr(node, prop, value);
  }
}
function to_number(value) {
  return value === "" ? null : +value;
}
function children(element2) {
  return Array.from(element2.childNodes);
}
function set_data(text2, data) {
  data = "" + data;
  if (text2.wholeText !== data)
    text2.data = data;
}
function set_input_value(input, value) {
  input.value = value == null ? "" : value;
}
function set_style(node, key, value, important) {
  if (value === null) {
    node.style.removeProperty(key);
  } else {
    node.style.setProperty(key, value, important ? "important" : "");
  }
}
var crossorigin;
function is_crossorigin() {
  if (crossorigin === void 0) {
    crossorigin = false;
    try {
      if (typeof window !== "undefined" && window.parent) {
        void window.parent.document;
      }
    } catch (error) {
      crossorigin = true;
    }
  }
  return crossorigin;
}
function add_resize_listener(node, fn) {
  const computed_style = getComputedStyle(node);
  if (computed_style.position === "static") {
    node.style.position = "relative";
  }
  const iframe = element("iframe");
  iframe.setAttribute("style", "display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;");
  iframe.setAttribute("aria-hidden", "true");
  iframe.tabIndex = -1;
  const crossorigin2 = is_crossorigin();
  let unsubscribe;
  if (crossorigin2) {
    iframe.src = "data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}<\/script>";
    unsubscribe = listen(window, "message", (event) => {
      if (event.source === iframe.contentWindow)
        fn();
    });
  } else {
    iframe.src = "about:blank";
    iframe.onload = () => {
      unsubscribe = listen(iframe.contentWindow, "resize", fn);
    };
  }
  append(node, iframe);
  return () => {
    if (crossorigin2) {
      unsubscribe();
    } else if (unsubscribe && iframe.contentWindow) {
      unsubscribe();
    }
    detach(iframe);
  };
}
var current_component;
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function onMount(fn) {
  get_current_component().$$.on_mount.push(fn);
}
var dirty_components = [];
var binding_callbacks = [];
var render_callbacks = [];
var flush_callbacks = [];
var resolved_promise = Promise.resolve();
var update_scheduled = false;
function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}
function tick() {
  schedule_update();
  return resolved_promise;
}
function add_render_callback(fn) {
  render_callbacks.push(fn);
}
var seen_callbacks = /* @__PURE__ */ new Set();
var flushidx = 0;
function flush() {
  const saved_component = current_component;
  do {
    while (flushidx < dirty_components.length) {
      const component = dirty_components[flushidx];
      flushidx++;
      set_current_component(component);
      update(component.$$);
    }
    set_current_component(null);
    dirty_components.length = 0;
    flushidx = 0;
    while (binding_callbacks.length)
      binding_callbacks.pop()();
    for (let i = 0; i < render_callbacks.length; i += 1) {
      const callback = render_callbacks[i];
      if (!seen_callbacks.has(callback)) {
        seen_callbacks.add(callback);
        callback();
      }
    }
    render_callbacks.length = 0;
  } while (dirty_components.length);
  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }
  update_scheduled = false;
  seen_callbacks.clear();
  set_current_component(saved_component);
}
function update($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all($$.before_update);
    const dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback);
  }
}
var outroing = /* @__PURE__ */ new Set();
var outros;
function group_outros() {
  outros = {
    r: 0,
    c: [],
    p: outros
  };
}
function check_outros() {
  if (!outros.r) {
    run_all(outros.c);
  }
  outros = outros.p;
}
function transition_in(block, local) {
  if (block && block.i) {
    outroing.delete(block);
    block.i(local);
  }
}
function transition_out(block, local, detach2, callback) {
  if (block && block.o) {
    if (outroing.has(block))
      return;
    outroing.add(block);
    outros.c.push(() => {
      outroing.delete(block);
      if (callback) {
        if (detach2)
          block.d(1);
        callback();
      }
    });
    block.o(local);
  }
}
var globals = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : global;
function outro_and_destroy_block(block, lookup) {
  transition_out(block, 1, 1, () => {
    lookup.delete(block.key);
  });
}
function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block2, next, get_context) {
  let o = old_blocks.length;
  let n = list.length;
  let i = o;
  const old_indexes = {};
  while (i--)
    old_indexes[old_blocks[i].key] = i;
  const new_blocks = [];
  const new_lookup = /* @__PURE__ */ new Map();
  const deltas = /* @__PURE__ */ new Map();
  i = n;
  while (i--) {
    const child_ctx = get_context(ctx, list, i);
    const key = get_key(child_ctx);
    let block = lookup.get(key);
    if (!block) {
      block = create_each_block2(key, child_ctx);
      block.c();
    } else if (dynamic) {
      block.p(child_ctx, dirty);
    }
    new_lookup.set(key, new_blocks[i] = block);
    if (key in old_indexes)
      deltas.set(key, Math.abs(i - old_indexes[key]));
  }
  const will_move = /* @__PURE__ */ new Set();
  const did_move = /* @__PURE__ */ new Set();
  function insert2(block) {
    transition_in(block, 1);
    block.m(node, next);
    lookup.set(block.key, block);
    next = block.first;
    n--;
  }
  while (o && n) {
    const new_block = new_blocks[n - 1];
    const old_block = old_blocks[o - 1];
    const new_key = new_block.key;
    const old_key = old_block.key;
    if (new_block === old_block) {
      next = new_block.first;
      o--;
      n--;
    } else if (!new_lookup.has(old_key)) {
      destroy(old_block, lookup);
      o--;
    } else if (!lookup.has(new_key) || will_move.has(new_key)) {
      insert2(new_block);
    } else if (did_move.has(old_key)) {
      o--;
    } else if (deltas.get(new_key) > deltas.get(old_key)) {
      did_move.add(new_key);
      insert2(new_block);
    } else {
      will_move.add(old_key);
      o--;
    }
  }
  while (o--) {
    const old_block = old_blocks[o];
    if (!new_lookup.has(old_block.key))
      destroy(old_block, lookup);
  }
  while (n)
    insert2(new_blocks[n - 1]);
  return new_blocks;
}
function create_component(block) {
  block && block.c();
}
function mount_component(component, target, anchor, customElement) {
  const { fragment, on_mount, on_destroy, after_update } = component.$$;
  fragment && fragment.m(target, anchor);
  if (!customElement) {
    add_render_callback(() => {
      const new_on_destroy = on_mount.map(run).filter(is_function);
      if (on_destroy) {
        on_destroy.push(...new_on_destroy);
      } else {
        run_all(new_on_destroy);
      }
      component.$$.on_mount = [];
    });
  }
  after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
  const $$ = component.$$;
  if ($$.fragment !== null) {
    run_all($$.on_destroy);
    $$.fragment && $$.fragment.d(detaching);
    $$.on_destroy = $$.fragment = null;
    $$.ctx = [];
  }
}
function make_dirty(component, i) {
  if (component.$$.dirty[0] === -1) {
    dirty_components.push(component);
    schedule_update();
    component.$$.dirty.fill(0);
  }
  component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
}
function init(component, options, instance5, create_fragment5, not_equal, props, append_styles, dirty = [-1]) {
  const parent_component = current_component;
  set_current_component(component);
  const $$ = component.$$ = {
    fragment: null,
    ctx: null,
    props,
    update: noop,
    not_equal,
    bound: blank_object(),
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
    callbacks: blank_object(),
    dirty,
    skip_bound: false,
    root: options.target || parent_component.$$.root
  };
  append_styles && append_styles($$.root);
  let ready = false;
  $$.ctx = instance5 ? instance5(component, options.props || {}, (i, ret, ...rest) => {
    const value = rest.length ? rest[0] : ret;
    if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
      if (!$$.skip_bound && $$.bound[i])
        $$.bound[i](value);
      if (ready)
        make_dirty(component, i);
    }
    return ret;
  }) : [];
  $$.update();
  ready = true;
  run_all($$.before_update);
  $$.fragment = create_fragment5 ? create_fragment5($$.ctx) : false;
  if (options.target) {
    if (options.hydrate) {
      start_hydrating();
      const nodes = children(options.target);
      $$.fragment && $$.fragment.l(nodes);
      nodes.forEach(detach);
    } else {
      $$.fragment && $$.fragment.c();
    }
    if (options.intro)
      transition_in(component.$$.fragment);
    mount_component(component, options.target, options.anchor, options.customElement);
    end_hydrating();
    flush();
  }
  set_current_component(parent_component);
}
var SvelteElement;
if (typeof HTMLElement === "function") {
  SvelteElement = class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
      const { on_mount } = this.$$;
      this.$$.on_disconnect = on_mount.map(run).filter(is_function);
      for (const key in this.$$.slotted) {
        this.appendChild(this.$$.slotted[key]);
      }
    }
    attributeChangedCallback(attr2, _oldValue, newValue) {
      this[attr2] = newValue;
    }
    disconnectedCallback() {
      run_all(this.$$.on_disconnect);
    }
    $destroy() {
      destroy_component(this, 1);
      this.$destroy = noop;
    }
    $on(type2, callback) {
      const callbacks = this.$$.callbacks[type2] || (this.$$.callbacks[type2] = []);
      callbacks.push(callback);
      return () => {
        const index = callbacks.indexOf(callback);
        if (index !== -1)
          callbacks.splice(index, 1);
      };
    }
    $set($$props) {
      if (this.$$set && !is_empty($$props)) {
        this.$$.skip_bound = true;
        this.$$set($$props);
        this.$$.skip_bound = false;
      }
    }
  };
}
var SvelteComponent = class {
  $destroy() {
    destroy_component(this, 1);
    this.$destroy = noop;
  }
  $on(type2, callback) {
    const callbacks = this.$$.callbacks[type2] || (this.$$.callbacks[type2] = []);
    callbacks.push(callback);
    return () => {
      const index = callbacks.indexOf(callback);
      if (index !== -1)
        callbacks.splice(index, 1);
    };
  }
  $set($$props) {
    if (this.$$set && !is_empty($$props)) {
      this.$$.skip_bound = true;
      this.$$set($$props);
      this.$$.skip_bound = false;
    }
  }
};

// node_modules/@sveltejs/svelte-virtual-list/VirtualList.svelte
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[23] = list[i];
  return child_ctx;
}
var get_default_slot_changes = (dirty) => ({ item: dirty & 16 });
var get_default_slot_context = (ctx) => ({ item: ctx[23].data });
function fallback_block(ctx) {
  let t;
  return {
    c() {
      t = text("Missing template");
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_each_block(key_1, ctx) {
  let svelte_virtual_list_row;
  let t;
  let current;
  const default_slot_template = ctx[14].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[13], get_default_slot_context);
  const default_slot_or_fallback = default_slot || fallback_block(ctx);
  return {
    key: key_1,
    first: null,
    c() {
      svelte_virtual_list_row = element("svelte-virtual-list-row");
      if (default_slot_or_fallback)
        default_slot_or_fallback.c();
      t = space();
      set_custom_element_data(svelte_virtual_list_row, "class", "svelte-1tqh76q");
      this.first = svelte_virtual_list_row;
    },
    m(target, anchor) {
      insert(target, svelte_virtual_list_row, anchor);
      if (default_slot_or_fallback) {
        default_slot_or_fallback.m(svelte_virtual_list_row, null);
      }
      append(svelte_virtual_list_row, t);
      current = true;
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 8208)) {
          update_slot_base(default_slot, default_slot_template, ctx, ctx[13], !current ? get_all_dirty_from_scope(ctx[13]) : get_slot_changes(default_slot_template, ctx[13], dirty, get_default_slot_changes), get_default_slot_context);
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot_or_fallback, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot_or_fallback, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(svelte_virtual_list_row);
      if (default_slot_or_fallback)
        default_slot_or_fallback.d(detaching);
    }
  };
}
function create_fragment(ctx) {
  let svelte_virtual_list_viewport;
  let svelte_virtual_list_contents;
  let each_blocks = [];
  let each_1_lookup = /* @__PURE__ */ new Map();
  let svelte_virtual_list_viewport_resize_listener;
  let current;
  let mounted;
  let dispose;
  let each_value = ctx[4];
  const get_key = (ctx2) => ctx2[23].index;
  for (let i = 0; i < each_value.length; i += 1) {
    let child_ctx = get_each_context(ctx, each_value, i);
    let key = get_key(child_ctx);
    each_1_lookup.set(key, each_blocks[i] = create_each_block(key, child_ctx));
  }
  return {
    c() {
      svelte_virtual_list_viewport = element("svelte-virtual-list-viewport");
      svelte_virtual_list_contents = element("svelte-virtual-list-contents");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      set_style(svelte_virtual_list_contents, "padding-top", ctx[5] + "px");
      set_style(svelte_virtual_list_contents, "padding-bottom", ctx[6] + "px");
      set_custom_element_data(svelte_virtual_list_contents, "class", "svelte-1tqh76q");
      set_style(svelte_virtual_list_viewport, "height", ctx[0]);
      set_custom_element_data(svelte_virtual_list_viewport, "class", "svelte-1tqh76q");
      add_render_callback(() => ctx[17].call(svelte_virtual_list_viewport));
    },
    m(target, anchor) {
      insert(target, svelte_virtual_list_viewport, anchor);
      append(svelte_virtual_list_viewport, svelte_virtual_list_contents);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(svelte_virtual_list_contents, null);
      }
      ctx[15](svelte_virtual_list_contents);
      ctx[16](svelte_virtual_list_viewport);
      svelte_virtual_list_viewport_resize_listener = add_resize_listener(svelte_virtual_list_viewport, ctx[17].bind(svelte_virtual_list_viewport));
      current = true;
      if (!mounted) {
        dispose = listen(svelte_virtual_list_viewport, "scroll", ctx[7]);
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & 8208) {
        each_value = ctx2[4];
        group_outros();
        each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx2, each_value, each_1_lookup, svelte_virtual_list_contents, outro_and_destroy_block, create_each_block, null, get_each_context);
        check_outros();
      }
      if (!current || dirty & 32) {
        set_style(svelte_virtual_list_contents, "padding-top", ctx2[5] + "px");
      }
      if (!current || dirty & 64) {
        set_style(svelte_virtual_list_contents, "padding-bottom", ctx2[6] + "px");
      }
      if (!current || dirty & 1) {
        set_style(svelte_virtual_list_viewport, "height", ctx2[0]);
      }
    },
    i(local) {
      if (current)
        return;
      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      current = true;
    },
    o(local) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(svelte_virtual_list_viewport);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].d();
      }
      ctx[15](null);
      ctx[16](null);
      svelte_virtual_list_viewport_resize_listener();
      mounted = false;
      dispose();
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  let { items } = $$props;
  let { height = "100%" } = $$props;
  let { itemHeight = void 0 } = $$props;
  let foo;
  let { start: start2 = 0 } = $$props;
  let { end = 0 } = $$props;
  let height_map = [];
  let rows;
  let viewport;
  let contents;
  let viewport_height = 0;
  let visible;
  let mounted;
  let top = 0;
  let bottom = 0;
  let average_height;
  async function refresh(items2, viewport_height2, itemHeight2) {
    const { scrollTop } = viewport;
    await tick();
    let content_height = top - scrollTop;
    let i = start2;
    while (content_height < viewport_height2 && i < items2.length) {
      let row = rows[i - start2];
      if (!row) {
        $$invalidate(9, end = i + 1);
        await tick();
        row = rows[i - start2];
      }
      const row_height = height_map[i] = itemHeight2 || row.offsetHeight;
      content_height += row_height;
      i += 1;
    }
    $$invalidate(9, end = i);
    const remaining = items2.length - end;
    average_height = (top + content_height) / end;
    $$invalidate(6, bottom = remaining * average_height);
    height_map.length = items2.length;
  }
  async function handle_scroll() {
    const { scrollTop } = viewport;
    const old_start = start2;
    for (let v = 0; v < rows.length; v += 1) {
      height_map[start2 + v] = itemHeight || rows[v].offsetHeight;
    }
    let i = 0;
    let y2 = 0;
    while (i < items.length) {
      const row_height = height_map[i] || average_height;
      if (y2 + row_height > scrollTop) {
        $$invalidate(8, start2 = i);
        $$invalidate(5, top = y2);
        break;
      }
      y2 += row_height;
      i += 1;
    }
    while (i < items.length) {
      y2 += height_map[i] || average_height;
      i += 1;
      if (y2 > scrollTop + viewport_height)
        break;
    }
    $$invalidate(9, end = i);
    const remaining = items.length - end;
    average_height = y2 / end;
    while (i < items.length)
      height_map[i++] = average_height;
    $$invalidate(6, bottom = remaining * average_height);
    if (start2 < old_start) {
      await tick();
      let expected_height = 0;
      let actual_height = 0;
      for (let i2 = start2; i2 < old_start; i2 += 1) {
        if (rows[i2 - start2]) {
          expected_height += height_map[i2];
          actual_height += itemHeight || rows[i2 - start2].offsetHeight;
        }
      }
      const d = actual_height - expected_height;
      viewport.scrollTo(0, scrollTop + d);
    }
  }
  onMount(() => {
    rows = contents.getElementsByTagName("svelte-virtual-list-row");
    $$invalidate(12, mounted = true);
  });
  function svelte_virtual_list_contents_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      contents = $$value;
      $$invalidate(3, contents);
    });
  }
  function svelte_virtual_list_viewport_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      viewport = $$value;
      $$invalidate(2, viewport);
    });
  }
  function svelte_virtual_list_viewport_elementresize_handler() {
    viewport_height = this.offsetHeight;
    $$invalidate(1, viewport_height);
  }
  $$self.$$set = ($$props2) => {
    if ("items" in $$props2)
      $$invalidate(10, items = $$props2.items);
    if ("height" in $$props2)
      $$invalidate(0, height = $$props2.height);
    if ("itemHeight" in $$props2)
      $$invalidate(11, itemHeight = $$props2.itemHeight);
    if ("start" in $$props2)
      $$invalidate(8, start2 = $$props2.start);
    if ("end" in $$props2)
      $$invalidate(9, end = $$props2.end);
    if ("$$scope" in $$props2)
      $$invalidate(13, $$scope = $$props2.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 1792) {
      $:
        $$invalidate(4, visible = items.slice(start2, end).map((data, i) => {
          return { index: i + start2, data };
        }));
    }
    if ($$self.$$.dirty & 7170) {
      $:
        if (mounted)
          refresh(items, viewport_height, itemHeight);
    }
  };
  return [
    height,
    viewport_height,
    viewport,
    contents,
    visible,
    top,
    bottom,
    handle_scroll,
    start2,
    end,
    items,
    itemHeight,
    mounted,
    $$scope,
    slots,
    svelte_virtual_list_contents_binding,
    svelte_virtual_list_viewport_binding,
    svelte_virtual_list_viewport_elementresize_handler
  ];
}
var VirtualList = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, {
      items: 10,
      height: 0,
      itemHeight: 11,
      start: 8,
      end: 9
    });
  }
};
var VirtualList_default = VirtualList;

// node_modules/long/index.js
var long_exports = {};
__export(long_exports, {
  default: () => long_default
});
var wasm = null;
try {
  wasm = new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([
    0,
    97,
    115,
    109,
    1,
    0,
    0,
    0,
    1,
    13,
    2,
    96,
    0,
    1,
    127,
    96,
    4,
    127,
    127,
    127,
    127,
    1,
    127,
    3,
    7,
    6,
    0,
    1,
    1,
    1,
    1,
    1,
    6,
    6,
    1,
    127,
    1,
    65,
    0,
    11,
    7,
    50,
    6,
    3,
    109,
    117,
    108,
    0,
    1,
    5,
    100,
    105,
    118,
    95,
    115,
    0,
    2,
    5,
    100,
    105,
    118,
    95,
    117,
    0,
    3,
    5,
    114,
    101,
    109,
    95,
    115,
    0,
    4,
    5,
    114,
    101,
    109,
    95,
    117,
    0,
    5,
    8,
    103,
    101,
    116,
    95,
    104,
    105,
    103,
    104,
    0,
    0,
    10,
    191,
    1,
    6,
    4,
    0,
    35,
    0,
    11,
    36,
    1,
    1,
    126,
    32,
    0,
    173,
    32,
    1,
    173,
    66,
    32,
    134,
    132,
    32,
    2,
    173,
    32,
    3,
    173,
    66,
    32,
    134,
    132,
    126,
    34,
    4,
    66,
    32,
    135,
    167,
    36,
    0,
    32,
    4,
    167,
    11,
    36,
    1,
    1,
    126,
    32,
    0,
    173,
    32,
    1,
    173,
    66,
    32,
    134,
    132,
    32,
    2,
    173,
    32,
    3,
    173,
    66,
    32,
    134,
    132,
    127,
    34,
    4,
    66,
    32,
    135,
    167,
    36,
    0,
    32,
    4,
    167,
    11,
    36,
    1,
    1,
    126,
    32,
    0,
    173,
    32,
    1,
    173,
    66,
    32,
    134,
    132,
    32,
    2,
    173,
    32,
    3,
    173,
    66,
    32,
    134,
    132,
    128,
    34,
    4,
    66,
    32,
    135,
    167,
    36,
    0,
    32,
    4,
    167,
    11,
    36,
    1,
    1,
    126,
    32,
    0,
    173,
    32,
    1,
    173,
    66,
    32,
    134,
    132,
    32,
    2,
    173,
    32,
    3,
    173,
    66,
    32,
    134,
    132,
    129,
    34,
    4,
    66,
    32,
    135,
    167,
    36,
    0,
    32,
    4,
    167,
    11,
    36,
    1,
    1,
    126,
    32,
    0,
    173,
    32,
    1,
    173,
    66,
    32,
    134,
    132,
    32,
    2,
    173,
    32,
    3,
    173,
    66,
    32,
    134,
    132,
    130,
    34,
    4,
    66,
    32,
    135,
    167,
    36,
    0,
    32,
    4,
    167,
    11
  ])), {}).exports;
} catch (e) {
}
function Long(low, high, unsigned) {
  this.low = low | 0;
  this.high = high | 0;
  this.unsigned = !!unsigned;
}
Long.prototype.__isLong__;
Object.defineProperty(Long.prototype, "__isLong__", { value: true });
function isLong(obj) {
  return (obj && obj["__isLong__"]) === true;
}
function ctz32(value) {
  var c = Math.clz32(value & -value);
  return value ? 31 - c : c;
}
Long.isLong = isLong;
var INT_CACHE = {};
var UINT_CACHE = {};
function fromInt(value, unsigned) {
  var obj, cachedObj, cache;
  if (unsigned) {
    value >>>= 0;
    if (cache = 0 <= value && value < 256) {
      cachedObj = UINT_CACHE[value];
      if (cachedObj)
        return cachedObj;
    }
    obj = fromBits(value, 0, true);
    if (cache)
      UINT_CACHE[value] = obj;
    return obj;
  } else {
    value |= 0;
    if (cache = -128 <= value && value < 128) {
      cachedObj = INT_CACHE[value];
      if (cachedObj)
        return cachedObj;
    }
    obj = fromBits(value, value < 0 ? -1 : 0, false);
    if (cache)
      INT_CACHE[value] = obj;
    return obj;
  }
}
Long.fromInt = fromInt;
function fromNumber(value, unsigned) {
  if (isNaN(value))
    return unsigned ? UZERO : ZERO;
  if (unsigned) {
    if (value < 0)
      return UZERO;
    if (value >= TWO_PWR_64_DBL)
      return MAX_UNSIGNED_VALUE;
  } else {
    if (value <= -TWO_PWR_63_DBL)
      return MIN_VALUE;
    if (value + 1 >= TWO_PWR_63_DBL)
      return MAX_VALUE;
  }
  if (value < 0)
    return fromNumber(-value, unsigned).neg();
  return fromBits(value % TWO_PWR_32_DBL | 0, value / TWO_PWR_32_DBL | 0, unsigned);
}
Long.fromNumber = fromNumber;
function fromBits(lowBits, highBits, unsigned) {
  return new Long(lowBits, highBits, unsigned);
}
Long.fromBits = fromBits;
var pow_dbl = Math.pow;
function fromString(str, unsigned, radix) {
  if (str.length === 0)
    throw Error("empty string");
  if (typeof unsigned === "number") {
    radix = unsigned;
    unsigned = false;
  } else {
    unsigned = !!unsigned;
  }
  if (str === "NaN" || str === "Infinity" || str === "+Infinity" || str === "-Infinity")
    return unsigned ? UZERO : ZERO;
  radix = radix || 10;
  if (radix < 2 || 36 < radix)
    throw RangeError("radix");
  var p;
  if ((p = str.indexOf("-")) > 0)
    throw Error("interior hyphen");
  else if (p === 0) {
    return fromString(str.substring(1), unsigned, radix).neg();
  }
  var radixToPower = fromNumber(pow_dbl(radix, 8));
  var result = ZERO;
  for (var i = 0; i < str.length; i += 8) {
    var size = Math.min(8, str.length - i), value = parseInt(str.substring(i, i + size), radix);
    if (size < 8) {
      var power = fromNumber(pow_dbl(radix, size));
      result = result.mul(power).add(fromNumber(value));
    } else {
      result = result.mul(radixToPower);
      result = result.add(fromNumber(value));
    }
  }
  result.unsigned = unsigned;
  return result;
}
Long.fromString = fromString;
function fromValue(val, unsigned) {
  if (typeof val === "number")
    return fromNumber(val, unsigned);
  if (typeof val === "string")
    return fromString(val, unsigned);
  return fromBits(val.low, val.high, typeof unsigned === "boolean" ? unsigned : val.unsigned);
}
Long.fromValue = fromValue;
var TWO_PWR_16_DBL = 1 << 16;
var TWO_PWR_24_DBL = 1 << 24;
var TWO_PWR_32_DBL = TWO_PWR_16_DBL * TWO_PWR_16_DBL;
var TWO_PWR_64_DBL = TWO_PWR_32_DBL * TWO_PWR_32_DBL;
var TWO_PWR_63_DBL = TWO_PWR_64_DBL / 2;
var TWO_PWR_24 = fromInt(TWO_PWR_24_DBL);
var ZERO = fromInt(0);
Long.ZERO = ZERO;
var UZERO = fromInt(0, true);
Long.UZERO = UZERO;
var ONE = fromInt(1);
Long.ONE = ONE;
var UONE = fromInt(1, true);
Long.UONE = UONE;
var NEG_ONE = fromInt(-1);
Long.NEG_ONE = NEG_ONE;
var MAX_VALUE = fromBits(4294967295 | 0, 2147483647 | 0, false);
Long.MAX_VALUE = MAX_VALUE;
var MAX_UNSIGNED_VALUE = fromBits(4294967295 | 0, 4294967295 | 0, true);
Long.MAX_UNSIGNED_VALUE = MAX_UNSIGNED_VALUE;
var MIN_VALUE = fromBits(0, 2147483648 | 0, false);
Long.MIN_VALUE = MIN_VALUE;
var LongPrototype = Long.prototype;
LongPrototype.toInt = function toInt() {
  return this.unsigned ? this.low >>> 0 : this.low;
};
LongPrototype.toNumber = function toNumber() {
  if (this.unsigned)
    return (this.high >>> 0) * TWO_PWR_32_DBL + (this.low >>> 0);
  return this.high * TWO_PWR_32_DBL + (this.low >>> 0);
};
LongPrototype.toString = function toString(radix) {
  radix = radix || 10;
  if (radix < 2 || 36 < radix)
    throw RangeError("radix");
  if (this.isZero())
    return "0";
  if (this.isNegative()) {
    if (this.eq(MIN_VALUE)) {
      var radixLong = fromNumber(radix), div = this.div(radixLong), rem1 = div.mul(radixLong).sub(this);
      return div.toString(radix) + rem1.toInt().toString(radix);
    } else
      return "-" + this.neg().toString(radix);
  }
  var radixToPower = fromNumber(pow_dbl(radix, 6), this.unsigned), rem = this;
  var result = "";
  while (true) {
    var remDiv = rem.div(radixToPower), intval = rem.sub(remDiv.mul(radixToPower)).toInt() >>> 0, digits = intval.toString(radix);
    rem = remDiv;
    if (rem.isZero())
      return digits + result;
    else {
      while (digits.length < 6)
        digits = "0" + digits;
      result = "" + digits + result;
    }
  }
};
LongPrototype.getHighBits = function getHighBits() {
  return this.high;
};
LongPrototype.getHighBitsUnsigned = function getHighBitsUnsigned() {
  return this.high >>> 0;
};
LongPrototype.getLowBits = function getLowBits() {
  return this.low;
};
LongPrototype.getLowBitsUnsigned = function getLowBitsUnsigned() {
  return this.low >>> 0;
};
LongPrototype.getNumBitsAbs = function getNumBitsAbs() {
  if (this.isNegative())
    return this.eq(MIN_VALUE) ? 64 : this.neg().getNumBitsAbs();
  var val = this.high != 0 ? this.high : this.low;
  for (var bit = 31; bit > 0; bit--)
    if ((val & 1 << bit) != 0)
      break;
  return this.high != 0 ? bit + 33 : bit + 1;
};
LongPrototype.isZero = function isZero() {
  return this.high === 0 && this.low === 0;
};
LongPrototype.eqz = LongPrototype.isZero;
LongPrototype.isNegative = function isNegative() {
  return !this.unsigned && this.high < 0;
};
LongPrototype.isPositive = function isPositive() {
  return this.unsigned || this.high >= 0;
};
LongPrototype.isOdd = function isOdd() {
  return (this.low & 1) === 1;
};
LongPrototype.isEven = function isEven() {
  return (this.low & 1) === 0;
};
LongPrototype.equals = function equals(other) {
  if (!isLong(other))
    other = fromValue(other);
  if (this.unsigned !== other.unsigned && this.high >>> 31 === 1 && other.high >>> 31 === 1)
    return false;
  return this.high === other.high && this.low === other.low;
};
LongPrototype.eq = LongPrototype.equals;
LongPrototype.notEquals = function notEquals(other) {
  return !this.eq(other);
};
LongPrototype.neq = LongPrototype.notEquals;
LongPrototype.ne = LongPrototype.notEquals;
LongPrototype.lessThan = function lessThan(other) {
  return this.comp(other) < 0;
};
LongPrototype.lt = LongPrototype.lessThan;
LongPrototype.lessThanOrEqual = function lessThanOrEqual(other) {
  return this.comp(other) <= 0;
};
LongPrototype.lte = LongPrototype.lessThanOrEqual;
LongPrototype.le = LongPrototype.lessThanOrEqual;
LongPrototype.greaterThan = function greaterThan(other) {
  return this.comp(other) > 0;
};
LongPrototype.gt = LongPrototype.greaterThan;
LongPrototype.greaterThanOrEqual = function greaterThanOrEqual(other) {
  return this.comp(other) >= 0;
};
LongPrototype.gte = LongPrototype.greaterThanOrEqual;
LongPrototype.ge = LongPrototype.greaterThanOrEqual;
LongPrototype.compare = function compare(other) {
  if (!isLong(other))
    other = fromValue(other);
  if (this.eq(other))
    return 0;
  var thisNeg = this.isNegative(), otherNeg = other.isNegative();
  if (thisNeg && !otherNeg)
    return -1;
  if (!thisNeg && otherNeg)
    return 1;
  if (!this.unsigned)
    return this.sub(other).isNegative() ? -1 : 1;
  return other.high >>> 0 > this.high >>> 0 || other.high === this.high && other.low >>> 0 > this.low >>> 0 ? -1 : 1;
};
LongPrototype.comp = LongPrototype.compare;
LongPrototype.negate = function negate() {
  if (!this.unsigned && this.eq(MIN_VALUE))
    return MIN_VALUE;
  return this.not().add(ONE);
};
LongPrototype.neg = LongPrototype.negate;
LongPrototype.add = function add(addend) {
  if (!isLong(addend))
    addend = fromValue(addend);
  var a48 = this.high >>> 16;
  var a32 = this.high & 65535;
  var a16 = this.low >>> 16;
  var a00 = this.low & 65535;
  var b48 = addend.high >>> 16;
  var b32 = addend.high & 65535;
  var b16 = addend.low >>> 16;
  var b00 = addend.low & 65535;
  var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
  c00 += a00 + b00;
  c16 += c00 >>> 16;
  c00 &= 65535;
  c16 += a16 + b16;
  c32 += c16 >>> 16;
  c16 &= 65535;
  c32 += a32 + b32;
  c48 += c32 >>> 16;
  c32 &= 65535;
  c48 += a48 + b48;
  c48 &= 65535;
  return fromBits(c16 << 16 | c00, c48 << 16 | c32, this.unsigned);
};
LongPrototype.subtract = function subtract(subtrahend) {
  if (!isLong(subtrahend))
    subtrahend = fromValue(subtrahend);
  return this.add(subtrahend.neg());
};
LongPrototype.sub = LongPrototype.subtract;
LongPrototype.multiply = function multiply(multiplier) {
  if (this.isZero())
    return this;
  if (!isLong(multiplier))
    multiplier = fromValue(multiplier);
  if (wasm) {
    var low = wasm["mul"](this.low, this.high, multiplier.low, multiplier.high);
    return fromBits(low, wasm["get_high"](), this.unsigned);
  }
  if (multiplier.isZero())
    return this.unsigned ? UZERO : ZERO;
  if (this.eq(MIN_VALUE))
    return multiplier.isOdd() ? MIN_VALUE : ZERO;
  if (multiplier.eq(MIN_VALUE))
    return this.isOdd() ? MIN_VALUE : ZERO;
  if (this.isNegative()) {
    if (multiplier.isNegative())
      return this.neg().mul(multiplier.neg());
    else
      return this.neg().mul(multiplier).neg();
  } else if (multiplier.isNegative())
    return this.mul(multiplier.neg()).neg();
  if (this.lt(TWO_PWR_24) && multiplier.lt(TWO_PWR_24))
    return fromNumber(this.toNumber() * multiplier.toNumber(), this.unsigned);
  var a48 = this.high >>> 16;
  var a32 = this.high & 65535;
  var a16 = this.low >>> 16;
  var a00 = this.low & 65535;
  var b48 = multiplier.high >>> 16;
  var b32 = multiplier.high & 65535;
  var b16 = multiplier.low >>> 16;
  var b00 = multiplier.low & 65535;
  var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
  c00 += a00 * b00;
  c16 += c00 >>> 16;
  c00 &= 65535;
  c16 += a16 * b00;
  c32 += c16 >>> 16;
  c16 &= 65535;
  c16 += a00 * b16;
  c32 += c16 >>> 16;
  c16 &= 65535;
  c32 += a32 * b00;
  c48 += c32 >>> 16;
  c32 &= 65535;
  c32 += a16 * b16;
  c48 += c32 >>> 16;
  c32 &= 65535;
  c32 += a00 * b32;
  c48 += c32 >>> 16;
  c32 &= 65535;
  c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
  c48 &= 65535;
  return fromBits(c16 << 16 | c00, c48 << 16 | c32, this.unsigned);
};
LongPrototype.mul = LongPrototype.multiply;
LongPrototype.divide = function divide(divisor) {
  if (!isLong(divisor))
    divisor = fromValue(divisor);
  if (divisor.isZero())
    throw Error("division by zero");
  if (wasm) {
    if (!this.unsigned && this.high === -2147483648 && divisor.low === -1 && divisor.high === -1) {
      return this;
    }
    var low = (this.unsigned ? wasm["div_u"] : wasm["div_s"])(this.low, this.high, divisor.low, divisor.high);
    return fromBits(low, wasm["get_high"](), this.unsigned);
  }
  if (this.isZero())
    return this.unsigned ? UZERO : ZERO;
  var approx, rem, res;
  if (!this.unsigned) {
    if (this.eq(MIN_VALUE)) {
      if (divisor.eq(ONE) || divisor.eq(NEG_ONE))
        return MIN_VALUE;
      else if (divisor.eq(MIN_VALUE))
        return ONE;
      else {
        var halfThis = this.shr(1);
        approx = halfThis.div(divisor).shl(1);
        if (approx.eq(ZERO)) {
          return divisor.isNegative() ? ONE : NEG_ONE;
        } else {
          rem = this.sub(divisor.mul(approx));
          res = approx.add(rem.div(divisor));
          return res;
        }
      }
    } else if (divisor.eq(MIN_VALUE))
      return this.unsigned ? UZERO : ZERO;
    if (this.isNegative()) {
      if (divisor.isNegative())
        return this.neg().div(divisor.neg());
      return this.neg().div(divisor).neg();
    } else if (divisor.isNegative())
      return this.div(divisor.neg()).neg();
    res = ZERO;
  } else {
    if (!divisor.unsigned)
      divisor = divisor.toUnsigned();
    if (divisor.gt(this))
      return UZERO;
    if (divisor.gt(this.shru(1)))
      return UONE;
    res = UZERO;
  }
  rem = this;
  while (rem.gte(divisor)) {
    approx = Math.max(1, Math.floor(rem.toNumber() / divisor.toNumber()));
    var log2 = Math.ceil(Math.log(approx) / Math.LN2), delta = log2 <= 48 ? 1 : pow_dbl(2, log2 - 48), approxRes = fromNumber(approx), approxRem = approxRes.mul(divisor);
    while (approxRem.isNegative() || approxRem.gt(rem)) {
      approx -= delta;
      approxRes = fromNumber(approx, this.unsigned);
      approxRem = approxRes.mul(divisor);
    }
    if (approxRes.isZero())
      approxRes = ONE;
    res = res.add(approxRes);
    rem = rem.sub(approxRem);
  }
  return res;
};
LongPrototype.div = LongPrototype.divide;
LongPrototype.modulo = function modulo(divisor) {
  if (!isLong(divisor))
    divisor = fromValue(divisor);
  if (wasm) {
    var low = (this.unsigned ? wasm["rem_u"] : wasm["rem_s"])(this.low, this.high, divisor.low, divisor.high);
    return fromBits(low, wasm["get_high"](), this.unsigned);
  }
  return this.sub(this.div(divisor).mul(divisor));
};
LongPrototype.mod = LongPrototype.modulo;
LongPrototype.rem = LongPrototype.modulo;
LongPrototype.not = function not() {
  return fromBits(~this.low, ~this.high, this.unsigned);
};
LongPrototype.countLeadingZeros = function countLeadingZeros() {
  return this.high ? Math.clz32(this.high) : Math.clz32(this.low) + 32;
};
LongPrototype.clz = LongPrototype.countLeadingZeros;
LongPrototype.countTrailingZeros = function countTrailingZeros() {
  return this.low ? ctz32(this.low) : ctz32(this.high) + 32;
};
LongPrototype.ctz = LongPrototype.countTrailingZeros;
LongPrototype.and = function and(other) {
  if (!isLong(other))
    other = fromValue(other);
  return fromBits(this.low & other.low, this.high & other.high, this.unsigned);
};
LongPrototype.or = function or(other) {
  if (!isLong(other))
    other = fromValue(other);
  return fromBits(this.low | other.low, this.high | other.high, this.unsigned);
};
LongPrototype.xor = function xor(other) {
  if (!isLong(other))
    other = fromValue(other);
  return fromBits(this.low ^ other.low, this.high ^ other.high, this.unsigned);
};
LongPrototype.shiftLeft = function shiftLeft(numBits) {
  if (isLong(numBits))
    numBits = numBits.toInt();
  if ((numBits &= 63) === 0)
    return this;
  else if (numBits < 32)
    return fromBits(this.low << numBits, this.high << numBits | this.low >>> 32 - numBits, this.unsigned);
  else
    return fromBits(0, this.low << numBits - 32, this.unsigned);
};
LongPrototype.shl = LongPrototype.shiftLeft;
LongPrototype.shiftRight = function shiftRight(numBits) {
  if (isLong(numBits))
    numBits = numBits.toInt();
  if ((numBits &= 63) === 0)
    return this;
  else if (numBits < 32)
    return fromBits(this.low >>> numBits | this.high << 32 - numBits, this.high >> numBits, this.unsigned);
  else
    return fromBits(this.high >> numBits - 32, this.high >= 0 ? 0 : -1, this.unsigned);
};
LongPrototype.shr = LongPrototype.shiftRight;
LongPrototype.shiftRightUnsigned = function shiftRightUnsigned(numBits) {
  if (isLong(numBits))
    numBits = numBits.toInt();
  if ((numBits &= 63) === 0)
    return this;
  if (numBits < 32)
    return fromBits(this.low >>> numBits | this.high << 32 - numBits, this.high >>> numBits, this.unsigned);
  if (numBits === 32)
    return fromBits(this.high, 0, this.unsigned);
  return fromBits(this.high >>> numBits - 32, 0, this.unsigned);
};
LongPrototype.shru = LongPrototype.shiftRightUnsigned;
LongPrototype.shr_u = LongPrototype.shiftRightUnsigned;
LongPrototype.rotateLeft = function rotateLeft(numBits) {
  var b;
  if (isLong(numBits))
    numBits = numBits.toInt();
  if ((numBits &= 63) === 0)
    return this;
  if (numBits === 32)
    return fromBits(this.high, this.low, this.unsigned);
  if (numBits < 32) {
    b = 32 - numBits;
    return fromBits(this.low << numBits | this.high >>> b, this.high << numBits | this.low >>> b, this.unsigned);
  }
  numBits -= 32;
  b = 32 - numBits;
  return fromBits(this.high << numBits | this.low >>> b, this.low << numBits | this.high >>> b, this.unsigned);
};
LongPrototype.rotl = LongPrototype.rotateLeft;
LongPrototype.rotateRight = function rotateRight(numBits) {
  var b;
  if (isLong(numBits))
    numBits = numBits.toInt();
  if ((numBits &= 63) === 0)
    return this;
  if (numBits === 32)
    return fromBits(this.high, this.low, this.unsigned);
  if (numBits < 32) {
    b = 32 - numBits;
    return fromBits(this.high << b | this.low >>> numBits, this.low << b | this.high >>> numBits, this.unsigned);
  }
  numBits -= 32;
  b = 32 - numBits;
  return fromBits(this.low << b | this.high >>> numBits, this.high << b | this.low >>> numBits, this.unsigned);
};
LongPrototype.rotr = LongPrototype.rotateRight;
LongPrototype.toSigned = function toSigned() {
  if (!this.unsigned)
    return this;
  return fromBits(this.low, this.high, false);
};
LongPrototype.toUnsigned = function toUnsigned() {
  if (this.unsigned)
    return this;
  return fromBits(this.low, this.high, true);
};
LongPrototype.toBytes = function toBytes(le) {
  return le ? this.toBytesLE() : this.toBytesBE();
};
LongPrototype.toBytesLE = function toBytesLE() {
  var hi = this.high, lo = this.low;
  return [
    lo & 255,
    lo >>> 8 & 255,
    lo >>> 16 & 255,
    lo >>> 24,
    hi & 255,
    hi >>> 8 & 255,
    hi >>> 16 & 255,
    hi >>> 24
  ];
};
LongPrototype.toBytesBE = function toBytesBE() {
  var hi = this.high, lo = this.low;
  return [
    hi >>> 24,
    hi >>> 16 & 255,
    hi >>> 8 & 255,
    hi & 255,
    lo >>> 24,
    lo >>> 16 & 255,
    lo >>> 8 & 255,
    lo & 255
  ];
};
Long.fromBytes = function fromBytes(bytes, unsigned, le) {
  return le ? Long.fromBytesLE(bytes, unsigned) : Long.fromBytesBE(bytes, unsigned);
};
Long.fromBytesLE = function fromBytesLE(bytes, unsigned) {
  return new Long(bytes[0] | bytes[1] << 8 | bytes[2] << 16 | bytes[3] << 24, bytes[4] | bytes[5] << 8 | bytes[6] << 16 | bytes[7] << 24, unsigned);
};
Long.fromBytesBE = function fromBytesBE(bytes, unsigned) {
  return new Long(bytes[4] << 24 | bytes[5] << 16 | bytes[6] << 8 | bytes[7], bytes[0] << 24 | bytes[1] << 16 | bytes[2] << 8 | bytes[3], unsigned);
};
var long_default = Long;

// src/proto/message.ts
var import_minimal = __toESM(require_minimal2());
function createBaseAckPacket() {
  return {};
}
var AckPacket = {
  encode(_, writer = import_minimal.Writer.create()) {
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal.Reader ? input : new import_minimal.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseAckPacket();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(_) {
    return {};
  },
  toJSON(_) {
    const obj = {};
    return obj;
  },
  fromPartial(_) {
    const message = createBaseAckPacket();
    return message;
  }
};
function createBasePosition() {
  return { x: 0, y: 0, heading: 0 };
}
var Position = {
  encode(message, writer = import_minimal.Writer.create()) {
    if (message.x !== 0) {
      writer.uint32(13).float(message.x);
    }
    if (message.y !== 0) {
      writer.uint32(21).float(message.y);
    }
    if (message.heading !== 0) {
      writer.uint32(29).float(message.heading);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal.Reader ? input : new import_minimal.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBasePosition();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.x = reader.float();
          break;
        case 2:
          message.y = reader.float();
          break;
        case 3:
          message.heading = reader.float();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      x: isSet(object.x) ? Number(object.x) : 0,
      y: isSet(object.y) ? Number(object.y) : 0,
      heading: isSet(object.heading) ? Number(object.heading) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.x !== void 0 && (obj.x = message.x);
    message.y !== void 0 && (obj.y = message.y);
    message.heading !== void 0 && (obj.heading = message.heading);
    return obj;
  },
  fromPartial(object) {
    const message = createBasePosition();
    message.x = object.x ?? 0;
    message.y = object.y ?? 0;
    message.heading = object.heading ?? 0;
    return message;
  }
};
function createBaseSensorPacket() {
  return { left: 0, front: 0, right: 0 };
}
var SensorPacket = {
  encode(message, writer = import_minimal.Writer.create()) {
    if (message.left !== 0) {
      writer.uint32(13).float(message.left);
    }
    if (message.front !== 0) {
      writer.uint32(21).float(message.front);
    }
    if (message.right !== 0) {
      writer.uint32(29).float(message.right);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal.Reader ? input : new import_minimal.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseSensorPacket();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.left = reader.float();
          break;
        case 2:
          message.front = reader.float();
          break;
        case 3:
          message.right = reader.float();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      left: isSet(object.left) ? Number(object.left) : 0,
      front: isSet(object.front) ? Number(object.front) : 0,
      right: isSet(object.right) ? Number(object.right) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.left !== void 0 && (obj.left = message.left);
    message.front !== void 0 && (obj.front = message.front);
    message.right !== void 0 && (obj.right = message.right);
    return obj;
  },
  fromPartial(object) {
    const message = createBaseSensorPacket();
    message.left = object.left ?? 0;
    message.front = object.front ?? 0;
    message.right = object.right ?? 0;
    return message;
  }
};
function createBaseNavigationPacket() {
  return {
    sensors: void 0,
    position: void 0,
    leftMotorSpeed: 0,
    rightMotorSpeed: 0,
    leftEncoderTotal: 0,
    rightEncoderTotal: 0,
    voltage: 0,
    batPercentage: 0,
    timestamp: 0
  };
}
var NavigationPacket = {
  encode(message, writer = import_minimal.Writer.create()) {
    if (message.sensors !== void 0) {
      SensorPacket.encode(message.sensors, writer.uint32(10).fork()).ldelim();
    }
    if (message.position !== void 0) {
      Position.encode(message.position, writer.uint32(18).fork()).ldelim();
    }
    if (message.leftMotorSpeed !== 0) {
      writer.uint32(29).float(message.leftMotorSpeed);
    }
    if (message.rightMotorSpeed !== 0) {
      writer.uint32(37).float(message.rightMotorSpeed);
    }
    if (message.leftEncoderTotal !== 0) {
      writer.uint32(40).int32(message.leftEncoderTotal);
    }
    if (message.rightEncoderTotal !== 0) {
      writer.uint32(48).int32(message.rightEncoderTotal);
    }
    if (message.voltage !== 0) {
      writer.uint32(61).float(message.voltage);
    }
    if (message.batPercentage !== 0) {
      writer.uint32(69).float(message.batPercentage);
    }
    if (message.timestamp !== 0) {
      writer.uint32(72).uint32(message.timestamp);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal.Reader ? input : new import_minimal.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseNavigationPacket();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sensors = SensorPacket.decode(reader, reader.uint32());
          break;
        case 2:
          message.position = Position.decode(reader, reader.uint32());
          break;
        case 3:
          message.leftMotorSpeed = reader.float();
          break;
        case 4:
          message.rightMotorSpeed = reader.float();
          break;
        case 5:
          message.leftEncoderTotal = reader.int32();
          break;
        case 6:
          message.rightEncoderTotal = reader.int32();
          break;
        case 7:
          message.voltage = reader.float();
          break;
        case 8:
          message.batPercentage = reader.float();
          break;
        case 9:
          message.timestamp = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      sensors: isSet(object.sensors) ? SensorPacket.fromJSON(object.sensors) : void 0,
      position: isSet(object.position) ? Position.fromJSON(object.position) : void 0,
      leftMotorSpeed: isSet(object.leftMotorSpeed) ? Number(object.leftMotorSpeed) : 0,
      rightMotorSpeed: isSet(object.rightMotorSpeed) ? Number(object.rightMotorSpeed) : 0,
      leftEncoderTotal: isSet(object.leftEncoderTotal) ? Number(object.leftEncoderTotal) : 0,
      rightEncoderTotal: isSet(object.rightEncoderTotal) ? Number(object.rightEncoderTotal) : 0,
      voltage: isSet(object.voltage) ? Number(object.voltage) : 0,
      batPercentage: isSet(object.batPercentage) ? Number(object.batPercentage) : 0,
      timestamp: isSet(object.timestamp) ? Number(object.timestamp) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.sensors !== void 0 && (obj.sensors = message.sensors ? SensorPacket.toJSON(message.sensors) : void 0);
    message.position !== void 0 && (obj.position = message.position ? Position.toJSON(message.position) : void 0);
    message.leftMotorSpeed !== void 0 && (obj.leftMotorSpeed = message.leftMotorSpeed);
    message.rightMotorSpeed !== void 0 && (obj.rightMotorSpeed = message.rightMotorSpeed);
    message.leftEncoderTotal !== void 0 && (obj.leftEncoderTotal = Math.round(message.leftEncoderTotal));
    message.rightEncoderTotal !== void 0 && (obj.rightEncoderTotal = Math.round(message.rightEncoderTotal));
    message.voltage !== void 0 && (obj.voltage = message.voltage);
    message.batPercentage !== void 0 && (obj.batPercentage = message.batPercentage);
    message.timestamp !== void 0 && (obj.timestamp = Math.round(message.timestamp));
    return obj;
  },
  fromPartial(object) {
    const message = createBaseNavigationPacket();
    message.sensors = object.sensors !== void 0 && object.sensors !== null ? SensorPacket.fromPartial(object.sensors) : void 0;
    message.position = object.position !== void 0 && object.position !== null ? Position.fromPartial(object.position) : void 0;
    message.leftMotorSpeed = object.leftMotorSpeed ?? 0;
    message.rightMotorSpeed = object.rightMotorSpeed ?? 0;
    message.leftEncoderTotal = object.leftEncoderTotal ?? 0;
    message.rightEncoderTotal = object.rightEncoderTotal ?? 0;
    message.voltage = object.voltage ?? 0;
    message.batPercentage = object.batPercentage ?? 0;
    message.timestamp = object.timestamp ?? 0;
    return message;
  }
};
function createBaseMausOutgoingMessage() {
  return { ack: void 0, nav: void 0 };
}
var MausOutgoingMessage = {
  encode(message, writer = import_minimal.Writer.create()) {
    if (message.ack !== void 0) {
      AckPacket.encode(message.ack, writer.uint32(10).fork()).ldelim();
    }
    if (message.nav !== void 0) {
      NavigationPacket.encode(message.nav, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal.Reader ? input : new import_minimal.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseMausOutgoingMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ack = AckPacket.decode(reader, reader.uint32());
          break;
        case 2:
          message.nav = NavigationPacket.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      ack: isSet(object.ack) ? AckPacket.fromJSON(object.ack) : void 0,
      nav: isSet(object.nav) ? NavigationPacket.fromJSON(object.nav) : void 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.ack !== void 0 && (obj.ack = message.ack ? AckPacket.toJSON(message.ack) : void 0);
    message.nav !== void 0 && (obj.nav = message.nav ? NavigationPacket.toJSON(message.nav) : void 0);
    return obj;
  },
  fromPartial(object) {
    const message = createBaseMausOutgoingMessage();
    message.ack = object.ack !== void 0 && object.ack !== null ? AckPacket.fromPartial(object.ack) : void 0;
    message.nav = object.nav !== void 0 && object.nav !== null ? NavigationPacket.fromPartial(object.nav) : void 0;
    return message;
  }
};
function createBaseMsgInit() {
  return { version: 0 };
}
var MsgInit = {
  encode(message, writer = import_minimal.Writer.create()) {
    if (message.version !== 0) {
      writer.uint32(8).int32(message.version);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal.Reader ? input : new import_minimal.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseMsgInit();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.version = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      version: isSet(object.version) ? Number(object.version) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.version !== void 0 && (obj.version = Math.round(message.version));
    return obj;
  },
  fromPartial(object) {
    const message = createBaseMsgInit();
    message.version = object.version ?? 0;
    return message;
  }
};
function createBaseMsgControl() {
  return { direction: 0, speed: 0 };
}
var MsgControl = {
  encode(message, writer = import_minimal.Writer.create()) {
    if (message.direction !== 0) {
      writer.uint32(13).float(message.direction);
    }
    if (message.speed !== 0) {
      writer.uint32(16).int32(message.speed);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal.Reader ? input : new import_minimal.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseMsgControl();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.direction = reader.float();
          break;
        case 2:
          message.speed = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      direction: isSet(object.direction) ? Number(object.direction) : 0,
      speed: isSet(object.speed) ? Number(object.speed) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.direction !== void 0 && (obj.direction = message.direction);
    message.speed !== void 0 && (obj.speed = Math.round(message.speed));
    return obj;
  },
  fromPartial(object) {
    const message = createBaseMsgControl();
    message.direction = object.direction ?? 0;
    message.speed = object.speed ?? 0;
    return message;
  }
};
function createBaseMsgEncoderCallibration() {
  return { kP: 0, kI: 0, kD: 0 };
}
var MsgEncoderCallibration = {
  encode(message, writer = import_minimal.Writer.create()) {
    if (message.kP !== 0) {
      writer.uint32(13).float(message.kP);
    }
    if (message.kI !== 0) {
      writer.uint32(21).float(message.kI);
    }
    if (message.kD !== 0) {
      writer.uint32(29).float(message.kD);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal.Reader ? input : new import_minimal.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseMsgEncoderCallibration();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.kP = reader.float();
          break;
        case 2:
          message.kI = reader.float();
          break;
        case 3:
          message.kD = reader.float();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      kP: isSet(object.kP) ? Number(object.kP) : 0,
      kI: isSet(object.kI) ? Number(object.kI) : 0,
      kD: isSet(object.kD) ? Number(object.kD) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.kP !== void 0 && (obj.kP = message.kP);
    message.kI !== void 0 && (obj.kI = message.kI);
    message.kD !== void 0 && (obj.kD = message.kD);
    return obj;
  },
  fromPartial(object) {
    const message = createBaseMsgEncoderCallibration();
    message.kP = object.kP ?? 0;
    message.kI = object.kI ?? 0;
    message.kD = object.kD ?? 0;
    return message;
  }
};
function createBaseMausIncomingMessage() {
  return {
    init: void 0,
    control: void 0,
    encoderCallibration: void 0
  };
}
var MausIncomingMessage = {
  encode(message, writer = import_minimal.Writer.create()) {
    if (message.init !== void 0) {
      MsgInit.encode(message.init, writer.uint32(18).fork()).ldelim();
    }
    if (message.control !== void 0) {
      MsgControl.encode(message.control, writer.uint32(26).fork()).ldelim();
    }
    if (message.encoderCallibration !== void 0) {
      MsgEncoderCallibration.encode(message.encoderCallibration, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof import_minimal.Reader ? input : new import_minimal.Reader(input);
    let end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseMausIncomingMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.init = MsgInit.decode(reader, reader.uint32());
          break;
        case 3:
          message.control = MsgControl.decode(reader, reader.uint32());
          break;
        case 4:
          message.encoderCallibration = MsgEncoderCallibration.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object) {
    return {
      init: isSet(object.init) ? MsgInit.fromJSON(object.init) : void 0,
      control: isSet(object.control) ? MsgControl.fromJSON(object.control) : void 0,
      encoderCallibration: isSet(object.encoderCallibration) ? MsgEncoderCallibration.fromJSON(object.encoderCallibration) : void 0
    };
  },
  toJSON(message) {
    const obj = {};
    message.init !== void 0 && (obj.init = message.init ? MsgInit.toJSON(message.init) : void 0);
    message.control !== void 0 && (obj.control = message.control ? MsgControl.toJSON(message.control) : void 0);
    message.encoderCallibration !== void 0 && (obj.encoderCallibration = message.encoderCallibration ? MsgEncoderCallibration.toJSON(message.encoderCallibration) : void 0);
    return obj;
  },
  fromPartial(object) {
    const message = createBaseMausIncomingMessage();
    message.init = object.init !== void 0 && object.init !== null ? MsgInit.fromPartial(object.init) : void 0;
    message.control = object.control !== void 0 && object.control !== null ? MsgControl.fromPartial(object.control) : void 0;
    message.encoderCallibration = object.encoderCallibration !== void 0 && object.encoderCallibration !== null ? MsgEncoderCallibration.fromPartial(object.encoderCallibration) : void 0;
    return message;
  }
};
if (import_minimal.util.Long !== long_exports) {
  import_minimal.util.Long = long_exports;
  (0, import_minimal.configure)();
}
function isSet(value) {
  return value !== null && value !== void 0;
}

// src/Communicator.ts
var Communicator = class extends EventTarget {
  constructor(options) {
    super();
    this.setupSocket(options);
  }
  send(message) {
    const msg = MausIncomingMessage.encode(message).finish();
    console.log(message, msg);
    this.socket?.send(msg);
  }
  setupSocket(options) {
    this.socket = new WebSocket(options.url);
    this.socket.onopen = () => {
      this.socket.binaryType = "arraybuffer";
    };
    this.socket.onclose = () => {
      console.log("Closed");
    };
    this.socket.onmessage = (event) => {
      if (event.data instanceof ArrayBuffer) {
        const message = MausOutgoingMessage.decode(new Uint8Array(event.data));
        this.dispatchEvent(new MessageEvent("message", { data: message }));
      } else {
      }
    };
  }
};

// src/sensorTable.svelte
function create_default_slot(ctx) {
  let span1;
  let span0;
  let t0;
  let t1_value = ctx[3].timestamp + "";
  let t1;
  let t2;
  let t3;
  let t4_value = ctx[1](ctx[3]) + "";
  let t4;
  return {
    c() {
      span1 = element("span");
      span0 = element("span");
      t0 = text("[");
      t1 = text(t1_value);
      t2 = text("]");
      t3 = space();
      t4 = text(t4_value);
      attr(span0, "class", "light svelte-jiql1j");
      attr(span1, "class", "entry svelte-jiql1j");
    },
    m(target, anchor) {
      insert(target, span1, anchor);
      append(span1, span0);
      append(span0, t0);
      append(span0, t1);
      append(span0, t2);
      append(span1, t3);
      append(span1, t4);
    },
    p(ctx2, dirty) {
      if (dirty & 8 && t1_value !== (t1_value = ctx2[3].timestamp + ""))
        set_data(t1, t1_value);
      if (dirty & 8 && t4_value !== (t4_value = ctx2[1](ctx2[3]) + ""))
        set_data(t4, t4_value);
    },
    d(detaching) {
      if (detaching)
        detach(span1);
    }
  };
}
function create_fragment2(ctx) {
  let div;
  let virtuallist;
  let current;
  virtuallist = new VirtualList_default({
    props: {
      items: ctx[0],
      $$slots: {
        default: [
          create_default_slot,
          ({ item }) => ({ 3: item }),
          ({ item }) => item ? 8 : 0
        ]
      },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      div = element("div");
      create_component(virtuallist.$$.fragment);
      attr(div, "class", "logs svelte-jiql1j");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      mount_component(virtuallist, div, null);
      current = true;
    },
    p(ctx2, [dirty]) {
      const virtuallist_changes = {};
      if (dirty & 1)
        virtuallist_changes.items = ctx2[0];
      if (dirty & 24) {
        virtuallist_changes.$$scope = { dirty, ctx: ctx2 };
      }
      virtuallist.$set(virtuallist_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(virtuallist.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(virtuallist.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      destroy_component(virtuallist);
    }
  };
}
function instance2($$self, $$props, $$invalidate) {
  let { com } = $$props;
  let data = [];
  com.addEventListener("message", (evt) => {
    if (evt.data.nav) {
      $$invalidate(0, data = [evt.data.nav, ...data]);
    }
  });
  const formatInfo = (item) => `pos=(${item.position.x},${item.position.y}) speed=(${item.leftMotorSpeed.toFixed(3)},${item.rightMotorSpeed.toFixed(3)}) dir=(${item.position.heading.toFixed(3)}) encTotal=(${item.leftEncoderTotal},${item.rightEncoderTotal})
  `;
  $$self.$$set = ($$props2) => {
    if ("com" in $$props2)
      $$invalidate(2, com = $$props2.com);
  };
  return [data, formatInfo, com];
}
var SensorTable = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance2, create_fragment2, safe_not_equal, { com: 2 });
  }
};
var sensorTable_default = SensorTable;

// node_modules/d3-array/src/ascending.js
function ascending(a, b) {
  return a == null || b == null ? NaN : a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

// node_modules/d3-array/src/bisector.js
function bisector(f) {
  let delta = f;
  let compare1 = f;
  let compare2 = f;
  if (f.length !== 2) {
    delta = (d, x2) => f(d) - x2;
    compare1 = ascending;
    compare2 = (d, x2) => ascending(f(d), x2);
  }
  function left(a, x2, lo = 0, hi = a.length) {
    if (lo < hi) {
      if (compare1(x2, x2) !== 0)
        return hi;
      do {
        const mid = lo + hi >>> 1;
        if (compare2(a[mid], x2) < 0)
          lo = mid + 1;
        else
          hi = mid;
      } while (lo < hi);
    }
    return lo;
  }
  function right(a, x2, lo = 0, hi = a.length) {
    if (lo < hi) {
      if (compare1(x2, x2) !== 0)
        return hi;
      do {
        const mid = lo + hi >>> 1;
        if (compare2(a[mid], x2) <= 0)
          lo = mid + 1;
        else
          hi = mid;
      } while (lo < hi);
    }
    return lo;
  }
  function center(a, x2, lo = 0, hi = a.length) {
    const i = left(a, x2, lo, hi - 1);
    return i > lo && delta(a[i - 1], x2) > -delta(a[i], x2) ? i - 1 : i;
  }
  return { left, center, right };
}

// node_modules/d3-array/src/number.js
function number(x2) {
  return x2 === null ? NaN : +x2;
}

// node_modules/d3-array/src/bisect.js
var ascendingBisect = bisector(ascending);
var bisectRight = ascendingBisect.right;
var bisectLeft = ascendingBisect.left;
var bisectCenter = bisector(number).center;
var bisect_default = bisectRight;

// node_modules/d3-array/src/extent.js
function extent(values, valueof) {
  let min2;
  let max2;
  if (valueof === void 0) {
    for (const value of values) {
      if (value != null) {
        if (min2 === void 0) {
          if (value >= value)
            min2 = max2 = value;
        } else {
          if (min2 > value)
            min2 = value;
          if (max2 < value)
            max2 = value;
        }
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      if ((value = valueof(value, ++index, values)) != null) {
        if (min2 === void 0) {
          if (value >= value)
            min2 = max2 = value;
        } else {
          if (min2 > value)
            min2 = value;
          if (max2 < value)
            max2 = value;
        }
      }
    }
  }
  return [min2, max2];
}

// node_modules/d3-array/src/ticks.js
var e10 = Math.sqrt(50);
var e5 = Math.sqrt(10);
var e2 = Math.sqrt(2);
function ticks(start2, stop, count) {
  var reverse, i = -1, n, ticks2, step;
  stop = +stop, start2 = +start2, count = +count;
  if (start2 === stop && count > 0)
    return [start2];
  if (reverse = stop < start2)
    n = start2, start2 = stop, stop = n;
  if ((step = tickIncrement(start2, stop, count)) === 0 || !isFinite(step))
    return [];
  if (step > 0) {
    let r0 = Math.round(start2 / step), r1 = Math.round(stop / step);
    if (r0 * step < start2)
      ++r0;
    if (r1 * step > stop)
      --r1;
    ticks2 = new Array(n = r1 - r0 + 1);
    while (++i < n)
      ticks2[i] = (r0 + i) * step;
  } else {
    step = -step;
    let r0 = Math.round(start2 * step), r1 = Math.round(stop * step);
    if (r0 / step < start2)
      ++r0;
    if (r1 / step > stop)
      --r1;
    ticks2 = new Array(n = r1 - r0 + 1);
    while (++i < n)
      ticks2[i] = (r0 + i) / step;
  }
  if (reverse)
    ticks2.reverse();
  return ticks2;
}
function tickIncrement(start2, stop, count) {
  var step = (stop - start2) / Math.max(0, count), power = Math.floor(Math.log(step) / Math.LN10), error = step / Math.pow(10, power);
  return power >= 0 ? (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1) * Math.pow(10, power) : -Math.pow(10, -power) / (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1);
}
function tickStep(start2, stop, count) {
  var step0 = Math.abs(stop - start2) / Math.max(0, count), step1 = Math.pow(10, Math.floor(Math.log(step0) / Math.LN10)), error = step0 / step1;
  if (error >= e10)
    step1 *= 10;
  else if (error >= e5)
    step1 *= 5;
  else if (error >= e2)
    step1 *= 2;
  return stop < start2 ? -step1 : step1;
}

// node_modules/d3-array/src/nice.js
function nice(start2, stop, count) {
  let prestep;
  while (true) {
    const step = tickIncrement(start2, stop, count);
    if (step === prestep || step === 0 || !isFinite(step)) {
      return [start2, stop];
    } else if (step > 0) {
      start2 = Math.floor(start2 / step) * step;
      stop = Math.ceil(stop / step) * step;
    } else if (step < 0) {
      start2 = Math.ceil(start2 * step) / step;
      stop = Math.floor(stop * step) / step;
    }
    prestep = step;
  }
}

// node_modules/d3-array/src/range.js
function range(start2, stop, step) {
  start2 = +start2, stop = +stop, step = (n = arguments.length) < 2 ? (stop = start2, start2 = 0, 1) : n < 3 ? 1 : +step;
  var i = -1, n = Math.max(0, Math.ceil((stop - start2) / step)) | 0, range2 = new Array(n);
  while (++i < n) {
    range2[i] = start2 + i * step;
  }
  return range2;
}

// node_modules/d3-array/src/map.js
function map(values, mapper) {
  if (typeof values[Symbol.iterator] !== "function")
    throw new TypeError("values is not iterable");
  if (typeof mapper !== "function")
    throw new TypeError("mapper is not a function");
  return Array.from(values, (value, index) => mapper(value, index, values));
}

// node_modules/d3-dispatch/src/dispatch.js
var noop2 = { value: () => {
} };
function dispatch() {
  for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
    if (!(t = arguments[i] + "") || t in _ || /[\s.]/.test(t))
      throw new Error("illegal type: " + t);
    _[t] = [];
  }
  return new Dispatch(_);
}
function Dispatch(_) {
  this._ = _;
}
function parseTypenames(typenames, types) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0)
      name = t.slice(i + 1), t = t.slice(0, i);
    if (t && !types.hasOwnProperty(t))
      throw new Error("unknown type: " + t);
    return { type: t, name };
  });
}
Dispatch.prototype = dispatch.prototype = {
  constructor: Dispatch,
  on: function(typename, callback) {
    var _ = this._, T = parseTypenames(typename + "", _), t, i = -1, n = T.length;
    if (arguments.length < 2) {
      while (++i < n)
        if ((t = (typename = T[i]).type) && (t = get(_[t], typename.name)))
          return t;
      return;
    }
    if (callback != null && typeof callback !== "function")
      throw new Error("invalid callback: " + callback);
    while (++i < n) {
      if (t = (typename = T[i]).type)
        _[t] = set(_[t], typename.name, callback);
      else if (callback == null)
        for (t in _)
          _[t] = set(_[t], typename.name, null);
    }
    return this;
  },
  copy: function() {
    var copy2 = {}, _ = this._;
    for (var t in _)
      copy2[t] = _[t].slice();
    return new Dispatch(copy2);
  },
  call: function(type2, that) {
    if ((n = arguments.length - 2) > 0)
      for (var args = new Array(n), i = 0, n, t; i < n; ++i)
        args[i] = arguments[i + 2];
    if (!this._.hasOwnProperty(type2))
      throw new Error("unknown type: " + type2);
    for (t = this._[type2], i = 0, n = t.length; i < n; ++i)
      t[i].value.apply(that, args);
  },
  apply: function(type2, that, args) {
    if (!this._.hasOwnProperty(type2))
      throw new Error("unknown type: " + type2);
    for (var t = this._[type2], i = 0, n = t.length; i < n; ++i)
      t[i].value.apply(that, args);
  }
};
function get(type2, name) {
  for (var i = 0, n = type2.length, c; i < n; ++i) {
    if ((c = type2[i]).name === name) {
      return c.value;
    }
  }
}
function set(type2, name, callback) {
  for (var i = 0, n = type2.length; i < n; ++i) {
    if (type2[i].name === name) {
      type2[i] = noop2, type2 = type2.slice(0, i).concat(type2.slice(i + 1));
      break;
    }
  }
  if (callback != null)
    type2.push({ name, value: callback });
  return type2;
}
var dispatch_default = dispatch;

// node_modules/d3-selection/src/namespaces.js
var xhtml = "http://www.w3.org/1999/xhtml";
var namespaces_default = {
  svg: "http://www.w3.org/2000/svg",
  xhtml,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};

// node_modules/d3-selection/src/namespace.js
function namespace_default(name) {
  var prefix = name += "", i = prefix.indexOf(":");
  if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns")
    name = name.slice(i + 1);
  return namespaces_default.hasOwnProperty(prefix) ? { space: namespaces_default[prefix], local: name } : name;
}

// node_modules/d3-selection/src/creator.js
function creatorInherit(name) {
  return function() {
    var document2 = this.ownerDocument, uri = this.namespaceURI;
    return uri === xhtml && document2.documentElement.namespaceURI === xhtml ? document2.createElement(name) : document2.createElementNS(uri, name);
  };
}
function creatorFixed(fullname) {
  return function() {
    return this.ownerDocument.createElementNS(fullname.space, fullname.local);
  };
}
function creator_default(name) {
  var fullname = namespace_default(name);
  return (fullname.local ? creatorFixed : creatorInherit)(fullname);
}

// node_modules/d3-selection/src/selector.js
function none() {
}
function selector_default(selector) {
  return selector == null ? none : function() {
    return this.querySelector(selector);
  };
}

// node_modules/d3-selection/src/selection/select.js
function select_default(select) {
  if (typeof select !== "function")
    select = selector_default(select);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node)
          subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
      }
    }
  }
  return new Selection(subgroups, this._parents);
}

// node_modules/d3-selection/src/array.js
function array(x2) {
  return x2 == null ? [] : Array.isArray(x2) ? x2 : Array.from(x2);
}

// node_modules/d3-selection/src/selectorAll.js
function empty() {
  return [];
}
function selectorAll_default(selector) {
  return selector == null ? empty : function() {
    return this.querySelectorAll(selector);
  };
}

// node_modules/d3-selection/src/selection/selectAll.js
function arrayAll(select) {
  return function() {
    return array(select.apply(this, arguments));
  };
}
function selectAll_default(select) {
  if (typeof select === "function")
    select = arrayAll(select);
  else
    select = selectorAll_default(select);
  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        subgroups.push(select.call(node, node.__data__, i, group));
        parents.push(node);
      }
    }
  }
  return new Selection(subgroups, parents);
}

// node_modules/d3-selection/src/matcher.js
function matcher_default(selector) {
  return function() {
    return this.matches(selector);
  };
}
function childMatcher(selector) {
  return function(node) {
    return node.matches(selector);
  };
}

// node_modules/d3-selection/src/selection/selectChild.js
var find = Array.prototype.find;
function childFind(match) {
  return function() {
    return find.call(this.children, match);
  };
}
function childFirst() {
  return this.firstElementChild;
}
function selectChild_default(match) {
  return this.select(match == null ? childFirst : childFind(typeof match === "function" ? match : childMatcher(match)));
}

// node_modules/d3-selection/src/selection/selectChildren.js
var filter = Array.prototype.filter;
function children2() {
  return Array.from(this.children);
}
function childrenFilter(match) {
  return function() {
    return filter.call(this.children, match);
  };
}
function selectChildren_default(match) {
  return this.selectAll(match == null ? children2 : childrenFilter(typeof match === "function" ? match : childMatcher(match)));
}

// node_modules/d3-selection/src/selection/filter.js
function filter_default(match) {
  if (typeof match !== "function")
    match = matcher_default(match);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }
  return new Selection(subgroups, this._parents);
}

// node_modules/d3-selection/src/selection/sparse.js
function sparse_default(update2) {
  return new Array(update2.length);
}

// node_modules/d3-selection/src/selection/enter.js
function enter_default() {
  return new Selection(this._enter || this._groups.map(sparse_default), this._parents);
}
function EnterNode(parent, datum2) {
  this.ownerDocument = parent.ownerDocument;
  this.namespaceURI = parent.namespaceURI;
  this._next = null;
  this._parent = parent;
  this.__data__ = datum2;
}
EnterNode.prototype = {
  constructor: EnterNode,
  appendChild: function(child) {
    return this._parent.insertBefore(child, this._next);
  },
  insertBefore: function(child, next) {
    return this._parent.insertBefore(child, next);
  },
  querySelector: function(selector) {
    return this._parent.querySelector(selector);
  },
  querySelectorAll: function(selector) {
    return this._parent.querySelectorAll(selector);
  }
};

// node_modules/d3-selection/src/constant.js
function constant_default(x2) {
  return function() {
    return x2;
  };
}

// node_modules/d3-selection/src/selection/data.js
function bindIndex(parent, group, enter, update2, exit, data) {
  var i = 0, node, groupLength = group.length, dataLength = data.length;
  for (; i < dataLength; ++i) {
    if (node = group[i]) {
      node.__data__ = data[i];
      update2[i] = node;
    } else {
      enter[i] = new EnterNode(parent, data[i]);
    }
  }
  for (; i < groupLength; ++i) {
    if (node = group[i]) {
      exit[i] = node;
    }
  }
}
function bindKey(parent, group, enter, update2, exit, data, key) {
  var i, node, nodeByKeyValue = /* @__PURE__ */ new Map(), groupLength = group.length, dataLength = data.length, keyValues = new Array(groupLength), keyValue;
  for (i = 0; i < groupLength; ++i) {
    if (node = group[i]) {
      keyValues[i] = keyValue = key.call(node, node.__data__, i, group) + "";
      if (nodeByKeyValue.has(keyValue)) {
        exit[i] = node;
      } else {
        nodeByKeyValue.set(keyValue, node);
      }
    }
  }
  for (i = 0; i < dataLength; ++i) {
    keyValue = key.call(parent, data[i], i, data) + "";
    if (node = nodeByKeyValue.get(keyValue)) {
      update2[i] = node;
      node.__data__ = data[i];
      nodeByKeyValue.delete(keyValue);
    } else {
      enter[i] = new EnterNode(parent, data[i]);
    }
  }
  for (i = 0; i < groupLength; ++i) {
    if ((node = group[i]) && nodeByKeyValue.get(keyValues[i]) === node) {
      exit[i] = node;
    }
  }
}
function datum(node) {
  return node.__data__;
}
function data_default(value, key) {
  if (!arguments.length)
    return Array.from(this, datum);
  var bind = key ? bindKey : bindIndex, parents = this._parents, groups = this._groups;
  if (typeof value !== "function")
    value = constant_default(value);
  for (var m = groups.length, update2 = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
    var parent = parents[j], group = groups[j], groupLength = group.length, data = arraylike(value.call(parent, parent && parent.__data__, j, parents)), dataLength = data.length, enterGroup = enter[j] = new Array(dataLength), updateGroup = update2[j] = new Array(dataLength), exitGroup = exit[j] = new Array(groupLength);
    bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);
    for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
      if (previous = enterGroup[i0]) {
        if (i0 >= i1)
          i1 = i0 + 1;
        while (!(next = updateGroup[i1]) && ++i1 < dataLength)
          ;
        previous._next = next || null;
      }
    }
  }
  update2 = new Selection(update2, parents);
  update2._enter = enter;
  update2._exit = exit;
  return update2;
}
function arraylike(data) {
  return typeof data === "object" && "length" in data ? data : Array.from(data);
}

// node_modules/d3-selection/src/selection/exit.js
function exit_default() {
  return new Selection(this._exit || this._groups.map(sparse_default), this._parents);
}

// node_modules/d3-selection/src/selection/join.js
function join_default(onenter, onupdate, onexit) {
  var enter = this.enter(), update2 = this, exit = this.exit();
  if (typeof onenter === "function") {
    enter = onenter(enter);
    if (enter)
      enter = enter.selection();
  } else {
    enter = enter.append(onenter + "");
  }
  if (onupdate != null) {
    update2 = onupdate(update2);
    if (update2)
      update2 = update2.selection();
  }
  if (onexit == null)
    exit.remove();
  else
    onexit(exit);
  return enter && update2 ? enter.merge(update2).order() : update2;
}

// node_modules/d3-selection/src/selection/merge.js
function merge_default(context) {
  var selection2 = context.selection ? context.selection() : context;
  for (var groups0 = this._groups, groups1 = selection2._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }
  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }
  return new Selection(merges, this._parents);
}

// node_modules/d3-selection/src/selection/order.js
function order_default() {
  for (var groups = this._groups, j = -1, m = groups.length; ++j < m; ) {
    for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0; ) {
      if (node = group[i]) {
        if (next && node.compareDocumentPosition(next) ^ 4)
          next.parentNode.insertBefore(node, next);
        next = node;
      }
    }
  }
  return this;
}

// node_modules/d3-selection/src/selection/sort.js
function sort_default(compare2) {
  if (!compare2)
    compare2 = ascending2;
  function compareNode(a, b) {
    return a && b ? compare2(a.__data__, b.__data__) : !a - !b;
  }
  for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        sortgroup[i] = node;
      }
    }
    sortgroup.sort(compareNode);
  }
  return new Selection(sortgroups, this._parents).order();
}
function ascending2(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

// node_modules/d3-selection/src/selection/call.js
function call_default() {
  var callback = arguments[0];
  arguments[0] = this;
  callback.apply(null, arguments);
  return this;
}

// node_modules/d3-selection/src/selection/nodes.js
function nodes_default() {
  return Array.from(this);
}

// node_modules/d3-selection/src/selection/node.js
function node_default() {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
      var node = group[i];
      if (node)
        return node;
    }
  }
  return null;
}

// node_modules/d3-selection/src/selection/size.js
function size_default() {
  let size = 0;
  for (const node of this)
    ++size;
  return size;
}

// node_modules/d3-selection/src/selection/empty.js
function empty_default() {
  return !this.node();
}

// node_modules/d3-selection/src/selection/each.js
function each_default(callback) {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i])
        callback.call(node, node.__data__, i, group);
    }
  }
  return this;
}

// node_modules/d3-selection/src/selection/attr.js
function attrRemove(name) {
  return function() {
    this.removeAttribute(name);
  };
}
function attrRemoveNS(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}
function attrConstant(name, value) {
  return function() {
    this.setAttribute(name, value);
  };
}
function attrConstantNS(fullname, value) {
  return function() {
    this.setAttributeNS(fullname.space, fullname.local, value);
  };
}
function attrFunction(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null)
      this.removeAttribute(name);
    else
      this.setAttribute(name, v);
  };
}
function attrFunctionNS(fullname, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null)
      this.removeAttributeNS(fullname.space, fullname.local);
    else
      this.setAttributeNS(fullname.space, fullname.local, v);
  };
}
function attr_default(name, value) {
  var fullname = namespace_default(name);
  if (arguments.length < 2) {
    var node = this.node();
    return fullname.local ? node.getAttributeNS(fullname.space, fullname.local) : node.getAttribute(fullname);
  }
  return this.each((value == null ? fullname.local ? attrRemoveNS : attrRemove : typeof value === "function" ? fullname.local ? attrFunctionNS : attrFunction : fullname.local ? attrConstantNS : attrConstant)(fullname, value));
}

// node_modules/d3-selection/src/window.js
function window_default(node) {
  return node.ownerDocument && node.ownerDocument.defaultView || node.document && node || node.defaultView;
}

// node_modules/d3-selection/src/selection/style.js
function styleRemove(name) {
  return function() {
    this.style.removeProperty(name);
  };
}
function styleConstant(name, value, priority) {
  return function() {
    this.style.setProperty(name, value, priority);
  };
}
function styleFunction(name, value, priority) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null)
      this.style.removeProperty(name);
    else
      this.style.setProperty(name, v, priority);
  };
}
function style_default(name, value, priority) {
  return arguments.length > 1 ? this.each((value == null ? styleRemove : typeof value === "function" ? styleFunction : styleConstant)(name, value, priority == null ? "" : priority)) : styleValue(this.node(), name);
}
function styleValue(node, name) {
  return node.style.getPropertyValue(name) || window_default(node).getComputedStyle(node, null).getPropertyValue(name);
}

// node_modules/d3-selection/src/selection/property.js
function propertyRemove(name) {
  return function() {
    delete this[name];
  };
}
function propertyConstant(name, value) {
  return function() {
    this[name] = value;
  };
}
function propertyFunction(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null)
      delete this[name];
    else
      this[name] = v;
  };
}
function property_default(name, value) {
  return arguments.length > 1 ? this.each((value == null ? propertyRemove : typeof value === "function" ? propertyFunction : propertyConstant)(name, value)) : this.node()[name];
}

// node_modules/d3-selection/src/selection/classed.js
function classArray(string) {
  return string.trim().split(/^|\s+/);
}
function classList(node) {
  return node.classList || new ClassList(node);
}
function ClassList(node) {
  this._node = node;
  this._names = classArray(node.getAttribute("class") || "");
}
ClassList.prototype = {
  add: function(name) {
    var i = this._names.indexOf(name);
    if (i < 0) {
      this._names.push(name);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  remove: function(name) {
    var i = this._names.indexOf(name);
    if (i >= 0) {
      this._names.splice(i, 1);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  contains: function(name) {
    return this._names.indexOf(name) >= 0;
  }
};
function classedAdd(node, names) {
  var list = classList(node), i = -1, n = names.length;
  while (++i < n)
    list.add(names[i]);
}
function classedRemove(node, names) {
  var list = classList(node), i = -1, n = names.length;
  while (++i < n)
    list.remove(names[i]);
}
function classedTrue(names) {
  return function() {
    classedAdd(this, names);
  };
}
function classedFalse(names) {
  return function() {
    classedRemove(this, names);
  };
}
function classedFunction(names, value) {
  return function() {
    (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
  };
}
function classed_default(name, value) {
  var names = classArray(name + "");
  if (arguments.length < 2) {
    var list = classList(this.node()), i = -1, n = names.length;
    while (++i < n)
      if (!list.contains(names[i]))
        return false;
    return true;
  }
  return this.each((typeof value === "function" ? classedFunction : value ? classedTrue : classedFalse)(names, value));
}

// node_modules/d3-selection/src/selection/text.js
function textRemove() {
  this.textContent = "";
}
function textConstant(value) {
  return function() {
    this.textContent = value;
  };
}
function textFunction(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.textContent = v == null ? "" : v;
  };
}
function text_default(value) {
  return arguments.length ? this.each(value == null ? textRemove : (typeof value === "function" ? textFunction : textConstant)(value)) : this.node().textContent;
}

// node_modules/d3-selection/src/selection/html.js
function htmlRemove() {
  this.innerHTML = "";
}
function htmlConstant(value) {
  return function() {
    this.innerHTML = value;
  };
}
function htmlFunction(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.innerHTML = v == null ? "" : v;
  };
}
function html_default(value) {
  return arguments.length ? this.each(value == null ? htmlRemove : (typeof value === "function" ? htmlFunction : htmlConstant)(value)) : this.node().innerHTML;
}

// node_modules/d3-selection/src/selection/raise.js
function raise() {
  if (this.nextSibling)
    this.parentNode.appendChild(this);
}
function raise_default() {
  return this.each(raise);
}

// node_modules/d3-selection/src/selection/lower.js
function lower() {
  if (this.previousSibling)
    this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function lower_default() {
  return this.each(lower);
}

// node_modules/d3-selection/src/selection/append.js
function append_default(name) {
  var create2 = typeof name === "function" ? name : creator_default(name);
  return this.select(function() {
    return this.appendChild(create2.apply(this, arguments));
  });
}

// node_modules/d3-selection/src/selection/insert.js
function constantNull() {
  return null;
}
function insert_default(name, before) {
  var create2 = typeof name === "function" ? name : creator_default(name), select = before == null ? constantNull : typeof before === "function" ? before : selector_default(before);
  return this.select(function() {
    return this.insertBefore(create2.apply(this, arguments), select.apply(this, arguments) || null);
  });
}

// node_modules/d3-selection/src/selection/remove.js
function remove() {
  var parent = this.parentNode;
  if (parent)
    parent.removeChild(this);
}
function remove_default() {
  return this.each(remove);
}

// node_modules/d3-selection/src/selection/clone.js
function selection_cloneShallow() {
  var clone = this.cloneNode(false), parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}
function selection_cloneDeep() {
  var clone = this.cloneNode(true), parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}
function clone_default(deep) {
  return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
}

// node_modules/d3-selection/src/selection/datum.js
function datum_default(value) {
  return arguments.length ? this.property("__data__", value) : this.node().__data__;
}

// node_modules/d3-selection/src/selection/on.js
function contextListener(listener) {
  return function(event) {
    listener.call(this, event, this.__data__);
  };
}
function parseTypenames2(typenames) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0)
      name = t.slice(i + 1), t = t.slice(0, i);
    return { type: t, name };
  });
}
function onRemove(typename) {
  return function() {
    var on = this.__on;
    if (!on)
      return;
    for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
      if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.options);
      } else {
        on[++i] = o;
      }
    }
    if (++i)
      on.length = i;
    else
      delete this.__on;
  };
}
function onAdd(typename, value, options) {
  return function() {
    var on = this.__on, o, listener = contextListener(value);
    if (on)
      for (var j = 0, m = on.length; j < m; ++j) {
        if ((o = on[j]).type === typename.type && o.name === typename.name) {
          this.removeEventListener(o.type, o.listener, o.options);
          this.addEventListener(o.type, o.listener = listener, o.options = options);
          o.value = value;
          return;
        }
      }
    this.addEventListener(typename.type, listener, options);
    o = { type: typename.type, name: typename.name, value, listener, options };
    if (!on)
      this.__on = [o];
    else
      on.push(o);
  };
}
function on_default(typename, value, options) {
  var typenames = parseTypenames2(typename + ""), i, n = typenames.length, t;
  if (arguments.length < 2) {
    var on = this.node().__on;
    if (on)
      for (var j = 0, m = on.length, o; j < m; ++j) {
        for (i = 0, o = on[j]; i < n; ++i) {
          if ((t = typenames[i]).type === o.type && t.name === o.name) {
            return o.value;
          }
        }
      }
    return;
  }
  on = value ? onAdd : onRemove;
  for (i = 0; i < n; ++i)
    this.each(on(typenames[i], value, options));
  return this;
}

// node_modules/d3-selection/src/selection/dispatch.js
function dispatchEvent(node, type2, params) {
  var window2 = window_default(node), event = window2.CustomEvent;
  if (typeof event === "function") {
    event = new event(type2, params);
  } else {
    event = window2.document.createEvent("Event");
    if (params)
      event.initEvent(type2, params.bubbles, params.cancelable), event.detail = params.detail;
    else
      event.initEvent(type2, false, false);
  }
  node.dispatchEvent(event);
}
function dispatchConstant(type2, params) {
  return function() {
    return dispatchEvent(this, type2, params);
  };
}
function dispatchFunction(type2, params) {
  return function() {
    return dispatchEvent(this, type2, params.apply(this, arguments));
  };
}
function dispatch_default2(type2, params) {
  return this.each((typeof params === "function" ? dispatchFunction : dispatchConstant)(type2, params));
}

// node_modules/d3-selection/src/selection/iterator.js
function* iterator_default() {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i])
        yield node;
    }
  }
}

// node_modules/d3-selection/src/selection/index.js
var root = [null];
function Selection(groups, parents) {
  this._groups = groups;
  this._parents = parents;
}
function selection() {
  return new Selection([[document.documentElement]], root);
}
function selection_selection() {
  return this;
}
Selection.prototype = selection.prototype = {
  constructor: Selection,
  select: select_default,
  selectAll: selectAll_default,
  selectChild: selectChild_default,
  selectChildren: selectChildren_default,
  filter: filter_default,
  data: data_default,
  enter: enter_default,
  exit: exit_default,
  join: join_default,
  merge: merge_default,
  selection: selection_selection,
  order: order_default,
  sort: sort_default,
  call: call_default,
  nodes: nodes_default,
  node: node_default,
  size: size_default,
  empty: empty_default,
  each: each_default,
  attr: attr_default,
  style: style_default,
  property: property_default,
  classed: classed_default,
  text: text_default,
  html: html_default,
  raise: raise_default,
  lower: lower_default,
  append: append_default,
  insert: insert_default,
  remove: remove_default,
  clone: clone_default,
  datum: datum_default,
  on: on_default,
  dispatch: dispatch_default2,
  [Symbol.iterator]: iterator_default
};
var selection_default = selection;

// node_modules/d3-selection/src/select.js
function select_default2(selector) {
  return typeof selector === "string" ? new Selection([[document.querySelector(selector)]], [document.documentElement]) : new Selection([[selector]], root);
}

// node_modules/d3-selection/src/create.js
function create_default(name) {
  return select_default2(creator_default(name).call(document.documentElement));
}

// node_modules/d3-color/src/define.js
function define_default(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}
function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition)
    prototype[key] = definition[key];
  return prototype;
}

// node_modules/d3-color/src/color.js
function Color() {
}
var darker = 0.7;
var brighter = 1 / darker;
var reI = "\\s*([+-]?\\d+)\\s*";
var reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*";
var reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*";
var reHex = /^#([0-9a-f]{3,8})$/;
var reRgbInteger = new RegExp("^rgb\\(" + [reI, reI, reI] + "\\)$");
var reRgbPercent = new RegExp("^rgb\\(" + [reP, reP, reP] + "\\)$");
var reRgbaInteger = new RegExp("^rgba\\(" + [reI, reI, reI, reN] + "\\)$");
var reRgbaPercent = new RegExp("^rgba\\(" + [reP, reP, reP, reN] + "\\)$");
var reHslPercent = new RegExp("^hsl\\(" + [reN, reP, reP] + "\\)$");
var reHslaPercent = new RegExp("^hsla\\(" + [reN, reP, reP, reN] + "\\)$");
var named = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
define_default(Color, color, {
  copy: function(channels) {
    return Object.assign(new this.constructor(), this, channels);
  },
  displayable: function() {
    return this.rgb().displayable();
  },
  hex: color_formatHex,
  formatHex: color_formatHex,
  formatHsl: color_formatHsl,
  formatRgb: color_formatRgb,
  toString: color_formatRgb
});
function color_formatHex() {
  return this.rgb().formatHex();
}
function color_formatHsl() {
  return hslConvert(this).formatHsl();
}
function color_formatRgb() {
  return this.rgb().formatRgb();
}
function color(format2) {
  var m, l;
  format2 = (format2 + "").trim().toLowerCase();
  return (m = reHex.exec(format2)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) : l === 3 ? new Rgb(m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, (m & 15) << 4 | m & 15, 1) : l === 8 ? rgba(m >> 24 & 255, m >> 16 & 255, m >> 8 & 255, (m & 255) / 255) : l === 4 ? rgba(m >> 12 & 15 | m >> 8 & 240, m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, ((m & 15) << 4 | m & 15) / 255) : null) : (m = reRgbInteger.exec(format2)) ? new Rgb(m[1], m[2], m[3], 1) : (m = reRgbPercent.exec(format2)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) : (m = reRgbaInteger.exec(format2)) ? rgba(m[1], m[2], m[3], m[4]) : (m = reRgbaPercent.exec(format2)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) : (m = reHslPercent.exec(format2)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) : (m = reHslaPercent.exec(format2)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) : named.hasOwnProperty(format2) ? rgbn(named[format2]) : format2 === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
}
function rgbn(n) {
  return new Rgb(n >> 16 & 255, n >> 8 & 255, n & 255, 1);
}
function rgba(r, g, b, a) {
  if (a <= 0)
    r = g = b = NaN;
  return new Rgb(r, g, b, a);
}
function rgbConvert(o) {
  if (!(o instanceof Color))
    o = color(o);
  if (!o)
    return new Rgb();
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}
function rgb(r, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
}
function Rgb(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}
define_default(Rgb, rgb, extend(Color, {
  brighter: function(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb: function() {
    return this;
  },
  displayable: function() {
    return -0.5 <= this.r && this.r < 255.5 && (-0.5 <= this.g && this.g < 255.5) && (-0.5 <= this.b && this.b < 255.5) && (0 <= this.opacity && this.opacity <= 1);
  },
  hex: rgb_formatHex,
  formatHex: rgb_formatHex,
  formatRgb: rgb_formatRgb,
  toString: rgb_formatRgb
}));
function rgb_formatHex() {
  return "#" + hex(this.r) + hex(this.g) + hex(this.b);
}
function rgb_formatRgb() {
  var a = this.opacity;
  a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
  return (a === 1 ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (a === 1 ? ")" : ", " + a + ")");
}
function hex(value) {
  value = Math.max(0, Math.min(255, Math.round(value) || 0));
  return (value < 16 ? "0" : "") + value.toString(16);
}
function hsla(h, s, l, a) {
  if (a <= 0)
    h = s = l = NaN;
  else if (l <= 0 || l >= 1)
    h = s = NaN;
  else if (s <= 0)
    h = NaN;
  return new Hsl(h, s, l, a);
}
function hslConvert(o) {
  if (o instanceof Hsl)
    return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color))
    o = color(o);
  if (!o)
    return new Hsl();
  if (o instanceof Hsl)
    return o;
  o = o.rgb();
  var r = o.r / 255, g = o.g / 255, b = o.b / 255, min2 = Math.min(r, g, b), max2 = Math.max(r, g, b), h = NaN, s = max2 - min2, l = (max2 + min2) / 2;
  if (s) {
    if (r === max2)
      h = (g - b) / s + (g < b) * 6;
    else if (g === max2)
      h = (b - r) / s + 2;
    else
      h = (r - g) / s + 4;
    s /= l < 0.5 ? max2 + min2 : 2 - max2 - min2;
    h *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h;
  }
  return new Hsl(h, s, l, o.opacity);
}
function hsl(h, s, l, opacity) {
  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
}
function Hsl(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}
define_default(Hsl, hsl, extend(Color, {
  brighter: function(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function() {
    var h = this.h % 360 + (this.h < 0) * 360, s = isNaN(h) || isNaN(this.s) ? 0 : this.s, l = this.l, m2 = l + (l < 0.5 ? l : 1 - l) * s, m1 = 2 * l - m2;
    return new Rgb(hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2), hsl2rgb(h, m1, m2), hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2), this.opacity);
  },
  displayable: function() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && (0 <= this.l && this.l <= 1) && (0 <= this.opacity && this.opacity <= 1);
  },
  formatHsl: function() {
    var a = this.opacity;
    a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
    return (a === 1 ? "hsl(" : "hsla(") + (this.h || 0) + ", " + (this.s || 0) * 100 + "%, " + (this.l || 0) * 100 + "%" + (a === 1 ? ")" : ", " + a + ")");
  }
}));
function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
}

// node_modules/d3-interpolate/src/basis.js
function basis(t1, v0, v1, v2, v3) {
  var t2 = t1 * t1, t3 = t2 * t1;
  return ((1 - 3 * t1 + 3 * t2 - t3) * v0 + (4 - 6 * t2 + 3 * t3) * v1 + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2 + t3 * v3) / 6;
}
function basis_default(values) {
  var n = values.length - 1;
  return function(t) {
    var i = t <= 0 ? t = 0 : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n), v1 = values[i], v2 = values[i + 1], v0 = i > 0 ? values[i - 1] : 2 * v1 - v2, v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
}

// node_modules/d3-interpolate/src/basisClosed.js
function basisClosed_default(values) {
  var n = values.length;
  return function(t) {
    var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n), v0 = values[(i + n - 1) % n], v1 = values[i % n], v2 = values[(i + 1) % n], v3 = values[(i + 2) % n];
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
}

// node_modules/d3-interpolate/src/constant.js
var constant_default2 = (x2) => () => x2;

// node_modules/d3-interpolate/src/color.js
function linear(a, d) {
  return function(t) {
    return a + t * d;
  };
}
function exponential(a, b, y2) {
  return a = Math.pow(a, y2), b = Math.pow(b, y2) - a, y2 = 1 / y2, function(t) {
    return Math.pow(a + t * b, y2);
  };
}
function gamma(y2) {
  return (y2 = +y2) === 1 ? nogamma : function(a, b) {
    return b - a ? exponential(a, b, y2) : constant_default2(isNaN(a) ? b : a);
  };
}
function nogamma(a, b) {
  var d = b - a;
  return d ? linear(a, d) : constant_default2(isNaN(a) ? b : a);
}

// node_modules/d3-interpolate/src/rgb.js
var rgb_default = function rgbGamma(y2) {
  var color2 = gamma(y2);
  function rgb2(start2, end) {
    var r = color2((start2 = rgb(start2)).r, (end = rgb(end)).r), g = color2(start2.g, end.g), b = color2(start2.b, end.b), opacity = nogamma(start2.opacity, end.opacity);
    return function(t) {
      start2.r = r(t);
      start2.g = g(t);
      start2.b = b(t);
      start2.opacity = opacity(t);
      return start2 + "";
    };
  }
  rgb2.gamma = rgbGamma;
  return rgb2;
}(1);
function rgbSpline(spline) {
  return function(colors) {
    var n = colors.length, r = new Array(n), g = new Array(n), b = new Array(n), i, color2;
    for (i = 0; i < n; ++i) {
      color2 = rgb(colors[i]);
      r[i] = color2.r || 0;
      g[i] = color2.g || 0;
      b[i] = color2.b || 0;
    }
    r = spline(r);
    g = spline(g);
    b = spline(b);
    color2.opacity = 1;
    return function(t) {
      color2.r = r(t);
      color2.g = g(t);
      color2.b = b(t);
      return color2 + "";
    };
  };
}
var rgbBasis = rgbSpline(basis_default);
var rgbBasisClosed = rgbSpline(basisClosed_default);

// node_modules/d3-interpolate/src/numberArray.js
function numberArray_default(a, b) {
  if (!b)
    b = [];
  var n = a ? Math.min(b.length, a.length) : 0, c = b.slice(), i;
  return function(t) {
    for (i = 0; i < n; ++i)
      c[i] = a[i] * (1 - t) + b[i] * t;
    return c;
  };
}
function isNumberArray(x2) {
  return ArrayBuffer.isView(x2) && !(x2 instanceof DataView);
}

// node_modules/d3-interpolate/src/array.js
function genericArray(a, b) {
  var nb = b ? b.length : 0, na = a ? Math.min(nb, a.length) : 0, x2 = new Array(na), c = new Array(nb), i;
  for (i = 0; i < na; ++i)
    x2[i] = value_default(a[i], b[i]);
  for (; i < nb; ++i)
    c[i] = b[i];
  return function(t) {
    for (i = 0; i < na; ++i)
      c[i] = x2[i](t);
    return c;
  };
}

// node_modules/d3-interpolate/src/date.js
function date_default(a, b) {
  var d = new Date();
  return a = +a, b = +b, function(t) {
    return d.setTime(a * (1 - t) + b * t), d;
  };
}

// node_modules/d3-interpolate/src/number.js
function number_default(a, b) {
  return a = +a, b = +b, function(t) {
    return a * (1 - t) + b * t;
  };
}

// node_modules/d3-interpolate/src/object.js
function object_default(a, b) {
  var i = {}, c = {}, k;
  if (a === null || typeof a !== "object")
    a = {};
  if (b === null || typeof b !== "object")
    b = {};
  for (k in b) {
    if (k in a) {
      i[k] = value_default(a[k], b[k]);
    } else {
      c[k] = b[k];
    }
  }
  return function(t) {
    for (k in i)
      c[k] = i[k](t);
    return c;
  };
}

// node_modules/d3-interpolate/src/string.js
var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
var reB = new RegExp(reA.source, "g");
function zero(b) {
  return function() {
    return b;
  };
}
function one(b) {
  return function(t) {
    return b(t) + "";
  };
}
function string_default(a, b) {
  var bi = reA.lastIndex = reB.lastIndex = 0, am, bm, bs, i = -1, s = [], q = [];
  a = a + "", b = b + "";
  while ((am = reA.exec(a)) && (bm = reB.exec(b))) {
    if ((bs = bm.index) > bi) {
      bs = b.slice(bi, bs);
      if (s[i])
        s[i] += bs;
      else
        s[++i] = bs;
    }
    if ((am = am[0]) === (bm = bm[0])) {
      if (s[i])
        s[i] += bm;
      else
        s[++i] = bm;
    } else {
      s[++i] = null;
      q.push({ i, x: number_default(am, bm) });
    }
    bi = reB.lastIndex;
  }
  if (bi < b.length) {
    bs = b.slice(bi);
    if (s[i])
      s[i] += bs;
    else
      s[++i] = bs;
  }
  return s.length < 2 ? q[0] ? one(q[0].x) : zero(b) : (b = q.length, function(t) {
    for (var i2 = 0, o; i2 < b; ++i2)
      s[(o = q[i2]).i] = o.x(t);
    return s.join("");
  });
}

// node_modules/d3-interpolate/src/value.js
function value_default(a, b) {
  var t = typeof b, c;
  return b == null || t === "boolean" ? constant_default2(b) : (t === "number" ? number_default : t === "string" ? (c = color(b)) ? (b = c, rgb_default) : string_default : b instanceof color ? rgb_default : b instanceof Date ? date_default : isNumberArray(b) ? numberArray_default : Array.isArray(b) ? genericArray : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object_default : number_default)(a, b);
}

// node_modules/d3-interpolate/src/round.js
function round_default(a, b) {
  return a = +a, b = +b, function(t) {
    return Math.round(a * (1 - t) + b * t);
  };
}

// node_modules/d3-interpolate/src/transform/decompose.js
var degrees = 180 / Math.PI;
var identity = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function decompose_default(a, b, c, d, e, f) {
  var scaleX, scaleY, skewX;
  if (scaleX = Math.sqrt(a * a + b * b))
    a /= scaleX, b /= scaleX;
  if (skewX = a * c + b * d)
    c -= a * skewX, d -= b * skewX;
  if (scaleY = Math.sqrt(c * c + d * d))
    c /= scaleY, d /= scaleY, skewX /= scaleY;
  if (a * d < b * c)
    a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
  return {
    translateX: e,
    translateY: f,
    rotate: Math.atan2(b, a) * degrees,
    skewX: Math.atan(skewX) * degrees,
    scaleX,
    scaleY
  };
}

// node_modules/d3-interpolate/src/transform/parse.js
var svgNode;
function parseCss(value) {
  const m = new (typeof DOMMatrix === "function" ? DOMMatrix : WebKitCSSMatrix)(value + "");
  return m.isIdentity ? identity : decompose_default(m.a, m.b, m.c, m.d, m.e, m.f);
}
function parseSvg(value) {
  if (value == null)
    return identity;
  if (!svgNode)
    svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
  svgNode.setAttribute("transform", value);
  if (!(value = svgNode.transform.baseVal.consolidate()))
    return identity;
  value = value.matrix;
  return decompose_default(value.a, value.b, value.c, value.d, value.e, value.f);
}

// node_modules/d3-interpolate/src/transform/index.js
function interpolateTransform(parse, pxComma, pxParen, degParen) {
  function pop(s) {
    return s.length ? s.pop() + " " : "";
  }
  function translate(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push("translate(", null, pxComma, null, pxParen);
      q.push({ i: i - 4, x: number_default(xa, xb) }, { i: i - 2, x: number_default(ya, yb) });
    } else if (xb || yb) {
      s.push("translate(" + xb + pxComma + yb + pxParen);
    }
  }
  function rotate(a, b, s, q) {
    if (a !== b) {
      if (a - b > 180)
        b += 360;
      else if (b - a > 180)
        a += 360;
      q.push({ i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: number_default(a, b) });
    } else if (b) {
      s.push(pop(s) + "rotate(" + b + degParen);
    }
  }
  function skewX(a, b, s, q) {
    if (a !== b) {
      q.push({ i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: number_default(a, b) });
    } else if (b) {
      s.push(pop(s) + "skewX(" + b + degParen);
    }
  }
  function scale(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push(pop(s) + "scale(", null, ",", null, ")");
      q.push({ i: i - 4, x: number_default(xa, xb) }, { i: i - 2, x: number_default(ya, yb) });
    } else if (xb !== 1 || yb !== 1) {
      s.push(pop(s) + "scale(" + xb + "," + yb + ")");
    }
  }
  return function(a, b) {
    var s = [], q = [];
    a = parse(a), b = parse(b);
    translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
    rotate(a.rotate, b.rotate, s, q);
    skewX(a.skewX, b.skewX, s, q);
    scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
    a = b = null;
    return function(t) {
      var i = -1, n = q.length, o;
      while (++i < n)
        s[(o = q[i]).i] = o.x(t);
      return s.join("");
    };
  };
}
var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");

// node_modules/d3-timer/src/timer.js
var frame = 0;
var timeout = 0;
var interval = 0;
var pokeDelay = 1e3;
var taskHead;
var taskTail;
var clockLast = 0;
var clockNow = 0;
var clockSkew = 0;
var clock = typeof performance === "object" && performance.now ? performance : Date;
var setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) {
  setTimeout(f, 17);
};
function now() {
  return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
}
function clearNow() {
  clockNow = 0;
}
function Timer() {
  this._call = this._time = this._next = null;
}
Timer.prototype = timer.prototype = {
  constructor: Timer,
  restart: function(callback, delay, time) {
    if (typeof callback !== "function")
      throw new TypeError("callback is not a function");
    time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
    if (!this._next && taskTail !== this) {
      if (taskTail)
        taskTail._next = this;
      else
        taskHead = this;
      taskTail = this;
    }
    this._call = callback;
    this._time = time;
    sleep();
  },
  stop: function() {
    if (this._call) {
      this._call = null;
      this._time = Infinity;
      sleep();
    }
  }
};
function timer(callback, delay, time) {
  var t = new Timer();
  t.restart(callback, delay, time);
  return t;
}
function timerFlush() {
  now();
  ++frame;
  var t = taskHead, e;
  while (t) {
    if ((e = clockNow - t._time) >= 0)
      t._call.call(void 0, e);
    t = t._next;
  }
  --frame;
}
function wake() {
  clockNow = (clockLast = clock.now()) + clockSkew;
  frame = timeout = 0;
  try {
    timerFlush();
  } finally {
    frame = 0;
    nap();
    clockNow = 0;
  }
}
function poke() {
  var now2 = clock.now(), delay = now2 - clockLast;
  if (delay > pokeDelay)
    clockSkew -= delay, clockLast = now2;
}
function nap() {
  var t0, t1 = taskHead, t2, time = Infinity;
  while (t1) {
    if (t1._call) {
      if (time > t1._time)
        time = t1._time;
      t0 = t1, t1 = t1._next;
    } else {
      t2 = t1._next, t1._next = null;
      t1 = t0 ? t0._next = t2 : taskHead = t2;
    }
  }
  taskTail = t0;
  sleep(time);
}
function sleep(time) {
  if (frame)
    return;
  if (timeout)
    timeout = clearTimeout(timeout);
  var delay = time - clockNow;
  if (delay > 24) {
    if (time < Infinity)
      timeout = setTimeout(wake, time - clock.now() - clockSkew);
    if (interval)
      interval = clearInterval(interval);
  } else {
    if (!interval)
      clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
    frame = 1, setFrame(wake);
  }
}

// node_modules/d3-timer/src/timeout.js
function timeout_default(callback, delay, time) {
  var t = new Timer();
  delay = delay == null ? 0 : +delay;
  t.restart((elapsed) => {
    t.stop();
    callback(elapsed + delay);
  }, delay, time);
  return t;
}

// node_modules/d3-transition/src/transition/schedule.js
var emptyOn = dispatch_default("start", "end", "cancel", "interrupt");
var emptyTween = [];
var CREATED = 0;
var SCHEDULED = 1;
var STARTING = 2;
var STARTED = 3;
var RUNNING = 4;
var ENDING = 5;
var ENDED = 6;
function schedule_default(node, name, id2, index, group, timing) {
  var schedules = node.__transition;
  if (!schedules)
    node.__transition = {};
  else if (id2 in schedules)
    return;
  create(node, id2, {
    name,
    index,
    group,
    on: emptyOn,
    tween: emptyTween,
    time: timing.time,
    delay: timing.delay,
    duration: timing.duration,
    ease: timing.ease,
    timer: null,
    state: CREATED
  });
}
function init2(node, id2) {
  var schedule = get2(node, id2);
  if (schedule.state > CREATED)
    throw new Error("too late; already scheduled");
  return schedule;
}
function set2(node, id2) {
  var schedule = get2(node, id2);
  if (schedule.state > STARTED)
    throw new Error("too late; already running");
  return schedule;
}
function get2(node, id2) {
  var schedule = node.__transition;
  if (!schedule || !(schedule = schedule[id2]))
    throw new Error("transition not found");
  return schedule;
}
function create(node, id2, self2) {
  var schedules = node.__transition, tween;
  schedules[id2] = self2;
  self2.timer = timer(schedule, 0, self2.time);
  function schedule(elapsed) {
    self2.state = SCHEDULED;
    self2.timer.restart(start2, self2.delay, self2.time);
    if (self2.delay <= elapsed)
      start2(elapsed - self2.delay);
  }
  function start2(elapsed) {
    var i, j, n, o;
    if (self2.state !== SCHEDULED)
      return stop();
    for (i in schedules) {
      o = schedules[i];
      if (o.name !== self2.name)
        continue;
      if (o.state === STARTED)
        return timeout_default(start2);
      if (o.state === RUNNING) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call("interrupt", node, node.__data__, o.index, o.group);
        delete schedules[i];
      } else if (+i < id2) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call("cancel", node, node.__data__, o.index, o.group);
        delete schedules[i];
      }
    }
    timeout_default(function() {
      if (self2.state === STARTED) {
        self2.state = RUNNING;
        self2.timer.restart(tick2, self2.delay, self2.time);
        tick2(elapsed);
      }
    });
    self2.state = STARTING;
    self2.on.call("start", node, node.__data__, self2.index, self2.group);
    if (self2.state !== STARTING)
      return;
    self2.state = STARTED;
    tween = new Array(n = self2.tween.length);
    for (i = 0, j = -1; i < n; ++i) {
      if (o = self2.tween[i].value.call(node, node.__data__, self2.index, self2.group)) {
        tween[++j] = o;
      }
    }
    tween.length = j + 1;
  }
  function tick2(elapsed) {
    var t = elapsed < self2.duration ? self2.ease.call(null, elapsed / self2.duration) : (self2.timer.restart(stop), self2.state = ENDING, 1), i = -1, n = tween.length;
    while (++i < n) {
      tween[i].call(node, t);
    }
    if (self2.state === ENDING) {
      self2.on.call("end", node, node.__data__, self2.index, self2.group);
      stop();
    }
  }
  function stop() {
    self2.state = ENDED;
    self2.timer.stop();
    delete schedules[id2];
    for (var i in schedules)
      return;
    delete node.__transition;
  }
}

// node_modules/d3-transition/src/interrupt.js
function interrupt_default(node, name) {
  var schedules = node.__transition, schedule, active, empty2 = true, i;
  if (!schedules)
    return;
  name = name == null ? null : name + "";
  for (i in schedules) {
    if ((schedule = schedules[i]).name !== name) {
      empty2 = false;
      continue;
    }
    active = schedule.state > STARTING && schedule.state < ENDING;
    schedule.state = ENDED;
    schedule.timer.stop();
    schedule.on.call(active ? "interrupt" : "cancel", node, node.__data__, schedule.index, schedule.group);
    delete schedules[i];
  }
  if (empty2)
    delete node.__transition;
}

// node_modules/d3-transition/src/selection/interrupt.js
function interrupt_default2(name) {
  return this.each(function() {
    interrupt_default(this, name);
  });
}

// node_modules/d3-transition/src/transition/tween.js
function tweenRemove(id2, name) {
  var tween0, tween1;
  return function() {
    var schedule = set2(this, id2), tween = schedule.tween;
    if (tween !== tween0) {
      tween1 = tween0 = tween;
      for (var i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1 = tween1.slice();
          tween1.splice(i, 1);
          break;
        }
      }
    }
    schedule.tween = tween1;
  };
}
function tweenFunction(id2, name, value) {
  var tween0, tween1;
  if (typeof value !== "function")
    throw new Error();
  return function() {
    var schedule = set2(this, id2), tween = schedule.tween;
    if (tween !== tween0) {
      tween1 = (tween0 = tween).slice();
      for (var t = { name, value }, i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1[i] = t;
          break;
        }
      }
      if (i === n)
        tween1.push(t);
    }
    schedule.tween = tween1;
  };
}
function tween_default(name, value) {
  var id2 = this._id;
  name += "";
  if (arguments.length < 2) {
    var tween = get2(this.node(), id2).tween;
    for (var i = 0, n = tween.length, t; i < n; ++i) {
      if ((t = tween[i]).name === name) {
        return t.value;
      }
    }
    return null;
  }
  return this.each((value == null ? tweenRemove : tweenFunction)(id2, name, value));
}
function tweenValue(transition2, name, value) {
  var id2 = transition2._id;
  transition2.each(function() {
    var schedule = set2(this, id2);
    (schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
  });
  return function(node) {
    return get2(node, id2).value[name];
  };
}

// node_modules/d3-transition/src/transition/interpolate.js
function interpolate_default(a, b) {
  var c;
  return (typeof b === "number" ? number_default : b instanceof color ? rgb_default : (c = color(b)) ? (b = c, rgb_default) : string_default)(a, b);
}

// node_modules/d3-transition/src/transition/attr.js
function attrRemove2(name) {
  return function() {
    this.removeAttribute(name);
  };
}
function attrRemoveNS2(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}
function attrConstant2(name, interpolate, value1) {
  var string00, string1 = value1 + "", interpolate0;
  return function() {
    var string0 = this.getAttribute(name);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
  };
}
function attrConstantNS2(fullname, interpolate, value1) {
  var string00, string1 = value1 + "", interpolate0;
  return function() {
    var string0 = this.getAttributeNS(fullname.space, fullname.local);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
  };
}
function attrFunction2(name, interpolate, value) {
  var string00, string10, interpolate0;
  return function() {
    var string0, value1 = value(this), string1;
    if (value1 == null)
      return void this.removeAttribute(name);
    string0 = this.getAttribute(name);
    string1 = value1 + "";
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}
function attrFunctionNS2(fullname, interpolate, value) {
  var string00, string10, interpolate0;
  return function() {
    var string0, value1 = value(this), string1;
    if (value1 == null)
      return void this.removeAttributeNS(fullname.space, fullname.local);
    string0 = this.getAttributeNS(fullname.space, fullname.local);
    string1 = value1 + "";
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}
function attr_default2(name, value) {
  var fullname = namespace_default(name), i = fullname === "transform" ? interpolateTransformSvg : interpolate_default;
  return this.attrTween(name, typeof value === "function" ? (fullname.local ? attrFunctionNS2 : attrFunction2)(fullname, i, tweenValue(this, "attr." + name, value)) : value == null ? (fullname.local ? attrRemoveNS2 : attrRemove2)(fullname) : (fullname.local ? attrConstantNS2 : attrConstant2)(fullname, i, value));
}

// node_modules/d3-transition/src/transition/attrTween.js
function attrInterpolate(name, i) {
  return function(t) {
    this.setAttribute(name, i.call(this, t));
  };
}
function attrInterpolateNS(fullname, i) {
  return function(t) {
    this.setAttributeNS(fullname.space, fullname.local, i.call(this, t));
  };
}
function attrTweenNS(fullname, value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0)
      t0 = (i0 = i) && attrInterpolateNS(fullname, i);
    return t0;
  }
  tween._value = value;
  return tween;
}
function attrTween(name, value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0)
      t0 = (i0 = i) && attrInterpolate(name, i);
    return t0;
  }
  tween._value = value;
  return tween;
}
function attrTween_default(name, value) {
  var key = "attr." + name;
  if (arguments.length < 2)
    return (key = this.tween(key)) && key._value;
  if (value == null)
    return this.tween(key, null);
  if (typeof value !== "function")
    throw new Error();
  var fullname = namespace_default(name);
  return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
}

// node_modules/d3-transition/src/transition/delay.js
function delayFunction(id2, value) {
  return function() {
    init2(this, id2).delay = +value.apply(this, arguments);
  };
}
function delayConstant(id2, value) {
  return value = +value, function() {
    init2(this, id2).delay = value;
  };
}
function delay_default(value) {
  var id2 = this._id;
  return arguments.length ? this.each((typeof value === "function" ? delayFunction : delayConstant)(id2, value)) : get2(this.node(), id2).delay;
}

// node_modules/d3-transition/src/transition/duration.js
function durationFunction(id2, value) {
  return function() {
    set2(this, id2).duration = +value.apply(this, arguments);
  };
}
function durationConstant(id2, value) {
  return value = +value, function() {
    set2(this, id2).duration = value;
  };
}
function duration_default(value) {
  var id2 = this._id;
  return arguments.length ? this.each((typeof value === "function" ? durationFunction : durationConstant)(id2, value)) : get2(this.node(), id2).duration;
}

// node_modules/d3-transition/src/transition/ease.js
function easeConstant(id2, value) {
  if (typeof value !== "function")
    throw new Error();
  return function() {
    set2(this, id2).ease = value;
  };
}
function ease_default(value) {
  var id2 = this._id;
  return arguments.length ? this.each(easeConstant(id2, value)) : get2(this.node(), id2).ease;
}

// node_modules/d3-transition/src/transition/easeVarying.js
function easeVarying(id2, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (typeof v !== "function")
      throw new Error();
    set2(this, id2).ease = v;
  };
}
function easeVarying_default(value) {
  if (typeof value !== "function")
    throw new Error();
  return this.each(easeVarying(this._id, value));
}

// node_modules/d3-transition/src/transition/filter.js
function filter_default2(match) {
  if (typeof match !== "function")
    match = matcher_default(match);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }
  return new Transition(subgroups, this._parents, this._name, this._id);
}

// node_modules/d3-transition/src/transition/merge.js
function merge_default2(transition2) {
  if (transition2._id !== this._id)
    throw new Error();
  for (var groups0 = this._groups, groups1 = transition2._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }
  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }
  return new Transition(merges, this._parents, this._name, this._id);
}

// node_modules/d3-transition/src/transition/on.js
function start(name) {
  return (name + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    if (i >= 0)
      t = t.slice(0, i);
    return !t || t === "start";
  });
}
function onFunction(id2, name, listener) {
  var on0, on1, sit = start(name) ? init2 : set2;
  return function() {
    var schedule = sit(this, id2), on = schedule.on;
    if (on !== on0)
      (on1 = (on0 = on).copy()).on(name, listener);
    schedule.on = on1;
  };
}
function on_default2(name, listener) {
  var id2 = this._id;
  return arguments.length < 2 ? get2(this.node(), id2).on.on(name) : this.each(onFunction(id2, name, listener));
}

// node_modules/d3-transition/src/transition/remove.js
function removeFunction(id2) {
  return function() {
    var parent = this.parentNode;
    for (var i in this.__transition)
      if (+i !== id2)
        return;
    if (parent)
      parent.removeChild(this);
  };
}
function remove_default2() {
  return this.on("end.remove", removeFunction(this._id));
}

// node_modules/d3-transition/src/transition/select.js
function select_default3(select) {
  var name = this._name, id2 = this._id;
  if (typeof select !== "function")
    select = selector_default(select);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node)
          subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
        schedule_default(subgroup[i], name, id2, i, subgroup, get2(node, id2));
      }
    }
  }
  return new Transition(subgroups, this._parents, name, id2);
}

// node_modules/d3-transition/src/transition/selectAll.js
function selectAll_default2(select) {
  var name = this._name, id2 = this._id;
  if (typeof select !== "function")
    select = selectorAll_default(select);
  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        for (var children3 = select.call(node, node.__data__, i, group), child, inherit2 = get2(node, id2), k = 0, l = children3.length; k < l; ++k) {
          if (child = children3[k]) {
            schedule_default(child, name, id2, k, children3, inherit2);
          }
        }
        subgroups.push(children3);
        parents.push(node);
      }
    }
  }
  return new Transition(subgroups, parents, name, id2);
}

// node_modules/d3-transition/src/transition/selection.js
var Selection2 = selection_default.prototype.constructor;
function selection_default2() {
  return new Selection2(this._groups, this._parents);
}

// node_modules/d3-transition/src/transition/style.js
function styleNull(name, interpolate) {
  var string00, string10, interpolate0;
  return function() {
    var string0 = styleValue(this, name), string1 = (this.style.removeProperty(name), styleValue(this, name));
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : interpolate0 = interpolate(string00 = string0, string10 = string1);
  };
}
function styleRemove2(name) {
  return function() {
    this.style.removeProperty(name);
  };
}
function styleConstant2(name, interpolate, value1) {
  var string00, string1 = value1 + "", interpolate0;
  return function() {
    var string0 = styleValue(this, name);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
  };
}
function styleFunction2(name, interpolate, value) {
  var string00, string10, interpolate0;
  return function() {
    var string0 = styleValue(this, name), value1 = value(this), string1 = value1 + "";
    if (value1 == null)
      string1 = value1 = (this.style.removeProperty(name), styleValue(this, name));
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}
function styleMaybeRemove(id2, name) {
  var on0, on1, listener0, key = "style." + name, event = "end." + key, remove2;
  return function() {
    var schedule = set2(this, id2), on = schedule.on, listener = schedule.value[key] == null ? remove2 || (remove2 = styleRemove2(name)) : void 0;
    if (on !== on0 || listener0 !== listener)
      (on1 = (on0 = on).copy()).on(event, listener0 = listener);
    schedule.on = on1;
  };
}
function style_default2(name, value, priority) {
  var i = (name += "") === "transform" ? interpolateTransformCss : interpolate_default;
  return value == null ? this.styleTween(name, styleNull(name, i)).on("end.style." + name, styleRemove2(name)) : typeof value === "function" ? this.styleTween(name, styleFunction2(name, i, tweenValue(this, "style." + name, value))).each(styleMaybeRemove(this._id, name)) : this.styleTween(name, styleConstant2(name, i, value), priority).on("end.style." + name, null);
}

// node_modules/d3-transition/src/transition/styleTween.js
function styleInterpolate(name, i, priority) {
  return function(t) {
    this.style.setProperty(name, i.call(this, t), priority);
  };
}
function styleTween(name, value, priority) {
  var t, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0)
      t = (i0 = i) && styleInterpolate(name, i, priority);
    return t;
  }
  tween._value = value;
  return tween;
}
function styleTween_default(name, value, priority) {
  var key = "style." + (name += "");
  if (arguments.length < 2)
    return (key = this.tween(key)) && key._value;
  if (value == null)
    return this.tween(key, null);
  if (typeof value !== "function")
    throw new Error();
  return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
}

// node_modules/d3-transition/src/transition/text.js
function textConstant2(value) {
  return function() {
    this.textContent = value;
  };
}
function textFunction2(value) {
  return function() {
    var value1 = value(this);
    this.textContent = value1 == null ? "" : value1;
  };
}
function text_default2(value) {
  return this.tween("text", typeof value === "function" ? textFunction2(tweenValue(this, "text", value)) : textConstant2(value == null ? "" : value + ""));
}

// node_modules/d3-transition/src/transition/textTween.js
function textInterpolate(i) {
  return function(t) {
    this.textContent = i.call(this, t);
  };
}
function textTween(value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0)
      t0 = (i0 = i) && textInterpolate(i);
    return t0;
  }
  tween._value = value;
  return tween;
}
function textTween_default(value) {
  var key = "text";
  if (arguments.length < 1)
    return (key = this.tween(key)) && key._value;
  if (value == null)
    return this.tween(key, null);
  if (typeof value !== "function")
    throw new Error();
  return this.tween(key, textTween(value));
}

// node_modules/d3-transition/src/transition/transition.js
function transition_default() {
  var name = this._name, id0 = this._id, id1 = newId();
  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        var inherit2 = get2(node, id0);
        schedule_default(node, name, id1, i, group, {
          time: inherit2.time + inherit2.delay + inherit2.duration,
          delay: 0,
          duration: inherit2.duration,
          ease: inherit2.ease
        });
      }
    }
  }
  return new Transition(groups, this._parents, name, id1);
}

// node_modules/d3-transition/src/transition/end.js
function end_default() {
  var on0, on1, that = this, id2 = that._id, size = that.size();
  return new Promise(function(resolve, reject) {
    var cancel = { value: reject }, end = { value: function() {
      if (--size === 0)
        resolve();
    } };
    that.each(function() {
      var schedule = set2(this, id2), on = schedule.on;
      if (on !== on0) {
        on1 = (on0 = on).copy();
        on1._.cancel.push(cancel);
        on1._.interrupt.push(cancel);
        on1._.end.push(end);
      }
      schedule.on = on1;
    });
    if (size === 0)
      resolve();
  });
}

// node_modules/d3-transition/src/transition/index.js
var id = 0;
function Transition(groups, parents, name, id2) {
  this._groups = groups;
  this._parents = parents;
  this._name = name;
  this._id = id2;
}
function transition(name) {
  return selection_default().transition(name);
}
function newId() {
  return ++id;
}
var selection_prototype = selection_default.prototype;
Transition.prototype = transition.prototype = {
  constructor: Transition,
  select: select_default3,
  selectAll: selectAll_default2,
  selectChild: selection_prototype.selectChild,
  selectChildren: selection_prototype.selectChildren,
  filter: filter_default2,
  merge: merge_default2,
  selection: selection_default2,
  transition: transition_default,
  call: selection_prototype.call,
  nodes: selection_prototype.nodes,
  node: selection_prototype.node,
  size: selection_prototype.size,
  empty: selection_prototype.empty,
  each: selection_prototype.each,
  on: on_default2,
  attr: attr_default2,
  attrTween: attrTween_default,
  style: style_default2,
  styleTween: styleTween_default,
  text: text_default2,
  textTween: textTween_default,
  remove: remove_default2,
  tween: tween_default,
  delay: delay_default,
  duration: duration_default,
  ease: ease_default,
  easeVarying: easeVarying_default,
  end: end_default,
  [Symbol.iterator]: selection_prototype[Symbol.iterator]
};

// node_modules/d3-ease/src/linear.js
var linear2 = (t) => +t;

// node_modules/d3-ease/src/cubic.js
function cubicInOut(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}

// node_modules/d3-transition/src/selection/transition.js
var defaultTiming = {
  time: null,
  delay: 0,
  duration: 250,
  ease: cubicInOut
};
function inherit(node, id2) {
  var timing;
  while (!(timing = node.__transition) || !(timing = timing[id2])) {
    if (!(node = node.parentNode)) {
      throw new Error(`transition ${id2} not found`);
    }
  }
  return timing;
}
function transition_default2(name) {
  var id2, timing;
  if (name instanceof Transition) {
    id2 = name._id, name = name._name;
  } else {
    id2 = newId(), (timing = defaultTiming).time = now(), name = name == null ? null : name + "";
  }
  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        schedule_default(node, name, id2, i, group, timing || inherit(node, id2));
      }
    }
  }
  return new Transition(groups, this._parents, name, id2);
}

// node_modules/d3-transition/src/selection/index.js
selection_default.prototype.interrupt = interrupt_default2;
selection_default.prototype.transition = transition_default2;

// node_modules/d3-brush/src/brush.js
var { abs, max, min } = Math;
function number1(e) {
  return [+e[0], +e[1]];
}
function number2(e) {
  return [number1(e[0]), number1(e[1])];
}
var X = {
  name: "x",
  handles: ["w", "e"].map(type),
  input: function(x2, e) {
    return x2 == null ? null : [[+x2[0], e[0][1]], [+x2[1], e[1][1]]];
  },
  output: function(xy) {
    return xy && [xy[0][0], xy[1][0]];
  }
};
var Y = {
  name: "y",
  handles: ["n", "s"].map(type),
  input: function(y2, e) {
    return y2 == null ? null : [[e[0][0], +y2[0]], [e[1][0], +y2[1]]];
  },
  output: function(xy) {
    return xy && [xy[0][1], xy[1][1]];
  }
};
var XY = {
  name: "xy",
  handles: ["n", "w", "e", "s", "nw", "ne", "sw", "se"].map(type),
  input: function(xy) {
    return xy == null ? null : number2(xy);
  },
  output: function(xy) {
    return xy;
  }
};
function type(t) {
  return { type: t };
}

// node_modules/d3-path/src/path.js
var pi = Math.PI;
var tau = 2 * pi;
var epsilon = 1e-6;
var tauEpsilon = tau - epsilon;
function Path() {
  this._x0 = this._y0 = this._x1 = this._y1 = null;
  this._ = "";
}
function path() {
  return new Path();
}
Path.prototype = path.prototype = {
  constructor: Path,
  moveTo: function(x2, y2) {
    this._ += "M" + (this._x0 = this._x1 = +x2) + "," + (this._y0 = this._y1 = +y2);
  },
  closePath: function() {
    if (this._x1 !== null) {
      this._x1 = this._x0, this._y1 = this._y0;
      this._ += "Z";
    }
  },
  lineTo: function(x2, y2) {
    this._ += "L" + (this._x1 = +x2) + "," + (this._y1 = +y2);
  },
  quadraticCurveTo: function(x1, y1, x2, y2) {
    this._ += "Q" + +x1 + "," + +y1 + "," + (this._x1 = +x2) + "," + (this._y1 = +y2);
  },
  bezierCurveTo: function(x1, y1, x2, y2, x3, y3) {
    this._ += "C" + +x1 + "," + +y1 + "," + +x2 + "," + +y2 + "," + (this._x1 = +x3) + "," + (this._y1 = +y3);
  },
  arcTo: function(x1, y1, x2, y2, r) {
    x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2, r = +r;
    var x0 = this._x1, y0 = this._y1, x21 = x2 - x1, y21 = y2 - y1, x01 = x0 - x1, y01 = y0 - y1, l01_2 = x01 * x01 + y01 * y01;
    if (r < 0)
      throw new Error("negative radius: " + r);
    if (this._x1 === null) {
      this._ += "M" + (this._x1 = x1) + "," + (this._y1 = y1);
    } else if (!(l01_2 > epsilon))
      ;
    else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon) || !r) {
      this._ += "L" + (this._x1 = x1) + "," + (this._y1 = y1);
    } else {
      var x20 = x2 - x0, y20 = y2 - y0, l21_2 = x21 * x21 + y21 * y21, l20_2 = x20 * x20 + y20 * y20, l21 = Math.sqrt(l21_2), l01 = Math.sqrt(l01_2), l = r * Math.tan((pi - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2), t01 = l / l01, t21 = l / l21;
      if (Math.abs(t01 - 1) > epsilon) {
        this._ += "L" + (x1 + t01 * x01) + "," + (y1 + t01 * y01);
      }
      this._ += "A" + r + "," + r + ",0,0," + +(y01 * x20 > x01 * y20) + "," + (this._x1 = x1 + t21 * x21) + "," + (this._y1 = y1 + t21 * y21);
    }
  },
  arc: function(x2, y2, r, a0, a1, ccw) {
    x2 = +x2, y2 = +y2, r = +r, ccw = !!ccw;
    var dx = r * Math.cos(a0), dy = r * Math.sin(a0), x0 = x2 + dx, y0 = y2 + dy, cw = 1 ^ ccw, da = ccw ? a0 - a1 : a1 - a0;
    if (r < 0)
      throw new Error("negative radius: " + r);
    if (this._x1 === null) {
      this._ += "M" + x0 + "," + y0;
    } else if (Math.abs(this._x1 - x0) > epsilon || Math.abs(this._y1 - y0) > epsilon) {
      this._ += "L" + x0 + "," + y0;
    }
    if (!r)
      return;
    if (da < 0)
      da = da % tau + tau;
    if (da > tauEpsilon) {
      this._ += "A" + r + "," + r + ",0,1," + cw + "," + (x2 - dx) + "," + (y2 - dy) + "A" + r + "," + r + ",0,1," + cw + "," + (this._x1 = x0) + "," + (this._y1 = y0);
    } else if (da > epsilon) {
      this._ += "A" + r + "," + r + ",0," + +(da >= pi) + "," + cw + "," + (this._x1 = x2 + r * Math.cos(a1)) + "," + (this._y1 = y2 + r * Math.sin(a1));
    }
  },
  rect: function(x2, y2, w, h) {
    this._ += "M" + (this._x0 = this._x1 = +x2) + "," + (this._y0 = this._y1 = +y2) + "h" + +w + "v" + +h + "h" + -w + "Z";
  },
  toString: function() {
    return this._;
  }
};
var path_default = path;

// node_modules/d3-format/src/formatDecimal.js
function formatDecimal_default(x2) {
  return Math.abs(x2 = Math.round(x2)) >= 1e21 ? x2.toLocaleString("en").replace(/,/g, "") : x2.toString(10);
}
function formatDecimalParts(x2, p) {
  if ((i = (x2 = p ? x2.toExponential(p - 1) : x2.toExponential()).indexOf("e")) < 0)
    return null;
  var i, coefficient = x2.slice(0, i);
  return [
    coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
    +x2.slice(i + 1)
  ];
}

// node_modules/d3-format/src/exponent.js
function exponent_default(x2) {
  return x2 = formatDecimalParts(Math.abs(x2)), x2 ? x2[1] : NaN;
}

// node_modules/d3-format/src/formatGroup.js
function formatGroup_default(grouping, thousands) {
  return function(value, width) {
    var i = value.length, t = [], j = 0, g = grouping[0], length = 0;
    while (i > 0 && g > 0) {
      if (length + g + 1 > width)
        g = Math.max(1, width - length);
      t.push(value.substring(i -= g, i + g));
      if ((length += g + 1) > width)
        break;
      g = grouping[j = (j + 1) % grouping.length];
    }
    return t.reverse().join(thousands);
  };
}

// node_modules/d3-format/src/formatNumerals.js
function formatNumerals_default(numerals) {
  return function(value) {
    return value.replace(/[0-9]/g, function(i) {
      return numerals[+i];
    });
  };
}

// node_modules/d3-format/src/formatSpecifier.js
var re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function formatSpecifier(specifier) {
  if (!(match = re.exec(specifier)))
    throw new Error("invalid format: " + specifier);
  var match;
  return new FormatSpecifier({
    fill: match[1],
    align: match[2],
    sign: match[3],
    symbol: match[4],
    zero: match[5],
    width: match[6],
    comma: match[7],
    precision: match[8] && match[8].slice(1),
    trim: match[9],
    type: match[10]
  });
}
formatSpecifier.prototype = FormatSpecifier.prototype;
function FormatSpecifier(specifier) {
  this.fill = specifier.fill === void 0 ? " " : specifier.fill + "";
  this.align = specifier.align === void 0 ? ">" : specifier.align + "";
  this.sign = specifier.sign === void 0 ? "-" : specifier.sign + "";
  this.symbol = specifier.symbol === void 0 ? "" : specifier.symbol + "";
  this.zero = !!specifier.zero;
  this.width = specifier.width === void 0 ? void 0 : +specifier.width;
  this.comma = !!specifier.comma;
  this.precision = specifier.precision === void 0 ? void 0 : +specifier.precision;
  this.trim = !!specifier.trim;
  this.type = specifier.type === void 0 ? "" : specifier.type + "";
}
FormatSpecifier.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};

// node_modules/d3-format/src/formatTrim.js
function formatTrim_default(s) {
  out:
    for (var n = s.length, i = 1, i0 = -1, i1; i < n; ++i) {
      switch (s[i]) {
        case ".":
          i0 = i1 = i;
          break;
        case "0":
          if (i0 === 0)
            i0 = i;
          i1 = i;
          break;
        default:
          if (!+s[i])
            break out;
          if (i0 > 0)
            i0 = 0;
          break;
      }
    }
  return i0 > 0 ? s.slice(0, i0) + s.slice(i1 + 1) : s;
}

// node_modules/d3-format/src/formatPrefixAuto.js
var prefixExponent;
function formatPrefixAuto_default(x2, p) {
  var d = formatDecimalParts(x2, p);
  if (!d)
    return x2 + "";
  var coefficient = d[0], exponent = d[1], i = exponent - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1, n = coefficient.length;
  return i === n ? coefficient : i > n ? coefficient + new Array(i - n + 1).join("0") : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i) : "0." + new Array(1 - i).join("0") + formatDecimalParts(x2, Math.max(0, p + i - 1))[0];
}

// node_modules/d3-format/src/formatRounded.js
function formatRounded_default(x2, p) {
  var d = formatDecimalParts(x2, p);
  if (!d)
    return x2 + "";
  var coefficient = d[0], exponent = d[1];
  return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1) : coefficient + new Array(exponent - coefficient.length + 2).join("0");
}

// node_modules/d3-format/src/formatTypes.js
var formatTypes_default = {
  "%": (x2, p) => (x2 * 100).toFixed(p),
  "b": (x2) => Math.round(x2).toString(2),
  "c": (x2) => x2 + "",
  "d": formatDecimal_default,
  "e": (x2, p) => x2.toExponential(p),
  "f": (x2, p) => x2.toFixed(p),
  "g": (x2, p) => x2.toPrecision(p),
  "o": (x2) => Math.round(x2).toString(8),
  "p": (x2, p) => formatRounded_default(x2 * 100, p),
  "r": formatRounded_default,
  "s": formatPrefixAuto_default,
  "X": (x2) => Math.round(x2).toString(16).toUpperCase(),
  "x": (x2) => Math.round(x2).toString(16)
};

// node_modules/d3-format/src/identity.js
function identity_default(x2) {
  return x2;
}

// node_modules/d3-format/src/locale.js
var map2 = Array.prototype.map;
var prefixes = ["y", "z", "a", "f", "p", "n", "\xB5", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function locale_default(locale2) {
  var group = locale2.grouping === void 0 || locale2.thousands === void 0 ? identity_default : formatGroup_default(map2.call(locale2.grouping, Number), locale2.thousands + ""), currencyPrefix = locale2.currency === void 0 ? "" : locale2.currency[0] + "", currencySuffix = locale2.currency === void 0 ? "" : locale2.currency[1] + "", decimal = locale2.decimal === void 0 ? "." : locale2.decimal + "", numerals = locale2.numerals === void 0 ? identity_default : formatNumerals_default(map2.call(locale2.numerals, String)), percent = locale2.percent === void 0 ? "%" : locale2.percent + "", minus = locale2.minus === void 0 ? "\u2212" : locale2.minus + "", nan = locale2.nan === void 0 ? "NaN" : locale2.nan + "";
  function newFormat(specifier) {
    specifier = formatSpecifier(specifier);
    var fill = specifier.fill, align = specifier.align, sign = specifier.sign, symbol = specifier.symbol, zero2 = specifier.zero, width = specifier.width, comma = specifier.comma, precision = specifier.precision, trim = specifier.trim, type2 = specifier.type;
    if (type2 === "n")
      comma = true, type2 = "g";
    else if (!formatTypes_default[type2])
      precision === void 0 && (precision = 12), trim = true, type2 = "g";
    if (zero2 || fill === "0" && align === "=")
      zero2 = true, fill = "0", align = "=";
    var prefix = symbol === "$" ? currencyPrefix : symbol === "#" && /[boxX]/.test(type2) ? "0" + type2.toLowerCase() : "", suffix = symbol === "$" ? currencySuffix : /[%p]/.test(type2) ? percent : "";
    var formatType = formatTypes_default[type2], maybeSuffix = /[defgprs%]/.test(type2);
    precision = precision === void 0 ? 6 : /[gprs]/.test(type2) ? Math.max(1, Math.min(21, precision)) : Math.max(0, Math.min(20, precision));
    function format2(value) {
      var valuePrefix = prefix, valueSuffix = suffix, i, n, c;
      if (type2 === "c") {
        valueSuffix = formatType(value) + valueSuffix;
        value = "";
      } else {
        value = +value;
        var valueNegative = value < 0 || 1 / value < 0;
        value = isNaN(value) ? nan : formatType(Math.abs(value), precision);
        if (trim)
          value = formatTrim_default(value);
        if (valueNegative && +value === 0 && sign !== "+")
          valueNegative = false;
        valuePrefix = (valueNegative ? sign === "(" ? sign : minus : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
        valueSuffix = (type2 === "s" ? prefixes[8 + prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign === "(" ? ")" : "");
        if (maybeSuffix) {
          i = -1, n = value.length;
          while (++i < n) {
            if (c = value.charCodeAt(i), 48 > c || c > 57) {
              valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
              value = value.slice(0, i);
              break;
            }
          }
        }
      }
      if (comma && !zero2)
        value = group(value, Infinity);
      var length = valuePrefix.length + value.length + valueSuffix.length, padding = length < width ? new Array(width - length + 1).join(fill) : "";
      if (comma && zero2)
        value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "";
      switch (align) {
        case "<":
          value = valuePrefix + value + valueSuffix + padding;
          break;
        case "=":
          value = valuePrefix + padding + value + valueSuffix;
          break;
        case "^":
          value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length);
          break;
        default:
          value = padding + valuePrefix + value + valueSuffix;
          break;
      }
      return numerals(value);
    }
    format2.toString = function() {
      return specifier + "";
    };
    return format2;
  }
  function formatPrefix2(specifier, value) {
    var f = newFormat((specifier = formatSpecifier(specifier), specifier.type = "f", specifier)), e = Math.max(-8, Math.min(8, Math.floor(exponent_default(value) / 3))) * 3, k = Math.pow(10, -e), prefix = prefixes[8 + e / 3];
    return function(value2) {
      return f(k * value2) + prefix;
    };
  }
  return {
    format: newFormat,
    formatPrefix: formatPrefix2
  };
}

// node_modules/d3-format/src/defaultLocale.js
var locale;
var format;
var formatPrefix;
defaultLocale({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function defaultLocale(definition) {
  locale = locale_default(definition);
  format = locale.format;
  formatPrefix = locale.formatPrefix;
  return locale;
}

// node_modules/d3-format/src/precisionFixed.js
function precisionFixed_default(step) {
  return Math.max(0, -exponent_default(Math.abs(step)));
}

// node_modules/d3-format/src/precisionPrefix.js
function precisionPrefix_default(step, value) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(exponent_default(value) / 3))) * 3 - exponent_default(Math.abs(step)));
}

// node_modules/d3-format/src/precisionRound.js
function precisionRound_default(step, max2) {
  step = Math.abs(step), max2 = Math.abs(max2) - step;
  return Math.max(0, exponent_default(max2) - exponent_default(step)) + 1;
}

// node_modules/d3-scale/src/init.js
function initRange(domain, range2) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(domain);
      break;
    default:
      this.range(range2).domain(domain);
      break;
  }
  return this;
}

// node_modules/d3-scale/src/constant.js
function constants(x2) {
  return function() {
    return x2;
  };
}

// node_modules/d3-scale/src/number.js
function number3(x2) {
  return +x2;
}

// node_modules/d3-scale/src/continuous.js
var unit = [0, 1];
function identity2(x2) {
  return x2;
}
function normalize(a, b) {
  return (b -= a = +a) ? function(x2) {
    return (x2 - a) / b;
  } : constants(isNaN(b) ? NaN : 0.5);
}
function clamper(a, b) {
  var t;
  if (a > b)
    t = a, a = b, b = t;
  return function(x2) {
    return Math.max(a, Math.min(b, x2));
  };
}
function bimap(domain, range2, interpolate) {
  var d0 = domain[0], d1 = domain[1], r0 = range2[0], r1 = range2[1];
  if (d1 < d0)
    d0 = normalize(d1, d0), r0 = interpolate(r1, r0);
  else
    d0 = normalize(d0, d1), r0 = interpolate(r0, r1);
  return function(x2) {
    return r0(d0(x2));
  };
}
function polymap(domain, range2, interpolate) {
  var j = Math.min(domain.length, range2.length) - 1, d = new Array(j), r = new Array(j), i = -1;
  if (domain[j] < domain[0]) {
    domain = domain.slice().reverse();
    range2 = range2.slice().reverse();
  }
  while (++i < j) {
    d[i] = normalize(domain[i], domain[i + 1]);
    r[i] = interpolate(range2[i], range2[i + 1]);
  }
  return function(x2) {
    var i2 = bisect_default(domain, x2, 1, j) - 1;
    return r[i2](d[i2](x2));
  };
}
function copy(source, target) {
  return target.domain(source.domain()).range(source.range()).interpolate(source.interpolate()).clamp(source.clamp()).unknown(source.unknown());
}
function transformer() {
  var domain = unit, range2 = unit, interpolate = value_default, transform2, untransform, unknown, clamp = identity2, piecewise, output, input;
  function rescale() {
    var n = Math.min(domain.length, range2.length);
    if (clamp !== identity2)
      clamp = clamper(domain[0], domain[n - 1]);
    piecewise = n > 2 ? polymap : bimap;
    output = input = null;
    return scale;
  }
  function scale(x2) {
    return x2 == null || isNaN(x2 = +x2) ? unknown : (output || (output = piecewise(domain.map(transform2), range2, interpolate)))(transform2(clamp(x2)));
  }
  scale.invert = function(y2) {
    return clamp(untransform((input || (input = piecewise(range2, domain.map(transform2), number_default)))(y2)));
  };
  scale.domain = function(_) {
    return arguments.length ? (domain = Array.from(_, number3), rescale()) : domain.slice();
  };
  scale.range = function(_) {
    return arguments.length ? (range2 = Array.from(_), rescale()) : range2.slice();
  };
  scale.rangeRound = function(_) {
    return range2 = Array.from(_), interpolate = round_default, rescale();
  };
  scale.clamp = function(_) {
    return arguments.length ? (clamp = _ ? true : identity2, rescale()) : clamp !== identity2;
  };
  scale.interpolate = function(_) {
    return arguments.length ? (interpolate = _, rescale()) : interpolate;
  };
  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };
  return function(t, u) {
    transform2 = t, untransform = u;
    return rescale();
  };
}
function continuous() {
  return transformer()(identity2, identity2);
}

// node_modules/d3-scale/src/tickFormat.js
function tickFormat(start2, stop, count, specifier) {
  var step = tickStep(start2, stop, count), precision;
  specifier = formatSpecifier(specifier == null ? ",f" : specifier);
  switch (specifier.type) {
    case "s": {
      var value = Math.max(Math.abs(start2), Math.abs(stop));
      if (specifier.precision == null && !isNaN(precision = precisionPrefix_default(step, value)))
        specifier.precision = precision;
      return formatPrefix(specifier, value);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      if (specifier.precision == null && !isNaN(precision = precisionRound_default(step, Math.max(Math.abs(start2), Math.abs(stop)))))
        specifier.precision = precision - (specifier.type === "e");
      break;
    }
    case "f":
    case "%": {
      if (specifier.precision == null && !isNaN(precision = precisionFixed_default(step)))
        specifier.precision = precision - (specifier.type === "%") * 2;
      break;
    }
  }
  return format(specifier);
}

// node_modules/d3-scale/src/linear.js
function linearish(scale) {
  var domain = scale.domain;
  scale.ticks = function(count) {
    var d = domain();
    return ticks(d[0], d[d.length - 1], count == null ? 10 : count);
  };
  scale.tickFormat = function(count, specifier) {
    var d = domain();
    return tickFormat(d[0], d[d.length - 1], count == null ? 10 : count, specifier);
  };
  scale.nice = function(count) {
    if (count == null)
      count = 10;
    var d = domain();
    var i0 = 0;
    var i1 = d.length - 1;
    var start2 = d[i0];
    var stop = d[i1];
    var prestep;
    var step;
    var maxIter = 10;
    if (stop < start2) {
      step = start2, start2 = stop, stop = step;
      step = i0, i0 = i1, i1 = step;
    }
    while (maxIter-- > 0) {
      step = tickIncrement(start2, stop, count);
      if (step === prestep) {
        d[i0] = start2;
        d[i1] = stop;
        return domain(d);
      } else if (step > 0) {
        start2 = Math.floor(start2 / step) * step;
        stop = Math.ceil(stop / step) * step;
      } else if (step < 0) {
        start2 = Math.ceil(start2 * step) / step;
        stop = Math.floor(stop * step) / step;
      } else {
        break;
      }
      prestep = step;
    }
    return scale;
  };
  return scale;
}
function linear3() {
  var scale = continuous();
  scale.copy = function() {
    return copy(scale, linear3());
  };
  initRange.apply(scale, arguments);
  return linearish(scale);
}

// node_modules/d3-shape/src/constant.js
function constant_default4(x2) {
  return function constant() {
    return x2;
  };
}

// node_modules/d3-shape/src/math.js
var epsilon2 = 1e-12;
var pi2 = Math.PI;
var halfPi = pi2 / 2;
var tau2 = 2 * pi2;

// node_modules/d3-shape/src/array.js
var slice = Array.prototype.slice;
function array_default(x2) {
  return typeof x2 === "object" && "length" in x2 ? x2 : Array.from(x2);
}

// node_modules/d3-shape/src/curve/linear.js
function Linear(context) {
  this._context = context;
}
Linear.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || this._line !== 0 && this._point === 1)
      this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x2, y2) : this._context.moveTo(x2, y2);
        break;
      case 1:
        this._point = 2;
      default:
        this._context.lineTo(x2, y2);
        break;
    }
  }
};
function linear_default(context) {
  return new Linear(context);
}

// node_modules/d3-shape/src/point.js
function x(p) {
  return p[0];
}
function y(p) {
  return p[1];
}

// node_modules/d3-shape/src/line.js
function line_default(x2, y2) {
  var defined = constant_default4(true), context = null, curve = linear_default, output = null;
  x2 = typeof x2 === "function" ? x2 : x2 === void 0 ? x : constant_default4(x2);
  y2 = typeof y2 === "function" ? y2 : y2 === void 0 ? y : constant_default4(y2);
  function line(data) {
    var i, n = (data = array_default(data)).length, d, defined0 = false, buffer;
    if (context == null)
      output = curve(buffer = path_default());
    for (i = 0; i <= n; ++i) {
      if (!(i < n && defined(d = data[i], i, data)) === defined0) {
        if (defined0 = !defined0)
          output.lineStart();
        else
          output.lineEnd();
      }
      if (defined0)
        output.point(+x2(d, i, data), +y2(d, i, data));
    }
    if (buffer)
      return output = null, buffer + "" || null;
  }
  line.x = function(_) {
    return arguments.length ? (x2 = typeof _ === "function" ? _ : constant_default4(+_), line) : x2;
  };
  line.y = function(_) {
    return arguments.length ? (y2 = typeof _ === "function" ? _ : constant_default4(+_), line) : y2;
  };
  line.defined = function(_) {
    return arguments.length ? (defined = typeof _ === "function" ? _ : constant_default4(!!_), line) : defined;
  };
  line.curve = function(_) {
    return arguments.length ? (curve = _, context != null && (output = curve(context)), line) : curve;
  };
  line.context = function(_) {
    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), line) : context;
  };
  return line;
}

// node_modules/d3-shape/src/curve/cardinal.js
function point(that, x2, y2) {
  that._context.bezierCurveTo(that._x1 + that._k * (that._x2 - that._x0), that._y1 + that._k * (that._y2 - that._y0), that._x2 + that._k * (that._x1 - x2), that._y2 + that._k * (that._y1 - y2), that._x2, that._y2);
}
function Cardinal(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}
Cardinal.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x2, this._y2);
        break;
      case 3:
        point(this, this._x1, this._y1);
        break;
    }
    if (this._line || this._line !== 0 && this._point === 1)
      this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x2, y2) : this._context.moveTo(x2, y2);
        break;
      case 1:
        this._point = 2;
        this._x1 = x2, this._y1 = y2;
        break;
      case 2:
        this._point = 3;
      default:
        point(this, x2, y2);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x2;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y2;
  }
};
var cardinal_default = function custom(tension) {
  function cardinal(context) {
    return new Cardinal(context, tension);
  }
  cardinal.tension = function(tension2) {
    return custom(+tension2);
  };
  return cardinal;
}(0);

// node_modules/d3-shape/src/curve/catmullRom.js
function point2(that, x2, y2) {
  var x1 = that._x1, y1 = that._y1, x22 = that._x2, y22 = that._y2;
  if (that._l01_a > epsilon2) {
    var a = 2 * that._l01_2a + 3 * that._l01_a * that._l12_a + that._l12_2a, n = 3 * that._l01_a * (that._l01_a + that._l12_a);
    x1 = (x1 * a - that._x0 * that._l12_2a + that._x2 * that._l01_2a) / n;
    y1 = (y1 * a - that._y0 * that._l12_2a + that._y2 * that._l01_2a) / n;
  }
  if (that._l23_a > epsilon2) {
    var b = 2 * that._l23_2a + 3 * that._l23_a * that._l12_a + that._l12_2a, m = 3 * that._l23_a * (that._l23_a + that._l12_a);
    x22 = (x22 * b + that._x1 * that._l23_2a - x2 * that._l12_2a) / m;
    y22 = (y22 * b + that._y1 * that._l23_2a - y2 * that._l12_2a) / m;
  }
  that._context.bezierCurveTo(x1, y1, x22, y22, that._x2, that._y2);
}
function CatmullRom(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}
CatmullRom.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
    this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x2, this._y2);
        break;
      case 3:
        this.point(this._x2, this._y2);
        break;
    }
    if (this._line || this._line !== 0 && this._point === 1)
      this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    if (this._point) {
      var x23 = this._x2 - x2, y23 = this._y2 - y2;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x2, y2) : this._context.moveTo(x2, y2);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
      default:
        point2(this, x2, y2);
        break;
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x2;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y2;
  }
};
var catmullRom_default = function custom2(alpha) {
  function catmullRom(context) {
    return alpha ? new CatmullRom(context, alpha) : new Cardinal(context, 0);
  }
  catmullRom.alpha = function(alpha2) {
    return custom2(+alpha2);
  };
  return catmullRom;
}(0.5);

// node_modules/d3-zoom/src/transform.js
function Transform(k, x2, y2) {
  this.k = k;
  this.x = x2;
  this.y = y2;
}
Transform.prototype = {
  constructor: Transform,
  scale: function(k) {
    return k === 1 ? this : new Transform(this.k * k, this.x, this.y);
  },
  translate: function(x2, y2) {
    return x2 === 0 & y2 === 0 ? this : new Transform(this.k, this.x + this.k * x2, this.y + this.k * y2);
  },
  apply: function(point3) {
    return [point3[0] * this.k + this.x, point3[1] * this.k + this.y];
  },
  applyX: function(x2) {
    return x2 * this.k + this.x;
  },
  applyY: function(y2) {
    return y2 * this.k + this.y;
  },
  invert: function(location) {
    return [(location[0] - this.x) / this.k, (location[1] - this.y) / this.k];
  },
  invertX: function(x2) {
    return (x2 - this.x) / this.k;
  },
  invertY: function(y2) {
    return (y2 - this.y) / this.k;
  },
  rescaleX: function(x2) {
    return x2.copy().domain(x2.range().map(this.invertX, this).map(x2.invert, x2));
  },
  rescaleY: function(y2) {
    return y2.copy().domain(y2.range().map(this.invertY, this).map(y2.invert, y2));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
var identity3 = new Transform(1, 0, 0);
transform.prototype = Transform.prototype;
function transform(node) {
  while (!node.__zoom)
    if (!(node = node.parentNode))
      return identity3;
  return node.__zoom;
}

// src/plot/ConnectedScatterplot.ts
function ConnectedScatterplot(data, {
  x: x2 = ([T]) => x2,
  y: y2 = ([, T]) => y2,
  r = 3,
  title,
  orient = () => "top",
  defined,
  curve = catmullRom_default,
  width = 640,
  height = 400,
  marginTop = 0,
  marginRight = 0,
  marginBottom = 0,
  marginLeft = 0,
  inset = r * 2,
  insetTop = inset,
  insetRight = inset,
  insetBottom = inset,
  insetLeft = inset,
  xType = linear3,
  xDomain,
  xRange = [marginLeft + insetLeft, width - marginRight - insetRight],
  xFormat,
  xLabel,
  yType = linear3,
  yDomain,
  yRange = [height - marginBottom - insetBottom, marginTop + insetTop],
  yFormat,
  yLabel,
  fill = "white",
  stroke = "currentColor",
  strokeWidth = 2,
  strokeLinecap = "round",
  strokeLinejoin = "round",
  halo = "#fff",
  haloWidth = 6,
  duration = 0
} = {}) {
  const X2 = map(data, x2);
  const Y2 = map(data, y2);
  const T = title == null ? null : map(data, title);
  const O = map(data, orient);
  const I = range(X2.length);
  if (defined === void 0)
    defined = (d, i) => !isNaN(X2[i]) && !isNaN(Y2[i]);
  const D = map(data, defined);
  if (xDomain === void 0)
    xDomain = nice(...extent(X2), width / 80);
  if (yDomain === void 0)
    yDomain = nice(...extent(Y2), height / 50);
  const xScale = xType(xDomain, xRange);
  const yScale = yType(yDomain, yRange);
  let line = line_default().curve(curve).defined((i) => D[i]).x((i) => xScale(X2[i])).y((i) => yScale(Y2[i]));
  const svg = create_default("svg").attr("width", width).attr("height", height).attr("viewBox", [0, 0, width, height]).attr("style", "max-width: 100%; height: auto; height: intrinsic;");
  const path2 = svg.append("path").attr("fill", "none").attr("stroke", stroke).attr("stroke-width", strokeWidth).attr("stroke-linejoin", strokeLinejoin).attr("stroke-linecap", strokeLinecap).attr("d", line(I));
  svg.append("g").attr("fill", fill).attr("stroke", stroke).attr("stroke-width", strokeWidth).selectAll("circle").data(I.filter((i) => D[i])).join("circle").attr("cx", (i) => xScale(X2[i])).attr("cy", (i) => yScale(Y2[i])).attr("r", r);
  function length(path3) {
    return create_default("svg:path").attr("d", path3).node().getTotalLength();
  }
  function animate() {
    if (duration > 0) {
      const l = length(line(I));
      path2.interrupt().attr("stroke-dasharray", `0,${l}`).transition().duration(duration).ease(linear2).attr("stroke-dasharray", `${l},${l}`);
    }
  }
  const renderPath = (data2) => {
    const D2 = map(data2, defined);
    line = line_default().curve(curve).defined((i) => D2[i]).x((i) => xScale(X2[i])).y((i) => yScale(Y2[i]));
    path2.attr("d", line(I));
  };
  const update2 = (newData) => {
    console.log(newData);
    renderPath(newData);
  };
  animate();
  return Object.assign(svg.node(), { animate, update: update2 });
}

// src/utils/style.ts
var getGlobalStyle = (name) => getComputedStyle(document.body).getPropertyValue(name);

// src/utils/canvas.ts
function roundRect(ctx, x2, y2, width, height, radius, fill, stroke) {
  if (typeof stroke === "undefined") {
    stroke = true;
  }
  if (typeof radius === "undefined") {
    radius = 5;
  }
  if (typeof radius === "number") {
    radius = { tl: radius, tr: radius, br: radius, bl: radius };
  } else {
    var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
    for (var side in defaultRadius) {
      radius[side] = radius[side] || defaultRadius[side];
    }
  }
  ctx.beginPath();
  ctx.moveTo(x2 + radius.tl, y2);
  ctx.lineTo(x2 + width - radius.tr, y2);
  ctx.quadraticCurveTo(x2 + width, y2, x2 + width, y2 + radius.tr);
  ctx.lineTo(x2 + width, y2 + height - radius.br);
  ctx.quadraticCurveTo(x2 + width, y2 + height, x2 + width - radius.br, y2 + height);
  ctx.lineTo(x2 + radius.bl, y2 + height);
  ctx.quadraticCurveTo(x2, y2 + height, x2, y2 + height - radius.bl);
  ctx.lineTo(x2, y2 + radius.tl);
  ctx.quadraticCurveTo(x2, y2, x2 + radius.tl, y2);
  ctx.closePath();
  if (fill) {
    ctx.fill();
  }
  if (stroke) {
    ctx.stroke();
  }
}
function drawGrid(ctx, width, height, gap, mazeSize2) {
  for (let i = 0; i < mazeSize2.width; i++) {
    for (let j = 0; j < mazeSize2.height; j++) {
      const y2 = gap + (height + gap) * i;
      const x2 = gap + (width + gap) * j;
      console.log(getGlobalStyle("--main-bg-secondary"));
      ctx.fillStyle = "#cccccc";
      roundRect(ctx, x2, y2, width, height, 15, true, false);
    }
  }
}

// src/utils/geo.ts
var mazeSize = {
  width: 6,
  height: 6
};

// src/MazeViewCard.svelte
function create_fragment3(ctx) {
  let div2;
  let canvas_1;
  let CanvasEl_action;
  let t0;
  let div0;
  let RobotPath_action;
  let t1;
  let div1;
  let button;
  let mounted;
  let dispose;
  return {
    c() {
      div2 = element("div");
      canvas_1 = element("canvas");
      t0 = space();
      div0 = element("div");
      t1 = space();
      div1 = element("div");
      button = element("button");
      button.textContent = "Add point test";
      attr(canvas_1, "class", "svelte-1popbqv");
      attr(div0, "class", "svelte-1popbqv");
      attr(div1, "class", "svelte-1popbqv");
      attr(div2, "class", "card map svelte-1popbqv");
    },
    m(target, anchor) {
      insert(target, div2, anchor);
      append(div2, canvas_1);
      append(div2, t0);
      append(div2, div0);
      append(div2, t1);
      append(div2, div1);
      append(div1, button);
      if (!mounted) {
        dispose = [
          action_destroyer(CanvasEl_action = ctx[0].call(null, canvas_1)),
          action_destroyer(RobotPath_action = ctx[1].call(null, div0)),
          listen(button, "click", ctx[2])
        ];
        mounted = true;
      }
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(div2);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance3($$self, $$props, $$invalidate) {
  let { com } = $$props;
  let canvas;
  let ctx;
  let lastCoords;
  const data = [];
  const onNavPacket = (nav) => {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const x2 = (nav.position.x + 2) * (canvas.clientWidth / 5);
    const y2 = (nav.position.y + 2) * (canvas.clientHeight / 5);
    if (!lastCoords) {
      lastCoords = [x2, y2];
    }
    ctx.beginPath();
    ctx.strokeStyle = "#ffffff";
    ctx.moveTo(...lastCoords);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    lastCoords = [x2, y2];
    ctx.beginPath();
    ctx.arc(x2 + nav.sensors.left * (width / 20), y2 + nav.sensors.left * (height / 20), 14, 0, 2 * Math.PI, false);
    ctx.fillStyle = "rgba(52, 200, 219, 0.3)";
    ctx.fill();
    ctx.closePath();
  };
  function CanvasEl(node) {
    canvas = node;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
    ctx = canvas.getContext("2d");
    const gap = 5;
    drawGrid(ctx, (width - gap) / mazeSize.width - gap, (height - gap) / mazeSize.height - gap, gap, mazeSize);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    com.addEventListener("message", (evt) => {
      if (evt.data.nav) {
        onNavPacket(evt.data.nav);
      }
    });
  }
  let pathChart;
  function RobotPath(node) {
    const rect = node.getBoundingClientRect();
    const data2 = [
      { x: 0.5, y: 0 },
      { x: 0.55, y: 0.5 },
      { x: 0.49, y: 1 },
      { x: 0.6, y: 1.2 },
      { x: 1.6, y: 1.2 },
      { x: 2.6, y: 4.2 },
      { x: 6, y: 4.2 }
    ];
    pathChart = ConnectedScatterplot(data2, {
      x: (d) => d.x,
      y: (d) => d.y,
      title: (d) => d.year,
      orient: (d) => d.side,
      xDomain: [0, 6],
      yDomain: [0, 6],
      width: rect.width,
      height: rect.height,
      duration: 0
    });
    node.appendChild(pathChart);
  }
  const addPoint = () => {
    console.log("add point");
    data.push({
      x: Math.random() * 6,
      y: Math.random() * 6
    });
    pathChart.update(data);
  };
  $$self.$$set = ($$props2) => {
    if ("com" in $$props2)
      $$invalidate(3, com = $$props2.com);
  };
  return [CanvasEl, RobotPath, addPoint, com];
}
var MazeViewCard = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance3, create_fragment3, safe_not_equal, { com: 3 });
  }
};
var MazeViewCard_default = MazeViewCard;

// src/index.svelte
function create_fragment4(ctx) {
  let main;
  let mazeview;
  let t0;
  let div0;
  let sensortable;
  let t1;
  let div1;
  let h20;
  let t3;
  let label0;
  let t4;
  let input0;
  let t5;
  let label1;
  let t6;
  let input1;
  let t7;
  let button0;
  let t9;
  let h21;
  let t11;
  let label2;
  let t12;
  let input2;
  let t13;
  let label3;
  let t14;
  let input3;
  let t15;
  let label4;
  let t16;
  let input4;
  let t17;
  let button1;
  let current;
  let mounted;
  let dispose;
  mazeview = new MazeViewCard_default({ props: { com: ctx[0] } });
  sensortable = new sensorTable_default({ props: { com: ctx[0] } });
  return {
    c() {
      main = element("main");
      create_component(mazeview.$$.fragment);
      t0 = space();
      div0 = element("div");
      create_component(sensortable.$$.fragment);
      t1 = space();
      div1 = element("div");
      h20 = element("h2");
      h20.textContent = "Controls";
      t3 = space();
      label0 = element("label");
      t4 = text("Speed:\n      ");
      input0 = element("input");
      t5 = space();
      label1 = element("label");
      t6 = text("Direction:\n      ");
      input1 = element("input");
      t7 = space();
      button0 = element("button");
      button0.textContent = "Update";
      t9 = space();
      h21 = element("h2");
      h21.textContent = "Tuning";
      t11 = space();
      label2 = element("label");
      t12 = text("kP:\n      ");
      input2 = element("input");
      t13 = space();
      label3 = element("label");
      t14 = text("kD:\n      ");
      input3 = element("input");
      t15 = space();
      label4 = element("label");
      t16 = text("kI:\n      ");
      input4 = element("input");
      t17 = space();
      button1 = element("button");
      button1.textContent = "Update";
      attr(div0, "class", "card svelte-1h6q3el");
      attr(input0, "type", "number");
      attr(input1, "type", "number");
      attr(input2, "step", "0.001");
      attr(input2, "type", "number");
      attr(input3, "step", "0.001");
      attr(input3, "type", "number");
      attr(input4, "step", "0.001");
      attr(input4, "type", "number");
      attr(div1, "class", "card svelte-1h6q3el");
      attr(main, "class", "svelte-1h6q3el");
    },
    m(target, anchor) {
      insert(target, main, anchor);
      mount_component(mazeview, main, null);
      append(main, t0);
      append(main, div0);
      mount_component(sensortable, div0, null);
      append(main, t1);
      append(main, div1);
      append(div1, h20);
      append(div1, t3);
      append(div1, label0);
      append(label0, t4);
      append(label0, input0);
      set_input_value(input0, ctx[5]);
      append(div1, t5);
      append(div1, label1);
      append(label1, t6);
      append(label1, input1);
      set_input_value(input1, ctx[4]);
      append(div1, t7);
      append(div1, button0);
      append(div1, t9);
      append(div1, h21);
      append(div1, t11);
      append(div1, label2);
      append(label2, t12);
      append(label2, input2);
      set_input_value(input2, ctx[3]);
      append(div1, t13);
      append(div1, label3);
      append(label3, t14);
      append(label3, input3);
      set_input_value(input3, ctx[1]);
      append(div1, t15);
      append(div1, label4);
      append(label4, t16);
      append(label4, input4);
      set_input_value(input4, ctx[2]);
      append(div1, t17);
      append(div1, button1);
      current = true;
      if (!mounted) {
        dispose = [
          listen(input0, "input", ctx[8]),
          listen(input1, "input", ctx[9]),
          listen(button0, "click", ctx[7]),
          listen(input2, "input", ctx[10]),
          listen(input3, "input", ctx[11]),
          listen(input4, "input", ctx[12]),
          listen(button1, "click", ctx[6])
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & 32 && to_number(input0.value) !== ctx2[5]) {
        set_input_value(input0, ctx2[5]);
      }
      if (dirty & 16 && to_number(input1.value) !== ctx2[4]) {
        set_input_value(input1, ctx2[4]);
      }
      if (dirty & 8 && to_number(input2.value) !== ctx2[3]) {
        set_input_value(input2, ctx2[3]);
      }
      if (dirty & 2 && to_number(input3.value) !== ctx2[1]) {
        set_input_value(input3, ctx2[1]);
      }
      if (dirty & 4 && to_number(input4.value) !== ctx2[2]) {
        set_input_value(input4, ctx2[2]);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(mazeview.$$.fragment, local);
      transition_in(sensortable.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(mazeview.$$.fragment, local);
      transition_out(sensortable.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(main);
      destroy_component(mazeview);
      destroy_component(sensortable);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance4($$self, $$props, $$invalidate) {
  const com = new Communicator({ url: "ws://localhost:8080/ws" });
  let kD = 0;
  let kI = 0;
  let kP = 0;
  let direction = 0;
  let speed = 0;
  const onUpdateMotorCalibration = () => {
    com.send({ encoderCallibration: { kD, kI, kP } });
  };
  const onUpdateControls = () => {
    com.send({ control: { speed, direction } });
  };
  function input0_input_handler() {
    speed = to_number(this.value);
    $$invalidate(5, speed);
  }
  function input1_input_handler() {
    direction = to_number(this.value);
    $$invalidate(4, direction);
  }
  function input2_input_handler() {
    kP = to_number(this.value);
    $$invalidate(3, kP);
  }
  function input3_input_handler() {
    kD = to_number(this.value);
    $$invalidate(1, kD);
  }
  function input4_input_handler() {
    kI = to_number(this.value);
    $$invalidate(2, kI);
  }
  return [
    com,
    kD,
    kI,
    kP,
    direction,
    speed,
    onUpdateMotorCalibration,
    onUpdateControls,
    input0_input_handler,
    input1_input_handler,
    input2_input_handler,
    input3_input_handler,
    input4_input_handler
  ];
}
var Src = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance4, create_fragment4, safe_not_equal, { com: 0 });
  }
  get com() {
    return this.$$.ctx[0];
  }
};
var src_default = Src;

// src/entry.ts
var setupFrontend = () => {
};
setupFrontend();
new src_default({
  target: document.body
});
/**
 * @license
 * Copyright 2009 The Closure Library Authors
 * Copyright 2020 Daniel Wirtz / The long.js Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vbm9kZV9tb2R1bGVzL0Bwcm90b2J1ZmpzL2FzcHJvbWlzZS9pbmRleC5qcyIsICIuLi9ub2RlX21vZHVsZXMvQHByb3RvYnVmanMvYmFzZTY0L2luZGV4LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9AcHJvdG9idWZqcy9ldmVudGVtaXR0ZXIvaW5kZXguanMiLCAiLi4vbm9kZV9tb2R1bGVzL0Bwcm90b2J1ZmpzL2Zsb2F0L2luZGV4LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9AcHJvdG9idWZqcy9pbnF1aXJlL2luZGV4LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9AcHJvdG9idWZqcy91dGY4L2luZGV4LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9AcHJvdG9idWZqcy9wb29sL2luZGV4LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9wcm90b2J1ZmpzL3NyYy91dGlsL2xvbmdiaXRzLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9wcm90b2J1ZmpzL3NyYy91dGlsL21pbmltYWwuanMiLCAiLi4vbm9kZV9tb2R1bGVzL3Byb3RvYnVmanMvc3JjL3dyaXRlci5qcyIsICIuLi9ub2RlX21vZHVsZXMvcHJvdG9idWZqcy9zcmMvd3JpdGVyX2J1ZmZlci5qcyIsICIuLi9ub2RlX21vZHVsZXMvcHJvdG9idWZqcy9zcmMvcmVhZGVyLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9wcm90b2J1ZmpzL3NyYy9yZWFkZXJfYnVmZmVyLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9wcm90b2J1ZmpzL3NyYy9ycGMvc2VydmljZS5qcyIsICIuLi9ub2RlX21vZHVsZXMvcHJvdG9idWZqcy9zcmMvcnBjLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9wcm90b2J1ZmpzL3NyYy9yb290cy5qcyIsICIuLi9ub2RlX21vZHVsZXMvcHJvdG9idWZqcy9zcmMvaW5kZXgtbWluaW1hbC5qcyIsICIuLi9ub2RlX21vZHVsZXMvcHJvdG9idWZqcy9taW5pbWFsLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9zdmVsdGUvaW50ZXJuYWwvaW5kZXgubWpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3ZlbHRlanMvc3ZlbHRlLXZpcnR1YWwtbGlzdC9WaXJ0dWFsTGlzdC5zdmVsdGUiLCAiLi4vbm9kZV9tb2R1bGVzL2xvbmcvaW5kZXguanMiLCAiLi4vc3JjL3Byb3RvL21lc3NhZ2UudHMiLCAiLi4vc3JjL0NvbW11bmljYXRvci50cyIsICIuLi9zcmMvc2Vuc29yVGFibGUuc3ZlbHRlIiwgIi4uL25vZGVfbW9kdWxlcy9kMy1hcnJheS9zcmMvYXNjZW5kaW5nLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9kMy1hcnJheS9zcmMvYmlzZWN0b3IuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2QzLWFycmF5L3NyYy9udW1iZXIuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2QzLWFycmF5L3NyYy9iaXNlY3QuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2QzLWFycmF5L3NyYy9leHRlbnQuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2QzLWFycmF5L3NyYy90aWNrcy5qcyIsICIuLi9ub2RlX21vZHVsZXMvZDMtYXJyYXkvc3JjL25pY2UuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2QzLWFycmF5L3NyYy9yYW5nZS5qcyIsICIuLi9ub2RlX21vZHVsZXMvZDMtYXJyYXkvc3JjL21hcC5qcyIsICIuLi9ub2RlX21vZHVsZXMvZDMtZGlzcGF0Y2gvc3JjL2Rpc3BhdGNoLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL25hbWVzcGFjZXMuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvbmFtZXNwYWNlLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL2NyZWF0b3IuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0b3IuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL3NlbGVjdC5qcyIsICIuLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9hcnJheS5qcyIsICIuLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3RvckFsbC5qcyIsICIuLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vc2VsZWN0QWxsLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL21hdGNoZXIuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL3NlbGVjdENoaWxkLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9zZWxlY3RDaGlsZHJlbi5qcyIsICIuLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vZmlsdGVyLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9zcGFyc2UuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL2VudGVyLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL2NvbnN0YW50LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9kYXRhLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9leGl0LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9qb2luLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9tZXJnZS5qcyIsICIuLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vb3JkZXIuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL3NvcnQuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL2NhbGwuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL25vZGVzLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9ub2RlLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9zaXplLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9lbXB0eS5qcyIsICIuLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vZWFjaC5qcyIsICIuLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vYXR0ci5qcyIsICIuLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy93aW5kb3cuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL3N0eWxlLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9wcm9wZXJ0eS5qcyIsICIuLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vY2xhc3NlZC5qcyIsICIuLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vdGV4dC5qcyIsICIuLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vaHRtbC5qcyIsICIuLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vcmFpc2UuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL2xvd2VyLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9hcHBlbmQuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL2luc2VydC5qcyIsICIuLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vcmVtb3ZlLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9jbG9uZS5qcyIsICIuLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vZGF0dW0uanMiLCAiLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL29uLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9kaXNwYXRjaC5qcyIsICIuLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vaXRlcmF0b3IuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL2luZGV4LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdC5qcyIsICIuLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9jcmVhdGUuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2QzLWNvbG9yL3NyYy9kZWZpbmUuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2QzLWNvbG9yL3NyYy9jb2xvci5qcyIsICIuLi9ub2RlX21vZHVsZXMvZDMtaW50ZXJwb2xhdGUvc3JjL2Jhc2lzLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9kMy1pbnRlcnBvbGF0ZS9zcmMvYmFzaXNDbG9zZWQuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2QzLWludGVycG9sYXRlL3NyYy9jb25zdGFudC5qcyIsICIuLi9ub2RlX21vZHVsZXMvZDMtaW50ZXJwb2xhdGUvc3JjL2NvbG9yLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9kMy1pbnRlcnBvbGF0ZS9zcmMvcmdiLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9kMy1pbnRlcnBvbGF0ZS9zcmMvbnVtYmVyQXJyYXkuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2QzLWludGVycG9sYXRlL3NyYy9hcnJheS5qcyIsICIuLi9ub2RlX21vZHVsZXMvZDMtaW50ZXJwb2xhdGUvc3JjL2RhdGUuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2QzLWludGVycG9sYXRlL3NyYy9udW1iZXIuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2QzLWludGVycG9sYXRlL3NyYy9vYmplY3QuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2QzLWludGVycG9sYXRlL3NyYy9zdHJpbmcuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2QzLWludGVycG9sYXRlL3NyYy92YWx1ZS5qcyIsICIuLi9ub2RlX21vZHVsZXMvZDMtaW50ZXJwb2xhdGUvc3JjL3JvdW5kLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9kMy1pbnRlcnBvbGF0ZS9zcmMvdHJhbnNmb3JtL2RlY29tcG9zZS5qcyIsICIuLi9ub2RlX21vZHVsZXMvZDMtaW50ZXJwb2xhdGUvc3JjL3RyYW5zZm9ybS9wYXJzZS5qcyIsICIuLi9ub2RlX21vZHVsZXMvZDMtaW50ZXJwb2xhdGUvc3JjL3RyYW5zZm9ybS9pbmRleC5qcyIsICIuLi9ub2RlX21vZHVsZXMvZDMtdGltZXIvc3JjL3RpbWVyLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9kMy10aW1lci9zcmMvdGltZW91dC5qcyIsICIuLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9zY2hlZHVsZS5qcyIsICIuLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvaW50ZXJydXB0LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy9zZWxlY3Rpb24vaW50ZXJydXB0LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy90cmFuc2l0aW9uL3R3ZWVuLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy90cmFuc2l0aW9uL2ludGVycG9sYXRlLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy90cmFuc2l0aW9uL2F0dHIuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2QzLXRyYW5zaXRpb24vc3JjL3RyYW5zaXRpb24vYXR0clR3ZWVuLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy90cmFuc2l0aW9uL2RlbGF5LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy90cmFuc2l0aW9uL2R1cmF0aW9uLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy90cmFuc2l0aW9uL2Vhc2UuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2QzLXRyYW5zaXRpb24vc3JjL3RyYW5zaXRpb24vZWFzZVZhcnlpbmcuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2QzLXRyYW5zaXRpb24vc3JjL3RyYW5zaXRpb24vZmlsdGVyLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy90cmFuc2l0aW9uL21lcmdlLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy90cmFuc2l0aW9uL29uLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy90cmFuc2l0aW9uL3JlbW92ZS5qcyIsICIuLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9zZWxlY3QuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2QzLXRyYW5zaXRpb24vc3JjL3RyYW5zaXRpb24vc2VsZWN0QWxsLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy90cmFuc2l0aW9uL3NlbGVjdGlvbi5qcyIsICIuLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9zdHlsZS5qcyIsICIuLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9zdHlsZVR3ZWVuLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy90cmFuc2l0aW9uL3RleHQuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2QzLXRyYW5zaXRpb24vc3JjL3RyYW5zaXRpb24vdGV4dFR3ZWVuLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy90cmFuc2l0aW9uL3RyYW5zaXRpb24uanMiLCAiLi4vbm9kZV9tb2R1bGVzL2QzLXRyYW5zaXRpb24vc3JjL3RyYW5zaXRpb24vZW5kLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy90cmFuc2l0aW9uL2luZGV4LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9kMy1lYXNlL3NyYy9saW5lYXIuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2QzLWVhc2Uvc3JjL2N1YmljLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy9zZWxlY3Rpb24vdHJhbnNpdGlvbi5qcyIsICIuLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvc2VsZWN0aW9uL2luZGV4LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9kMy1icnVzaC9zcmMvYnJ1c2guanMiLCAiLi4vbm9kZV9tb2R1bGVzL2QzLXBhdGgvc3JjL3BhdGguanMiLCAiLi4vbm9kZV9tb2R1bGVzL2QzLWZvcm1hdC9zcmMvZm9ybWF0RGVjaW1hbC5qcyIsICIuLi9ub2RlX21vZHVsZXMvZDMtZm9ybWF0L3NyYy9leHBvbmVudC5qcyIsICIuLi9ub2RlX21vZHVsZXMvZDMtZm9ybWF0L3NyYy9mb3JtYXRHcm91cC5qcyIsICIuLi9ub2RlX21vZHVsZXMvZDMtZm9ybWF0L3NyYy9mb3JtYXROdW1lcmFscy5qcyIsICIuLi9ub2RlX21vZHVsZXMvZDMtZm9ybWF0L3NyYy9mb3JtYXRTcGVjaWZpZXIuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2QzLWZvcm1hdC9zcmMvZm9ybWF0VHJpbS5qcyIsICIuLi9ub2RlX21vZHVsZXMvZDMtZm9ybWF0L3NyYy9mb3JtYXRQcmVmaXhBdXRvLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9kMy1mb3JtYXQvc3JjL2Zvcm1hdFJvdW5kZWQuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2QzLWZvcm1hdC9zcmMvZm9ybWF0VHlwZXMuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2QzLWZvcm1hdC9zcmMvaWRlbnRpdHkuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2QzLWZvcm1hdC9zcmMvbG9jYWxlLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9kMy1mb3JtYXQvc3JjL2RlZmF1bHRMb2NhbGUuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2QzLWZvcm1hdC9zcmMvcHJlY2lzaW9uRml4ZWQuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2QzLWZvcm1hdC9zcmMvcHJlY2lzaW9uUHJlZml4LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9kMy1mb3JtYXQvc3JjL3ByZWNpc2lvblJvdW5kLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9kMy1zY2FsZS9zcmMvaW5pdC5qcyIsICIuLi9ub2RlX21vZHVsZXMvZDMtc2NhbGUvc3JjL2NvbnN0YW50LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9kMy1zY2FsZS9zcmMvbnVtYmVyLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9kMy1zY2FsZS9zcmMvY29udGludW91cy5qcyIsICIuLi9ub2RlX21vZHVsZXMvZDMtc2NhbGUvc3JjL3RpY2tGb3JtYXQuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2QzLXNjYWxlL3NyYy9saW5lYXIuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2QzLXNoYXBlL3NyYy9jb25zdGFudC5qcyIsICIuLi9ub2RlX21vZHVsZXMvZDMtc2hhcGUvc3JjL21hdGguanMiLCAiLi4vbm9kZV9tb2R1bGVzL2QzLXNoYXBlL3NyYy9hcnJheS5qcyIsICIuLi9ub2RlX21vZHVsZXMvZDMtc2hhcGUvc3JjL2N1cnZlL2xpbmVhci5qcyIsICIuLi9ub2RlX21vZHVsZXMvZDMtc2hhcGUvc3JjL3BvaW50LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9kMy1zaGFwZS9zcmMvbGluZS5qcyIsICIuLi9ub2RlX21vZHVsZXMvZDMtc2hhcGUvc3JjL2N1cnZlL2NhcmRpbmFsLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9kMy1zaGFwZS9zcmMvY3VydmUvY2F0bXVsbFJvbS5qcyIsICIuLi9ub2RlX21vZHVsZXMvZDMtem9vbS9zcmMvdHJhbnNmb3JtLmpzIiwgIi4uL3NyYy9wbG90L0Nvbm5lY3RlZFNjYXR0ZXJwbG90LnRzIiwgIi4uL3NyYy91dGlscy9zdHlsZS50cyIsICIuLi9zcmMvdXRpbHMvY2FudmFzLnRzIiwgIi4uL3NyYy91dGlscy9nZW8udHMiLCAiLi4vc3JjL01hemVWaWV3Q2FyZC5zdmVsdGUiLCAiLi4vc3JjL2luZGV4LnN2ZWx0ZSIsICIuLi9zcmMvZW50cnkudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIlwidXNlIHN0cmljdFwiO1xyXG5tb2R1bGUuZXhwb3J0cyA9IGFzUHJvbWlzZTtcclxuXHJcbi8qKlxyXG4gKiBDYWxsYmFjayBhcyB1c2VkIGJ5IHtAbGluayB1dGlsLmFzUHJvbWlzZX0uXHJcbiAqIEB0eXBlZGVmIGFzUHJvbWlzZUNhbGxiYWNrXHJcbiAqIEB0eXBlIHtmdW5jdGlvbn1cclxuICogQHBhcmFtIHtFcnJvcnxudWxsfSBlcnJvciBFcnJvciwgaWYgYW55XHJcbiAqIEBwYXJhbSB7Li4uKn0gcGFyYW1zIEFkZGl0aW9uYWwgYXJndW1lbnRzXHJcbiAqIEByZXR1cm5zIHt1bmRlZmluZWR9XHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgYSBwcm9taXNlIGZyb20gYSBub2RlLXN0eWxlIGNhbGxiYWNrIGZ1bmN0aW9uLlxyXG4gKiBAbWVtYmVyb2YgdXRpbFxyXG4gKiBAcGFyYW0ge2FzUHJvbWlzZUNhbGxiYWNrfSBmbiBGdW5jdGlvbiB0byBjYWxsXHJcbiAqIEBwYXJhbSB7Kn0gY3R4IEZ1bmN0aW9uIGNvbnRleHRcclxuICogQHBhcmFtIHsuLi4qfSBwYXJhbXMgRnVuY3Rpb24gYXJndW1lbnRzXHJcbiAqIEByZXR1cm5zIHtQcm9taXNlPCo+fSBQcm9taXNpZmllZCBmdW5jdGlvblxyXG4gKi9cclxuZnVuY3Rpb24gYXNQcm9taXNlKGZuLCBjdHgvKiwgdmFyYXJncyAqLykge1xyXG4gICAgdmFyIHBhcmFtcyAgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpLFxyXG4gICAgICAgIG9mZnNldCAgPSAwLFxyXG4gICAgICAgIGluZGV4ICAgPSAyLFxyXG4gICAgICAgIHBlbmRpbmcgPSB0cnVlO1xyXG4gICAgd2hpbGUgKGluZGV4IDwgYXJndW1lbnRzLmxlbmd0aClcclxuICAgICAgICBwYXJhbXNbb2Zmc2V0KytdID0gYXJndW1lbnRzW2luZGV4KytdO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIGV4ZWN1dG9yKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIHBhcmFtc1tvZmZzZXRdID0gZnVuY3Rpb24gY2FsbGJhY2soZXJyLyosIHZhcmFyZ3MgKi8pIHtcclxuICAgICAgICAgICAgaWYgKHBlbmRpbmcpIHtcclxuICAgICAgICAgICAgICAgIHBlbmRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGlmIChlcnIpXHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcGFyYW1zID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB3aGlsZSAob2Zmc2V0IDwgcGFyYW1zLmxlbmd0aClcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zW29mZnNldCsrXSA9IGFyZ3VtZW50c1tvZmZzZXRdO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUuYXBwbHkobnVsbCwgcGFyYW1zKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgZm4uYXBwbHkoY3R4IHx8IG51bGwsIHBhcmFtcyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIGlmIChwZW5kaW5nKSB7XHJcbiAgICAgICAgICAgICAgICBwZW5kaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcbiIsICJcInVzZSBzdHJpY3RcIjtcclxuXHJcbi8qKlxyXG4gKiBBIG1pbmltYWwgYmFzZTY0IGltcGxlbWVudGF0aW9uIGZvciBudW1iZXIgYXJyYXlzLlxyXG4gKiBAbWVtYmVyb2YgdXRpbFxyXG4gKiBAbmFtZXNwYWNlXHJcbiAqL1xyXG52YXIgYmFzZTY0ID0gZXhwb3J0cztcclxuXHJcbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSBieXRlIGxlbmd0aCBvZiBhIGJhc2U2NCBlbmNvZGVkIHN0cmluZy5cclxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyBCYXNlNjQgZW5jb2RlZCBzdHJpbmdcclxuICogQHJldHVybnMge251bWJlcn0gQnl0ZSBsZW5ndGhcclxuICovXHJcbmJhc2U2NC5sZW5ndGggPSBmdW5jdGlvbiBsZW5ndGgoc3RyaW5nKSB7XHJcbiAgICB2YXIgcCA9IHN0cmluZy5sZW5ndGg7XHJcbiAgICBpZiAoIXApXHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB2YXIgbiA9IDA7XHJcbiAgICB3aGlsZSAoLS1wICUgNCA+IDEgJiYgc3RyaW5nLmNoYXJBdChwKSA9PT0gXCI9XCIpXHJcbiAgICAgICAgKytuO1xyXG4gICAgcmV0dXJuIE1hdGguY2VpbChzdHJpbmcubGVuZ3RoICogMykgLyA0IC0gbjtcclxufTtcclxuXHJcbi8vIEJhc2U2NCBlbmNvZGluZyB0YWJsZVxyXG52YXIgYjY0ID0gbmV3IEFycmF5KDY0KTtcclxuXHJcbi8vIEJhc2U2NCBkZWNvZGluZyB0YWJsZVxyXG52YXIgczY0ID0gbmV3IEFycmF5KDEyMyk7XHJcblxyXG4vLyA2NS4uOTAsIDk3Li4xMjIsIDQ4Li41NywgNDMsIDQ3XHJcbmZvciAodmFyIGkgPSAwOyBpIDwgNjQ7KVxyXG4gICAgczY0W2I2NFtpXSA9IGkgPCAyNiA/IGkgKyA2NSA6IGkgPCA1MiA/IGkgKyA3MSA6IGkgPCA2MiA/IGkgLSA0IDogaSAtIDU5IHwgNDNdID0gaSsrO1xyXG5cclxuLyoqXHJcbiAqIEVuY29kZXMgYSBidWZmZXIgdG8gYSBiYXNlNjQgZW5jb2RlZCBzdHJpbmcuXHJcbiAqIEBwYXJhbSB7VWludDhBcnJheX0gYnVmZmVyIFNvdXJjZSBidWZmZXJcclxuICogQHBhcmFtIHtudW1iZXJ9IHN0YXJ0IFNvdXJjZSBzdGFydFxyXG4gKiBAcGFyYW0ge251bWJlcn0gZW5kIFNvdXJjZSBlbmRcclxuICogQHJldHVybnMge3N0cmluZ30gQmFzZTY0IGVuY29kZWQgc3RyaW5nXHJcbiAqL1xyXG5iYXNlNjQuZW5jb2RlID0gZnVuY3Rpb24gZW5jb2RlKGJ1ZmZlciwgc3RhcnQsIGVuZCkge1xyXG4gICAgdmFyIHBhcnRzID0gbnVsbCxcclxuICAgICAgICBjaHVuayA9IFtdO1xyXG4gICAgdmFyIGkgPSAwLCAvLyBvdXRwdXQgaW5kZXhcclxuICAgICAgICBqID0gMCwgLy8gZ290byBpbmRleFxyXG4gICAgICAgIHQ7ICAgICAvLyB0ZW1wb3JhcnlcclxuICAgIHdoaWxlIChzdGFydCA8IGVuZCkge1xyXG4gICAgICAgIHZhciBiID0gYnVmZmVyW3N0YXJ0KytdO1xyXG4gICAgICAgIHN3aXRjaCAoaikge1xyXG4gICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICBjaHVua1tpKytdID0gYjY0W2IgPj4gMl07XHJcbiAgICAgICAgICAgICAgICB0ID0gKGIgJiAzKSA8PCA0O1xyXG4gICAgICAgICAgICAgICAgaiA9IDE7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgY2h1bmtbaSsrXSA9IGI2NFt0IHwgYiA+PiA0XTtcclxuICAgICAgICAgICAgICAgIHQgPSAoYiAmIDE1KSA8PCAyO1xyXG4gICAgICAgICAgICAgICAgaiA9IDI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgY2h1bmtbaSsrXSA9IGI2NFt0IHwgYiA+PiA2XTtcclxuICAgICAgICAgICAgICAgIGNodW5rW2krK10gPSBiNjRbYiAmIDYzXTtcclxuICAgICAgICAgICAgICAgIGogPSAwO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpID4gODE5MSkge1xyXG4gICAgICAgICAgICAocGFydHMgfHwgKHBhcnRzID0gW10pKS5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoU3RyaW5nLCBjaHVuaykpO1xyXG4gICAgICAgICAgICBpID0gMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoaikge1xyXG4gICAgICAgIGNodW5rW2krK10gPSBiNjRbdF07XHJcbiAgICAgICAgY2h1bmtbaSsrXSA9IDYxO1xyXG4gICAgICAgIGlmIChqID09PSAxKVxyXG4gICAgICAgICAgICBjaHVua1tpKytdID0gNjE7XHJcbiAgICB9XHJcbiAgICBpZiAocGFydHMpIHtcclxuICAgICAgICBpZiAoaSlcclxuICAgICAgICAgICAgcGFydHMucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFN0cmluZywgY2h1bmsuc2xpY2UoMCwgaSkpKTtcclxuICAgICAgICByZXR1cm4gcGFydHMuam9pbihcIlwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFN0cmluZywgY2h1bmsuc2xpY2UoMCwgaSkpO1xyXG59O1xyXG5cclxudmFyIGludmFsaWRFbmNvZGluZyA9IFwiaW52YWxpZCBlbmNvZGluZ1wiO1xyXG5cclxuLyoqXHJcbiAqIERlY29kZXMgYSBiYXNlNjQgZW5jb2RlZCBzdHJpbmcgdG8gYSBidWZmZXIuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgU291cmNlIHN0cmluZ1xyXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IGJ1ZmZlciBEZXN0aW5hdGlvbiBidWZmZXJcclxuICogQHBhcmFtIHtudW1iZXJ9IG9mZnNldCBEZXN0aW5hdGlvbiBvZmZzZXRcclxuICogQHJldHVybnMge251bWJlcn0gTnVtYmVyIG9mIGJ5dGVzIHdyaXR0ZW5cclxuICogQHRocm93cyB7RXJyb3J9IElmIGVuY29kaW5nIGlzIGludmFsaWRcclxuICovXHJcbmJhc2U2NC5kZWNvZGUgPSBmdW5jdGlvbiBkZWNvZGUoc3RyaW5nLCBidWZmZXIsIG9mZnNldCkge1xyXG4gICAgdmFyIHN0YXJ0ID0gb2Zmc2V0O1xyXG4gICAgdmFyIGogPSAwLCAvLyBnb3RvIGluZGV4XHJcbiAgICAgICAgdDsgICAgIC8vIHRlbXBvcmFyeVxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHJpbmcubGVuZ3RoOykge1xyXG4gICAgICAgIHZhciBjID0gc3RyaW5nLmNoYXJDb2RlQXQoaSsrKTtcclxuICAgICAgICBpZiAoYyA9PT0gNjEgJiYgaiA+IDEpXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGlmICgoYyA9IHM2NFtjXSkgPT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgdGhyb3cgRXJyb3IoaW52YWxpZEVuY29kaW5nKTtcclxuICAgICAgICBzd2l0Y2ggKGopIHtcclxuICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgdCA9IGM7XHJcbiAgICAgICAgICAgICAgICBqID0gMTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICBidWZmZXJbb2Zmc2V0KytdID0gdCA8PCAyIHwgKGMgJiA0OCkgPj4gNDtcclxuICAgICAgICAgICAgICAgIHQgPSBjO1xyXG4gICAgICAgICAgICAgICAgaiA9IDI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgYnVmZmVyW29mZnNldCsrXSA9ICh0ICYgMTUpIDw8IDQgfCAoYyAmIDYwKSA+PiAyO1xyXG4gICAgICAgICAgICAgICAgdCA9IGM7XHJcbiAgICAgICAgICAgICAgICBqID0gMztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICBidWZmZXJbb2Zmc2V0KytdID0gKHQgJiAzKSA8PCA2IHwgYztcclxuICAgICAgICAgICAgICAgIGogPSAwO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKGogPT09IDEpXHJcbiAgICAgICAgdGhyb3cgRXJyb3IoaW52YWxpZEVuY29kaW5nKTtcclxuICAgIHJldHVybiBvZmZzZXQgLSBzdGFydDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUZXN0cyBpZiB0aGUgc3BlY2lmaWVkIHN0cmluZyBhcHBlYXJzIHRvIGJlIGJhc2U2NCBlbmNvZGVkLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIFN0cmluZyB0byB0ZXN0XHJcbiAqIEByZXR1cm5zIHtib29sZWFufSBgdHJ1ZWAgaWYgcHJvYmFibHkgYmFzZTY0IGVuY29kZWQsIG90aGVyd2lzZSBmYWxzZVxyXG4gKi9cclxuYmFzZTY0LnRlc3QgPSBmdW5jdGlvbiB0ZXN0KHN0cmluZykge1xyXG4gICAgcmV0dXJuIC9eKD86W0EtWmEtejAtOSsvXXs0fSkqKD86W0EtWmEtejAtOSsvXXsyfT09fFtBLVphLXowLTkrL117M309KT8kLy50ZXN0KHN0cmluZyk7XHJcbn07XHJcbiIsICJcInVzZSBzdHJpY3RcIjtcclxubW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XHJcblxyXG4vKipcclxuICogQ29uc3RydWN0cyBhIG5ldyBldmVudCBlbWl0dGVyIGluc3RhbmNlLlxyXG4gKiBAY2xhc3NkZXNjIEEgbWluaW1hbCBldmVudCBlbWl0dGVyLlxyXG4gKiBAbWVtYmVyb2YgdXRpbFxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlZ2lzdGVyZWQgbGlzdGVuZXJzLlxyXG4gICAgICogQHR5cGUge09iamVjdC48c3RyaW5nLCo+fVxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgdGhpcy5fbGlzdGVuZXJzID0ge307XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZWdpc3RlcnMgYW4gZXZlbnQgbGlzdGVuZXIuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBldnQgRXZlbnQgbmFtZVxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBmbiBMaXN0ZW5lclxyXG4gKiBAcGFyYW0geyp9IFtjdHhdIExpc3RlbmVyIGNvbnRleHRcclxuICogQHJldHVybnMge3V0aWwuRXZlbnRFbWl0dGVyfSBgdGhpc2BcclxuICovXHJcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBmdW5jdGlvbiBvbihldnQsIGZuLCBjdHgpIHtcclxuICAgICh0aGlzLl9saXN0ZW5lcnNbZXZ0XSB8fCAodGhpcy5fbGlzdGVuZXJzW2V2dF0gPSBbXSkpLnB1c2goe1xyXG4gICAgICAgIGZuICA6IGZuLFxyXG4gICAgICAgIGN0eCA6IGN0eCB8fCB0aGlzXHJcbiAgICB9KTtcclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZXMgYW4gZXZlbnQgbGlzdGVuZXIgb3IgYW55IG1hdGNoaW5nIGxpc3RlbmVycyBpZiBhcmd1bWVudHMgYXJlIG9taXR0ZWQuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBbZXZ0XSBFdmVudCBuYW1lLiBSZW1vdmVzIGFsbCBsaXN0ZW5lcnMgaWYgb21pdHRlZC5cclxuICogQHBhcmFtIHtmdW5jdGlvbn0gW2ZuXSBMaXN0ZW5lciB0byByZW1vdmUuIFJlbW92ZXMgYWxsIGxpc3RlbmVycyBvZiBgZXZ0YCBpZiBvbWl0dGVkLlxyXG4gKiBAcmV0dXJucyB7dXRpbC5FdmVudEVtaXR0ZXJ9IGB0aGlzYFxyXG4gKi9cclxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbiBvZmYoZXZ0LCBmbikge1xyXG4gICAgaWYgKGV2dCA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgIHRoaXMuX2xpc3RlbmVycyA9IHt9O1xyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgaWYgKGZuID09PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVyc1tldnRdID0gW107XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9saXN0ZW5lcnNbZXZ0XTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOylcclxuICAgICAgICAgICAgICAgIGlmIChsaXN0ZW5lcnNbaV0uZm4gPT09IGZuKVxyXG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVycy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgKytpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEVtaXRzIGFuIGV2ZW50IGJ5IGNhbGxpbmcgaXRzIGxpc3RlbmVycyB3aXRoIHRoZSBzcGVjaWZpZWQgYXJndW1lbnRzLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZ0IEV2ZW50IG5hbWVcclxuICogQHBhcmFtIHsuLi4qfSBhcmdzIEFyZ3VtZW50c1xyXG4gKiBAcmV0dXJucyB7dXRpbC5FdmVudEVtaXR0ZXJ9IGB0aGlzYFxyXG4gKi9cclxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdChldnQpIHtcclxuICAgIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9saXN0ZW5lcnNbZXZ0XTtcclxuICAgIGlmIChsaXN0ZW5lcnMpIHtcclxuICAgICAgICB2YXIgYXJncyA9IFtdLFxyXG4gICAgICAgICAgICBpID0gMTtcclxuICAgICAgICBmb3IgKDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7KVxyXG4gICAgICAgICAgICBhcmdzLnB1c2goYXJndW1lbnRzW2krK10pO1xyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOylcclxuICAgICAgICAgICAgbGlzdGVuZXJzW2ldLmZuLmFwcGx5KGxpc3RlbmVyc1tpKytdLmN0eCwgYXJncyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuIiwgIlwidXNlIHN0cmljdFwiO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KGZhY3RvcnkpO1xyXG5cclxuLyoqXHJcbiAqIFJlYWRzIC8gd3JpdGVzIGZsb2F0cyAvIGRvdWJsZXMgZnJvbSAvIHRvIGJ1ZmZlcnMuXHJcbiAqIEBuYW1lIHV0aWwuZmxvYXRcclxuICogQG5hbWVzcGFjZVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBXcml0ZXMgYSAzMiBiaXQgZmxvYXQgdG8gYSBidWZmZXIgdXNpbmcgbGl0dGxlIGVuZGlhbiBieXRlIG9yZGVyLlxyXG4gKiBAbmFtZSB1dGlsLmZsb2F0LndyaXRlRmxvYXRMRVxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHtudW1iZXJ9IHZhbCBWYWx1ZSB0byB3cml0ZVxyXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IGJ1ZiBUYXJnZXQgYnVmZmVyXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBwb3MgVGFyZ2V0IGJ1ZmZlciBvZmZzZXRcclxuICogQHJldHVybnMge3VuZGVmaW5lZH1cclxuICovXHJcblxyXG4vKipcclxuICogV3JpdGVzIGEgMzIgYml0IGZsb2F0IHRvIGEgYnVmZmVyIHVzaW5nIGJpZyBlbmRpYW4gYnl0ZSBvcmRlci5cclxuICogQG5hbWUgdXRpbC5mbG9hdC53cml0ZUZsb2F0QkVcclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWwgVmFsdWUgdG8gd3JpdGVcclxuICogQHBhcmFtIHtVaW50OEFycmF5fSBidWYgVGFyZ2V0IGJ1ZmZlclxyXG4gKiBAcGFyYW0ge251bWJlcn0gcG9zIFRhcmdldCBidWZmZXIgb2Zmc2V0XHJcbiAqIEByZXR1cm5zIHt1bmRlZmluZWR9XHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFJlYWRzIGEgMzIgYml0IGZsb2F0IGZyb20gYSBidWZmZXIgdXNpbmcgbGl0dGxlIGVuZGlhbiBieXRlIG9yZGVyLlxyXG4gKiBAbmFtZSB1dGlsLmZsb2F0LnJlYWRGbG9hdExFXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IGJ1ZiBTb3VyY2UgYnVmZmVyXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBwb3MgU291cmNlIGJ1ZmZlciBvZmZzZXRcclxuICogQHJldHVybnMge251bWJlcn0gVmFsdWUgcmVhZFxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBSZWFkcyBhIDMyIGJpdCBmbG9hdCBmcm9tIGEgYnVmZmVyIHVzaW5nIGJpZyBlbmRpYW4gYnl0ZSBvcmRlci5cclxuICogQG5hbWUgdXRpbC5mbG9hdC5yZWFkRmxvYXRCRVxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHtVaW50OEFycmF5fSBidWYgU291cmNlIGJ1ZmZlclxyXG4gKiBAcGFyYW0ge251bWJlcn0gcG9zIFNvdXJjZSBidWZmZXIgb2Zmc2V0XHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFZhbHVlIHJlYWRcclxuICovXHJcblxyXG4vKipcclxuICogV3JpdGVzIGEgNjQgYml0IGRvdWJsZSB0byBhIGJ1ZmZlciB1c2luZyBsaXR0bGUgZW5kaWFuIGJ5dGUgb3JkZXIuXHJcbiAqIEBuYW1lIHV0aWwuZmxvYXQud3JpdGVEb3VibGVMRVxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHtudW1iZXJ9IHZhbCBWYWx1ZSB0byB3cml0ZVxyXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IGJ1ZiBUYXJnZXQgYnVmZmVyXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBwb3MgVGFyZ2V0IGJ1ZmZlciBvZmZzZXRcclxuICogQHJldHVybnMge3VuZGVmaW5lZH1cclxuICovXHJcblxyXG4vKipcclxuICogV3JpdGVzIGEgNjQgYml0IGRvdWJsZSB0byBhIGJ1ZmZlciB1c2luZyBiaWcgZW5kaWFuIGJ5dGUgb3JkZXIuXHJcbiAqIEBuYW1lIHV0aWwuZmxvYXQud3JpdGVEb3VibGVCRVxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHtudW1iZXJ9IHZhbCBWYWx1ZSB0byB3cml0ZVxyXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IGJ1ZiBUYXJnZXQgYnVmZmVyXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBwb3MgVGFyZ2V0IGJ1ZmZlciBvZmZzZXRcclxuICogQHJldHVybnMge3VuZGVmaW5lZH1cclxuICovXHJcblxyXG4vKipcclxuICogUmVhZHMgYSA2NCBiaXQgZG91YmxlIGZyb20gYSBidWZmZXIgdXNpbmcgbGl0dGxlIGVuZGlhbiBieXRlIG9yZGVyLlxyXG4gKiBAbmFtZSB1dGlsLmZsb2F0LnJlYWREb3VibGVMRVxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHtVaW50OEFycmF5fSBidWYgU291cmNlIGJ1ZmZlclxyXG4gKiBAcGFyYW0ge251bWJlcn0gcG9zIFNvdXJjZSBidWZmZXIgb2Zmc2V0XHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFZhbHVlIHJlYWRcclxuICovXHJcblxyXG4vKipcclxuICogUmVhZHMgYSA2NCBiaXQgZG91YmxlIGZyb20gYSBidWZmZXIgdXNpbmcgYmlnIGVuZGlhbiBieXRlIG9yZGVyLlxyXG4gKiBAbmFtZSB1dGlsLmZsb2F0LnJlYWREb3VibGVCRVxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHtVaW50OEFycmF5fSBidWYgU291cmNlIGJ1ZmZlclxyXG4gKiBAcGFyYW0ge251bWJlcn0gcG9zIFNvdXJjZSBidWZmZXIgb2Zmc2V0XHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFZhbHVlIHJlYWRcclxuICovXHJcblxyXG4vLyBGYWN0b3J5IGZ1bmN0aW9uIGZvciB0aGUgcHVycG9zZSBvZiBub2RlLWJhc2VkIHRlc3RpbmcgaW4gbW9kaWZpZWQgZ2xvYmFsIGVudmlyb25tZW50c1xyXG5mdW5jdGlvbiBmYWN0b3J5KGV4cG9ydHMpIHtcclxuXHJcbiAgICAvLyBmbG9hdDogdHlwZWQgYXJyYXlcclxuICAgIGlmICh0eXBlb2YgRmxvYXQzMkFycmF5ICE9PSBcInVuZGVmaW5lZFwiKSAoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIHZhciBmMzIgPSBuZXcgRmxvYXQzMkFycmF5KFsgLTAgXSksXHJcbiAgICAgICAgICAgIGY4YiA9IG5ldyBVaW50OEFycmF5KGYzMi5idWZmZXIpLFxyXG4gICAgICAgICAgICBsZSAgPSBmOGJbM10gPT09IDEyODtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gd3JpdGVGbG9hdF9mMzJfY3B5KHZhbCwgYnVmLCBwb3MpIHtcclxuICAgICAgICAgICAgZjMyWzBdID0gdmFsO1xyXG4gICAgICAgICAgICBidWZbcG9zICAgIF0gPSBmOGJbMF07XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgKyAxXSA9IGY4YlsxXTtcclxuICAgICAgICAgICAgYnVmW3BvcyArIDJdID0gZjhiWzJdO1xyXG4gICAgICAgICAgICBidWZbcG9zICsgM10gPSBmOGJbM107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiB3cml0ZUZsb2F0X2YzMl9yZXYodmFsLCBidWYsIHBvcykge1xyXG4gICAgICAgICAgICBmMzJbMF0gPSB2YWw7XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgICAgXSA9IGY4YlszXTtcclxuICAgICAgICAgICAgYnVmW3BvcyArIDFdID0gZjhiWzJdO1xyXG4gICAgICAgICAgICBidWZbcG9zICsgMl0gPSBmOGJbMV07XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgKyAzXSA9IGY4YlswXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICAgICAgZXhwb3J0cy53cml0ZUZsb2F0TEUgPSBsZSA/IHdyaXRlRmxvYXRfZjMyX2NweSA6IHdyaXRlRmxvYXRfZjMyX3JldjtcclxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xyXG4gICAgICAgIGV4cG9ydHMud3JpdGVGbG9hdEJFID0gbGUgPyB3cml0ZUZsb2F0X2YzMl9yZXYgOiB3cml0ZUZsb2F0X2YzMl9jcHk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHJlYWRGbG9hdF9mMzJfY3B5KGJ1ZiwgcG9zKSB7XHJcbiAgICAgICAgICAgIGY4YlswXSA9IGJ1Zltwb3MgICAgXTtcclxuICAgICAgICAgICAgZjhiWzFdID0gYnVmW3BvcyArIDFdO1xyXG4gICAgICAgICAgICBmOGJbMl0gPSBidWZbcG9zICsgMl07XHJcbiAgICAgICAgICAgIGY4YlszXSA9IGJ1Zltwb3MgKyAzXTtcclxuICAgICAgICAgICAgcmV0dXJuIGYzMlswXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHJlYWRGbG9hdF9mMzJfcmV2KGJ1ZiwgcG9zKSB7XHJcbiAgICAgICAgICAgIGY4YlszXSA9IGJ1Zltwb3MgICAgXTtcclxuICAgICAgICAgICAgZjhiWzJdID0gYnVmW3BvcyArIDFdO1xyXG4gICAgICAgICAgICBmOGJbMV0gPSBidWZbcG9zICsgMl07XHJcbiAgICAgICAgICAgIGY4YlswXSA9IGJ1Zltwb3MgKyAzXTtcclxuICAgICAgICAgICAgcmV0dXJuIGYzMlswXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICAgICAgZXhwb3J0cy5yZWFkRmxvYXRMRSA9IGxlID8gcmVhZEZsb2F0X2YzMl9jcHkgOiByZWFkRmxvYXRfZjMyX3JldjtcclxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xyXG4gICAgICAgIGV4cG9ydHMucmVhZEZsb2F0QkUgPSBsZSA/IHJlYWRGbG9hdF9mMzJfcmV2IDogcmVhZEZsb2F0X2YzMl9jcHk7XHJcblxyXG4gICAgLy8gZmxvYXQ6IGllZWU3NTRcclxuICAgIH0pKCk7IGVsc2UgKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICBmdW5jdGlvbiB3cml0ZUZsb2F0X2llZWU3NTQod3JpdGVVaW50LCB2YWwsIGJ1ZiwgcG9zKSB7XHJcbiAgICAgICAgICAgIHZhciBzaWduID0gdmFsIDwgMCA/IDEgOiAwO1xyXG4gICAgICAgICAgICBpZiAoc2lnbilcclxuICAgICAgICAgICAgICAgIHZhbCA9IC12YWw7XHJcbiAgICAgICAgICAgIGlmICh2YWwgPT09IDApXHJcbiAgICAgICAgICAgICAgICB3cml0ZVVpbnQoMSAvIHZhbCA+IDAgPyAvKiBwb3NpdGl2ZSAqLyAwIDogLyogbmVnYXRpdmUgMCAqLyAyMTQ3NDgzNjQ4LCBidWYsIHBvcyk7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGlzTmFOKHZhbCkpXHJcbiAgICAgICAgICAgICAgICB3cml0ZVVpbnQoMjE0MzI4OTM0NCwgYnVmLCBwb3MpO1xyXG4gICAgICAgICAgICBlbHNlIGlmICh2YWwgPiAzLjQwMjgyMzQ2NjM4NTI4ODZlKzM4KSAvLyArLUluZmluaXR5XHJcbiAgICAgICAgICAgICAgICB3cml0ZVVpbnQoKHNpZ24gPDwgMzEgfCAyMTM5MDk1MDQwKSA+Pj4gMCwgYnVmLCBwb3MpO1xyXG4gICAgICAgICAgICBlbHNlIGlmICh2YWwgPCAxLjE3NTQ5NDM1MDgyMjI4NzVlLTM4KSAvLyBkZW5vcm1hbFxyXG4gICAgICAgICAgICAgICAgd3JpdGVVaW50KChzaWduIDw8IDMxIHwgTWF0aC5yb3VuZCh2YWwgLyAxLjQwMTI5ODQ2NDMyNDgxN2UtNDUpKSA+Pj4gMCwgYnVmLCBwb3MpO1xyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciBleHBvbmVudCA9IE1hdGguZmxvb3IoTWF0aC5sb2codmFsKSAvIE1hdGguTE4yKSxcclxuICAgICAgICAgICAgICAgICAgICBtYW50aXNzYSA9IE1hdGgucm91bmQodmFsICogTWF0aC5wb3coMiwgLWV4cG9uZW50KSAqIDgzODg2MDgpICYgODM4ODYwNztcclxuICAgICAgICAgICAgICAgIHdyaXRlVWludCgoc2lnbiA8PCAzMSB8IGV4cG9uZW50ICsgMTI3IDw8IDIzIHwgbWFudGlzc2EpID4+PiAwLCBidWYsIHBvcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGV4cG9ydHMud3JpdGVGbG9hdExFID0gd3JpdGVGbG9hdF9pZWVlNzU0LmJpbmQobnVsbCwgd3JpdGVVaW50TEUpO1xyXG4gICAgICAgIGV4cG9ydHMud3JpdGVGbG9hdEJFID0gd3JpdGVGbG9hdF9pZWVlNzU0LmJpbmQobnVsbCwgd3JpdGVVaW50QkUpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiByZWFkRmxvYXRfaWVlZTc1NChyZWFkVWludCwgYnVmLCBwb3MpIHtcclxuICAgICAgICAgICAgdmFyIHVpbnQgPSByZWFkVWludChidWYsIHBvcyksXHJcbiAgICAgICAgICAgICAgICBzaWduID0gKHVpbnQgPj4gMzEpICogMiArIDEsXHJcbiAgICAgICAgICAgICAgICBleHBvbmVudCA9IHVpbnQgPj4+IDIzICYgMjU1LFxyXG4gICAgICAgICAgICAgICAgbWFudGlzc2EgPSB1aW50ICYgODM4ODYwNztcclxuICAgICAgICAgICAgcmV0dXJuIGV4cG9uZW50ID09PSAyNTVcclxuICAgICAgICAgICAgICAgID8gbWFudGlzc2FcclxuICAgICAgICAgICAgICAgID8gTmFOXHJcbiAgICAgICAgICAgICAgICA6IHNpZ24gKiBJbmZpbml0eVxyXG4gICAgICAgICAgICAgICAgOiBleHBvbmVudCA9PT0gMCAvLyBkZW5vcm1hbFxyXG4gICAgICAgICAgICAgICAgPyBzaWduICogMS40MDEyOTg0NjQzMjQ4MTdlLTQ1ICogbWFudGlzc2FcclxuICAgICAgICAgICAgICAgIDogc2lnbiAqIE1hdGgucG93KDIsIGV4cG9uZW50IC0gMTUwKSAqIChtYW50aXNzYSArIDgzODg2MDgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZXhwb3J0cy5yZWFkRmxvYXRMRSA9IHJlYWRGbG9hdF9pZWVlNzU0LmJpbmQobnVsbCwgcmVhZFVpbnRMRSk7XHJcbiAgICAgICAgZXhwb3J0cy5yZWFkRmxvYXRCRSA9IHJlYWRGbG9hdF9pZWVlNzU0LmJpbmQobnVsbCwgcmVhZFVpbnRCRSk7XHJcblxyXG4gICAgfSkoKTtcclxuXHJcbiAgICAvLyBkb3VibGU6IHR5cGVkIGFycmF5XHJcbiAgICBpZiAodHlwZW9mIEZsb2F0NjRBcnJheSAhPT0gXCJ1bmRlZmluZWRcIikgKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB2YXIgZjY0ID0gbmV3IEZsb2F0NjRBcnJheShbLTBdKSxcclxuICAgICAgICAgICAgZjhiID0gbmV3IFVpbnQ4QXJyYXkoZjY0LmJ1ZmZlciksXHJcbiAgICAgICAgICAgIGxlICA9IGY4Yls3XSA9PT0gMTI4O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiB3cml0ZURvdWJsZV9mNjRfY3B5KHZhbCwgYnVmLCBwb3MpIHtcclxuICAgICAgICAgICAgZjY0WzBdID0gdmFsO1xyXG4gICAgICAgICAgICBidWZbcG9zICAgIF0gPSBmOGJbMF07XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgKyAxXSA9IGY4YlsxXTtcclxuICAgICAgICAgICAgYnVmW3BvcyArIDJdID0gZjhiWzJdO1xyXG4gICAgICAgICAgICBidWZbcG9zICsgM10gPSBmOGJbM107XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgKyA0XSA9IGY4Yls0XTtcclxuICAgICAgICAgICAgYnVmW3BvcyArIDVdID0gZjhiWzVdO1xyXG4gICAgICAgICAgICBidWZbcG9zICsgNl0gPSBmOGJbNl07XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgKyA3XSA9IGY4Yls3XTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHdyaXRlRG91YmxlX2Y2NF9yZXYodmFsLCBidWYsIHBvcykge1xyXG4gICAgICAgICAgICBmNjRbMF0gPSB2YWw7XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgICAgXSA9IGY4Yls3XTtcclxuICAgICAgICAgICAgYnVmW3BvcyArIDFdID0gZjhiWzZdO1xyXG4gICAgICAgICAgICBidWZbcG9zICsgMl0gPSBmOGJbNV07XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgKyAzXSA9IGY4Yls0XTtcclxuICAgICAgICAgICAgYnVmW3BvcyArIDRdID0gZjhiWzNdO1xyXG4gICAgICAgICAgICBidWZbcG9zICsgNV0gPSBmOGJbMl07XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgKyA2XSA9IGY4YlsxXTtcclxuICAgICAgICAgICAgYnVmW3BvcyArIDddID0gZjhiWzBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgICAgICBleHBvcnRzLndyaXRlRG91YmxlTEUgPSBsZSA/IHdyaXRlRG91YmxlX2Y2NF9jcHkgOiB3cml0ZURvdWJsZV9mNjRfcmV2O1xyXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICAgICAgZXhwb3J0cy53cml0ZURvdWJsZUJFID0gbGUgPyB3cml0ZURvdWJsZV9mNjRfcmV2IDogd3JpdGVEb3VibGVfZjY0X2NweTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gcmVhZERvdWJsZV9mNjRfY3B5KGJ1ZiwgcG9zKSB7XHJcbiAgICAgICAgICAgIGY4YlswXSA9IGJ1Zltwb3MgICAgXTtcclxuICAgICAgICAgICAgZjhiWzFdID0gYnVmW3BvcyArIDFdO1xyXG4gICAgICAgICAgICBmOGJbMl0gPSBidWZbcG9zICsgMl07XHJcbiAgICAgICAgICAgIGY4YlszXSA9IGJ1Zltwb3MgKyAzXTtcclxuICAgICAgICAgICAgZjhiWzRdID0gYnVmW3BvcyArIDRdO1xyXG4gICAgICAgICAgICBmOGJbNV0gPSBidWZbcG9zICsgNV07XHJcbiAgICAgICAgICAgIGY4Yls2XSA9IGJ1Zltwb3MgKyA2XTtcclxuICAgICAgICAgICAgZjhiWzddID0gYnVmW3BvcyArIDddO1xyXG4gICAgICAgICAgICByZXR1cm4gZjY0WzBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gcmVhZERvdWJsZV9mNjRfcmV2KGJ1ZiwgcG9zKSB7XHJcbiAgICAgICAgICAgIGY4Yls3XSA9IGJ1Zltwb3MgICAgXTtcclxuICAgICAgICAgICAgZjhiWzZdID0gYnVmW3BvcyArIDFdO1xyXG4gICAgICAgICAgICBmOGJbNV0gPSBidWZbcG9zICsgMl07XHJcbiAgICAgICAgICAgIGY4Yls0XSA9IGJ1Zltwb3MgKyAzXTtcclxuICAgICAgICAgICAgZjhiWzNdID0gYnVmW3BvcyArIDRdO1xyXG4gICAgICAgICAgICBmOGJbMl0gPSBidWZbcG9zICsgNV07XHJcbiAgICAgICAgICAgIGY4YlsxXSA9IGJ1Zltwb3MgKyA2XTtcclxuICAgICAgICAgICAgZjhiWzBdID0gYnVmW3BvcyArIDddO1xyXG4gICAgICAgICAgICByZXR1cm4gZjY0WzBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgICAgICBleHBvcnRzLnJlYWREb3VibGVMRSA9IGxlID8gcmVhZERvdWJsZV9mNjRfY3B5IDogcmVhZERvdWJsZV9mNjRfcmV2O1xyXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICAgICAgZXhwb3J0cy5yZWFkRG91YmxlQkUgPSBsZSA/IHJlYWREb3VibGVfZjY0X3JldiA6IHJlYWREb3VibGVfZjY0X2NweTtcclxuXHJcbiAgICAvLyBkb3VibGU6IGllZWU3NTRcclxuICAgIH0pKCk7IGVsc2UgKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICBmdW5jdGlvbiB3cml0ZURvdWJsZV9pZWVlNzU0KHdyaXRlVWludCwgb2ZmMCwgb2ZmMSwgdmFsLCBidWYsIHBvcykge1xyXG4gICAgICAgICAgICB2YXIgc2lnbiA9IHZhbCA8IDAgPyAxIDogMDtcclxuICAgICAgICAgICAgaWYgKHNpZ24pXHJcbiAgICAgICAgICAgICAgICB2YWwgPSAtdmFsO1xyXG4gICAgICAgICAgICBpZiAodmFsID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB3cml0ZVVpbnQoMCwgYnVmLCBwb3MgKyBvZmYwKTtcclxuICAgICAgICAgICAgICAgIHdyaXRlVWludCgxIC8gdmFsID4gMCA/IC8qIHBvc2l0aXZlICovIDAgOiAvKiBuZWdhdGl2ZSAwICovIDIxNDc0ODM2NDgsIGJ1ZiwgcG9zICsgb2ZmMSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNOYU4odmFsKSkge1xyXG4gICAgICAgICAgICAgICAgd3JpdGVVaW50KDAsIGJ1ZiwgcG9zICsgb2ZmMCk7XHJcbiAgICAgICAgICAgICAgICB3cml0ZVVpbnQoMjE0Njk1OTM2MCwgYnVmLCBwb3MgKyBvZmYxKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh2YWwgPiAxLjc5NzY5MzEzNDg2MjMxNTdlKzMwOCkgeyAvLyArLUluZmluaXR5XHJcbiAgICAgICAgICAgICAgICB3cml0ZVVpbnQoMCwgYnVmLCBwb3MgKyBvZmYwKTtcclxuICAgICAgICAgICAgICAgIHdyaXRlVWludCgoc2lnbiA8PCAzMSB8IDIxNDY0MzUwNzIpID4+PiAwLCBidWYsIHBvcyArIG9mZjEpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIG1hbnRpc3NhO1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbCA8IDIuMjI1MDczODU4NTA3MjAxNGUtMzA4KSB7IC8vIGRlbm9ybWFsXHJcbiAgICAgICAgICAgICAgICAgICAgbWFudGlzc2EgPSB2YWwgLyA1ZS0zMjQ7XHJcbiAgICAgICAgICAgICAgICAgICAgd3JpdGVVaW50KG1hbnRpc3NhID4+PiAwLCBidWYsIHBvcyArIG9mZjApO1xyXG4gICAgICAgICAgICAgICAgICAgIHdyaXRlVWludCgoc2lnbiA8PCAzMSB8IG1hbnRpc3NhIC8gNDI5NDk2NzI5NikgPj4+IDAsIGJ1ZiwgcG9zICsgb2ZmMSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBleHBvbmVudCA9IE1hdGguZmxvb3IoTWF0aC5sb2codmFsKSAvIE1hdGguTE4yKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXhwb25lbnQgPT09IDEwMjQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4cG9uZW50ID0gMTAyMztcclxuICAgICAgICAgICAgICAgICAgICBtYW50aXNzYSA9IHZhbCAqIE1hdGgucG93KDIsIC1leHBvbmVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgd3JpdGVVaW50KG1hbnRpc3NhICogNDUwMzU5OTYyNzM3MDQ5NiA+Pj4gMCwgYnVmLCBwb3MgKyBvZmYwKTtcclxuICAgICAgICAgICAgICAgICAgICB3cml0ZVVpbnQoKHNpZ24gPDwgMzEgfCBleHBvbmVudCArIDEwMjMgPDwgMjAgfCBtYW50aXNzYSAqIDEwNDg1NzYgJiAxMDQ4NTc1KSA+Pj4gMCwgYnVmLCBwb3MgKyBvZmYxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZXhwb3J0cy53cml0ZURvdWJsZUxFID0gd3JpdGVEb3VibGVfaWVlZTc1NC5iaW5kKG51bGwsIHdyaXRlVWludExFLCAwLCA0KTtcclxuICAgICAgICBleHBvcnRzLndyaXRlRG91YmxlQkUgPSB3cml0ZURvdWJsZV9pZWVlNzU0LmJpbmQobnVsbCwgd3JpdGVVaW50QkUsIDQsIDApO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiByZWFkRG91YmxlX2llZWU3NTQocmVhZFVpbnQsIG9mZjAsIG9mZjEsIGJ1ZiwgcG9zKSB7XHJcbiAgICAgICAgICAgIHZhciBsbyA9IHJlYWRVaW50KGJ1ZiwgcG9zICsgb2ZmMCksXHJcbiAgICAgICAgICAgICAgICBoaSA9IHJlYWRVaW50KGJ1ZiwgcG9zICsgb2ZmMSk7XHJcbiAgICAgICAgICAgIHZhciBzaWduID0gKGhpID4+IDMxKSAqIDIgKyAxLFxyXG4gICAgICAgICAgICAgICAgZXhwb25lbnQgPSBoaSA+Pj4gMjAgJiAyMDQ3LFxyXG4gICAgICAgICAgICAgICAgbWFudGlzc2EgPSA0Mjk0OTY3Mjk2ICogKGhpICYgMTA0ODU3NSkgKyBsbztcclxuICAgICAgICAgICAgcmV0dXJuIGV4cG9uZW50ID09PSAyMDQ3XHJcbiAgICAgICAgICAgICAgICA/IG1hbnRpc3NhXHJcbiAgICAgICAgICAgICAgICA/IE5hTlxyXG4gICAgICAgICAgICAgICAgOiBzaWduICogSW5maW5pdHlcclxuICAgICAgICAgICAgICAgIDogZXhwb25lbnQgPT09IDAgLy8gZGVub3JtYWxcclxuICAgICAgICAgICAgICAgID8gc2lnbiAqIDVlLTMyNCAqIG1hbnRpc3NhXHJcbiAgICAgICAgICAgICAgICA6IHNpZ24gKiBNYXRoLnBvdygyLCBleHBvbmVudCAtIDEwNzUpICogKG1hbnRpc3NhICsgNDUwMzU5OTYyNzM3MDQ5Nik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBleHBvcnRzLnJlYWREb3VibGVMRSA9IHJlYWREb3VibGVfaWVlZTc1NC5iaW5kKG51bGwsIHJlYWRVaW50TEUsIDAsIDQpO1xyXG4gICAgICAgIGV4cG9ydHMucmVhZERvdWJsZUJFID0gcmVhZERvdWJsZV9pZWVlNzU0LmJpbmQobnVsbCwgcmVhZFVpbnRCRSwgNCwgMCk7XHJcblxyXG4gICAgfSkoKTtcclxuXHJcbiAgICByZXR1cm4gZXhwb3J0cztcclxufVxyXG5cclxuLy8gdWludCBoZWxwZXJzXHJcblxyXG5mdW5jdGlvbiB3cml0ZVVpbnRMRSh2YWwsIGJ1ZiwgcG9zKSB7XHJcbiAgICBidWZbcG9zICAgIF0gPSAgdmFsICAgICAgICAmIDI1NTtcclxuICAgIGJ1Zltwb3MgKyAxXSA9ICB2YWwgPj4+IDggICYgMjU1O1xyXG4gICAgYnVmW3BvcyArIDJdID0gIHZhbCA+Pj4gMTYgJiAyNTU7XHJcbiAgICBidWZbcG9zICsgM10gPSAgdmFsID4+PiAyNDtcclxufVxyXG5cclxuZnVuY3Rpb24gd3JpdGVVaW50QkUodmFsLCBidWYsIHBvcykge1xyXG4gICAgYnVmW3BvcyAgICBdID0gIHZhbCA+Pj4gMjQ7XHJcbiAgICBidWZbcG9zICsgMV0gPSAgdmFsID4+PiAxNiAmIDI1NTtcclxuICAgIGJ1Zltwb3MgKyAyXSA9ICB2YWwgPj4+IDggICYgMjU1O1xyXG4gICAgYnVmW3BvcyArIDNdID0gIHZhbCAgICAgICAgJiAyNTU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlYWRVaW50TEUoYnVmLCBwb3MpIHtcclxuICAgIHJldHVybiAoYnVmW3BvcyAgICBdXHJcbiAgICAgICAgICB8IGJ1Zltwb3MgKyAxXSA8PCA4XHJcbiAgICAgICAgICB8IGJ1Zltwb3MgKyAyXSA8PCAxNlxyXG4gICAgICAgICAgfCBidWZbcG9zICsgM10gPDwgMjQpID4+PiAwO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZWFkVWludEJFKGJ1ZiwgcG9zKSB7XHJcbiAgICByZXR1cm4gKGJ1Zltwb3MgICAgXSA8PCAyNFxyXG4gICAgICAgICAgfCBidWZbcG9zICsgMV0gPDwgMTZcclxuICAgICAgICAgIHwgYnVmW3BvcyArIDJdIDw8IDhcclxuICAgICAgICAgIHwgYnVmW3BvcyArIDNdKSA+Pj4gMDtcclxufVxyXG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XHJcbm1vZHVsZS5leHBvcnRzID0gaW5xdWlyZTtcclxuXHJcbi8qKlxyXG4gKiBSZXF1aXJlcyBhIG1vZHVsZSBvbmx5IGlmIGF2YWlsYWJsZS5cclxuICogQG1lbWJlcm9mIHV0aWxcclxuICogQHBhcmFtIHtzdHJpbmd9IG1vZHVsZU5hbWUgTW9kdWxlIHRvIHJlcXVpcmVcclxuICogQHJldHVybnMgez9PYmplY3R9IFJlcXVpcmVkIG1vZHVsZSBpZiBhdmFpbGFibGUgYW5kIG5vdCBlbXB0eSwgb3RoZXJ3aXNlIGBudWxsYFxyXG4gKi9cclxuZnVuY3Rpb24gaW5xdWlyZShtb2R1bGVOYW1lKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHZhciBtb2QgPSBldmFsKFwicXVpcmVcIi5yZXBsYWNlKC9eLyxcInJlXCIpKShtb2R1bGVOYW1lKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1ldmFsXHJcbiAgICAgICAgaWYgKG1vZCAmJiAobW9kLmxlbmd0aCB8fCBPYmplY3Qua2V5cyhtb2QpLmxlbmd0aCkpXHJcbiAgICAgICAgICAgIHJldHVybiBtb2Q7XHJcbiAgICB9IGNhdGNoIChlKSB7fSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWVtcHR5XHJcbiAgICByZXR1cm4gbnVsbDtcclxufVxyXG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4vKipcclxuICogQSBtaW5pbWFsIFVURjggaW1wbGVtZW50YXRpb24gZm9yIG51bWJlciBhcnJheXMuXHJcbiAqIEBtZW1iZXJvZiB1dGlsXHJcbiAqIEBuYW1lc3BhY2VcclxuICovXHJcbnZhciB1dGY4ID0gZXhwb3J0cztcclxuXHJcbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSBVVEY4IGJ5dGUgbGVuZ3RoIG9mIGEgc3RyaW5nLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIFN0cmluZ1xyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBCeXRlIGxlbmd0aFxyXG4gKi9cclxudXRmOC5sZW5ndGggPSBmdW5jdGlvbiB1dGY4X2xlbmd0aChzdHJpbmcpIHtcclxuICAgIHZhciBsZW4gPSAwLFxyXG4gICAgICAgIGMgPSAwO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHJpbmcubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICBjID0gc3RyaW5nLmNoYXJDb2RlQXQoaSk7XHJcbiAgICAgICAgaWYgKGMgPCAxMjgpXHJcbiAgICAgICAgICAgIGxlbiArPSAxO1xyXG4gICAgICAgIGVsc2UgaWYgKGMgPCAyMDQ4KVxyXG4gICAgICAgICAgICBsZW4gKz0gMjtcclxuICAgICAgICBlbHNlIGlmICgoYyAmIDB4RkMwMCkgPT09IDB4RDgwMCAmJiAoc3RyaW5nLmNoYXJDb2RlQXQoaSArIDEpICYgMHhGQzAwKSA9PT0gMHhEQzAwKSB7XHJcbiAgICAgICAgICAgICsraTtcclxuICAgICAgICAgICAgbGVuICs9IDQ7XHJcbiAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgIGxlbiArPSAzO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGxlbjtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZWFkcyBVVEY4IGJ5dGVzIGFzIGEgc3RyaW5nLlxyXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IGJ1ZmZlciBTb3VyY2UgYnVmZmVyXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBzdGFydCBTb3VyY2Ugc3RhcnRcclxuICogQHBhcmFtIHtudW1iZXJ9IGVuZCBTb3VyY2UgZW5kXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFN0cmluZyByZWFkXHJcbiAqL1xyXG51dGY4LnJlYWQgPSBmdW5jdGlvbiB1dGY4X3JlYWQoYnVmZmVyLCBzdGFydCwgZW5kKSB7XHJcbiAgICB2YXIgbGVuID0gZW5kIC0gc3RhcnQ7XHJcbiAgICBpZiAobGVuIDwgMSlcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIHZhciBwYXJ0cyA9IG51bGwsXHJcbiAgICAgICAgY2h1bmsgPSBbXSxcclxuICAgICAgICBpID0gMCwgLy8gY2hhciBvZmZzZXRcclxuICAgICAgICB0OyAgICAgLy8gdGVtcG9yYXJ5XHJcbiAgICB3aGlsZSAoc3RhcnQgPCBlbmQpIHtcclxuICAgICAgICB0ID0gYnVmZmVyW3N0YXJ0KytdO1xyXG4gICAgICAgIGlmICh0IDwgMTI4KVxyXG4gICAgICAgICAgICBjaHVua1tpKytdID0gdDtcclxuICAgICAgICBlbHNlIGlmICh0ID4gMTkxICYmIHQgPCAyMjQpXHJcbiAgICAgICAgICAgIGNodW5rW2krK10gPSAodCAmIDMxKSA8PCA2IHwgYnVmZmVyW3N0YXJ0KytdICYgNjM7XHJcbiAgICAgICAgZWxzZSBpZiAodCA+IDIzOSAmJiB0IDwgMzY1KSB7XHJcbiAgICAgICAgICAgIHQgPSAoKHQgJiA3KSA8PCAxOCB8IChidWZmZXJbc3RhcnQrK10gJiA2MykgPDwgMTIgfCAoYnVmZmVyW3N0YXJ0KytdICYgNjMpIDw8IDYgfCBidWZmZXJbc3RhcnQrK10gJiA2MykgLSAweDEwMDAwO1xyXG4gICAgICAgICAgICBjaHVua1tpKytdID0gMHhEODAwICsgKHQgPj4gMTApO1xyXG4gICAgICAgICAgICBjaHVua1tpKytdID0gMHhEQzAwICsgKHQgJiAxMDIzKTtcclxuICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgY2h1bmtbaSsrXSA9ICh0ICYgMTUpIDw8IDEyIHwgKGJ1ZmZlcltzdGFydCsrXSAmIDYzKSA8PCA2IHwgYnVmZmVyW3N0YXJ0KytdICYgNjM7XHJcbiAgICAgICAgaWYgKGkgPiA4MTkxKSB7XHJcbiAgICAgICAgICAgIChwYXJ0cyB8fCAocGFydHMgPSBbXSkpLnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShTdHJpbmcsIGNodW5rKSk7XHJcbiAgICAgICAgICAgIGkgPSAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChwYXJ0cykge1xyXG4gICAgICAgIGlmIChpKVxyXG4gICAgICAgICAgICBwYXJ0cy5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoU3RyaW5nLCBjaHVuay5zbGljZSgwLCBpKSkpO1xyXG4gICAgICAgIHJldHVybiBwYXJ0cy5qb2luKFwiXCIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoU3RyaW5nLCBjaHVuay5zbGljZSgwLCBpKSk7XHJcbn07XHJcblxyXG4vKipcclxuICogV3JpdGVzIGEgc3RyaW5nIGFzIFVURjggYnl0ZXMuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgU291cmNlIHN0cmluZ1xyXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IGJ1ZmZlciBEZXN0aW5hdGlvbiBidWZmZXJcclxuICogQHBhcmFtIHtudW1iZXJ9IG9mZnNldCBEZXN0aW5hdGlvbiBvZmZzZXRcclxuICogQHJldHVybnMge251bWJlcn0gQnl0ZXMgd3JpdHRlblxyXG4gKi9cclxudXRmOC53cml0ZSA9IGZ1bmN0aW9uIHV0Zjhfd3JpdGUoc3RyaW5nLCBidWZmZXIsIG9mZnNldCkge1xyXG4gICAgdmFyIHN0YXJ0ID0gb2Zmc2V0LFxyXG4gICAgICAgIGMxLCAvLyBjaGFyYWN0ZXIgMVxyXG4gICAgICAgIGMyOyAvLyBjaGFyYWN0ZXIgMlxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHJpbmcubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICBjMSA9IHN0cmluZy5jaGFyQ29kZUF0KGkpO1xyXG4gICAgICAgIGlmIChjMSA8IDEyOCkge1xyXG4gICAgICAgICAgICBidWZmZXJbb2Zmc2V0KytdID0gYzE7XHJcbiAgICAgICAgfSBlbHNlIGlmIChjMSA8IDIwNDgpIHtcclxuICAgICAgICAgICAgYnVmZmVyW29mZnNldCsrXSA9IGMxID4+IDYgICAgICAgfCAxOTI7XHJcbiAgICAgICAgICAgIGJ1ZmZlcltvZmZzZXQrK10gPSBjMSAgICAgICAmIDYzIHwgMTI4O1xyXG4gICAgICAgIH0gZWxzZSBpZiAoKGMxICYgMHhGQzAwKSA9PT0gMHhEODAwICYmICgoYzIgPSBzdHJpbmcuY2hhckNvZGVBdChpICsgMSkpICYgMHhGQzAwKSA9PT0gMHhEQzAwKSB7XHJcbiAgICAgICAgICAgIGMxID0gMHgxMDAwMCArICgoYzEgJiAweDAzRkYpIDw8IDEwKSArIChjMiAmIDB4MDNGRik7XHJcbiAgICAgICAgICAgICsraTtcclxuICAgICAgICAgICAgYnVmZmVyW29mZnNldCsrXSA9IGMxID4+IDE4ICAgICAgfCAyNDA7XHJcbiAgICAgICAgICAgIGJ1ZmZlcltvZmZzZXQrK10gPSBjMSA+PiAxMiAmIDYzIHwgMTI4O1xyXG4gICAgICAgICAgICBidWZmZXJbb2Zmc2V0KytdID0gYzEgPj4gNiAgJiA2MyB8IDEyODtcclxuICAgICAgICAgICAgYnVmZmVyW29mZnNldCsrXSA9IGMxICAgICAgICYgNjMgfCAxMjg7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYnVmZmVyW29mZnNldCsrXSA9IGMxID4+IDEyICAgICAgfCAyMjQ7XHJcbiAgICAgICAgICAgIGJ1ZmZlcltvZmZzZXQrK10gPSBjMSA+PiA2ICAmIDYzIHwgMTI4O1xyXG4gICAgICAgICAgICBidWZmZXJbb2Zmc2V0KytdID0gYzEgICAgICAgJiA2MyB8IDEyODtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb2Zmc2V0IC0gc3RhcnQ7XHJcbn07XHJcbiIsICJcInVzZSBzdHJpY3RcIjtcclxubW9kdWxlLmV4cG9ydHMgPSBwb29sO1xyXG5cclxuLyoqXHJcbiAqIEFuIGFsbG9jYXRvciBhcyB1c2VkIGJ5IHtAbGluayB1dGlsLnBvb2x9LlxyXG4gKiBAdHlwZWRlZiBQb29sQWxsb2NhdG9yXHJcbiAqIEB0eXBlIHtmdW5jdGlvbn1cclxuICogQHBhcmFtIHtudW1iZXJ9IHNpemUgQnVmZmVyIHNpemVcclxuICogQHJldHVybnMge1VpbnQ4QXJyYXl9IEJ1ZmZlclxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBBIHNsaWNlciBhcyB1c2VkIGJ5IHtAbGluayB1dGlsLnBvb2x9LlxyXG4gKiBAdHlwZWRlZiBQb29sU2xpY2VyXHJcbiAqIEB0eXBlIHtmdW5jdGlvbn1cclxuICogQHBhcmFtIHtudW1iZXJ9IHN0YXJ0IFN0YXJ0IG9mZnNldFxyXG4gKiBAcGFyYW0ge251bWJlcn0gZW5kIEVuZCBvZmZzZXRcclxuICogQHJldHVybnMge1VpbnQ4QXJyYXl9IEJ1ZmZlciBzbGljZVxyXG4gKiBAdGhpcyB7VWludDhBcnJheX1cclxuICovXHJcblxyXG4vKipcclxuICogQSBnZW5lcmFsIHB1cnBvc2UgYnVmZmVyIHBvb2wuXHJcbiAqIEBtZW1iZXJvZiB1dGlsXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge1Bvb2xBbGxvY2F0b3J9IGFsbG9jIEFsbG9jYXRvclxyXG4gKiBAcGFyYW0ge1Bvb2xTbGljZXJ9IHNsaWNlIFNsaWNlclxyXG4gKiBAcGFyYW0ge251bWJlcn0gW3NpemU9ODE5Ml0gU2xhYiBzaXplXHJcbiAqIEByZXR1cm5zIHtQb29sQWxsb2NhdG9yfSBQb29sZWQgYWxsb2NhdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBwb29sKGFsbG9jLCBzbGljZSwgc2l6ZSkge1xyXG4gICAgdmFyIFNJWkUgICA9IHNpemUgfHwgODE5MjtcclxuICAgIHZhciBNQVggICAgPSBTSVpFID4+PiAxO1xyXG4gICAgdmFyIHNsYWIgICA9IG51bGw7XHJcbiAgICB2YXIgb2Zmc2V0ID0gU0laRTtcclxuICAgIHJldHVybiBmdW5jdGlvbiBwb29sX2FsbG9jKHNpemUpIHtcclxuICAgICAgICBpZiAoc2l6ZSA8IDEgfHwgc2l6ZSA+IE1BWClcclxuICAgICAgICAgICAgcmV0dXJuIGFsbG9jKHNpemUpO1xyXG4gICAgICAgIGlmIChvZmZzZXQgKyBzaXplID4gU0laRSkge1xyXG4gICAgICAgICAgICBzbGFiID0gYWxsb2MoU0laRSk7XHJcbiAgICAgICAgICAgIG9mZnNldCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBidWYgPSBzbGljZS5jYWxsKHNsYWIsIG9mZnNldCwgb2Zmc2V0ICs9IHNpemUpO1xyXG4gICAgICAgIGlmIChvZmZzZXQgJiA3KSAvLyBhbGlnbiB0byAzMiBiaXRcclxuICAgICAgICAgICAgb2Zmc2V0ID0gKG9mZnNldCB8IDcpICsgMTtcclxuICAgICAgICByZXR1cm4gYnVmO1xyXG4gICAgfTtcclxufVxyXG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IExvbmdCaXRzO1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoXCIuLi91dGlsL21pbmltYWxcIik7XG5cbi8qKlxuICogQ29uc3RydWN0cyBuZXcgbG9uZyBiaXRzLlxuICogQGNsYXNzZGVzYyBIZWxwZXIgY2xhc3MgZm9yIHdvcmtpbmcgd2l0aCB0aGUgbG93IGFuZCBoaWdoIGJpdHMgb2YgYSA2NCBiaXQgdmFsdWUuXG4gKiBAbWVtYmVyb2YgdXRpbFxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge251bWJlcn0gbG8gTG93IDMyIGJpdHMsIHVuc2lnbmVkXG4gKiBAcGFyYW0ge251bWJlcn0gaGkgSGlnaCAzMiBiaXRzLCB1bnNpZ25lZFxuICovXG5mdW5jdGlvbiBMb25nQml0cyhsbywgaGkpIHtcblxuICAgIC8vIG5vdGUgdGhhdCB0aGUgY2FzdHMgYmVsb3cgYXJlIHRoZW9yZXRpY2FsbHkgdW5uZWNlc3NhcnkgYXMgb2YgdG9kYXksIGJ1dCBvbGRlciBzdGF0aWNhbGx5XG4gICAgLy8gZ2VuZXJhdGVkIGNvbnZlcnRlciBjb2RlIG1pZ2h0IHN0aWxsIGNhbGwgdGhlIGN0b3Igd2l0aCBzaWduZWQgMzJiaXRzLiBrZXB0IGZvciBjb21wYXQuXG5cbiAgICAvKipcbiAgICAgKiBMb3cgYml0cy5cbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMubG8gPSBsbyA+Pj4gMDtcblxuICAgIC8qKlxuICAgICAqIEhpZ2ggYml0cy5cbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMuaGkgPSBoaSA+Pj4gMDtcbn1cblxuLyoqXG4gKiBaZXJvIGJpdHMuXG4gKiBAbWVtYmVyb2YgdXRpbC5Mb25nQml0c1xuICogQHR5cGUge3V0aWwuTG9uZ0JpdHN9XG4gKi9cbnZhciB6ZXJvID0gTG9uZ0JpdHMuemVybyA9IG5ldyBMb25nQml0cygwLCAwKTtcblxuemVyby50b051bWJlciA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbnplcm8uenpFbmNvZGUgPSB6ZXJvLnp6RGVjb2RlID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9O1xuemVyby5sZW5ndGggPSBmdW5jdGlvbigpIHsgcmV0dXJuIDE7IH07XG5cbi8qKlxuICogWmVybyBoYXNoLlxuICogQG1lbWJlcm9mIHV0aWwuTG9uZ0JpdHNcbiAqIEB0eXBlIHtzdHJpbmd9XG4gKi9cbnZhciB6ZXJvSGFzaCA9IExvbmdCaXRzLnplcm9IYXNoID0gXCJcXDBcXDBcXDBcXDBcXDBcXDBcXDBcXDBcIjtcblxuLyoqXG4gKiBDb25zdHJ1Y3RzIG5ldyBsb25nIGJpdHMgZnJvbSB0aGUgc3BlY2lmaWVkIG51bWJlci5cbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSBWYWx1ZVxuICogQHJldHVybnMge3V0aWwuTG9uZ0JpdHN9IEluc3RhbmNlXG4gKi9cbkxvbmdCaXRzLmZyb21OdW1iZXIgPSBmdW5jdGlvbiBmcm9tTnVtYmVyKHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID09PSAwKVxuICAgICAgICByZXR1cm4gemVybztcbiAgICB2YXIgc2lnbiA9IHZhbHVlIDwgMDtcbiAgICBpZiAoc2lnbilcbiAgICAgICAgdmFsdWUgPSAtdmFsdWU7XG4gICAgdmFyIGxvID0gdmFsdWUgPj4+IDAsXG4gICAgICAgIGhpID0gKHZhbHVlIC0gbG8pIC8gNDI5NDk2NzI5NiA+Pj4gMDtcbiAgICBpZiAoc2lnbikge1xuICAgICAgICBoaSA9IH5oaSA+Pj4gMDtcbiAgICAgICAgbG8gPSB+bG8gPj4+IDA7XG4gICAgICAgIGlmICgrK2xvID4gNDI5NDk2NzI5NSkge1xuICAgICAgICAgICAgbG8gPSAwO1xuICAgICAgICAgICAgaWYgKCsraGkgPiA0Mjk0OTY3Mjk1KVxuICAgICAgICAgICAgICAgIGhpID0gMDtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbmV3IExvbmdCaXRzKGxvLCBoaSk7XG59O1xuXG4vKipcbiAqIENvbnN0cnVjdHMgbmV3IGxvbmcgYml0cyBmcm9tIGEgbnVtYmVyLCBsb25nIG9yIHN0cmluZy5cbiAqIEBwYXJhbSB7TG9uZ3xudW1iZXJ8c3RyaW5nfSB2YWx1ZSBWYWx1ZVxuICogQHJldHVybnMge3V0aWwuTG9uZ0JpdHN9IEluc3RhbmNlXG4gKi9cbkxvbmdCaXRzLmZyb20gPSBmdW5jdGlvbiBmcm9tKHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIilcbiAgICAgICAgcmV0dXJuIExvbmdCaXRzLmZyb21OdW1iZXIodmFsdWUpO1xuICAgIGlmICh1dGlsLmlzU3RyaW5nKHZhbHVlKSkge1xuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgICBpZiAodXRpbC5Mb25nKVxuICAgICAgICAgICAgdmFsdWUgPSB1dGlsLkxvbmcuZnJvbVN0cmluZyh2YWx1ZSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiBMb25nQml0cy5mcm9tTnVtYmVyKHBhcnNlSW50KHZhbHVlLCAxMCkpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWUubG93IHx8IHZhbHVlLmhpZ2ggPyBuZXcgTG9uZ0JpdHModmFsdWUubG93ID4+PiAwLCB2YWx1ZS5oaWdoID4+PiAwKSA6IHplcm87XG59O1xuXG4vKipcbiAqIENvbnZlcnRzIHRoaXMgbG9uZyBiaXRzIHRvIGEgcG9zc2libHkgdW5zYWZlIEphdmFTY3JpcHQgbnVtYmVyLlxuICogQHBhcmFtIHtib29sZWFufSBbdW5zaWduZWQ9ZmFsc2VdIFdoZXRoZXIgdW5zaWduZWQgb3Igbm90XG4gKiBAcmV0dXJucyB7bnVtYmVyfSBQb3NzaWJseSB1bnNhZmUgbnVtYmVyXG4gKi9cbkxvbmdCaXRzLnByb3RvdHlwZS50b051bWJlciA9IGZ1bmN0aW9uIHRvTnVtYmVyKHVuc2lnbmVkKSB7XG4gICAgaWYgKCF1bnNpZ25lZCAmJiB0aGlzLmhpID4+PiAzMSkge1xuICAgICAgICB2YXIgbG8gPSB+dGhpcy5sbyArIDEgPj4+IDAsXG4gICAgICAgICAgICBoaSA9IH50aGlzLmhpICAgICA+Pj4gMDtcbiAgICAgICAgaWYgKCFsbylcbiAgICAgICAgICAgIGhpID0gaGkgKyAxID4+PiAwO1xuICAgICAgICByZXR1cm4gLShsbyArIGhpICogNDI5NDk2NzI5Nik7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmxvICsgdGhpcy5oaSAqIDQyOTQ5NjcyOTY7XG59O1xuXG4vKipcbiAqIENvbnZlcnRzIHRoaXMgbG9uZyBiaXRzIHRvIGEgbG9uZy5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW3Vuc2lnbmVkPWZhbHNlXSBXaGV0aGVyIHVuc2lnbmVkIG9yIG5vdFxuICogQHJldHVybnMge0xvbmd9IExvbmdcbiAqL1xuTG9uZ0JpdHMucHJvdG90eXBlLnRvTG9uZyA9IGZ1bmN0aW9uIHRvTG9uZyh1bnNpZ25lZCkge1xuICAgIHJldHVybiB1dGlsLkxvbmdcbiAgICAgICAgPyBuZXcgdXRpbC5Mb25nKHRoaXMubG8gfCAwLCB0aGlzLmhpIHwgMCwgQm9vbGVhbih1bnNpZ25lZCkpXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgIDogeyBsb3c6IHRoaXMubG8gfCAwLCBoaWdoOiB0aGlzLmhpIHwgMCwgdW5zaWduZWQ6IEJvb2xlYW4odW5zaWduZWQpIH07XG59O1xuXG52YXIgY2hhckNvZGVBdCA9IFN0cmluZy5wcm90b3R5cGUuY2hhckNvZGVBdDtcblxuLyoqXG4gKiBDb25zdHJ1Y3RzIG5ldyBsb25nIGJpdHMgZnJvbSB0aGUgc3BlY2lmaWVkIDggY2hhcmFjdGVycyBsb25nIGhhc2guXG4gKiBAcGFyYW0ge3N0cmluZ30gaGFzaCBIYXNoXG4gKiBAcmV0dXJucyB7dXRpbC5Mb25nQml0c30gQml0c1xuICovXG5Mb25nQml0cy5mcm9tSGFzaCA9IGZ1bmN0aW9uIGZyb21IYXNoKGhhc2gpIHtcbiAgICBpZiAoaGFzaCA9PT0gemVyb0hhc2gpXG4gICAgICAgIHJldHVybiB6ZXJvO1xuICAgIHJldHVybiBuZXcgTG9uZ0JpdHMoXG4gICAgICAgICggY2hhckNvZGVBdC5jYWxsKGhhc2gsIDApXG4gICAgICAgIHwgY2hhckNvZGVBdC5jYWxsKGhhc2gsIDEpIDw8IDhcbiAgICAgICAgfCBjaGFyQ29kZUF0LmNhbGwoaGFzaCwgMikgPDwgMTZcbiAgICAgICAgfCBjaGFyQ29kZUF0LmNhbGwoaGFzaCwgMykgPDwgMjQpID4+PiAwXG4gICAgLFxuICAgICAgICAoIGNoYXJDb2RlQXQuY2FsbChoYXNoLCA0KVxuICAgICAgICB8IGNoYXJDb2RlQXQuY2FsbChoYXNoLCA1KSA8PCA4XG4gICAgICAgIHwgY2hhckNvZGVBdC5jYWxsKGhhc2gsIDYpIDw8IDE2XG4gICAgICAgIHwgY2hhckNvZGVBdC5jYWxsKGhhc2gsIDcpIDw8IDI0KSA+Pj4gMFxuICAgICk7XG59O1xuXG4vKipcbiAqIENvbnZlcnRzIHRoaXMgbG9uZyBiaXRzIHRvIGEgOCBjaGFyYWN0ZXJzIGxvbmcgaGFzaC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IEhhc2hcbiAqL1xuTG9uZ0JpdHMucHJvdG90eXBlLnRvSGFzaCA9IGZ1bmN0aW9uIHRvSGFzaCgpIHtcbiAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShcbiAgICAgICAgdGhpcy5sbyAgICAgICAgJiAyNTUsXG4gICAgICAgIHRoaXMubG8gPj4+IDggICYgMjU1LFxuICAgICAgICB0aGlzLmxvID4+PiAxNiAmIDI1NSxcbiAgICAgICAgdGhpcy5sbyA+Pj4gMjQgICAgICAsXG4gICAgICAgIHRoaXMuaGkgICAgICAgICYgMjU1LFxuICAgICAgICB0aGlzLmhpID4+PiA4ICAmIDI1NSxcbiAgICAgICAgdGhpcy5oaSA+Pj4gMTYgJiAyNTUsXG4gICAgICAgIHRoaXMuaGkgPj4+IDI0XG4gICAgKTtcbn07XG5cbi8qKlxuICogWmlnLXphZyBlbmNvZGVzIHRoaXMgbG9uZyBiaXRzLlxuICogQHJldHVybnMge3V0aWwuTG9uZ0JpdHN9IGB0aGlzYFxuICovXG5Mb25nQml0cy5wcm90b3R5cGUuenpFbmNvZGUgPSBmdW5jdGlvbiB6ekVuY29kZSgpIHtcbiAgICB2YXIgbWFzayA9ICAgdGhpcy5oaSA+PiAzMTtcbiAgICB0aGlzLmhpICA9ICgodGhpcy5oaSA8PCAxIHwgdGhpcy5sbyA+Pj4gMzEpIF4gbWFzaykgPj4+IDA7XG4gICAgdGhpcy5sbyAgPSAoIHRoaXMubG8gPDwgMSAgICAgICAgICAgICAgICAgICBeIG1hc2spID4+PiAwO1xuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBaaWctemFnIGRlY29kZXMgdGhpcyBsb25nIGJpdHMuXG4gKiBAcmV0dXJucyB7dXRpbC5Mb25nQml0c30gYHRoaXNgXG4gKi9cbkxvbmdCaXRzLnByb3RvdHlwZS56ekRlY29kZSA9IGZ1bmN0aW9uIHp6RGVjb2RlKCkge1xuICAgIHZhciBtYXNrID0gLSh0aGlzLmxvICYgMSk7XG4gICAgdGhpcy5sbyAgPSAoKHRoaXMubG8gPj4+IDEgfCB0aGlzLmhpIDw8IDMxKSBeIG1hc2spID4+PiAwO1xuICAgIHRoaXMuaGkgID0gKCB0aGlzLmhpID4+PiAxICAgICAgICAgICAgICAgICAgXiBtYXNrKSA+Pj4gMDtcbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgbGVuZ3RoIG9mIHRoaXMgbG9uZ2JpdHMgd2hlbiBlbmNvZGVkIGFzIGEgdmFyaW50LlxuICogQHJldHVybnMge251bWJlcn0gTGVuZ3RoXG4gKi9cbkxvbmdCaXRzLnByb3RvdHlwZS5sZW5ndGggPSBmdW5jdGlvbiBsZW5ndGgoKSB7XG4gICAgdmFyIHBhcnQwID0gIHRoaXMubG8sXG4gICAgICAgIHBhcnQxID0gKHRoaXMubG8gPj4+IDI4IHwgdGhpcy5oaSA8PCA0KSA+Pj4gMCxcbiAgICAgICAgcGFydDIgPSAgdGhpcy5oaSA+Pj4gMjQ7XG4gICAgcmV0dXJuIHBhcnQyID09PSAwXG4gICAgICAgICA/IHBhcnQxID09PSAwXG4gICAgICAgICAgID8gcGFydDAgPCAxNjM4NFxuICAgICAgICAgICAgID8gcGFydDAgPCAxMjggPyAxIDogMlxuICAgICAgICAgICAgIDogcGFydDAgPCAyMDk3MTUyID8gMyA6IDRcbiAgICAgICAgICAgOiBwYXJ0MSA8IDE2Mzg0XG4gICAgICAgICAgICAgPyBwYXJ0MSA8IDEyOCA/IDUgOiA2XG4gICAgICAgICAgICAgOiBwYXJ0MSA8IDIwOTcxNTIgPyA3IDogOFxuICAgICAgICAgOiBwYXJ0MiA8IDEyOCA/IDkgOiAxMDtcbn07XG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgdXRpbCA9IGV4cG9ydHM7XG5cbi8vIHVzZWQgdG8gcmV0dXJuIGEgUHJvbWlzZSB3aGVyZSBjYWxsYmFjayBpcyBvbWl0dGVkXG51dGlsLmFzUHJvbWlzZSA9IHJlcXVpcmUoXCJAcHJvdG9idWZqcy9hc3Byb21pc2VcIik7XG5cbi8vIGNvbnZlcnRzIHRvIC8gZnJvbSBiYXNlNjQgZW5jb2RlZCBzdHJpbmdzXG51dGlsLmJhc2U2NCA9IHJlcXVpcmUoXCJAcHJvdG9idWZqcy9iYXNlNjRcIik7XG5cbi8vIGJhc2UgY2xhc3Mgb2YgcnBjLlNlcnZpY2VcbnV0aWwuRXZlbnRFbWl0dGVyID0gcmVxdWlyZShcIkBwcm90b2J1ZmpzL2V2ZW50ZW1pdHRlclwiKTtcblxuLy8gZmxvYXQgaGFuZGxpbmcgYWNjcm9zcyBicm93c2Vyc1xudXRpbC5mbG9hdCA9IHJlcXVpcmUoXCJAcHJvdG9idWZqcy9mbG9hdFwiKTtcblxuLy8gcmVxdWlyZXMgbW9kdWxlcyBvcHRpb25hbGx5IGFuZCBoaWRlcyB0aGUgY2FsbCBmcm9tIGJ1bmRsZXJzXG51dGlsLmlucXVpcmUgPSByZXF1aXJlKFwiQHByb3RvYnVmanMvaW5xdWlyZVwiKTtcblxuLy8gY29udmVydHMgdG8gLyBmcm9tIHV0ZjggZW5jb2RlZCBzdHJpbmdzXG51dGlsLnV0ZjggPSByZXF1aXJlKFwiQHByb3RvYnVmanMvdXRmOFwiKTtcblxuLy8gcHJvdmlkZXMgYSBub2RlLWxpa2UgYnVmZmVyIHBvb2wgaW4gdGhlIGJyb3dzZXJcbnV0aWwucG9vbCA9IHJlcXVpcmUoXCJAcHJvdG9idWZqcy9wb29sXCIpO1xuXG4vLyB1dGlsaXR5IHRvIHdvcmsgd2l0aCB0aGUgbG93IGFuZCBoaWdoIGJpdHMgb2YgYSA2NCBiaXQgdmFsdWVcbnV0aWwuTG9uZ0JpdHMgPSByZXF1aXJlKFwiLi9sb25nYml0c1wiKTtcblxuLyoqXG4gKiBXaGV0aGVyIHJ1bm5pbmcgd2l0aGluIG5vZGUgb3Igbm90LlxuICogQG1lbWJlcm9mIHV0aWxcbiAqIEB0eXBlIHtib29sZWFufVxuICovXG51dGlsLmlzTm9kZSA9IEJvb2xlYW4odHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIlxuICAgICAgICAgICAgICAgICAgICYmIGdsb2JhbFxuICAgICAgICAgICAgICAgICAgICYmIGdsb2JhbC5wcm9jZXNzXG4gICAgICAgICAgICAgICAgICAgJiYgZ2xvYmFsLnByb2Nlc3MudmVyc2lvbnNcbiAgICAgICAgICAgICAgICAgICAmJiBnbG9iYWwucHJvY2Vzcy52ZXJzaW9ucy5ub2RlKTtcblxuLyoqXG4gKiBHbG9iYWwgb2JqZWN0IHJlZmVyZW5jZS5cbiAqIEBtZW1iZXJvZiB1dGlsXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG51dGlsLmdsb2JhbCA9IHV0aWwuaXNOb2RlICYmIGdsb2JhbFxuICAgICAgICAgICB8fCB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvd1xuICAgICAgICAgICB8fCB0eXBlb2Ygc2VsZiAgICE9PSBcInVuZGVmaW5lZFwiICYmIHNlbGZcbiAgICAgICAgICAgfHwgdGhpczsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1pbnZhbGlkLXRoaXNcblxuLyoqXG4gKiBBbiBpbW11YWJsZSBlbXB0eSBhcnJheS5cbiAqIEBtZW1iZXJvZiB1dGlsXG4gKiBAdHlwZSB7QXJyYXkuPCo+fVxuICogQGNvbnN0XG4gKi9cbnV0aWwuZW1wdHlBcnJheSA9IE9iamVjdC5mcmVlemUgPyBPYmplY3QuZnJlZXplKFtdKSA6IC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovIFtdOyAvLyB1c2VkIG9uIHByb3RvdHlwZXNcblxuLyoqXG4gKiBBbiBpbW11dGFibGUgZW1wdHkgb2JqZWN0LlxuICogQHR5cGUge09iamVjdH1cbiAqIEBjb25zdFxuICovXG51dGlsLmVtcHR5T2JqZWN0ID0gT2JqZWN0LmZyZWV6ZSA/IE9iamVjdC5mcmVlemUoe30pIDogLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8ge307IC8vIHVzZWQgb24gcHJvdG90eXBlc1xuXG4vKipcbiAqIFRlc3RzIGlmIHRoZSBzcGVjaWZpZWQgdmFsdWUgaXMgYW4gaW50ZWdlci5cbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHsqfSB2YWx1ZSBWYWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gYHRydWVgIGlmIHRoZSB2YWx1ZSBpcyBhbiBpbnRlZ2VyXG4gKi9cbnV0aWwuaXNJbnRlZ2VyID0gTnVtYmVyLmlzSW50ZWdlciB8fCAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqLyBmdW5jdGlvbiBpc0ludGVnZXIodmFsdWUpIHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiICYmIGlzRmluaXRlKHZhbHVlKSAmJiBNYXRoLmZsb29yKHZhbHVlKSA9PT0gdmFsdWU7XG59O1xuXG4vKipcbiAqIFRlc3RzIGlmIHRoZSBzcGVjaWZpZWQgdmFsdWUgaXMgYSBzdHJpbmcuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBgdHJ1ZWAgaWYgdGhlIHZhbHVlIGlzIGEgc3RyaW5nXG4gKi9cbnV0aWwuaXNTdHJpbmcgPSBmdW5jdGlvbiBpc1N0cmluZyh2YWx1ZSkge1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgfHwgdmFsdWUgaW5zdGFuY2VvZiBTdHJpbmc7XG59O1xuXG4vKipcbiAqIFRlc3RzIGlmIHRoZSBzcGVjaWZpZWQgdmFsdWUgaXMgYSBub24tbnVsbCBvYmplY3QuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBgdHJ1ZWAgaWYgdGhlIHZhbHVlIGlzIGEgbm9uLW51bGwgb2JqZWN0XG4gKi9cbnV0aWwuaXNPYmplY3QgPSBmdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCI7XG59O1xuXG4vKipcbiAqIENoZWNrcyBpZiBhIHByb3BlcnR5IG9uIGEgbWVzc2FnZSBpcyBjb25zaWRlcmVkIHRvIGJlIHByZXNlbnQuXG4gKiBUaGlzIGlzIGFuIGFsaWFzIG9mIHtAbGluayB1dGlsLmlzU2V0fS5cbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBQbGFpbiBvYmplY3Qgb3IgbWVzc2FnZSBpbnN0YW5jZVxuICogQHBhcmFtIHtzdHJpbmd9IHByb3AgUHJvcGVydHkgbmFtZVxuICogQHJldHVybnMge2Jvb2xlYW59IGB0cnVlYCBpZiBjb25zaWRlcmVkIHRvIGJlIHByZXNlbnQsIG90aGVyd2lzZSBgZmFsc2VgXG4gKi9cbnV0aWwuaXNzZXQgPVxuXG4vKipcbiAqIENoZWNrcyBpZiBhIHByb3BlcnR5IG9uIGEgbWVzc2FnZSBpcyBjb25zaWRlcmVkIHRvIGJlIHByZXNlbnQuXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIFBsYWluIG9iamVjdCBvciBtZXNzYWdlIGluc3RhbmNlXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvcCBQcm9wZXJ0eSBuYW1lXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gYHRydWVgIGlmIGNvbnNpZGVyZWQgdG8gYmUgcHJlc2VudCwgb3RoZXJ3aXNlIGBmYWxzZWBcbiAqL1xudXRpbC5pc1NldCA9IGZ1bmN0aW9uIGlzU2V0KG9iaiwgcHJvcCkge1xuICAgIHZhciB2YWx1ZSA9IG9ialtwcm9wXTtcbiAgICBpZiAodmFsdWUgIT0gbnVsbCAmJiBvYmouaGFzT3duUHJvcGVydHkocHJvcCkpIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZXFlcWVxLCBuby1wcm90b3R5cGUtYnVpbHRpbnNcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSAhPT0gXCJvYmplY3RcIiB8fCAoQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZS5sZW5ndGggOiBPYmplY3Qua2V5cyh2YWx1ZSkubGVuZ3RoKSA+IDA7XG4gICAgcmV0dXJuIGZhbHNlO1xufTtcblxuLyoqXG4gKiBBbnkgY29tcGF0aWJsZSBCdWZmZXIgaW5zdGFuY2UuXG4gKiBUaGlzIGlzIGEgbWluaW1hbCBzdGFuZC1hbG9uZSBkZWZpbml0aW9uIG9mIGEgQnVmZmVyIGluc3RhbmNlLiBUaGUgYWN0dWFsIHR5cGUgaXMgdGhhdCBleHBvcnRlZCBieSBub2RlJ3MgdHlwaW5ncy5cbiAqIEBpbnRlcmZhY2UgQnVmZmVyXG4gKiBAZXh0ZW5kcyBVaW50OEFycmF5XG4gKi9cblxuLyoqXG4gKiBOb2RlJ3MgQnVmZmVyIGNsYXNzIGlmIGF2YWlsYWJsZS5cbiAqIEB0eXBlIHtDb25zdHJ1Y3RvcjxCdWZmZXI+fVxuICovXG51dGlsLkJ1ZmZlciA9IChmdW5jdGlvbigpIHtcbiAgICB0cnkge1xuICAgICAgICB2YXIgQnVmZmVyID0gdXRpbC5pbnF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcjtcbiAgICAgICAgLy8gcmVmdXNlIHRvIHVzZSBub24tbm9kZSBidWZmZXJzIGlmIG5vdCBleHBsaWNpdGx5IGFzc2lnbmVkIChwZXJmIHJlYXNvbnMpOlxuICAgICAgICByZXR1cm4gQnVmZmVyLnByb3RvdHlwZS51dGY4V3JpdGUgPyBCdWZmZXIgOiAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqLyBudWxsO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxufSkoKTtcblxuLy8gSW50ZXJuYWwgYWxpYXMgb2Ygb3IgcG9seWZ1bGwgZm9yIEJ1ZmZlci5mcm9tLlxudXRpbC5fQnVmZmVyX2Zyb20gPSBudWxsO1xuXG4vLyBJbnRlcm5hbCBhbGlhcyBvZiBvciBwb2x5ZmlsbCBmb3IgQnVmZmVyLmFsbG9jVW5zYWZlLlxudXRpbC5fQnVmZmVyX2FsbG9jVW5zYWZlID0gbnVsbDtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGJ1ZmZlciBvZiB3aGF0ZXZlciB0eXBlIHN1cHBvcnRlZCBieSB0aGUgZW52aXJvbm1lbnQuXG4gKiBAcGFyYW0ge251bWJlcnxudW1iZXJbXX0gW3NpemVPckFycmF5PTBdIEJ1ZmZlciBzaXplIG9yIG51bWJlciBhcnJheVxuICogQHJldHVybnMge1VpbnQ4QXJyYXl8QnVmZmVyfSBCdWZmZXJcbiAqL1xudXRpbC5uZXdCdWZmZXIgPSBmdW5jdGlvbiBuZXdCdWZmZXIoc2l6ZU9yQXJyYXkpIHtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIHJldHVybiB0eXBlb2Ygc2l6ZU9yQXJyYXkgPT09IFwibnVtYmVyXCJcbiAgICAgICAgPyB1dGlsLkJ1ZmZlclxuICAgICAgICAgICAgPyB1dGlsLl9CdWZmZXJfYWxsb2NVbnNhZmUoc2l6ZU9yQXJyYXkpXG4gICAgICAgICAgICA6IG5ldyB1dGlsLkFycmF5KHNpemVPckFycmF5KVxuICAgICAgICA6IHV0aWwuQnVmZmVyXG4gICAgICAgICAgICA/IHV0aWwuX0J1ZmZlcl9mcm9tKHNpemVPckFycmF5KVxuICAgICAgICAgICAgOiB0eXBlb2YgVWludDhBcnJheSA9PT0gXCJ1bmRlZmluZWRcIlxuICAgICAgICAgICAgICAgID8gc2l6ZU9yQXJyYXlcbiAgICAgICAgICAgICAgICA6IG5ldyBVaW50OEFycmF5KHNpemVPckFycmF5KTtcbn07XG5cbi8qKlxuICogQXJyYXkgaW1wbGVtZW50YXRpb24gdXNlZCBpbiB0aGUgYnJvd3Nlci4gYFVpbnQ4QXJyYXlgIGlmIHN1cHBvcnRlZCwgb3RoZXJ3aXNlIGBBcnJheWAuXG4gKiBAdHlwZSB7Q29uc3RydWN0b3I8VWludDhBcnJheT59XG4gKi9cbnV0aWwuQXJyYXkgPSB0eXBlb2YgVWludDhBcnJheSAhPT0gXCJ1bmRlZmluZWRcIiA/IFVpbnQ4QXJyYXkgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8gOiBBcnJheTtcblxuLyoqXG4gKiBBbnkgY29tcGF0aWJsZSBMb25nIGluc3RhbmNlLlxuICogVGhpcyBpcyBhIG1pbmltYWwgc3RhbmQtYWxvbmUgZGVmaW5pdGlvbiBvZiBhIExvbmcgaW5zdGFuY2UuIFRoZSBhY3R1YWwgdHlwZSBpcyB0aGF0IGV4cG9ydGVkIGJ5IGxvbmcuanMuXG4gKiBAaW50ZXJmYWNlIExvbmdcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBsb3cgTG93IGJpdHNcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBoaWdoIEhpZ2ggYml0c1xuICogQHByb3BlcnR5IHtib29sZWFufSB1bnNpZ25lZCBXaGV0aGVyIHVuc2lnbmVkIG9yIG5vdFxuICovXG5cbi8qKlxuICogTG9uZy5qcydzIExvbmcgY2xhc3MgaWYgYXZhaWxhYmxlLlxuICogQHR5cGUge0NvbnN0cnVjdG9yPExvbmc+fVxuICovXG51dGlsLkxvbmcgPSAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqLyB1dGlsLmdsb2JhbC5kY29kZUlPICYmIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovIHV0aWwuZ2xvYmFsLmRjb2RlSU8uTG9uZ1xuICAgICAgICAgfHwgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8gdXRpbC5nbG9iYWwuTG9uZ1xuICAgICAgICAgfHwgdXRpbC5pbnF1aXJlKFwibG9uZ1wiKTtcblxuLyoqXG4gKiBSZWd1bGFyIGV4cHJlc3Npb24gdXNlZCB0byB2ZXJpZnkgMiBiaXQgKGBib29sYCkgbWFwIGtleXMuXG4gKiBAdHlwZSB7UmVnRXhwfVxuICogQGNvbnN0XG4gKi9cbnV0aWwua2V5MlJlID0gL150cnVlfGZhbHNlfDB8MSQvO1xuXG4vKipcbiAqIFJlZ3VsYXIgZXhwcmVzc2lvbiB1c2VkIHRvIHZlcmlmeSAzMiBiaXQgKGBpbnQzMmAgZXRjLikgbWFwIGtleXMuXG4gKiBAdHlwZSB7UmVnRXhwfVxuICogQGNvbnN0XG4gKi9cbnV0aWwua2V5MzJSZSA9IC9eLT8oPzowfFsxLTldWzAtOV0qKSQvO1xuXG4vKipcbiAqIFJlZ3VsYXIgZXhwcmVzc2lvbiB1c2VkIHRvIHZlcmlmeSA2NCBiaXQgKGBpbnQ2NGAgZXRjLikgbWFwIGtleXMuXG4gKiBAdHlwZSB7UmVnRXhwfVxuICogQGNvbnN0XG4gKi9cbnV0aWwua2V5NjRSZSA9IC9eKD86W1xcXFx4MDAtXFxcXHhmZl17OH18LT8oPzowfFsxLTldWzAtOV0qKSkkLztcblxuLyoqXG4gKiBDb252ZXJ0cyBhIG51bWJlciBvciBsb25nIHRvIGFuIDggY2hhcmFjdGVycyBsb25nIGhhc2ggc3RyaW5nLlxuICogQHBhcmFtIHtMb25nfG51bWJlcn0gdmFsdWUgVmFsdWUgdG8gY29udmVydFxuICogQHJldHVybnMge3N0cmluZ30gSGFzaFxuICovXG51dGlsLmxvbmdUb0hhc2ggPSBmdW5jdGlvbiBsb25nVG9IYXNoKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlXG4gICAgICAgID8gdXRpbC5Mb25nQml0cy5mcm9tKHZhbHVlKS50b0hhc2goKVxuICAgICAgICA6IHV0aWwuTG9uZ0JpdHMuemVyb0hhc2g7XG59O1xuXG4vKipcbiAqIENvbnZlcnRzIGFuIDggY2hhcmFjdGVycyBsb25nIGhhc2ggc3RyaW5nIHRvIGEgbG9uZyBvciBudW1iZXIuXG4gKiBAcGFyYW0ge3N0cmluZ30gaGFzaCBIYXNoXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFt1bnNpZ25lZD1mYWxzZV0gV2hldGhlciB1bnNpZ25lZCBvciBub3RcbiAqIEByZXR1cm5zIHtMb25nfG51bWJlcn0gT3JpZ2luYWwgdmFsdWVcbiAqL1xudXRpbC5sb25nRnJvbUhhc2ggPSBmdW5jdGlvbiBsb25nRnJvbUhhc2goaGFzaCwgdW5zaWduZWQpIHtcbiAgICB2YXIgYml0cyA9IHV0aWwuTG9uZ0JpdHMuZnJvbUhhc2goaGFzaCk7XG4gICAgaWYgKHV0aWwuTG9uZylcbiAgICAgICAgcmV0dXJuIHV0aWwuTG9uZy5mcm9tQml0cyhiaXRzLmxvLCBiaXRzLmhpLCB1bnNpZ25lZCk7XG4gICAgcmV0dXJuIGJpdHMudG9OdW1iZXIoQm9vbGVhbih1bnNpZ25lZCkpO1xufTtcblxuLyoqXG4gKiBNZXJnZXMgdGhlIHByb3BlcnRpZXMgb2YgdGhlIHNvdXJjZSBvYmplY3QgaW50byB0aGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICogQG1lbWJlcm9mIHV0aWxcbiAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59IGRzdCBEZXN0aW5hdGlvbiBvYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59IHNyYyBTb3VyY2Ugb2JqZWN0XG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpZk5vdFNldD1mYWxzZV0gTWVyZ2VzIG9ubHkgaWYgdGhlIGtleSBpcyBub3QgYWxyZWFkeSBzZXRcbiAqIEByZXR1cm5zIHtPYmplY3QuPHN0cmluZywqPn0gRGVzdGluYXRpb24gb2JqZWN0XG4gKi9cbmZ1bmN0aW9uIG1lcmdlKGRzdCwgc3JjLCBpZk5vdFNldCkgeyAvLyB1c2VkIGJ5IGNvbnZlcnRlcnNcbiAgICBmb3IgKHZhciBrZXlzID0gT2JqZWN0LmtleXMoc3JjKSwgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKVxuICAgICAgICBpZiAoZHN0W2tleXNbaV1dID09PSB1bmRlZmluZWQgfHwgIWlmTm90U2V0KVxuICAgICAgICAgICAgZHN0W2tleXNbaV1dID0gc3JjW2tleXNbaV1dO1xuICAgIHJldHVybiBkc3Q7XG59XG5cbnV0aWwubWVyZ2UgPSBtZXJnZTtcblxuLyoqXG4gKiBDb252ZXJ0cyB0aGUgZmlyc3QgY2hhcmFjdGVyIG9mIGEgc3RyaW5nIHRvIGxvd2VyIGNhc2UuXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyIFN0cmluZyB0byBjb252ZXJ0XG4gKiBAcmV0dXJucyB7c3RyaW5nfSBDb252ZXJ0ZWQgc3RyaW5nXG4gKi9cbnV0aWwubGNGaXJzdCA9IGZ1bmN0aW9uIGxjRmlyc3Qoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5jaGFyQXQoMCkudG9Mb3dlckNhc2UoKSArIHN0ci5zdWJzdHJpbmcoMSk7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBjdXN0b20gZXJyb3IgY29uc3RydWN0b3IuXG4gKiBAbWVtYmVyb2YgdXRpbFxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgRXJyb3IgbmFtZVxuICogQHJldHVybnMge0NvbnN0cnVjdG9yPEVycm9yPn0gQ3VzdG9tIGVycm9yIGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIG5ld0Vycm9yKG5hbWUpIHtcblxuICAgIGZ1bmN0aW9uIEN1c3RvbUVycm9yKG1lc3NhZ2UsIHByb3BlcnRpZXMpIHtcblxuICAgICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgQ3VzdG9tRXJyb3IpKVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBDdXN0b21FcnJvcihtZXNzYWdlLCBwcm9wZXJ0aWVzKTtcblxuICAgICAgICAvLyBFcnJvci5jYWxsKHRoaXMsIG1lc3NhZ2UpO1xuICAgICAgICAvLyBeIGp1c3QgcmV0dXJucyBhIG5ldyBlcnJvciBpbnN0YW5jZSBiZWNhdXNlIHRoZSBjdG9yIGNhbiBiZSBjYWxsZWQgYXMgYSBmdW5jdGlvblxuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcIm1lc3NhZ2VcIiwgeyBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbWVzc2FnZTsgfSB9KTtcblxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICBpZiAoRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UpIC8vIG5vZGVcbiAgICAgICAgICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKHRoaXMsIEN1c3RvbUVycm9yKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwic3RhY2tcIiwgeyB2YWx1ZTogbmV3IEVycm9yKCkuc3RhY2sgfHwgXCJcIiB9KTtcblxuICAgICAgICBpZiAocHJvcGVydGllcylcbiAgICAgICAgICAgIG1lcmdlKHRoaXMsIHByb3BlcnRpZXMpO1xuICAgIH1cblxuICAgIChDdXN0b21FcnJvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEVycm9yLnByb3RvdHlwZSkpLmNvbnN0cnVjdG9yID0gQ3VzdG9tRXJyb3I7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ3VzdG9tRXJyb3IucHJvdG90eXBlLCBcIm5hbWVcIiwgeyBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbmFtZTsgfSB9KTtcblxuICAgIEN1c3RvbUVycm9yLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5uYW1lICsgXCI6IFwiICsgdGhpcy5tZXNzYWdlO1xuICAgIH07XG5cbiAgICByZXR1cm4gQ3VzdG9tRXJyb3I7XG59XG5cbnV0aWwubmV3RXJyb3IgPSBuZXdFcnJvcjtcblxuLyoqXG4gKiBDb25zdHJ1Y3RzIGEgbmV3IHByb3RvY29sIGVycm9yLlxuICogQGNsYXNzZGVzYyBFcnJvciBzdWJjbGFzcyBpbmRpY2F0aW5nIGEgcHJvdG9jb2wgc3BlY2lmYyBlcnJvci5cbiAqIEBtZW1iZXJvZiB1dGlsXG4gKiBAZXh0ZW5kcyBFcnJvclxuICogQHRlbXBsYXRlIFQgZXh0ZW5kcyBNZXNzYWdlPFQ+XG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIEVycm9yIG1lc3NhZ2VcbiAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59IFtwcm9wZXJ0aWVzXSBBZGRpdGlvbmFsIHByb3BlcnRpZXNcbiAqIEBleGFtcGxlXG4gKiB0cnkge1xuICogICAgIE15TWVzc2FnZS5kZWNvZGUoc29tZUJ1ZmZlcik7IC8vIHRocm93cyBpZiByZXF1aXJlZCBmaWVsZHMgYXJlIG1pc3NpbmdcbiAqIH0gY2F0Y2ggKGUpIHtcbiAqICAgICBpZiAoZSBpbnN0YW5jZW9mIFByb3RvY29sRXJyb3IgJiYgZS5pbnN0YW5jZSlcbiAqICAgICAgICAgY29uc29sZS5sb2coXCJkZWNvZGVkIHNvIGZhcjogXCIgKyBKU09OLnN0cmluZ2lmeShlLmluc3RhbmNlKSk7XG4gKiB9XG4gKi9cbnV0aWwuUHJvdG9jb2xFcnJvciA9IG5ld0Vycm9yKFwiUHJvdG9jb2xFcnJvclwiKTtcblxuLyoqXG4gKiBTbyBmYXIgZGVjb2RlZCBtZXNzYWdlIGluc3RhbmNlLlxuICogQG5hbWUgdXRpbC5Qcm90b2NvbEVycm9yI2luc3RhbmNlXG4gKiBAdHlwZSB7TWVzc2FnZTxUPn1cbiAqL1xuXG4vKipcbiAqIEEgT25lT2YgZ2V0dGVyIGFzIHJldHVybmVkIGJ5IHtAbGluayB1dGlsLm9uZU9mR2V0dGVyfS5cbiAqIEB0eXBlZGVmIE9uZU9mR2V0dGVyXG4gKiBAdHlwZSB7ZnVuY3Rpb259XG4gKiBAcmV0dXJucyB7c3RyaW5nfHVuZGVmaW5lZH0gU2V0IGZpZWxkIG5hbWUsIGlmIGFueVxuICovXG5cbi8qKlxuICogQnVpbGRzIGEgZ2V0dGVyIGZvciBhIG9uZW9mJ3MgcHJlc2VudCBmaWVsZCBuYW1lLlxuICogQHBhcmFtIHtzdHJpbmdbXX0gZmllbGROYW1lcyBGaWVsZCBuYW1lc1xuICogQHJldHVybnMge09uZU9mR2V0dGVyfSBVbmJvdW5kIGdldHRlclxuICovXG51dGlsLm9uZU9mR2V0dGVyID0gZnVuY3Rpb24gZ2V0T25lT2YoZmllbGROYW1lcykge1xuICAgIHZhciBmaWVsZE1hcCA9IHt9O1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmllbGROYW1lcy5sZW5ndGg7ICsraSlcbiAgICAgICAgZmllbGRNYXBbZmllbGROYW1lc1tpXV0gPSAxO1xuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge3N0cmluZ3x1bmRlZmluZWR9IFNldCBmaWVsZCBuYW1lLCBpZiBhbnlcbiAgICAgKiBAdGhpcyBPYmplY3RcbiAgICAgKiBAaWdub3JlXG4gICAgICovXG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNvbnNpc3RlbnQtcmV0dXJuXG4gICAgICAgIGZvciAodmFyIGtleXMgPSBPYmplY3Qua2V5cyh0aGlzKSwgaSA9IGtleXMubGVuZ3RoIC0gMTsgaSA+IC0xOyAtLWkpXG4gICAgICAgICAgICBpZiAoZmllbGRNYXBba2V5c1tpXV0gPT09IDEgJiYgdGhpc1trZXlzW2ldXSAhPT0gdW5kZWZpbmVkICYmIHRoaXNba2V5c1tpXV0gIT09IG51bGwpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGtleXNbaV07XG4gICAgfTtcbn07XG5cbi8qKlxuICogQSBPbmVPZiBzZXR0ZXIgYXMgcmV0dXJuZWQgYnkge0BsaW5rIHV0aWwub25lT2ZTZXR0ZXJ9LlxuICogQHR5cGVkZWYgT25lT2ZTZXR0ZXJcbiAqIEB0eXBlIHtmdW5jdGlvbn1cbiAqIEBwYXJhbSB7c3RyaW5nfHVuZGVmaW5lZH0gdmFsdWUgRmllbGQgbmFtZVxuICogQHJldHVybnMge3VuZGVmaW5lZH1cbiAqL1xuXG4vKipcbiAqIEJ1aWxkcyBhIHNldHRlciBmb3IgYSBvbmVvZidzIHByZXNlbnQgZmllbGQgbmFtZS5cbiAqIEBwYXJhbSB7c3RyaW5nW119IGZpZWxkTmFtZXMgRmllbGQgbmFtZXNcbiAqIEByZXR1cm5zIHtPbmVPZlNldHRlcn0gVW5ib3VuZCBzZXR0ZXJcbiAqL1xudXRpbC5vbmVPZlNldHRlciA9IGZ1bmN0aW9uIHNldE9uZU9mKGZpZWxkTmFtZXMpIHtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIEZpZWxkIG5hbWVcbiAgICAgKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxuICAgICAqIEB0aGlzIE9iamVjdFxuICAgICAqIEBpZ25vcmVcbiAgICAgKi9cbiAgICByZXR1cm4gZnVuY3Rpb24obmFtZSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZpZWxkTmFtZXMubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICBpZiAoZmllbGROYW1lc1tpXSAhPT0gbmFtZSlcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpc1tmaWVsZE5hbWVzW2ldXTtcbiAgICB9O1xufTtcblxuLyoqXG4gKiBEZWZhdWx0IGNvbnZlcnNpb24gb3B0aW9ucyB1c2VkIGZvciB7QGxpbmsgTWVzc2FnZSN0b0pTT059IGltcGxlbWVudGF0aW9ucy5cbiAqXG4gKiBUaGVzZSBvcHRpb25zIGFyZSBjbG9zZSB0byBwcm90bzMncyBKU09OIG1hcHBpbmcgd2l0aCB0aGUgZXhjZXB0aW9uIHRoYXQgaW50ZXJuYWwgdHlwZXMgbGlrZSBBbnkgYXJlIGhhbmRsZWQganVzdCBsaWtlIG1lc3NhZ2VzLiBNb3JlIHByZWNpc2VseTpcbiAqXG4gKiAtIExvbmdzIGJlY29tZSBzdHJpbmdzXG4gKiAtIEVudW1zIGJlY29tZSBzdHJpbmcga2V5c1xuICogLSBCeXRlcyBiZWNvbWUgYmFzZTY0IGVuY29kZWQgc3RyaW5nc1xuICogLSAoU3ViLSlNZXNzYWdlcyBiZWNvbWUgcGxhaW4gb2JqZWN0c1xuICogLSBNYXBzIGJlY29tZSBwbGFpbiBvYmplY3RzIHdpdGggYWxsIHN0cmluZyBrZXlzXG4gKiAtIFJlcGVhdGVkIGZpZWxkcyBiZWNvbWUgYXJyYXlzXG4gKiAtIE5hTiBhbmQgSW5maW5pdHkgZm9yIGZsb2F0IGFuZCBkb3VibGUgZmllbGRzIGJlY29tZSBzdHJpbmdzXG4gKlxuICogQHR5cGUge0lDb252ZXJzaW9uT3B0aW9uc31cbiAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vcHJvdG9jb2wtYnVmZmVycy9kb2NzL3Byb3RvMz9obD1lbiNqc29uXG4gKi9cbnV0aWwudG9KU09OT3B0aW9ucyA9IHtcbiAgICBsb25nczogU3RyaW5nLFxuICAgIGVudW1zOiBTdHJpbmcsXG4gICAgYnl0ZXM6IFN0cmluZyxcbiAgICBqc29uOiB0cnVlXG59O1xuXG4vLyBTZXRzIHVwIGJ1ZmZlciB1dGlsaXR5IGFjY29yZGluZyB0byB0aGUgZW52aXJvbm1lbnQgKGNhbGxlZCBpbiBpbmRleC1taW5pbWFsKVxudXRpbC5fY29uZmlndXJlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIEJ1ZmZlciA9IHV0aWwuQnVmZmVyO1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmICghQnVmZmVyKSB7XG4gICAgICAgIHV0aWwuX0J1ZmZlcl9mcm9tID0gdXRpbC5fQnVmZmVyX2FsbG9jVW5zYWZlID0gbnVsbDtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBiZWNhdXNlIG5vZGUgNC54IGJ1ZmZlcnMgYXJlIGluY29tcGF0aWJsZSAmIGltbXV0YWJsZVxuICAgIC8vIHNlZTogaHR0cHM6Ly9naXRodWIuY29tL2Rjb2RlSU8vcHJvdG9idWYuanMvcHVsbC82NjVcbiAgICB1dGlsLl9CdWZmZXJfZnJvbSA9IEJ1ZmZlci5mcm9tICE9PSBVaW50OEFycmF5LmZyb20gJiYgQnVmZmVyLmZyb20gfHxcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgZnVuY3Rpb24gQnVmZmVyX2Zyb20odmFsdWUsIGVuY29kaW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEJ1ZmZlcih2YWx1ZSwgZW5jb2RpbmcpO1xuICAgICAgICB9O1xuICAgIHV0aWwuX0J1ZmZlcl9hbGxvY1Vuc2FmZSA9IEJ1ZmZlci5hbGxvY1Vuc2FmZSB8fFxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICBmdW5jdGlvbiBCdWZmZXJfYWxsb2NVbnNhZmUoc2l6ZSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBCdWZmZXIoc2l6ZSk7XG4gICAgICAgIH07XG59O1xuIiwgIlwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBXcml0ZXI7XG5cbnZhciB1dGlsICAgICAgPSByZXF1aXJlKFwiLi91dGlsL21pbmltYWxcIik7XG5cbnZhciBCdWZmZXJXcml0ZXI7IC8vIGN5Y2xpY1xuXG52YXIgTG9uZ0JpdHMgID0gdXRpbC5Mb25nQml0cyxcbiAgICBiYXNlNjQgICAgPSB1dGlsLmJhc2U2NCxcbiAgICB1dGY4ICAgICAgPSB1dGlsLnV0Zjg7XG5cbi8qKlxuICogQ29uc3RydWN0cyBhIG5ldyB3cml0ZXIgb3BlcmF0aW9uIGluc3RhbmNlLlxuICogQGNsYXNzZGVzYyBTY2hlZHVsZWQgd3JpdGVyIG9wZXJhdGlvbi5cbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtmdW5jdGlvbigqLCBVaW50OEFycmF5LCBudW1iZXIpfSBmbiBGdW5jdGlvbiB0byBjYWxsXG4gKiBAcGFyYW0ge251bWJlcn0gbGVuIFZhbHVlIGJ5dGUgbGVuZ3RoXG4gKiBAcGFyYW0geyp9IHZhbCBWYWx1ZSB0byB3cml0ZVxuICogQGlnbm9yZVxuICovXG5mdW5jdGlvbiBPcChmbiwgbGVuLCB2YWwpIHtcblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRvIGNhbGwuXG4gICAgICogQHR5cGUge2Z1bmN0aW9uKFVpbnQ4QXJyYXksIG51bWJlciwgKil9XG4gICAgICovXG4gICAgdGhpcy5mbiA9IGZuO1xuXG4gICAgLyoqXG4gICAgICogVmFsdWUgYnl0ZSBsZW5ndGguXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKi9cbiAgICB0aGlzLmxlbiA9IGxlbjtcblxuICAgIC8qKlxuICAgICAqIE5leHQgb3BlcmF0aW9uLlxuICAgICAqIEB0eXBlIHtXcml0ZXIuT3B8dW5kZWZpbmVkfVxuICAgICAqL1xuICAgIHRoaXMubmV4dCA9IHVuZGVmaW5lZDtcblxuICAgIC8qKlxuICAgICAqIFZhbHVlIHRvIHdyaXRlLlxuICAgICAqIEB0eXBlIHsqfVxuICAgICAqL1xuICAgIHRoaXMudmFsID0gdmFsOyAvLyB0eXBlIHZhcmllc1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuZnVuY3Rpb24gbm9vcCgpIHt9IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tZW1wdHktZnVuY3Rpb25cblxuLyoqXG4gKiBDb25zdHJ1Y3RzIGEgbmV3IHdyaXRlciBzdGF0ZSBpbnN0YW5jZS5cbiAqIEBjbGFzc2Rlc2MgQ29waWVkIHdyaXRlciBzdGF0ZS5cbiAqIEBtZW1iZXJvZiBXcml0ZXJcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtXcml0ZXJ9IHdyaXRlciBXcml0ZXIgdG8gY29weSBzdGF0ZSBmcm9tXG4gKiBAaWdub3JlXG4gKi9cbmZ1bmN0aW9uIFN0YXRlKHdyaXRlcikge1xuXG4gICAgLyoqXG4gICAgICogQ3VycmVudCBoZWFkLlxuICAgICAqIEB0eXBlIHtXcml0ZXIuT3B9XG4gICAgICovXG4gICAgdGhpcy5oZWFkID0gd3JpdGVyLmhlYWQ7XG5cbiAgICAvKipcbiAgICAgKiBDdXJyZW50IHRhaWwuXG4gICAgICogQHR5cGUge1dyaXRlci5PcH1cbiAgICAgKi9cbiAgICB0aGlzLnRhaWwgPSB3cml0ZXIudGFpbDtcblxuICAgIC8qKlxuICAgICAqIEN1cnJlbnQgYnVmZmVyIGxlbmd0aC5cbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMubGVuID0gd3JpdGVyLmxlbjtcblxuICAgIC8qKlxuICAgICAqIE5leHQgc3RhdGUuXG4gICAgICogQHR5cGUge1N0YXRlfG51bGx9XG4gICAgICovXG4gICAgdGhpcy5uZXh0ID0gd3JpdGVyLnN0YXRlcztcbn1cblxuLyoqXG4gKiBDb25zdHJ1Y3RzIGEgbmV3IHdyaXRlciBpbnN0YW5jZS5cbiAqIEBjbGFzc2Rlc2MgV2lyZSBmb3JtYXQgd3JpdGVyIHVzaW5nIGBVaW50OEFycmF5YCBpZiBhdmFpbGFibGUsIG90aGVyd2lzZSBgQXJyYXlgLlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIFdyaXRlcigpIHtcblxuICAgIC8qKlxuICAgICAqIEN1cnJlbnQgbGVuZ3RoLlxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgdGhpcy5sZW4gPSAwO1xuXG4gICAgLyoqXG4gICAgICogT3BlcmF0aW9ucyBoZWFkLlxuICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICovXG4gICAgdGhpcy5oZWFkID0gbmV3IE9wKG5vb3AsIDAsIDApO1xuXG4gICAgLyoqXG4gICAgICogT3BlcmF0aW9ucyB0YWlsXG4gICAgICogQHR5cGUge09iamVjdH1cbiAgICAgKi9cbiAgICB0aGlzLnRhaWwgPSB0aGlzLmhlYWQ7XG5cbiAgICAvKipcbiAgICAgKiBMaW5rZWQgZm9ya2VkIHN0YXRlcy5cbiAgICAgKiBAdHlwZSB7T2JqZWN0fG51bGx9XG4gICAgICovXG4gICAgdGhpcy5zdGF0ZXMgPSBudWxsO1xuXG4gICAgLy8gV2hlbiBhIHZhbHVlIGlzIHdyaXR0ZW4sIHRoZSB3cml0ZXIgY2FsY3VsYXRlcyBpdHMgYnl0ZSBsZW5ndGggYW5kIHB1dHMgaXQgaW50byBhIGxpbmtlZFxuICAgIC8vIGxpc3Qgb2Ygb3BlcmF0aW9ucyB0byBwZXJmb3JtIHdoZW4gZmluaXNoKCkgaXMgY2FsbGVkLiBUaGlzIGJvdGggYWxsb3dzIHVzIHRvIGFsbG9jYXRlXG4gICAgLy8gYnVmZmVycyBvZiB0aGUgZXhhY3QgcmVxdWlyZWQgc2l6ZSBhbmQgcmVkdWNlcyB0aGUgYW1vdW50IG9mIHdvcmsgd2UgaGF2ZSB0byBkbyBjb21wYXJlZFxuICAgIC8vIHRvIGZpcnN0IGNhbGN1bGF0aW5nIG92ZXIgb2JqZWN0cyBhbmQgdGhlbiBlbmNvZGluZyBvdmVyIG9iamVjdHMuIEluIG91ciBjYXNlLCB0aGUgZW5jb2RpbmdcbiAgICAvLyBwYXJ0IGlzIGp1c3QgYSBsaW5rZWQgbGlzdCB3YWxrIGNhbGxpbmcgb3BlcmF0aW9ucyB3aXRoIGFscmVhZHkgcHJlcGFyZWQgdmFsdWVzLlxufVxuXG52YXIgY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKCkge1xuICAgIHJldHVybiB1dGlsLkJ1ZmZlclxuICAgICAgICA/IGZ1bmN0aW9uIGNyZWF0ZV9idWZmZXJfc2V0dXAoKSB7XG4gICAgICAgICAgICByZXR1cm4gKFdyaXRlci5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGVfYnVmZmVyKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQnVmZmVyV3JpdGVyKCk7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgIDogZnVuY3Rpb24gY3JlYXRlX2FycmF5KCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBXcml0ZXIoKTtcbiAgICAgICAgfTtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyB3cml0ZXIuXG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtCdWZmZXJXcml0ZXJ8V3JpdGVyfSBBIHtAbGluayBCdWZmZXJXcml0ZXJ9IHdoZW4gQnVmZmVycyBhcmUgc3VwcG9ydGVkLCBvdGhlcndpc2UgYSB7QGxpbmsgV3JpdGVyfVxuICovXG5Xcml0ZXIuY3JlYXRlID0gY3JlYXRlKCk7XG5cbi8qKlxuICogQWxsb2NhdGVzIGEgYnVmZmVyIG9mIHRoZSBzcGVjaWZpZWQgc2l6ZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBzaXplIEJ1ZmZlciBzaXplXG4gKiBAcmV0dXJucyB7VWludDhBcnJheX0gQnVmZmVyXG4gKi9cbldyaXRlci5hbGxvYyA9IGZ1bmN0aW9uIGFsbG9jKHNpemUpIHtcbiAgICByZXR1cm4gbmV3IHV0aWwuQXJyYXkoc2l6ZSk7XG59O1xuXG4vLyBVc2UgVWludDhBcnJheSBidWZmZXIgcG9vbCBpbiB0aGUgYnJvd3NlciwganVzdCBsaWtlIG5vZGUgZG9lcyB3aXRoIGJ1ZmZlcnNcbi8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG5pZiAodXRpbC5BcnJheSAhPT0gQXJyYXkpXG4gICAgV3JpdGVyLmFsbG9jID0gdXRpbC5wb29sKFdyaXRlci5hbGxvYywgdXRpbC5BcnJheS5wcm90b3R5cGUuc3ViYXJyYXkpO1xuXG4vKipcbiAqIFB1c2hlcyBhIG5ldyBvcGVyYXRpb24gdG8gdGhlIHF1ZXVlLlxuICogQHBhcmFtIHtmdW5jdGlvbihVaW50OEFycmF5LCBudW1iZXIsICopfSBmbiBGdW5jdGlvbiB0byBjYWxsXG4gKiBAcGFyYW0ge251bWJlcn0gbGVuIFZhbHVlIGJ5dGUgbGVuZ3RoXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsIFZhbHVlIHRvIHdyaXRlXG4gKiBAcmV0dXJucyB7V3JpdGVyfSBgdGhpc2BcbiAqIEBwcml2YXRlXG4gKi9cbldyaXRlci5wcm90b3R5cGUuX3B1c2ggPSBmdW5jdGlvbiBwdXNoKGZuLCBsZW4sIHZhbCkge1xuICAgIHRoaXMudGFpbCA9IHRoaXMudGFpbC5uZXh0ID0gbmV3IE9wKGZuLCBsZW4sIHZhbCk7XG4gICAgdGhpcy5sZW4gKz0gbGVuO1xuICAgIHJldHVybiB0aGlzO1xufTtcblxuZnVuY3Rpb24gd3JpdGVCeXRlKHZhbCwgYnVmLCBwb3MpIHtcbiAgICBidWZbcG9zXSA9IHZhbCAmIDI1NTtcbn1cblxuZnVuY3Rpb24gd3JpdGVWYXJpbnQzMih2YWwsIGJ1ZiwgcG9zKSB7XG4gICAgd2hpbGUgKHZhbCA+IDEyNykge1xuICAgICAgICBidWZbcG9zKytdID0gdmFsICYgMTI3IHwgMTI4O1xuICAgICAgICB2YWwgPj4+PSA3O1xuICAgIH1cbiAgICBidWZbcG9zXSA9IHZhbDtcbn1cblxuLyoqXG4gKiBDb25zdHJ1Y3RzIGEgbmV3IHZhcmludCB3cml0ZXIgb3BlcmF0aW9uIGluc3RhbmNlLlxuICogQGNsYXNzZGVzYyBTY2hlZHVsZWQgdmFyaW50IHdyaXRlciBvcGVyYXRpb24uXG4gKiBAZXh0ZW5kcyBPcFxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge251bWJlcn0gbGVuIFZhbHVlIGJ5dGUgbGVuZ3RoXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsIFZhbHVlIHRvIHdyaXRlXG4gKiBAaWdub3JlXG4gKi9cbmZ1bmN0aW9uIFZhcmludE9wKGxlbiwgdmFsKSB7XG4gICAgdGhpcy5sZW4gPSBsZW47XG4gICAgdGhpcy5uZXh0ID0gdW5kZWZpbmVkO1xuICAgIHRoaXMudmFsID0gdmFsO1xufVxuXG5WYXJpbnRPcC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKE9wLnByb3RvdHlwZSk7XG5WYXJpbnRPcC5wcm90b3R5cGUuZm4gPSB3cml0ZVZhcmludDMyO1xuXG4vKipcbiAqIFdyaXRlcyBhbiB1bnNpZ25lZCAzMiBiaXQgdmFsdWUgYXMgYSB2YXJpbnQuXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgVmFsdWUgdG8gd3JpdGVcbiAqIEByZXR1cm5zIHtXcml0ZXJ9IGB0aGlzYFxuICovXG5Xcml0ZXIucHJvdG90eXBlLnVpbnQzMiA9IGZ1bmN0aW9uIHdyaXRlX3VpbnQzMih2YWx1ZSkge1xuICAgIC8vIGhlcmUsIHRoZSBjYWxsIHRvIHRoaXMucHVzaCBoYXMgYmVlbiBpbmxpbmVkIGFuZCBhIHZhcmludCBzcGVjaWZpYyBPcCBzdWJjbGFzcyBpcyB1c2VkLlxuICAgIC8vIHVpbnQzMiBpcyBieSBmYXIgdGhlIG1vc3QgZnJlcXVlbnRseSB1c2VkIG9wZXJhdGlvbiBhbmQgYmVuZWZpdHMgc2lnbmlmaWNhbnRseSBmcm9tIHRoaXMuXG4gICAgdGhpcy5sZW4gKz0gKHRoaXMudGFpbCA9IHRoaXMudGFpbC5uZXh0ID0gbmV3IFZhcmludE9wKFxuICAgICAgICAodmFsdWUgPSB2YWx1ZSA+Pj4gMClcbiAgICAgICAgICAgICAgICA8IDEyOCAgICAgICA/IDFcbiAgICAgICAgOiB2YWx1ZSA8IDE2Mzg0ICAgICA/IDJcbiAgICAgICAgOiB2YWx1ZSA8IDIwOTcxNTIgICA/IDNcbiAgICAgICAgOiB2YWx1ZSA8IDI2ODQzNTQ1NiA/IDRcbiAgICAgICAgOiAgICAgICAgICAgICAgICAgICAgIDUsXG4gICAgdmFsdWUpKS5sZW47XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFdyaXRlcyBhIHNpZ25lZCAzMiBiaXQgdmFsdWUgYXMgYSB2YXJpbnQuXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSBWYWx1ZSB0byB3cml0ZVxuICogQHJldHVybnMge1dyaXRlcn0gYHRoaXNgXG4gKi9cbldyaXRlci5wcm90b3R5cGUuaW50MzIgPSBmdW5jdGlvbiB3cml0ZV9pbnQzMih2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSA8IDBcbiAgICAgICAgPyB0aGlzLl9wdXNoKHdyaXRlVmFyaW50NjQsIDEwLCBMb25nQml0cy5mcm9tTnVtYmVyKHZhbHVlKSkgLy8gMTAgYnl0ZXMgcGVyIHNwZWNcbiAgICAgICAgOiB0aGlzLnVpbnQzMih2YWx1ZSk7XG59O1xuXG4vKipcbiAqIFdyaXRlcyBhIDMyIGJpdCB2YWx1ZSBhcyBhIHZhcmludCwgemlnLXphZyBlbmNvZGVkLlxuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIFZhbHVlIHRvIHdyaXRlXG4gKiBAcmV0dXJucyB7V3JpdGVyfSBgdGhpc2BcbiAqL1xuV3JpdGVyLnByb3RvdHlwZS5zaW50MzIgPSBmdW5jdGlvbiB3cml0ZV9zaW50MzIodmFsdWUpIHtcbiAgICByZXR1cm4gdGhpcy51aW50MzIoKHZhbHVlIDw8IDEgXiB2YWx1ZSA+PiAzMSkgPj4+IDApO1xufTtcblxuZnVuY3Rpb24gd3JpdGVWYXJpbnQ2NCh2YWwsIGJ1ZiwgcG9zKSB7XG4gICAgd2hpbGUgKHZhbC5oaSkge1xuICAgICAgICBidWZbcG9zKytdID0gdmFsLmxvICYgMTI3IHwgMTI4O1xuICAgICAgICB2YWwubG8gPSAodmFsLmxvID4+PiA3IHwgdmFsLmhpIDw8IDI1KSA+Pj4gMDtcbiAgICAgICAgdmFsLmhpID4+Pj0gNztcbiAgICB9XG4gICAgd2hpbGUgKHZhbC5sbyA+IDEyNykge1xuICAgICAgICBidWZbcG9zKytdID0gdmFsLmxvICYgMTI3IHwgMTI4O1xuICAgICAgICB2YWwubG8gPSB2YWwubG8gPj4+IDc7XG4gICAgfVxuICAgIGJ1Zltwb3MrK10gPSB2YWwubG87XG59XG5cbi8qKlxuICogV3JpdGVzIGFuIHVuc2lnbmVkIDY0IGJpdCB2YWx1ZSBhcyBhIHZhcmludC5cbiAqIEBwYXJhbSB7TG9uZ3xudW1iZXJ8c3RyaW5nfSB2YWx1ZSBWYWx1ZSB0byB3cml0ZVxuICogQHJldHVybnMge1dyaXRlcn0gYHRoaXNgXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIGB2YWx1ZWAgaXMgYSBzdHJpbmcgYW5kIG5vIGxvbmcgbGlicmFyeSBpcyBwcmVzZW50LlxuICovXG5Xcml0ZXIucHJvdG90eXBlLnVpbnQ2NCA9IGZ1bmN0aW9uIHdyaXRlX3VpbnQ2NCh2YWx1ZSkge1xuICAgIHZhciBiaXRzID0gTG9uZ0JpdHMuZnJvbSh2YWx1ZSk7XG4gICAgcmV0dXJuIHRoaXMuX3B1c2god3JpdGVWYXJpbnQ2NCwgYml0cy5sZW5ndGgoKSwgYml0cyk7XG59O1xuXG4vKipcbiAqIFdyaXRlcyBhIHNpZ25lZCA2NCBiaXQgdmFsdWUgYXMgYSB2YXJpbnQuXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7TG9uZ3xudW1iZXJ8c3RyaW5nfSB2YWx1ZSBWYWx1ZSB0byB3cml0ZVxuICogQHJldHVybnMge1dyaXRlcn0gYHRoaXNgXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIGB2YWx1ZWAgaXMgYSBzdHJpbmcgYW5kIG5vIGxvbmcgbGlicmFyeSBpcyBwcmVzZW50LlxuICovXG5Xcml0ZXIucHJvdG90eXBlLmludDY0ID0gV3JpdGVyLnByb3RvdHlwZS51aW50NjQ7XG5cbi8qKlxuICogV3JpdGVzIGEgc2lnbmVkIDY0IGJpdCB2YWx1ZSBhcyBhIHZhcmludCwgemlnLXphZyBlbmNvZGVkLlxuICogQHBhcmFtIHtMb25nfG51bWJlcnxzdHJpbmd9IHZhbHVlIFZhbHVlIHRvIHdyaXRlXG4gKiBAcmV0dXJucyB7V3JpdGVyfSBgdGhpc2BcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgYHZhbHVlYCBpcyBhIHN0cmluZyBhbmQgbm8gbG9uZyBsaWJyYXJ5IGlzIHByZXNlbnQuXG4gKi9cbldyaXRlci5wcm90b3R5cGUuc2ludDY0ID0gZnVuY3Rpb24gd3JpdGVfc2ludDY0KHZhbHVlKSB7XG4gICAgdmFyIGJpdHMgPSBMb25nQml0cy5mcm9tKHZhbHVlKS56ekVuY29kZSgpO1xuICAgIHJldHVybiB0aGlzLl9wdXNoKHdyaXRlVmFyaW50NjQsIGJpdHMubGVuZ3RoKCksIGJpdHMpO1xufTtcblxuLyoqXG4gKiBXcml0ZXMgYSBib29saXNoIHZhbHVlIGFzIGEgdmFyaW50LlxuICogQHBhcmFtIHtib29sZWFufSB2YWx1ZSBWYWx1ZSB0byB3cml0ZVxuICogQHJldHVybnMge1dyaXRlcn0gYHRoaXNgXG4gKi9cbldyaXRlci5wcm90b3R5cGUuYm9vbCA9IGZ1bmN0aW9uIHdyaXRlX2Jvb2wodmFsdWUpIHtcbiAgICByZXR1cm4gdGhpcy5fcHVzaCh3cml0ZUJ5dGUsIDEsIHZhbHVlID8gMSA6IDApO1xufTtcblxuZnVuY3Rpb24gd3JpdGVGaXhlZDMyKHZhbCwgYnVmLCBwb3MpIHtcbiAgICBidWZbcG9zICAgIF0gPSAgdmFsICAgICAgICAgJiAyNTU7XG4gICAgYnVmW3BvcyArIDFdID0gIHZhbCA+Pj4gOCAgICYgMjU1O1xuICAgIGJ1Zltwb3MgKyAyXSA9ICB2YWwgPj4+IDE2ICAmIDI1NTtcbiAgICBidWZbcG9zICsgM10gPSAgdmFsID4+PiAyNDtcbn1cblxuLyoqXG4gKiBXcml0ZXMgYW4gdW5zaWduZWQgMzIgYml0IHZhbHVlIGFzIGZpeGVkIDMyIGJpdHMuXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgVmFsdWUgdG8gd3JpdGVcbiAqIEByZXR1cm5zIHtXcml0ZXJ9IGB0aGlzYFxuICovXG5Xcml0ZXIucHJvdG90eXBlLmZpeGVkMzIgPSBmdW5jdGlvbiB3cml0ZV9maXhlZDMyKHZhbHVlKSB7XG4gICAgcmV0dXJuIHRoaXMuX3B1c2god3JpdGVGaXhlZDMyLCA0LCB2YWx1ZSA+Pj4gMCk7XG59O1xuXG4vKipcbiAqIFdyaXRlcyBhIHNpZ25lZCAzMiBiaXQgdmFsdWUgYXMgZml4ZWQgMzIgYml0cy5cbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIFZhbHVlIHRvIHdyaXRlXG4gKiBAcmV0dXJucyB7V3JpdGVyfSBgdGhpc2BcbiAqL1xuV3JpdGVyLnByb3RvdHlwZS5zZml4ZWQzMiA9IFdyaXRlci5wcm90b3R5cGUuZml4ZWQzMjtcblxuLyoqXG4gKiBXcml0ZXMgYW4gdW5zaWduZWQgNjQgYml0IHZhbHVlIGFzIGZpeGVkIDY0IGJpdHMuXG4gKiBAcGFyYW0ge0xvbmd8bnVtYmVyfHN0cmluZ30gdmFsdWUgVmFsdWUgdG8gd3JpdGVcbiAqIEByZXR1cm5zIHtXcml0ZXJ9IGB0aGlzYFxuICogQHRocm93cyB7VHlwZUVycm9yfSBJZiBgdmFsdWVgIGlzIGEgc3RyaW5nIGFuZCBubyBsb25nIGxpYnJhcnkgaXMgcHJlc2VudC5cbiAqL1xuV3JpdGVyLnByb3RvdHlwZS5maXhlZDY0ID0gZnVuY3Rpb24gd3JpdGVfZml4ZWQ2NCh2YWx1ZSkge1xuICAgIHZhciBiaXRzID0gTG9uZ0JpdHMuZnJvbSh2YWx1ZSk7XG4gICAgcmV0dXJuIHRoaXMuX3B1c2god3JpdGVGaXhlZDMyLCA0LCBiaXRzLmxvKS5fcHVzaCh3cml0ZUZpeGVkMzIsIDQsIGJpdHMuaGkpO1xufTtcblxuLyoqXG4gKiBXcml0ZXMgYSBzaWduZWQgNjQgYml0IHZhbHVlIGFzIGZpeGVkIDY0IGJpdHMuXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7TG9uZ3xudW1iZXJ8c3RyaW5nfSB2YWx1ZSBWYWx1ZSB0byB3cml0ZVxuICogQHJldHVybnMge1dyaXRlcn0gYHRoaXNgXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIGB2YWx1ZWAgaXMgYSBzdHJpbmcgYW5kIG5vIGxvbmcgbGlicmFyeSBpcyBwcmVzZW50LlxuICovXG5Xcml0ZXIucHJvdG90eXBlLnNmaXhlZDY0ID0gV3JpdGVyLnByb3RvdHlwZS5maXhlZDY0O1xuXG4vKipcbiAqIFdyaXRlcyBhIGZsb2F0ICgzMiBiaXQpLlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgVmFsdWUgdG8gd3JpdGVcbiAqIEByZXR1cm5zIHtXcml0ZXJ9IGB0aGlzYFxuICovXG5Xcml0ZXIucHJvdG90eXBlLmZsb2F0ID0gZnVuY3Rpb24gd3JpdGVfZmxvYXQodmFsdWUpIHtcbiAgICByZXR1cm4gdGhpcy5fcHVzaCh1dGlsLmZsb2F0LndyaXRlRmxvYXRMRSwgNCwgdmFsdWUpO1xufTtcblxuLyoqXG4gKiBXcml0ZXMgYSBkb3VibGUgKDY0IGJpdCBmbG9hdCkuXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSBWYWx1ZSB0byB3cml0ZVxuICogQHJldHVybnMge1dyaXRlcn0gYHRoaXNgXG4gKi9cbldyaXRlci5wcm90b3R5cGUuZG91YmxlID0gZnVuY3Rpb24gd3JpdGVfZG91YmxlKHZhbHVlKSB7XG4gICAgcmV0dXJuIHRoaXMuX3B1c2godXRpbC5mbG9hdC53cml0ZURvdWJsZUxFLCA4LCB2YWx1ZSk7XG59O1xuXG52YXIgd3JpdGVCeXRlcyA9IHV0aWwuQXJyYXkucHJvdG90eXBlLnNldFxuICAgID8gZnVuY3Rpb24gd3JpdGVCeXRlc19zZXQodmFsLCBidWYsIHBvcykge1xuICAgICAgICBidWYuc2V0KHZhbCwgcG9zKTsgLy8gYWxzbyB3b3JrcyBmb3IgcGxhaW4gYXJyYXkgdmFsdWVzXG4gICAgfVxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgOiBmdW5jdGlvbiB3cml0ZUJ5dGVzX2Zvcih2YWwsIGJ1ZiwgcG9zKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmFsLmxlbmd0aDsgKytpKVxuICAgICAgICAgICAgYnVmW3BvcyArIGldID0gdmFsW2ldO1xuICAgIH07XG5cbi8qKlxuICogV3JpdGVzIGEgc2VxdWVuY2Ugb2YgYnl0ZXMuXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl8c3RyaW5nfSB2YWx1ZSBCdWZmZXIgb3IgYmFzZTY0IGVuY29kZWQgc3RyaW5nIHRvIHdyaXRlXG4gKiBAcmV0dXJucyB7V3JpdGVyfSBgdGhpc2BcbiAqL1xuV3JpdGVyLnByb3RvdHlwZS5ieXRlcyA9IGZ1bmN0aW9uIHdyaXRlX2J5dGVzKHZhbHVlKSB7XG4gICAgdmFyIGxlbiA9IHZhbHVlLmxlbmd0aCA+Pj4gMDtcbiAgICBpZiAoIWxlbilcbiAgICAgICAgcmV0dXJuIHRoaXMuX3B1c2god3JpdGVCeXRlLCAxLCAwKTtcbiAgICBpZiAodXRpbC5pc1N0cmluZyh2YWx1ZSkpIHtcbiAgICAgICAgdmFyIGJ1ZiA9IFdyaXRlci5hbGxvYyhsZW4gPSBiYXNlNjQubGVuZ3RoKHZhbHVlKSk7XG4gICAgICAgIGJhc2U2NC5kZWNvZGUodmFsdWUsIGJ1ZiwgMCk7XG4gICAgICAgIHZhbHVlID0gYnVmO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy51aW50MzIobGVuKS5fcHVzaCh3cml0ZUJ5dGVzLCBsZW4sIHZhbHVlKTtcbn07XG5cbi8qKlxuICogV3JpdGVzIGEgc3RyaW5nLlxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIFZhbHVlIHRvIHdyaXRlXG4gKiBAcmV0dXJucyB7V3JpdGVyfSBgdGhpc2BcbiAqL1xuV3JpdGVyLnByb3RvdHlwZS5zdHJpbmcgPSBmdW5jdGlvbiB3cml0ZV9zdHJpbmcodmFsdWUpIHtcbiAgICB2YXIgbGVuID0gdXRmOC5sZW5ndGgodmFsdWUpO1xuICAgIHJldHVybiBsZW5cbiAgICAgICAgPyB0aGlzLnVpbnQzMihsZW4pLl9wdXNoKHV0Zjgud3JpdGUsIGxlbiwgdmFsdWUpXG4gICAgICAgIDogdGhpcy5fcHVzaCh3cml0ZUJ5dGUsIDEsIDApO1xufTtcblxuLyoqXG4gKiBGb3JrcyB0aGlzIHdyaXRlcidzIHN0YXRlIGJ5IHB1c2hpbmcgaXQgdG8gYSBzdGFjay5cbiAqIENhbGxpbmcge0BsaW5rIFdyaXRlciNyZXNldHxyZXNldH0gb3Ige0BsaW5rIFdyaXRlciNsZGVsaW18bGRlbGltfSByZXNldHMgdGhlIHdyaXRlciB0byB0aGUgcHJldmlvdXMgc3RhdGUuXG4gKiBAcmV0dXJucyB7V3JpdGVyfSBgdGhpc2BcbiAqL1xuV3JpdGVyLnByb3RvdHlwZS5mb3JrID0gZnVuY3Rpb24gZm9yaygpIHtcbiAgICB0aGlzLnN0YXRlcyA9IG5ldyBTdGF0ZSh0aGlzKTtcbiAgICB0aGlzLmhlYWQgPSB0aGlzLnRhaWwgPSBuZXcgT3Aobm9vcCwgMCwgMCk7XG4gICAgdGhpcy5sZW4gPSAwO1xuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZXNldHMgdGhpcyBpbnN0YW5jZSB0byB0aGUgbGFzdCBzdGF0ZS5cbiAqIEByZXR1cm5zIHtXcml0ZXJ9IGB0aGlzYFxuICovXG5Xcml0ZXIucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgaWYgKHRoaXMuc3RhdGVzKSB7XG4gICAgICAgIHRoaXMuaGVhZCAgID0gdGhpcy5zdGF0ZXMuaGVhZDtcbiAgICAgICAgdGhpcy50YWlsICAgPSB0aGlzLnN0YXRlcy50YWlsO1xuICAgICAgICB0aGlzLmxlbiAgICA9IHRoaXMuc3RhdGVzLmxlbjtcbiAgICAgICAgdGhpcy5zdGF0ZXMgPSB0aGlzLnN0YXRlcy5uZXh0O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuaGVhZCA9IHRoaXMudGFpbCA9IG5ldyBPcChub29wLCAwLCAwKTtcbiAgICAgICAgdGhpcy5sZW4gID0gMDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFJlc2V0cyB0byB0aGUgbGFzdCBzdGF0ZSBhbmQgYXBwZW5kcyB0aGUgZm9yayBzdGF0ZSdzIGN1cnJlbnQgd3JpdGUgbGVuZ3RoIGFzIGEgdmFyaW50IGZvbGxvd2VkIGJ5IGl0cyBvcGVyYXRpb25zLlxuICogQHJldHVybnMge1dyaXRlcn0gYHRoaXNgXG4gKi9cbldyaXRlci5wcm90b3R5cGUubGRlbGltID0gZnVuY3Rpb24gbGRlbGltKCkge1xuICAgIHZhciBoZWFkID0gdGhpcy5oZWFkLFxuICAgICAgICB0YWlsID0gdGhpcy50YWlsLFxuICAgICAgICBsZW4gID0gdGhpcy5sZW47XG4gICAgdGhpcy5yZXNldCgpLnVpbnQzMihsZW4pO1xuICAgIGlmIChsZW4pIHtcbiAgICAgICAgdGhpcy50YWlsLm5leHQgPSBoZWFkLm5leHQ7IC8vIHNraXAgbm9vcFxuICAgICAgICB0aGlzLnRhaWwgPSB0YWlsO1xuICAgICAgICB0aGlzLmxlbiArPSBsZW47XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBGaW5pc2hlcyB0aGUgd3JpdGUgb3BlcmF0aW9uLlxuICogQHJldHVybnMge1VpbnQ4QXJyYXl9IEZpbmlzaGVkIGJ1ZmZlclxuICovXG5Xcml0ZXIucHJvdG90eXBlLmZpbmlzaCA9IGZ1bmN0aW9uIGZpbmlzaCgpIHtcbiAgICB2YXIgaGVhZCA9IHRoaXMuaGVhZC5uZXh0LCAvLyBza2lwIG5vb3BcbiAgICAgICAgYnVmICA9IHRoaXMuY29uc3RydWN0b3IuYWxsb2ModGhpcy5sZW4pLFxuICAgICAgICBwb3MgID0gMDtcbiAgICB3aGlsZSAoaGVhZCkge1xuICAgICAgICBoZWFkLmZuKGhlYWQudmFsLCBidWYsIHBvcyk7XG4gICAgICAgIHBvcyArPSBoZWFkLmxlbjtcbiAgICAgICAgaGVhZCA9IGhlYWQubmV4dDtcbiAgICB9XG4gICAgLy8gdGhpcy5oZWFkID0gdGhpcy50YWlsID0gbnVsbDtcbiAgICByZXR1cm4gYnVmO1xufTtcblxuV3JpdGVyLl9jb25maWd1cmUgPSBmdW5jdGlvbihCdWZmZXJXcml0ZXJfKSB7XG4gICAgQnVmZmVyV3JpdGVyID0gQnVmZmVyV3JpdGVyXztcbiAgICBXcml0ZXIuY3JlYXRlID0gY3JlYXRlKCk7XG4gICAgQnVmZmVyV3JpdGVyLl9jb25maWd1cmUoKTtcbn07XG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IEJ1ZmZlcldyaXRlcjtcblxuLy8gZXh0ZW5kcyBXcml0ZXJcbnZhciBXcml0ZXIgPSByZXF1aXJlKFwiLi93cml0ZXJcIik7XG4oQnVmZmVyV3JpdGVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoV3JpdGVyLnByb3RvdHlwZSkpLmNvbnN0cnVjdG9yID0gQnVmZmVyV3JpdGVyO1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoXCIuL3V0aWwvbWluaW1hbFwiKTtcblxuLyoqXG4gKiBDb25zdHJ1Y3RzIGEgbmV3IGJ1ZmZlciB3cml0ZXIgaW5zdGFuY2UuXG4gKiBAY2xhc3NkZXNjIFdpcmUgZm9ybWF0IHdyaXRlciB1c2luZyBub2RlIGJ1ZmZlcnMuXG4gKiBAZXh0ZW5kcyBXcml0ZXJcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBCdWZmZXJXcml0ZXIoKSB7XG4gICAgV3JpdGVyLmNhbGwodGhpcyk7XG59XG5cbkJ1ZmZlcldyaXRlci5fY29uZmlndXJlID0gZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIEFsbG9jYXRlcyBhIGJ1ZmZlciBvZiB0aGUgc3BlY2lmaWVkIHNpemUuXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNpemUgQnVmZmVyIHNpemVcbiAgICAgKiBAcmV0dXJucyB7QnVmZmVyfSBCdWZmZXJcbiAgICAgKi9cbiAgICBCdWZmZXJXcml0ZXIuYWxsb2MgPSB1dGlsLl9CdWZmZXJfYWxsb2NVbnNhZmU7XG5cbiAgICBCdWZmZXJXcml0ZXIud3JpdGVCeXRlc0J1ZmZlciA9IHV0aWwuQnVmZmVyICYmIHV0aWwuQnVmZmVyLnByb3RvdHlwZSBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkgJiYgdXRpbC5CdWZmZXIucHJvdG90eXBlLnNldC5uYW1lID09PSBcInNldFwiXG4gICAgICAgID8gZnVuY3Rpb24gd3JpdGVCeXRlc0J1ZmZlcl9zZXQodmFsLCBidWYsIHBvcykge1xuICAgICAgICAgIGJ1Zi5zZXQodmFsLCBwb3MpOyAvLyBmYXN0ZXIgdGhhbiBjb3B5IChyZXF1aXJlcyBub2RlID49IDQgd2hlcmUgQnVmZmVycyBleHRlbmQgVWludDhBcnJheSBhbmQgc2V0IGlzIHByb3Blcmx5IGluaGVyaXRlZClcbiAgICAgICAgICAvLyBhbHNvIHdvcmtzIGZvciBwbGFpbiBhcnJheSB2YWx1ZXNcbiAgICAgICAgfVxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICA6IGZ1bmN0aW9uIHdyaXRlQnl0ZXNCdWZmZXJfY29weSh2YWwsIGJ1ZiwgcG9zKSB7XG4gICAgICAgICAgaWYgKHZhbC5jb3B5KSAvLyBCdWZmZXIgdmFsdWVzXG4gICAgICAgICAgICB2YWwuY29weShidWYsIHBvcywgMCwgdmFsLmxlbmd0aCk7XG4gICAgICAgICAgZWxzZSBmb3IgKHZhciBpID0gMDsgaSA8IHZhbC5sZW5ndGg7KSAvLyBwbGFpbiBhcnJheSB2YWx1ZXNcbiAgICAgICAgICAgIGJ1Zltwb3MrK10gPSB2YWxbaSsrXTtcbiAgICAgICAgfTtcbn07XG5cblxuLyoqXG4gKiBAb3ZlcnJpZGVcbiAqL1xuQnVmZmVyV3JpdGVyLnByb3RvdHlwZS5ieXRlcyA9IGZ1bmN0aW9uIHdyaXRlX2J5dGVzX2J1ZmZlcih2YWx1ZSkge1xuICAgIGlmICh1dGlsLmlzU3RyaW5nKHZhbHVlKSlcbiAgICAgICAgdmFsdWUgPSB1dGlsLl9CdWZmZXJfZnJvbSh2YWx1ZSwgXCJiYXNlNjRcIik7XG4gICAgdmFyIGxlbiA9IHZhbHVlLmxlbmd0aCA+Pj4gMDtcbiAgICB0aGlzLnVpbnQzMihsZW4pO1xuICAgIGlmIChsZW4pXG4gICAgICAgIHRoaXMuX3B1c2goQnVmZmVyV3JpdGVyLndyaXRlQnl0ZXNCdWZmZXIsIGxlbiwgdmFsdWUpO1xuICAgIHJldHVybiB0aGlzO1xufTtcblxuZnVuY3Rpb24gd3JpdGVTdHJpbmdCdWZmZXIodmFsLCBidWYsIHBvcykge1xuICAgIGlmICh2YWwubGVuZ3RoIDwgNDApIC8vIHBsYWluIGpzIGlzIGZhc3RlciBmb3Igc2hvcnQgc3RyaW5ncyAocHJvYmFibHkgZHVlIHRvIHJlZHVuZGFudCBhc3NlcnRpb25zKVxuICAgICAgICB1dGlsLnV0Zjgud3JpdGUodmFsLCBidWYsIHBvcyk7XG4gICAgZWxzZSBpZiAoYnVmLnV0ZjhXcml0ZSlcbiAgICAgICAgYnVmLnV0ZjhXcml0ZSh2YWwsIHBvcyk7XG4gICAgZWxzZVxuICAgICAgICBidWYud3JpdGUodmFsLCBwb3MpO1xufVxuXG4vKipcbiAqIEBvdmVycmlkZVxuICovXG5CdWZmZXJXcml0ZXIucHJvdG90eXBlLnN0cmluZyA9IGZ1bmN0aW9uIHdyaXRlX3N0cmluZ19idWZmZXIodmFsdWUpIHtcbiAgICB2YXIgbGVuID0gdXRpbC5CdWZmZXIuYnl0ZUxlbmd0aCh2YWx1ZSk7XG4gICAgdGhpcy51aW50MzIobGVuKTtcbiAgICBpZiAobGVuKVxuICAgICAgICB0aGlzLl9wdXNoKHdyaXRlU3RyaW5nQnVmZmVyLCBsZW4sIHZhbHVlKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5cblxuLyoqXG4gKiBGaW5pc2hlcyB0aGUgd3JpdGUgb3BlcmF0aW9uLlxuICogQG5hbWUgQnVmZmVyV3JpdGVyI2ZpbmlzaFxuICogQGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7QnVmZmVyfSBGaW5pc2hlZCBidWZmZXJcbiAqL1xuXG5CdWZmZXJXcml0ZXIuX2NvbmZpZ3VyZSgpO1xuIiwgIlwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBSZWFkZXI7XG5cbnZhciB1dGlsICAgICAgPSByZXF1aXJlKFwiLi91dGlsL21pbmltYWxcIik7XG5cbnZhciBCdWZmZXJSZWFkZXI7IC8vIGN5Y2xpY1xuXG52YXIgTG9uZ0JpdHMgID0gdXRpbC5Mb25nQml0cyxcbiAgICB1dGY4ICAgICAgPSB1dGlsLnV0Zjg7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5mdW5jdGlvbiBpbmRleE91dE9mUmFuZ2UocmVhZGVyLCB3cml0ZUxlbmd0aCkge1xuICAgIHJldHVybiBSYW5nZUVycm9yKFwiaW5kZXggb3V0IG9mIHJhbmdlOiBcIiArIHJlYWRlci5wb3MgKyBcIiArIFwiICsgKHdyaXRlTGVuZ3RoIHx8IDEpICsgXCIgPiBcIiArIHJlYWRlci5sZW4pO1xufVxuXG4vKipcbiAqIENvbnN0cnVjdHMgYSBuZXcgcmVhZGVyIGluc3RhbmNlIHVzaW5nIHRoZSBzcGVjaWZpZWQgYnVmZmVyLlxuICogQGNsYXNzZGVzYyBXaXJlIGZvcm1hdCByZWFkZXIgdXNpbmcgYFVpbnQ4QXJyYXlgIGlmIGF2YWlsYWJsZSwgb3RoZXJ3aXNlIGBBcnJheWAuXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7VWludDhBcnJheX0gYnVmZmVyIEJ1ZmZlciB0byByZWFkIGZyb21cbiAqL1xuZnVuY3Rpb24gUmVhZGVyKGJ1ZmZlcikge1xuXG4gICAgLyoqXG4gICAgICogUmVhZCBidWZmZXIuXG4gICAgICogQHR5cGUge1VpbnQ4QXJyYXl9XG4gICAgICovXG4gICAgdGhpcy5idWYgPSBidWZmZXI7XG5cbiAgICAvKipcbiAgICAgKiBSZWFkIGJ1ZmZlciBwb3NpdGlvbi5cbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMucG9zID0gMDtcblxuICAgIC8qKlxuICAgICAqIFJlYWQgYnVmZmVyIGxlbmd0aC5cbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMubGVuID0gYnVmZmVyLmxlbmd0aDtcbn1cblxudmFyIGNyZWF0ZV9hcnJheSA9IHR5cGVvZiBVaW50OEFycmF5ICE9PSBcInVuZGVmaW5lZFwiXG4gICAgPyBmdW5jdGlvbiBjcmVhdGVfdHlwZWRfYXJyYXkoYnVmZmVyKSB7XG4gICAgICAgIGlmIChidWZmZXIgaW5zdGFuY2VvZiBVaW50OEFycmF5IHx8IEFycmF5LmlzQXJyYXkoYnVmZmVyKSlcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmVhZGVyKGJ1ZmZlcik7XG4gICAgICAgIHRocm93IEVycm9yKFwiaWxsZWdhbCBidWZmZXJcIik7XG4gICAgfVxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgOiBmdW5jdGlvbiBjcmVhdGVfYXJyYXkoYnVmZmVyKSB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGJ1ZmZlcikpXG4gICAgICAgICAgICByZXR1cm4gbmV3IFJlYWRlcihidWZmZXIpO1xuICAgICAgICB0aHJvdyBFcnJvcihcImlsbGVnYWwgYnVmZmVyXCIpO1xuICAgIH07XG5cbnZhciBjcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoKSB7XG4gICAgcmV0dXJuIHV0aWwuQnVmZmVyXG4gICAgICAgID8gZnVuY3Rpb24gY3JlYXRlX2J1ZmZlcl9zZXR1cChidWZmZXIpIHtcbiAgICAgICAgICAgIHJldHVybiAoUmVhZGVyLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZV9idWZmZXIoYnVmZmVyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHV0aWwuQnVmZmVyLmlzQnVmZmVyKGJ1ZmZlcilcbiAgICAgICAgICAgICAgICAgICAgPyBuZXcgQnVmZmVyUmVhZGVyKGJ1ZmZlcilcbiAgICAgICAgICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgICAgICAgICAgICAgOiBjcmVhdGVfYXJyYXkoYnVmZmVyKTtcbiAgICAgICAgICAgIH0pKGJ1ZmZlcik7XG4gICAgICAgIH1cbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgOiBjcmVhdGVfYXJyYXk7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgcmVhZGVyIHVzaW5nIHRoZSBzcGVjaWZpZWQgYnVmZmVyLlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl8QnVmZmVyfSBidWZmZXIgQnVmZmVyIHRvIHJlYWQgZnJvbVxuICogQHJldHVybnMge1JlYWRlcnxCdWZmZXJSZWFkZXJ9IEEge0BsaW5rIEJ1ZmZlclJlYWRlcn0gaWYgYGJ1ZmZlcmAgaXMgYSBCdWZmZXIsIG90aGVyd2lzZSBhIHtAbGluayBSZWFkZXJ9XG4gKiBAdGhyb3dzIHtFcnJvcn0gSWYgYGJ1ZmZlcmAgaXMgbm90IGEgdmFsaWQgYnVmZmVyXG4gKi9cblJlYWRlci5jcmVhdGUgPSBjcmVhdGUoKTtcblxuUmVhZGVyLnByb3RvdHlwZS5fc2xpY2UgPSB1dGlsLkFycmF5LnByb3RvdHlwZS5zdWJhcnJheSB8fCAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqLyB1dGlsLkFycmF5LnByb3RvdHlwZS5zbGljZTtcblxuLyoqXG4gKiBSZWFkcyBhIHZhcmludCBhcyBhbiB1bnNpZ25lZCAzMiBiaXQgdmFsdWUuXG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFZhbHVlIHJlYWRcbiAqL1xuUmVhZGVyLnByb3RvdHlwZS51aW50MzIgPSAoZnVuY3Rpb24gcmVhZF91aW50MzJfc2V0dXAoKSB7XG4gICAgdmFyIHZhbHVlID0gNDI5NDk2NzI5NTsgLy8gb3B0aW1pemVyIHR5cGUtaGludCwgdGVuZHMgdG8gZGVvcHQgb3RoZXJ3aXNlICg/ISlcbiAgICByZXR1cm4gZnVuY3Rpb24gcmVhZF91aW50MzIoKSB7XG4gICAgICAgIHZhbHVlID0gKCAgICAgICAgIHRoaXMuYnVmW3RoaXMucG9zXSAmIDEyNyAgICAgICApID4+PiAwOyBpZiAodGhpcy5idWZbdGhpcy5wb3MrK10gPCAxMjgpIHJldHVybiB2YWx1ZTtcbiAgICAgICAgdmFsdWUgPSAodmFsdWUgfCAodGhpcy5idWZbdGhpcy5wb3NdICYgMTI3KSA8PCAgNykgPj4+IDA7IGlmICh0aGlzLmJ1Zlt0aGlzLnBvcysrXSA8IDEyOCkgcmV0dXJuIHZhbHVlO1xuICAgICAgICB2YWx1ZSA9ICh2YWx1ZSB8ICh0aGlzLmJ1Zlt0aGlzLnBvc10gJiAxMjcpIDw8IDE0KSA+Pj4gMDsgaWYgKHRoaXMuYnVmW3RoaXMucG9zKytdIDwgMTI4KSByZXR1cm4gdmFsdWU7XG4gICAgICAgIHZhbHVlID0gKHZhbHVlIHwgKHRoaXMuYnVmW3RoaXMucG9zXSAmIDEyNykgPDwgMjEpID4+PiAwOyBpZiAodGhpcy5idWZbdGhpcy5wb3MrK10gPCAxMjgpIHJldHVybiB2YWx1ZTtcbiAgICAgICAgdmFsdWUgPSAodmFsdWUgfCAodGhpcy5idWZbdGhpcy5wb3NdICYgIDE1KSA8PCAyOCkgPj4+IDA7IGlmICh0aGlzLmJ1Zlt0aGlzLnBvcysrXSA8IDEyOCkgcmV0dXJuIHZhbHVlO1xuXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICBpZiAoKHRoaXMucG9zICs9IDUpID4gdGhpcy5sZW4pIHtcbiAgICAgICAgICAgIHRoaXMucG9zID0gdGhpcy5sZW47XG4gICAgICAgICAgICB0aHJvdyBpbmRleE91dE9mUmFuZ2UodGhpcywgMTApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9O1xufSkoKTtcblxuLyoqXG4gKiBSZWFkcyBhIHZhcmludCBhcyBhIHNpZ25lZCAzMiBiaXQgdmFsdWUuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBWYWx1ZSByZWFkXG4gKi9cblJlYWRlci5wcm90b3R5cGUuaW50MzIgPSBmdW5jdGlvbiByZWFkX2ludDMyKCkge1xuICAgIHJldHVybiB0aGlzLnVpbnQzMigpIHwgMDtcbn07XG5cbi8qKlxuICogUmVhZHMgYSB6aWctemFnIGVuY29kZWQgdmFyaW50IGFzIGEgc2lnbmVkIDMyIGJpdCB2YWx1ZS5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFZhbHVlIHJlYWRcbiAqL1xuUmVhZGVyLnByb3RvdHlwZS5zaW50MzIgPSBmdW5jdGlvbiByZWFkX3NpbnQzMigpIHtcbiAgICB2YXIgdmFsdWUgPSB0aGlzLnVpbnQzMigpO1xuICAgIHJldHVybiB2YWx1ZSA+Pj4gMSBeIC0odmFsdWUgJiAxKSB8IDA7XG59O1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1pbnZhbGlkLXRoaXMgKi9cblxuZnVuY3Rpb24gcmVhZExvbmdWYXJpbnQoKSB7XG4gICAgLy8gdGVuZHMgdG8gZGVvcHQgd2l0aCBsb2NhbCB2YXJzIGZvciBvY3RldCBldGMuXG4gICAgdmFyIGJpdHMgPSBuZXcgTG9uZ0JpdHMoMCwgMCk7XG4gICAgdmFyIGkgPSAwO1xuICAgIGlmICh0aGlzLmxlbiAtIHRoaXMucG9zID4gNCkgeyAvLyBmYXN0IHJvdXRlIChsbylcbiAgICAgICAgZm9yICg7IGkgPCA0OyArK2kpIHtcbiAgICAgICAgICAgIC8vIDFzdC4uNHRoXG4gICAgICAgICAgICBiaXRzLmxvID0gKGJpdHMubG8gfCAodGhpcy5idWZbdGhpcy5wb3NdICYgMTI3KSA8PCBpICogNykgPj4+IDA7XG4gICAgICAgICAgICBpZiAodGhpcy5idWZbdGhpcy5wb3MrK10gPCAxMjgpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJpdHM7XG4gICAgICAgIH1cbiAgICAgICAgLy8gNXRoXG4gICAgICAgIGJpdHMubG8gPSAoYml0cy5sbyB8ICh0aGlzLmJ1Zlt0aGlzLnBvc10gJiAxMjcpIDw8IDI4KSA+Pj4gMDtcbiAgICAgICAgYml0cy5oaSA9IChiaXRzLmhpIHwgKHRoaXMuYnVmW3RoaXMucG9zXSAmIDEyNykgPj4gIDQpID4+PiAwO1xuICAgICAgICBpZiAodGhpcy5idWZbdGhpcy5wb3MrK10gPCAxMjgpXG4gICAgICAgICAgICByZXR1cm4gYml0cztcbiAgICAgICAgaSA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZm9yICg7IGkgPCAzOyArK2kpIHtcbiAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICAgICAgaWYgKHRoaXMucG9zID49IHRoaXMubGVuKVxuICAgICAgICAgICAgICAgIHRocm93IGluZGV4T3V0T2ZSYW5nZSh0aGlzKTtcbiAgICAgICAgICAgIC8vIDFzdC4uM3RoXG4gICAgICAgICAgICBiaXRzLmxvID0gKGJpdHMubG8gfCAodGhpcy5idWZbdGhpcy5wb3NdICYgMTI3KSA8PCBpICogNykgPj4+IDA7XG4gICAgICAgICAgICBpZiAodGhpcy5idWZbdGhpcy5wb3MrK10gPCAxMjgpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJpdHM7XG4gICAgICAgIH1cbiAgICAgICAgLy8gNHRoXG4gICAgICAgIGJpdHMubG8gPSAoYml0cy5sbyB8ICh0aGlzLmJ1Zlt0aGlzLnBvcysrXSAmIDEyNykgPDwgaSAqIDcpID4+PiAwO1xuICAgICAgICByZXR1cm4gYml0cztcbiAgICB9XG4gICAgaWYgKHRoaXMubGVuIC0gdGhpcy5wb3MgPiA0KSB7IC8vIGZhc3Qgcm91dGUgKGhpKVxuICAgICAgICBmb3IgKDsgaSA8IDU7ICsraSkge1xuICAgICAgICAgICAgLy8gNnRoLi4xMHRoXG4gICAgICAgICAgICBiaXRzLmhpID0gKGJpdHMuaGkgfCAodGhpcy5idWZbdGhpcy5wb3NdICYgMTI3KSA8PCBpICogNyArIDMpID4+PiAwO1xuICAgICAgICAgICAgaWYgKHRoaXMuYnVmW3RoaXMucG9zKytdIDwgMTI4KVxuICAgICAgICAgICAgICAgIHJldHVybiBiaXRzO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZm9yICg7IGkgPCA1OyArK2kpIHtcbiAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICAgICAgaWYgKHRoaXMucG9zID49IHRoaXMubGVuKVxuICAgICAgICAgICAgICAgIHRocm93IGluZGV4T3V0T2ZSYW5nZSh0aGlzKTtcbiAgICAgICAgICAgIC8vIDZ0aC4uMTB0aFxuICAgICAgICAgICAgYml0cy5oaSA9IChiaXRzLmhpIHwgKHRoaXMuYnVmW3RoaXMucG9zXSAmIDEyNykgPDwgaSAqIDcgKyAzKSA+Pj4gMDtcbiAgICAgICAgICAgIGlmICh0aGlzLmJ1Zlt0aGlzLnBvcysrXSA8IDEyOClcbiAgICAgICAgICAgICAgICByZXR1cm4gYml0cztcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIHRocm93IEVycm9yKFwiaW52YWxpZCB2YXJpbnQgZW5jb2RpbmdcIik7XG59XG5cbi8qIGVzbGludC1lbmFibGUgbm8taW52YWxpZC10aGlzICovXG5cbi8qKlxuICogUmVhZHMgYSB2YXJpbnQgYXMgYSBzaWduZWQgNjQgYml0IHZhbHVlLlxuICogQG5hbWUgUmVhZGVyI2ludDY0XG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtMb25nfSBWYWx1ZSByZWFkXG4gKi9cblxuLyoqXG4gKiBSZWFkcyBhIHZhcmludCBhcyBhbiB1bnNpZ25lZCA2NCBiaXQgdmFsdWUuXG4gKiBAbmFtZSBSZWFkZXIjdWludDY0XG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtMb25nfSBWYWx1ZSByZWFkXG4gKi9cblxuLyoqXG4gKiBSZWFkcyBhIHppZy16YWcgZW5jb2RlZCB2YXJpbnQgYXMgYSBzaWduZWQgNjQgYml0IHZhbHVlLlxuICogQG5hbWUgUmVhZGVyI3NpbnQ2NFxuICogQGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7TG9uZ30gVmFsdWUgcmVhZFxuICovXG5cbi8qKlxuICogUmVhZHMgYSB2YXJpbnQgYXMgYSBib29sZWFuLlxuICogQHJldHVybnMge2Jvb2xlYW59IFZhbHVlIHJlYWRcbiAqL1xuUmVhZGVyLnByb3RvdHlwZS5ib29sID0gZnVuY3Rpb24gcmVhZF9ib29sKCkge1xuICAgIHJldHVybiB0aGlzLnVpbnQzMigpICE9PSAwO1xufTtcblxuZnVuY3Rpb24gcmVhZEZpeGVkMzJfZW5kKGJ1ZiwgZW5kKSB7IC8vIG5vdGUgdGhhdCB0aGlzIHVzZXMgYGVuZGAsIG5vdCBgcG9zYFxuICAgIHJldHVybiAoYnVmW2VuZCAtIDRdXG4gICAgICAgICAgfCBidWZbZW5kIC0gM10gPDwgOFxuICAgICAgICAgIHwgYnVmW2VuZCAtIDJdIDw8IDE2XG4gICAgICAgICAgfCBidWZbZW5kIC0gMV0gPDwgMjQpID4+PiAwO1xufVxuXG4vKipcbiAqIFJlYWRzIGZpeGVkIDMyIGJpdHMgYXMgYW4gdW5zaWduZWQgMzIgYml0IGludGVnZXIuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBWYWx1ZSByZWFkXG4gKi9cblJlYWRlci5wcm90b3R5cGUuZml4ZWQzMiA9IGZ1bmN0aW9uIHJlYWRfZml4ZWQzMigpIHtcblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmICh0aGlzLnBvcyArIDQgPiB0aGlzLmxlbilcbiAgICAgICAgdGhyb3cgaW5kZXhPdXRPZlJhbmdlKHRoaXMsIDQpO1xuXG4gICAgcmV0dXJuIHJlYWRGaXhlZDMyX2VuZCh0aGlzLmJ1ZiwgdGhpcy5wb3MgKz0gNCk7XG59O1xuXG4vKipcbiAqIFJlYWRzIGZpeGVkIDMyIGJpdHMgYXMgYSBzaWduZWQgMzIgYml0IGludGVnZXIuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBWYWx1ZSByZWFkXG4gKi9cblJlYWRlci5wcm90b3R5cGUuc2ZpeGVkMzIgPSBmdW5jdGlvbiByZWFkX3NmaXhlZDMyKCkge1xuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKHRoaXMucG9zICsgNCA+IHRoaXMubGVuKVxuICAgICAgICB0aHJvdyBpbmRleE91dE9mUmFuZ2UodGhpcywgNCk7XG5cbiAgICByZXR1cm4gcmVhZEZpeGVkMzJfZW5kKHRoaXMuYnVmLCB0aGlzLnBvcyArPSA0KSB8IDA7XG59O1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1pbnZhbGlkLXRoaXMgKi9cblxuZnVuY3Rpb24gcmVhZEZpeGVkNjQoLyogdGhpczogUmVhZGVyICovKSB7XG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAodGhpcy5wb3MgKyA4ID4gdGhpcy5sZW4pXG4gICAgICAgIHRocm93IGluZGV4T3V0T2ZSYW5nZSh0aGlzLCA4KTtcblxuICAgIHJldHVybiBuZXcgTG9uZ0JpdHMocmVhZEZpeGVkMzJfZW5kKHRoaXMuYnVmLCB0aGlzLnBvcyArPSA0KSwgcmVhZEZpeGVkMzJfZW5kKHRoaXMuYnVmLCB0aGlzLnBvcyArPSA0KSk7XG59XG5cbi8qIGVzbGludC1lbmFibGUgbm8taW52YWxpZC10aGlzICovXG5cbi8qKlxuICogUmVhZHMgZml4ZWQgNjQgYml0cy5cbiAqIEBuYW1lIFJlYWRlciNmaXhlZDY0XG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtMb25nfSBWYWx1ZSByZWFkXG4gKi9cblxuLyoqXG4gKiBSZWFkcyB6aWctemFnIGVuY29kZWQgZml4ZWQgNjQgYml0cy5cbiAqIEBuYW1lIFJlYWRlciNzZml4ZWQ2NFxuICogQGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7TG9uZ30gVmFsdWUgcmVhZFxuICovXG5cbi8qKlxuICogUmVhZHMgYSBmbG9hdCAoMzIgYml0KSBhcyBhIG51bWJlci5cbiAqIEBmdW5jdGlvblxuICogQHJldHVybnMge251bWJlcn0gVmFsdWUgcmVhZFxuICovXG5SZWFkZXIucHJvdG90eXBlLmZsb2F0ID0gZnVuY3Rpb24gcmVhZF9mbG9hdCgpIHtcblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmICh0aGlzLnBvcyArIDQgPiB0aGlzLmxlbilcbiAgICAgICAgdGhyb3cgaW5kZXhPdXRPZlJhbmdlKHRoaXMsIDQpO1xuXG4gICAgdmFyIHZhbHVlID0gdXRpbC5mbG9hdC5yZWFkRmxvYXRMRSh0aGlzLmJ1ZiwgdGhpcy5wb3MpO1xuICAgIHRoaXMucG9zICs9IDQ7XG4gICAgcmV0dXJuIHZhbHVlO1xufTtcblxuLyoqXG4gKiBSZWFkcyBhIGRvdWJsZSAoNjQgYml0IGZsb2F0KSBhcyBhIG51bWJlci5cbiAqIEBmdW5jdGlvblxuICogQHJldHVybnMge251bWJlcn0gVmFsdWUgcmVhZFxuICovXG5SZWFkZXIucHJvdG90eXBlLmRvdWJsZSA9IGZ1bmN0aW9uIHJlYWRfZG91YmxlKCkge1xuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKHRoaXMucG9zICsgOCA+IHRoaXMubGVuKVxuICAgICAgICB0aHJvdyBpbmRleE91dE9mUmFuZ2UodGhpcywgNCk7XG5cbiAgICB2YXIgdmFsdWUgPSB1dGlsLmZsb2F0LnJlYWREb3VibGVMRSh0aGlzLmJ1ZiwgdGhpcy5wb3MpO1xuICAgIHRoaXMucG9zICs9IDg7XG4gICAgcmV0dXJuIHZhbHVlO1xufTtcblxuLyoqXG4gKiBSZWFkcyBhIHNlcXVlbmNlIG9mIGJ5dGVzIHByZWNlZWRlZCBieSBpdHMgbGVuZ3RoIGFzIGEgdmFyaW50LlxuICogQHJldHVybnMge1VpbnQ4QXJyYXl9IFZhbHVlIHJlYWRcbiAqL1xuUmVhZGVyLnByb3RvdHlwZS5ieXRlcyA9IGZ1bmN0aW9uIHJlYWRfYnl0ZXMoKSB7XG4gICAgdmFyIGxlbmd0aCA9IHRoaXMudWludDMyKCksXG4gICAgICAgIHN0YXJ0ICA9IHRoaXMucG9zLFxuICAgICAgICBlbmQgICAgPSB0aGlzLnBvcyArIGxlbmd0aDtcblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmIChlbmQgPiB0aGlzLmxlbilcbiAgICAgICAgdGhyb3cgaW5kZXhPdXRPZlJhbmdlKHRoaXMsIGxlbmd0aCk7XG5cbiAgICB0aGlzLnBvcyArPSBsZW5ndGg7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5idWYpKSAvLyBwbGFpbiBhcnJheVxuICAgICAgICByZXR1cm4gdGhpcy5idWYuc2xpY2Uoc3RhcnQsIGVuZCk7XG4gICAgcmV0dXJuIHN0YXJ0ID09PSBlbmQgLy8gZml4IGZvciBJRSAxMC9XaW44IGFuZCBvdGhlcnMnIHN1YmFycmF5IHJldHVybmluZyBhcnJheSBvZiBzaXplIDFcbiAgICAgICAgPyBuZXcgdGhpcy5idWYuY29uc3RydWN0b3IoMClcbiAgICAgICAgOiB0aGlzLl9zbGljZS5jYWxsKHRoaXMuYnVmLCBzdGFydCwgZW5kKTtcbn07XG5cbi8qKlxuICogUmVhZHMgYSBzdHJpbmcgcHJlY2VlZGVkIGJ5IGl0cyBieXRlIGxlbmd0aCBhcyBhIHZhcmludC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFZhbHVlIHJlYWRcbiAqL1xuUmVhZGVyLnByb3RvdHlwZS5zdHJpbmcgPSBmdW5jdGlvbiByZWFkX3N0cmluZygpIHtcbiAgICB2YXIgYnl0ZXMgPSB0aGlzLmJ5dGVzKCk7XG4gICAgcmV0dXJuIHV0ZjgucmVhZChieXRlcywgMCwgYnl0ZXMubGVuZ3RoKTtcbn07XG5cbi8qKlxuICogU2tpcHMgdGhlIHNwZWNpZmllZCBudW1iZXIgb2YgYnl0ZXMgaWYgc3BlY2lmaWVkLCBvdGhlcndpc2Ugc2tpcHMgYSB2YXJpbnQuXG4gKiBAcGFyYW0ge251bWJlcn0gW2xlbmd0aF0gTGVuZ3RoIGlmIGtub3duLCBvdGhlcndpc2UgYSB2YXJpbnQgaXMgYXNzdW1lZFxuICogQHJldHVybnMge1JlYWRlcn0gYHRoaXNgXG4gKi9cblJlYWRlci5wcm90b3R5cGUuc2tpcCA9IGZ1bmN0aW9uIHNraXAobGVuZ3RoKSB7XG4gICAgaWYgKHR5cGVvZiBsZW5ndGggPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgIGlmICh0aGlzLnBvcyArIGxlbmd0aCA+IHRoaXMubGVuKVxuICAgICAgICAgICAgdGhyb3cgaW5kZXhPdXRPZlJhbmdlKHRoaXMsIGxlbmd0aCk7XG4gICAgICAgIHRoaXMucG9zICs9IGxlbmd0aDtcbiAgICB9IGVsc2Uge1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgICAgIGlmICh0aGlzLnBvcyA+PSB0aGlzLmxlbilcbiAgICAgICAgICAgICAgICB0aHJvdyBpbmRleE91dE9mUmFuZ2UodGhpcyk7XG4gICAgICAgIH0gd2hpbGUgKHRoaXMuYnVmW3RoaXMucG9zKytdICYgMTI4KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNraXBzIHRoZSBuZXh0IGVsZW1lbnQgb2YgdGhlIHNwZWNpZmllZCB3aXJlIHR5cGUuXG4gKiBAcGFyYW0ge251bWJlcn0gd2lyZVR5cGUgV2lyZSB0eXBlIHJlY2VpdmVkXG4gKiBAcmV0dXJucyB7UmVhZGVyfSBgdGhpc2BcbiAqL1xuUmVhZGVyLnByb3RvdHlwZS5za2lwVHlwZSA9IGZ1bmN0aW9uKHdpcmVUeXBlKSB7XG4gICAgc3dpdGNoICh3aXJlVHlwZSkge1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICB0aGlzLnNraXAoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICB0aGlzLnNraXAoOCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgdGhpcy5za2lwKHRoaXMudWludDMyKCkpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgIHdoaWxlICgod2lyZVR5cGUgPSB0aGlzLnVpbnQzMigpICYgNykgIT09IDQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNraXBUeXBlKHdpcmVUeXBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICB0aGlzLnNraXAoNCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXCJpbnZhbGlkIHdpcmUgdHlwZSBcIiArIHdpcmVUeXBlICsgXCIgYXQgb2Zmc2V0IFwiICsgdGhpcy5wb3MpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5cblJlYWRlci5fY29uZmlndXJlID0gZnVuY3Rpb24oQnVmZmVyUmVhZGVyXykge1xuICAgIEJ1ZmZlclJlYWRlciA9IEJ1ZmZlclJlYWRlcl87XG4gICAgUmVhZGVyLmNyZWF0ZSA9IGNyZWF0ZSgpO1xuICAgIEJ1ZmZlclJlYWRlci5fY29uZmlndXJlKCk7XG5cbiAgICB2YXIgZm4gPSB1dGlsLkxvbmcgPyBcInRvTG9uZ1wiIDogLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8gXCJ0b051bWJlclwiO1xuICAgIHV0aWwubWVyZ2UoUmVhZGVyLnByb3RvdHlwZSwge1xuXG4gICAgICAgIGludDY0OiBmdW5jdGlvbiByZWFkX2ludDY0KCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlYWRMb25nVmFyaW50LmNhbGwodGhpcylbZm5dKGZhbHNlKTtcbiAgICAgICAgfSxcblxuICAgICAgICB1aW50NjQ6IGZ1bmN0aW9uIHJlYWRfdWludDY0KCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlYWRMb25nVmFyaW50LmNhbGwodGhpcylbZm5dKHRydWUpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHNpbnQ2NDogZnVuY3Rpb24gcmVhZF9zaW50NjQoKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVhZExvbmdWYXJpbnQuY2FsbCh0aGlzKS56ekRlY29kZSgpW2ZuXShmYWxzZSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZml4ZWQ2NDogZnVuY3Rpb24gcmVhZF9maXhlZDY0KCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlYWRGaXhlZDY0LmNhbGwodGhpcylbZm5dKHRydWUpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHNmaXhlZDY0OiBmdW5jdGlvbiByZWFkX3NmaXhlZDY0KCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlYWRGaXhlZDY0LmNhbGwodGhpcylbZm5dKGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG59O1xuIiwgIlwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBCdWZmZXJSZWFkZXI7XG5cbi8vIGV4dGVuZHMgUmVhZGVyXG52YXIgUmVhZGVyID0gcmVxdWlyZShcIi4vcmVhZGVyXCIpO1xuKEJ1ZmZlclJlYWRlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFJlYWRlci5wcm90b3R5cGUpKS5jb25zdHJ1Y3RvciA9IEJ1ZmZlclJlYWRlcjtcblxudmFyIHV0aWwgPSByZXF1aXJlKFwiLi91dGlsL21pbmltYWxcIik7XG5cbi8qKlxuICogQ29uc3RydWN0cyBhIG5ldyBidWZmZXIgcmVhZGVyIGluc3RhbmNlLlxuICogQGNsYXNzZGVzYyBXaXJlIGZvcm1hdCByZWFkZXIgdXNpbmcgbm9kZSBidWZmZXJzLlxuICogQGV4dGVuZHMgUmVhZGVyXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QnVmZmVyfSBidWZmZXIgQnVmZmVyIHRvIHJlYWQgZnJvbVxuICovXG5mdW5jdGlvbiBCdWZmZXJSZWFkZXIoYnVmZmVyKSB7XG4gICAgUmVhZGVyLmNhbGwodGhpcywgYnVmZmVyKTtcblxuICAgIC8qKlxuICAgICAqIFJlYWQgYnVmZmVyLlxuICAgICAqIEBuYW1lIEJ1ZmZlclJlYWRlciNidWZcbiAgICAgKiBAdHlwZSB7QnVmZmVyfVxuICAgICAqL1xufVxuXG5CdWZmZXJSZWFkZXIuX2NvbmZpZ3VyZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgIGlmICh1dGlsLkJ1ZmZlcilcbiAgICAgICAgQnVmZmVyUmVhZGVyLnByb3RvdHlwZS5fc2xpY2UgPSB1dGlsLkJ1ZmZlci5wcm90b3R5cGUuc2xpY2U7XG59O1xuXG5cbi8qKlxuICogQG92ZXJyaWRlXG4gKi9cbkJ1ZmZlclJlYWRlci5wcm90b3R5cGUuc3RyaW5nID0gZnVuY3Rpb24gcmVhZF9zdHJpbmdfYnVmZmVyKCkge1xuICAgIHZhciBsZW4gPSB0aGlzLnVpbnQzMigpOyAvLyBtb2RpZmllcyBwb3NcbiAgICByZXR1cm4gdGhpcy5idWYudXRmOFNsaWNlXG4gICAgICAgID8gdGhpcy5idWYudXRmOFNsaWNlKHRoaXMucG9zLCB0aGlzLnBvcyA9IE1hdGgubWluKHRoaXMucG9zICsgbGVuLCB0aGlzLmxlbikpXG4gICAgICAgIDogdGhpcy5idWYudG9TdHJpbmcoXCJ1dGYtOFwiLCB0aGlzLnBvcywgdGhpcy5wb3MgPSBNYXRoLm1pbih0aGlzLnBvcyArIGxlbiwgdGhpcy5sZW4pKTtcbn07XG5cbi8qKlxuICogUmVhZHMgYSBzZXF1ZW5jZSBvZiBieXRlcyBwcmVjZWVkZWQgYnkgaXRzIGxlbmd0aCBhcyBhIHZhcmludC5cbiAqIEBuYW1lIEJ1ZmZlclJlYWRlciNieXRlc1xuICogQGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7QnVmZmVyfSBWYWx1ZSByZWFkXG4gKi9cblxuQnVmZmVyUmVhZGVyLl9jb25maWd1cmUoKTtcbiIsICJcInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gU2VydmljZTtcblxudmFyIHV0aWwgPSByZXF1aXJlKFwiLi4vdXRpbC9taW5pbWFsXCIpO1xuXG4vLyBFeHRlbmRzIEV2ZW50RW1pdHRlclxuKFNlcnZpY2UucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSh1dGlsLkV2ZW50RW1pdHRlci5wcm90b3R5cGUpKS5jb25zdHJ1Y3RvciA9IFNlcnZpY2U7XG5cbi8qKlxuICogQSBzZXJ2aWNlIG1ldGhvZCBjYWxsYmFjayBhcyB1c2VkIGJ5IHtAbGluayBycGMuU2VydmljZU1ldGhvZHxTZXJ2aWNlTWV0aG9kfS5cbiAqXG4gKiBEaWZmZXJzIGZyb20ge0BsaW5rIFJQQ0ltcGxDYWxsYmFja30gaW4gdGhhdCBpdCBpcyBhbiBhY3R1YWwgY2FsbGJhY2sgb2YgYSBzZXJ2aWNlIG1ldGhvZCB3aGljaCBtYXkgbm90IHJldHVybiBgcmVzcG9uc2UgPSBudWxsYC5cbiAqIEB0eXBlZGVmIHJwYy5TZXJ2aWNlTWV0aG9kQ2FsbGJhY2tcbiAqIEB0ZW1wbGF0ZSBUUmVzIGV4dGVuZHMgTWVzc2FnZTxUUmVzPlxuICogQHR5cGUge2Z1bmN0aW9ufVxuICogQHBhcmFtIHtFcnJvcnxudWxsfSBlcnJvciBFcnJvciwgaWYgYW55XG4gKiBAcGFyYW0ge1RSZXN9IFtyZXNwb25zZV0gUmVzcG9uc2UgbWVzc2FnZVxuICogQHJldHVybnMge3VuZGVmaW5lZH1cbiAqL1xuXG4vKipcbiAqIEEgc2VydmljZSBtZXRob2QgcGFydCBvZiBhIHtAbGluayBycGMuU2VydmljZX0gYXMgY3JlYXRlZCBieSB7QGxpbmsgU2VydmljZS5jcmVhdGV9LlxuICogQHR5cGVkZWYgcnBjLlNlcnZpY2VNZXRob2RcbiAqIEB0ZW1wbGF0ZSBUUmVxIGV4dGVuZHMgTWVzc2FnZTxUUmVxPlxuICogQHRlbXBsYXRlIFRSZXMgZXh0ZW5kcyBNZXNzYWdlPFRSZXM+XG4gKiBAdHlwZSB7ZnVuY3Rpb259XG4gKiBAcGFyYW0ge1RSZXF8UHJvcGVydGllczxUUmVxPn0gcmVxdWVzdCBSZXF1ZXN0IG1lc3NhZ2Ugb3IgcGxhaW4gb2JqZWN0XG4gKiBAcGFyYW0ge3JwYy5TZXJ2aWNlTWV0aG9kQ2FsbGJhY2s8VFJlcz59IFtjYWxsYmFja10gTm9kZS1zdHlsZSBjYWxsYmFjayBjYWxsZWQgd2l0aCB0aGUgZXJyb3IsIGlmIGFueSwgYW5kIHRoZSByZXNwb25zZSBtZXNzYWdlXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxNZXNzYWdlPFRSZXM+Pn0gUHJvbWlzZSBpZiBgY2FsbGJhY2tgIGhhcyBiZWVuIG9taXR0ZWQsIG90aGVyd2lzZSBgdW5kZWZpbmVkYFxuICovXG5cbi8qKlxuICogQ29uc3RydWN0cyBhIG5ldyBSUEMgc2VydmljZSBpbnN0YW5jZS5cbiAqIEBjbGFzc2Rlc2MgQW4gUlBDIHNlcnZpY2UgYXMgcmV0dXJuZWQgYnkge0BsaW5rIFNlcnZpY2UjY3JlYXRlfS5cbiAqIEBleHBvcnRzIHJwYy5TZXJ2aWNlXG4gKiBAZXh0ZW5kcyB1dGlsLkV2ZW50RW1pdHRlclxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge1JQQ0ltcGx9IHJwY0ltcGwgUlBDIGltcGxlbWVudGF0aW9uXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtyZXF1ZXN0RGVsaW1pdGVkPWZhbHNlXSBXaGV0aGVyIHJlcXVlc3RzIGFyZSBsZW5ndGgtZGVsaW1pdGVkXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtyZXNwb25zZURlbGltaXRlZD1mYWxzZV0gV2hldGhlciByZXNwb25zZXMgYXJlIGxlbmd0aC1kZWxpbWl0ZWRcbiAqL1xuZnVuY3Rpb24gU2VydmljZShycGNJbXBsLCByZXF1ZXN0RGVsaW1pdGVkLCByZXNwb25zZURlbGltaXRlZCkge1xuXG4gICAgaWYgKHR5cGVvZiBycGNJbXBsICE9PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIHRocm93IFR5cGVFcnJvcihcInJwY0ltcGwgbXVzdCBiZSBhIGZ1bmN0aW9uXCIpO1xuXG4gICAgdXRpbC5FdmVudEVtaXR0ZXIuY2FsbCh0aGlzKTtcblxuICAgIC8qKlxuICAgICAqIFJQQyBpbXBsZW1lbnRhdGlvbi4gQmVjb21lcyBgbnVsbGAgb25jZSB0aGUgc2VydmljZSBpcyBlbmRlZC5cbiAgICAgKiBAdHlwZSB7UlBDSW1wbHxudWxsfVxuICAgICAqL1xuICAgIHRoaXMucnBjSW1wbCA9IHJwY0ltcGw7XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHJlcXVlc3RzIGFyZSBsZW5ndGgtZGVsaW1pdGVkLlxuICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAqL1xuICAgIHRoaXMucmVxdWVzdERlbGltaXRlZCA9IEJvb2xlYW4ocmVxdWVzdERlbGltaXRlZCk7XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHJlc3BvbnNlcyBhcmUgbGVuZ3RoLWRlbGltaXRlZC5cbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICB0aGlzLnJlc3BvbnNlRGVsaW1pdGVkID0gQm9vbGVhbihyZXNwb25zZURlbGltaXRlZCk7XG59XG5cbi8qKlxuICogQ2FsbHMgYSBzZXJ2aWNlIG1ldGhvZCB0aHJvdWdoIHtAbGluayBycGMuU2VydmljZSNycGNJbXBsfHJwY0ltcGx9LlxuICogQHBhcmFtIHtNZXRob2R8cnBjLlNlcnZpY2VNZXRob2Q8VFJlcSxUUmVzPn0gbWV0aG9kIFJlZmxlY3RlZCBvciBzdGF0aWMgbWV0aG9kXG4gKiBAcGFyYW0ge0NvbnN0cnVjdG9yPFRSZXE+fSByZXF1ZXN0Q3RvciBSZXF1ZXN0IGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0NvbnN0cnVjdG9yPFRSZXM+fSByZXNwb25zZUN0b3IgUmVzcG9uc2UgY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7VFJlcXxQcm9wZXJ0aWVzPFRSZXE+fSByZXF1ZXN0IFJlcXVlc3QgbWVzc2FnZSBvciBwbGFpbiBvYmplY3RcbiAqIEBwYXJhbSB7cnBjLlNlcnZpY2VNZXRob2RDYWxsYmFjazxUUmVzPn0gY2FsbGJhY2sgU2VydmljZSBjYWxsYmFja1xuICogQHJldHVybnMge3VuZGVmaW5lZH1cbiAqIEB0ZW1wbGF0ZSBUUmVxIGV4dGVuZHMgTWVzc2FnZTxUUmVxPlxuICogQHRlbXBsYXRlIFRSZXMgZXh0ZW5kcyBNZXNzYWdlPFRSZXM+XG4gKi9cblNlcnZpY2UucHJvdG90eXBlLnJwY0NhbGwgPSBmdW5jdGlvbiBycGNDYWxsKG1ldGhvZCwgcmVxdWVzdEN0b3IsIHJlc3BvbnNlQ3RvciwgcmVxdWVzdCwgY2FsbGJhY2spIHtcblxuICAgIGlmICghcmVxdWVzdClcbiAgICAgICAgdGhyb3cgVHlwZUVycm9yKFwicmVxdWVzdCBtdXN0IGJlIHNwZWNpZmllZFwiKTtcblxuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBpZiAoIWNhbGxiYWNrKVxuICAgICAgICByZXR1cm4gdXRpbC5hc1Byb21pc2UocnBjQ2FsbCwgc2VsZiwgbWV0aG9kLCByZXF1ZXN0Q3RvciwgcmVzcG9uc2VDdG9yLCByZXF1ZXN0KTtcblxuICAgIGlmICghc2VsZi5ycGNJbXBsKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7IGNhbGxiYWNrKEVycm9yKFwiYWxyZWFkeSBlbmRlZFwiKSk7IH0sIDApO1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBzZWxmLnJwY0ltcGwoXG4gICAgICAgICAgICBtZXRob2QsXG4gICAgICAgICAgICByZXF1ZXN0Q3RvcltzZWxmLnJlcXVlc3REZWxpbWl0ZWQgPyBcImVuY29kZURlbGltaXRlZFwiIDogXCJlbmNvZGVcIl0ocmVxdWVzdCkuZmluaXNoKCksXG4gICAgICAgICAgICBmdW5jdGlvbiBycGNDYWxsYmFjayhlcnIsIHJlc3BvbnNlKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZW1pdChcImVycm9yXCIsIGVyciwgbWV0aG9kKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGVycik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZW5kKC8qIGVuZGVkQnlSUEMgKi8gdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCEocmVzcG9uc2UgaW5zdGFuY2VvZiByZXNwb25zZUN0b3IpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IHJlc3BvbnNlQ3RvcltzZWxmLnJlc3BvbnNlRGVsaW1pdGVkID8gXCJkZWNvZGVEZWxpbWl0ZWRcIiA6IFwiZGVjb2RlXCJdKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmVtaXQoXCJlcnJvclwiLCBlcnIsIG1ldGhvZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHNlbGYuZW1pdChcImRhdGFcIiwgcmVzcG9uc2UsIG1ldGhvZCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKG51bGwsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgc2VsZi5lbWl0KFwiZXJyb3JcIiwgZXJyLCBtZXRob2QpO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkgeyBjYWxsYmFjayhlcnIpOyB9LCAwKTtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG59O1xuXG4vKipcbiAqIEVuZHMgdGhpcyBzZXJ2aWNlIGFuZCBlbWl0cyB0aGUgYGVuZGAgZXZlbnQuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtlbmRlZEJ5UlBDPWZhbHNlXSBXaGV0aGVyIHRoZSBzZXJ2aWNlIGhhcyBiZWVuIGVuZGVkIGJ5IHRoZSBSUEMgaW1wbGVtZW50YXRpb24uXG4gKiBAcmV0dXJucyB7cnBjLlNlcnZpY2V9IGB0aGlzYFxuICovXG5TZXJ2aWNlLnByb3RvdHlwZS5lbmQgPSBmdW5jdGlvbiBlbmQoZW5kZWRCeVJQQykge1xuICAgIGlmICh0aGlzLnJwY0ltcGwpIHtcbiAgICAgICAgaWYgKCFlbmRlZEJ5UlBDKSAvLyBzaWduYWwgZW5kIHRvIHJwY0ltcGxcbiAgICAgICAgICAgIHRoaXMucnBjSW1wbChudWxsLCBudWxsLCBudWxsKTtcbiAgICAgICAgdGhpcy5ycGNJbXBsID0gbnVsbDtcbiAgICAgICAgdGhpcy5lbWl0KFwiZW5kXCIpLm9mZigpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxuICogU3RyZWFtaW5nIFJQQyBoZWxwZXJzLlxuICogQG5hbWVzcGFjZVxuICovXG52YXIgcnBjID0gZXhwb3J0cztcblxuLyoqXG4gKiBSUEMgaW1wbGVtZW50YXRpb24gcGFzc2VkIHRvIHtAbGluayBTZXJ2aWNlI2NyZWF0ZX0gcGVyZm9ybWluZyBhIHNlcnZpY2UgcmVxdWVzdCBvbiBuZXR3b3JrIGxldmVsLCBpLmUuIGJ5IHV0aWxpemluZyBodHRwIHJlcXVlc3RzIG9yIHdlYnNvY2tldHMuXG4gKiBAdHlwZWRlZiBSUENJbXBsXG4gKiBAdHlwZSB7ZnVuY3Rpb259XG4gKiBAcGFyYW0ge01ldGhvZHxycGMuU2VydmljZU1ldGhvZDxNZXNzYWdlPHt9PixNZXNzYWdlPHt9Pj59IG1ldGhvZCBSZWZsZWN0ZWQgb3Igc3RhdGljIG1ldGhvZCBiZWluZyBjYWxsZWRcbiAqIEBwYXJhbSB7VWludDhBcnJheX0gcmVxdWVzdERhdGEgUmVxdWVzdCBkYXRhXG4gKiBAcGFyYW0ge1JQQ0ltcGxDYWxsYmFja30gY2FsbGJhY2sgQ2FsbGJhY2sgZnVuY3Rpb25cbiAqIEByZXR1cm5zIHt1bmRlZmluZWR9XG4gKiBAZXhhbXBsZVxuICogZnVuY3Rpb24gcnBjSW1wbChtZXRob2QsIHJlcXVlc3REYXRhLCBjYWxsYmFjaykge1xuICogICAgIGlmIChwcm90b2J1Zi51dGlsLmxjRmlyc3QobWV0aG9kLm5hbWUpICE9PSBcIm15TWV0aG9kXCIpIC8vIGNvbXBhdGlibGUgd2l0aCBzdGF0aWMgY29kZVxuICogICAgICAgICB0aHJvdyBFcnJvcihcIm5vIHN1Y2ggbWV0aG9kXCIpO1xuICogICAgIGFzeW5jaHJvbm91c2x5T2J0YWluQVJlc3BvbnNlKHJlcXVlc3REYXRhLCBmdW5jdGlvbihlcnIsIHJlc3BvbnNlRGF0YSkge1xuICogICAgICAgICBjYWxsYmFjayhlcnIsIHJlc3BvbnNlRGF0YSk7XG4gKiAgICAgfSk7XG4gKiB9XG4gKi9cblxuLyoqXG4gKiBOb2RlLXN0eWxlIGNhbGxiYWNrIGFzIHVzZWQgYnkge0BsaW5rIFJQQ0ltcGx9LlxuICogQHR5cGVkZWYgUlBDSW1wbENhbGxiYWNrXG4gKiBAdHlwZSB7ZnVuY3Rpb259XG4gKiBAcGFyYW0ge0Vycm9yfG51bGx9IGVycm9yIEVycm9yLCBpZiBhbnksIG90aGVyd2lzZSBgbnVsbGBcbiAqIEBwYXJhbSB7VWludDhBcnJheXxudWxsfSBbcmVzcG9uc2VdIFJlc3BvbnNlIGRhdGEgb3IgYG51bGxgIHRvIHNpZ25hbCBlbmQgb2Ygc3RyZWFtLCBpZiB0aGVyZSBoYXNuJ3QgYmVlbiBhbiBlcnJvclxuICogQHJldHVybnMge3VuZGVmaW5lZH1cbiAqL1xuXG5ycGMuU2VydmljZSA9IHJlcXVpcmUoXCIuL3JwYy9zZXJ2aWNlXCIpO1xuIiwgIlwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLyoqXG4gKiBOYW1lZCByb290cy5cbiAqIFRoaXMgaXMgd2hlcmUgcGJqcyBzdG9yZXMgZ2VuZXJhdGVkIHN0cnVjdHVyZXMgKHRoZSBvcHRpb24gYC1yLCAtLXJvb3RgIHNwZWNpZmllcyBhIG5hbWUpLlxuICogQ2FuIGFsc28gYmUgdXNlZCBtYW51YWxseSB0byBtYWtlIHJvb3RzIGF2YWlsYWJsZSBhY2Nyb3NzIG1vZHVsZXMuXG4gKiBAbmFtZSByb290c1xuICogQHR5cGUge09iamVjdC48c3RyaW5nLFJvb3Q+fVxuICogQGV4YW1wbGVcbiAqIC8vIHBianMgLXIgbXlyb290IC1vIGNvbXBpbGVkLmpzIC4uLlxuICpcbiAqIC8vIGluIGFub3RoZXIgbW9kdWxlOlxuICogcmVxdWlyZShcIi4vY29tcGlsZWQuanNcIik7XG4gKlxuICogLy8gaW4gYW55IHN1YnNlcXVlbnQgbW9kdWxlOlxuICogdmFyIHJvb3QgPSBwcm90b2J1Zi5yb290c1tcIm15cm9vdFwiXTtcbiAqL1xuIiwgIlwidXNlIHN0cmljdFwiO1xudmFyIHByb3RvYnVmID0gZXhwb3J0cztcblxuLyoqXG4gKiBCdWlsZCB0eXBlLCBvbmUgb2YgYFwiZnVsbFwiYCwgYFwibGlnaHRcImAgb3IgYFwibWluaW1hbFwiYC5cbiAqIEBuYW1lIGJ1aWxkXG4gKiBAdHlwZSB7c3RyaW5nfVxuICogQGNvbnN0XG4gKi9cbnByb3RvYnVmLmJ1aWxkID0gXCJtaW5pbWFsXCI7XG5cbi8vIFNlcmlhbGl6YXRpb25cbnByb3RvYnVmLldyaXRlciAgICAgICA9IHJlcXVpcmUoXCIuL3dyaXRlclwiKTtcbnByb3RvYnVmLkJ1ZmZlcldyaXRlciA9IHJlcXVpcmUoXCIuL3dyaXRlcl9idWZmZXJcIik7XG5wcm90b2J1Zi5SZWFkZXIgICAgICAgPSByZXF1aXJlKFwiLi9yZWFkZXJcIik7XG5wcm90b2J1Zi5CdWZmZXJSZWFkZXIgPSByZXF1aXJlKFwiLi9yZWFkZXJfYnVmZmVyXCIpO1xuXG4vLyBVdGlsaXR5XG5wcm90b2J1Zi51dGlsICAgICAgICAgPSByZXF1aXJlKFwiLi91dGlsL21pbmltYWxcIik7XG5wcm90b2J1Zi5ycGMgICAgICAgICAgPSByZXF1aXJlKFwiLi9ycGNcIik7XG5wcm90b2J1Zi5yb290cyAgICAgICAgPSByZXF1aXJlKFwiLi9yb290c1wiKTtcbnByb3RvYnVmLmNvbmZpZ3VyZSAgICA9IGNvbmZpZ3VyZTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbi8qKlxuICogUmVjb25maWd1cmVzIHRoZSBsaWJyYXJ5IGFjY29yZGluZyB0byB0aGUgZW52aXJvbm1lbnQuXG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxuICovXG5mdW5jdGlvbiBjb25maWd1cmUoKSB7XG4gICAgcHJvdG9idWYudXRpbC5fY29uZmlndXJlKCk7XG4gICAgcHJvdG9idWYuV3JpdGVyLl9jb25maWd1cmUocHJvdG9idWYuQnVmZmVyV3JpdGVyKTtcbiAgICBwcm90b2J1Zi5SZWFkZXIuX2NvbmZpZ3VyZShwcm90b2J1Zi5CdWZmZXJSZWFkZXIpO1xufVxuXG4vLyBTZXQgdXAgYnVmZmVyIHV0aWxpdHkgYWNjb3JkaW5nIHRvIHRoZSBlbnZpcm9ubWVudFxuY29uZmlndXJlKCk7XG4iLCAiLy8gbWluaW1hbCBsaWJyYXJ5IGVudHJ5IHBvaW50LlxuXG5cInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vc3JjL2luZGV4LW1pbmltYWxcIik7XG4iLCAiZnVuY3Rpb24gbm9vcCgpIHsgfVxuY29uc3QgaWRlbnRpdHkgPSB4ID0+IHg7XG5mdW5jdGlvbiBhc3NpZ24odGFyLCBzcmMpIHtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgZm9yIChjb25zdCBrIGluIHNyYylcbiAgICAgICAgdGFyW2tdID0gc3JjW2tdO1xuICAgIHJldHVybiB0YXI7XG59XG5mdW5jdGlvbiBpc19wcm9taXNlKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHZhbHVlLnRoZW4gPT09ICdmdW5jdGlvbic7XG59XG5mdW5jdGlvbiBhZGRfbG9jYXRpb24oZWxlbWVudCwgZmlsZSwgbGluZSwgY29sdW1uLCBjaGFyKSB7XG4gICAgZWxlbWVudC5fX3N2ZWx0ZV9tZXRhID0ge1xuICAgICAgICBsb2M6IHsgZmlsZSwgbGluZSwgY29sdW1uLCBjaGFyIH1cbiAgICB9O1xufVxuZnVuY3Rpb24gcnVuKGZuKSB7XG4gICAgcmV0dXJuIGZuKCk7XG59XG5mdW5jdGlvbiBibGFua19vYmplY3QoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5jcmVhdGUobnVsbCk7XG59XG5mdW5jdGlvbiBydW5fYWxsKGZucykge1xuICAgIGZucy5mb3JFYWNoKHJ1bik7XG59XG5mdW5jdGlvbiBpc19mdW5jdGlvbih0aGluZykge1xuICAgIHJldHVybiB0eXBlb2YgdGhpbmcgPT09ICdmdW5jdGlvbic7XG59XG5mdW5jdGlvbiBzYWZlX25vdF9lcXVhbChhLCBiKSB7XG4gICAgcmV0dXJuIGEgIT0gYSA/IGIgPT0gYiA6IGEgIT09IGIgfHwgKChhICYmIHR5cGVvZiBhID09PSAnb2JqZWN0JykgfHwgdHlwZW9mIGEgPT09ICdmdW5jdGlvbicpO1xufVxubGV0IHNyY191cmxfZXF1YWxfYW5jaG9yO1xuZnVuY3Rpb24gc3JjX3VybF9lcXVhbChlbGVtZW50X3NyYywgdXJsKSB7XG4gICAgaWYgKCFzcmNfdXJsX2VxdWFsX2FuY2hvcikge1xuICAgICAgICBzcmNfdXJsX2VxdWFsX2FuY2hvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICB9XG4gICAgc3JjX3VybF9lcXVhbF9hbmNob3IuaHJlZiA9IHVybDtcbiAgICByZXR1cm4gZWxlbWVudF9zcmMgPT09IHNyY191cmxfZXF1YWxfYW5jaG9yLmhyZWY7XG59XG5mdW5jdGlvbiBub3RfZXF1YWwoYSwgYikge1xuICAgIHJldHVybiBhICE9IGEgPyBiID09IGIgOiBhICE9PSBiO1xufVxuZnVuY3Rpb24gaXNfZW1wdHkob2JqKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikubGVuZ3RoID09PSAwO1xufVxuZnVuY3Rpb24gdmFsaWRhdGVfc3RvcmUoc3RvcmUsIG5hbWUpIHtcbiAgICBpZiAoc3RvcmUgIT0gbnVsbCAmJiB0eXBlb2Ygc3RvcmUuc3Vic2NyaWJlICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgJyR7bmFtZX0nIGlzIG5vdCBhIHN0b3JlIHdpdGggYSAnc3Vic2NyaWJlJyBtZXRob2RgKTtcbiAgICB9XG59XG5mdW5jdGlvbiBzdWJzY3JpYmUoc3RvcmUsIC4uLmNhbGxiYWNrcykge1xuICAgIGlmIChzdG9yZSA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBub29wO1xuICAgIH1cbiAgICBjb25zdCB1bnN1YiA9IHN0b3JlLnN1YnNjcmliZSguLi5jYWxsYmFja3MpO1xuICAgIHJldHVybiB1bnN1Yi51bnN1YnNjcmliZSA/ICgpID0+IHVuc3ViLnVuc3Vic2NyaWJlKCkgOiB1bnN1Yjtcbn1cbmZ1bmN0aW9uIGdldF9zdG9yZV92YWx1ZShzdG9yZSkge1xuICAgIGxldCB2YWx1ZTtcbiAgICBzdWJzY3JpYmUoc3RvcmUsIF8gPT4gdmFsdWUgPSBfKSgpO1xuICAgIHJldHVybiB2YWx1ZTtcbn1cbmZ1bmN0aW9uIGNvbXBvbmVudF9zdWJzY3JpYmUoY29tcG9uZW50LCBzdG9yZSwgY2FsbGJhY2spIHtcbiAgICBjb21wb25lbnQuJCQub25fZGVzdHJveS5wdXNoKHN1YnNjcmliZShzdG9yZSwgY2FsbGJhY2spKTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZV9zbG90KGRlZmluaXRpb24sIGN0eCwgJCRzY29wZSwgZm4pIHtcbiAgICBpZiAoZGVmaW5pdGlvbikge1xuICAgICAgICBjb25zdCBzbG90X2N0eCA9IGdldF9zbG90X2NvbnRleHQoZGVmaW5pdGlvbiwgY3R4LCAkJHNjb3BlLCBmbik7XG4gICAgICAgIHJldHVybiBkZWZpbml0aW9uWzBdKHNsb3RfY3R4KTtcbiAgICB9XG59XG5mdW5jdGlvbiBnZXRfc2xvdF9jb250ZXh0KGRlZmluaXRpb24sIGN0eCwgJCRzY29wZSwgZm4pIHtcbiAgICByZXR1cm4gZGVmaW5pdGlvblsxXSAmJiBmblxuICAgICAgICA/IGFzc2lnbigkJHNjb3BlLmN0eC5zbGljZSgpLCBkZWZpbml0aW9uWzFdKGZuKGN0eCkpKVxuICAgICAgICA6ICQkc2NvcGUuY3R4O1xufVxuZnVuY3Rpb24gZ2V0X3Nsb3RfY2hhbmdlcyhkZWZpbml0aW9uLCAkJHNjb3BlLCBkaXJ0eSwgZm4pIHtcbiAgICBpZiAoZGVmaW5pdGlvblsyXSAmJiBmbikge1xuICAgICAgICBjb25zdCBsZXRzID0gZGVmaW5pdGlvblsyXShmbihkaXJ0eSkpO1xuICAgICAgICBpZiAoJCRzY29wZS5kaXJ0eSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gbGV0cztcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGxldHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBjb25zdCBtZXJnZWQgPSBbXTtcbiAgICAgICAgICAgIGNvbnN0IGxlbiA9IE1hdGgubWF4KCQkc2NvcGUuZGlydHkubGVuZ3RoLCBsZXRzLmxlbmd0aCk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgbWVyZ2VkW2ldID0gJCRzY29wZS5kaXJ0eVtpXSB8IGxldHNbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbWVyZ2VkO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAkJHNjb3BlLmRpcnR5IHwgbGV0cztcbiAgICB9XG4gICAgcmV0dXJuICQkc2NvcGUuZGlydHk7XG59XG5mdW5jdGlvbiB1cGRhdGVfc2xvdF9iYXNlKHNsb3QsIHNsb3RfZGVmaW5pdGlvbiwgY3R4LCAkJHNjb3BlLCBzbG90X2NoYW5nZXMsIGdldF9zbG90X2NvbnRleHRfZm4pIHtcbiAgICBpZiAoc2xvdF9jaGFuZ2VzKSB7XG4gICAgICAgIGNvbnN0IHNsb3RfY29udGV4dCA9IGdldF9zbG90X2NvbnRleHQoc2xvdF9kZWZpbml0aW9uLCBjdHgsICQkc2NvcGUsIGdldF9zbG90X2NvbnRleHRfZm4pO1xuICAgICAgICBzbG90LnAoc2xvdF9jb250ZXh0LCBzbG90X2NoYW5nZXMpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHVwZGF0ZV9zbG90KHNsb3QsIHNsb3RfZGVmaW5pdGlvbiwgY3R4LCAkJHNjb3BlLCBkaXJ0eSwgZ2V0X3Nsb3RfY2hhbmdlc19mbiwgZ2V0X3Nsb3RfY29udGV4dF9mbikge1xuICAgIGNvbnN0IHNsb3RfY2hhbmdlcyA9IGdldF9zbG90X2NoYW5nZXMoc2xvdF9kZWZpbml0aW9uLCAkJHNjb3BlLCBkaXJ0eSwgZ2V0X3Nsb3RfY2hhbmdlc19mbik7XG4gICAgdXBkYXRlX3Nsb3RfYmFzZShzbG90LCBzbG90X2RlZmluaXRpb24sIGN0eCwgJCRzY29wZSwgc2xvdF9jaGFuZ2VzLCBnZXRfc2xvdF9jb250ZXh0X2ZuKTtcbn1cbmZ1bmN0aW9uIGdldF9hbGxfZGlydHlfZnJvbV9zY29wZSgkJHNjb3BlKSB7XG4gICAgaWYgKCQkc2NvcGUuY3R4Lmxlbmd0aCA+IDMyKSB7XG4gICAgICAgIGNvbnN0IGRpcnR5ID0gW107XG4gICAgICAgIGNvbnN0IGxlbmd0aCA9ICQkc2NvcGUuY3R4Lmxlbmd0aCAvIDMyO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBkaXJ0eVtpXSA9IC0xO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkaXJ0eTtcbiAgICB9XG4gICAgcmV0dXJuIC0xO1xufVxuZnVuY3Rpb24gZXhjbHVkZV9pbnRlcm5hbF9wcm9wcyhwcm9wcykge1xuICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xuICAgIGZvciAoY29uc3QgayBpbiBwcm9wcylcbiAgICAgICAgaWYgKGtbMF0gIT09ICckJylcbiAgICAgICAgICAgIHJlc3VsdFtrXSA9IHByb3BzW2tdO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBjb21wdXRlX3Jlc3RfcHJvcHMocHJvcHMsIGtleXMpIHtcbiAgICBjb25zdCByZXN0ID0ge307XG4gICAga2V5cyA9IG5ldyBTZXQoa2V5cyk7XG4gICAgZm9yIChjb25zdCBrIGluIHByb3BzKVxuICAgICAgICBpZiAoIWtleXMuaGFzKGspICYmIGtbMF0gIT09ICckJylcbiAgICAgICAgICAgIHJlc3Rba10gPSBwcm9wc1trXTtcbiAgICByZXR1cm4gcmVzdDtcbn1cbmZ1bmN0aW9uIGNvbXB1dGVfc2xvdHMoc2xvdHMpIHtcbiAgICBjb25zdCByZXN1bHQgPSB7fTtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBzbG90cykge1xuICAgICAgICByZXN1bHRba2V5XSA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBvbmNlKGZuKSB7XG4gICAgbGV0IHJhbiA9IGZhbHNlO1xuICAgIHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuICAgICAgICBpZiAocmFuKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICByYW4gPSB0cnVlO1xuICAgICAgICBmbi5jYWxsKHRoaXMsIC4uLmFyZ3MpO1xuICAgIH07XG59XG5mdW5jdGlvbiBudWxsX3RvX2VtcHR5KHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6IHZhbHVlO1xufVxuZnVuY3Rpb24gc2V0X3N0b3JlX3ZhbHVlKHN0b3JlLCByZXQsIHZhbHVlKSB7XG4gICAgc3RvcmUuc2V0KHZhbHVlKTtcbiAgICByZXR1cm4gcmV0O1xufVxuY29uc3QgaGFzX3Byb3AgPSAob2JqLCBwcm9wKSA9PiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTtcbmZ1bmN0aW9uIGFjdGlvbl9kZXN0cm95ZXIoYWN0aW9uX3Jlc3VsdCkge1xuICAgIHJldHVybiBhY3Rpb25fcmVzdWx0ICYmIGlzX2Z1bmN0aW9uKGFjdGlvbl9yZXN1bHQuZGVzdHJveSkgPyBhY3Rpb25fcmVzdWx0LmRlc3Ryb3kgOiBub29wO1xufVxuXG5jb25zdCBpc19jbGllbnQgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJztcbmxldCBub3cgPSBpc19jbGllbnRcbiAgICA/ICgpID0+IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKVxuICAgIDogKCkgPT4gRGF0ZS5ub3coKTtcbmxldCByYWYgPSBpc19jbGllbnQgPyBjYiA9PiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoY2IpIDogbm9vcDtcbi8vIHVzZWQgaW50ZXJuYWxseSBmb3IgdGVzdGluZ1xuZnVuY3Rpb24gc2V0X25vdyhmbikge1xuICAgIG5vdyA9IGZuO1xufVxuZnVuY3Rpb24gc2V0X3JhZihmbikge1xuICAgIHJhZiA9IGZuO1xufVxuXG5jb25zdCB0YXNrcyA9IG5ldyBTZXQoKTtcbmZ1bmN0aW9uIHJ1bl90YXNrcyhub3cpIHtcbiAgICB0YXNrcy5mb3JFYWNoKHRhc2sgPT4ge1xuICAgICAgICBpZiAoIXRhc2suYyhub3cpKSB7XG4gICAgICAgICAgICB0YXNrcy5kZWxldGUodGFzayk7XG4gICAgICAgICAgICB0YXNrLmYoKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGlmICh0YXNrcy5zaXplICE9PSAwKVxuICAgICAgICByYWYocnVuX3Rhc2tzKTtcbn1cbi8qKlxuICogRm9yIHRlc3RpbmcgcHVycG9zZXMgb25seSFcbiAqL1xuZnVuY3Rpb24gY2xlYXJfbG9vcHMoKSB7XG4gICAgdGFza3MuY2xlYXIoKTtcbn1cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyB0YXNrIHRoYXQgcnVucyBvbiBlYWNoIHJhZiBmcmFtZVxuICogdW50aWwgaXQgcmV0dXJucyBhIGZhbHN5IHZhbHVlIG9yIGlzIGFib3J0ZWRcbiAqL1xuZnVuY3Rpb24gbG9vcChjYWxsYmFjaykge1xuICAgIGxldCB0YXNrO1xuICAgIGlmICh0YXNrcy5zaXplID09PSAwKVxuICAgICAgICByYWYocnVuX3Rhc2tzKTtcbiAgICByZXR1cm4ge1xuICAgICAgICBwcm9taXNlOiBuZXcgUHJvbWlzZShmdWxmaWxsID0+IHtcbiAgICAgICAgICAgIHRhc2tzLmFkZCh0YXNrID0geyBjOiBjYWxsYmFjaywgZjogZnVsZmlsbCB9KTtcbiAgICAgICAgfSksXG4gICAgICAgIGFib3J0KCkge1xuICAgICAgICAgICAgdGFza3MuZGVsZXRlKHRhc2spO1xuICAgICAgICB9XG4gICAgfTtcbn1cblxuLy8gVHJhY2sgd2hpY2ggbm9kZXMgYXJlIGNsYWltZWQgZHVyaW5nIGh5ZHJhdGlvbi4gVW5jbGFpbWVkIG5vZGVzIGNhbiB0aGVuIGJlIHJlbW92ZWQgZnJvbSB0aGUgRE9NXG4vLyBhdCB0aGUgZW5kIG9mIGh5ZHJhdGlvbiB3aXRob3V0IHRvdWNoaW5nIHRoZSByZW1haW5pbmcgbm9kZXMuXG5sZXQgaXNfaHlkcmF0aW5nID0gZmFsc2U7XG5mdW5jdGlvbiBzdGFydF9oeWRyYXRpbmcoKSB7XG4gICAgaXNfaHlkcmF0aW5nID0gdHJ1ZTtcbn1cbmZ1bmN0aW9uIGVuZF9oeWRyYXRpbmcoKSB7XG4gICAgaXNfaHlkcmF0aW5nID0gZmFsc2U7XG59XG5mdW5jdGlvbiB1cHBlcl9ib3VuZChsb3csIGhpZ2gsIGtleSwgdmFsdWUpIHtcbiAgICAvLyBSZXR1cm4gZmlyc3QgaW5kZXggb2YgdmFsdWUgbGFyZ2VyIHRoYW4gaW5wdXQgdmFsdWUgaW4gdGhlIHJhbmdlIFtsb3csIGhpZ2gpXG4gICAgd2hpbGUgKGxvdyA8IGhpZ2gpIHtcbiAgICAgICAgY29uc3QgbWlkID0gbG93ICsgKChoaWdoIC0gbG93KSA+PiAxKTtcbiAgICAgICAgaWYgKGtleShtaWQpIDw9IHZhbHVlKSB7XG4gICAgICAgICAgICBsb3cgPSBtaWQgKyAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaGlnaCA9IG1pZDtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbG93O1xufVxuZnVuY3Rpb24gaW5pdF9oeWRyYXRlKHRhcmdldCkge1xuICAgIGlmICh0YXJnZXQuaHlkcmF0ZV9pbml0KVxuICAgICAgICByZXR1cm47XG4gICAgdGFyZ2V0Lmh5ZHJhdGVfaW5pdCA9IHRydWU7XG4gICAgLy8gV2Uga25vdyB0aGF0IGFsbCBjaGlsZHJlbiBoYXZlIGNsYWltX29yZGVyIHZhbHVlcyBzaW5jZSB0aGUgdW5jbGFpbWVkIGhhdmUgYmVlbiBkZXRhY2hlZCBpZiB0YXJnZXQgaXMgbm90IDxoZWFkPlxuICAgIGxldCBjaGlsZHJlbiA9IHRhcmdldC5jaGlsZE5vZGVzO1xuICAgIC8vIElmIHRhcmdldCBpcyA8aGVhZD4sIHRoZXJlIG1heSBiZSBjaGlsZHJlbiB3aXRob3V0IGNsYWltX29yZGVyXG4gICAgaWYgKHRhcmdldC5ub2RlTmFtZSA9PT0gJ0hFQUQnKSB7XG4gICAgICAgIGNvbnN0IG15Q2hpbGRyZW4gPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IGNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgaWYgKG5vZGUuY2xhaW1fb3JkZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIG15Q2hpbGRyZW4ucHVzaChub2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjaGlsZHJlbiA9IG15Q2hpbGRyZW47XG4gICAgfVxuICAgIC8qXG4gICAgKiBSZW9yZGVyIGNsYWltZWQgY2hpbGRyZW4gb3B0aW1hbGx5LlxuICAgICogV2UgY2FuIHJlb3JkZXIgY2xhaW1lZCBjaGlsZHJlbiBvcHRpbWFsbHkgYnkgZmluZGluZyB0aGUgbG9uZ2VzdCBzdWJzZXF1ZW5jZSBvZlxuICAgICogbm9kZXMgdGhhdCBhcmUgYWxyZWFkeSBjbGFpbWVkIGluIG9yZGVyIGFuZCBvbmx5IG1vdmluZyB0aGUgcmVzdC4gVGhlIGxvbmdlc3RcbiAgICAqIHN1YnNlcXVlbmNlIHN1YnNlcXVlbmNlIG9mIG5vZGVzIHRoYXQgYXJlIGNsYWltZWQgaW4gb3JkZXIgY2FuIGJlIGZvdW5kIGJ5XG4gICAgKiBjb21wdXRpbmcgdGhlIGxvbmdlc3QgaW5jcmVhc2luZyBzdWJzZXF1ZW5jZSBvZiAuY2xhaW1fb3JkZXIgdmFsdWVzLlxuICAgICpcbiAgICAqIFRoaXMgYWxnb3JpdGhtIGlzIG9wdGltYWwgaW4gZ2VuZXJhdGluZyB0aGUgbGVhc3QgYW1vdW50IG9mIHJlb3JkZXIgb3BlcmF0aW9uc1xuICAgICogcG9zc2libGUuXG4gICAgKlxuICAgICogUHJvb2Y6XG4gICAgKiBXZSBrbm93IHRoYXQsIGdpdmVuIGEgc2V0IG9mIHJlb3JkZXJpbmcgb3BlcmF0aW9ucywgdGhlIG5vZGVzIHRoYXQgZG8gbm90IG1vdmVcbiAgICAqIGFsd2F5cyBmb3JtIGFuIGluY3JlYXNpbmcgc3Vic2VxdWVuY2UsIHNpbmNlIHRoZXkgZG8gbm90IG1vdmUgYW1vbmcgZWFjaCBvdGhlclxuICAgICogbWVhbmluZyB0aGF0IHRoZXkgbXVzdCBiZSBhbHJlYWR5IG9yZGVyZWQgYW1vbmcgZWFjaCBvdGhlci4gVGh1cywgdGhlIG1heGltYWxcbiAgICAqIHNldCBvZiBub2RlcyB0aGF0IGRvIG5vdCBtb3ZlIGZvcm0gYSBsb25nZXN0IGluY3JlYXNpbmcgc3Vic2VxdWVuY2UuXG4gICAgKi9cbiAgICAvLyBDb21wdXRlIGxvbmdlc3QgaW5jcmVhc2luZyBzdWJzZXF1ZW5jZVxuICAgIC8vIG06IHN1YnNlcXVlbmNlIGxlbmd0aCBqID0+IGluZGV4IGsgb2Ygc21hbGxlc3QgdmFsdWUgdGhhdCBlbmRzIGFuIGluY3JlYXNpbmcgc3Vic2VxdWVuY2Ugb2YgbGVuZ3RoIGpcbiAgICBjb25zdCBtID0gbmV3IEludDMyQXJyYXkoY2hpbGRyZW4ubGVuZ3RoICsgMSk7XG4gICAgLy8gUHJlZGVjZXNzb3IgaW5kaWNlcyArIDFcbiAgICBjb25zdCBwID0gbmV3IEludDMyQXJyYXkoY2hpbGRyZW4ubGVuZ3RoKTtcbiAgICBtWzBdID0gLTE7XG4gICAgbGV0IGxvbmdlc3QgPSAwO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgY3VycmVudCA9IGNoaWxkcmVuW2ldLmNsYWltX29yZGVyO1xuICAgICAgICAvLyBGaW5kIHRoZSBsYXJnZXN0IHN1YnNlcXVlbmNlIGxlbmd0aCBzdWNoIHRoYXQgaXQgZW5kcyBpbiBhIHZhbHVlIGxlc3MgdGhhbiBvdXIgY3VycmVudCB2YWx1ZVxuICAgICAgICAvLyB1cHBlcl9ib3VuZCByZXR1cm5zIGZpcnN0IGdyZWF0ZXIgdmFsdWUsIHNvIHdlIHN1YnRyYWN0IG9uZVxuICAgICAgICAvLyB3aXRoIGZhc3QgcGF0aCBmb3Igd2hlbiB3ZSBhcmUgb24gdGhlIGN1cnJlbnQgbG9uZ2VzdCBzdWJzZXF1ZW5jZVxuICAgICAgICBjb25zdCBzZXFMZW4gPSAoKGxvbmdlc3QgPiAwICYmIGNoaWxkcmVuW21bbG9uZ2VzdF1dLmNsYWltX29yZGVyIDw9IGN1cnJlbnQpID8gbG9uZ2VzdCArIDEgOiB1cHBlcl9ib3VuZCgxLCBsb25nZXN0LCBpZHggPT4gY2hpbGRyZW5bbVtpZHhdXS5jbGFpbV9vcmRlciwgY3VycmVudCkpIC0gMTtcbiAgICAgICAgcFtpXSA9IG1bc2VxTGVuXSArIDE7XG4gICAgICAgIGNvbnN0IG5ld0xlbiA9IHNlcUxlbiArIDE7XG4gICAgICAgIC8vIFdlIGNhbiBndWFyYW50ZWUgdGhhdCBjdXJyZW50IGlzIHRoZSBzbWFsbGVzdCB2YWx1ZS4gT3RoZXJ3aXNlLCB3ZSB3b3VsZCBoYXZlIGdlbmVyYXRlZCBhIGxvbmdlciBzZXF1ZW5jZS5cbiAgICAgICAgbVtuZXdMZW5dID0gaTtcbiAgICAgICAgbG9uZ2VzdCA9IE1hdGgubWF4KG5ld0xlbiwgbG9uZ2VzdCk7XG4gICAgfVxuICAgIC8vIFRoZSBsb25nZXN0IGluY3JlYXNpbmcgc3Vic2VxdWVuY2Ugb2Ygbm9kZXMgKGluaXRpYWxseSByZXZlcnNlZClcbiAgICBjb25zdCBsaXMgPSBbXTtcbiAgICAvLyBUaGUgcmVzdCBvZiB0aGUgbm9kZXMsIG5vZGVzIHRoYXQgd2lsbCBiZSBtb3ZlZFxuICAgIGNvbnN0IHRvTW92ZSA9IFtdO1xuICAgIGxldCBsYXN0ID0gY2hpbGRyZW4ubGVuZ3RoIC0gMTtcbiAgICBmb3IgKGxldCBjdXIgPSBtW2xvbmdlc3RdICsgMTsgY3VyICE9IDA7IGN1ciA9IHBbY3VyIC0gMV0pIHtcbiAgICAgICAgbGlzLnB1c2goY2hpbGRyZW5bY3VyIC0gMV0pO1xuICAgICAgICBmb3IgKDsgbGFzdCA+PSBjdXI7IGxhc3QtLSkge1xuICAgICAgICAgICAgdG9Nb3ZlLnB1c2goY2hpbGRyZW5bbGFzdF0pO1xuICAgICAgICB9XG4gICAgICAgIGxhc3QtLTtcbiAgICB9XG4gICAgZm9yICg7IGxhc3QgPj0gMDsgbGFzdC0tKSB7XG4gICAgICAgIHRvTW92ZS5wdXNoKGNoaWxkcmVuW2xhc3RdKTtcbiAgICB9XG4gICAgbGlzLnJldmVyc2UoKTtcbiAgICAvLyBXZSBzb3J0IHRoZSBub2RlcyBiZWluZyBtb3ZlZCB0byBndWFyYW50ZWUgdGhhdCB0aGVpciBpbnNlcnRpb24gb3JkZXIgbWF0Y2hlcyB0aGUgY2xhaW0gb3JkZXJcbiAgICB0b01vdmUuc29ydCgoYSwgYikgPT4gYS5jbGFpbV9vcmRlciAtIGIuY2xhaW1fb3JkZXIpO1xuICAgIC8vIEZpbmFsbHksIHdlIG1vdmUgdGhlIG5vZGVzXG4gICAgZm9yIChsZXQgaSA9IDAsIGogPSAwOyBpIDwgdG9Nb3ZlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHdoaWxlIChqIDwgbGlzLmxlbmd0aCAmJiB0b01vdmVbaV0uY2xhaW1fb3JkZXIgPj0gbGlzW2pdLmNsYWltX29yZGVyKSB7XG4gICAgICAgICAgICBqKys7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYW5jaG9yID0gaiA8IGxpcy5sZW5ndGggPyBsaXNbal0gOiBudWxsO1xuICAgICAgICB0YXJnZXQuaW5zZXJ0QmVmb3JlKHRvTW92ZVtpXSwgYW5jaG9yKTtcbiAgICB9XG59XG5mdW5jdGlvbiBhcHBlbmQodGFyZ2V0LCBub2RlKSB7XG4gICAgdGFyZ2V0LmFwcGVuZENoaWxkKG5vZGUpO1xufVxuZnVuY3Rpb24gYXBwZW5kX3N0eWxlcyh0YXJnZXQsIHN0eWxlX3NoZWV0X2lkLCBzdHlsZXMpIHtcbiAgICBjb25zdCBhcHBlbmRfc3R5bGVzX3RvID0gZ2V0X3Jvb3RfZm9yX3N0eWxlKHRhcmdldCk7XG4gICAgaWYgKCFhcHBlbmRfc3R5bGVzX3RvLmdldEVsZW1lbnRCeUlkKHN0eWxlX3NoZWV0X2lkKSkge1xuICAgICAgICBjb25zdCBzdHlsZSA9IGVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICAgIHN0eWxlLmlkID0gc3R5bGVfc2hlZXRfaWQ7XG4gICAgICAgIHN0eWxlLnRleHRDb250ZW50ID0gc3R5bGVzO1xuICAgICAgICBhcHBlbmRfc3R5bGVzaGVldChhcHBlbmRfc3R5bGVzX3RvLCBzdHlsZSk7XG4gICAgfVxufVxuZnVuY3Rpb24gZ2V0X3Jvb3RfZm9yX3N0eWxlKG5vZGUpIHtcbiAgICBpZiAoIW5vZGUpXG4gICAgICAgIHJldHVybiBkb2N1bWVudDtcbiAgICBjb25zdCByb290ID0gbm9kZS5nZXRSb290Tm9kZSA/IG5vZGUuZ2V0Um9vdE5vZGUoKSA6IG5vZGUub3duZXJEb2N1bWVudDtcbiAgICBpZiAocm9vdCAmJiByb290Lmhvc3QpIHtcbiAgICAgICAgcmV0dXJuIHJvb3Q7XG4gICAgfVxuICAgIHJldHVybiBub2RlLm93bmVyRG9jdW1lbnQ7XG59XG5mdW5jdGlvbiBhcHBlbmRfZW1wdHlfc3R5bGVzaGVldChub2RlKSB7XG4gICAgY29uc3Qgc3R5bGVfZWxlbWVudCA9IGVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgYXBwZW5kX3N0eWxlc2hlZXQoZ2V0X3Jvb3RfZm9yX3N0eWxlKG5vZGUpLCBzdHlsZV9lbGVtZW50KTtcbiAgICByZXR1cm4gc3R5bGVfZWxlbWVudC5zaGVldDtcbn1cbmZ1bmN0aW9uIGFwcGVuZF9zdHlsZXNoZWV0KG5vZGUsIHN0eWxlKSB7XG4gICAgYXBwZW5kKG5vZGUuaGVhZCB8fCBub2RlLCBzdHlsZSk7XG59XG5mdW5jdGlvbiBhcHBlbmRfaHlkcmF0aW9uKHRhcmdldCwgbm9kZSkge1xuICAgIGlmIChpc19oeWRyYXRpbmcpIHtcbiAgICAgICAgaW5pdF9oeWRyYXRlKHRhcmdldCk7XG4gICAgICAgIGlmICgodGFyZ2V0LmFjdHVhbF9lbmRfY2hpbGQgPT09IHVuZGVmaW5lZCkgfHwgKCh0YXJnZXQuYWN0dWFsX2VuZF9jaGlsZCAhPT0gbnVsbCkgJiYgKHRhcmdldC5hY3R1YWxfZW5kX2NoaWxkLnBhcmVudEVsZW1lbnQgIT09IHRhcmdldCkpKSB7XG4gICAgICAgICAgICB0YXJnZXQuYWN0dWFsX2VuZF9jaGlsZCA9IHRhcmdldC5maXJzdENoaWxkO1xuICAgICAgICB9XG4gICAgICAgIC8vIFNraXAgbm9kZXMgb2YgdW5kZWZpbmVkIG9yZGVyaW5nXG4gICAgICAgIHdoaWxlICgodGFyZ2V0LmFjdHVhbF9lbmRfY2hpbGQgIT09IG51bGwpICYmICh0YXJnZXQuYWN0dWFsX2VuZF9jaGlsZC5jbGFpbV9vcmRlciA9PT0gdW5kZWZpbmVkKSkge1xuICAgICAgICAgICAgdGFyZ2V0LmFjdHVhbF9lbmRfY2hpbGQgPSB0YXJnZXQuYWN0dWFsX2VuZF9jaGlsZC5uZXh0U2libGluZztcbiAgICAgICAgfVxuICAgICAgICBpZiAobm9kZSAhPT0gdGFyZ2V0LmFjdHVhbF9lbmRfY2hpbGQpIHtcbiAgICAgICAgICAgIC8vIFdlIG9ubHkgaW5zZXJ0IGlmIHRoZSBvcmRlcmluZyBvZiB0aGlzIG5vZGUgc2hvdWxkIGJlIG1vZGlmaWVkIG9yIHRoZSBwYXJlbnQgbm9kZSBpcyBub3QgdGFyZ2V0XG4gICAgICAgICAgICBpZiAobm9kZS5jbGFpbV9vcmRlciAhPT0gdW5kZWZpbmVkIHx8IG5vZGUucGFyZW50Tm9kZSAhPT0gdGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Lmluc2VydEJlZm9yZShub2RlLCB0YXJnZXQuYWN0dWFsX2VuZF9jaGlsZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0YXJnZXQuYWN0dWFsX2VuZF9jaGlsZCA9IG5vZGUubmV4dFNpYmxpbmc7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAobm9kZS5wYXJlbnROb2RlICE9PSB0YXJnZXQgfHwgbm9kZS5uZXh0U2libGluZyAhPT0gbnVsbCkge1xuICAgICAgICB0YXJnZXQuYXBwZW5kQ2hpbGQobm9kZSk7XG4gICAgfVxufVxuZnVuY3Rpb24gaW5zZXJ0KHRhcmdldCwgbm9kZSwgYW5jaG9yKSB7XG4gICAgdGFyZ2V0Lmluc2VydEJlZm9yZShub2RlLCBhbmNob3IgfHwgbnVsbCk7XG59XG5mdW5jdGlvbiBpbnNlcnRfaHlkcmF0aW9uKHRhcmdldCwgbm9kZSwgYW5jaG9yKSB7XG4gICAgaWYgKGlzX2h5ZHJhdGluZyAmJiAhYW5jaG9yKSB7XG4gICAgICAgIGFwcGVuZF9oeWRyYXRpb24odGFyZ2V0LCBub2RlKTtcbiAgICB9XG4gICAgZWxzZSBpZiAobm9kZS5wYXJlbnROb2RlICE9PSB0YXJnZXQgfHwgbm9kZS5uZXh0U2libGluZyAhPSBhbmNob3IpIHtcbiAgICAgICAgdGFyZ2V0Lmluc2VydEJlZm9yZShub2RlLCBhbmNob3IgfHwgbnVsbCk7XG4gICAgfVxufVxuZnVuY3Rpb24gZGV0YWNoKG5vZGUpIHtcbiAgICBub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZSk7XG59XG5mdW5jdGlvbiBkZXN0cm95X2VhY2goaXRlcmF0aW9ucywgZGV0YWNoaW5nKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVyYXRpb25zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGlmIChpdGVyYXRpb25zW2ldKVxuICAgICAgICAgICAgaXRlcmF0aW9uc1tpXS5kKGRldGFjaGluZyk7XG4gICAgfVxufVxuZnVuY3Rpb24gZWxlbWVudChuYW1lKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobmFtZSk7XG59XG5mdW5jdGlvbiBlbGVtZW50X2lzKG5hbWUsIGlzKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobmFtZSwgeyBpcyB9KTtcbn1cbmZ1bmN0aW9uIG9iamVjdF93aXRob3V0X3Byb3BlcnRpZXMob2JqLCBleGNsdWRlKSB7XG4gICAgY29uc3QgdGFyZ2V0ID0ge307XG4gICAgZm9yIChjb25zdCBrIGluIG9iaikge1xuICAgICAgICBpZiAoaGFzX3Byb3Aob2JqLCBrKVxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgJiYgZXhjbHVkZS5pbmRleE9mKGspID09PSAtMSkge1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgdGFyZ2V0W2tdID0gb2JqW2tdO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0YXJnZXQ7XG59XG5mdW5jdGlvbiBzdmdfZWxlbWVudChuYW1lKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCBuYW1lKTtcbn1cbmZ1bmN0aW9uIHRleHQoZGF0YSkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShkYXRhKTtcbn1cbmZ1bmN0aW9uIHNwYWNlKCkge1xuICAgIHJldHVybiB0ZXh0KCcgJyk7XG59XG5mdW5jdGlvbiBlbXB0eSgpIHtcbiAgICByZXR1cm4gdGV4dCgnJyk7XG59XG5mdW5jdGlvbiBsaXN0ZW4obm9kZSwgZXZlbnQsIGhhbmRsZXIsIG9wdGlvbnMpIHtcbiAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGhhbmRsZXIsIG9wdGlvbnMpO1xuICAgIHJldHVybiAoKSA9PiBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGhhbmRsZXIsIG9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcHJldmVudF9kZWZhdWx0KGZuKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHJldHVybiBmbi5jYWxsKHRoaXMsIGV2ZW50KTtcbiAgICB9O1xufVxuZnVuY3Rpb24gc3RvcF9wcm9wYWdhdGlvbihmbikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgcmV0dXJuIGZuLmNhbGwodGhpcywgZXZlbnQpO1xuICAgIH07XG59XG5mdW5jdGlvbiBzZWxmKGZuKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGlmIChldmVudC50YXJnZXQgPT09IHRoaXMpXG4gICAgICAgICAgICBmbi5jYWxsKHRoaXMsIGV2ZW50KTtcbiAgICB9O1xufVxuZnVuY3Rpb24gdHJ1c3RlZChmbikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBpZiAoZXZlbnQuaXNUcnVzdGVkKVxuICAgICAgICAgICAgZm4uY2FsbCh0aGlzLCBldmVudCk7XG4gICAgfTtcbn1cbmZ1bmN0aW9uIGF0dHIobm9kZSwgYXR0cmlidXRlLCB2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSA9PSBudWxsKVxuICAgICAgICBub2RlLnJlbW92ZUF0dHJpYnV0ZShhdHRyaWJ1dGUpO1xuICAgIGVsc2UgaWYgKG5vZGUuZ2V0QXR0cmlidXRlKGF0dHJpYnV0ZSkgIT09IHZhbHVlKVxuICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShhdHRyaWJ1dGUsIHZhbHVlKTtcbn1cbmZ1bmN0aW9uIHNldF9hdHRyaWJ1dGVzKG5vZGUsIGF0dHJpYnV0ZXMpIHtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgY29uc3QgZGVzY3JpcHRvcnMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhub2RlLl9fcHJvdG9fXyk7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gYXR0cmlidXRlcykge1xuICAgICAgICBpZiAoYXR0cmlidXRlc1trZXldID09IG51bGwpIHtcbiAgICAgICAgICAgIG5vZGUucmVtb3ZlQXR0cmlidXRlKGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoa2V5ID09PSAnc3R5bGUnKSB7XG4gICAgICAgICAgICBub2RlLnN0eWxlLmNzc1RleHQgPSBhdHRyaWJ1dGVzW2tleV07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoa2V5ID09PSAnX192YWx1ZScpIHtcbiAgICAgICAgICAgIG5vZGUudmFsdWUgPSBub2RlW2tleV0gPSBhdHRyaWJ1dGVzW2tleV07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZGVzY3JpcHRvcnNba2V5XSAmJiBkZXNjcmlwdG9yc1trZXldLnNldCkge1xuICAgICAgICAgICAgbm9kZVtrZXldID0gYXR0cmlidXRlc1trZXldO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYXR0cihub2RlLCBrZXksIGF0dHJpYnV0ZXNba2V5XSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBzZXRfc3ZnX2F0dHJpYnV0ZXMobm9kZSwgYXR0cmlidXRlcykge1xuICAgIGZvciAoY29uc3Qga2V5IGluIGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgYXR0cihub2RlLCBrZXksIGF0dHJpYnV0ZXNba2V5XSk7XG4gICAgfVxufVxuZnVuY3Rpb24gc2V0X2N1c3RvbV9lbGVtZW50X2RhdGEobm9kZSwgcHJvcCwgdmFsdWUpIHtcbiAgICBpZiAocHJvcCBpbiBub2RlKSB7XG4gICAgICAgIG5vZGVbcHJvcF0gPSB0eXBlb2Ygbm9kZVtwcm9wXSA9PT0gJ2Jvb2xlYW4nICYmIHZhbHVlID09PSAnJyA/IHRydWUgOiB2YWx1ZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGF0dHIobm9kZSwgcHJvcCwgdmFsdWUpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHhsaW5rX2F0dHIobm9kZSwgYXR0cmlidXRlLCB2YWx1ZSkge1xuICAgIG5vZGUuc2V0QXR0cmlidXRlTlMoJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnLCBhdHRyaWJ1dGUsIHZhbHVlKTtcbn1cbmZ1bmN0aW9uIGdldF9iaW5kaW5nX2dyb3VwX3ZhbHVlKGdyb3VwLCBfX3ZhbHVlLCBjaGVja2VkKSB7XG4gICAgY29uc3QgdmFsdWUgPSBuZXcgU2V0KCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBncm91cC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBpZiAoZ3JvdXBbaV0uY2hlY2tlZClcbiAgICAgICAgICAgIHZhbHVlLmFkZChncm91cFtpXS5fX3ZhbHVlKTtcbiAgICB9XG4gICAgaWYgKCFjaGVja2VkKSB7XG4gICAgICAgIHZhbHVlLmRlbGV0ZShfX3ZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIEFycmF5LmZyb20odmFsdWUpO1xufVxuZnVuY3Rpb24gdG9fbnVtYmVyKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSAnJyA/IG51bGwgOiArdmFsdWU7XG59XG5mdW5jdGlvbiB0aW1lX3Jhbmdlc190b19hcnJheShyYW5nZXMpIHtcbiAgICBjb25zdCBhcnJheSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmFuZ2VzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGFycmF5LnB1c2goeyBzdGFydDogcmFuZ2VzLnN0YXJ0KGkpLCBlbmQ6IHJhbmdlcy5lbmQoaSkgfSk7XG4gICAgfVxuICAgIHJldHVybiBhcnJheTtcbn1cbmZ1bmN0aW9uIGNoaWxkcmVuKGVsZW1lbnQpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShlbGVtZW50LmNoaWxkTm9kZXMpO1xufVxuZnVuY3Rpb24gaW5pdF9jbGFpbV9pbmZvKG5vZGVzKSB7XG4gICAgaWYgKG5vZGVzLmNsYWltX2luZm8gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBub2Rlcy5jbGFpbV9pbmZvID0geyBsYXN0X2luZGV4OiAwLCB0b3RhbF9jbGFpbWVkOiAwIH07XG4gICAgfVxufVxuZnVuY3Rpb24gY2xhaW1fbm9kZShub2RlcywgcHJlZGljYXRlLCBwcm9jZXNzTm9kZSwgY3JlYXRlTm9kZSwgZG9udFVwZGF0ZUxhc3RJbmRleCA9IGZhbHNlKSB7XG4gICAgLy8gVHJ5IHRvIGZpbmQgbm9kZXMgaW4gYW4gb3JkZXIgc3VjaCB0aGF0IHdlIGxlbmd0aGVuIHRoZSBsb25nZXN0IGluY3JlYXNpbmcgc3Vic2VxdWVuY2VcbiAgICBpbml0X2NsYWltX2luZm8obm9kZXMpO1xuICAgIGNvbnN0IHJlc3VsdE5vZGUgPSAoKCkgPT4ge1xuICAgICAgICAvLyBXZSBmaXJzdCB0cnkgdG8gZmluZCBhbiBlbGVtZW50IGFmdGVyIHRoZSBwcmV2aW91cyBvbmVcbiAgICAgICAgZm9yIChsZXQgaSA9IG5vZGVzLmNsYWltX2luZm8ubGFzdF9pbmRleDsgaSA8IG5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBub2RlID0gbm9kZXNbaV07XG4gICAgICAgICAgICBpZiAocHJlZGljYXRlKG5vZGUpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVwbGFjZW1lbnQgPSBwcm9jZXNzTm9kZShub2RlKTtcbiAgICAgICAgICAgICAgICBpZiAocmVwbGFjZW1lbnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBub2Rlcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBub2Rlc1tpXSA9IHJlcGxhY2VtZW50O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIWRvbnRVcGRhdGVMYXN0SW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZXMuY2xhaW1faW5mby5sYXN0X2luZGV4ID0gaTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gT3RoZXJ3aXNlLCB3ZSB0cnkgdG8gZmluZCBvbmUgYmVmb3JlXG4gICAgICAgIC8vIFdlIGl0ZXJhdGUgaW4gcmV2ZXJzZSBzbyB0aGF0IHdlIGRvbid0IGdvIHRvbyBmYXIgYmFja1xuICAgICAgICBmb3IgKGxldCBpID0gbm9kZXMuY2xhaW1faW5mby5sYXN0X2luZGV4IC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIGNvbnN0IG5vZGUgPSBub2Rlc1tpXTtcbiAgICAgICAgICAgIGlmIChwcmVkaWNhdGUobm9kZSkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXBsYWNlbWVudCA9IHByb2Nlc3NOb2RlKG5vZGUpO1xuICAgICAgICAgICAgICAgIGlmIChyZXBsYWNlbWVudCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGVzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGVzW2ldID0gcmVwbGFjZW1lbnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghZG9udFVwZGF0ZUxhc3RJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICBub2Rlcy5jbGFpbV9pbmZvLmxhc3RfaW5kZXggPSBpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChyZXBsYWNlbWVudCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFNpbmNlIHdlIHNwbGljZWQgYmVmb3JlIHRoZSBsYXN0X2luZGV4LCB3ZSBkZWNyZWFzZSBpdFxuICAgICAgICAgICAgICAgICAgICBub2Rlcy5jbGFpbV9pbmZvLmxhc3RfaW5kZXgtLTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgd2UgY2FuJ3QgZmluZCBhbnkgbWF0Y2hpbmcgbm9kZSwgd2UgY3JlYXRlIGEgbmV3IG9uZVxuICAgICAgICByZXR1cm4gY3JlYXRlTm9kZSgpO1xuICAgIH0pKCk7XG4gICAgcmVzdWx0Tm9kZS5jbGFpbV9vcmRlciA9IG5vZGVzLmNsYWltX2luZm8udG90YWxfY2xhaW1lZDtcbiAgICBub2Rlcy5jbGFpbV9pbmZvLnRvdGFsX2NsYWltZWQgKz0gMTtcbiAgICByZXR1cm4gcmVzdWx0Tm9kZTtcbn1cbmZ1bmN0aW9uIGNsYWltX2VsZW1lbnRfYmFzZShub2RlcywgbmFtZSwgYXR0cmlidXRlcywgY3JlYXRlX2VsZW1lbnQpIHtcbiAgICByZXR1cm4gY2xhaW1fbm9kZShub2RlcywgKG5vZGUpID0+IG5vZGUubm9kZU5hbWUgPT09IG5hbWUsIChub2RlKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlbW92ZSA9IFtdO1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG5vZGUuYXR0cmlidXRlcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgY29uc3QgYXR0cmlidXRlID0gbm9kZS5hdHRyaWJ1dGVzW2pdO1xuICAgICAgICAgICAgaWYgKCFhdHRyaWJ1dGVzW2F0dHJpYnV0ZS5uYW1lXSkge1xuICAgICAgICAgICAgICAgIHJlbW92ZS5wdXNoKGF0dHJpYnV0ZS5uYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZW1vdmUuZm9yRWFjaCh2ID0+IG5vZGUucmVtb3ZlQXR0cmlidXRlKHYpKTtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9LCAoKSA9PiBjcmVhdGVfZWxlbWVudChuYW1lKSk7XG59XG5mdW5jdGlvbiBjbGFpbV9lbGVtZW50KG5vZGVzLCBuYW1lLCBhdHRyaWJ1dGVzKSB7XG4gICAgcmV0dXJuIGNsYWltX2VsZW1lbnRfYmFzZShub2RlcywgbmFtZSwgYXR0cmlidXRlcywgZWxlbWVudCk7XG59XG5mdW5jdGlvbiBjbGFpbV9zdmdfZWxlbWVudChub2RlcywgbmFtZSwgYXR0cmlidXRlcykge1xuICAgIHJldHVybiBjbGFpbV9lbGVtZW50X2Jhc2Uobm9kZXMsIG5hbWUsIGF0dHJpYnV0ZXMsIHN2Z19lbGVtZW50KTtcbn1cbmZ1bmN0aW9uIGNsYWltX3RleHQobm9kZXMsIGRhdGEpIHtcbiAgICByZXR1cm4gY2xhaW1fbm9kZShub2RlcywgKG5vZGUpID0+IG5vZGUubm9kZVR5cGUgPT09IDMsIChub2RlKSA9PiB7XG4gICAgICAgIGNvbnN0IGRhdGFTdHIgPSAnJyArIGRhdGE7XG4gICAgICAgIGlmIChub2RlLmRhdGEuc3RhcnRzV2l0aChkYXRhU3RyKSkge1xuICAgICAgICAgICAgaWYgKG5vZGUuZGF0YS5sZW5ndGggIT09IGRhdGFTdHIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vZGUuc3BsaXRUZXh0KGRhdGFTdHIubGVuZ3RoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG5vZGUuZGF0YSA9IGRhdGFTdHI7XG4gICAgICAgIH1cbiAgICB9LCAoKSA9PiB0ZXh0KGRhdGEpLCB0cnVlIC8vIFRleHQgbm9kZXMgc2hvdWxkIG5vdCB1cGRhdGUgbGFzdCBpbmRleCBzaW5jZSBpdCBpcyBsaWtlbHkgbm90IHdvcnRoIGl0IHRvIGVsaW1pbmF0ZSBhbiBpbmNyZWFzaW5nIHN1YnNlcXVlbmNlIG9mIGFjdHVhbCBlbGVtZW50c1xuICAgICk7XG59XG5mdW5jdGlvbiBjbGFpbV9zcGFjZShub2Rlcykge1xuICAgIHJldHVybiBjbGFpbV90ZXh0KG5vZGVzLCAnICcpO1xufVxuZnVuY3Rpb24gZmluZF9jb21tZW50KG5vZGVzLCB0ZXh0LCBzdGFydCkge1xuICAgIGZvciAobGV0IGkgPSBzdGFydDsgaSA8IG5vZGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSBub2Rlc1tpXTtcbiAgICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IDggLyogY29tbWVudCBub2RlICovICYmIG5vZGUudGV4dENvbnRlbnQudHJpbSgpID09PSB0ZXh0KSB7XG4gICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbm9kZXMubGVuZ3RoO1xufVxuZnVuY3Rpb24gY2xhaW1faHRtbF90YWcobm9kZXMpIHtcbiAgICAvLyBmaW5kIGh0bWwgb3BlbmluZyB0YWdcbiAgICBjb25zdCBzdGFydF9pbmRleCA9IGZpbmRfY29tbWVudChub2RlcywgJ0hUTUxfVEFHX1NUQVJUJywgMCk7XG4gICAgY29uc3QgZW5kX2luZGV4ID0gZmluZF9jb21tZW50KG5vZGVzLCAnSFRNTF9UQUdfRU5EJywgc3RhcnRfaW5kZXgpO1xuICAgIGlmIChzdGFydF9pbmRleCA9PT0gZW5kX2luZGV4KSB7XG4gICAgICAgIHJldHVybiBuZXcgSHRtbFRhZ0h5ZHJhdGlvbigpO1xuICAgIH1cbiAgICBpbml0X2NsYWltX2luZm8obm9kZXMpO1xuICAgIGNvbnN0IGh0bWxfdGFnX25vZGVzID0gbm9kZXMuc3BsaWNlKHN0YXJ0X2luZGV4LCBlbmRfaW5kZXggLSBzdGFydF9pbmRleCArIDEpO1xuICAgIGRldGFjaChodG1sX3RhZ19ub2Rlc1swXSk7XG4gICAgZGV0YWNoKGh0bWxfdGFnX25vZGVzW2h0bWxfdGFnX25vZGVzLmxlbmd0aCAtIDFdKTtcbiAgICBjb25zdCBjbGFpbWVkX25vZGVzID0gaHRtbF90YWdfbm9kZXMuc2xpY2UoMSwgaHRtbF90YWdfbm9kZXMubGVuZ3RoIC0gMSk7XG4gICAgZm9yIChjb25zdCBuIG9mIGNsYWltZWRfbm9kZXMpIHtcbiAgICAgICAgbi5jbGFpbV9vcmRlciA9IG5vZGVzLmNsYWltX2luZm8udG90YWxfY2xhaW1lZDtcbiAgICAgICAgbm9kZXMuY2xhaW1faW5mby50b3RhbF9jbGFpbWVkICs9IDE7XG4gICAgfVxuICAgIHJldHVybiBuZXcgSHRtbFRhZ0h5ZHJhdGlvbihjbGFpbWVkX25vZGVzKTtcbn1cbmZ1bmN0aW9uIHNldF9kYXRhKHRleHQsIGRhdGEpIHtcbiAgICBkYXRhID0gJycgKyBkYXRhO1xuICAgIGlmICh0ZXh0Lndob2xlVGV4dCAhPT0gZGF0YSlcbiAgICAgICAgdGV4dC5kYXRhID0gZGF0YTtcbn1cbmZ1bmN0aW9uIHNldF9pbnB1dF92YWx1ZShpbnB1dCwgdmFsdWUpIHtcbiAgICBpbnB1dC52YWx1ZSA9IHZhbHVlID09IG51bGwgPyAnJyA6IHZhbHVlO1xufVxuZnVuY3Rpb24gc2V0X2lucHV0X3R5cGUoaW5wdXQsIHR5cGUpIHtcbiAgICB0cnkge1xuICAgICAgICBpbnB1dC50eXBlID0gdHlwZTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gZG8gbm90aGluZ1xuICAgIH1cbn1cbmZ1bmN0aW9uIHNldF9zdHlsZShub2RlLCBrZXksIHZhbHVlLCBpbXBvcnRhbnQpIHtcbiAgICBpZiAodmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgbm9kZS5zdHlsZS5yZW1vdmVQcm9wZXJ0eShrZXkpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgbm9kZS5zdHlsZS5zZXRQcm9wZXJ0eShrZXksIHZhbHVlLCBpbXBvcnRhbnQgPyAnaW1wb3J0YW50JyA6ICcnKTtcbiAgICB9XG59XG5mdW5jdGlvbiBzZWxlY3Rfb3B0aW9uKHNlbGVjdCwgdmFsdWUpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGVjdC5vcHRpb25zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbiA9IHNlbGVjdC5vcHRpb25zW2ldO1xuICAgICAgICBpZiAob3B0aW9uLl9fdmFsdWUgPT09IHZhbHVlKSB7XG4gICAgICAgICAgICBvcHRpb24uc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNlbGVjdC5zZWxlY3RlZEluZGV4ID0gLTE7IC8vIG5vIG9wdGlvbiBzaG91bGQgYmUgc2VsZWN0ZWRcbn1cbmZ1bmN0aW9uIHNlbGVjdF9vcHRpb25zKHNlbGVjdCwgdmFsdWUpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGVjdC5vcHRpb25zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbiA9IHNlbGVjdC5vcHRpb25zW2ldO1xuICAgICAgICBvcHRpb24uc2VsZWN0ZWQgPSB+dmFsdWUuaW5kZXhPZihvcHRpb24uX192YWx1ZSk7XG4gICAgfVxufVxuZnVuY3Rpb24gc2VsZWN0X3ZhbHVlKHNlbGVjdCkge1xuICAgIGNvbnN0IHNlbGVjdGVkX29wdGlvbiA9IHNlbGVjdC5xdWVyeVNlbGVjdG9yKCc6Y2hlY2tlZCcpIHx8IHNlbGVjdC5vcHRpb25zWzBdO1xuICAgIHJldHVybiBzZWxlY3RlZF9vcHRpb24gJiYgc2VsZWN0ZWRfb3B0aW9uLl9fdmFsdWU7XG59XG5mdW5jdGlvbiBzZWxlY3RfbXVsdGlwbGVfdmFsdWUoc2VsZWN0KSB7XG4gICAgcmV0dXJuIFtdLm1hcC5jYWxsKHNlbGVjdC5xdWVyeVNlbGVjdG9yQWxsKCc6Y2hlY2tlZCcpLCBvcHRpb24gPT4gb3B0aW9uLl9fdmFsdWUpO1xufVxuLy8gdW5mb3J0dW5hdGVseSB0aGlzIGNhbid0IGJlIGEgY29uc3RhbnQgYXMgdGhhdCB3b3VsZG4ndCBiZSB0cmVlLXNoYWtlYWJsZVxuLy8gc28gd2UgY2FjaGUgdGhlIHJlc3VsdCBpbnN0ZWFkXG5sZXQgY3Jvc3NvcmlnaW47XG5mdW5jdGlvbiBpc19jcm9zc29yaWdpbigpIHtcbiAgICBpZiAoY3Jvc3NvcmlnaW4gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjcm9zc29yaWdpbiA9IGZhbHNlO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5wYXJlbnQpIHtcbiAgICAgICAgICAgICAgICB2b2lkIHdpbmRvdy5wYXJlbnQuZG9jdW1lbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjcm9zc29yaWdpbiA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNyb3Nzb3JpZ2luO1xufVxuZnVuY3Rpb24gYWRkX3Jlc2l6ZV9saXN0ZW5lcihub2RlLCBmbikge1xuICAgIGNvbnN0IGNvbXB1dGVkX3N0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcbiAgICBpZiAoY29tcHV0ZWRfc3R5bGUucG9zaXRpb24gPT09ICdzdGF0aWMnKSB7XG4gICAgICAgIG5vZGUuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xuICAgIH1cbiAgICBjb25zdCBpZnJhbWUgPSBlbGVtZW50KCdpZnJhbWUnKTtcbiAgICBpZnJhbWUuc2V0QXR0cmlidXRlKCdzdHlsZScsICdkaXNwbGF5OiBibG9jazsgcG9zaXRpb246IGFic29sdXRlOyB0b3A6IDA7IGxlZnQ6IDA7IHdpZHRoOiAxMDAlOyBoZWlnaHQ6IDEwMCU7ICcgK1xuICAgICAgICAnb3ZlcmZsb3c6IGhpZGRlbjsgYm9yZGVyOiAwOyBvcGFjaXR5OiAwOyBwb2ludGVyLWV2ZW50czogbm9uZTsgei1pbmRleDogLTE7Jyk7XG4gICAgaWZyYW1lLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuICAgIGlmcmFtZS50YWJJbmRleCA9IC0xO1xuICAgIGNvbnN0IGNyb3Nzb3JpZ2luID0gaXNfY3Jvc3NvcmlnaW4oKTtcbiAgICBsZXQgdW5zdWJzY3JpYmU7XG4gICAgaWYgKGNyb3Nzb3JpZ2luKSB7XG4gICAgICAgIGlmcmFtZS5zcmMgPSBcImRhdGE6dGV4dC9odG1sLDxzY3JpcHQ+b25yZXNpemU9ZnVuY3Rpb24oKXtwYXJlbnQucG9zdE1lc3NhZ2UoMCwnKicpfTwvc2NyaXB0PlwiO1xuICAgICAgICB1bnN1YnNjcmliZSA9IGxpc3Rlbih3aW5kb3csICdtZXNzYWdlJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoZXZlbnQuc291cmNlID09PSBpZnJhbWUuY29udGVudFdpbmRvdylcbiAgICAgICAgICAgICAgICBmbigpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGlmcmFtZS5zcmMgPSAnYWJvdXQ6YmxhbmsnO1xuICAgICAgICBpZnJhbWUub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgdW5zdWJzY3JpYmUgPSBsaXN0ZW4oaWZyYW1lLmNvbnRlbnRXaW5kb3csICdyZXNpemUnLCBmbik7XG4gICAgICAgIH07XG4gICAgfVxuICAgIGFwcGVuZChub2RlLCBpZnJhbWUpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGlmIChjcm9zc29yaWdpbikge1xuICAgICAgICAgICAgdW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh1bnN1YnNjcmliZSAmJiBpZnJhbWUuY29udGVudFdpbmRvdykge1xuICAgICAgICAgICAgdW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgICAgICBkZXRhY2goaWZyYW1lKTtcbiAgICB9O1xufVxuZnVuY3Rpb24gdG9nZ2xlX2NsYXNzKGVsZW1lbnQsIG5hbWUsIHRvZ2dsZSkge1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0W3RvZ2dsZSA/ICdhZGQnIDogJ3JlbW92ZSddKG5hbWUpO1xufVxuZnVuY3Rpb24gY3VzdG9tX2V2ZW50KHR5cGUsIGRldGFpbCwgYnViYmxlcyA9IGZhbHNlKSB7XG4gICAgY29uc3QgZSA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuICAgIGUuaW5pdEN1c3RvbUV2ZW50KHR5cGUsIGJ1YmJsZXMsIGZhbHNlLCBkZXRhaWwpO1xuICAgIHJldHVybiBlO1xufVxuZnVuY3Rpb24gcXVlcnlfc2VsZWN0b3JfYWxsKHNlbGVjdG9yLCBwYXJlbnQgPSBkb2N1bWVudC5ib2R5KSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20ocGFyZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKTtcbn1cbmNsYXNzIEh0bWxUYWcge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmUgPSB0aGlzLm4gPSBudWxsO1xuICAgIH1cbiAgICBjKGh0bWwpIHtcbiAgICAgICAgdGhpcy5oKGh0bWwpO1xuICAgIH1cbiAgICBtKGh0bWwsIHRhcmdldCwgYW5jaG9yID0gbnVsbCkge1xuICAgICAgICBpZiAoIXRoaXMuZSkge1xuICAgICAgICAgICAgdGhpcy5lID0gZWxlbWVudCh0YXJnZXQubm9kZU5hbWUpO1xuICAgICAgICAgICAgdGhpcy50ID0gdGFyZ2V0O1xuICAgICAgICAgICAgdGhpcy5jKGh0bWwpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaShhbmNob3IpO1xuICAgIH1cbiAgICBoKGh0bWwpIHtcbiAgICAgICAgdGhpcy5lLmlubmVySFRNTCA9IGh0bWw7XG4gICAgICAgIHRoaXMubiA9IEFycmF5LmZyb20odGhpcy5lLmNoaWxkTm9kZXMpO1xuICAgIH1cbiAgICBpKGFuY2hvcikge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubi5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgaW5zZXJ0KHRoaXMudCwgdGhpcy5uW2ldLCBhbmNob3IpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHAoaHRtbCkge1xuICAgICAgICB0aGlzLmQoKTtcbiAgICAgICAgdGhpcy5oKGh0bWwpO1xuICAgICAgICB0aGlzLmkodGhpcy5hKTtcbiAgICB9XG4gICAgZCgpIHtcbiAgICAgICAgdGhpcy5uLmZvckVhY2goZGV0YWNoKTtcbiAgICB9XG59XG5jbGFzcyBIdG1sVGFnSHlkcmF0aW9uIGV4dGVuZHMgSHRtbFRhZyB7XG4gICAgY29uc3RydWN0b3IoY2xhaW1lZF9ub2Rlcykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmUgPSB0aGlzLm4gPSBudWxsO1xuICAgICAgICB0aGlzLmwgPSBjbGFpbWVkX25vZGVzO1xuICAgIH1cbiAgICBjKGh0bWwpIHtcbiAgICAgICAgaWYgKHRoaXMubCkge1xuICAgICAgICAgICAgdGhpcy5uID0gdGhpcy5sO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc3VwZXIuYyhodG1sKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpKGFuY2hvcikge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubi5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgaW5zZXJ0X2h5ZHJhdGlvbih0aGlzLnQsIHRoaXMubltpXSwgYW5jaG9yKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIGF0dHJpYnV0ZV90b19vYmplY3QoYXR0cmlidXRlcykge1xuICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xuICAgIGZvciAoY29uc3QgYXR0cmlidXRlIG9mIGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgcmVzdWx0W2F0dHJpYnV0ZS5uYW1lXSA9IGF0dHJpYnV0ZS52YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIGdldF9jdXN0b21fZWxlbWVudHNfc2xvdHMoZWxlbWVudCkge1xuICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xuICAgIGVsZW1lbnQuY2hpbGROb2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICAgIHJlc3VsdFtub2RlLnNsb3QgfHwgJ2RlZmF1bHQnXSA9IHRydWU7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLy8gd2UgbmVlZCB0byBzdG9yZSB0aGUgaW5mb3JtYXRpb24gZm9yIG11bHRpcGxlIGRvY3VtZW50cyBiZWNhdXNlIGEgU3ZlbHRlIGFwcGxpY2F0aW9uIGNvdWxkIGFsc28gY29udGFpbiBpZnJhbWVzXG4vLyBodHRwczovL2dpdGh1Yi5jb20vc3ZlbHRlanMvc3ZlbHRlL2lzc3Vlcy8zNjI0XG5jb25zdCBtYW5hZ2VkX3N0eWxlcyA9IG5ldyBNYXAoKTtcbmxldCBhY3RpdmUgPSAwO1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL2Rhcmtza3lhcHAvc3RyaW5nLWhhc2gvYmxvYi9tYXN0ZXIvaW5kZXguanNcbmZ1bmN0aW9uIGhhc2goc3RyKSB7XG4gICAgbGV0IGhhc2ggPSA1MzgxO1xuICAgIGxldCBpID0gc3RyLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tKVxuICAgICAgICBoYXNoID0gKChoYXNoIDw8IDUpIC0gaGFzaCkgXiBzdHIuY2hhckNvZGVBdChpKTtcbiAgICByZXR1cm4gaGFzaCA+Pj4gMDtcbn1cbmZ1bmN0aW9uIGNyZWF0ZV9zdHlsZV9pbmZvcm1hdGlvbihkb2MsIG5vZGUpIHtcbiAgICBjb25zdCBpbmZvID0geyBzdHlsZXNoZWV0OiBhcHBlbmRfZW1wdHlfc3R5bGVzaGVldChub2RlKSwgcnVsZXM6IHt9IH07XG4gICAgbWFuYWdlZF9zdHlsZXMuc2V0KGRvYywgaW5mbyk7XG4gICAgcmV0dXJuIGluZm87XG59XG5mdW5jdGlvbiBjcmVhdGVfcnVsZShub2RlLCBhLCBiLCBkdXJhdGlvbiwgZGVsYXksIGVhc2UsIGZuLCB1aWQgPSAwKSB7XG4gICAgY29uc3Qgc3RlcCA9IDE2LjY2NiAvIGR1cmF0aW9uO1xuICAgIGxldCBrZXlmcmFtZXMgPSAne1xcbic7XG4gICAgZm9yIChsZXQgcCA9IDA7IHAgPD0gMTsgcCArPSBzdGVwKSB7XG4gICAgICAgIGNvbnN0IHQgPSBhICsgKGIgLSBhKSAqIGVhc2UocCk7XG4gICAgICAgIGtleWZyYW1lcyArPSBwICogMTAwICsgYCV7JHtmbih0LCAxIC0gdCl9fVxcbmA7XG4gICAgfVxuICAgIGNvbnN0IHJ1bGUgPSBrZXlmcmFtZXMgKyBgMTAwJSB7JHtmbihiLCAxIC0gYil9fVxcbn1gO1xuICAgIGNvbnN0IG5hbWUgPSBgX19zdmVsdGVfJHtoYXNoKHJ1bGUpfV8ke3VpZH1gO1xuICAgIGNvbnN0IGRvYyA9IGdldF9yb290X2Zvcl9zdHlsZShub2RlKTtcbiAgICBjb25zdCB7IHN0eWxlc2hlZXQsIHJ1bGVzIH0gPSBtYW5hZ2VkX3N0eWxlcy5nZXQoZG9jKSB8fCBjcmVhdGVfc3R5bGVfaW5mb3JtYXRpb24oZG9jLCBub2RlKTtcbiAgICBpZiAoIXJ1bGVzW25hbWVdKSB7XG4gICAgICAgIHJ1bGVzW25hbWVdID0gdHJ1ZTtcbiAgICAgICAgc3R5bGVzaGVldC5pbnNlcnRSdWxlKGBAa2V5ZnJhbWVzICR7bmFtZX0gJHtydWxlfWAsIHN0eWxlc2hlZXQuY3NzUnVsZXMubGVuZ3RoKTtcbiAgICB9XG4gICAgY29uc3QgYW5pbWF0aW9uID0gbm9kZS5zdHlsZS5hbmltYXRpb24gfHwgJyc7XG4gICAgbm9kZS5zdHlsZS5hbmltYXRpb24gPSBgJHthbmltYXRpb24gPyBgJHthbmltYXRpb259LCBgIDogJyd9JHtuYW1lfSAke2R1cmF0aW9ufW1zIGxpbmVhciAke2RlbGF5fW1zIDEgYm90aGA7XG4gICAgYWN0aXZlICs9IDE7XG4gICAgcmV0dXJuIG5hbWU7XG59XG5mdW5jdGlvbiBkZWxldGVfcnVsZShub2RlLCBuYW1lKSB7XG4gICAgY29uc3QgcHJldmlvdXMgPSAobm9kZS5zdHlsZS5hbmltYXRpb24gfHwgJycpLnNwbGl0KCcsICcpO1xuICAgIGNvbnN0IG5leHQgPSBwcmV2aW91cy5maWx0ZXIobmFtZVxuICAgICAgICA/IGFuaW0gPT4gYW5pbS5pbmRleE9mKG5hbWUpIDwgMCAvLyByZW1vdmUgc3BlY2lmaWMgYW5pbWF0aW9uXG4gICAgICAgIDogYW5pbSA9PiBhbmltLmluZGV4T2YoJ19fc3ZlbHRlJykgPT09IC0xIC8vIHJlbW92ZSBhbGwgU3ZlbHRlIGFuaW1hdGlvbnNcbiAgICApO1xuICAgIGNvbnN0IGRlbGV0ZWQgPSBwcmV2aW91cy5sZW5ndGggLSBuZXh0Lmxlbmd0aDtcbiAgICBpZiAoZGVsZXRlZCkge1xuICAgICAgICBub2RlLnN0eWxlLmFuaW1hdGlvbiA9IG5leHQuam9pbignLCAnKTtcbiAgICAgICAgYWN0aXZlIC09IGRlbGV0ZWQ7XG4gICAgICAgIGlmICghYWN0aXZlKVxuICAgICAgICAgICAgY2xlYXJfcnVsZXMoKTtcbiAgICB9XG59XG5mdW5jdGlvbiBjbGVhcl9ydWxlcygpIHtcbiAgICByYWYoKCkgPT4ge1xuICAgICAgICBpZiAoYWN0aXZlKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBtYW5hZ2VkX3N0eWxlcy5mb3JFYWNoKGluZm8gPT4ge1xuICAgICAgICAgICAgY29uc3QgeyBzdHlsZXNoZWV0IH0gPSBpbmZvO1xuICAgICAgICAgICAgbGV0IGkgPSBzdHlsZXNoZWV0LmNzc1J1bGVzLmxlbmd0aDtcbiAgICAgICAgICAgIHdoaWxlIChpLS0pXG4gICAgICAgICAgICAgICAgc3R5bGVzaGVldC5kZWxldGVSdWxlKGkpO1xuICAgICAgICAgICAgaW5mby5ydWxlcyA9IHt9O1xuICAgICAgICB9KTtcbiAgICAgICAgbWFuYWdlZF9zdHlsZXMuY2xlYXIoKTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlX2FuaW1hdGlvbihub2RlLCBmcm9tLCBmbiwgcGFyYW1zKSB7XG4gICAgaWYgKCFmcm9tKVxuICAgICAgICByZXR1cm4gbm9vcDtcbiAgICBjb25zdCB0byA9IG5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgaWYgKGZyb20ubGVmdCA9PT0gdG8ubGVmdCAmJiBmcm9tLnJpZ2h0ID09PSB0by5yaWdodCAmJiBmcm9tLnRvcCA9PT0gdG8udG9wICYmIGZyb20uYm90dG9tID09PSB0by5ib3R0b20pXG4gICAgICAgIHJldHVybiBub29wO1xuICAgIGNvbnN0IHsgZGVsYXkgPSAwLCBkdXJhdGlvbiA9IDMwMCwgZWFzaW5nID0gaWRlbnRpdHksIFxuICAgIC8vIEB0cy1pZ25vcmUgdG9kbzogc2hvdWxkIHRoaXMgYmUgc2VwYXJhdGVkIGZyb20gZGVzdHJ1Y3R1cmluZz8gT3Igc3RhcnQvZW5kIGFkZGVkIHRvIHB1YmxpYyBhcGkgYW5kIGRvY3VtZW50YXRpb24/XG4gICAgc3RhcnQ6IHN0YXJ0X3RpbWUgPSBub3coKSArIGRlbGF5LCBcbiAgICAvLyBAdHMtaWdub3JlIHRvZG86XG4gICAgZW5kID0gc3RhcnRfdGltZSArIGR1cmF0aW9uLCB0aWNrID0gbm9vcCwgY3NzIH0gPSBmbihub2RlLCB7IGZyb20sIHRvIH0sIHBhcmFtcyk7XG4gICAgbGV0IHJ1bm5pbmcgPSB0cnVlO1xuICAgIGxldCBzdGFydGVkID0gZmFsc2U7XG4gICAgbGV0IG5hbWU7XG4gICAgZnVuY3Rpb24gc3RhcnQoKSB7XG4gICAgICAgIGlmIChjc3MpIHtcbiAgICAgICAgICAgIG5hbWUgPSBjcmVhdGVfcnVsZShub2RlLCAwLCAxLCBkdXJhdGlvbiwgZGVsYXksIGVhc2luZywgY3NzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWRlbGF5KSB7XG4gICAgICAgICAgICBzdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBzdG9wKCkge1xuICAgICAgICBpZiAoY3NzKVxuICAgICAgICAgICAgZGVsZXRlX3J1bGUobm9kZSwgbmFtZSk7XG4gICAgICAgIHJ1bm5pbmcgPSBmYWxzZTtcbiAgICB9XG4gICAgbG9vcChub3cgPT4ge1xuICAgICAgICBpZiAoIXN0YXJ0ZWQgJiYgbm93ID49IHN0YXJ0X3RpbWUpIHtcbiAgICAgICAgICAgIHN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdGFydGVkICYmIG5vdyA+PSBlbmQpIHtcbiAgICAgICAgICAgIHRpY2soMSwgMCk7XG4gICAgICAgICAgICBzdG9wKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFydW5uaW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN0YXJ0ZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IHAgPSBub3cgLSBzdGFydF90aW1lO1xuICAgICAgICAgICAgY29uc3QgdCA9IDAgKyAxICogZWFzaW5nKHAgLyBkdXJhdGlvbik7XG4gICAgICAgICAgICB0aWNrKHQsIDEgLSB0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9KTtcbiAgICBzdGFydCgpO1xuICAgIHRpY2soMCwgMSk7XG4gICAgcmV0dXJuIHN0b3A7XG59XG5mdW5jdGlvbiBmaXhfcG9zaXRpb24obm9kZSkge1xuICAgIGNvbnN0IHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcbiAgICBpZiAoc3R5bGUucG9zaXRpb24gIT09ICdhYnNvbHV0ZScgJiYgc3R5bGUucG9zaXRpb24gIT09ICdmaXhlZCcpIHtcbiAgICAgICAgY29uc3QgeyB3aWR0aCwgaGVpZ2h0IH0gPSBzdHlsZTtcbiAgICAgICAgY29uc3QgYSA9IG5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIG5vZGUuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgICBub2RlLnN0eWxlLndpZHRoID0gd2lkdGg7XG4gICAgICAgIG5vZGUuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICBhZGRfdHJhbnNmb3JtKG5vZGUsIGEpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGFkZF90cmFuc2Zvcm0obm9kZSwgYSkge1xuICAgIGNvbnN0IGIgPSBub2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGlmIChhLmxlZnQgIT09IGIubGVmdCB8fCBhLnRvcCAhPT0gYi50b3ApIHtcbiAgICAgICAgY29uc3Qgc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xuICAgICAgICBjb25zdCB0cmFuc2Zvcm0gPSBzdHlsZS50cmFuc2Zvcm0gPT09ICdub25lJyA/ICcnIDogc3R5bGUudHJhbnNmb3JtO1xuICAgICAgICBub2RlLnN0eWxlLnRyYW5zZm9ybSA9IGAke3RyYW5zZm9ybX0gdHJhbnNsYXRlKCR7YS5sZWZ0IC0gYi5sZWZ0fXB4LCAke2EudG9wIC0gYi50b3B9cHgpYDtcbiAgICB9XG59XG5cbmxldCBjdXJyZW50X2NvbXBvbmVudDtcbmZ1bmN0aW9uIHNldF9jdXJyZW50X2NvbXBvbmVudChjb21wb25lbnQpIHtcbiAgICBjdXJyZW50X2NvbXBvbmVudCA9IGNvbXBvbmVudDtcbn1cbmZ1bmN0aW9uIGdldF9jdXJyZW50X2NvbXBvbmVudCgpIHtcbiAgICBpZiAoIWN1cnJlbnRfY29tcG9uZW50KVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Z1bmN0aW9uIGNhbGxlZCBvdXRzaWRlIGNvbXBvbmVudCBpbml0aWFsaXphdGlvbicpO1xuICAgIHJldHVybiBjdXJyZW50X2NvbXBvbmVudDtcbn1cbmZ1bmN0aW9uIGJlZm9yZVVwZGF0ZShmbikge1xuICAgIGdldF9jdXJyZW50X2NvbXBvbmVudCgpLiQkLmJlZm9yZV91cGRhdGUucHVzaChmbik7XG59XG5mdW5jdGlvbiBvbk1vdW50KGZuKSB7XG4gICAgZ2V0X2N1cnJlbnRfY29tcG9uZW50KCkuJCQub25fbW91bnQucHVzaChmbik7XG59XG5mdW5jdGlvbiBhZnRlclVwZGF0ZShmbikge1xuICAgIGdldF9jdXJyZW50X2NvbXBvbmVudCgpLiQkLmFmdGVyX3VwZGF0ZS5wdXNoKGZuKTtcbn1cbmZ1bmN0aW9uIG9uRGVzdHJveShmbikge1xuICAgIGdldF9jdXJyZW50X2NvbXBvbmVudCgpLiQkLm9uX2Rlc3Ryb3kucHVzaChmbik7XG59XG5mdW5jdGlvbiBjcmVhdGVFdmVudERpc3BhdGNoZXIoKSB7XG4gICAgY29uc3QgY29tcG9uZW50ID0gZ2V0X2N1cnJlbnRfY29tcG9uZW50KCk7XG4gICAgcmV0dXJuICh0eXBlLCBkZXRhaWwpID0+IHtcbiAgICAgICAgY29uc3QgY2FsbGJhY2tzID0gY29tcG9uZW50LiQkLmNhbGxiYWNrc1t0eXBlXTtcbiAgICAgICAgaWYgKGNhbGxiYWNrcykge1xuICAgICAgICAgICAgLy8gVE9ETyBhcmUgdGhlcmUgc2l0dWF0aW9ucyB3aGVyZSBldmVudHMgY291bGQgYmUgZGlzcGF0Y2hlZFxuICAgICAgICAgICAgLy8gaW4gYSBzZXJ2ZXIgKG5vbi1ET00pIGVudmlyb25tZW50P1xuICAgICAgICAgICAgY29uc3QgZXZlbnQgPSBjdXN0b21fZXZlbnQodHlwZSwgZGV0YWlsKTtcbiAgICAgICAgICAgIGNhbGxiYWNrcy5zbGljZSgpLmZvckVhY2goZm4gPT4ge1xuICAgICAgICAgICAgICAgIGZuLmNhbGwoY29tcG9uZW50LCBldmVudCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG59XG5mdW5jdGlvbiBzZXRDb250ZXh0KGtleSwgY29udGV4dCkge1xuICAgIGdldF9jdXJyZW50X2NvbXBvbmVudCgpLiQkLmNvbnRleHQuc2V0KGtleSwgY29udGV4dCk7XG59XG5mdW5jdGlvbiBnZXRDb250ZXh0KGtleSkge1xuICAgIHJldHVybiBnZXRfY3VycmVudF9jb21wb25lbnQoKS4kJC5jb250ZXh0LmdldChrZXkpO1xufVxuZnVuY3Rpb24gZ2V0QWxsQ29udGV4dHMoKSB7XG4gICAgcmV0dXJuIGdldF9jdXJyZW50X2NvbXBvbmVudCgpLiQkLmNvbnRleHQ7XG59XG5mdW5jdGlvbiBoYXNDb250ZXh0KGtleSkge1xuICAgIHJldHVybiBnZXRfY3VycmVudF9jb21wb25lbnQoKS4kJC5jb250ZXh0LmhhcyhrZXkpO1xufVxuLy8gVE9ETyBmaWd1cmUgb3V0IGlmIHdlIHN0aWxsIHdhbnQgdG8gc3VwcG9ydFxuLy8gc2hvcnRoYW5kIGV2ZW50cywgb3IgaWYgd2Ugd2FudCB0byBpbXBsZW1lbnRcbi8vIGEgcmVhbCBidWJibGluZyBtZWNoYW5pc21cbmZ1bmN0aW9uIGJ1YmJsZShjb21wb25lbnQsIGV2ZW50KSB7XG4gICAgY29uc3QgY2FsbGJhY2tzID0gY29tcG9uZW50LiQkLmNhbGxiYWNrc1tldmVudC50eXBlXTtcbiAgICBpZiAoY2FsbGJhY2tzKSB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgY2FsbGJhY2tzLnNsaWNlKCkuZm9yRWFjaChmbiA9PiBmbi5jYWxsKHRoaXMsIGV2ZW50KSk7XG4gICAgfVxufVxuXG5jb25zdCBkaXJ0eV9jb21wb25lbnRzID0gW107XG5jb25zdCBpbnRyb3MgPSB7IGVuYWJsZWQ6IGZhbHNlIH07XG5jb25zdCBiaW5kaW5nX2NhbGxiYWNrcyA9IFtdO1xuY29uc3QgcmVuZGVyX2NhbGxiYWNrcyA9IFtdO1xuY29uc3QgZmx1c2hfY2FsbGJhY2tzID0gW107XG5jb25zdCByZXNvbHZlZF9wcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKCk7XG5sZXQgdXBkYXRlX3NjaGVkdWxlZCA9IGZhbHNlO1xuZnVuY3Rpb24gc2NoZWR1bGVfdXBkYXRlKCkge1xuICAgIGlmICghdXBkYXRlX3NjaGVkdWxlZCkge1xuICAgICAgICB1cGRhdGVfc2NoZWR1bGVkID0gdHJ1ZTtcbiAgICAgICAgcmVzb2x2ZWRfcHJvbWlzZS50aGVuKGZsdXNoKTtcbiAgICB9XG59XG5mdW5jdGlvbiB0aWNrKCkge1xuICAgIHNjaGVkdWxlX3VwZGF0ZSgpO1xuICAgIHJldHVybiByZXNvbHZlZF9wcm9taXNlO1xufVxuZnVuY3Rpb24gYWRkX3JlbmRlcl9jYWxsYmFjayhmbikge1xuICAgIHJlbmRlcl9jYWxsYmFja3MucHVzaChmbik7XG59XG5mdW5jdGlvbiBhZGRfZmx1c2hfY2FsbGJhY2soZm4pIHtcbiAgICBmbHVzaF9jYWxsYmFja3MucHVzaChmbik7XG59XG4vLyBmbHVzaCgpIGNhbGxzIGNhbGxiYWNrcyBpbiB0aGlzIG9yZGVyOlxuLy8gMS4gQWxsIGJlZm9yZVVwZGF0ZSBjYWxsYmFja3MsIGluIG9yZGVyOiBwYXJlbnRzIGJlZm9yZSBjaGlsZHJlblxuLy8gMi4gQWxsIGJpbmQ6dGhpcyBjYWxsYmFja3MsIGluIHJldmVyc2Ugb3JkZXI6IGNoaWxkcmVuIGJlZm9yZSBwYXJlbnRzLlxuLy8gMy4gQWxsIGFmdGVyVXBkYXRlIGNhbGxiYWNrcywgaW4gb3JkZXI6IHBhcmVudHMgYmVmb3JlIGNoaWxkcmVuLiBFWENFUFRcbi8vICAgIGZvciBhZnRlclVwZGF0ZXMgY2FsbGVkIGR1cmluZyB0aGUgaW5pdGlhbCBvbk1vdW50LCB3aGljaCBhcmUgY2FsbGVkIGluXG4vLyAgICByZXZlcnNlIG9yZGVyOiBjaGlsZHJlbiBiZWZvcmUgcGFyZW50cy5cbi8vIFNpbmNlIGNhbGxiYWNrcyBtaWdodCB1cGRhdGUgY29tcG9uZW50IHZhbHVlcywgd2hpY2ggY291bGQgdHJpZ2dlciBhbm90aGVyXG4vLyBjYWxsIHRvIGZsdXNoKCksIHRoZSBmb2xsb3dpbmcgc3RlcHMgZ3VhcmQgYWdhaW5zdCB0aGlzOlxuLy8gMS4gRHVyaW5nIGJlZm9yZVVwZGF0ZSwgYW55IHVwZGF0ZWQgY29tcG9uZW50cyB3aWxsIGJlIGFkZGVkIHRvIHRoZVxuLy8gICAgZGlydHlfY29tcG9uZW50cyBhcnJheSBhbmQgd2lsbCBjYXVzZSBhIHJlZW50cmFudCBjYWxsIHRvIGZsdXNoKCkuIEJlY2F1c2Vcbi8vICAgIHRoZSBmbHVzaCBpbmRleCBpcyBrZXB0IG91dHNpZGUgdGhlIGZ1bmN0aW9uLCB0aGUgcmVlbnRyYW50IGNhbGwgd2lsbCBwaWNrXG4vLyAgICB1cCB3aGVyZSB0aGUgZWFybGllciBjYWxsIGxlZnQgb2ZmIGFuZCBnbyB0aHJvdWdoIGFsbCBkaXJ0eSBjb21wb25lbnRzLiBUaGVcbi8vICAgIGN1cnJlbnRfY29tcG9uZW50IHZhbHVlIGlzIHNhdmVkIGFuZCByZXN0b3JlZCBzbyB0aGF0IHRoZSByZWVudHJhbnQgY2FsbCB3aWxsXG4vLyAgICBub3QgaW50ZXJmZXJlIHdpdGggdGhlIFwicGFyZW50XCIgZmx1c2goKSBjYWxsLlxuLy8gMi4gYmluZDp0aGlzIGNhbGxiYWNrcyBjYW5ub3QgdHJpZ2dlciBuZXcgZmx1c2goKSBjYWxscy5cbi8vIDMuIER1cmluZyBhZnRlclVwZGF0ZSwgYW55IHVwZGF0ZWQgY29tcG9uZW50cyB3aWxsIE5PVCBoYXZlIHRoZWlyIGFmdGVyVXBkYXRlXG4vLyAgICBjYWxsYmFjayBjYWxsZWQgYSBzZWNvbmQgdGltZTsgdGhlIHNlZW5fY2FsbGJhY2tzIHNldCwgb3V0c2lkZSB0aGUgZmx1c2goKVxuLy8gICAgZnVuY3Rpb24sIGd1YXJhbnRlZXMgdGhpcyBiZWhhdmlvci5cbmNvbnN0IHNlZW5fY2FsbGJhY2tzID0gbmV3IFNldCgpO1xubGV0IGZsdXNoaWR4ID0gMDsgLy8gRG8gKm5vdCogbW92ZSB0aGlzIGluc2lkZSB0aGUgZmx1c2goKSBmdW5jdGlvblxuZnVuY3Rpb24gZmx1c2goKSB7XG4gICAgY29uc3Qgc2F2ZWRfY29tcG9uZW50ID0gY3VycmVudF9jb21wb25lbnQ7XG4gICAgZG8ge1xuICAgICAgICAvLyBmaXJzdCwgY2FsbCBiZWZvcmVVcGRhdGUgZnVuY3Rpb25zXG4gICAgICAgIC8vIGFuZCB1cGRhdGUgY29tcG9uZW50c1xuICAgICAgICB3aGlsZSAoZmx1c2hpZHggPCBkaXJ0eV9jb21wb25lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3QgY29tcG9uZW50ID0gZGlydHlfY29tcG9uZW50c1tmbHVzaGlkeF07XG4gICAgICAgICAgICBmbHVzaGlkeCsrO1xuICAgICAgICAgICAgc2V0X2N1cnJlbnRfY29tcG9uZW50KGNvbXBvbmVudCk7XG4gICAgICAgICAgICB1cGRhdGUoY29tcG9uZW50LiQkKTtcbiAgICAgICAgfVxuICAgICAgICBzZXRfY3VycmVudF9jb21wb25lbnQobnVsbCk7XG4gICAgICAgIGRpcnR5X2NvbXBvbmVudHMubGVuZ3RoID0gMDtcbiAgICAgICAgZmx1c2hpZHggPSAwO1xuICAgICAgICB3aGlsZSAoYmluZGluZ19jYWxsYmFja3MubGVuZ3RoKVxuICAgICAgICAgICAgYmluZGluZ19jYWxsYmFja3MucG9wKCkoKTtcbiAgICAgICAgLy8gdGhlbiwgb25jZSBjb21wb25lbnRzIGFyZSB1cGRhdGVkLCBjYWxsXG4gICAgICAgIC8vIGFmdGVyVXBkYXRlIGZ1bmN0aW9ucy4gVGhpcyBtYXkgY2F1c2VcbiAgICAgICAgLy8gc3Vic2VxdWVudCB1cGRhdGVzLi4uXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVuZGVyX2NhbGxiYWNrcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgY29uc3QgY2FsbGJhY2sgPSByZW5kZXJfY2FsbGJhY2tzW2ldO1xuICAgICAgICAgICAgaWYgKCFzZWVuX2NhbGxiYWNrcy5oYXMoY2FsbGJhY2spKSB7XG4gICAgICAgICAgICAgICAgLy8gLi4uc28gZ3VhcmQgYWdhaW5zdCBpbmZpbml0ZSBsb29wc1xuICAgICAgICAgICAgICAgIHNlZW5fY2FsbGJhY2tzLmFkZChjYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZW5kZXJfY2FsbGJhY2tzLmxlbmd0aCA9IDA7XG4gICAgfSB3aGlsZSAoZGlydHlfY29tcG9uZW50cy5sZW5ndGgpO1xuICAgIHdoaWxlIChmbHVzaF9jYWxsYmFja3MubGVuZ3RoKSB7XG4gICAgICAgIGZsdXNoX2NhbGxiYWNrcy5wb3AoKSgpO1xuICAgIH1cbiAgICB1cGRhdGVfc2NoZWR1bGVkID0gZmFsc2U7XG4gICAgc2Vlbl9jYWxsYmFja3MuY2xlYXIoKTtcbiAgICBzZXRfY3VycmVudF9jb21wb25lbnQoc2F2ZWRfY29tcG9uZW50KTtcbn1cbmZ1bmN0aW9uIHVwZGF0ZSgkJCkge1xuICAgIGlmICgkJC5mcmFnbWVudCAhPT0gbnVsbCkge1xuICAgICAgICAkJC51cGRhdGUoKTtcbiAgICAgICAgcnVuX2FsbCgkJC5iZWZvcmVfdXBkYXRlKTtcbiAgICAgICAgY29uc3QgZGlydHkgPSAkJC5kaXJ0eTtcbiAgICAgICAgJCQuZGlydHkgPSBbLTFdO1xuICAgICAgICAkJC5mcmFnbWVudCAmJiAkJC5mcmFnbWVudC5wKCQkLmN0eCwgZGlydHkpO1xuICAgICAgICAkJC5hZnRlcl91cGRhdGUuZm9yRWFjaChhZGRfcmVuZGVyX2NhbGxiYWNrKTtcbiAgICB9XG59XG5cbmxldCBwcm9taXNlO1xuZnVuY3Rpb24gd2FpdCgpIHtcbiAgICBpZiAoIXByb21pc2UpIHtcbiAgICAgICAgcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICBwcm9taXNlLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgcHJvbWlzZSA9IG51bGw7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gcHJvbWlzZTtcbn1cbmZ1bmN0aW9uIGRpc3BhdGNoKG5vZGUsIGRpcmVjdGlvbiwga2luZCkge1xuICAgIG5vZGUuZGlzcGF0Y2hFdmVudChjdXN0b21fZXZlbnQoYCR7ZGlyZWN0aW9uID8gJ2ludHJvJyA6ICdvdXRybyd9JHtraW5kfWApKTtcbn1cbmNvbnN0IG91dHJvaW5nID0gbmV3IFNldCgpO1xubGV0IG91dHJvcztcbmZ1bmN0aW9uIGdyb3VwX291dHJvcygpIHtcbiAgICBvdXRyb3MgPSB7XG4gICAgICAgIHI6IDAsXG4gICAgICAgIGM6IFtdLFxuICAgICAgICBwOiBvdXRyb3MgLy8gcGFyZW50IGdyb3VwXG4gICAgfTtcbn1cbmZ1bmN0aW9uIGNoZWNrX291dHJvcygpIHtcbiAgICBpZiAoIW91dHJvcy5yKSB7XG4gICAgICAgIHJ1bl9hbGwob3V0cm9zLmMpO1xuICAgIH1cbiAgICBvdXRyb3MgPSBvdXRyb3MucDtcbn1cbmZ1bmN0aW9uIHRyYW5zaXRpb25faW4oYmxvY2ssIGxvY2FsKSB7XG4gICAgaWYgKGJsb2NrICYmIGJsb2NrLmkpIHtcbiAgICAgICAgb3V0cm9pbmcuZGVsZXRlKGJsb2NrKTtcbiAgICAgICAgYmxvY2suaShsb2NhbCk7XG4gICAgfVxufVxuZnVuY3Rpb24gdHJhbnNpdGlvbl9vdXQoYmxvY2ssIGxvY2FsLCBkZXRhY2gsIGNhbGxiYWNrKSB7XG4gICAgaWYgKGJsb2NrICYmIGJsb2NrLm8pIHtcbiAgICAgICAgaWYgKG91dHJvaW5nLmhhcyhibG9jaykpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIG91dHJvaW5nLmFkZChibG9jayk7XG4gICAgICAgIG91dHJvcy5jLnB1c2goKCkgPT4ge1xuICAgICAgICAgICAgb3V0cm9pbmcuZGVsZXRlKGJsb2NrKTtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIGlmIChkZXRhY2gpXG4gICAgICAgICAgICAgICAgICAgIGJsb2NrLmQoMSk7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGJsb2NrLm8obG9jYWwpO1xuICAgIH1cbn1cbmNvbnN0IG51bGxfdHJhbnNpdGlvbiA9IHsgZHVyYXRpb246IDAgfTtcbmZ1bmN0aW9uIGNyZWF0ZV9pbl90cmFuc2l0aW9uKG5vZGUsIGZuLCBwYXJhbXMpIHtcbiAgICBsZXQgY29uZmlnID0gZm4obm9kZSwgcGFyYW1zKTtcbiAgICBsZXQgcnVubmluZyA9IGZhbHNlO1xuICAgIGxldCBhbmltYXRpb25fbmFtZTtcbiAgICBsZXQgdGFzaztcbiAgICBsZXQgdWlkID0gMDtcbiAgICBmdW5jdGlvbiBjbGVhbnVwKCkge1xuICAgICAgICBpZiAoYW5pbWF0aW9uX25hbWUpXG4gICAgICAgICAgICBkZWxldGVfcnVsZShub2RlLCBhbmltYXRpb25fbmFtZSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdvKCkge1xuICAgICAgICBjb25zdCB7IGRlbGF5ID0gMCwgZHVyYXRpb24gPSAzMDAsIGVhc2luZyA9IGlkZW50aXR5LCB0aWNrID0gbm9vcCwgY3NzIH0gPSBjb25maWcgfHwgbnVsbF90cmFuc2l0aW9uO1xuICAgICAgICBpZiAoY3NzKVxuICAgICAgICAgICAgYW5pbWF0aW9uX25hbWUgPSBjcmVhdGVfcnVsZShub2RlLCAwLCAxLCBkdXJhdGlvbiwgZGVsYXksIGVhc2luZywgY3NzLCB1aWQrKyk7XG4gICAgICAgIHRpY2soMCwgMSk7XG4gICAgICAgIGNvbnN0IHN0YXJ0X3RpbWUgPSBub3coKSArIGRlbGF5O1xuICAgICAgICBjb25zdCBlbmRfdGltZSA9IHN0YXJ0X3RpbWUgKyBkdXJhdGlvbjtcbiAgICAgICAgaWYgKHRhc2spXG4gICAgICAgICAgICB0YXNrLmFib3J0KCk7XG4gICAgICAgIHJ1bm5pbmcgPSB0cnVlO1xuICAgICAgICBhZGRfcmVuZGVyX2NhbGxiYWNrKCgpID0+IGRpc3BhdGNoKG5vZGUsIHRydWUsICdzdGFydCcpKTtcbiAgICAgICAgdGFzayA9IGxvb3Aobm93ID0+IHtcbiAgICAgICAgICAgIGlmIChydW5uaW5nKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5vdyA+PSBlbmRfdGltZSkge1xuICAgICAgICAgICAgICAgICAgICB0aWNrKDEsIDApO1xuICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaChub2RlLCB0cnVlLCAnZW5kJyk7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFudXAoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG5vdyA+PSBzdGFydF90aW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHQgPSBlYXNpbmcoKG5vdyAtIHN0YXJ0X3RpbWUpIC8gZHVyYXRpb24pO1xuICAgICAgICAgICAgICAgICAgICB0aWNrKHQsIDEgLSB0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcnVubmluZztcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGxldCBzdGFydGVkID0gZmFsc2U7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3RhcnQoKSB7XG4gICAgICAgICAgICBpZiAoc3RhcnRlZClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBzdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGRlbGV0ZV9ydWxlKG5vZGUpO1xuICAgICAgICAgICAgaWYgKGlzX2Z1bmN0aW9uKGNvbmZpZykpIHtcbiAgICAgICAgICAgICAgICBjb25maWcgPSBjb25maWcoKTtcbiAgICAgICAgICAgICAgICB3YWl0KCkudGhlbihnbyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBnbygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBpbnZhbGlkYXRlKCkge1xuICAgICAgICAgICAgc3RhcnRlZCA9IGZhbHNlO1xuICAgICAgICB9LFxuICAgICAgICBlbmQoKSB7XG4gICAgICAgICAgICBpZiAocnVubmluZykge1xuICAgICAgICAgICAgICAgIGNsZWFudXAoKTtcbiAgICAgICAgICAgICAgICBydW5uaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufVxuZnVuY3Rpb24gY3JlYXRlX291dF90cmFuc2l0aW9uKG5vZGUsIGZuLCBwYXJhbXMpIHtcbiAgICBsZXQgY29uZmlnID0gZm4obm9kZSwgcGFyYW1zKTtcbiAgICBsZXQgcnVubmluZyA9IHRydWU7XG4gICAgbGV0IGFuaW1hdGlvbl9uYW1lO1xuICAgIGNvbnN0IGdyb3VwID0gb3V0cm9zO1xuICAgIGdyb3VwLnIgKz0gMTtcbiAgICBmdW5jdGlvbiBnbygpIHtcbiAgICAgICAgY29uc3QgeyBkZWxheSA9IDAsIGR1cmF0aW9uID0gMzAwLCBlYXNpbmcgPSBpZGVudGl0eSwgdGljayA9IG5vb3AsIGNzcyB9ID0gY29uZmlnIHx8IG51bGxfdHJhbnNpdGlvbjtcbiAgICAgICAgaWYgKGNzcylcbiAgICAgICAgICAgIGFuaW1hdGlvbl9uYW1lID0gY3JlYXRlX3J1bGUobm9kZSwgMSwgMCwgZHVyYXRpb24sIGRlbGF5LCBlYXNpbmcsIGNzcyk7XG4gICAgICAgIGNvbnN0IHN0YXJ0X3RpbWUgPSBub3coKSArIGRlbGF5O1xuICAgICAgICBjb25zdCBlbmRfdGltZSA9IHN0YXJ0X3RpbWUgKyBkdXJhdGlvbjtcbiAgICAgICAgYWRkX3JlbmRlcl9jYWxsYmFjaygoKSA9PiBkaXNwYXRjaChub2RlLCBmYWxzZSwgJ3N0YXJ0JykpO1xuICAgICAgICBsb29wKG5vdyA9PiB7XG4gICAgICAgICAgICBpZiAocnVubmluZykge1xuICAgICAgICAgICAgICAgIGlmIChub3cgPj0gZW5kX3RpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGljaygwLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2gobm9kZSwgZmFsc2UsICdlbmQnKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEtLWdyb3VwLnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMgd2lsbCByZXN1bHQgaW4gYGVuZCgpYCBiZWluZyBjYWxsZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzbyB3ZSBkb24ndCBuZWVkIHRvIGNsZWFuIHVwIGhlcmVcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bl9hbGwoZ3JvdXAuYyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobm93ID49IHN0YXJ0X3RpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdCA9IGVhc2luZygobm93IC0gc3RhcnRfdGltZSkgLyBkdXJhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIHRpY2soMSAtIHQsIHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBydW5uaW5nO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgaWYgKGlzX2Z1bmN0aW9uKGNvbmZpZykpIHtcbiAgICAgICAgd2FpdCgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgY29uZmlnID0gY29uZmlnKCk7XG4gICAgICAgICAgICBnbygpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGdvKCk7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIGVuZChyZXNldCkge1xuICAgICAgICAgICAgaWYgKHJlc2V0ICYmIGNvbmZpZy50aWNrKSB7XG4gICAgICAgICAgICAgICAgY29uZmlnLnRpY2soMSwgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocnVubmluZykge1xuICAgICAgICAgICAgICAgIGlmIChhbmltYXRpb25fbmFtZSlcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlX3J1bGUobm9kZSwgYW5pbWF0aW9uX25hbWUpO1xuICAgICAgICAgICAgICAgIHJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG59XG5mdW5jdGlvbiBjcmVhdGVfYmlkaXJlY3Rpb25hbF90cmFuc2l0aW9uKG5vZGUsIGZuLCBwYXJhbXMsIGludHJvKSB7XG4gICAgbGV0IGNvbmZpZyA9IGZuKG5vZGUsIHBhcmFtcyk7XG4gICAgbGV0IHQgPSBpbnRybyA/IDAgOiAxO1xuICAgIGxldCBydW5uaW5nX3Byb2dyYW0gPSBudWxsO1xuICAgIGxldCBwZW5kaW5nX3Byb2dyYW0gPSBudWxsO1xuICAgIGxldCBhbmltYXRpb25fbmFtZSA9IG51bGw7XG4gICAgZnVuY3Rpb24gY2xlYXJfYW5pbWF0aW9uKCkge1xuICAgICAgICBpZiAoYW5pbWF0aW9uX25hbWUpXG4gICAgICAgICAgICBkZWxldGVfcnVsZShub2RlLCBhbmltYXRpb25fbmFtZSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGluaXQocHJvZ3JhbSwgZHVyYXRpb24pIHtcbiAgICAgICAgY29uc3QgZCA9IChwcm9ncmFtLmIgLSB0KTtcbiAgICAgICAgZHVyYXRpb24gKj0gTWF0aC5hYnMoZCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhOiB0LFxuICAgICAgICAgICAgYjogcHJvZ3JhbS5iLFxuICAgICAgICAgICAgZCxcbiAgICAgICAgICAgIGR1cmF0aW9uLFxuICAgICAgICAgICAgc3RhcnQ6IHByb2dyYW0uc3RhcnQsXG4gICAgICAgICAgICBlbmQ6IHByb2dyYW0uc3RhcnQgKyBkdXJhdGlvbixcbiAgICAgICAgICAgIGdyb3VwOiBwcm9ncmFtLmdyb3VwXG4gICAgICAgIH07XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdvKGIpIHtcbiAgICAgICAgY29uc3QgeyBkZWxheSA9IDAsIGR1cmF0aW9uID0gMzAwLCBlYXNpbmcgPSBpZGVudGl0eSwgdGljayA9IG5vb3AsIGNzcyB9ID0gY29uZmlnIHx8IG51bGxfdHJhbnNpdGlvbjtcbiAgICAgICAgY29uc3QgcHJvZ3JhbSA9IHtcbiAgICAgICAgICAgIHN0YXJ0OiBub3coKSArIGRlbGF5LFxuICAgICAgICAgICAgYlxuICAgICAgICB9O1xuICAgICAgICBpZiAoIWIpIHtcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgdG9kbzogaW1wcm92ZSB0eXBpbmdzXG4gICAgICAgICAgICBwcm9ncmFtLmdyb3VwID0gb3V0cm9zO1xuICAgICAgICAgICAgb3V0cm9zLnIgKz0gMTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocnVubmluZ19wcm9ncmFtIHx8IHBlbmRpbmdfcHJvZ3JhbSkge1xuICAgICAgICAgICAgcGVuZGluZ19wcm9ncmFtID0gcHJvZ3JhbTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIGlmIHRoaXMgaXMgYW4gaW50cm8sIGFuZCB0aGVyZSdzIGEgZGVsYXksIHdlIG5lZWQgdG8gZG9cbiAgICAgICAgICAgIC8vIGFuIGluaXRpYWwgdGljayBhbmQvb3IgYXBwbHkgQ1NTIGFuaW1hdGlvbiBpbW1lZGlhdGVseVxuICAgICAgICAgICAgaWYgKGNzcykge1xuICAgICAgICAgICAgICAgIGNsZWFyX2FuaW1hdGlvbigpO1xuICAgICAgICAgICAgICAgIGFuaW1hdGlvbl9uYW1lID0gY3JlYXRlX3J1bGUobm9kZSwgdCwgYiwgZHVyYXRpb24sIGRlbGF5LCBlYXNpbmcsIGNzcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYilcbiAgICAgICAgICAgICAgICB0aWNrKDAsIDEpO1xuICAgICAgICAgICAgcnVubmluZ19wcm9ncmFtID0gaW5pdChwcm9ncmFtLCBkdXJhdGlvbik7XG4gICAgICAgICAgICBhZGRfcmVuZGVyX2NhbGxiYWNrKCgpID0+IGRpc3BhdGNoKG5vZGUsIGIsICdzdGFydCcpKTtcbiAgICAgICAgICAgIGxvb3Aobm93ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocGVuZGluZ19wcm9ncmFtICYmIG5vdyA+IHBlbmRpbmdfcHJvZ3JhbS5zdGFydCkge1xuICAgICAgICAgICAgICAgICAgICBydW5uaW5nX3Byb2dyYW0gPSBpbml0KHBlbmRpbmdfcHJvZ3JhbSwgZHVyYXRpb24pO1xuICAgICAgICAgICAgICAgICAgICBwZW5kaW5nX3Byb2dyYW0gPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaChub2RlLCBydW5uaW5nX3Byb2dyYW0uYiwgJ3N0YXJ0Jyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyX2FuaW1hdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uX25hbWUgPSBjcmVhdGVfcnVsZShub2RlLCB0LCBydW5uaW5nX3Byb2dyYW0uYiwgcnVubmluZ19wcm9ncmFtLmR1cmF0aW9uLCAwLCBlYXNpbmcsIGNvbmZpZy5jc3MpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChydW5uaW5nX3Byb2dyYW0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vdyA+PSBydW5uaW5nX3Byb2dyYW0uZW5kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aWNrKHQgPSBydW5uaW5nX3Byb2dyYW0uYiwgMSAtIHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2gobm9kZSwgcnVubmluZ19wcm9ncmFtLmIsICdlbmQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcGVuZGluZ19wcm9ncmFtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gd2UncmUgZG9uZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChydW5uaW5nX3Byb2dyYW0uYikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpbnRybyBcdTIwMTQgd2UgY2FuIHRpZHkgdXAgaW1tZWRpYXRlbHlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJfYW5pbWF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBvdXRybyBcdTIwMTQgbmVlZHMgdG8gYmUgY29vcmRpbmF0ZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEtLXJ1bm5pbmdfcHJvZ3JhbS5ncm91cC5yKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVuX2FsbChydW5uaW5nX3Byb2dyYW0uZ3JvdXAuYyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcnVubmluZ19wcm9ncmFtID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChub3cgPj0gcnVubmluZ19wcm9ncmFtLnN0YXJ0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwID0gbm93IC0gcnVubmluZ19wcm9ncmFtLnN0YXJ0O1xuICAgICAgICAgICAgICAgICAgICAgICAgdCA9IHJ1bm5pbmdfcHJvZ3JhbS5hICsgcnVubmluZ19wcm9ncmFtLmQgKiBlYXNpbmcocCAvIHJ1bm5pbmdfcHJvZ3JhbS5kdXJhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aWNrKHQsIDEgLSB0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gISEocnVubmluZ19wcm9ncmFtIHx8IHBlbmRpbmdfcHJvZ3JhbSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBydW4oYikge1xuICAgICAgICAgICAgaWYgKGlzX2Z1bmN0aW9uKGNvbmZpZykpIHtcbiAgICAgICAgICAgICAgICB3YWl0KCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnID0gY29uZmlnKCk7XG4gICAgICAgICAgICAgICAgICAgIGdvKGIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZ28oYik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGVuZCgpIHtcbiAgICAgICAgICAgIGNsZWFyX2FuaW1hdGlvbigpO1xuICAgICAgICAgICAgcnVubmluZ19wcm9ncmFtID0gcGVuZGluZ19wcm9ncmFtID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH07XG59XG5cbmZ1bmN0aW9uIGhhbmRsZV9wcm9taXNlKHByb21pc2UsIGluZm8pIHtcbiAgICBjb25zdCB0b2tlbiA9IGluZm8udG9rZW4gPSB7fTtcbiAgICBmdW5jdGlvbiB1cGRhdGUodHlwZSwgaW5kZXgsIGtleSwgdmFsdWUpIHtcbiAgICAgICAgaWYgKGluZm8udG9rZW4gIT09IHRva2VuKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBpbmZvLnJlc29sdmVkID0gdmFsdWU7XG4gICAgICAgIGxldCBjaGlsZF9jdHggPSBpbmZvLmN0eDtcbiAgICAgICAgaWYgKGtleSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjaGlsZF9jdHggPSBjaGlsZF9jdHguc2xpY2UoKTtcbiAgICAgICAgICAgIGNoaWxkX2N0eFtrZXldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYmxvY2sgPSB0eXBlICYmIChpbmZvLmN1cnJlbnQgPSB0eXBlKShjaGlsZF9jdHgpO1xuICAgICAgICBsZXQgbmVlZHNfZmx1c2ggPSBmYWxzZTtcbiAgICAgICAgaWYgKGluZm8uYmxvY2spIHtcbiAgICAgICAgICAgIGlmIChpbmZvLmJsb2Nrcykge1xuICAgICAgICAgICAgICAgIGluZm8uYmxvY2tzLmZvckVhY2goKGJsb2NrLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpICE9PSBpbmRleCAmJiBibG9jaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBfb3V0cm9zKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uX291dChibG9jaywgMSwgMSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmZvLmJsb2Nrc1tpXSA9PT0gYmxvY2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5mby5ibG9ja3NbaV0gPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tfb3V0cm9zKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGluZm8uYmxvY2suZCgxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJsb2NrLmMoKTtcbiAgICAgICAgICAgIHRyYW5zaXRpb25faW4oYmxvY2ssIDEpO1xuICAgICAgICAgICAgYmxvY2subShpbmZvLm1vdW50KCksIGluZm8uYW5jaG9yKTtcbiAgICAgICAgICAgIG5lZWRzX2ZsdXNoID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpbmZvLmJsb2NrID0gYmxvY2s7XG4gICAgICAgIGlmIChpbmZvLmJsb2NrcylcbiAgICAgICAgICAgIGluZm8uYmxvY2tzW2luZGV4XSA9IGJsb2NrO1xuICAgICAgICBpZiAobmVlZHNfZmx1c2gpIHtcbiAgICAgICAgICAgIGZsdXNoKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGlzX3Byb21pc2UocHJvbWlzZSkpIHtcbiAgICAgICAgY29uc3QgY3VycmVudF9jb21wb25lbnQgPSBnZXRfY3VycmVudF9jb21wb25lbnQoKTtcbiAgICAgICAgcHJvbWlzZS50aGVuKHZhbHVlID0+IHtcbiAgICAgICAgICAgIHNldF9jdXJyZW50X2NvbXBvbmVudChjdXJyZW50X2NvbXBvbmVudCk7XG4gICAgICAgICAgICB1cGRhdGUoaW5mby50aGVuLCAxLCBpbmZvLnZhbHVlLCB2YWx1ZSk7XG4gICAgICAgICAgICBzZXRfY3VycmVudF9jb21wb25lbnQobnVsbCk7XG4gICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgIHNldF9jdXJyZW50X2NvbXBvbmVudChjdXJyZW50X2NvbXBvbmVudCk7XG4gICAgICAgICAgICB1cGRhdGUoaW5mby5jYXRjaCwgMiwgaW5mby5lcnJvciwgZXJyb3IpO1xuICAgICAgICAgICAgc2V0X2N1cnJlbnRfY29tcG9uZW50KG51bGwpO1xuICAgICAgICAgICAgaWYgKCFpbmZvLmhhc0NhdGNoKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBpZiB3ZSBwcmV2aW91c2x5IGhhZCBhIHRoZW4vY2F0Y2ggYmxvY2ssIGRlc3Ryb3kgaXRcbiAgICAgICAgaWYgKGluZm8uY3VycmVudCAhPT0gaW5mby5wZW5kaW5nKSB7XG4gICAgICAgICAgICB1cGRhdGUoaW5mby5wZW5kaW5nLCAwKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBpZiAoaW5mby5jdXJyZW50ICE9PSBpbmZvLnRoZW4pIHtcbiAgICAgICAgICAgIHVwZGF0ZShpbmZvLnRoZW4sIDEsIGluZm8udmFsdWUsIHByb21pc2UpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaW5mby5yZXNvbHZlZCA9IHByb21pc2U7XG4gICAgfVxufVxuZnVuY3Rpb24gdXBkYXRlX2F3YWl0X2Jsb2NrX2JyYW5jaChpbmZvLCBjdHgsIGRpcnR5KSB7XG4gICAgY29uc3QgY2hpbGRfY3R4ID0gY3R4LnNsaWNlKCk7XG4gICAgY29uc3QgeyByZXNvbHZlZCB9ID0gaW5mbztcbiAgICBpZiAoaW5mby5jdXJyZW50ID09PSBpbmZvLnRoZW4pIHtcbiAgICAgICAgY2hpbGRfY3R4W2luZm8udmFsdWVdID0gcmVzb2x2ZWQ7XG4gICAgfVxuICAgIGlmIChpbmZvLmN1cnJlbnQgPT09IGluZm8uY2F0Y2gpIHtcbiAgICAgICAgY2hpbGRfY3R4W2luZm8uZXJyb3JdID0gcmVzb2x2ZWQ7XG4gICAgfVxuICAgIGluZm8uYmxvY2sucChjaGlsZF9jdHgsIGRpcnR5KTtcbn1cblxuY29uc3QgZ2xvYmFscyA9ICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xuICAgID8gd2luZG93XG4gICAgOiB0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gJ3VuZGVmaW5lZCdcbiAgICAgICAgPyBnbG9iYWxUaGlzXG4gICAgICAgIDogZ2xvYmFsKTtcblxuZnVuY3Rpb24gZGVzdHJveV9ibG9jayhibG9jaywgbG9va3VwKSB7XG4gICAgYmxvY2suZCgxKTtcbiAgICBsb29rdXAuZGVsZXRlKGJsb2NrLmtleSk7XG59XG5mdW5jdGlvbiBvdXRyb19hbmRfZGVzdHJveV9ibG9jayhibG9jaywgbG9va3VwKSB7XG4gICAgdHJhbnNpdGlvbl9vdXQoYmxvY2ssIDEsIDEsICgpID0+IHtcbiAgICAgICAgbG9va3VwLmRlbGV0ZShibG9jay5rZXkpO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gZml4X2FuZF9kZXN0cm95X2Jsb2NrKGJsb2NrLCBsb29rdXApIHtcbiAgICBibG9jay5mKCk7XG4gICAgZGVzdHJveV9ibG9jayhibG9jaywgbG9va3VwKTtcbn1cbmZ1bmN0aW9uIGZpeF9hbmRfb3V0cm9fYW5kX2Rlc3Ryb3lfYmxvY2soYmxvY2ssIGxvb2t1cCkge1xuICAgIGJsb2NrLmYoKTtcbiAgICBvdXRyb19hbmRfZGVzdHJveV9ibG9jayhibG9jaywgbG9va3VwKTtcbn1cbmZ1bmN0aW9uIHVwZGF0ZV9rZXllZF9lYWNoKG9sZF9ibG9ja3MsIGRpcnR5LCBnZXRfa2V5LCBkeW5hbWljLCBjdHgsIGxpc3QsIGxvb2t1cCwgbm9kZSwgZGVzdHJveSwgY3JlYXRlX2VhY2hfYmxvY2ssIG5leHQsIGdldF9jb250ZXh0KSB7XG4gICAgbGV0IG8gPSBvbGRfYmxvY2tzLmxlbmd0aDtcbiAgICBsZXQgbiA9IGxpc3QubGVuZ3RoO1xuICAgIGxldCBpID0gbztcbiAgICBjb25zdCBvbGRfaW5kZXhlcyA9IHt9O1xuICAgIHdoaWxlIChpLS0pXG4gICAgICAgIG9sZF9pbmRleGVzW29sZF9ibG9ja3NbaV0ua2V5XSA9IGk7XG4gICAgY29uc3QgbmV3X2Jsb2NrcyA9IFtdO1xuICAgIGNvbnN0IG5ld19sb29rdXAgPSBuZXcgTWFwKCk7XG4gICAgY29uc3QgZGVsdGFzID0gbmV3IE1hcCgpO1xuICAgIGkgPSBuO1xuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgY29uc3QgY2hpbGRfY3R4ID0gZ2V0X2NvbnRleHQoY3R4LCBsaXN0LCBpKTtcbiAgICAgICAgY29uc3Qga2V5ID0gZ2V0X2tleShjaGlsZF9jdHgpO1xuICAgICAgICBsZXQgYmxvY2sgPSBsb29rdXAuZ2V0KGtleSk7XG4gICAgICAgIGlmICghYmxvY2spIHtcbiAgICAgICAgICAgIGJsb2NrID0gY3JlYXRlX2VhY2hfYmxvY2soa2V5LCBjaGlsZF9jdHgpO1xuICAgICAgICAgICAgYmxvY2suYygpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGR5bmFtaWMpIHtcbiAgICAgICAgICAgIGJsb2NrLnAoY2hpbGRfY3R4LCBkaXJ0eSk7XG4gICAgICAgIH1cbiAgICAgICAgbmV3X2xvb2t1cC5zZXQoa2V5LCBuZXdfYmxvY2tzW2ldID0gYmxvY2spO1xuICAgICAgICBpZiAoa2V5IGluIG9sZF9pbmRleGVzKVxuICAgICAgICAgICAgZGVsdGFzLnNldChrZXksIE1hdGguYWJzKGkgLSBvbGRfaW5kZXhlc1trZXldKSk7XG4gICAgfVxuICAgIGNvbnN0IHdpbGxfbW92ZSA9IG5ldyBTZXQoKTtcbiAgICBjb25zdCBkaWRfbW92ZSA9IG5ldyBTZXQoKTtcbiAgICBmdW5jdGlvbiBpbnNlcnQoYmxvY2spIHtcbiAgICAgICAgdHJhbnNpdGlvbl9pbihibG9jaywgMSk7XG4gICAgICAgIGJsb2NrLm0obm9kZSwgbmV4dCk7XG4gICAgICAgIGxvb2t1cC5zZXQoYmxvY2sua2V5LCBibG9jayk7XG4gICAgICAgIG5leHQgPSBibG9jay5maXJzdDtcbiAgICAgICAgbi0tO1xuICAgIH1cbiAgICB3aGlsZSAobyAmJiBuKSB7XG4gICAgICAgIGNvbnN0IG5ld19ibG9jayA9IG5ld19ibG9ja3NbbiAtIDFdO1xuICAgICAgICBjb25zdCBvbGRfYmxvY2sgPSBvbGRfYmxvY2tzW28gLSAxXTtcbiAgICAgICAgY29uc3QgbmV3X2tleSA9IG5ld19ibG9jay5rZXk7XG4gICAgICAgIGNvbnN0IG9sZF9rZXkgPSBvbGRfYmxvY2sua2V5O1xuICAgICAgICBpZiAobmV3X2Jsb2NrID09PSBvbGRfYmxvY2spIHtcbiAgICAgICAgICAgIC8vIGRvIG5vdGhpbmdcbiAgICAgICAgICAgIG5leHQgPSBuZXdfYmxvY2suZmlyc3Q7XG4gICAgICAgICAgICBvLS07XG4gICAgICAgICAgICBuLS07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIW5ld19sb29rdXAuaGFzKG9sZF9rZXkpKSB7XG4gICAgICAgICAgICAvLyByZW1vdmUgb2xkIGJsb2NrXG4gICAgICAgICAgICBkZXN0cm95KG9sZF9ibG9jaywgbG9va3VwKTtcbiAgICAgICAgICAgIG8tLTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICghbG9va3VwLmhhcyhuZXdfa2V5KSB8fCB3aWxsX21vdmUuaGFzKG5ld19rZXkpKSB7XG4gICAgICAgICAgICBpbnNlcnQobmV3X2Jsb2NrKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChkaWRfbW92ZS5oYXMob2xkX2tleSkpIHtcbiAgICAgICAgICAgIG8tLTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChkZWx0YXMuZ2V0KG5ld19rZXkpID4gZGVsdGFzLmdldChvbGRfa2V5KSkge1xuICAgICAgICAgICAgZGlkX21vdmUuYWRkKG5ld19rZXkpO1xuICAgICAgICAgICAgaW5zZXJ0KG5ld19ibG9jayk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB3aWxsX21vdmUuYWRkKG9sZF9rZXkpO1xuICAgICAgICAgICAgby0tO1xuICAgICAgICB9XG4gICAgfVxuICAgIHdoaWxlIChvLS0pIHtcbiAgICAgICAgY29uc3Qgb2xkX2Jsb2NrID0gb2xkX2Jsb2Nrc1tvXTtcbiAgICAgICAgaWYgKCFuZXdfbG9va3VwLmhhcyhvbGRfYmxvY2sua2V5KSlcbiAgICAgICAgICAgIGRlc3Ryb3kob2xkX2Jsb2NrLCBsb29rdXApO1xuICAgIH1cbiAgICB3aGlsZSAobilcbiAgICAgICAgaW5zZXJ0KG5ld19ibG9ja3NbbiAtIDFdKTtcbiAgICByZXR1cm4gbmV3X2Jsb2Nrcztcbn1cbmZ1bmN0aW9uIHZhbGlkYXRlX2VhY2hfa2V5cyhjdHgsIGxpc3QsIGdldF9jb250ZXh0LCBnZXRfa2V5KSB7XG4gICAgY29uc3Qga2V5cyA9IG5ldyBTZXQoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qga2V5ID0gZ2V0X2tleShnZXRfY29udGV4dChjdHgsIGxpc3QsIGkpKTtcbiAgICAgICAgaWYgKGtleXMuaGFzKGtleSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGhhdmUgZHVwbGljYXRlIGtleXMgaW4gYSBrZXllZCBlYWNoJyk7XG4gICAgICAgIH1cbiAgICAgICAga2V5cy5hZGQoa2V5KTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGdldF9zcHJlYWRfdXBkYXRlKGxldmVscywgdXBkYXRlcykge1xuICAgIGNvbnN0IHVwZGF0ZSA9IHt9O1xuICAgIGNvbnN0IHRvX251bGxfb3V0ID0ge307XG4gICAgY29uc3QgYWNjb3VudGVkX2ZvciA9IHsgJCRzY29wZTogMSB9O1xuICAgIGxldCBpID0gbGV2ZWxzLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIGNvbnN0IG8gPSBsZXZlbHNbaV07XG4gICAgICAgIGNvbnN0IG4gPSB1cGRhdGVzW2ldO1xuICAgICAgICBpZiAobikge1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gbykge1xuICAgICAgICAgICAgICAgIGlmICghKGtleSBpbiBuKSlcbiAgICAgICAgICAgICAgICAgICAgdG9fbnVsbF9vdXRba2V5XSA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBuKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFhY2NvdW50ZWRfZm9yW2tleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlW2tleV0gPSBuW2tleV07XG4gICAgICAgICAgICAgICAgICAgIGFjY291bnRlZF9mb3Jba2V5XSA9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV2ZWxzW2ldID0gbjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIG8pIHtcbiAgICAgICAgICAgICAgICBhY2NvdW50ZWRfZm9yW2tleV0gPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGZvciAoY29uc3Qga2V5IGluIHRvX251bGxfb3V0KSB7XG4gICAgICAgIGlmICghKGtleSBpbiB1cGRhdGUpKVxuICAgICAgICAgICAgdXBkYXRlW2tleV0gPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHJldHVybiB1cGRhdGU7XG59XG5mdW5jdGlvbiBnZXRfc3ByZWFkX29iamVjdChzcHJlYWRfcHJvcHMpIHtcbiAgICByZXR1cm4gdHlwZW9mIHNwcmVhZF9wcm9wcyA9PT0gJ29iamVjdCcgJiYgc3ByZWFkX3Byb3BzICE9PSBudWxsID8gc3ByZWFkX3Byb3BzIDoge307XG59XG5cbi8vIHNvdXJjZTogaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2UvaW5kaWNlcy5odG1sXG5jb25zdCBib29sZWFuX2F0dHJpYnV0ZXMgPSBuZXcgU2V0KFtcbiAgICAnYWxsb3dmdWxsc2NyZWVuJyxcbiAgICAnYWxsb3dwYXltZW50cmVxdWVzdCcsXG4gICAgJ2FzeW5jJyxcbiAgICAnYXV0b2ZvY3VzJyxcbiAgICAnYXV0b3BsYXknLFxuICAgICdjaGVja2VkJyxcbiAgICAnY29udHJvbHMnLFxuICAgICdkZWZhdWx0JyxcbiAgICAnZGVmZXInLFxuICAgICdkaXNhYmxlZCcsXG4gICAgJ2Zvcm1ub3ZhbGlkYXRlJyxcbiAgICAnaGlkZGVuJyxcbiAgICAnaXNtYXAnLFxuICAgICdsb29wJyxcbiAgICAnbXVsdGlwbGUnLFxuICAgICdtdXRlZCcsXG4gICAgJ25vbW9kdWxlJyxcbiAgICAnbm92YWxpZGF0ZScsXG4gICAgJ29wZW4nLFxuICAgICdwbGF5c2lubGluZScsXG4gICAgJ3JlYWRvbmx5JyxcbiAgICAncmVxdWlyZWQnLFxuICAgICdyZXZlcnNlZCcsXG4gICAgJ3NlbGVjdGVkJ1xuXSk7XG5cbmNvbnN0IGludmFsaWRfYXR0cmlidXRlX25hbWVfY2hhcmFjdGVyID0gL1tcXHMnXCI+Lz1cXHV7RkREMH0tXFx1e0ZERUZ9XFx1e0ZGRkV9XFx1e0ZGRkZ9XFx1ezFGRkZFfVxcdXsxRkZGRn1cXHV7MkZGRkV9XFx1ezJGRkZGfVxcdXszRkZGRX1cXHV7M0ZGRkZ9XFx1ezRGRkZFfVxcdXs0RkZGRn1cXHV7NUZGRkV9XFx1ezVGRkZGfVxcdXs2RkZGRX1cXHV7NkZGRkZ9XFx1ezdGRkZFfVxcdXs3RkZGRn1cXHV7OEZGRkV9XFx1ezhGRkZGfVxcdXs5RkZGRX1cXHV7OUZGRkZ9XFx1e0FGRkZFfVxcdXtBRkZGRn1cXHV7QkZGRkV9XFx1e0JGRkZGfVxcdXtDRkZGRX1cXHV7Q0ZGRkZ9XFx1e0RGRkZFfVxcdXtERkZGRn1cXHV7RUZGRkV9XFx1e0VGRkZGfVxcdXtGRkZGRX1cXHV7RkZGRkZ9XFx1ezEwRkZGRX1cXHV7MTBGRkZGfV0vdTtcbi8vIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL3N5bnRheC5odG1sI2F0dHJpYnV0ZXMtMlxuLy8gaHR0cHM6Ly9pbmZyYS5zcGVjLndoYXR3Zy5vcmcvI25vbmNoYXJhY3RlclxuZnVuY3Rpb24gc3ByZWFkKGFyZ3MsIGF0dHJzX3RvX2FkZCkge1xuICAgIGNvbnN0IGF0dHJpYnV0ZXMgPSBPYmplY3QuYXNzaWduKHt9LCAuLi5hcmdzKTtcbiAgICBpZiAoYXR0cnNfdG9fYWRkKSB7XG4gICAgICAgIGNvbnN0IGNsYXNzZXNfdG9fYWRkID0gYXR0cnNfdG9fYWRkLmNsYXNzZXM7XG4gICAgICAgIGNvbnN0IHN0eWxlc190b19hZGQgPSBhdHRyc190b19hZGQuc3R5bGVzO1xuICAgICAgICBpZiAoY2xhc3Nlc190b19hZGQpIHtcbiAgICAgICAgICAgIGlmIChhdHRyaWJ1dGVzLmNsYXNzID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzLmNsYXNzID0gY2xhc3Nlc190b19hZGQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzLmNsYXNzICs9ICcgJyArIGNsYXNzZXNfdG9fYWRkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChzdHlsZXNfdG9fYWRkKSB7XG4gICAgICAgICAgICBpZiAoYXR0cmlidXRlcy5zdHlsZSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgYXR0cmlidXRlcy5zdHlsZSA9IHN0eWxlX29iamVjdF90b19zdHJpbmcoc3R5bGVzX3RvX2FkZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzLnN0eWxlID0gc3R5bGVfb2JqZWN0X3RvX3N0cmluZyhtZXJnZV9zc3Jfc3R5bGVzKGF0dHJpYnV0ZXMuc3R5bGUsIHN0eWxlc190b19hZGQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBsZXQgc3RyID0gJyc7XG4gICAgT2JqZWN0LmtleXMoYXR0cmlidXRlcykuZm9yRWFjaChuYW1lID0+IHtcbiAgICAgICAgaWYgKGludmFsaWRfYXR0cmlidXRlX25hbWVfY2hhcmFjdGVyLnRlc3QobmFtZSkpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNvbnN0IHZhbHVlID0gYXR0cmlidXRlc1tuYW1lXTtcbiAgICAgICAgaWYgKHZhbHVlID09PSB0cnVlKVxuICAgICAgICAgICAgc3RyICs9ICcgJyArIG5hbWU7XG4gICAgICAgIGVsc2UgaWYgKGJvb2xlYW5fYXR0cmlidXRlcy5oYXMobmFtZS50b0xvd2VyQ2FzZSgpKSkge1xuICAgICAgICAgICAgaWYgKHZhbHVlKVxuICAgICAgICAgICAgICAgIHN0ciArPSAnICcgKyBuYW1lO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgICAgIHN0ciArPSBgICR7bmFtZX09XCIke3ZhbHVlfVwiYDtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBzdHI7XG59XG5mdW5jdGlvbiBtZXJnZV9zc3Jfc3R5bGVzKHN0eWxlX2F0dHJpYnV0ZSwgc3R5bGVfZGlyZWN0aXZlKSB7XG4gICAgY29uc3Qgc3R5bGVfb2JqZWN0ID0ge307XG4gICAgZm9yIChjb25zdCBpbmRpdmlkdWFsX3N0eWxlIG9mIHN0eWxlX2F0dHJpYnV0ZS5zcGxpdCgnOycpKSB7XG4gICAgICAgIGNvbnN0IGNvbG9uX2luZGV4ID0gaW5kaXZpZHVhbF9zdHlsZS5pbmRleE9mKCc6Jyk7XG4gICAgICAgIGNvbnN0IG5hbWUgPSBpbmRpdmlkdWFsX3N0eWxlLnNsaWNlKDAsIGNvbG9uX2luZGV4KS50cmltKCk7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gaW5kaXZpZHVhbF9zdHlsZS5zbGljZShjb2xvbl9pbmRleCArIDEpLnRyaW0oKTtcbiAgICAgICAgaWYgKCFuYW1lKVxuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIHN0eWxlX29iamVjdFtuYW1lXSA9IHZhbHVlO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IG5hbWUgaW4gc3R5bGVfZGlyZWN0aXZlKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gc3R5bGVfZGlyZWN0aXZlW25hbWVdO1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHN0eWxlX29iamVjdFtuYW1lXSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZGVsZXRlIHN0eWxlX29iamVjdFtuYW1lXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc3R5bGVfb2JqZWN0O1xufVxuY29uc3QgZXNjYXBlZCA9IHtcbiAgICAnXCInOiAnJnF1b3Q7JyxcbiAgICBcIidcIjogJyYjMzk7JyxcbiAgICAnJic6ICcmYW1wOycsXG4gICAgJzwnOiAnJmx0OycsXG4gICAgJz4nOiAnJmd0Oydcbn07XG5mdW5jdGlvbiBlc2NhcGUoaHRtbCkge1xuICAgIHJldHVybiBTdHJpbmcoaHRtbCkucmVwbGFjZSgvW1wiJyY8Pl0vZywgbWF0Y2ggPT4gZXNjYXBlZFttYXRjaF0pO1xufVxuZnVuY3Rpb24gZXNjYXBlX2F0dHJpYnV0ZV92YWx1ZSh2YWx1ZSkge1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnID8gZXNjYXBlKHZhbHVlKSA6IHZhbHVlO1xufVxuZnVuY3Rpb24gZXNjYXBlX29iamVjdChvYmopIHtcbiAgICBjb25zdCByZXN1bHQgPSB7fTtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBvYmopIHtcbiAgICAgICAgcmVzdWx0W2tleV0gPSBlc2NhcGVfYXR0cmlidXRlX3ZhbHVlKG9ialtrZXldKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIGVhY2goaXRlbXMsIGZuKSB7XG4gICAgbGV0IHN0ciA9ICcnO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgc3RyICs9IGZuKGl0ZW1zW2ldLCBpKTtcbiAgICB9XG4gICAgcmV0dXJuIHN0cjtcbn1cbmNvbnN0IG1pc3NpbmdfY29tcG9uZW50ID0ge1xuICAgICQkcmVuZGVyOiAoKSA9PiAnJ1xufTtcbmZ1bmN0aW9uIHZhbGlkYXRlX2NvbXBvbmVudChjb21wb25lbnQsIG5hbWUpIHtcbiAgICBpZiAoIWNvbXBvbmVudCB8fCAhY29tcG9uZW50LiQkcmVuZGVyKSB7XG4gICAgICAgIGlmIChuYW1lID09PSAnc3ZlbHRlOmNvbXBvbmVudCcpXG4gICAgICAgICAgICBuYW1lICs9ICcgdGhpcz17Li4ufSc7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgPCR7bmFtZX0+IGlzIG5vdCBhIHZhbGlkIFNTUiBjb21wb25lbnQuIFlvdSBtYXkgbmVlZCB0byByZXZpZXcgeW91ciBidWlsZCBjb25maWcgdG8gZW5zdXJlIHRoYXQgZGVwZW5kZW5jaWVzIGFyZSBjb21waWxlZCwgcmF0aGVyIHRoYW4gaW1wb3J0ZWQgYXMgcHJlLWNvbXBpbGVkIG1vZHVsZXNgKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbXBvbmVudDtcbn1cbmZ1bmN0aW9uIGRlYnVnKGZpbGUsIGxpbmUsIGNvbHVtbiwgdmFsdWVzKSB7XG4gICAgY29uc29sZS5sb2coYHtAZGVidWd9ICR7ZmlsZSA/IGZpbGUgKyAnICcgOiAnJ30oJHtsaW5lfToke2NvbHVtbn0pYCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuICAgIGNvbnNvbGUubG9nKHZhbHVlcyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuICAgIHJldHVybiAnJztcbn1cbmxldCBvbl9kZXN0cm95O1xuZnVuY3Rpb24gY3JlYXRlX3Nzcl9jb21wb25lbnQoZm4pIHtcbiAgICBmdW5jdGlvbiAkJHJlbmRlcihyZXN1bHQsIHByb3BzLCBiaW5kaW5ncywgc2xvdHMsIGNvbnRleHQpIHtcbiAgICAgICAgY29uc3QgcGFyZW50X2NvbXBvbmVudCA9IGN1cnJlbnRfY29tcG9uZW50O1xuICAgICAgICBjb25zdCAkJCA9IHtcbiAgICAgICAgICAgIG9uX2Rlc3Ryb3ksXG4gICAgICAgICAgICBjb250ZXh0OiBuZXcgTWFwKGNvbnRleHQgfHwgKHBhcmVudF9jb21wb25lbnQgPyBwYXJlbnRfY29tcG9uZW50LiQkLmNvbnRleHQgOiBbXSkpLFxuICAgICAgICAgICAgLy8gdGhlc2Ugd2lsbCBiZSBpbW1lZGlhdGVseSBkaXNjYXJkZWRcbiAgICAgICAgICAgIG9uX21vdW50OiBbXSxcbiAgICAgICAgICAgIGJlZm9yZV91cGRhdGU6IFtdLFxuICAgICAgICAgICAgYWZ0ZXJfdXBkYXRlOiBbXSxcbiAgICAgICAgICAgIGNhbGxiYWNrczogYmxhbmtfb2JqZWN0KClcbiAgICAgICAgfTtcbiAgICAgICAgc2V0X2N1cnJlbnRfY29tcG9uZW50KHsgJCQgfSk7XG4gICAgICAgIGNvbnN0IGh0bWwgPSBmbihyZXN1bHQsIHByb3BzLCBiaW5kaW5ncywgc2xvdHMpO1xuICAgICAgICBzZXRfY3VycmVudF9jb21wb25lbnQocGFyZW50X2NvbXBvbmVudCk7XG4gICAgICAgIHJldHVybiBodG1sO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICByZW5kZXI6IChwcm9wcyA9IHt9LCB7ICQkc2xvdHMgPSB7fSwgY29udGV4dCA9IG5ldyBNYXAoKSB9ID0ge30pID0+IHtcbiAgICAgICAgICAgIG9uX2Rlc3Ryb3kgPSBbXTtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHsgdGl0bGU6ICcnLCBoZWFkOiAnJywgY3NzOiBuZXcgU2V0KCkgfTtcbiAgICAgICAgICAgIGNvbnN0IGh0bWwgPSAkJHJlbmRlcihyZXN1bHQsIHByb3BzLCB7fSwgJCRzbG90cywgY29udGV4dCk7XG4gICAgICAgICAgICBydW5fYWxsKG9uX2Rlc3Ryb3kpO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBodG1sLFxuICAgICAgICAgICAgICAgIGNzczoge1xuICAgICAgICAgICAgICAgICAgICBjb2RlOiBBcnJheS5mcm9tKHJlc3VsdC5jc3MpLm1hcChjc3MgPT4gY3NzLmNvZGUpLmpvaW4oJ1xcbicpLFxuICAgICAgICAgICAgICAgICAgICBtYXA6IG51bGwgLy8gVE9ET1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaGVhZDogcmVzdWx0LnRpdGxlICsgcmVzdWx0LmhlYWRcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgICQkcmVuZGVyXG4gICAgfTtcbn1cbmZ1bmN0aW9uIGFkZF9hdHRyaWJ1dGUobmFtZSwgdmFsdWUsIGJvb2xlYW4pIHtcbiAgICBpZiAodmFsdWUgPT0gbnVsbCB8fCAoYm9vbGVhbiAmJiAhdmFsdWUpKVxuICAgICAgICByZXR1cm4gJyc7XG4gICAgcmV0dXJuIGAgJHtuYW1lfSR7dmFsdWUgPT09IHRydWUgJiYgYm9vbGVhbl9hdHRyaWJ1dGVzLmhhcyhuYW1lKSA/ICcnIDogYD0ke3R5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgPyBKU09OLnN0cmluZ2lmeShlc2NhcGUodmFsdWUpKSA6IGBcIiR7dmFsdWV9XCJgfWB9YDtcbn1cbmZ1bmN0aW9uIGFkZF9jbGFzc2VzKGNsYXNzZXMpIHtcbiAgICByZXR1cm4gY2xhc3NlcyA/IGAgY2xhc3M9XCIke2NsYXNzZXN9XCJgIDogJyc7XG59XG5mdW5jdGlvbiBzdHlsZV9vYmplY3RfdG9fc3RyaW5nKHN0eWxlX29iamVjdCkge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhzdHlsZV9vYmplY3QpXG4gICAgICAgIC5maWx0ZXIoa2V5ID0+IHN0eWxlX29iamVjdFtrZXldKVxuICAgICAgICAubWFwKGtleSA9PiBgJHtrZXl9OiAke3N0eWxlX29iamVjdFtrZXldfTtgKVxuICAgICAgICAuam9pbignICcpO1xufVxuZnVuY3Rpb24gYWRkX3N0eWxlcyhzdHlsZV9vYmplY3QpIHtcbiAgICBjb25zdCBzdHlsZXMgPSBzdHlsZV9vYmplY3RfdG9fc3RyaW5nKHN0eWxlX29iamVjdCk7XG4gICAgcmV0dXJuIHN0eWxlcyA/IGAgc3R5bGU9XCIke3N0eWxlc31cImAgOiAnJztcbn1cblxuZnVuY3Rpb24gYmluZChjb21wb25lbnQsIG5hbWUsIGNhbGxiYWNrKSB7XG4gICAgY29uc3QgaW5kZXggPSBjb21wb25lbnQuJCQucHJvcHNbbmFtZV07XG4gICAgaWYgKGluZGV4ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29tcG9uZW50LiQkLmJvdW5kW2luZGV4XSA9IGNhbGxiYWNrO1xuICAgICAgICBjYWxsYmFjayhjb21wb25lbnQuJCQuY3R4W2luZGV4XSk7XG4gICAgfVxufVxuZnVuY3Rpb24gY3JlYXRlX2NvbXBvbmVudChibG9jaykge1xuICAgIGJsb2NrICYmIGJsb2NrLmMoKTtcbn1cbmZ1bmN0aW9uIGNsYWltX2NvbXBvbmVudChibG9jaywgcGFyZW50X25vZGVzKSB7XG4gICAgYmxvY2sgJiYgYmxvY2subChwYXJlbnRfbm9kZXMpO1xufVxuZnVuY3Rpb24gbW91bnRfY29tcG9uZW50KGNvbXBvbmVudCwgdGFyZ2V0LCBhbmNob3IsIGN1c3RvbUVsZW1lbnQpIHtcbiAgICBjb25zdCB7IGZyYWdtZW50LCBvbl9tb3VudCwgb25fZGVzdHJveSwgYWZ0ZXJfdXBkYXRlIH0gPSBjb21wb25lbnQuJCQ7XG4gICAgZnJhZ21lbnQgJiYgZnJhZ21lbnQubSh0YXJnZXQsIGFuY2hvcik7XG4gICAgaWYgKCFjdXN0b21FbGVtZW50KSB7XG4gICAgICAgIC8vIG9uTW91bnQgaGFwcGVucyBiZWZvcmUgdGhlIGluaXRpYWwgYWZ0ZXJVcGRhdGVcbiAgICAgICAgYWRkX3JlbmRlcl9jYWxsYmFjaygoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBuZXdfb25fZGVzdHJveSA9IG9uX21vdW50Lm1hcChydW4pLmZpbHRlcihpc19mdW5jdGlvbik7XG4gICAgICAgICAgICBpZiAob25fZGVzdHJveSkge1xuICAgICAgICAgICAgICAgIG9uX2Rlc3Ryb3kucHVzaCguLi5uZXdfb25fZGVzdHJveSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBFZGdlIGNhc2UgLSBjb21wb25lbnQgd2FzIGRlc3Ryb3llZCBpbW1lZGlhdGVseSxcbiAgICAgICAgICAgICAgICAvLyBtb3N0IGxpa2VseSBhcyBhIHJlc3VsdCBvZiBhIGJpbmRpbmcgaW5pdGlhbGlzaW5nXG4gICAgICAgICAgICAgICAgcnVuX2FsbChuZXdfb25fZGVzdHJveSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb21wb25lbnQuJCQub25fbW91bnQgPSBbXTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGFmdGVyX3VwZGF0ZS5mb3JFYWNoKGFkZF9yZW5kZXJfY2FsbGJhY2spO1xufVxuZnVuY3Rpb24gZGVzdHJveV9jb21wb25lbnQoY29tcG9uZW50LCBkZXRhY2hpbmcpIHtcbiAgICBjb25zdCAkJCA9IGNvbXBvbmVudC4kJDtcbiAgICBpZiAoJCQuZnJhZ21lbnQgIT09IG51bGwpIHtcbiAgICAgICAgcnVuX2FsbCgkJC5vbl9kZXN0cm95KTtcbiAgICAgICAgJCQuZnJhZ21lbnQgJiYgJCQuZnJhZ21lbnQuZChkZXRhY2hpbmcpO1xuICAgICAgICAvLyBUT0RPIG51bGwgb3V0IG90aGVyIHJlZnMsIGluY2x1ZGluZyBjb21wb25lbnQuJCQgKGJ1dCBuZWVkIHRvXG4gICAgICAgIC8vIHByZXNlcnZlIGZpbmFsIHN0YXRlPylcbiAgICAgICAgJCQub25fZGVzdHJveSA9ICQkLmZyYWdtZW50ID0gbnVsbDtcbiAgICAgICAgJCQuY3R4ID0gW107XG4gICAgfVxufVxuZnVuY3Rpb24gbWFrZV9kaXJ0eShjb21wb25lbnQsIGkpIHtcbiAgICBpZiAoY29tcG9uZW50LiQkLmRpcnR5WzBdID09PSAtMSkge1xuICAgICAgICBkaXJ0eV9jb21wb25lbnRzLnB1c2goY29tcG9uZW50KTtcbiAgICAgICAgc2NoZWR1bGVfdXBkYXRlKCk7XG4gICAgICAgIGNvbXBvbmVudC4kJC5kaXJ0eS5maWxsKDApO1xuICAgIH1cbiAgICBjb21wb25lbnQuJCQuZGlydHlbKGkgLyAzMSkgfCAwXSB8PSAoMSA8PCAoaSAlIDMxKSk7XG59XG5mdW5jdGlvbiBpbml0KGNvbXBvbmVudCwgb3B0aW9ucywgaW5zdGFuY2UsIGNyZWF0ZV9mcmFnbWVudCwgbm90X2VxdWFsLCBwcm9wcywgYXBwZW5kX3N0eWxlcywgZGlydHkgPSBbLTFdKSB7XG4gICAgY29uc3QgcGFyZW50X2NvbXBvbmVudCA9IGN1cnJlbnRfY29tcG9uZW50O1xuICAgIHNldF9jdXJyZW50X2NvbXBvbmVudChjb21wb25lbnQpO1xuICAgIGNvbnN0ICQkID0gY29tcG9uZW50LiQkID0ge1xuICAgICAgICBmcmFnbWVudDogbnVsbCxcbiAgICAgICAgY3R4OiBudWxsLFxuICAgICAgICAvLyBzdGF0ZVxuICAgICAgICBwcm9wcyxcbiAgICAgICAgdXBkYXRlOiBub29wLFxuICAgICAgICBub3RfZXF1YWwsXG4gICAgICAgIGJvdW5kOiBibGFua19vYmplY3QoKSxcbiAgICAgICAgLy8gbGlmZWN5Y2xlXG4gICAgICAgIG9uX21vdW50OiBbXSxcbiAgICAgICAgb25fZGVzdHJveTogW10sXG4gICAgICAgIG9uX2Rpc2Nvbm5lY3Q6IFtdLFxuICAgICAgICBiZWZvcmVfdXBkYXRlOiBbXSxcbiAgICAgICAgYWZ0ZXJfdXBkYXRlOiBbXSxcbiAgICAgICAgY29udGV4dDogbmV3IE1hcChvcHRpb25zLmNvbnRleHQgfHwgKHBhcmVudF9jb21wb25lbnQgPyBwYXJlbnRfY29tcG9uZW50LiQkLmNvbnRleHQgOiBbXSkpLFxuICAgICAgICAvLyBldmVyeXRoaW5nIGVsc2VcbiAgICAgICAgY2FsbGJhY2tzOiBibGFua19vYmplY3QoKSxcbiAgICAgICAgZGlydHksXG4gICAgICAgIHNraXBfYm91bmQ6IGZhbHNlLFxuICAgICAgICByb290OiBvcHRpb25zLnRhcmdldCB8fCBwYXJlbnRfY29tcG9uZW50LiQkLnJvb3RcbiAgICB9O1xuICAgIGFwcGVuZF9zdHlsZXMgJiYgYXBwZW5kX3N0eWxlcygkJC5yb290KTtcbiAgICBsZXQgcmVhZHkgPSBmYWxzZTtcbiAgICAkJC5jdHggPSBpbnN0YW5jZVxuICAgICAgICA/IGluc3RhbmNlKGNvbXBvbmVudCwgb3B0aW9ucy5wcm9wcyB8fCB7fSwgKGksIHJldCwgLi4ucmVzdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSByZXN0Lmxlbmd0aCA/IHJlc3RbMF0gOiByZXQ7XG4gICAgICAgICAgICBpZiAoJCQuY3R4ICYmIG5vdF9lcXVhbCgkJC5jdHhbaV0sICQkLmN0eFtpXSA9IHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGlmICghJCQuc2tpcF9ib3VuZCAmJiAkJC5ib3VuZFtpXSlcbiAgICAgICAgICAgICAgICAgICAgJCQuYm91bmRbaV0odmFsdWUpO1xuICAgICAgICAgICAgICAgIGlmIChyZWFkeSlcbiAgICAgICAgICAgICAgICAgICAgbWFrZV9kaXJ0eShjb21wb25lbnQsIGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgfSlcbiAgICAgICAgOiBbXTtcbiAgICAkJC51cGRhdGUoKTtcbiAgICByZWFkeSA9IHRydWU7XG4gICAgcnVuX2FsbCgkJC5iZWZvcmVfdXBkYXRlKTtcbiAgICAvLyBgZmFsc2VgIGFzIGEgc3BlY2lhbCBjYXNlIG9mIG5vIERPTSBjb21wb25lbnRcbiAgICAkJC5mcmFnbWVudCA9IGNyZWF0ZV9mcmFnbWVudCA/IGNyZWF0ZV9mcmFnbWVudCgkJC5jdHgpIDogZmFsc2U7XG4gICAgaWYgKG9wdGlvbnMudGFyZ2V0KSB7XG4gICAgICAgIGlmIChvcHRpb25zLmh5ZHJhdGUpIHtcbiAgICAgICAgICAgIHN0YXJ0X2h5ZHJhdGluZygpO1xuICAgICAgICAgICAgY29uc3Qgbm9kZXMgPSBjaGlsZHJlbihvcHRpb25zLnRhcmdldCk7XG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5vbi1udWxsLWFzc2VydGlvblxuICAgICAgICAgICAgJCQuZnJhZ21lbnQgJiYgJCQuZnJhZ21lbnQubChub2Rlcyk7XG4gICAgICAgICAgICBub2Rlcy5mb3JFYWNoKGRldGFjaCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5vbi1udWxsLWFzc2VydGlvblxuICAgICAgICAgICAgJCQuZnJhZ21lbnQgJiYgJCQuZnJhZ21lbnQuYygpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLmludHJvKVxuICAgICAgICAgICAgdHJhbnNpdGlvbl9pbihjb21wb25lbnQuJCQuZnJhZ21lbnQpO1xuICAgICAgICBtb3VudF9jb21wb25lbnQoY29tcG9uZW50LCBvcHRpb25zLnRhcmdldCwgb3B0aW9ucy5hbmNob3IsIG9wdGlvbnMuY3VzdG9tRWxlbWVudCk7XG4gICAgICAgIGVuZF9oeWRyYXRpbmcoKTtcbiAgICAgICAgZmx1c2goKTtcbiAgICB9XG4gICAgc2V0X2N1cnJlbnRfY29tcG9uZW50KHBhcmVudF9jb21wb25lbnQpO1xufVxubGV0IFN2ZWx0ZUVsZW1lbnQ7XG5pZiAodHlwZW9mIEhUTUxFbGVtZW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgU3ZlbHRlRWxlbWVudCA9IGNsYXNzIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgIHN1cGVyKCk7XG4gICAgICAgICAgICB0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6ICdvcGVuJyB9KTtcbiAgICAgICAgfVxuICAgICAgICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgb25fbW91bnQgfSA9IHRoaXMuJCQ7XG4gICAgICAgICAgICB0aGlzLiQkLm9uX2Rpc2Nvbm5lY3QgPSBvbl9tb3VudC5tYXAocnVuKS5maWx0ZXIoaXNfZnVuY3Rpb24pO1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZSB0b2RvOiBpbXByb3ZlIHR5cGluZ3NcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuJCQuc2xvdHRlZCkge1xuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgdG9kbzogaW1wcm92ZSB0eXBpbmdzXG4gICAgICAgICAgICAgICAgdGhpcy5hcHBlbmRDaGlsZCh0aGlzLiQkLnNsb3R0ZWRba2V5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKGF0dHIsIF9vbGRWYWx1ZSwgbmV3VmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXNbYXR0cl0gPSBuZXdWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAgICAgICAgIHJ1bl9hbGwodGhpcy4kJC5vbl9kaXNjb25uZWN0KTtcbiAgICAgICAgfVxuICAgICAgICAkZGVzdHJveSgpIHtcbiAgICAgICAgICAgIGRlc3Ryb3lfY29tcG9uZW50KHRoaXMsIDEpO1xuICAgICAgICAgICAgdGhpcy4kZGVzdHJveSA9IG5vb3A7XG4gICAgICAgIH1cbiAgICAgICAgJG9uKHR5cGUsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAvLyBUT0RPIHNob3VsZCB0aGlzIGRlbGVnYXRlIHRvIGFkZEV2ZW50TGlzdGVuZXI/XG4gICAgICAgICAgICBjb25zdCBjYWxsYmFja3MgPSAodGhpcy4kJC5jYWxsYmFja3NbdHlwZV0gfHwgKHRoaXMuJCQuY2FsbGJhY2tzW3R5cGVdID0gW10pKTtcbiAgICAgICAgICAgIGNhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKTtcbiAgICAgICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSBjYWxsYmFja3MuaW5kZXhPZihjYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ICE9PSAtMSlcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2tzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgICRzZXQoJCRwcm9wcykge1xuICAgICAgICAgICAgaWYgKHRoaXMuJCRzZXQgJiYgIWlzX2VtcHR5KCQkcHJvcHMpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kJC5za2lwX2JvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLiQkc2V0KCQkcHJvcHMpO1xuICAgICAgICAgICAgICAgIHRoaXMuJCQuc2tpcF9ib3VuZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbn1cbi8qKlxuICogQmFzZSBjbGFzcyBmb3IgU3ZlbHRlIGNvbXBvbmVudHMuIFVzZWQgd2hlbiBkZXY9ZmFsc2UuXG4gKi9cbmNsYXNzIFN2ZWx0ZUNvbXBvbmVudCB7XG4gICAgJGRlc3Ryb3koKSB7XG4gICAgICAgIGRlc3Ryb3lfY29tcG9uZW50KHRoaXMsIDEpO1xuICAgICAgICB0aGlzLiRkZXN0cm95ID0gbm9vcDtcbiAgICB9XG4gICAgJG9uKHR5cGUsIGNhbGxiYWNrKSB7XG4gICAgICAgIGNvbnN0IGNhbGxiYWNrcyA9ICh0aGlzLiQkLmNhbGxiYWNrc1t0eXBlXSB8fCAodGhpcy4kJC5jYWxsYmFja3NbdHlwZV0gPSBbXSkpO1xuICAgICAgICBjYWxsYmFja3MucHVzaChjYWxsYmFjayk7XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IGNhbGxiYWNrcy5pbmRleE9mKGNhbGxiYWNrKTtcbiAgICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEpXG4gICAgICAgICAgICAgICAgY2FsbGJhY2tzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIH07XG4gICAgfVxuICAgICRzZXQoJCRwcm9wcykge1xuICAgICAgICBpZiAodGhpcy4kJHNldCAmJiAhaXNfZW1wdHkoJCRwcm9wcykpIHtcbiAgICAgICAgICAgIHRoaXMuJCQuc2tpcF9ib3VuZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLiQkc2V0KCQkcHJvcHMpO1xuICAgICAgICAgICAgdGhpcy4kJC5za2lwX2JvdW5kID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRpc3BhdGNoX2Rldih0eXBlLCBkZXRhaWwpIHtcbiAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGN1c3RvbV9ldmVudCh0eXBlLCBPYmplY3QuYXNzaWduKHsgdmVyc2lvbjogJzMuNDYuNCcgfSwgZGV0YWlsKSwgdHJ1ZSkpO1xufVxuZnVuY3Rpb24gYXBwZW5kX2Rldih0YXJnZXQsIG5vZGUpIHtcbiAgICBkaXNwYXRjaF9kZXYoJ1N2ZWx0ZURPTUluc2VydCcsIHsgdGFyZ2V0LCBub2RlIH0pO1xuICAgIGFwcGVuZCh0YXJnZXQsIG5vZGUpO1xufVxuZnVuY3Rpb24gYXBwZW5kX2h5ZHJhdGlvbl9kZXYodGFyZ2V0LCBub2RlKSB7XG4gICAgZGlzcGF0Y2hfZGV2KCdTdmVsdGVET01JbnNlcnQnLCB7IHRhcmdldCwgbm9kZSB9KTtcbiAgICBhcHBlbmRfaHlkcmF0aW9uKHRhcmdldCwgbm9kZSk7XG59XG5mdW5jdGlvbiBpbnNlcnRfZGV2KHRhcmdldCwgbm9kZSwgYW5jaG9yKSB7XG4gICAgZGlzcGF0Y2hfZGV2KCdTdmVsdGVET01JbnNlcnQnLCB7IHRhcmdldCwgbm9kZSwgYW5jaG9yIH0pO1xuICAgIGluc2VydCh0YXJnZXQsIG5vZGUsIGFuY2hvcik7XG59XG5mdW5jdGlvbiBpbnNlcnRfaHlkcmF0aW9uX2Rldih0YXJnZXQsIG5vZGUsIGFuY2hvcikge1xuICAgIGRpc3BhdGNoX2RldignU3ZlbHRlRE9NSW5zZXJ0JywgeyB0YXJnZXQsIG5vZGUsIGFuY2hvciB9KTtcbiAgICBpbnNlcnRfaHlkcmF0aW9uKHRhcmdldCwgbm9kZSwgYW5jaG9yKTtcbn1cbmZ1bmN0aW9uIGRldGFjaF9kZXYobm9kZSkge1xuICAgIGRpc3BhdGNoX2RldignU3ZlbHRlRE9NUmVtb3ZlJywgeyBub2RlIH0pO1xuICAgIGRldGFjaChub2RlKTtcbn1cbmZ1bmN0aW9uIGRldGFjaF9iZXR3ZWVuX2RldihiZWZvcmUsIGFmdGVyKSB7XG4gICAgd2hpbGUgKGJlZm9yZS5uZXh0U2libGluZyAmJiBiZWZvcmUubmV4dFNpYmxpbmcgIT09IGFmdGVyKSB7XG4gICAgICAgIGRldGFjaF9kZXYoYmVmb3JlLm5leHRTaWJsaW5nKTtcbiAgICB9XG59XG5mdW5jdGlvbiBkZXRhY2hfYmVmb3JlX2RldihhZnRlcikge1xuICAgIHdoaWxlIChhZnRlci5wcmV2aW91c1NpYmxpbmcpIHtcbiAgICAgICAgZGV0YWNoX2RldihhZnRlci5wcmV2aW91c1NpYmxpbmcpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGRldGFjaF9hZnRlcl9kZXYoYmVmb3JlKSB7XG4gICAgd2hpbGUgKGJlZm9yZS5uZXh0U2libGluZykge1xuICAgICAgICBkZXRhY2hfZGV2KGJlZm9yZS5uZXh0U2libGluZyk7XG4gICAgfVxufVxuZnVuY3Rpb24gbGlzdGVuX2Rldihub2RlLCBldmVudCwgaGFuZGxlciwgb3B0aW9ucywgaGFzX3ByZXZlbnRfZGVmYXVsdCwgaGFzX3N0b3BfcHJvcGFnYXRpb24pIHtcbiAgICBjb25zdCBtb2RpZmllcnMgPSBvcHRpb25zID09PSB0cnVlID8gWydjYXB0dXJlJ10gOiBvcHRpb25zID8gQXJyYXkuZnJvbShPYmplY3Qua2V5cyhvcHRpb25zKSkgOiBbXTtcbiAgICBpZiAoaGFzX3ByZXZlbnRfZGVmYXVsdClcbiAgICAgICAgbW9kaWZpZXJzLnB1c2goJ3ByZXZlbnREZWZhdWx0Jyk7XG4gICAgaWYgKGhhc19zdG9wX3Byb3BhZ2F0aW9uKVxuICAgICAgICBtb2RpZmllcnMucHVzaCgnc3RvcFByb3BhZ2F0aW9uJyk7XG4gICAgZGlzcGF0Y2hfZGV2KCdTdmVsdGVET01BZGRFdmVudExpc3RlbmVyJywgeyBub2RlLCBldmVudCwgaGFuZGxlciwgbW9kaWZpZXJzIH0pO1xuICAgIGNvbnN0IGRpc3Bvc2UgPSBsaXN0ZW4obm9kZSwgZXZlbnQsIGhhbmRsZXIsIG9wdGlvbnMpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGRpc3BhdGNoX2RldignU3ZlbHRlRE9NUmVtb3ZlRXZlbnRMaXN0ZW5lcicsIHsgbm9kZSwgZXZlbnQsIGhhbmRsZXIsIG1vZGlmaWVycyB9KTtcbiAgICAgICAgZGlzcG9zZSgpO1xuICAgIH07XG59XG5mdW5jdGlvbiBhdHRyX2Rldihub2RlLCBhdHRyaWJ1dGUsIHZhbHVlKSB7XG4gICAgYXR0cihub2RlLCBhdHRyaWJ1dGUsIHZhbHVlKTtcbiAgICBpZiAodmFsdWUgPT0gbnVsbClcbiAgICAgICAgZGlzcGF0Y2hfZGV2KCdTdmVsdGVET01SZW1vdmVBdHRyaWJ1dGUnLCB7IG5vZGUsIGF0dHJpYnV0ZSB9KTtcbiAgICBlbHNlXG4gICAgICAgIGRpc3BhdGNoX2RldignU3ZlbHRlRE9NU2V0QXR0cmlidXRlJywgeyBub2RlLCBhdHRyaWJ1dGUsIHZhbHVlIH0pO1xufVxuZnVuY3Rpb24gcHJvcF9kZXYobm9kZSwgcHJvcGVydHksIHZhbHVlKSB7XG4gICAgbm9kZVtwcm9wZXJ0eV0gPSB2YWx1ZTtcbiAgICBkaXNwYXRjaF9kZXYoJ1N2ZWx0ZURPTVNldFByb3BlcnR5JywgeyBub2RlLCBwcm9wZXJ0eSwgdmFsdWUgfSk7XG59XG5mdW5jdGlvbiBkYXRhc2V0X2Rldihub2RlLCBwcm9wZXJ0eSwgdmFsdWUpIHtcbiAgICBub2RlLmRhdGFzZXRbcHJvcGVydHldID0gdmFsdWU7XG4gICAgZGlzcGF0Y2hfZGV2KCdTdmVsdGVET01TZXREYXRhc2V0JywgeyBub2RlLCBwcm9wZXJ0eSwgdmFsdWUgfSk7XG59XG5mdW5jdGlvbiBzZXRfZGF0YV9kZXYodGV4dCwgZGF0YSkge1xuICAgIGRhdGEgPSAnJyArIGRhdGE7XG4gICAgaWYgKHRleHQud2hvbGVUZXh0ID09PSBkYXRhKVxuICAgICAgICByZXR1cm47XG4gICAgZGlzcGF0Y2hfZGV2KCdTdmVsdGVET01TZXREYXRhJywgeyBub2RlOiB0ZXh0LCBkYXRhIH0pO1xuICAgIHRleHQuZGF0YSA9IGRhdGE7XG59XG5mdW5jdGlvbiB2YWxpZGF0ZV9lYWNoX2FyZ3VtZW50KGFyZykge1xuICAgIGlmICh0eXBlb2YgYXJnICE9PSAnc3RyaW5nJyAmJiAhKGFyZyAmJiB0eXBlb2YgYXJnID09PSAnb2JqZWN0JyAmJiAnbGVuZ3RoJyBpbiBhcmcpKSB7XG4gICAgICAgIGxldCBtc2cgPSAneyNlYWNofSBvbmx5IGl0ZXJhdGVzIG92ZXIgYXJyYXktbGlrZSBvYmplY3RzLic7XG4gICAgICAgIGlmICh0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIGFyZyAmJiBTeW1ib2wuaXRlcmF0b3IgaW4gYXJnKSB7XG4gICAgICAgICAgICBtc2cgKz0gJyBZb3UgY2FuIHVzZSBhIHNwcmVhZCB0byBjb252ZXJ0IHRoaXMgaXRlcmFibGUgaW50byBhbiBhcnJheS4nO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHZhbGlkYXRlX3Nsb3RzKG5hbWUsIHNsb3QsIGtleXMpIHtcbiAgICBmb3IgKGNvbnN0IHNsb3Rfa2V5IG9mIE9iamVjdC5rZXlzKHNsb3QpKSB7XG4gICAgICAgIGlmICghfmtleXMuaW5kZXhPZihzbG90X2tleSkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgPCR7bmFtZX0+IHJlY2VpdmVkIGFuIHVuZXhwZWN0ZWQgc2xvdCBcIiR7c2xvdF9rZXl9XCIuYCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4vKipcbiAqIEJhc2UgY2xhc3MgZm9yIFN2ZWx0ZSBjb21wb25lbnRzIHdpdGggc29tZSBtaW5vciBkZXYtZW5oYW5jZW1lbnRzLiBVc2VkIHdoZW4gZGV2PXRydWUuXG4gKi9cbmNsYXNzIFN2ZWx0ZUNvbXBvbmVudERldiBleHRlbmRzIFN2ZWx0ZUNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICBpZiAoIW9wdGlvbnMgfHwgKCFvcHRpb25zLnRhcmdldCAmJiAhb3B0aW9ucy4kJGlubGluZSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIid0YXJnZXQnIGlzIGEgcmVxdWlyZWQgb3B0aW9uXCIpO1xuICAgICAgICB9XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuICAgICRkZXN0cm95KCkge1xuICAgICAgICBzdXBlci4kZGVzdHJveSgpO1xuICAgICAgICB0aGlzLiRkZXN0cm95ID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdDb21wb25lbnQgd2FzIGFscmVhZHkgZGVzdHJveWVkJyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuICAgICAgICB9O1xuICAgIH1cbiAgICAkY2FwdHVyZV9zdGF0ZSgpIHsgfVxuICAgICRpbmplY3Rfc3RhdGUoKSB7IH1cbn1cbi8qKlxuICogQmFzZSBjbGFzcyB0byBjcmVhdGUgc3Ryb25nbHkgdHlwZWQgU3ZlbHRlIGNvbXBvbmVudHMuXG4gKiBUaGlzIG9ubHkgZXhpc3RzIGZvciB0eXBpbmcgcHVycG9zZXMgYW5kIHNob3VsZCBiZSB1c2VkIGluIGAuZC50c2AgZmlsZXMuXG4gKlxuICogIyMjIEV4YW1wbGU6XG4gKlxuICogWW91IGhhdmUgY29tcG9uZW50IGxpYnJhcnkgb24gbnBtIGNhbGxlZCBgY29tcG9uZW50LWxpYnJhcnlgLCBmcm9tIHdoaWNoXG4gKiB5b3UgZXhwb3J0IGEgY29tcG9uZW50IGNhbGxlZCBgTXlDb21wb25lbnRgLiBGb3IgU3ZlbHRlK1R5cGVTY3JpcHQgdXNlcnMsXG4gKiB5b3Ugd2FudCB0byBwcm92aWRlIHR5cGluZ3MuIFRoZXJlZm9yZSB5b3UgY3JlYXRlIGEgYGluZGV4LmQudHNgOlxuICogYGBgdHNcbiAqIGltcG9ydCB7IFN2ZWx0ZUNvbXBvbmVudFR5cGVkIH0gZnJvbSBcInN2ZWx0ZVwiO1xuICogZXhwb3J0IGNsYXNzIE15Q29tcG9uZW50IGV4dGVuZHMgU3ZlbHRlQ29tcG9uZW50VHlwZWQ8e2Zvbzogc3RyaW5nfT4ge31cbiAqIGBgYFxuICogVHlwaW5nIHRoaXMgbWFrZXMgaXQgcG9zc2libGUgZm9yIElERXMgbGlrZSBWUyBDb2RlIHdpdGggdGhlIFN2ZWx0ZSBleHRlbnNpb25cbiAqIHRvIHByb3ZpZGUgaW50ZWxsaXNlbnNlIGFuZCB0byB1c2UgdGhlIGNvbXBvbmVudCBsaWtlIHRoaXMgaW4gYSBTdmVsdGUgZmlsZVxuICogd2l0aCBUeXBlU2NyaXB0OlxuICogYGBgc3ZlbHRlXG4gKiA8c2NyaXB0IGxhbmc9XCJ0c1wiPlxuICogXHRpbXBvcnQgeyBNeUNvbXBvbmVudCB9IGZyb20gXCJjb21wb25lbnQtbGlicmFyeVwiO1xuICogPC9zY3JpcHQ+XG4gKiA8TXlDb21wb25lbnQgZm9vPXsnYmFyJ30gLz5cbiAqIGBgYFxuICpcbiAqICMjIyMgV2h5IG5vdCBtYWtlIHRoaXMgcGFydCBvZiBgU3ZlbHRlQ29tcG9uZW50KERldilgP1xuICogQmVjYXVzZVxuICogYGBgdHNcbiAqIGNsYXNzIEFTdWJjbGFzc09mU3ZlbHRlQ29tcG9uZW50IGV4dGVuZHMgU3ZlbHRlQ29tcG9uZW50PHtmb286IHN0cmluZ30+IHt9XG4gKiBjb25zdCBjb21wb25lbnQ6IHR5cGVvZiBTdmVsdGVDb21wb25lbnQgPSBBU3ViY2xhc3NPZlN2ZWx0ZUNvbXBvbmVudDtcbiAqIGBgYFxuICogd2lsbCB0aHJvdyBhIHR5cGUgZXJyb3IsIHNvIHdlIG5lZWQgdG8gc2VwYXJhdGUgdGhlIG1vcmUgc3RyaWN0bHkgdHlwZWQgY2xhc3MuXG4gKi9cbmNsYXNzIFN2ZWx0ZUNvbXBvbmVudFR5cGVkIGV4dGVuZHMgU3ZlbHRlQ29tcG9uZW50RGV2IHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGxvb3BfZ3VhcmQodGltZW91dCkge1xuICAgIGNvbnN0IHN0YXJ0ID0gRGF0ZS5ub3coKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBpZiAoRGF0ZS5ub3coKSAtIHN0YXJ0ID4gdGltZW91dCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbmZpbml0ZSBsb29wIGRldGVjdGVkJyk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuXG5leHBvcnQgeyBIdG1sVGFnLCBIdG1sVGFnSHlkcmF0aW9uLCBTdmVsdGVDb21wb25lbnQsIFN2ZWx0ZUNvbXBvbmVudERldiwgU3ZlbHRlQ29tcG9uZW50VHlwZWQsIFN2ZWx0ZUVsZW1lbnQsIGFjdGlvbl9kZXN0cm95ZXIsIGFkZF9hdHRyaWJ1dGUsIGFkZF9jbGFzc2VzLCBhZGRfZmx1c2hfY2FsbGJhY2ssIGFkZF9sb2NhdGlvbiwgYWRkX3JlbmRlcl9jYWxsYmFjaywgYWRkX3Jlc2l6ZV9saXN0ZW5lciwgYWRkX3N0eWxlcywgYWRkX3RyYW5zZm9ybSwgYWZ0ZXJVcGRhdGUsIGFwcGVuZCwgYXBwZW5kX2RldiwgYXBwZW5kX2VtcHR5X3N0eWxlc2hlZXQsIGFwcGVuZF9oeWRyYXRpb24sIGFwcGVuZF9oeWRyYXRpb25fZGV2LCBhcHBlbmRfc3R5bGVzLCBhc3NpZ24sIGF0dHIsIGF0dHJfZGV2LCBhdHRyaWJ1dGVfdG9fb2JqZWN0LCBiZWZvcmVVcGRhdGUsIGJpbmQsIGJpbmRpbmdfY2FsbGJhY2tzLCBibGFua19vYmplY3QsIGJ1YmJsZSwgY2hlY2tfb3V0cm9zLCBjaGlsZHJlbiwgY2xhaW1fY29tcG9uZW50LCBjbGFpbV9lbGVtZW50LCBjbGFpbV9odG1sX3RhZywgY2xhaW1fc3BhY2UsIGNsYWltX3N2Z19lbGVtZW50LCBjbGFpbV90ZXh0LCBjbGVhcl9sb29wcywgY29tcG9uZW50X3N1YnNjcmliZSwgY29tcHV0ZV9yZXN0X3Byb3BzLCBjb21wdXRlX3Nsb3RzLCBjcmVhdGVFdmVudERpc3BhdGNoZXIsIGNyZWF0ZV9hbmltYXRpb24sIGNyZWF0ZV9iaWRpcmVjdGlvbmFsX3RyYW5zaXRpb24sIGNyZWF0ZV9jb21wb25lbnQsIGNyZWF0ZV9pbl90cmFuc2l0aW9uLCBjcmVhdGVfb3V0X3RyYW5zaXRpb24sIGNyZWF0ZV9zbG90LCBjcmVhdGVfc3NyX2NvbXBvbmVudCwgY3VycmVudF9jb21wb25lbnQsIGN1c3RvbV9ldmVudCwgZGF0YXNldF9kZXYsIGRlYnVnLCBkZXN0cm95X2Jsb2NrLCBkZXN0cm95X2NvbXBvbmVudCwgZGVzdHJveV9lYWNoLCBkZXRhY2gsIGRldGFjaF9hZnRlcl9kZXYsIGRldGFjaF9iZWZvcmVfZGV2LCBkZXRhY2hfYmV0d2Vlbl9kZXYsIGRldGFjaF9kZXYsIGRpcnR5X2NvbXBvbmVudHMsIGRpc3BhdGNoX2RldiwgZWFjaCwgZWxlbWVudCwgZWxlbWVudF9pcywgZW1wdHksIGVuZF9oeWRyYXRpbmcsIGVzY2FwZSwgZXNjYXBlX2F0dHJpYnV0ZV92YWx1ZSwgZXNjYXBlX29iamVjdCwgZXNjYXBlZCwgZXhjbHVkZV9pbnRlcm5hbF9wcm9wcywgZml4X2FuZF9kZXN0cm95X2Jsb2NrLCBmaXhfYW5kX291dHJvX2FuZF9kZXN0cm95X2Jsb2NrLCBmaXhfcG9zaXRpb24sIGZsdXNoLCBnZXRBbGxDb250ZXh0cywgZ2V0Q29udGV4dCwgZ2V0X2FsbF9kaXJ0eV9mcm9tX3Njb3BlLCBnZXRfYmluZGluZ19ncm91cF92YWx1ZSwgZ2V0X2N1cnJlbnRfY29tcG9uZW50LCBnZXRfY3VzdG9tX2VsZW1lbnRzX3Nsb3RzLCBnZXRfcm9vdF9mb3Jfc3R5bGUsIGdldF9zbG90X2NoYW5nZXMsIGdldF9zcHJlYWRfb2JqZWN0LCBnZXRfc3ByZWFkX3VwZGF0ZSwgZ2V0X3N0b3JlX3ZhbHVlLCBnbG9iYWxzLCBncm91cF9vdXRyb3MsIGhhbmRsZV9wcm9taXNlLCBoYXNDb250ZXh0LCBoYXNfcHJvcCwgaWRlbnRpdHksIGluaXQsIGluc2VydCwgaW5zZXJ0X2RldiwgaW5zZXJ0X2h5ZHJhdGlvbiwgaW5zZXJ0X2h5ZHJhdGlvbl9kZXYsIGludHJvcywgaW52YWxpZF9hdHRyaWJ1dGVfbmFtZV9jaGFyYWN0ZXIsIGlzX2NsaWVudCwgaXNfY3Jvc3NvcmlnaW4sIGlzX2VtcHR5LCBpc19mdW5jdGlvbiwgaXNfcHJvbWlzZSwgbGlzdGVuLCBsaXN0ZW5fZGV2LCBsb29wLCBsb29wX2d1YXJkLCBtZXJnZV9zc3Jfc3R5bGVzLCBtaXNzaW5nX2NvbXBvbmVudCwgbW91bnRfY29tcG9uZW50LCBub29wLCBub3RfZXF1YWwsIG5vdywgbnVsbF90b19lbXB0eSwgb2JqZWN0X3dpdGhvdXRfcHJvcGVydGllcywgb25EZXN0cm95LCBvbk1vdW50LCBvbmNlLCBvdXRyb19hbmRfZGVzdHJveV9ibG9jaywgcHJldmVudF9kZWZhdWx0LCBwcm9wX2RldiwgcXVlcnlfc2VsZWN0b3JfYWxsLCByYWYsIHJ1biwgcnVuX2FsbCwgc2FmZV9ub3RfZXF1YWwsIHNjaGVkdWxlX3VwZGF0ZSwgc2VsZWN0X211bHRpcGxlX3ZhbHVlLCBzZWxlY3Rfb3B0aW9uLCBzZWxlY3Rfb3B0aW9ucywgc2VsZWN0X3ZhbHVlLCBzZWxmLCBzZXRDb250ZXh0LCBzZXRfYXR0cmlidXRlcywgc2V0X2N1cnJlbnRfY29tcG9uZW50LCBzZXRfY3VzdG9tX2VsZW1lbnRfZGF0YSwgc2V0X2RhdGEsIHNldF9kYXRhX2Rldiwgc2V0X2lucHV0X3R5cGUsIHNldF9pbnB1dF92YWx1ZSwgc2V0X25vdywgc2V0X3JhZiwgc2V0X3N0b3JlX3ZhbHVlLCBzZXRfc3R5bGUsIHNldF9zdmdfYXR0cmlidXRlcywgc3BhY2UsIHNwcmVhZCwgc3JjX3VybF9lcXVhbCwgc3RhcnRfaHlkcmF0aW5nLCBzdG9wX3Byb3BhZ2F0aW9uLCBzdWJzY3JpYmUsIHN2Z19lbGVtZW50LCB0ZXh0LCB0aWNrLCB0aW1lX3Jhbmdlc190b19hcnJheSwgdG9fbnVtYmVyLCB0b2dnbGVfY2xhc3MsIHRyYW5zaXRpb25faW4sIHRyYW5zaXRpb25fb3V0LCB0cnVzdGVkLCB1cGRhdGVfYXdhaXRfYmxvY2tfYnJhbmNoLCB1cGRhdGVfa2V5ZWRfZWFjaCwgdXBkYXRlX3Nsb3QsIHVwZGF0ZV9zbG90X2Jhc2UsIHZhbGlkYXRlX2NvbXBvbmVudCwgdmFsaWRhdGVfZWFjaF9hcmd1bWVudCwgdmFsaWRhdGVfZWFjaF9rZXlzLCB2YWxpZGF0ZV9zbG90cywgdmFsaWRhdGVfc3RvcmUsIHhsaW5rX2F0dHIgfTtcbiIsICI8c2NyaXB0PlxuXHRpbXBvcnQgeyBvbk1vdW50LCB0aWNrIH0gZnJvbSAnc3ZlbHRlJztcblxuXHQvLyBwcm9wc1xuXHRleHBvcnQgbGV0IGl0ZW1zO1xuXHRleHBvcnQgbGV0IGhlaWdodCA9ICcxMDAlJztcblx0ZXhwb3J0IGxldCBpdGVtSGVpZ2h0ID0gdW5kZWZpbmVkO1xuXG5cdGxldCBmb287XG5cblx0Ly8gcmVhZC1vbmx5LCBidXQgdmlzaWJsZSB0byBjb25zdW1lcnMgdmlhIGJpbmQ6c3RhcnRcblx0ZXhwb3J0IGxldCBzdGFydCA9IDA7XG5cdGV4cG9ydCBsZXQgZW5kID0gMDtcblxuXHQvLyBsb2NhbCBzdGF0ZVxuXHRsZXQgaGVpZ2h0X21hcCA9IFtdO1xuXHRsZXQgcm93cztcblx0bGV0IHZpZXdwb3J0O1xuXHRsZXQgY29udGVudHM7XG5cdGxldCB2aWV3cG9ydF9oZWlnaHQgPSAwO1xuXHRsZXQgdmlzaWJsZTtcblx0bGV0IG1vdW50ZWQ7XG5cblx0bGV0IHRvcCA9IDA7XG5cdGxldCBib3R0b20gPSAwO1xuXHRsZXQgYXZlcmFnZV9oZWlnaHQ7XG5cblx0JDogdmlzaWJsZSA9IGl0ZW1zLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcCgoZGF0YSwgaSkgPT4ge1xuXHRcdHJldHVybiB7IGluZGV4OiBpICsgc3RhcnQsIGRhdGEgfTtcblx0fSk7XG5cblx0Ly8gd2hlbmV2ZXIgYGl0ZW1zYCBjaGFuZ2VzLCBpbnZhbGlkYXRlIHRoZSBjdXJyZW50IGhlaWdodG1hcFxuXHQkOiBpZiAobW91bnRlZCkgcmVmcmVzaChpdGVtcywgdmlld3BvcnRfaGVpZ2h0LCBpdGVtSGVpZ2h0KTtcblxuXHRhc3luYyBmdW5jdGlvbiByZWZyZXNoKGl0ZW1zLCB2aWV3cG9ydF9oZWlnaHQsIGl0ZW1IZWlnaHQpIHtcblx0XHRjb25zdCB7IHNjcm9sbFRvcCB9ID0gdmlld3BvcnQ7XG5cblx0XHRhd2FpdCB0aWNrKCk7IC8vIHdhaXQgdW50aWwgdGhlIERPTSBpcyB1cCB0byBkYXRlXG5cblx0XHRsZXQgY29udGVudF9oZWlnaHQgPSB0b3AgLSBzY3JvbGxUb3A7XG5cdFx0bGV0IGkgPSBzdGFydDtcblxuXHRcdHdoaWxlIChjb250ZW50X2hlaWdodCA8IHZpZXdwb3J0X2hlaWdodCAmJiBpIDwgaXRlbXMubGVuZ3RoKSB7XG5cdFx0XHRsZXQgcm93ID0gcm93c1tpIC0gc3RhcnRdO1xuXG5cdFx0XHRpZiAoIXJvdykge1xuXHRcdFx0XHRlbmQgPSBpICsgMTtcblx0XHRcdFx0YXdhaXQgdGljaygpOyAvLyByZW5kZXIgdGhlIG5ld2x5IHZpc2libGUgcm93XG5cdFx0XHRcdHJvdyA9IHJvd3NbaSAtIHN0YXJ0XTtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3Qgcm93X2hlaWdodCA9IGhlaWdodF9tYXBbaV0gPSBpdGVtSGVpZ2h0IHx8IHJvdy5vZmZzZXRIZWlnaHQ7XG5cdFx0XHRjb250ZW50X2hlaWdodCArPSByb3dfaGVpZ2h0O1xuXHRcdFx0aSArPSAxO1xuXHRcdH1cblxuXHRcdGVuZCA9IGk7XG5cblx0XHRjb25zdCByZW1haW5pbmcgPSBpdGVtcy5sZW5ndGggLSBlbmQ7XG5cdFx0YXZlcmFnZV9oZWlnaHQgPSAodG9wICsgY29udGVudF9oZWlnaHQpIC8gZW5kO1xuXG5cdFx0Ym90dG9tID0gcmVtYWluaW5nICogYXZlcmFnZV9oZWlnaHQ7XG5cdFx0aGVpZ2h0X21hcC5sZW5ndGggPSBpdGVtcy5sZW5ndGg7XG5cblx0fVxuXG5cdGFzeW5jIGZ1bmN0aW9uIGhhbmRsZV9zY3JvbGwoKSB7XG5cdFx0Y29uc3QgeyBzY3JvbGxUb3AgfSA9IHZpZXdwb3J0O1xuXG5cdFx0Y29uc3Qgb2xkX3N0YXJ0ID0gc3RhcnQ7XG5cblx0XHRmb3IgKGxldCB2ID0gMDsgdiA8IHJvd3MubGVuZ3RoOyB2ICs9IDEpIHtcblx0XHRcdGhlaWdodF9tYXBbc3RhcnQgKyB2XSA9IGl0ZW1IZWlnaHQgfHwgcm93c1t2XS5vZmZzZXRIZWlnaHQ7XG5cdFx0fVxuXG5cdFx0bGV0IGkgPSAwO1xuXHRcdGxldCB5ID0gMDtcblxuXHRcdHdoaWxlIChpIDwgaXRlbXMubGVuZ3RoKSB7XG5cdFx0XHRjb25zdCByb3dfaGVpZ2h0ID0gaGVpZ2h0X21hcFtpXSB8fCBhdmVyYWdlX2hlaWdodDtcblx0XHRcdGlmICh5ICsgcm93X2hlaWdodCA+IHNjcm9sbFRvcCkge1xuXHRcdFx0XHRzdGFydCA9IGk7XG5cdFx0XHRcdHRvcCA9IHk7XG5cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cblx0XHRcdHkgKz0gcm93X2hlaWdodDtcblx0XHRcdGkgKz0gMTtcblx0XHR9XG5cblx0XHR3aGlsZSAoaSA8IGl0ZW1zLmxlbmd0aCkge1xuXHRcdFx0eSArPSBoZWlnaHRfbWFwW2ldIHx8IGF2ZXJhZ2VfaGVpZ2h0O1xuXHRcdFx0aSArPSAxO1xuXG5cdFx0XHRpZiAoeSA+IHNjcm9sbFRvcCArIHZpZXdwb3J0X2hlaWdodCkgYnJlYWs7XG5cdFx0fVxuXG5cdFx0ZW5kID0gaTtcblxuXHRcdGNvbnN0IHJlbWFpbmluZyA9IGl0ZW1zLmxlbmd0aCAtIGVuZDtcblx0XHRhdmVyYWdlX2hlaWdodCA9IHkgLyBlbmQ7XG5cblx0XHR3aGlsZSAoaSA8IGl0ZW1zLmxlbmd0aCkgaGVpZ2h0X21hcFtpKytdID0gYXZlcmFnZV9oZWlnaHQ7XG5cdFx0Ym90dG9tID0gcmVtYWluaW5nICogYXZlcmFnZV9oZWlnaHQ7XG5cblx0XHQvLyBwcmV2ZW50IGp1bXBpbmcgaWYgd2Ugc2Nyb2xsZWQgdXAgaW50byB1bmtub3duIHRlcnJpdG9yeVxuXHRcdGlmIChzdGFydCA8IG9sZF9zdGFydCkge1xuXHRcdFx0YXdhaXQgdGljaygpO1xuXG5cdFx0XHRsZXQgZXhwZWN0ZWRfaGVpZ2h0ID0gMDtcblx0XHRcdGxldCBhY3R1YWxfaGVpZ2h0ID0gMDtcblxuXHRcdFx0Zm9yIChsZXQgaSA9IHN0YXJ0OyBpIDwgb2xkX3N0YXJ0OyBpICs9MSkge1xuXHRcdFx0XHRpZiAocm93c1tpIC0gc3RhcnRdKSB7XG5cdFx0XHRcdFx0ZXhwZWN0ZWRfaGVpZ2h0ICs9IGhlaWdodF9tYXBbaV07XG5cdFx0XHRcdFx0YWN0dWFsX2hlaWdodCArPSBpdGVtSGVpZ2h0IHx8IHJvd3NbaSAtIHN0YXJ0XS5vZmZzZXRIZWlnaHQ7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgZCA9IGFjdHVhbF9oZWlnaHQgLSBleHBlY3RlZF9oZWlnaHQ7XG5cdFx0XHR2aWV3cG9ydC5zY3JvbGxUbygwLCBzY3JvbGxUb3AgKyBkKTtcblx0XHR9XG5cblx0XHQvLyBUT0RPIGlmIHdlIG92ZXJlc3RpbWF0ZWQgdGhlIHNwYWNlIHRoZXNlXG5cdFx0Ly8gcm93cyB3b3VsZCBvY2N1cHkgd2UgbWF5IG5lZWQgdG8gYWRkIHNvbWVcblx0XHQvLyBtb3JlLiBtYXliZSB3ZSBjYW4ganVzdCBjYWxsIGhhbmRsZV9zY3JvbGwgYWdhaW4/XG5cdH1cblxuXHQvLyB0cmlnZ2VyIGluaXRpYWwgcmVmcmVzaFxuXHRvbk1vdW50KCgpID0+IHtcblx0XHRyb3dzID0gY29udGVudHMuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3N2ZWx0ZS12aXJ0dWFsLWxpc3Qtcm93Jyk7XG5cdFx0bW91bnRlZCA9IHRydWU7XG5cdH0pO1xuPC9zY3JpcHQ+XG5cbjxzdHlsZT5cblx0c3ZlbHRlLXZpcnR1YWwtbGlzdC12aWV3cG9ydCB7XG5cdFx0cG9zaXRpb246IHJlbGF0aXZlO1xuXHRcdG92ZXJmbG93LXk6IGF1dG87XG5cdFx0LXdlYmtpdC1vdmVyZmxvdy1zY3JvbGxpbmc6dG91Y2g7XG5cdFx0ZGlzcGxheTogYmxvY2s7XG5cdH1cblxuXHRzdmVsdGUtdmlydHVhbC1saXN0LWNvbnRlbnRzLCBzdmVsdGUtdmlydHVhbC1saXN0LXJvdyB7XG5cdFx0ZGlzcGxheTogYmxvY2s7XG5cdH1cblxuXHRzdmVsdGUtdmlydHVhbC1saXN0LXJvdyB7XG5cdFx0b3ZlcmZsb3c6IGhpZGRlbjtcblx0fVxuPC9zdHlsZT5cblxuPHN2ZWx0ZS12aXJ0dWFsLWxpc3Qtdmlld3BvcnRcblx0YmluZDp0aGlzPXt2aWV3cG9ydH1cblx0YmluZDpvZmZzZXRIZWlnaHQ9e3ZpZXdwb3J0X2hlaWdodH1cblx0b246c2Nyb2xsPXtoYW5kbGVfc2Nyb2xsfVxuXHRzdHlsZT1cImhlaWdodDoge2hlaWdodH07XCJcbj5cblx0PHN2ZWx0ZS12aXJ0dWFsLWxpc3QtY29udGVudHNcblx0XHRiaW5kOnRoaXM9e2NvbnRlbnRzfVxuXHRcdHN0eWxlPVwicGFkZGluZy10b3A6IHt0b3B9cHg7IHBhZGRpbmctYm90dG9tOiB7Ym90dG9tfXB4O1wiXG5cdD5cblx0XHR7I2VhY2ggdmlzaWJsZSBhcyByb3cgKHJvdy5pbmRleCl9XG5cdFx0XHQ8c3ZlbHRlLXZpcnR1YWwtbGlzdC1yb3c+XG5cdFx0XHRcdDxzbG90IGl0ZW09e3Jvdy5kYXRhfT5NaXNzaW5nIHRlbXBsYXRlPC9zbG90PlxuXHRcdFx0PC9zdmVsdGUtdmlydHVhbC1saXN0LXJvdz5cblx0XHR7L2VhY2h9XG5cdDwvc3ZlbHRlLXZpcnR1YWwtbGlzdC1jb250ZW50cz5cbjwvc3ZlbHRlLXZpcnR1YWwtbGlzdC12aWV3cG9ydD5cbiIsICIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAwOSBUaGUgQ2xvc3VyZSBMaWJyYXJ5IEF1dGhvcnNcbiAqIENvcHlyaWdodCAyMDIwIERhbmllbCBXaXJ0eiAvIFRoZSBsb25nLmpzIEF1dGhvcnMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuLy8gV2ViQXNzZW1ibHkgb3B0aW1pemF0aW9ucyB0byBkbyBuYXRpdmUgaTY0IG11bHRpcGxpY2F0aW9uIGFuZCBkaXZpZGVcbnZhciB3YXNtID0gbnVsbDtcbnRyeSB7XG4gIHdhc20gPSBuZXcgV2ViQXNzZW1ibHkuSW5zdGFuY2UobmV3IFdlYkFzc2VtYmx5Lk1vZHVsZShuZXcgVWludDhBcnJheShbXG4gICAgMCwgOTcsIDExNSwgMTA5LCAxLCAwLCAwLCAwLCAxLCAxMywgMiwgOTYsIDAsIDEsIDEyNywgOTYsIDQsIDEyNywgMTI3LCAxMjcsIDEyNywgMSwgMTI3LCAzLCA3LCA2LCAwLCAxLCAxLCAxLCAxLCAxLCA2LCA2LCAxLCAxMjcsIDEsIDY1LCAwLCAxMSwgNywgNTAsIDYsIDMsIDEwOSwgMTE3LCAxMDgsIDAsIDEsIDUsIDEwMCwgMTA1LCAxMTgsIDk1LCAxMTUsIDAsIDIsIDUsIDEwMCwgMTA1LCAxMTgsIDk1LCAxMTcsIDAsIDMsIDUsIDExNCwgMTAxLCAxMDksIDk1LCAxMTUsIDAsIDQsIDUsIDExNCwgMTAxLCAxMDksIDk1LCAxMTcsIDAsIDUsIDgsIDEwMywgMTAxLCAxMTYsIDk1LCAxMDQsIDEwNSwgMTAzLCAxMDQsIDAsIDAsIDEwLCAxOTEsIDEsIDYsIDQsIDAsIDM1LCAwLCAxMSwgMzYsIDEsIDEsIDEyNiwgMzIsIDAsIDE3MywgMzIsIDEsIDE3MywgNjYsIDMyLCAxMzQsIDEzMiwgMzIsIDIsIDE3MywgMzIsIDMsIDE3MywgNjYsIDMyLCAxMzQsIDEzMiwgMTI2LCAzNCwgNCwgNjYsIDMyLCAxMzUsIDE2NywgMzYsIDAsIDMyLCA0LCAxNjcsIDExLCAzNiwgMSwgMSwgMTI2LCAzMiwgMCwgMTczLCAzMiwgMSwgMTczLCA2NiwgMzIsIDEzNCwgMTMyLCAzMiwgMiwgMTczLCAzMiwgMywgMTczLCA2NiwgMzIsIDEzNCwgMTMyLCAxMjcsIDM0LCA0LCA2NiwgMzIsIDEzNSwgMTY3LCAzNiwgMCwgMzIsIDQsIDE2NywgMTEsIDM2LCAxLCAxLCAxMjYsIDMyLCAwLCAxNzMsIDMyLCAxLCAxNzMsIDY2LCAzMiwgMTM0LCAxMzIsIDMyLCAyLCAxNzMsIDMyLCAzLCAxNzMsIDY2LCAzMiwgMTM0LCAxMzIsIDEyOCwgMzQsIDQsIDY2LCAzMiwgMTM1LCAxNjcsIDM2LCAwLCAzMiwgNCwgMTY3LCAxMSwgMzYsIDEsIDEsIDEyNiwgMzIsIDAsIDE3MywgMzIsIDEsIDE3MywgNjYsIDMyLCAxMzQsIDEzMiwgMzIsIDIsIDE3MywgMzIsIDMsIDE3MywgNjYsIDMyLCAxMzQsIDEzMiwgMTI5LCAzNCwgNCwgNjYsIDMyLCAxMzUsIDE2NywgMzYsIDAsIDMyLCA0LCAxNjcsIDExLCAzNiwgMSwgMSwgMTI2LCAzMiwgMCwgMTczLCAzMiwgMSwgMTczLCA2NiwgMzIsIDEzNCwgMTMyLCAzMiwgMiwgMTczLCAzMiwgMywgMTczLCA2NiwgMzIsIDEzNCwgMTMyLCAxMzAsIDM0LCA0LCA2NiwgMzIsIDEzNSwgMTY3LCAzNiwgMCwgMzIsIDQsIDE2NywgMTFcbiAgXSkpLCB7fSkuZXhwb3J0cztcbn0gY2F0Y2ggKGUpIHtcbiAgLy8gbm8gd2FzbSBzdXBwb3J0IDooXG59XG5cbi8qKlxuICogQ29uc3RydWN0cyBhIDY0IGJpdCB0d28ncy1jb21wbGVtZW50IGludGVnZXIsIGdpdmVuIGl0cyBsb3cgYW5kIGhpZ2ggMzIgYml0IHZhbHVlcyBhcyAqc2lnbmVkKiBpbnRlZ2Vycy5cbiAqICBTZWUgdGhlIGZyb20qIGZ1bmN0aW9ucyBiZWxvdyBmb3IgbW9yZSBjb252ZW5pZW50IHdheXMgb2YgY29uc3RydWN0aW5nIExvbmdzLlxuICogQGV4cG9ydHMgTG9uZ1xuICogQGNsYXNzIEEgTG9uZyBjbGFzcyBmb3IgcmVwcmVzZW50aW5nIGEgNjQgYml0IHR3bydzLWNvbXBsZW1lbnQgaW50ZWdlciB2YWx1ZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBsb3cgVGhlIGxvdyAoc2lnbmVkKSAzMiBiaXRzIG9mIHRoZSBsb25nXG4gKiBAcGFyYW0ge251bWJlcn0gaGlnaCBUaGUgaGlnaCAoc2lnbmVkKSAzMiBiaXRzIG9mIHRoZSBsb25nXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSB1bnNpZ25lZCBXaGV0aGVyIHVuc2lnbmVkIG9yIG5vdCwgZGVmYXVsdHMgdG8gc2lnbmVkXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gTG9uZyhsb3csIGhpZ2gsIHVuc2lnbmVkKSB7XG5cbiAgLyoqXG4gICAqIFRoZSBsb3cgMzIgYml0cyBhcyBhIHNpZ25lZCB2YWx1ZS5cbiAgICogQHR5cGUge251bWJlcn1cbiAgICovXG4gIHRoaXMubG93ID0gbG93IHwgMDtcblxuICAvKipcbiAgICogVGhlIGhpZ2ggMzIgYml0cyBhcyBhIHNpZ25lZCB2YWx1ZS5cbiAgICogQHR5cGUge251bWJlcn1cbiAgICovXG4gIHRoaXMuaGlnaCA9IGhpZ2ggfCAwO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHVuc2lnbmVkIG9yIG5vdC5cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqL1xuICB0aGlzLnVuc2lnbmVkID0gISF1bnNpZ25lZDtcbn1cblxuLy8gVGhlIGludGVybmFsIHJlcHJlc2VudGF0aW9uIG9mIGEgbG9uZyBpcyB0aGUgdHdvIGdpdmVuIHNpZ25lZCwgMzItYml0IHZhbHVlcy5cbi8vIFdlIHVzZSAzMi1iaXQgcGllY2VzIGJlY2F1c2UgdGhlc2UgYXJlIHRoZSBzaXplIG9mIGludGVnZXJzIG9uIHdoaWNoXG4vLyBKYXZhc2NyaXB0IHBlcmZvcm1zIGJpdC1vcGVyYXRpb25zLiAgRm9yIG9wZXJhdGlvbnMgbGlrZSBhZGRpdGlvbiBhbmRcbi8vIG11bHRpcGxpY2F0aW9uLCB3ZSBzcGxpdCBlYWNoIG51bWJlciBpbnRvIDE2IGJpdCBwaWVjZXMsIHdoaWNoIGNhbiBlYXNpbHkgYmVcbi8vIG11bHRpcGxpZWQgd2l0aGluIEphdmFzY3JpcHQncyBmbG9hdGluZy1wb2ludCByZXByZXNlbnRhdGlvbiB3aXRob3V0IG92ZXJmbG93XG4vLyBvciBjaGFuZ2UgaW4gc2lnbi5cbi8vXG4vLyBJbiB0aGUgYWxnb3JpdGhtcyBiZWxvdywgd2UgZnJlcXVlbnRseSByZWR1Y2UgdGhlIG5lZ2F0aXZlIGNhc2UgdG8gdGhlXG4vLyBwb3NpdGl2ZSBjYXNlIGJ5IG5lZ2F0aW5nIHRoZSBpbnB1dChzKSBhbmQgdGhlbiBwb3N0LXByb2Nlc3NpbmcgdGhlIHJlc3VsdC5cbi8vIE5vdGUgdGhhdCB3ZSBtdXN0IEFMV0FZUyBjaGVjayBzcGVjaWFsbHkgd2hldGhlciB0aG9zZSB2YWx1ZXMgYXJlIE1JTl9WQUxVRVxuLy8gKC0yXjYzKSBiZWNhdXNlIC1NSU5fVkFMVUUgPT0gTUlOX1ZBTFVFIChzaW5jZSAyXjYzIGNhbm5vdCBiZSByZXByZXNlbnRlZCBhc1xuLy8gYSBwb3NpdGl2ZSBudW1iZXIsIGl0IG92ZXJmbG93cyBiYWNrIGludG8gYSBuZWdhdGl2ZSkuICBOb3QgaGFuZGxpbmcgdGhpc1xuLy8gY2FzZSB3b3VsZCBvZnRlbiByZXN1bHQgaW4gaW5maW5pdGUgcmVjdXJzaW9uLlxuLy9cbi8vIENvbW1vbiBjb25zdGFudCB2YWx1ZXMgWkVSTywgT05FLCBORUdfT05FLCBldGMuIGFyZSBkZWZpbmVkIGJlbG93IHRoZSBmcm9tKlxuLy8gbWV0aG9kcyBvbiB3aGljaCB0aGV5IGRlcGVuZC5cblxuLyoqXG4gKiBBbiBpbmRpY2F0b3IgdXNlZCB0byByZWxpYWJseSBkZXRlcm1pbmUgaWYgYW4gb2JqZWN0IGlzIGEgTG9uZyBvciBub3QuXG4gKiBAdHlwZSB7Ym9vbGVhbn1cbiAqIEBjb25zdFxuICogQHByaXZhdGVcbiAqL1xuTG9uZy5wcm90b3R5cGUuX19pc0xvbmdfXztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KExvbmcucHJvdG90eXBlLCBcIl9faXNMb25nX19cIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7Kn0gb2JqIE9iamVjdFxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKiBAaW5uZXJcbiAqL1xuZnVuY3Rpb24gaXNMb25nKG9iaikge1xuICByZXR1cm4gKG9iaiAmJiBvYmpbXCJfX2lzTG9uZ19fXCJdKSA9PT0gdHJ1ZTtcbn1cblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgbnVtYmVyXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICogQGlubmVyXG4gKi9cbmZ1bmN0aW9uIGN0ejMyKHZhbHVlKSB7XG4gIHZhciBjID0gTWF0aC5jbHozMih2YWx1ZSAmIC12YWx1ZSk7XG4gIHJldHVybiB2YWx1ZSA/IDMxIC0gYyA6IGM7XG59XG5cbi8qKlxuICogVGVzdHMgaWYgdGhlIHNwZWNpZmllZCBvYmplY3QgaXMgYSBMb25nLlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0geyp9IG9iaiBPYmplY3RcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5Mb25nLmlzTG9uZyA9IGlzTG9uZztcblxuLyoqXG4gKiBBIGNhY2hlIG9mIHRoZSBMb25nIHJlcHJlc2VudGF0aW9ucyBvZiBzbWFsbCBpbnRlZ2VyIHZhbHVlcy5cbiAqIEB0eXBlIHshT2JqZWN0fVxuICogQGlubmVyXG4gKi9cbnZhciBJTlRfQ0FDSEUgPSB7fTtcblxuLyoqXG4gKiBBIGNhY2hlIG9mIHRoZSBMb25nIHJlcHJlc2VudGF0aW9ucyBvZiBzbWFsbCB1bnNpZ25lZCBpbnRlZ2VyIHZhbHVlcy5cbiAqIEB0eXBlIHshT2JqZWN0fVxuICogQGlubmVyXG4gKi9cbnZhciBVSU5UX0NBQ0hFID0ge307XG5cbi8qKlxuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSB1bnNpZ25lZFxuICogQHJldHVybnMgeyFMb25nfVxuICogQGlubmVyXG4gKi9cbmZ1bmN0aW9uIGZyb21JbnQodmFsdWUsIHVuc2lnbmVkKSB7XG4gIHZhciBvYmosIGNhY2hlZE9iaiwgY2FjaGU7XG4gIGlmICh1bnNpZ25lZCkge1xuICAgIHZhbHVlID4+Pj0gMDtcbiAgICBpZiAoY2FjaGUgPSAoMCA8PSB2YWx1ZSAmJiB2YWx1ZSA8IDI1NikpIHtcbiAgICAgIGNhY2hlZE9iaiA9IFVJTlRfQ0FDSEVbdmFsdWVdO1xuICAgICAgaWYgKGNhY2hlZE9iailcbiAgICAgICAgcmV0dXJuIGNhY2hlZE9iajtcbiAgICB9XG4gICAgb2JqID0gZnJvbUJpdHModmFsdWUsIDAsIHRydWUpO1xuICAgIGlmIChjYWNoZSlcbiAgICAgIFVJTlRfQ0FDSEVbdmFsdWVdID0gb2JqO1xuICAgIHJldHVybiBvYmo7XG4gIH0gZWxzZSB7XG4gICAgdmFsdWUgfD0gMDtcbiAgICBpZiAoY2FjaGUgPSAoLTEyOCA8PSB2YWx1ZSAmJiB2YWx1ZSA8IDEyOCkpIHtcbiAgICAgIGNhY2hlZE9iaiA9IElOVF9DQUNIRVt2YWx1ZV07XG4gICAgICBpZiAoY2FjaGVkT2JqKVxuICAgICAgICByZXR1cm4gY2FjaGVkT2JqO1xuICAgIH1cbiAgICBvYmogPSBmcm9tQml0cyh2YWx1ZSwgdmFsdWUgPCAwID8gLTEgOiAwLCBmYWxzZSk7XG4gICAgaWYgKGNhY2hlKVxuICAgICAgSU5UX0NBQ0hFW3ZhbHVlXSA9IG9iajtcbiAgICByZXR1cm4gb2JqO1xuICB9XG59XG5cbi8qKlxuICogUmV0dXJucyBhIExvbmcgcmVwcmVzZW50aW5nIHRoZSBnaXZlbiAzMiBiaXQgaW50ZWdlciB2YWx1ZS5cbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIFRoZSAzMiBiaXQgaW50ZWdlciBpbiBxdWVzdGlvblxuICogQHBhcmFtIHtib29sZWFuPX0gdW5zaWduZWQgV2hldGhlciB1bnNpZ25lZCBvciBub3QsIGRlZmF1bHRzIHRvIHNpZ25lZFxuICogQHJldHVybnMgeyFMb25nfSBUaGUgY29ycmVzcG9uZGluZyBMb25nIHZhbHVlXG4gKi9cbkxvbmcuZnJvbUludCA9IGZyb21JbnQ7XG5cbi8qKlxuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSB1bnNpZ25lZFxuICogQHJldHVybnMgeyFMb25nfVxuICogQGlubmVyXG4gKi9cbmZ1bmN0aW9uIGZyb21OdW1iZXIodmFsdWUsIHVuc2lnbmVkKSB7XG4gIGlmIChpc05hTih2YWx1ZSkpXG4gICAgcmV0dXJuIHVuc2lnbmVkID8gVVpFUk8gOiBaRVJPO1xuICBpZiAodW5zaWduZWQpIHtcbiAgICBpZiAodmFsdWUgPCAwKVxuICAgICAgcmV0dXJuIFVaRVJPO1xuICAgIGlmICh2YWx1ZSA+PSBUV09fUFdSXzY0X0RCTClcbiAgICAgIHJldHVybiBNQVhfVU5TSUdORURfVkFMVUU7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHZhbHVlIDw9IC1UV09fUFdSXzYzX0RCTClcbiAgICAgIHJldHVybiBNSU5fVkFMVUU7XG4gICAgaWYgKHZhbHVlICsgMSA+PSBUV09fUFdSXzYzX0RCTClcbiAgICAgIHJldHVybiBNQVhfVkFMVUU7XG4gIH1cbiAgaWYgKHZhbHVlIDwgMClcbiAgICByZXR1cm4gZnJvbU51bWJlcigtdmFsdWUsIHVuc2lnbmVkKS5uZWcoKTtcbiAgcmV0dXJuIGZyb21CaXRzKCh2YWx1ZSAlIFRXT19QV1JfMzJfREJMKSB8IDAsICh2YWx1ZSAvIFRXT19QV1JfMzJfREJMKSB8IDAsIHVuc2lnbmVkKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgTG9uZyByZXByZXNlbnRpbmcgdGhlIGdpdmVuIHZhbHVlLCBwcm92aWRlZCB0aGF0IGl0IGlzIGEgZmluaXRlIG51bWJlci4gT3RoZXJ3aXNlLCB6ZXJvIGlzIHJldHVybmVkLlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgVGhlIG51bWJlciBpbiBxdWVzdGlvblxuICogQHBhcmFtIHtib29sZWFuPX0gdW5zaWduZWQgV2hldGhlciB1bnNpZ25lZCBvciBub3QsIGRlZmF1bHRzIHRvIHNpZ25lZFxuICogQHJldHVybnMgeyFMb25nfSBUaGUgY29ycmVzcG9uZGluZyBMb25nIHZhbHVlXG4gKi9cbkxvbmcuZnJvbU51bWJlciA9IGZyb21OdW1iZXI7XG5cbi8qKlxuICogQHBhcmFtIHtudW1iZXJ9IGxvd0JpdHNcbiAqIEBwYXJhbSB7bnVtYmVyfSBoaWdoQml0c1xuICogQHBhcmFtIHtib29sZWFuPX0gdW5zaWduZWRcbiAqIEByZXR1cm5zIHshTG9uZ31cbiAqIEBpbm5lclxuICovXG5mdW5jdGlvbiBmcm9tQml0cyhsb3dCaXRzLCBoaWdoQml0cywgdW5zaWduZWQpIHtcbiAgcmV0dXJuIG5ldyBMb25nKGxvd0JpdHMsIGhpZ2hCaXRzLCB1bnNpZ25lZCk7XG59XG5cbi8qKlxuICogUmV0dXJucyBhIExvbmcgcmVwcmVzZW50aW5nIHRoZSA2NCBiaXQgaW50ZWdlciB0aGF0IGNvbWVzIGJ5IGNvbmNhdGVuYXRpbmcgdGhlIGdpdmVuIGxvdyBhbmQgaGlnaCBiaXRzLiBFYWNoIGlzXG4gKiAgYXNzdW1lZCB0byB1c2UgMzIgYml0cy5cbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtudW1iZXJ9IGxvd0JpdHMgVGhlIGxvdyAzMiBiaXRzXG4gKiBAcGFyYW0ge251bWJlcn0gaGlnaEJpdHMgVGhlIGhpZ2ggMzIgYml0c1xuICogQHBhcmFtIHtib29sZWFuPX0gdW5zaWduZWQgV2hldGhlciB1bnNpZ25lZCBvciBub3QsIGRlZmF1bHRzIHRvIHNpZ25lZFxuICogQHJldHVybnMgeyFMb25nfSBUaGUgY29ycmVzcG9uZGluZyBMb25nIHZhbHVlXG4gKi9cbkxvbmcuZnJvbUJpdHMgPSBmcm9tQml0cztcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyfSBiYXNlXG4gKiBAcGFyYW0ge251bWJlcn0gZXhwb25lbnRcbiAqIEByZXR1cm5zIHtudW1iZXJ9XG4gKiBAaW5uZXJcbiAqL1xudmFyIHBvd19kYmwgPSBNYXRoLnBvdzsgLy8gVXNlZCA0IHRpbWVzICg0KjggdG8gMTUrNClcblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyXG4gKiBAcGFyYW0geyhib29sZWFufG51bWJlcik9fSB1bnNpZ25lZFxuICogQHBhcmFtIHtudW1iZXI9fSByYWRpeFxuICogQHJldHVybnMgeyFMb25nfVxuICogQGlubmVyXG4gKi9cbmZ1bmN0aW9uIGZyb21TdHJpbmcoc3RyLCB1bnNpZ25lZCwgcmFkaXgpIHtcbiAgaWYgKHN0ci5sZW5ndGggPT09IDApXG4gICAgdGhyb3cgRXJyb3IoJ2VtcHR5IHN0cmluZycpO1xuICBpZiAodHlwZW9mIHVuc2lnbmVkID09PSAnbnVtYmVyJykge1xuICAgIC8vIEZvciBnb29nLm1hdGgubG9uZyBjb21wYXRpYmlsaXR5XG4gICAgcmFkaXggPSB1bnNpZ25lZDtcbiAgICB1bnNpZ25lZCA9IGZhbHNlO1xuICB9IGVsc2Uge1xuICAgIHVuc2lnbmVkID0gISF1bnNpZ25lZDtcbiAgfVxuICBpZiAoc3RyID09PSBcIk5hTlwiIHx8IHN0ciA9PT0gXCJJbmZpbml0eVwiIHx8IHN0ciA9PT0gXCIrSW5maW5pdHlcIiB8fCBzdHIgPT09IFwiLUluZmluaXR5XCIpXG4gICAgcmV0dXJuIHVuc2lnbmVkID8gVVpFUk8gOiBaRVJPO1xuICByYWRpeCA9IHJhZGl4IHx8IDEwO1xuICBpZiAocmFkaXggPCAyIHx8IDM2IDwgcmFkaXgpXG4gICAgdGhyb3cgUmFuZ2VFcnJvcigncmFkaXgnKTtcblxuICB2YXIgcDtcbiAgaWYgKChwID0gc3RyLmluZGV4T2YoJy0nKSkgPiAwKVxuICAgIHRocm93IEVycm9yKCdpbnRlcmlvciBoeXBoZW4nKTtcbiAgZWxzZSBpZiAocCA9PT0gMCkge1xuICAgIHJldHVybiBmcm9tU3RyaW5nKHN0ci5zdWJzdHJpbmcoMSksIHVuc2lnbmVkLCByYWRpeCkubmVnKCk7XG4gIH1cblxuICAvLyBEbyBzZXZlcmFsICg4KSBkaWdpdHMgZWFjaCB0aW1lIHRocm91Z2ggdGhlIGxvb3AsIHNvIGFzIHRvXG4gIC8vIG1pbmltaXplIHRoZSBjYWxscyB0byB0aGUgdmVyeSBleHBlbnNpdmUgZW11bGF0ZWQgZGl2LlxuICB2YXIgcmFkaXhUb1Bvd2VyID0gZnJvbU51bWJlcihwb3dfZGJsKHJhZGl4LCA4KSk7XG5cbiAgdmFyIHJlc3VsdCA9IFpFUk87XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSArPSA4KSB7XG4gICAgdmFyIHNpemUgPSBNYXRoLm1pbig4LCBzdHIubGVuZ3RoIC0gaSksXG4gICAgICB2YWx1ZSA9IHBhcnNlSW50KHN0ci5zdWJzdHJpbmcoaSwgaSArIHNpemUpLCByYWRpeCk7XG4gICAgaWYgKHNpemUgPCA4KSB7XG4gICAgICB2YXIgcG93ZXIgPSBmcm9tTnVtYmVyKHBvd19kYmwocmFkaXgsIHNpemUpKTtcbiAgICAgIHJlc3VsdCA9IHJlc3VsdC5tdWwocG93ZXIpLmFkZChmcm9tTnVtYmVyKHZhbHVlKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdCA9IHJlc3VsdC5tdWwocmFkaXhUb1Bvd2VyKTtcbiAgICAgIHJlc3VsdCA9IHJlc3VsdC5hZGQoZnJvbU51bWJlcih2YWx1ZSkpO1xuICAgIH1cbiAgfVxuICByZXN1bHQudW5zaWduZWQgPSB1bnNpZ25lZDtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgTG9uZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgZ2l2ZW4gc3RyaW5nLCB3cml0dGVuIHVzaW5nIHRoZSBzcGVjaWZpZWQgcmFkaXguXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgVGhlIHRleHR1YWwgcmVwcmVzZW50YXRpb24gb2YgdGhlIExvbmdcbiAqIEBwYXJhbSB7KGJvb2xlYW58bnVtYmVyKT19IHVuc2lnbmVkIFdoZXRoZXIgdW5zaWduZWQgb3Igbm90LCBkZWZhdWx0cyB0byBzaWduZWRcbiAqIEBwYXJhbSB7bnVtYmVyPX0gcmFkaXggVGhlIHJhZGl4IGluIHdoaWNoIHRoZSB0ZXh0IGlzIHdyaXR0ZW4gKDItMzYpLCBkZWZhdWx0cyB0byAxMFxuICogQHJldHVybnMgeyFMb25nfSBUaGUgY29ycmVzcG9uZGluZyBMb25nIHZhbHVlXG4gKi9cbkxvbmcuZnJvbVN0cmluZyA9IGZyb21TdHJpbmc7XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0geyFMb25nfG51bWJlcnxzdHJpbmd8IXtsb3c6IG51bWJlciwgaGlnaDogbnVtYmVyLCB1bnNpZ25lZDogYm9vbGVhbn19IHZhbFxuICogQHBhcmFtIHtib29sZWFuPX0gdW5zaWduZWRcbiAqIEByZXR1cm5zIHshTG9uZ31cbiAqIEBpbm5lclxuICovXG5mdW5jdGlvbiBmcm9tVmFsdWUodmFsLCB1bnNpZ25lZCkge1xuICBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpXG4gICAgcmV0dXJuIGZyb21OdW1iZXIodmFsLCB1bnNpZ25lZCk7XG4gIGlmICh0eXBlb2YgdmFsID09PSAnc3RyaW5nJylcbiAgICByZXR1cm4gZnJvbVN0cmluZyh2YWwsIHVuc2lnbmVkKTtcbiAgLy8gVGhyb3dzIGZvciBub24tb2JqZWN0cywgY29udmVydHMgbm9uLWluc3RhbmNlb2YgTG9uZzpcbiAgcmV0dXJuIGZyb21CaXRzKHZhbC5sb3csIHZhbC5oaWdoLCB0eXBlb2YgdW5zaWduZWQgPT09ICdib29sZWFuJyA/IHVuc2lnbmVkIDogdmFsLnVuc2lnbmVkKTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyB0aGUgc3BlY2lmaWVkIHZhbHVlIHRvIGEgTG9uZyB1c2luZyB0aGUgYXBwcm9wcmlhdGUgZnJvbSogZnVuY3Rpb24gZm9yIGl0cyB0eXBlLlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0geyFMb25nfG51bWJlcnxzdHJpbmd8IXtsb3c6IG51bWJlciwgaGlnaDogbnVtYmVyLCB1bnNpZ25lZDogYm9vbGVhbn19IHZhbCBWYWx1ZVxuICogQHBhcmFtIHtib29sZWFuPX0gdW5zaWduZWQgV2hldGhlciB1bnNpZ25lZCBvciBub3QsIGRlZmF1bHRzIHRvIHNpZ25lZFxuICogQHJldHVybnMgeyFMb25nfVxuICovXG5Mb25nLmZyb21WYWx1ZSA9IGZyb21WYWx1ZTtcblxuLy8gTk9URTogdGhlIGNvbXBpbGVyIHNob3VsZCBpbmxpbmUgdGhlc2UgY29uc3RhbnQgdmFsdWVzIGJlbG93IGFuZCB0aGVuIHJlbW92ZSB0aGVzZSB2YXJpYWJsZXMsIHNvIHRoZXJlIHNob3VsZCBiZVxuLy8gbm8gcnVudGltZSBwZW5hbHR5IGZvciB0aGVzZS5cblxuLyoqXG4gKiBAdHlwZSB7bnVtYmVyfVxuICogQGNvbnN0XG4gKiBAaW5uZXJcbiAqL1xudmFyIFRXT19QV1JfMTZfREJMID0gMSA8PCAxNjtcblxuLyoqXG4gKiBAdHlwZSB7bnVtYmVyfVxuICogQGNvbnN0XG4gKiBAaW5uZXJcbiAqL1xudmFyIFRXT19QV1JfMjRfREJMID0gMSA8PCAyNDtcblxuLyoqXG4gKiBAdHlwZSB7bnVtYmVyfVxuICogQGNvbnN0XG4gKiBAaW5uZXJcbiAqL1xudmFyIFRXT19QV1JfMzJfREJMID0gVFdPX1BXUl8xNl9EQkwgKiBUV09fUFdSXzE2X0RCTDtcblxuLyoqXG4gKiBAdHlwZSB7bnVtYmVyfVxuICogQGNvbnN0XG4gKiBAaW5uZXJcbiAqL1xudmFyIFRXT19QV1JfNjRfREJMID0gVFdPX1BXUl8zMl9EQkwgKiBUV09fUFdSXzMyX0RCTDtcblxuLyoqXG4gKiBAdHlwZSB7bnVtYmVyfVxuICogQGNvbnN0XG4gKiBAaW5uZXJcbiAqL1xudmFyIFRXT19QV1JfNjNfREJMID0gVFdPX1BXUl82NF9EQkwgLyAyO1xuXG4vKipcbiAqIEB0eXBlIHshTG9uZ31cbiAqIEBjb25zdFxuICogQGlubmVyXG4gKi9cbnZhciBUV09fUFdSXzI0ID0gZnJvbUludChUV09fUFdSXzI0X0RCTCk7XG5cbi8qKlxuICogQHR5cGUgeyFMb25nfVxuICogQGlubmVyXG4gKi9cbnZhciBaRVJPID0gZnJvbUludCgwKTtcblxuLyoqXG4gKiBTaWduZWQgemVyby5cbiAqIEB0eXBlIHshTG9uZ31cbiAqL1xuTG9uZy5aRVJPID0gWkVSTztcblxuLyoqXG4gKiBAdHlwZSB7IUxvbmd9XG4gKiBAaW5uZXJcbiAqL1xudmFyIFVaRVJPID0gZnJvbUludCgwLCB0cnVlKTtcblxuLyoqXG4gKiBVbnNpZ25lZCB6ZXJvLlxuICogQHR5cGUgeyFMb25nfVxuICovXG5Mb25nLlVaRVJPID0gVVpFUk87XG5cbi8qKlxuICogQHR5cGUgeyFMb25nfVxuICogQGlubmVyXG4gKi9cbnZhciBPTkUgPSBmcm9tSW50KDEpO1xuXG4vKipcbiAqIFNpZ25lZCBvbmUuXG4gKiBAdHlwZSB7IUxvbmd9XG4gKi9cbkxvbmcuT05FID0gT05FO1xuXG4vKipcbiAqIEB0eXBlIHshTG9uZ31cbiAqIEBpbm5lclxuICovXG52YXIgVU9ORSA9IGZyb21JbnQoMSwgdHJ1ZSk7XG5cbi8qKlxuICogVW5zaWduZWQgb25lLlxuICogQHR5cGUgeyFMb25nfVxuICovXG5Mb25nLlVPTkUgPSBVT05FO1xuXG4vKipcbiAqIEB0eXBlIHshTG9uZ31cbiAqIEBpbm5lclxuICovXG52YXIgTkVHX09ORSA9IGZyb21JbnQoLTEpO1xuXG4vKipcbiAqIFNpZ25lZCBuZWdhdGl2ZSBvbmUuXG4gKiBAdHlwZSB7IUxvbmd9XG4gKi9cbkxvbmcuTkVHX09ORSA9IE5FR19PTkU7XG5cbi8qKlxuICogQHR5cGUgeyFMb25nfVxuICogQGlubmVyXG4gKi9cbnZhciBNQVhfVkFMVUUgPSBmcm9tQml0cygweEZGRkZGRkZGIHwgMCwgMHg3RkZGRkZGRiB8IDAsIGZhbHNlKTtcblxuLyoqXG4gKiBNYXhpbXVtIHNpZ25lZCB2YWx1ZS5cbiAqIEB0eXBlIHshTG9uZ31cbiAqL1xuTG9uZy5NQVhfVkFMVUUgPSBNQVhfVkFMVUU7XG5cbi8qKlxuICogQHR5cGUgeyFMb25nfVxuICogQGlubmVyXG4gKi9cbnZhciBNQVhfVU5TSUdORURfVkFMVUUgPSBmcm9tQml0cygweEZGRkZGRkZGIHwgMCwgMHhGRkZGRkZGRiB8IDAsIHRydWUpO1xuXG4vKipcbiAqIE1heGltdW0gdW5zaWduZWQgdmFsdWUuXG4gKiBAdHlwZSB7IUxvbmd9XG4gKi9cbkxvbmcuTUFYX1VOU0lHTkVEX1ZBTFVFID0gTUFYX1VOU0lHTkVEX1ZBTFVFO1xuXG4vKipcbiAqIEB0eXBlIHshTG9uZ31cbiAqIEBpbm5lclxuICovXG52YXIgTUlOX1ZBTFVFID0gZnJvbUJpdHMoMCwgMHg4MDAwMDAwMCB8IDAsIGZhbHNlKTtcblxuLyoqXG4gKiBNaW5pbXVtIHNpZ25lZCB2YWx1ZS5cbiAqIEB0eXBlIHshTG9uZ31cbiAqL1xuTG9uZy5NSU5fVkFMVUUgPSBNSU5fVkFMVUU7XG5cbi8qKlxuICogQGFsaWFzIExvbmcucHJvdG90eXBlXG4gKiBAaW5uZXJcbiAqL1xudmFyIExvbmdQcm90b3R5cGUgPSBMb25nLnByb3RvdHlwZTtcblxuLyoqXG4gKiBDb252ZXJ0cyB0aGUgTG9uZyB0byBhIDMyIGJpdCBpbnRlZ2VyLCBhc3N1bWluZyBpdCBpcyBhIDMyIGJpdCBpbnRlZ2VyLlxuICogQHRoaXMgeyFMb25nfVxuICogQHJldHVybnMge251bWJlcn1cbiAqL1xuTG9uZ1Byb3RvdHlwZS50b0ludCA9IGZ1bmN0aW9uIHRvSW50KCkge1xuICByZXR1cm4gdGhpcy51bnNpZ25lZCA/IHRoaXMubG93ID4+PiAwIDogdGhpcy5sb3c7XG59O1xuXG4vKipcbiAqIENvbnZlcnRzIHRoZSBMb25nIHRvIGEgdGhlIG5lYXJlc3QgZmxvYXRpbmctcG9pbnQgcmVwcmVzZW50YXRpb24gb2YgdGhpcyB2YWx1ZSAoZG91YmxlLCA1MyBiaXQgbWFudGlzc2EpLlxuICogQHRoaXMgeyFMb25nfVxuICogQHJldHVybnMge251bWJlcn1cbiAqL1xuTG9uZ1Byb3RvdHlwZS50b051bWJlciA9IGZ1bmN0aW9uIHRvTnVtYmVyKCkge1xuICBpZiAodGhpcy51bnNpZ25lZClcbiAgICByZXR1cm4gKCh0aGlzLmhpZ2ggPj4+IDApICogVFdPX1BXUl8zMl9EQkwpICsgKHRoaXMubG93ID4+PiAwKTtcbiAgcmV0dXJuIHRoaXMuaGlnaCAqIFRXT19QV1JfMzJfREJMICsgKHRoaXMubG93ID4+PiAwKTtcbn07XG5cbi8qKlxuICogQ29udmVydHMgdGhlIExvbmcgdG8gYSBzdHJpbmcgd3JpdHRlbiBpbiB0aGUgc3BlY2lmaWVkIHJhZGl4LlxuICogQHRoaXMgeyFMb25nfVxuICogQHBhcmFtIHtudW1iZXI9fSByYWRpeCBSYWRpeCAoMi0zNiksIGRlZmF1bHRzIHRvIDEwXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICogQG92ZXJyaWRlXG4gKiBAdGhyb3dzIHtSYW5nZUVycm9yfSBJZiBgcmFkaXhgIGlzIG91dCBvZiByYW5nZVxuICovXG5Mb25nUHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcocmFkaXgpIHtcbiAgcmFkaXggPSByYWRpeCB8fCAxMDtcbiAgaWYgKHJhZGl4IDwgMiB8fCAzNiA8IHJhZGl4KVxuICAgIHRocm93IFJhbmdlRXJyb3IoJ3JhZGl4Jyk7XG4gIGlmICh0aGlzLmlzWmVybygpKVxuICAgIHJldHVybiAnMCc7XG4gIGlmICh0aGlzLmlzTmVnYXRpdmUoKSkgeyAvLyBVbnNpZ25lZCBMb25ncyBhcmUgbmV2ZXIgbmVnYXRpdmVcbiAgICBpZiAodGhpcy5lcShNSU5fVkFMVUUpKSB7XG4gICAgICAvLyBXZSBuZWVkIHRvIGNoYW5nZSB0aGUgTG9uZyB2YWx1ZSBiZWZvcmUgaXQgY2FuIGJlIG5lZ2F0ZWQsIHNvIHdlIHJlbW92ZVxuICAgICAgLy8gdGhlIGJvdHRvbS1tb3N0IGRpZ2l0IGluIHRoaXMgYmFzZSBhbmQgdGhlbiByZWN1cnNlIHRvIGRvIHRoZSByZXN0LlxuICAgICAgdmFyIHJhZGl4TG9uZyA9IGZyb21OdW1iZXIocmFkaXgpLFxuICAgICAgICBkaXYgPSB0aGlzLmRpdihyYWRpeExvbmcpLFxuICAgICAgICByZW0xID0gZGl2Lm11bChyYWRpeExvbmcpLnN1Yih0aGlzKTtcbiAgICAgIHJldHVybiBkaXYudG9TdHJpbmcocmFkaXgpICsgcmVtMS50b0ludCgpLnRvU3RyaW5nKHJhZGl4KTtcbiAgICB9IGVsc2VcbiAgICAgIHJldHVybiAnLScgKyB0aGlzLm5lZygpLnRvU3RyaW5nKHJhZGl4KTtcbiAgfVxuXG4gIC8vIERvIHNldmVyYWwgKDYpIGRpZ2l0cyBlYWNoIHRpbWUgdGhyb3VnaCB0aGUgbG9vcCwgc28gYXMgdG9cbiAgLy8gbWluaW1pemUgdGhlIGNhbGxzIHRvIHRoZSB2ZXJ5IGV4cGVuc2l2ZSBlbXVsYXRlZCBkaXYuXG4gIHZhciByYWRpeFRvUG93ZXIgPSBmcm9tTnVtYmVyKHBvd19kYmwocmFkaXgsIDYpLCB0aGlzLnVuc2lnbmVkKSxcbiAgICByZW0gPSB0aGlzO1xuICB2YXIgcmVzdWx0ID0gJyc7XG4gIHdoaWxlICh0cnVlKSB7XG4gICAgdmFyIHJlbURpdiA9IHJlbS5kaXYocmFkaXhUb1Bvd2VyKSxcbiAgICAgIGludHZhbCA9IHJlbS5zdWIocmVtRGl2Lm11bChyYWRpeFRvUG93ZXIpKS50b0ludCgpID4+PiAwLFxuICAgICAgZGlnaXRzID0gaW50dmFsLnRvU3RyaW5nKHJhZGl4KTtcbiAgICByZW0gPSByZW1EaXY7XG4gICAgaWYgKHJlbS5pc1plcm8oKSlcbiAgICAgIHJldHVybiBkaWdpdHMgKyByZXN1bHQ7XG4gICAgZWxzZSB7XG4gICAgICB3aGlsZSAoZGlnaXRzLmxlbmd0aCA8IDYpXG4gICAgICAgIGRpZ2l0cyA9ICcwJyArIGRpZ2l0cztcbiAgICAgIHJlc3VsdCA9ICcnICsgZGlnaXRzICsgcmVzdWx0O1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBHZXRzIHRoZSBoaWdoIDMyIGJpdHMgYXMgYSBzaWduZWQgaW50ZWdlci5cbiAqIEB0aGlzIHshTG9uZ31cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFNpZ25lZCBoaWdoIGJpdHNcbiAqL1xuTG9uZ1Byb3RvdHlwZS5nZXRIaWdoQml0cyA9IGZ1bmN0aW9uIGdldEhpZ2hCaXRzKCkge1xuICByZXR1cm4gdGhpcy5oaWdoO1xufTtcblxuLyoqXG4gKiBHZXRzIHRoZSBoaWdoIDMyIGJpdHMgYXMgYW4gdW5zaWduZWQgaW50ZWdlci5cbiAqIEB0aGlzIHshTG9uZ31cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFVuc2lnbmVkIGhpZ2ggYml0c1xuICovXG5Mb25nUHJvdG90eXBlLmdldEhpZ2hCaXRzVW5zaWduZWQgPSBmdW5jdGlvbiBnZXRIaWdoQml0c1Vuc2lnbmVkKCkge1xuICByZXR1cm4gdGhpcy5oaWdoID4+PiAwO1xufTtcblxuLyoqXG4gKiBHZXRzIHRoZSBsb3cgMzIgYml0cyBhcyBhIHNpZ25lZCBpbnRlZ2VyLlxuICogQHRoaXMgeyFMb25nfVxuICogQHJldHVybnMge251bWJlcn0gU2lnbmVkIGxvdyBiaXRzXG4gKi9cbkxvbmdQcm90b3R5cGUuZ2V0TG93Qml0cyA9IGZ1bmN0aW9uIGdldExvd0JpdHMoKSB7XG4gIHJldHVybiB0aGlzLmxvdztcbn07XG5cbi8qKlxuICogR2V0cyB0aGUgbG93IDMyIGJpdHMgYXMgYW4gdW5zaWduZWQgaW50ZWdlci5cbiAqIEB0aGlzIHshTG9uZ31cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFVuc2lnbmVkIGxvdyBiaXRzXG4gKi9cbkxvbmdQcm90b3R5cGUuZ2V0TG93Qml0c1Vuc2lnbmVkID0gZnVuY3Rpb24gZ2V0TG93Qml0c1Vuc2lnbmVkKCkge1xuICByZXR1cm4gdGhpcy5sb3cgPj4+IDA7XG59O1xuXG4vKipcbiAqIEdldHMgdGhlIG51bWJlciBvZiBiaXRzIG5lZWRlZCB0byByZXByZXNlbnQgdGhlIGFic29sdXRlIHZhbHVlIG9mIHRoaXMgTG9uZy5cbiAqIEB0aGlzIHshTG9uZ31cbiAqIEByZXR1cm5zIHtudW1iZXJ9XG4gKi9cbkxvbmdQcm90b3R5cGUuZ2V0TnVtQml0c0FicyA9IGZ1bmN0aW9uIGdldE51bUJpdHNBYnMoKSB7XG4gIGlmICh0aGlzLmlzTmVnYXRpdmUoKSkgLy8gVW5zaWduZWQgTG9uZ3MgYXJlIG5ldmVyIG5lZ2F0aXZlXG4gICAgcmV0dXJuIHRoaXMuZXEoTUlOX1ZBTFVFKSA/IDY0IDogdGhpcy5uZWcoKS5nZXROdW1CaXRzQWJzKCk7XG4gIHZhciB2YWwgPSB0aGlzLmhpZ2ggIT0gMCA/IHRoaXMuaGlnaCA6IHRoaXMubG93O1xuICBmb3IgKHZhciBiaXQgPSAzMTsgYml0ID4gMDsgYml0LS0pXG4gICAgaWYgKCh2YWwgJiAoMSA8PCBiaXQpKSAhPSAwKVxuICAgICAgYnJlYWs7XG4gIHJldHVybiB0aGlzLmhpZ2ggIT0gMCA/IGJpdCArIDMzIDogYml0ICsgMTtcbn07XG5cbi8qKlxuICogVGVzdHMgaWYgdGhpcyBMb25nJ3MgdmFsdWUgZXF1YWxzIHplcm8uXG4gKiBAdGhpcyB7IUxvbmd9XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuTG9uZ1Byb3RvdHlwZS5pc1plcm8gPSBmdW5jdGlvbiBpc1plcm8oKSB7XG4gIHJldHVybiB0aGlzLmhpZ2ggPT09IDAgJiYgdGhpcy5sb3cgPT09IDA7XG59O1xuXG4vKipcbiAqIFRlc3RzIGlmIHRoaXMgTG9uZydzIHZhbHVlIGVxdWFscyB6ZXJvLiBUaGlzIGlzIGFuIGFsaWFzIG9mIHtAbGluayBMb25nI2lzWmVyb30uXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuTG9uZ1Byb3RvdHlwZS5lcXogPSBMb25nUHJvdG90eXBlLmlzWmVybztcblxuLyoqXG4gKiBUZXN0cyBpZiB0aGlzIExvbmcncyB2YWx1ZSBpcyBuZWdhdGl2ZS5cbiAqIEB0aGlzIHshTG9uZ31cbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5Mb25nUHJvdG90eXBlLmlzTmVnYXRpdmUgPSBmdW5jdGlvbiBpc05lZ2F0aXZlKCkge1xuICByZXR1cm4gIXRoaXMudW5zaWduZWQgJiYgdGhpcy5oaWdoIDwgMDtcbn07XG5cbi8qKlxuICogVGVzdHMgaWYgdGhpcyBMb25nJ3MgdmFsdWUgaXMgcG9zaXRpdmUgb3IgemVyby5cbiAqIEB0aGlzIHshTG9uZ31cbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5Mb25nUHJvdG90eXBlLmlzUG9zaXRpdmUgPSBmdW5jdGlvbiBpc1Bvc2l0aXZlKCkge1xuICByZXR1cm4gdGhpcy51bnNpZ25lZCB8fCB0aGlzLmhpZ2ggPj0gMDtcbn07XG5cbi8qKlxuICogVGVzdHMgaWYgdGhpcyBMb25nJ3MgdmFsdWUgaXMgb2RkLlxuICogQHRoaXMgeyFMb25nfVxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbkxvbmdQcm90b3R5cGUuaXNPZGQgPSBmdW5jdGlvbiBpc09kZCgpIHtcbiAgcmV0dXJuICh0aGlzLmxvdyAmIDEpID09PSAxO1xufTtcblxuLyoqXG4gKiBUZXN0cyBpZiB0aGlzIExvbmcncyB2YWx1ZSBpcyBldmVuLlxuICogQHRoaXMgeyFMb25nfVxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbkxvbmdQcm90b3R5cGUuaXNFdmVuID0gZnVuY3Rpb24gaXNFdmVuKCkge1xuICByZXR1cm4gKHRoaXMubG93ICYgMSkgPT09IDA7XG59O1xuXG4vKipcbiAqIFRlc3RzIGlmIHRoaXMgTG9uZydzIHZhbHVlIGVxdWFscyB0aGUgc3BlY2lmaWVkJ3MuXG4gKiBAdGhpcyB7IUxvbmd9XG4gKiBAcGFyYW0geyFMb25nfG51bWJlcnxzdHJpbmd9IG90aGVyIE90aGVyIHZhbHVlXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuTG9uZ1Byb3RvdHlwZS5lcXVhbHMgPSBmdW5jdGlvbiBlcXVhbHMob3RoZXIpIHtcbiAgaWYgKCFpc0xvbmcob3RoZXIpKVxuICAgIG90aGVyID0gZnJvbVZhbHVlKG90aGVyKTtcbiAgaWYgKHRoaXMudW5zaWduZWQgIT09IG90aGVyLnVuc2lnbmVkICYmICh0aGlzLmhpZ2ggPj4+IDMxKSA9PT0gMSAmJiAob3RoZXIuaGlnaCA+Pj4gMzEpID09PSAxKVxuICAgIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIHRoaXMuaGlnaCA9PT0gb3RoZXIuaGlnaCAmJiB0aGlzLmxvdyA9PT0gb3RoZXIubG93O1xufTtcblxuLyoqXG4gKiBUZXN0cyBpZiB0aGlzIExvbmcncyB2YWx1ZSBlcXVhbHMgdGhlIHNwZWNpZmllZCdzLiBUaGlzIGlzIGFuIGFsaWFzIG9mIHtAbGluayBMb25nI2VxdWFsc30uXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7IUxvbmd8bnVtYmVyfHN0cmluZ30gb3RoZXIgT3RoZXIgdmFsdWVcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5Mb25nUHJvdG90eXBlLmVxID0gTG9uZ1Byb3RvdHlwZS5lcXVhbHM7XG5cbi8qKlxuICogVGVzdHMgaWYgdGhpcyBMb25nJ3MgdmFsdWUgZGlmZmVycyBmcm9tIHRoZSBzcGVjaWZpZWQncy5cbiAqIEB0aGlzIHshTG9uZ31cbiAqIEBwYXJhbSB7IUxvbmd8bnVtYmVyfHN0cmluZ30gb3RoZXIgT3RoZXIgdmFsdWVcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5Mb25nUHJvdG90eXBlLm5vdEVxdWFscyA9IGZ1bmN0aW9uIG5vdEVxdWFscyhvdGhlcikge1xuICByZXR1cm4gIXRoaXMuZXEoLyogdmFsaWRhdGVzICovIG90aGVyKTtcbn07XG5cbi8qKlxuICogVGVzdHMgaWYgdGhpcyBMb25nJ3MgdmFsdWUgZGlmZmVycyBmcm9tIHRoZSBzcGVjaWZpZWQncy4gVGhpcyBpcyBhbiBhbGlhcyBvZiB7QGxpbmsgTG9uZyNub3RFcXVhbHN9LlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0geyFMb25nfG51bWJlcnxzdHJpbmd9IG90aGVyIE90aGVyIHZhbHVlXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuTG9uZ1Byb3RvdHlwZS5uZXEgPSBMb25nUHJvdG90eXBlLm5vdEVxdWFscztcblxuLyoqXG4gKiBUZXN0cyBpZiB0aGlzIExvbmcncyB2YWx1ZSBkaWZmZXJzIGZyb20gdGhlIHNwZWNpZmllZCdzLiBUaGlzIGlzIGFuIGFsaWFzIG9mIHtAbGluayBMb25nI25vdEVxdWFsc30uXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7IUxvbmd8bnVtYmVyfHN0cmluZ30gb3RoZXIgT3RoZXIgdmFsdWVcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5Mb25nUHJvdG90eXBlLm5lID0gTG9uZ1Byb3RvdHlwZS5ub3RFcXVhbHM7XG5cbi8qKlxuICogVGVzdHMgaWYgdGhpcyBMb25nJ3MgdmFsdWUgaXMgbGVzcyB0aGFuIHRoZSBzcGVjaWZpZWQncy5cbiAqIEB0aGlzIHshTG9uZ31cbiAqIEBwYXJhbSB7IUxvbmd8bnVtYmVyfHN0cmluZ30gb3RoZXIgT3RoZXIgdmFsdWVcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5Mb25nUHJvdG90eXBlLmxlc3NUaGFuID0gZnVuY3Rpb24gbGVzc1RoYW4ob3RoZXIpIHtcbiAgcmV0dXJuIHRoaXMuY29tcCgvKiB2YWxpZGF0ZXMgKi8gb3RoZXIpIDwgMDtcbn07XG5cbi8qKlxuICogVGVzdHMgaWYgdGhpcyBMb25nJ3MgdmFsdWUgaXMgbGVzcyB0aGFuIHRoZSBzcGVjaWZpZWQncy4gVGhpcyBpcyBhbiBhbGlhcyBvZiB7QGxpbmsgTG9uZyNsZXNzVGhhbn0uXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7IUxvbmd8bnVtYmVyfHN0cmluZ30gb3RoZXIgT3RoZXIgdmFsdWVcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5Mb25nUHJvdG90eXBlLmx0ID0gTG9uZ1Byb3RvdHlwZS5sZXNzVGhhbjtcblxuLyoqXG4gKiBUZXN0cyBpZiB0aGlzIExvbmcncyB2YWx1ZSBpcyBsZXNzIHRoYW4gb3IgZXF1YWwgdGhlIHNwZWNpZmllZCdzLlxuICogQHRoaXMgeyFMb25nfVxuICogQHBhcmFtIHshTG9uZ3xudW1iZXJ8c3RyaW5nfSBvdGhlciBPdGhlciB2YWx1ZVxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbkxvbmdQcm90b3R5cGUubGVzc1RoYW5PckVxdWFsID0gZnVuY3Rpb24gbGVzc1RoYW5PckVxdWFsKG90aGVyKSB7XG4gIHJldHVybiB0aGlzLmNvbXAoLyogdmFsaWRhdGVzICovIG90aGVyKSA8PSAwO1xufTtcblxuLyoqXG4gKiBUZXN0cyBpZiB0aGlzIExvbmcncyB2YWx1ZSBpcyBsZXNzIHRoYW4gb3IgZXF1YWwgdGhlIHNwZWNpZmllZCdzLiBUaGlzIGlzIGFuIGFsaWFzIG9mIHtAbGluayBMb25nI2xlc3NUaGFuT3JFcXVhbH0uXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7IUxvbmd8bnVtYmVyfHN0cmluZ30gb3RoZXIgT3RoZXIgdmFsdWVcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5Mb25nUHJvdG90eXBlLmx0ZSA9IExvbmdQcm90b3R5cGUubGVzc1RoYW5PckVxdWFsO1xuXG4vKipcbiAqIFRlc3RzIGlmIHRoaXMgTG9uZydzIHZhbHVlIGlzIGxlc3MgdGhhbiBvciBlcXVhbCB0aGUgc3BlY2lmaWVkJ3MuIFRoaXMgaXMgYW4gYWxpYXMgb2Yge0BsaW5rIExvbmcjbGVzc1RoYW5PckVxdWFsfS5cbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHshTG9uZ3xudW1iZXJ8c3RyaW5nfSBvdGhlciBPdGhlciB2YWx1ZVxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbkxvbmdQcm90b3R5cGUubGUgPSBMb25nUHJvdG90eXBlLmxlc3NUaGFuT3JFcXVhbDtcblxuLyoqXG4gKiBUZXN0cyBpZiB0aGlzIExvbmcncyB2YWx1ZSBpcyBncmVhdGVyIHRoYW4gdGhlIHNwZWNpZmllZCdzLlxuICogQHRoaXMgeyFMb25nfVxuICogQHBhcmFtIHshTG9uZ3xudW1iZXJ8c3RyaW5nfSBvdGhlciBPdGhlciB2YWx1ZVxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbkxvbmdQcm90b3R5cGUuZ3JlYXRlclRoYW4gPSBmdW5jdGlvbiBncmVhdGVyVGhhbihvdGhlcikge1xuICByZXR1cm4gdGhpcy5jb21wKC8qIHZhbGlkYXRlcyAqLyBvdGhlcikgPiAwO1xufTtcblxuLyoqXG4gKiBUZXN0cyBpZiB0aGlzIExvbmcncyB2YWx1ZSBpcyBncmVhdGVyIHRoYW4gdGhlIHNwZWNpZmllZCdzLiBUaGlzIGlzIGFuIGFsaWFzIG9mIHtAbGluayBMb25nI2dyZWF0ZXJUaGFufS5cbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHshTG9uZ3xudW1iZXJ8c3RyaW5nfSBvdGhlciBPdGhlciB2YWx1ZVxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbkxvbmdQcm90b3R5cGUuZ3QgPSBMb25nUHJvdG90eXBlLmdyZWF0ZXJUaGFuO1xuXG4vKipcbiAqIFRlc3RzIGlmIHRoaXMgTG9uZydzIHZhbHVlIGlzIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0aGUgc3BlY2lmaWVkJ3MuXG4gKiBAdGhpcyB7IUxvbmd9XG4gKiBAcGFyYW0geyFMb25nfG51bWJlcnxzdHJpbmd9IG90aGVyIE90aGVyIHZhbHVlXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuTG9uZ1Byb3RvdHlwZS5ncmVhdGVyVGhhbk9yRXF1YWwgPSBmdW5jdGlvbiBncmVhdGVyVGhhbk9yRXF1YWwob3RoZXIpIHtcbiAgcmV0dXJuIHRoaXMuY29tcCgvKiB2YWxpZGF0ZXMgKi8gb3RoZXIpID49IDA7XG59O1xuXG4vKipcbiAqIFRlc3RzIGlmIHRoaXMgTG9uZydzIHZhbHVlIGlzIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0aGUgc3BlY2lmaWVkJ3MuIFRoaXMgaXMgYW4gYWxpYXMgb2Yge0BsaW5rIExvbmcjZ3JlYXRlclRoYW5PckVxdWFsfS5cbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHshTG9uZ3xudW1iZXJ8c3RyaW5nfSBvdGhlciBPdGhlciB2YWx1ZVxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbkxvbmdQcm90b3R5cGUuZ3RlID0gTG9uZ1Byb3RvdHlwZS5ncmVhdGVyVGhhbk9yRXF1YWw7XG5cbi8qKlxuICogVGVzdHMgaWYgdGhpcyBMb25nJ3MgdmFsdWUgaXMgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRoZSBzcGVjaWZpZWQncy4gVGhpcyBpcyBhbiBhbGlhcyBvZiB7QGxpbmsgTG9uZyNncmVhdGVyVGhhbk9yRXF1YWx9LlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0geyFMb25nfG51bWJlcnxzdHJpbmd9IG90aGVyIE90aGVyIHZhbHVlXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuTG9uZ1Byb3RvdHlwZS5nZSA9IExvbmdQcm90b3R5cGUuZ3JlYXRlclRoYW5PckVxdWFsO1xuXG4vKipcbiAqIENvbXBhcmVzIHRoaXMgTG9uZydzIHZhbHVlIHdpdGggdGhlIHNwZWNpZmllZCdzLlxuICogQHRoaXMgeyFMb25nfVxuICogQHBhcmFtIHshTG9uZ3xudW1iZXJ8c3RyaW5nfSBvdGhlciBPdGhlciB2YWx1ZVxuICogQHJldHVybnMge251bWJlcn0gMCBpZiB0aGV5IGFyZSB0aGUgc2FtZSwgMSBpZiB0aGUgdGhpcyBpcyBncmVhdGVyIGFuZCAtMVxuICogIGlmIHRoZSBnaXZlbiBvbmUgaXMgZ3JlYXRlclxuICovXG5Mb25nUHJvdG90eXBlLmNvbXBhcmUgPSBmdW5jdGlvbiBjb21wYXJlKG90aGVyKSB7XG4gIGlmICghaXNMb25nKG90aGVyKSlcbiAgICBvdGhlciA9IGZyb21WYWx1ZShvdGhlcik7XG4gIGlmICh0aGlzLmVxKG90aGVyKSlcbiAgICByZXR1cm4gMDtcbiAgdmFyIHRoaXNOZWcgPSB0aGlzLmlzTmVnYXRpdmUoKSxcbiAgICBvdGhlck5lZyA9IG90aGVyLmlzTmVnYXRpdmUoKTtcbiAgaWYgKHRoaXNOZWcgJiYgIW90aGVyTmVnKVxuICAgIHJldHVybiAtMTtcbiAgaWYgKCF0aGlzTmVnICYmIG90aGVyTmVnKVxuICAgIHJldHVybiAxO1xuICAvLyBBdCB0aGlzIHBvaW50IHRoZSBzaWduIGJpdHMgYXJlIHRoZSBzYW1lXG4gIGlmICghdGhpcy51bnNpZ25lZClcbiAgICByZXR1cm4gdGhpcy5zdWIob3RoZXIpLmlzTmVnYXRpdmUoKSA/IC0xIDogMTtcbiAgLy8gQm90aCBhcmUgcG9zaXRpdmUgaWYgYXQgbGVhc3Qgb25lIGlzIHVuc2lnbmVkXG4gIHJldHVybiAob3RoZXIuaGlnaCA+Pj4gMCkgPiAodGhpcy5oaWdoID4+PiAwKSB8fCAob3RoZXIuaGlnaCA9PT0gdGhpcy5oaWdoICYmIChvdGhlci5sb3cgPj4+IDApID4gKHRoaXMubG93ID4+PiAwKSkgPyAtMSA6IDE7XG59O1xuXG4vKipcbiAqIENvbXBhcmVzIHRoaXMgTG9uZydzIHZhbHVlIHdpdGggdGhlIHNwZWNpZmllZCdzLiBUaGlzIGlzIGFuIGFsaWFzIG9mIHtAbGluayBMb25nI2NvbXBhcmV9LlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0geyFMb25nfG51bWJlcnxzdHJpbmd9IG90aGVyIE90aGVyIHZhbHVlXG4gKiBAcmV0dXJucyB7bnVtYmVyfSAwIGlmIHRoZXkgYXJlIHRoZSBzYW1lLCAxIGlmIHRoZSB0aGlzIGlzIGdyZWF0ZXIgYW5kIC0xXG4gKiAgaWYgdGhlIGdpdmVuIG9uZSBpcyBncmVhdGVyXG4gKi9cbkxvbmdQcm90b3R5cGUuY29tcCA9IExvbmdQcm90b3R5cGUuY29tcGFyZTtcblxuLyoqXG4gKiBOZWdhdGVzIHRoaXMgTG9uZydzIHZhbHVlLlxuICogQHRoaXMgeyFMb25nfVxuICogQHJldHVybnMgeyFMb25nfSBOZWdhdGVkIExvbmdcbiAqL1xuTG9uZ1Byb3RvdHlwZS5uZWdhdGUgPSBmdW5jdGlvbiBuZWdhdGUoKSB7XG4gIGlmICghdGhpcy51bnNpZ25lZCAmJiB0aGlzLmVxKE1JTl9WQUxVRSkpXG4gICAgcmV0dXJuIE1JTl9WQUxVRTtcbiAgcmV0dXJuIHRoaXMubm90KCkuYWRkKE9ORSk7XG59O1xuXG4vKipcbiAqIE5lZ2F0ZXMgdGhpcyBMb25nJ3MgdmFsdWUuIFRoaXMgaXMgYW4gYWxpYXMgb2Yge0BsaW5rIExvbmcjbmVnYXRlfS5cbiAqIEBmdW5jdGlvblxuICogQHJldHVybnMgeyFMb25nfSBOZWdhdGVkIExvbmdcbiAqL1xuTG9uZ1Byb3RvdHlwZS5uZWcgPSBMb25nUHJvdG90eXBlLm5lZ2F0ZTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBzdW0gb2YgdGhpcyBhbmQgdGhlIHNwZWNpZmllZCBMb25nLlxuICogQHRoaXMgeyFMb25nfVxuICogQHBhcmFtIHshTG9uZ3xudW1iZXJ8c3RyaW5nfSBhZGRlbmQgQWRkZW5kXG4gKiBAcmV0dXJucyB7IUxvbmd9IFN1bVxuICovXG5Mb25nUHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIGFkZChhZGRlbmQpIHtcbiAgaWYgKCFpc0xvbmcoYWRkZW5kKSlcbiAgICBhZGRlbmQgPSBmcm9tVmFsdWUoYWRkZW5kKTtcblxuICAvLyBEaXZpZGUgZWFjaCBudW1iZXIgaW50byA0IGNodW5rcyBvZiAxNiBiaXRzLCBhbmQgdGhlbiBzdW0gdGhlIGNodW5rcy5cblxuICB2YXIgYTQ4ID0gdGhpcy5oaWdoID4+PiAxNjtcbiAgdmFyIGEzMiA9IHRoaXMuaGlnaCAmIDB4RkZGRjtcbiAgdmFyIGExNiA9IHRoaXMubG93ID4+PiAxNjtcbiAgdmFyIGEwMCA9IHRoaXMubG93ICYgMHhGRkZGO1xuXG4gIHZhciBiNDggPSBhZGRlbmQuaGlnaCA+Pj4gMTY7XG4gIHZhciBiMzIgPSBhZGRlbmQuaGlnaCAmIDB4RkZGRjtcbiAgdmFyIGIxNiA9IGFkZGVuZC5sb3cgPj4+IDE2O1xuICB2YXIgYjAwID0gYWRkZW5kLmxvdyAmIDB4RkZGRjtcblxuICB2YXIgYzQ4ID0gMCwgYzMyID0gMCwgYzE2ID0gMCwgYzAwID0gMDtcbiAgYzAwICs9IGEwMCArIGIwMDtcbiAgYzE2ICs9IGMwMCA+Pj4gMTY7XG4gIGMwMCAmPSAweEZGRkY7XG4gIGMxNiArPSBhMTYgKyBiMTY7XG4gIGMzMiArPSBjMTYgPj4+IDE2O1xuICBjMTYgJj0gMHhGRkZGO1xuICBjMzIgKz0gYTMyICsgYjMyO1xuICBjNDggKz0gYzMyID4+PiAxNjtcbiAgYzMyICY9IDB4RkZGRjtcbiAgYzQ4ICs9IGE0OCArIGI0ODtcbiAgYzQ4ICY9IDB4RkZGRjtcbiAgcmV0dXJuIGZyb21CaXRzKChjMTYgPDwgMTYpIHwgYzAwLCAoYzQ4IDw8IDE2KSB8IGMzMiwgdGhpcy51bnNpZ25lZCk7XG59O1xuXG4vKipcbiAqIFJldHVybnMgdGhlIGRpZmZlcmVuY2Ugb2YgdGhpcyBhbmQgdGhlIHNwZWNpZmllZCBMb25nLlxuICogQHRoaXMgeyFMb25nfVxuICogQHBhcmFtIHshTG9uZ3xudW1iZXJ8c3RyaW5nfSBzdWJ0cmFoZW5kIFN1YnRyYWhlbmRcbiAqIEByZXR1cm5zIHshTG9uZ30gRGlmZmVyZW5jZVxuICovXG5Mb25nUHJvdG90eXBlLnN1YnRyYWN0ID0gZnVuY3Rpb24gc3VidHJhY3Qoc3VidHJhaGVuZCkge1xuICBpZiAoIWlzTG9uZyhzdWJ0cmFoZW5kKSlcbiAgICBzdWJ0cmFoZW5kID0gZnJvbVZhbHVlKHN1YnRyYWhlbmQpO1xuICByZXR1cm4gdGhpcy5hZGQoc3VidHJhaGVuZC5uZWcoKSk7XG59O1xuXG4vKipcbiAqIFJldHVybnMgdGhlIGRpZmZlcmVuY2Ugb2YgdGhpcyBhbmQgdGhlIHNwZWNpZmllZCBMb25nLiBUaGlzIGlzIGFuIGFsaWFzIG9mIHtAbGluayBMb25nI3N1YnRyYWN0fS5cbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHshTG9uZ3xudW1iZXJ8c3RyaW5nfSBzdWJ0cmFoZW5kIFN1YnRyYWhlbmRcbiAqIEByZXR1cm5zIHshTG9uZ30gRGlmZmVyZW5jZVxuICovXG5Mb25nUHJvdG90eXBlLnN1YiA9IExvbmdQcm90b3R5cGUuc3VidHJhY3Q7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgcHJvZHVjdCBvZiB0aGlzIGFuZCB0aGUgc3BlY2lmaWVkIExvbmcuXG4gKiBAdGhpcyB7IUxvbmd9XG4gKiBAcGFyYW0geyFMb25nfG51bWJlcnxzdHJpbmd9IG11bHRpcGxpZXIgTXVsdGlwbGllclxuICogQHJldHVybnMgeyFMb25nfSBQcm9kdWN0XG4gKi9cbkxvbmdQcm90b3R5cGUubXVsdGlwbHkgPSBmdW5jdGlvbiBtdWx0aXBseShtdWx0aXBsaWVyKSB7XG4gIGlmICh0aGlzLmlzWmVybygpKVxuICAgIHJldHVybiB0aGlzO1xuICBpZiAoIWlzTG9uZyhtdWx0aXBsaWVyKSlcbiAgICBtdWx0aXBsaWVyID0gZnJvbVZhbHVlKG11bHRpcGxpZXIpO1xuXG4gIC8vIHVzZSB3YXNtIHN1cHBvcnQgaWYgcHJlc2VudFxuICBpZiAod2FzbSkge1xuICAgIHZhciBsb3cgPSB3YXNtW1wibXVsXCJdKHRoaXMubG93LFxuICAgICAgdGhpcy5oaWdoLFxuICAgICAgbXVsdGlwbGllci5sb3csXG4gICAgICBtdWx0aXBsaWVyLmhpZ2gpO1xuICAgIHJldHVybiBmcm9tQml0cyhsb3csIHdhc21bXCJnZXRfaGlnaFwiXSgpLCB0aGlzLnVuc2lnbmVkKTtcbiAgfVxuXG4gIGlmIChtdWx0aXBsaWVyLmlzWmVybygpKVxuICAgIHJldHVybiB0aGlzLnVuc2lnbmVkID8gVVpFUk8gOiBaRVJPO1xuICBpZiAodGhpcy5lcShNSU5fVkFMVUUpKVxuICAgIHJldHVybiBtdWx0aXBsaWVyLmlzT2RkKCkgPyBNSU5fVkFMVUUgOiBaRVJPO1xuICBpZiAobXVsdGlwbGllci5lcShNSU5fVkFMVUUpKVxuICAgIHJldHVybiB0aGlzLmlzT2RkKCkgPyBNSU5fVkFMVUUgOiBaRVJPO1xuXG4gIGlmICh0aGlzLmlzTmVnYXRpdmUoKSkge1xuICAgIGlmIChtdWx0aXBsaWVyLmlzTmVnYXRpdmUoKSlcbiAgICAgIHJldHVybiB0aGlzLm5lZygpLm11bChtdWx0aXBsaWVyLm5lZygpKTtcbiAgICBlbHNlXG4gICAgICByZXR1cm4gdGhpcy5uZWcoKS5tdWwobXVsdGlwbGllcikubmVnKCk7XG4gIH0gZWxzZSBpZiAobXVsdGlwbGllci5pc05lZ2F0aXZlKCkpXG4gICAgcmV0dXJuIHRoaXMubXVsKG11bHRpcGxpZXIubmVnKCkpLm5lZygpO1xuXG4gIC8vIElmIGJvdGggbG9uZ3MgYXJlIHNtYWxsLCB1c2UgZmxvYXQgbXVsdGlwbGljYXRpb25cbiAgaWYgKHRoaXMubHQoVFdPX1BXUl8yNCkgJiYgbXVsdGlwbGllci5sdChUV09fUFdSXzI0KSlcbiAgICByZXR1cm4gZnJvbU51bWJlcih0aGlzLnRvTnVtYmVyKCkgKiBtdWx0aXBsaWVyLnRvTnVtYmVyKCksIHRoaXMudW5zaWduZWQpO1xuXG4gIC8vIERpdmlkZSBlYWNoIGxvbmcgaW50byA0IGNodW5rcyBvZiAxNiBiaXRzLCBhbmQgdGhlbiBhZGQgdXAgNHg0IHByb2R1Y3RzLlxuICAvLyBXZSBjYW4gc2tpcCBwcm9kdWN0cyB0aGF0IHdvdWxkIG92ZXJmbG93LlxuXG4gIHZhciBhNDggPSB0aGlzLmhpZ2ggPj4+IDE2O1xuICB2YXIgYTMyID0gdGhpcy5oaWdoICYgMHhGRkZGO1xuICB2YXIgYTE2ID0gdGhpcy5sb3cgPj4+IDE2O1xuICB2YXIgYTAwID0gdGhpcy5sb3cgJiAweEZGRkY7XG5cbiAgdmFyIGI0OCA9IG11bHRpcGxpZXIuaGlnaCA+Pj4gMTY7XG4gIHZhciBiMzIgPSBtdWx0aXBsaWVyLmhpZ2ggJiAweEZGRkY7XG4gIHZhciBiMTYgPSBtdWx0aXBsaWVyLmxvdyA+Pj4gMTY7XG4gIHZhciBiMDAgPSBtdWx0aXBsaWVyLmxvdyAmIDB4RkZGRjtcblxuICB2YXIgYzQ4ID0gMCwgYzMyID0gMCwgYzE2ID0gMCwgYzAwID0gMDtcbiAgYzAwICs9IGEwMCAqIGIwMDtcbiAgYzE2ICs9IGMwMCA+Pj4gMTY7XG4gIGMwMCAmPSAweEZGRkY7XG4gIGMxNiArPSBhMTYgKiBiMDA7XG4gIGMzMiArPSBjMTYgPj4+IDE2O1xuICBjMTYgJj0gMHhGRkZGO1xuICBjMTYgKz0gYTAwICogYjE2O1xuICBjMzIgKz0gYzE2ID4+PiAxNjtcbiAgYzE2ICY9IDB4RkZGRjtcbiAgYzMyICs9IGEzMiAqIGIwMDtcbiAgYzQ4ICs9IGMzMiA+Pj4gMTY7XG4gIGMzMiAmPSAweEZGRkY7XG4gIGMzMiArPSBhMTYgKiBiMTY7XG4gIGM0OCArPSBjMzIgPj4+IDE2O1xuICBjMzIgJj0gMHhGRkZGO1xuICBjMzIgKz0gYTAwICogYjMyO1xuICBjNDggKz0gYzMyID4+PiAxNjtcbiAgYzMyICY9IDB4RkZGRjtcbiAgYzQ4ICs9IGE0OCAqIGIwMCArIGEzMiAqIGIxNiArIGExNiAqIGIzMiArIGEwMCAqIGI0ODtcbiAgYzQ4ICY9IDB4RkZGRjtcbiAgcmV0dXJuIGZyb21CaXRzKChjMTYgPDwgMTYpIHwgYzAwLCAoYzQ4IDw8IDE2KSB8IGMzMiwgdGhpcy51bnNpZ25lZCk7XG59O1xuXG4vKipcbiAqIFJldHVybnMgdGhlIHByb2R1Y3Qgb2YgdGhpcyBhbmQgdGhlIHNwZWNpZmllZCBMb25nLiBUaGlzIGlzIGFuIGFsaWFzIG9mIHtAbGluayBMb25nI211bHRpcGx5fS5cbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHshTG9uZ3xudW1iZXJ8c3RyaW5nfSBtdWx0aXBsaWVyIE11bHRpcGxpZXJcbiAqIEByZXR1cm5zIHshTG9uZ30gUHJvZHVjdFxuICovXG5Mb25nUHJvdG90eXBlLm11bCA9IExvbmdQcm90b3R5cGUubXVsdGlwbHk7XG5cbi8qKlxuICogUmV0dXJucyB0aGlzIExvbmcgZGl2aWRlZCBieSB0aGUgc3BlY2lmaWVkLiBUaGUgcmVzdWx0IGlzIHNpZ25lZCBpZiB0aGlzIExvbmcgaXMgc2lnbmVkIG9yXG4gKiAgdW5zaWduZWQgaWYgdGhpcyBMb25nIGlzIHVuc2lnbmVkLlxuICogQHRoaXMgeyFMb25nfVxuICogQHBhcmFtIHshTG9uZ3xudW1iZXJ8c3RyaW5nfSBkaXZpc29yIERpdmlzb3JcbiAqIEByZXR1cm5zIHshTG9uZ30gUXVvdGllbnRcbiAqL1xuTG9uZ1Byb3RvdHlwZS5kaXZpZGUgPSBmdW5jdGlvbiBkaXZpZGUoZGl2aXNvcikge1xuICBpZiAoIWlzTG9uZyhkaXZpc29yKSlcbiAgICBkaXZpc29yID0gZnJvbVZhbHVlKGRpdmlzb3IpO1xuICBpZiAoZGl2aXNvci5pc1plcm8oKSlcbiAgICB0aHJvdyBFcnJvcignZGl2aXNpb24gYnkgemVybycpO1xuXG4gIC8vIHVzZSB3YXNtIHN1cHBvcnQgaWYgcHJlc2VudFxuICBpZiAod2FzbSkge1xuICAgIC8vIGd1YXJkIGFnYWluc3Qgc2lnbmVkIGRpdmlzaW9uIG92ZXJmbG93OiB0aGUgbGFyZ2VzdFxuICAgIC8vIG5lZ2F0aXZlIG51bWJlciAvIC0xIHdvdWxkIGJlIDEgbGFyZ2VyIHRoYW4gdGhlIGxhcmdlc3RcbiAgICAvLyBwb3NpdGl2ZSBudW1iZXIsIGR1ZSB0byB0d28ncyBjb21wbGVtZW50LlxuICAgIGlmICghdGhpcy51bnNpZ25lZCAmJlxuICAgICAgdGhpcy5oaWdoID09PSAtMHg4MDAwMDAwMCAmJlxuICAgICAgZGl2aXNvci5sb3cgPT09IC0xICYmIGRpdmlzb3IuaGlnaCA9PT0gLTEpIHtcbiAgICAgIC8vIGJlIGNvbnNpc3RlbnQgd2l0aCBub24td2FzbSBjb2RlIHBhdGhcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICB2YXIgbG93ID0gKHRoaXMudW5zaWduZWQgPyB3YXNtW1wiZGl2X3VcIl0gOiB3YXNtW1wiZGl2X3NcIl0pKFxuICAgICAgdGhpcy5sb3csXG4gICAgICB0aGlzLmhpZ2gsXG4gICAgICBkaXZpc29yLmxvdyxcbiAgICAgIGRpdmlzb3IuaGlnaFxuICAgICk7XG4gICAgcmV0dXJuIGZyb21CaXRzKGxvdywgd2FzbVtcImdldF9oaWdoXCJdKCksIHRoaXMudW5zaWduZWQpO1xuICB9XG5cbiAgaWYgKHRoaXMuaXNaZXJvKCkpXG4gICAgcmV0dXJuIHRoaXMudW5zaWduZWQgPyBVWkVSTyA6IFpFUk87XG4gIHZhciBhcHByb3gsIHJlbSwgcmVzO1xuICBpZiAoIXRoaXMudW5zaWduZWQpIHtcbiAgICAvLyBUaGlzIHNlY3Rpb24gaXMgb25seSByZWxldmFudCBmb3Igc2lnbmVkIGxvbmdzIGFuZCBpcyBkZXJpdmVkIGZyb20gdGhlXG4gICAgLy8gY2xvc3VyZSBsaWJyYXJ5IGFzIGEgd2hvbGUuXG4gICAgaWYgKHRoaXMuZXEoTUlOX1ZBTFVFKSkge1xuICAgICAgaWYgKGRpdmlzb3IuZXEoT05FKSB8fCBkaXZpc29yLmVxKE5FR19PTkUpKVxuICAgICAgICByZXR1cm4gTUlOX1ZBTFVFOyAgLy8gcmVjYWxsIHRoYXQgLU1JTl9WQUxVRSA9PSBNSU5fVkFMVUVcbiAgICAgIGVsc2UgaWYgKGRpdmlzb3IuZXEoTUlOX1ZBTFVFKSlcbiAgICAgICAgcmV0dXJuIE9ORTtcbiAgICAgIGVsc2Uge1xuICAgICAgICAvLyBBdCB0aGlzIHBvaW50LCB3ZSBoYXZlIHxvdGhlcnwgPj0gMiwgc28gfHRoaXMvb3RoZXJ8IDwgfE1JTl9WQUxVRXwuXG4gICAgICAgIHZhciBoYWxmVGhpcyA9IHRoaXMuc2hyKDEpO1xuICAgICAgICBhcHByb3ggPSBoYWxmVGhpcy5kaXYoZGl2aXNvcikuc2hsKDEpO1xuICAgICAgICBpZiAoYXBwcm94LmVxKFpFUk8pKSB7XG4gICAgICAgICAgcmV0dXJuIGRpdmlzb3IuaXNOZWdhdGl2ZSgpID8gT05FIDogTkVHX09ORTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZW0gPSB0aGlzLnN1YihkaXZpc29yLm11bChhcHByb3gpKTtcbiAgICAgICAgICByZXMgPSBhcHByb3guYWRkKHJlbS5kaXYoZGl2aXNvcikpO1xuICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGRpdmlzb3IuZXEoTUlOX1ZBTFVFKSlcbiAgICAgIHJldHVybiB0aGlzLnVuc2lnbmVkID8gVVpFUk8gOiBaRVJPO1xuICAgIGlmICh0aGlzLmlzTmVnYXRpdmUoKSkge1xuICAgICAgaWYgKGRpdmlzb3IuaXNOZWdhdGl2ZSgpKVxuICAgICAgICByZXR1cm4gdGhpcy5uZWcoKS5kaXYoZGl2aXNvci5uZWcoKSk7XG4gICAgICByZXR1cm4gdGhpcy5uZWcoKS5kaXYoZGl2aXNvcikubmVnKCk7XG4gICAgfSBlbHNlIGlmIChkaXZpc29yLmlzTmVnYXRpdmUoKSlcbiAgICAgIHJldHVybiB0aGlzLmRpdihkaXZpc29yLm5lZygpKS5uZWcoKTtcbiAgICByZXMgPSBaRVJPO1xuICB9IGVsc2Uge1xuICAgIC8vIFRoZSBhbGdvcml0aG0gYmVsb3cgaGFzIG5vdCBiZWVuIG1hZGUgZm9yIHVuc2lnbmVkIGxvbmdzLiBJdCdzIHRoZXJlZm9yZVxuICAgIC8vIHJlcXVpcmVkIHRvIHRha2Ugc3BlY2lhbCBjYXJlIG9mIHRoZSBNU0IgcHJpb3IgdG8gcnVubmluZyBpdC5cbiAgICBpZiAoIWRpdmlzb3IudW5zaWduZWQpXG4gICAgICBkaXZpc29yID0gZGl2aXNvci50b1Vuc2lnbmVkKCk7XG4gICAgaWYgKGRpdmlzb3IuZ3QodGhpcykpXG4gICAgICByZXR1cm4gVVpFUk87XG4gICAgaWYgKGRpdmlzb3IuZ3QodGhpcy5zaHJ1KDEpKSkgLy8gMTUgPj4+IDEgPSA3IDsgd2l0aCBkaXZpc29yID0gOCA7IHRydWVcbiAgICAgIHJldHVybiBVT05FO1xuICAgIHJlcyA9IFVaRVJPO1xuICB9XG5cbiAgLy8gUmVwZWF0IHRoZSBmb2xsb3dpbmcgdW50aWwgdGhlIHJlbWFpbmRlciBpcyBsZXNzIHRoYW4gb3RoZXI6ICBmaW5kIGFcbiAgLy8gZmxvYXRpbmctcG9pbnQgdGhhdCBhcHByb3hpbWF0ZXMgcmVtYWluZGVyIC8gb3RoZXIgKmZyb20gYmVsb3cqLCBhZGQgdGhpc1xuICAvLyBpbnRvIHRoZSByZXN1bHQsIGFuZCBzdWJ0cmFjdCBpdCBmcm9tIHRoZSByZW1haW5kZXIuICBJdCBpcyBjcml0aWNhbCB0aGF0XG4gIC8vIHRoZSBhcHByb3hpbWF0ZSB2YWx1ZSBpcyBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gdGhlIHJlYWwgdmFsdWUgc28gdGhhdCB0aGVcbiAgLy8gcmVtYWluZGVyIG5ldmVyIGJlY29tZXMgbmVnYXRpdmUuXG4gIHJlbSA9IHRoaXM7XG4gIHdoaWxlIChyZW0uZ3RlKGRpdmlzb3IpKSB7XG4gICAgLy8gQXBwcm94aW1hdGUgdGhlIHJlc3VsdCBvZiBkaXZpc2lvbi4gVGhpcyBtYXkgYmUgYSBsaXR0bGUgZ3JlYXRlciBvclxuICAgIC8vIHNtYWxsZXIgdGhhbiB0aGUgYWN0dWFsIHZhbHVlLlxuICAgIGFwcHJveCA9IE1hdGgubWF4KDEsIE1hdGguZmxvb3IocmVtLnRvTnVtYmVyKCkgLyBkaXZpc29yLnRvTnVtYmVyKCkpKTtcblxuICAgIC8vIFdlIHdpbGwgdHdlYWsgdGhlIGFwcHJveGltYXRlIHJlc3VsdCBieSBjaGFuZ2luZyBpdCBpbiB0aGUgNDgtdGggZGlnaXQgb3JcbiAgICAvLyB0aGUgc21hbGxlc3Qgbm9uLWZyYWN0aW9uYWwgZGlnaXQsIHdoaWNoZXZlciBpcyBsYXJnZXIuXG4gICAgdmFyIGxvZzIgPSBNYXRoLmNlaWwoTWF0aC5sb2coYXBwcm94KSAvIE1hdGguTE4yKSxcbiAgICAgIGRlbHRhID0gKGxvZzIgPD0gNDgpID8gMSA6IHBvd19kYmwoMiwgbG9nMiAtIDQ4KSxcblxuICAgICAgLy8gRGVjcmVhc2UgdGhlIGFwcHJveGltYXRpb24gdW50aWwgaXQgaXMgc21hbGxlciB0aGFuIHRoZSByZW1haW5kZXIuICBOb3RlXG4gICAgICAvLyB0aGF0IGlmIGl0IGlzIHRvbyBsYXJnZSwgdGhlIHByb2R1Y3Qgb3ZlcmZsb3dzIGFuZCBpcyBuZWdhdGl2ZS5cbiAgICAgIGFwcHJveFJlcyA9IGZyb21OdW1iZXIoYXBwcm94KSxcbiAgICAgIGFwcHJveFJlbSA9IGFwcHJveFJlcy5tdWwoZGl2aXNvcik7XG4gICAgd2hpbGUgKGFwcHJveFJlbS5pc05lZ2F0aXZlKCkgfHwgYXBwcm94UmVtLmd0KHJlbSkpIHtcbiAgICAgIGFwcHJveCAtPSBkZWx0YTtcbiAgICAgIGFwcHJveFJlcyA9IGZyb21OdW1iZXIoYXBwcm94LCB0aGlzLnVuc2lnbmVkKTtcbiAgICAgIGFwcHJveFJlbSA9IGFwcHJveFJlcy5tdWwoZGl2aXNvcik7XG4gICAgfVxuXG4gICAgLy8gV2Uga25vdyB0aGUgYW5zd2VyIGNhbid0IGJlIHplcm8uLi4gYW5kIGFjdHVhbGx5LCB6ZXJvIHdvdWxkIGNhdXNlXG4gICAgLy8gaW5maW5pdGUgcmVjdXJzaW9uIHNpbmNlIHdlIHdvdWxkIG1ha2Ugbm8gcHJvZ3Jlc3MuXG4gICAgaWYgKGFwcHJveFJlcy5pc1plcm8oKSlcbiAgICAgIGFwcHJveFJlcyA9IE9ORTtcblxuICAgIHJlcyA9IHJlcy5hZGQoYXBwcm94UmVzKTtcbiAgICByZW0gPSByZW0uc3ViKGFwcHJveFJlbSk7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn07XG5cbi8qKlxuICogUmV0dXJucyB0aGlzIExvbmcgZGl2aWRlZCBieSB0aGUgc3BlY2lmaWVkLiBUaGlzIGlzIGFuIGFsaWFzIG9mIHtAbGluayBMb25nI2RpdmlkZX0uXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7IUxvbmd8bnVtYmVyfHN0cmluZ30gZGl2aXNvciBEaXZpc29yXG4gKiBAcmV0dXJucyB7IUxvbmd9IFF1b3RpZW50XG4gKi9cbkxvbmdQcm90b3R5cGUuZGl2ID0gTG9uZ1Byb3RvdHlwZS5kaXZpZGU7XG5cbi8qKlxuICogUmV0dXJucyB0aGlzIExvbmcgbW9kdWxvIHRoZSBzcGVjaWZpZWQuXG4gKiBAdGhpcyB7IUxvbmd9XG4gKiBAcGFyYW0geyFMb25nfG51bWJlcnxzdHJpbmd9IGRpdmlzb3IgRGl2aXNvclxuICogQHJldHVybnMgeyFMb25nfSBSZW1haW5kZXJcbiAqL1xuTG9uZ1Byb3RvdHlwZS5tb2R1bG8gPSBmdW5jdGlvbiBtb2R1bG8oZGl2aXNvcikge1xuICBpZiAoIWlzTG9uZyhkaXZpc29yKSlcbiAgICBkaXZpc29yID0gZnJvbVZhbHVlKGRpdmlzb3IpO1xuXG4gIC8vIHVzZSB3YXNtIHN1cHBvcnQgaWYgcHJlc2VudFxuICBpZiAod2FzbSkge1xuICAgIHZhciBsb3cgPSAodGhpcy51bnNpZ25lZCA/IHdhc21bXCJyZW1fdVwiXSA6IHdhc21bXCJyZW1fc1wiXSkoXG4gICAgICB0aGlzLmxvdyxcbiAgICAgIHRoaXMuaGlnaCxcbiAgICAgIGRpdmlzb3IubG93LFxuICAgICAgZGl2aXNvci5oaWdoXG4gICAgKTtcbiAgICByZXR1cm4gZnJvbUJpdHMobG93LCB3YXNtW1wiZ2V0X2hpZ2hcIl0oKSwgdGhpcy51bnNpZ25lZCk7XG4gIH1cblxuICByZXR1cm4gdGhpcy5zdWIodGhpcy5kaXYoZGl2aXNvcikubXVsKGRpdmlzb3IpKTtcbn07XG5cbi8qKlxuICogUmV0dXJucyB0aGlzIExvbmcgbW9kdWxvIHRoZSBzcGVjaWZpZWQuIFRoaXMgaXMgYW4gYWxpYXMgb2Yge0BsaW5rIExvbmcjbW9kdWxvfS5cbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHshTG9uZ3xudW1iZXJ8c3RyaW5nfSBkaXZpc29yIERpdmlzb3JcbiAqIEByZXR1cm5zIHshTG9uZ30gUmVtYWluZGVyXG4gKi9cbkxvbmdQcm90b3R5cGUubW9kID0gTG9uZ1Byb3RvdHlwZS5tb2R1bG87XG5cbi8qKlxuICogUmV0dXJucyB0aGlzIExvbmcgbW9kdWxvIHRoZSBzcGVjaWZpZWQuIFRoaXMgaXMgYW4gYWxpYXMgb2Yge0BsaW5rIExvbmcjbW9kdWxvfS5cbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHshTG9uZ3xudW1iZXJ8c3RyaW5nfSBkaXZpc29yIERpdmlzb3JcbiAqIEByZXR1cm5zIHshTG9uZ30gUmVtYWluZGVyXG4gKi9cbkxvbmdQcm90b3R5cGUucmVtID0gTG9uZ1Byb3RvdHlwZS5tb2R1bG87XG5cbi8qKlxuICogUmV0dXJucyB0aGUgYml0d2lzZSBOT1Qgb2YgdGhpcyBMb25nLlxuICogQHRoaXMgeyFMb25nfVxuICogQHJldHVybnMgeyFMb25nfVxuICovXG5Mb25nUHJvdG90eXBlLm5vdCA9IGZ1bmN0aW9uIG5vdCgpIHtcbiAgcmV0dXJuIGZyb21CaXRzKH50aGlzLmxvdywgfnRoaXMuaGlnaCwgdGhpcy51bnNpZ25lZCk7XG59O1xuXG4vKipcbiAqIFJldHVybnMgY291bnQgbGVhZGluZyB6ZXJvcyBvZiB0aGlzIExvbmcuXG4gKiBAdGhpcyB7IUxvbmd9XG4gKiBAcmV0dXJucyB7IW51bWJlcn1cbiAqL1xuTG9uZ1Byb3RvdHlwZS5jb3VudExlYWRpbmdaZXJvcyA9IGZ1bmN0aW9uIGNvdW50TGVhZGluZ1plcm9zKCkge1xuICByZXR1cm4gdGhpcy5oaWdoID8gTWF0aC5jbHozMih0aGlzLmhpZ2gpIDogTWF0aC5jbHozMih0aGlzLmxvdykgKyAzMjtcbn07XG5cbi8qKlxuICogUmV0dXJucyBjb3VudCBsZWFkaW5nIHplcm9zLiBUaGlzIGlzIGFuIGFsaWFzIG9mIHtAbGluayBMb25nI2NvdW50TGVhZGluZ1plcm9zfS5cbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHshTG9uZ31cbiAqIEByZXR1cm5zIHshbnVtYmVyfVxuICovXG5Mb25nUHJvdG90eXBlLmNseiA9IExvbmdQcm90b3R5cGUuY291bnRMZWFkaW5nWmVyb3M7XG5cbi8qKlxuICogUmV0dXJucyBjb3VudCB0cmFpbGluZyB6ZXJvcyBvZiB0aGlzIExvbmcuXG4gKiBAdGhpcyB7IUxvbmd9XG4gKiBAcmV0dXJucyB7IW51bWJlcn1cbiAqL1xuTG9uZ1Byb3RvdHlwZS5jb3VudFRyYWlsaW5nWmVyb3MgPSBmdW5jdGlvbiBjb3VudFRyYWlsaW5nWmVyb3MoKSB7XG4gIHJldHVybiB0aGlzLmxvdyA/IGN0ejMyKHRoaXMubG93KSA6IGN0ejMyKHRoaXMuaGlnaCkgKyAzMjtcbn07XG5cbi8qKlxuICogUmV0dXJucyBjb3VudCB0cmFpbGluZyB6ZXJvcy4gVGhpcyBpcyBhbiBhbGlhcyBvZiB7QGxpbmsgTG9uZyNjb3VudFRyYWlsaW5nWmVyb3N9LlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0geyFMb25nfVxuICogQHJldHVybnMgeyFudW1iZXJ9XG4gKi9cbkxvbmdQcm90b3R5cGUuY3R6ID0gTG9uZ1Byb3RvdHlwZS5jb3VudFRyYWlsaW5nWmVyb3M7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgYml0d2lzZSBBTkQgb2YgdGhpcyBMb25nIGFuZCB0aGUgc3BlY2lmaWVkLlxuICogQHRoaXMgeyFMb25nfVxuICogQHBhcmFtIHshTG9uZ3xudW1iZXJ8c3RyaW5nfSBvdGhlciBPdGhlciBMb25nXG4gKiBAcmV0dXJucyB7IUxvbmd9XG4gKi9cbkxvbmdQcm90b3R5cGUuYW5kID0gZnVuY3Rpb24gYW5kKG90aGVyKSB7XG4gIGlmICghaXNMb25nKG90aGVyKSlcbiAgICBvdGhlciA9IGZyb21WYWx1ZShvdGhlcik7XG4gIHJldHVybiBmcm9tQml0cyh0aGlzLmxvdyAmIG90aGVyLmxvdywgdGhpcy5oaWdoICYgb3RoZXIuaGlnaCwgdGhpcy51bnNpZ25lZCk7XG59O1xuXG4vKipcbiAqIFJldHVybnMgdGhlIGJpdHdpc2UgT1Igb2YgdGhpcyBMb25nIGFuZCB0aGUgc3BlY2lmaWVkLlxuICogQHRoaXMgeyFMb25nfVxuICogQHBhcmFtIHshTG9uZ3xudW1iZXJ8c3RyaW5nfSBvdGhlciBPdGhlciBMb25nXG4gKiBAcmV0dXJucyB7IUxvbmd9XG4gKi9cbkxvbmdQcm90b3R5cGUub3IgPSBmdW5jdGlvbiBvcihvdGhlcikge1xuICBpZiAoIWlzTG9uZyhvdGhlcikpXG4gICAgb3RoZXIgPSBmcm9tVmFsdWUob3RoZXIpO1xuICByZXR1cm4gZnJvbUJpdHModGhpcy5sb3cgfCBvdGhlci5sb3csIHRoaXMuaGlnaCB8IG90aGVyLmhpZ2gsIHRoaXMudW5zaWduZWQpO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBiaXR3aXNlIFhPUiBvZiB0aGlzIExvbmcgYW5kIHRoZSBnaXZlbiBvbmUuXG4gKiBAdGhpcyB7IUxvbmd9XG4gKiBAcGFyYW0geyFMb25nfG51bWJlcnxzdHJpbmd9IG90aGVyIE90aGVyIExvbmdcbiAqIEByZXR1cm5zIHshTG9uZ31cbiAqL1xuTG9uZ1Byb3RvdHlwZS54b3IgPSBmdW5jdGlvbiB4b3Iob3RoZXIpIHtcbiAgaWYgKCFpc0xvbmcob3RoZXIpKVxuICAgIG90aGVyID0gZnJvbVZhbHVlKG90aGVyKTtcbiAgcmV0dXJuIGZyb21CaXRzKHRoaXMubG93IF4gb3RoZXIubG93LCB0aGlzLmhpZ2ggXiBvdGhlci5oaWdoLCB0aGlzLnVuc2lnbmVkKTtcbn07XG5cbi8qKlxuICogUmV0dXJucyB0aGlzIExvbmcgd2l0aCBiaXRzIHNoaWZ0ZWQgdG8gdGhlIGxlZnQgYnkgdGhlIGdpdmVuIGFtb3VudC5cbiAqIEB0aGlzIHshTG9uZ31cbiAqIEBwYXJhbSB7bnVtYmVyfCFMb25nfSBudW1CaXRzIE51bWJlciBvZiBiaXRzXG4gKiBAcmV0dXJucyB7IUxvbmd9IFNoaWZ0ZWQgTG9uZ1xuICovXG5Mb25nUHJvdG90eXBlLnNoaWZ0TGVmdCA9IGZ1bmN0aW9uIHNoaWZ0TGVmdChudW1CaXRzKSB7XG4gIGlmIChpc0xvbmcobnVtQml0cykpXG4gICAgbnVtQml0cyA9IG51bUJpdHMudG9JbnQoKTtcbiAgaWYgKChudW1CaXRzICY9IDYzKSA9PT0gMClcbiAgICByZXR1cm4gdGhpcztcbiAgZWxzZSBpZiAobnVtQml0cyA8IDMyKVxuICAgIHJldHVybiBmcm9tQml0cyh0aGlzLmxvdyA8PCBudW1CaXRzLCAodGhpcy5oaWdoIDw8IG51bUJpdHMpIHwgKHRoaXMubG93ID4+PiAoMzIgLSBudW1CaXRzKSksIHRoaXMudW5zaWduZWQpO1xuICBlbHNlXG4gICAgcmV0dXJuIGZyb21CaXRzKDAsIHRoaXMubG93IDw8IChudW1CaXRzIC0gMzIpLCB0aGlzLnVuc2lnbmVkKTtcbn07XG5cbi8qKlxuICogUmV0dXJucyB0aGlzIExvbmcgd2l0aCBiaXRzIHNoaWZ0ZWQgdG8gdGhlIGxlZnQgYnkgdGhlIGdpdmVuIGFtb3VudC4gVGhpcyBpcyBhbiBhbGlhcyBvZiB7QGxpbmsgTG9uZyNzaGlmdExlZnR9LlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge251bWJlcnwhTG9uZ30gbnVtQml0cyBOdW1iZXIgb2YgYml0c1xuICogQHJldHVybnMgeyFMb25nfSBTaGlmdGVkIExvbmdcbiAqL1xuTG9uZ1Byb3RvdHlwZS5zaGwgPSBMb25nUHJvdG90eXBlLnNoaWZ0TGVmdDtcblxuLyoqXG4gKiBSZXR1cm5zIHRoaXMgTG9uZyB3aXRoIGJpdHMgYXJpdGhtZXRpY2FsbHkgc2hpZnRlZCB0byB0aGUgcmlnaHQgYnkgdGhlIGdpdmVuIGFtb3VudC5cbiAqIEB0aGlzIHshTG9uZ31cbiAqIEBwYXJhbSB7bnVtYmVyfCFMb25nfSBudW1CaXRzIE51bWJlciBvZiBiaXRzXG4gKiBAcmV0dXJucyB7IUxvbmd9IFNoaWZ0ZWQgTG9uZ1xuICovXG5Mb25nUHJvdG90eXBlLnNoaWZ0UmlnaHQgPSBmdW5jdGlvbiBzaGlmdFJpZ2h0KG51bUJpdHMpIHtcbiAgaWYgKGlzTG9uZyhudW1CaXRzKSlcbiAgICBudW1CaXRzID0gbnVtQml0cy50b0ludCgpO1xuICBpZiAoKG51bUJpdHMgJj0gNjMpID09PSAwKVxuICAgIHJldHVybiB0aGlzO1xuICBlbHNlIGlmIChudW1CaXRzIDwgMzIpXG4gICAgcmV0dXJuIGZyb21CaXRzKCh0aGlzLmxvdyA+Pj4gbnVtQml0cykgfCAodGhpcy5oaWdoIDw8ICgzMiAtIG51bUJpdHMpKSwgdGhpcy5oaWdoID4+IG51bUJpdHMsIHRoaXMudW5zaWduZWQpO1xuICBlbHNlXG4gICAgcmV0dXJuIGZyb21CaXRzKHRoaXMuaGlnaCA+PiAobnVtQml0cyAtIDMyKSwgdGhpcy5oaWdoID49IDAgPyAwIDogLTEsIHRoaXMudW5zaWduZWQpO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoaXMgTG9uZyB3aXRoIGJpdHMgYXJpdGhtZXRpY2FsbHkgc2hpZnRlZCB0byB0aGUgcmlnaHQgYnkgdGhlIGdpdmVuIGFtb3VudC4gVGhpcyBpcyBhbiBhbGlhcyBvZiB7QGxpbmsgTG9uZyNzaGlmdFJpZ2h0fS5cbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtudW1iZXJ8IUxvbmd9IG51bUJpdHMgTnVtYmVyIG9mIGJpdHNcbiAqIEByZXR1cm5zIHshTG9uZ30gU2hpZnRlZCBMb25nXG4gKi9cbkxvbmdQcm90b3R5cGUuc2hyID0gTG9uZ1Byb3RvdHlwZS5zaGlmdFJpZ2h0O1xuXG4vKipcbiAqIFJldHVybnMgdGhpcyBMb25nIHdpdGggYml0cyBsb2dpY2FsbHkgc2hpZnRlZCB0byB0aGUgcmlnaHQgYnkgdGhlIGdpdmVuIGFtb3VudC5cbiAqIEB0aGlzIHshTG9uZ31cbiAqIEBwYXJhbSB7bnVtYmVyfCFMb25nfSBudW1CaXRzIE51bWJlciBvZiBiaXRzXG4gKiBAcmV0dXJucyB7IUxvbmd9IFNoaWZ0ZWQgTG9uZ1xuICovXG5Mb25nUHJvdG90eXBlLnNoaWZ0UmlnaHRVbnNpZ25lZCA9IGZ1bmN0aW9uIHNoaWZ0UmlnaHRVbnNpZ25lZChudW1CaXRzKSB7XG4gIGlmIChpc0xvbmcobnVtQml0cykpIG51bUJpdHMgPSBudW1CaXRzLnRvSW50KCk7XG4gIGlmICgobnVtQml0cyAmPSA2MykgPT09IDApIHJldHVybiB0aGlzO1xuICBpZiAobnVtQml0cyA8IDMyKSByZXR1cm4gZnJvbUJpdHMoKHRoaXMubG93ID4+PiBudW1CaXRzKSB8ICh0aGlzLmhpZ2ggPDwgKDMyIC0gbnVtQml0cykpLCB0aGlzLmhpZ2ggPj4+IG51bUJpdHMsIHRoaXMudW5zaWduZWQpO1xuICBpZiAobnVtQml0cyA9PT0gMzIpIHJldHVybiBmcm9tQml0cyh0aGlzLmhpZ2gsIDAsIHRoaXMudW5zaWduZWQpO1xuICByZXR1cm4gZnJvbUJpdHModGhpcy5oaWdoID4+PiAobnVtQml0cyAtIDMyKSwgMCwgdGhpcy51bnNpZ25lZCk7XG59O1xuXG4vKipcbiAqIFJldHVybnMgdGhpcyBMb25nIHdpdGggYml0cyBsb2dpY2FsbHkgc2hpZnRlZCB0byB0aGUgcmlnaHQgYnkgdGhlIGdpdmVuIGFtb3VudC4gVGhpcyBpcyBhbiBhbGlhcyBvZiB7QGxpbmsgTG9uZyNzaGlmdFJpZ2h0VW5zaWduZWR9LlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge251bWJlcnwhTG9uZ30gbnVtQml0cyBOdW1iZXIgb2YgYml0c1xuICogQHJldHVybnMgeyFMb25nfSBTaGlmdGVkIExvbmdcbiAqL1xuTG9uZ1Byb3RvdHlwZS5zaHJ1ID0gTG9uZ1Byb3RvdHlwZS5zaGlmdFJpZ2h0VW5zaWduZWQ7XG5cbi8qKlxuICogUmV0dXJucyB0aGlzIExvbmcgd2l0aCBiaXRzIGxvZ2ljYWxseSBzaGlmdGVkIHRvIHRoZSByaWdodCBieSB0aGUgZ2l2ZW4gYW1vdW50LiBUaGlzIGlzIGFuIGFsaWFzIG9mIHtAbGluayBMb25nI3NoaWZ0UmlnaHRVbnNpZ25lZH0uXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyfCFMb25nfSBudW1CaXRzIE51bWJlciBvZiBiaXRzXG4gKiBAcmV0dXJucyB7IUxvbmd9IFNoaWZ0ZWQgTG9uZ1xuICovXG5Mb25nUHJvdG90eXBlLnNocl91ID0gTG9uZ1Byb3RvdHlwZS5zaGlmdFJpZ2h0VW5zaWduZWQ7XG5cbi8qKlxuICogUmV0dXJucyB0aGlzIExvbmcgd2l0aCBiaXRzIHJvdGF0ZWQgdG8gdGhlIGxlZnQgYnkgdGhlIGdpdmVuIGFtb3VudC5cbiAqIEB0aGlzIHshTG9uZ31cbiAqIEBwYXJhbSB7bnVtYmVyfCFMb25nfSBudW1CaXRzIE51bWJlciBvZiBiaXRzXG4gKiBAcmV0dXJucyB7IUxvbmd9IFJvdGF0ZWQgTG9uZ1xuICovXG5Mb25nUHJvdG90eXBlLnJvdGF0ZUxlZnQgPSBmdW5jdGlvbiByb3RhdGVMZWZ0KG51bUJpdHMpIHtcbiAgdmFyIGI7XG4gIGlmIChpc0xvbmcobnVtQml0cykpIG51bUJpdHMgPSBudW1CaXRzLnRvSW50KCk7XG4gIGlmICgobnVtQml0cyAmPSA2MykgPT09IDApIHJldHVybiB0aGlzO1xuICBpZiAobnVtQml0cyA9PT0gMzIpIHJldHVybiBmcm9tQml0cyh0aGlzLmhpZ2gsIHRoaXMubG93LCB0aGlzLnVuc2lnbmVkKTtcbiAgaWYgKG51bUJpdHMgPCAzMikge1xuICAgIGIgPSAoMzIgLSBudW1CaXRzKTtcbiAgICByZXR1cm4gZnJvbUJpdHMoKCh0aGlzLmxvdyA8PCBudW1CaXRzKSB8ICh0aGlzLmhpZ2ggPj4+IGIpKSwgKCh0aGlzLmhpZ2ggPDwgbnVtQml0cykgfCAodGhpcy5sb3cgPj4+IGIpKSwgdGhpcy51bnNpZ25lZCk7XG4gIH1cbiAgbnVtQml0cyAtPSAzMjtcbiAgYiA9ICgzMiAtIG51bUJpdHMpO1xuICByZXR1cm4gZnJvbUJpdHMoKCh0aGlzLmhpZ2ggPDwgbnVtQml0cykgfCAodGhpcy5sb3cgPj4+IGIpKSwgKCh0aGlzLmxvdyA8PCBudW1CaXRzKSB8ICh0aGlzLmhpZ2ggPj4+IGIpKSwgdGhpcy51bnNpZ25lZCk7XG59XG4vKipcbiAqIFJldHVybnMgdGhpcyBMb25nIHdpdGggYml0cyByb3RhdGVkIHRvIHRoZSBsZWZ0IGJ5IHRoZSBnaXZlbiBhbW91bnQuIFRoaXMgaXMgYW4gYWxpYXMgb2Yge0BsaW5rIExvbmcjcm90YXRlTGVmdH0uXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyfCFMb25nfSBudW1CaXRzIE51bWJlciBvZiBiaXRzXG4gKiBAcmV0dXJucyB7IUxvbmd9IFJvdGF0ZWQgTG9uZ1xuICovXG5Mb25nUHJvdG90eXBlLnJvdGwgPSBMb25nUHJvdG90eXBlLnJvdGF0ZUxlZnQ7XG5cbi8qKlxuICogUmV0dXJucyB0aGlzIExvbmcgd2l0aCBiaXRzIHJvdGF0ZWQgdG8gdGhlIHJpZ2h0IGJ5IHRoZSBnaXZlbiBhbW91bnQuXG4gKiBAdGhpcyB7IUxvbmd9XG4gKiBAcGFyYW0ge251bWJlcnwhTG9uZ30gbnVtQml0cyBOdW1iZXIgb2YgYml0c1xuICogQHJldHVybnMgeyFMb25nfSBSb3RhdGVkIExvbmdcbiAqL1xuTG9uZ1Byb3RvdHlwZS5yb3RhdGVSaWdodCA9IGZ1bmN0aW9uIHJvdGF0ZVJpZ2h0KG51bUJpdHMpIHtcbiAgdmFyIGI7XG4gIGlmIChpc0xvbmcobnVtQml0cykpIG51bUJpdHMgPSBudW1CaXRzLnRvSW50KCk7XG4gIGlmICgobnVtQml0cyAmPSA2MykgPT09IDApIHJldHVybiB0aGlzO1xuICBpZiAobnVtQml0cyA9PT0gMzIpIHJldHVybiBmcm9tQml0cyh0aGlzLmhpZ2gsIHRoaXMubG93LCB0aGlzLnVuc2lnbmVkKTtcbiAgaWYgKG51bUJpdHMgPCAzMikge1xuICAgIGIgPSAoMzIgLSBudW1CaXRzKTtcbiAgICByZXR1cm4gZnJvbUJpdHMoKCh0aGlzLmhpZ2ggPDwgYikgfCAodGhpcy5sb3cgPj4+IG51bUJpdHMpKSwgKCh0aGlzLmxvdyA8PCBiKSB8ICh0aGlzLmhpZ2ggPj4+IG51bUJpdHMpKSwgdGhpcy51bnNpZ25lZCk7XG4gIH1cbiAgbnVtQml0cyAtPSAzMjtcbiAgYiA9ICgzMiAtIG51bUJpdHMpO1xuICByZXR1cm4gZnJvbUJpdHMoKCh0aGlzLmxvdyA8PCBiKSB8ICh0aGlzLmhpZ2ggPj4+IG51bUJpdHMpKSwgKCh0aGlzLmhpZ2ggPDwgYikgfCAodGhpcy5sb3cgPj4+IG51bUJpdHMpKSwgdGhpcy51bnNpZ25lZCk7XG59XG4vKipcbiAqIFJldHVybnMgdGhpcyBMb25nIHdpdGggYml0cyByb3RhdGVkIHRvIHRoZSByaWdodCBieSB0aGUgZ2l2ZW4gYW1vdW50LiBUaGlzIGlzIGFuIGFsaWFzIG9mIHtAbGluayBMb25nI3JvdGF0ZVJpZ2h0fS5cbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtudW1iZXJ8IUxvbmd9IG51bUJpdHMgTnVtYmVyIG9mIGJpdHNcbiAqIEByZXR1cm5zIHshTG9uZ30gUm90YXRlZCBMb25nXG4gKi9cbkxvbmdQcm90b3R5cGUucm90ciA9IExvbmdQcm90b3R5cGUucm90YXRlUmlnaHQ7XG5cbi8qKlxuICogQ29udmVydHMgdGhpcyBMb25nIHRvIHNpZ25lZC5cbiAqIEB0aGlzIHshTG9uZ31cbiAqIEByZXR1cm5zIHshTG9uZ30gU2lnbmVkIGxvbmdcbiAqL1xuTG9uZ1Byb3RvdHlwZS50b1NpZ25lZCA9IGZ1bmN0aW9uIHRvU2lnbmVkKCkge1xuICBpZiAoIXRoaXMudW5zaWduZWQpXG4gICAgcmV0dXJuIHRoaXM7XG4gIHJldHVybiBmcm9tQml0cyh0aGlzLmxvdywgdGhpcy5oaWdoLCBmYWxzZSk7XG59O1xuXG4vKipcbiAqIENvbnZlcnRzIHRoaXMgTG9uZyB0byB1bnNpZ25lZC5cbiAqIEB0aGlzIHshTG9uZ31cbiAqIEByZXR1cm5zIHshTG9uZ30gVW5zaWduZWQgbG9uZ1xuICovXG5Mb25nUHJvdG90eXBlLnRvVW5zaWduZWQgPSBmdW5jdGlvbiB0b1Vuc2lnbmVkKCkge1xuICBpZiAodGhpcy51bnNpZ25lZClcbiAgICByZXR1cm4gdGhpcztcbiAgcmV0dXJuIGZyb21CaXRzKHRoaXMubG93LCB0aGlzLmhpZ2gsIHRydWUpO1xufTtcblxuLyoqXG4gKiBDb252ZXJ0cyB0aGlzIExvbmcgdG8gaXRzIGJ5dGUgcmVwcmVzZW50YXRpb24uXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSBsZSBXaGV0aGVyIGxpdHRsZSBvciBiaWcgZW5kaWFuLCBkZWZhdWx0cyB0byBiaWcgZW5kaWFuXG4gKiBAdGhpcyB7IUxvbmd9XG4gKiBAcmV0dXJucyB7IUFycmF5LjxudW1iZXI+fSBCeXRlIHJlcHJlc2VudGF0aW9uXG4gKi9cbkxvbmdQcm90b3R5cGUudG9CeXRlcyA9IGZ1bmN0aW9uIHRvQnl0ZXMobGUpIHtcbiAgcmV0dXJuIGxlID8gdGhpcy50b0J5dGVzTEUoKSA6IHRoaXMudG9CeXRlc0JFKCk7XG59O1xuXG4vKipcbiAqIENvbnZlcnRzIHRoaXMgTG9uZyB0byBpdHMgbGl0dGxlIGVuZGlhbiBieXRlIHJlcHJlc2VudGF0aW9uLlxuICogQHRoaXMgeyFMb25nfVxuICogQHJldHVybnMgeyFBcnJheS48bnVtYmVyPn0gTGl0dGxlIGVuZGlhbiBieXRlIHJlcHJlc2VudGF0aW9uXG4gKi9cbkxvbmdQcm90b3R5cGUudG9CeXRlc0xFID0gZnVuY3Rpb24gdG9CeXRlc0xFKCkge1xuICB2YXIgaGkgPSB0aGlzLmhpZ2gsXG4gICAgbG8gPSB0aGlzLmxvdztcbiAgcmV0dXJuIFtcbiAgICBsbyAmIDB4ZmYsXG4gICAgbG8gPj4+IDggJiAweGZmLFxuICAgIGxvID4+PiAxNiAmIDB4ZmYsXG4gICAgbG8gPj4+IDI0LFxuICAgIGhpICYgMHhmZixcbiAgICBoaSA+Pj4gOCAmIDB4ZmYsXG4gICAgaGkgPj4+IDE2ICYgMHhmZixcbiAgICBoaSA+Pj4gMjRcbiAgXTtcbn07XG5cbi8qKlxuICogQ29udmVydHMgdGhpcyBMb25nIHRvIGl0cyBiaWcgZW5kaWFuIGJ5dGUgcmVwcmVzZW50YXRpb24uXG4gKiBAdGhpcyB7IUxvbmd9XG4gKiBAcmV0dXJucyB7IUFycmF5LjxudW1iZXI+fSBCaWcgZW5kaWFuIGJ5dGUgcmVwcmVzZW50YXRpb25cbiAqL1xuTG9uZ1Byb3RvdHlwZS50b0J5dGVzQkUgPSBmdW5jdGlvbiB0b0J5dGVzQkUoKSB7XG4gIHZhciBoaSA9IHRoaXMuaGlnaCxcbiAgICBsbyA9IHRoaXMubG93O1xuICByZXR1cm4gW1xuICAgIGhpID4+PiAyNCxcbiAgICBoaSA+Pj4gMTYgJiAweGZmLFxuICAgIGhpID4+PiA4ICYgMHhmZixcbiAgICBoaSAmIDB4ZmYsXG4gICAgbG8gPj4+IDI0LFxuICAgIGxvID4+PiAxNiAmIDB4ZmYsXG4gICAgbG8gPj4+IDggJiAweGZmLFxuICAgIGxvICYgMHhmZlxuICBdO1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgTG9uZyBmcm9tIGl0cyBieXRlIHJlcHJlc2VudGF0aW9uLlxuICogQHBhcmFtIHshQXJyYXkuPG51bWJlcj59IGJ5dGVzIEJ5dGUgcmVwcmVzZW50YXRpb25cbiAqIEBwYXJhbSB7Ym9vbGVhbj19IHVuc2lnbmVkIFdoZXRoZXIgdW5zaWduZWQgb3Igbm90LCBkZWZhdWx0cyB0byBzaWduZWRcbiAqIEBwYXJhbSB7Ym9vbGVhbj19IGxlIFdoZXRoZXIgbGl0dGxlIG9yIGJpZyBlbmRpYW4sIGRlZmF1bHRzIHRvIGJpZyBlbmRpYW5cbiAqIEByZXR1cm5zIHtMb25nfSBUaGUgY29ycmVzcG9uZGluZyBMb25nIHZhbHVlXG4gKi9cbkxvbmcuZnJvbUJ5dGVzID0gZnVuY3Rpb24gZnJvbUJ5dGVzKGJ5dGVzLCB1bnNpZ25lZCwgbGUpIHtcbiAgcmV0dXJuIGxlID8gTG9uZy5mcm9tQnl0ZXNMRShieXRlcywgdW5zaWduZWQpIDogTG9uZy5mcm9tQnl0ZXNCRShieXRlcywgdW5zaWduZWQpO1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgTG9uZyBmcm9tIGl0cyBsaXR0bGUgZW5kaWFuIGJ5dGUgcmVwcmVzZW50YXRpb24uXG4gKiBAcGFyYW0geyFBcnJheS48bnVtYmVyPn0gYnl0ZXMgTGl0dGxlIGVuZGlhbiBieXRlIHJlcHJlc2VudGF0aW9uXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSB1bnNpZ25lZCBXaGV0aGVyIHVuc2lnbmVkIG9yIG5vdCwgZGVmYXVsdHMgdG8gc2lnbmVkXG4gKiBAcmV0dXJucyB7TG9uZ30gVGhlIGNvcnJlc3BvbmRpbmcgTG9uZyB2YWx1ZVxuICovXG5Mb25nLmZyb21CeXRlc0xFID0gZnVuY3Rpb24gZnJvbUJ5dGVzTEUoYnl0ZXMsIHVuc2lnbmVkKSB7XG4gIHJldHVybiBuZXcgTG9uZyhcbiAgICBieXRlc1swXSB8XG4gICAgYnl0ZXNbMV0gPDwgOCB8XG4gICAgYnl0ZXNbMl0gPDwgMTYgfFxuICAgIGJ5dGVzWzNdIDw8IDI0LFxuICAgIGJ5dGVzWzRdIHxcbiAgICBieXRlc1s1XSA8PCA4IHxcbiAgICBieXRlc1s2XSA8PCAxNiB8XG4gICAgYnl0ZXNbN10gPDwgMjQsXG4gICAgdW5zaWduZWRcbiAgKTtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhIExvbmcgZnJvbSBpdHMgYmlnIGVuZGlhbiBieXRlIHJlcHJlc2VudGF0aW9uLlxuICogQHBhcmFtIHshQXJyYXkuPG51bWJlcj59IGJ5dGVzIEJpZyBlbmRpYW4gYnl0ZSByZXByZXNlbnRhdGlvblxuICogQHBhcmFtIHtib29sZWFuPX0gdW5zaWduZWQgV2hldGhlciB1bnNpZ25lZCBvciBub3QsIGRlZmF1bHRzIHRvIHNpZ25lZFxuICogQHJldHVybnMge0xvbmd9IFRoZSBjb3JyZXNwb25kaW5nIExvbmcgdmFsdWVcbiAqL1xuTG9uZy5mcm9tQnl0ZXNCRSA9IGZ1bmN0aW9uIGZyb21CeXRlc0JFKGJ5dGVzLCB1bnNpZ25lZCkge1xuICByZXR1cm4gbmV3IExvbmcoXG4gICAgYnl0ZXNbNF0gPDwgMjQgfFxuICAgIGJ5dGVzWzVdIDw8IDE2IHxcbiAgICBieXRlc1s2XSA8PCA4IHxcbiAgICBieXRlc1s3XSxcbiAgICBieXRlc1swXSA8PCAyNCB8XG4gICAgYnl0ZXNbMV0gPDwgMTYgfFxuICAgIGJ5dGVzWzJdIDw8IDggfFxuICAgIGJ5dGVzWzNdLFxuICAgIHVuc2lnbmVkXG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBMb25nO1xuIiwgIi8qIGVzbGludC1kaXNhYmxlICovXG5pbXBvcnQgKiBhcyBMb25nIGZyb20gJ2xvbmcnO1xuaW1wb3J0IHtjb25maWd1cmUsIFJlYWRlciwgdXRpbCwgV3JpdGVyfSBmcm9tICdwcm90b2J1ZmpzL21pbmltYWwnO1xuXG5leHBvcnQgY29uc3QgcHJvdG9idWZQYWNrYWdlID0gJyc7XG5cbmV4cG9ydCBlbnVtIE1zZ1R5cGUge1xuXHRJbml0ID0gMCxcblx0U2Vuc29yRGF0YSA9IDEsXG5cdENvbnRyb2wgPSAyLFxuXHRVTlJFQ09HTklaRUQgPSAtMSxcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1zZ1R5cGVGcm9tSlNPTihvYmplY3Q6IGFueSk6IE1zZ1R5cGUge1xuXHRzd2l0Y2ggKG9iamVjdCkge1xuXHRcdGNhc2UgMDpcblx0XHRjYXNlICdJbml0Jzpcblx0XHRcdHJldHVybiBNc2dUeXBlLkluaXQ7XG5cdFx0Y2FzZSAxOlxuXHRcdGNhc2UgJ1NlbnNvckRhdGEnOlxuXHRcdFx0cmV0dXJuIE1zZ1R5cGUuU2Vuc29yRGF0YTtcblx0XHRjYXNlIDI6XG5cdFx0Y2FzZSAnQ29udHJvbCc6XG5cdFx0XHRyZXR1cm4gTXNnVHlwZS5Db250cm9sO1xuXHRcdGNhc2UgLTE6XG5cdFx0Y2FzZSAnVU5SRUNPR05JWkVEJzpcblx0XHRkZWZhdWx0OlxuXHRcdFx0cmV0dXJuIE1zZ1R5cGUuVU5SRUNPR05JWkVEO1xuXHR9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtc2dUeXBlVG9KU09OKG9iamVjdDogTXNnVHlwZSk6IHN0cmluZyB7XG5cdHN3aXRjaCAob2JqZWN0KSB7XG5cdFx0Y2FzZSBNc2dUeXBlLkluaXQ6XG5cdFx0XHRyZXR1cm4gJ0luaXQnO1xuXHRcdGNhc2UgTXNnVHlwZS5TZW5zb3JEYXRhOlxuXHRcdFx0cmV0dXJuICdTZW5zb3JEYXRhJztcblx0XHRjYXNlIE1zZ1R5cGUuQ29udHJvbDpcblx0XHRcdHJldHVybiAnQ29udHJvbCc7XG5cdFx0ZGVmYXVsdDpcblx0XHRcdHJldHVybiAnVU5LTk9XTic7XG5cdH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBBY2tQYWNrZXQge31cblxuZXhwb3J0IGludGVyZmFjZSBQb3NpdGlvbiB7XG5cdHg6IG51bWJlcjtcblx0eTogbnVtYmVyO1xuXHRoZWFkaW5nOiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2Vuc29yUGFja2V0IHtcblx0bGVmdDogbnVtYmVyO1xuXHRmcm9udDogbnVtYmVyO1xuXHRyaWdodDogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE5hdmlnYXRpb25QYWNrZXQge1xuXHRzZW5zb3JzOiBTZW5zb3JQYWNrZXR8dW5kZWZpbmVkO1xuXHRwb3NpdGlvbjogUG9zaXRpb258dW5kZWZpbmVkO1xuXHRsZWZ0TW90b3JTcGVlZDogbnVtYmVyO1xuXHRyaWdodE1vdG9yU3BlZWQ6IG51bWJlcjtcblx0bGVmdEVuY29kZXJUb3RhbDogbnVtYmVyO1xuXHRyaWdodEVuY29kZXJUb3RhbDogbnVtYmVyO1xuXHR2b2x0YWdlOiBudW1iZXI7XG5cdGJhdFBlcmNlbnRhZ2U6IG51bWJlcjtcblx0dGltZXN0YW1wOiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWF1c091dGdvaW5nTWVzc2FnZSB7XG5cdGFjazogQWNrUGFja2V0fHVuZGVmaW5lZDtcblx0bmF2OiBOYXZpZ2F0aW9uUGFja2V0fHVuZGVmaW5lZDtcbn1cblxuLyoqIGNvbW1hbmQgaW5kaWNhdGVzIHJlbW90ZSBjbGllbnQgY29ubmVjdGlvbiAqL1xuZXhwb3J0IGludGVyZmFjZSBNc2dJbml0IHtcblx0dmVyc2lvbjogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE1zZ0NvbnRyb2wge1xuXHRkaXJlY3Rpb246IG51bWJlcjtcblx0c3BlZWQ6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBNc2dFbmNvZGVyQ2FsbGlicmF0aW9uIHtcblx0a1A6IG51bWJlcjtcblx0a0k6IG51bWJlcjtcblx0a0Q6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBNYXVzSW5jb21pbmdNZXNzYWdlIHtcblx0aW5pdDogTXNnSW5pdHx1bmRlZmluZWQ7XG5cdGNvbnRyb2w6IE1zZ0NvbnRyb2x8dW5kZWZpbmVkO1xuXHRlbmNvZGVyQ2FsbGlicmF0aW9uOiBNc2dFbmNvZGVyQ2FsbGlicmF0aW9ufHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQmFzZUFja1BhY2tldCgpOiBBY2tQYWNrZXQge1xuXHRyZXR1cm4ge307XG59XG5cbmV4cG9ydCBjb25zdCBBY2tQYWNrZXQgPSB7XG5cdGVuY29kZShfOiBBY2tQYWNrZXQsIHdyaXRlcjogV3JpdGVyID0gV3JpdGVyLmNyZWF0ZSgpKTogV3JpdGVyIHtcblx0XHRyZXR1cm4gd3JpdGVyO1xuXHR9LFxuXG5cdGRlY29kZShpbnB1dDogUmVhZGVyfFVpbnQ4QXJyYXksIGxlbmd0aD86IG51bWJlcik6IEFja1BhY2tldCB7XG5cdFx0Y29uc3QgcmVhZGVyID0gaW5wdXQgaW5zdGFuY2VvZiBSZWFkZXIgPyBpbnB1dCA6IG5ldyBSZWFkZXIoaW5wdXQpO1xuXHRcdGxldCBlbmQgPSBsZW5ndGggPT09IHVuZGVmaW5lZCA/IHJlYWRlci5sZW4gOiByZWFkZXIucG9zICsgbGVuZ3RoO1xuXHRcdGNvbnN0IG1lc3NhZ2UgPSBjcmVhdGVCYXNlQWNrUGFja2V0KCk7XG5cdFx0d2hpbGUgKHJlYWRlci5wb3MgPCBlbmQpIHtcblx0XHRcdGNvbnN0IHRhZyA9IHJlYWRlci51aW50MzIoKTtcblx0XHRcdHN3aXRjaCAodGFnID4+PiAzKSB7XG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0cmVhZGVyLnNraXBUeXBlKHRhZyAmIDcpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gbWVzc2FnZTtcblx0fSxcblxuXHRmcm9tSlNPTihfOiBhbnkpOiBBY2tQYWNrZXQge1xuXHRcdHJldHVybiB7fTtcblx0fSxcblxuXHR0b0pTT04oXzogQWNrUGFja2V0KTogdW5rbm93biB7XG5cdFx0Y29uc3Qgb2JqOiBhbnkgPSB7fTtcblx0XHRyZXR1cm4gb2JqO1xuXHR9LFxuXG5cdGZyb21QYXJ0aWFsPEkgZXh0ZW5kcyBFeGFjdDxEZWVwUGFydGlhbDxBY2tQYWNrZXQ+LCBJPj4oXzogSSk6IEFja1BhY2tldCB7XG5cdFx0Y29uc3QgbWVzc2FnZSA9IGNyZWF0ZUJhc2VBY2tQYWNrZXQoKTtcblx0XHRyZXR1cm4gbWVzc2FnZTtcblx0fSxcbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZUJhc2VQb3NpdGlvbigpOiBQb3NpdGlvbiB7XG5cdHJldHVybiB7eDogMCwgeTogMCwgaGVhZGluZzogMH07XG59XG5cbmV4cG9ydCBjb25zdCBQb3NpdGlvbiA9IHtcblx0ZW5jb2RlKG1lc3NhZ2U6IFBvc2l0aW9uLCB3cml0ZXI6IFdyaXRlciA9IFdyaXRlci5jcmVhdGUoKSk6IFdyaXRlciB7XG5cdFx0aWYgKG1lc3NhZ2UueCAhPT0gMCkge1xuXHRcdFx0d3JpdGVyLnVpbnQzMigxMykuZmxvYXQobWVzc2FnZS54KTtcblx0XHR9XG5cdFx0aWYgKG1lc3NhZ2UueSAhPT0gMCkge1xuXHRcdFx0d3JpdGVyLnVpbnQzMigyMSkuZmxvYXQobWVzc2FnZS55KTtcblx0XHR9XG5cdFx0aWYgKG1lc3NhZ2UuaGVhZGluZyAhPT0gMCkge1xuXHRcdFx0d3JpdGVyLnVpbnQzMigyOSkuZmxvYXQobWVzc2FnZS5oZWFkaW5nKTtcblx0XHR9XG5cdFx0cmV0dXJuIHdyaXRlcjtcblx0fSxcblxuXHRkZWNvZGUoaW5wdXQ6IFJlYWRlcnxVaW50OEFycmF5LCBsZW5ndGg/OiBudW1iZXIpOiBQb3NpdGlvbiB7XG5cdFx0Y29uc3QgcmVhZGVyID0gaW5wdXQgaW5zdGFuY2VvZiBSZWFkZXIgPyBpbnB1dCA6IG5ldyBSZWFkZXIoaW5wdXQpO1xuXHRcdGxldCBlbmQgPSBsZW5ndGggPT09IHVuZGVmaW5lZCA/IHJlYWRlci5sZW4gOiByZWFkZXIucG9zICsgbGVuZ3RoO1xuXHRcdGNvbnN0IG1lc3NhZ2UgPSBjcmVhdGVCYXNlUG9zaXRpb24oKTtcblx0XHR3aGlsZSAocmVhZGVyLnBvcyA8IGVuZCkge1xuXHRcdFx0Y29uc3QgdGFnID0gcmVhZGVyLnVpbnQzMigpO1xuXHRcdFx0c3dpdGNoICh0YWcgPj4+IDMpIHtcblx0XHRcdFx0Y2FzZSAxOlxuXHRcdFx0XHRcdG1lc3NhZ2UueCA9IHJlYWRlci5mbG9hdCgpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIDI6XG5cdFx0XHRcdFx0bWVzc2FnZS55ID0gcmVhZGVyLmZsb2F0KCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgMzpcblx0XHRcdFx0XHRtZXNzYWdlLmhlYWRpbmcgPSByZWFkZXIuZmxvYXQoKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRyZWFkZXIuc2tpcFR5cGUodGFnICYgNyk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBtZXNzYWdlO1xuXHR9LFxuXG5cdGZyb21KU09OKG9iamVjdDogYW55KTogUG9zaXRpb24ge1xuXHRcdHJldHVybiB7XG5cdFx0XHR4OiBpc1NldChvYmplY3QueCkgPyBOdW1iZXIob2JqZWN0LngpIDogMCxcblx0XHRcdHk6IGlzU2V0KG9iamVjdC55KSA/IE51bWJlcihvYmplY3QueSkgOiAwLFxuXHRcdFx0aGVhZGluZzogaXNTZXQob2JqZWN0LmhlYWRpbmcpID8gTnVtYmVyKG9iamVjdC5oZWFkaW5nKSA6IDAsXG5cdFx0fTtcblx0fSxcblxuXHR0b0pTT04obWVzc2FnZTogUG9zaXRpb24pOiB1bmtub3duIHtcblx0XHRjb25zdCBvYmo6IGFueSA9IHt9O1xuXHRcdG1lc3NhZ2UueCAhPT0gdW5kZWZpbmVkICYmIChvYmoueCA9IG1lc3NhZ2UueCk7XG5cdFx0bWVzc2FnZS55ICE9PSB1bmRlZmluZWQgJiYgKG9iai55ID0gbWVzc2FnZS55KTtcblx0XHRtZXNzYWdlLmhlYWRpbmcgIT09IHVuZGVmaW5lZCAmJiAob2JqLmhlYWRpbmcgPSBtZXNzYWdlLmhlYWRpbmcpO1xuXHRcdHJldHVybiBvYmo7XG5cdH0sXG5cblx0ZnJvbVBhcnRpYWw8SSBleHRlbmRzIEV4YWN0PERlZXBQYXJ0aWFsPFBvc2l0aW9uPiwgST4+KG9iamVjdDogSSk6IFBvc2l0aW9uIHtcblx0XHRjb25zdCBtZXNzYWdlID0gY3JlYXRlQmFzZVBvc2l0aW9uKCk7XG5cdFx0bWVzc2FnZS54ID0gb2JqZWN0LnggPz8gMDtcblx0XHRtZXNzYWdlLnkgPSBvYmplY3QueSA/PyAwO1xuXHRcdG1lc3NhZ2UuaGVhZGluZyA9IG9iamVjdC5oZWFkaW5nID8/IDA7XG5cdFx0cmV0dXJuIG1lc3NhZ2U7XG5cdH0sXG59O1xuXG5mdW5jdGlvbiBjcmVhdGVCYXNlU2Vuc29yUGFja2V0KCk6IFNlbnNvclBhY2tldCB7XG5cdHJldHVybiB7bGVmdDogMCwgZnJvbnQ6IDAsIHJpZ2h0OiAwfTtcbn1cblxuZXhwb3J0IGNvbnN0IFNlbnNvclBhY2tldCA9IHtcblx0ZW5jb2RlKG1lc3NhZ2U6IFNlbnNvclBhY2tldCwgd3JpdGVyOiBXcml0ZXIgPSBXcml0ZXIuY3JlYXRlKCkpOiBXcml0ZXIge1xuXHRcdGlmIChtZXNzYWdlLmxlZnQgIT09IDApIHtcblx0XHRcdHdyaXRlci51aW50MzIoMTMpLmZsb2F0KG1lc3NhZ2UubGVmdCk7XG5cdFx0fVxuXHRcdGlmIChtZXNzYWdlLmZyb250ICE9PSAwKSB7XG5cdFx0XHR3cml0ZXIudWludDMyKDIxKS5mbG9hdChtZXNzYWdlLmZyb250KTtcblx0XHR9XG5cdFx0aWYgKG1lc3NhZ2UucmlnaHQgIT09IDApIHtcblx0XHRcdHdyaXRlci51aW50MzIoMjkpLmZsb2F0KG1lc3NhZ2UucmlnaHQpO1xuXHRcdH1cblx0XHRyZXR1cm4gd3JpdGVyO1xuXHR9LFxuXG5cdGRlY29kZShpbnB1dDogUmVhZGVyfFVpbnQ4QXJyYXksIGxlbmd0aD86IG51bWJlcik6IFNlbnNvclBhY2tldCB7XG5cdFx0Y29uc3QgcmVhZGVyID0gaW5wdXQgaW5zdGFuY2VvZiBSZWFkZXIgPyBpbnB1dCA6IG5ldyBSZWFkZXIoaW5wdXQpO1xuXHRcdGxldCBlbmQgPSBsZW5ndGggPT09IHVuZGVmaW5lZCA/IHJlYWRlci5sZW4gOiByZWFkZXIucG9zICsgbGVuZ3RoO1xuXHRcdGNvbnN0IG1lc3NhZ2UgPSBjcmVhdGVCYXNlU2Vuc29yUGFja2V0KCk7XG5cdFx0d2hpbGUgKHJlYWRlci5wb3MgPCBlbmQpIHtcblx0XHRcdGNvbnN0IHRhZyA9IHJlYWRlci51aW50MzIoKTtcblx0XHRcdHN3aXRjaCAodGFnID4+PiAzKSB7XG5cdFx0XHRcdGNhc2UgMTpcblx0XHRcdFx0XHRtZXNzYWdlLmxlZnQgPSByZWFkZXIuZmxvYXQoKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAyOlxuXHRcdFx0XHRcdG1lc3NhZ2UuZnJvbnQgPSByZWFkZXIuZmxvYXQoKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAzOlxuXHRcdFx0XHRcdG1lc3NhZ2UucmlnaHQgPSByZWFkZXIuZmxvYXQoKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRyZWFkZXIuc2tpcFR5cGUodGFnICYgNyk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBtZXNzYWdlO1xuXHR9LFxuXG5cdGZyb21KU09OKG9iamVjdDogYW55KTogU2Vuc29yUGFja2V0IHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0bGVmdDogaXNTZXQob2JqZWN0LmxlZnQpID8gTnVtYmVyKG9iamVjdC5sZWZ0KSA6IDAsXG5cdFx0XHRmcm9udDogaXNTZXQob2JqZWN0LmZyb250KSA/IE51bWJlcihvYmplY3QuZnJvbnQpIDogMCxcblx0XHRcdHJpZ2h0OiBpc1NldChvYmplY3QucmlnaHQpID8gTnVtYmVyKG9iamVjdC5yaWdodCkgOiAwLFxuXHRcdH07XG5cdH0sXG5cblx0dG9KU09OKG1lc3NhZ2U6IFNlbnNvclBhY2tldCk6IHVua25vd24ge1xuXHRcdGNvbnN0IG9iajogYW55ID0ge307XG5cdFx0bWVzc2FnZS5sZWZ0ICE9PSB1bmRlZmluZWQgJiYgKG9iai5sZWZ0ID0gbWVzc2FnZS5sZWZ0KTtcblx0XHRtZXNzYWdlLmZyb250ICE9PSB1bmRlZmluZWQgJiYgKG9iai5mcm9udCA9IG1lc3NhZ2UuZnJvbnQpO1xuXHRcdG1lc3NhZ2UucmlnaHQgIT09IHVuZGVmaW5lZCAmJiAob2JqLnJpZ2h0ID0gbWVzc2FnZS5yaWdodCk7XG5cdFx0cmV0dXJuIG9iajtcblx0fSxcblxuXHRmcm9tUGFydGlhbDxJIGV4dGVuZHMgRXhhY3Q8RGVlcFBhcnRpYWw8U2Vuc29yUGFja2V0PiwgST4+KG9iamVjdDogSSk6IFNlbnNvclBhY2tldCB7XG5cdFx0Y29uc3QgbWVzc2FnZSA9IGNyZWF0ZUJhc2VTZW5zb3JQYWNrZXQoKTtcblx0XHRtZXNzYWdlLmxlZnQgPSBvYmplY3QubGVmdCA/PyAwO1xuXHRcdG1lc3NhZ2UuZnJvbnQgPSBvYmplY3QuZnJvbnQgPz8gMDtcblx0XHRtZXNzYWdlLnJpZ2h0ID0gb2JqZWN0LnJpZ2h0ID8/IDA7XG5cdFx0cmV0dXJuIG1lc3NhZ2U7XG5cdH0sXG59O1xuXG5mdW5jdGlvbiBjcmVhdGVCYXNlTmF2aWdhdGlvblBhY2tldCgpOiBOYXZpZ2F0aW9uUGFja2V0IHtcblx0cmV0dXJuIHtcblx0XHRzZW5zb3JzOiB1bmRlZmluZWQsXG5cdFx0cG9zaXRpb246IHVuZGVmaW5lZCxcblx0XHRsZWZ0TW90b3JTcGVlZDogMCxcblx0XHRyaWdodE1vdG9yU3BlZWQ6IDAsXG5cdFx0bGVmdEVuY29kZXJUb3RhbDogMCxcblx0XHRyaWdodEVuY29kZXJUb3RhbDogMCxcblx0XHR2b2x0YWdlOiAwLFxuXHRcdGJhdFBlcmNlbnRhZ2U6IDAsXG5cdFx0dGltZXN0YW1wOiAwLFxuXHR9O1xufVxuXG5leHBvcnQgY29uc3QgTmF2aWdhdGlvblBhY2tldCA9IHtcblx0ZW5jb2RlKG1lc3NhZ2U6IE5hdmlnYXRpb25QYWNrZXQsIHdyaXRlcjogV3JpdGVyID0gV3JpdGVyLmNyZWF0ZSgpKTogV3JpdGVyIHtcblx0XHRpZiAobWVzc2FnZS5zZW5zb3JzICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFNlbnNvclBhY2tldC5lbmNvZGUobWVzc2FnZS5zZW5zb3JzLCB3cml0ZXIudWludDMyKDEwKS5mb3JrKCkpLmxkZWxpbSgpO1xuXHRcdH1cblx0XHRpZiAobWVzc2FnZS5wb3NpdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRQb3NpdGlvbi5lbmNvZGUobWVzc2FnZS5wb3NpdGlvbiwgd3JpdGVyLnVpbnQzMigxOCkuZm9yaygpKS5sZGVsaW0oKTtcblx0XHR9XG5cdFx0aWYgKG1lc3NhZ2UubGVmdE1vdG9yU3BlZWQgIT09IDApIHtcblx0XHRcdHdyaXRlci51aW50MzIoMjkpLmZsb2F0KG1lc3NhZ2UubGVmdE1vdG9yU3BlZWQpO1xuXHRcdH1cblx0XHRpZiAobWVzc2FnZS5yaWdodE1vdG9yU3BlZWQgIT09IDApIHtcblx0XHRcdHdyaXRlci51aW50MzIoMzcpLmZsb2F0KG1lc3NhZ2UucmlnaHRNb3RvclNwZWVkKTtcblx0XHR9XG5cdFx0aWYgKG1lc3NhZ2UubGVmdEVuY29kZXJUb3RhbCAhPT0gMCkge1xuXHRcdFx0d3JpdGVyLnVpbnQzMig0MCkuaW50MzIobWVzc2FnZS5sZWZ0RW5jb2RlclRvdGFsKTtcblx0XHR9XG5cdFx0aWYgKG1lc3NhZ2UucmlnaHRFbmNvZGVyVG90YWwgIT09IDApIHtcblx0XHRcdHdyaXRlci51aW50MzIoNDgpLmludDMyKG1lc3NhZ2UucmlnaHRFbmNvZGVyVG90YWwpO1xuXHRcdH1cblx0XHRpZiAobWVzc2FnZS52b2x0YWdlICE9PSAwKSB7XG5cdFx0XHR3cml0ZXIudWludDMyKDYxKS5mbG9hdChtZXNzYWdlLnZvbHRhZ2UpO1xuXHRcdH1cblx0XHRpZiAobWVzc2FnZS5iYXRQZXJjZW50YWdlICE9PSAwKSB7XG5cdFx0XHR3cml0ZXIudWludDMyKDY5KS5mbG9hdChtZXNzYWdlLmJhdFBlcmNlbnRhZ2UpO1xuXHRcdH1cblx0XHRpZiAobWVzc2FnZS50aW1lc3RhbXAgIT09IDApIHtcblx0XHRcdHdyaXRlci51aW50MzIoNzIpLnVpbnQzMihtZXNzYWdlLnRpbWVzdGFtcCk7XG5cdFx0fVxuXHRcdHJldHVybiB3cml0ZXI7XG5cdH0sXG5cblx0ZGVjb2RlKGlucHV0OiBSZWFkZXJ8VWludDhBcnJheSwgbGVuZ3RoPzogbnVtYmVyKTogTmF2aWdhdGlvblBhY2tldCB7XG5cdFx0Y29uc3QgcmVhZGVyID0gaW5wdXQgaW5zdGFuY2VvZiBSZWFkZXIgPyBpbnB1dCA6IG5ldyBSZWFkZXIoaW5wdXQpO1xuXHRcdGxldCBlbmQgPSBsZW5ndGggPT09IHVuZGVmaW5lZCA/IHJlYWRlci5sZW4gOiByZWFkZXIucG9zICsgbGVuZ3RoO1xuXHRcdGNvbnN0IG1lc3NhZ2UgPSBjcmVhdGVCYXNlTmF2aWdhdGlvblBhY2tldCgpO1xuXHRcdHdoaWxlIChyZWFkZXIucG9zIDwgZW5kKSB7XG5cdFx0XHRjb25zdCB0YWcgPSByZWFkZXIudWludDMyKCk7XG5cdFx0XHRzd2l0Y2ggKHRhZyA+Pj4gMykge1xuXHRcdFx0XHRjYXNlIDE6XG5cdFx0XHRcdFx0bWVzc2FnZS5zZW5zb3JzID0gU2Vuc29yUGFja2V0LmRlY29kZShyZWFkZXIsIHJlYWRlci51aW50MzIoKSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgMjpcblx0XHRcdFx0XHRtZXNzYWdlLnBvc2l0aW9uID0gUG9zaXRpb24uZGVjb2RlKHJlYWRlciwgcmVhZGVyLnVpbnQzMigpKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAzOlxuXHRcdFx0XHRcdG1lc3NhZ2UubGVmdE1vdG9yU3BlZWQgPSByZWFkZXIuZmxvYXQoKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSA0OlxuXHRcdFx0XHRcdG1lc3NhZ2UucmlnaHRNb3RvclNwZWVkID0gcmVhZGVyLmZsb2F0KCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgNTpcblx0XHRcdFx0XHRtZXNzYWdlLmxlZnRFbmNvZGVyVG90YWwgPSByZWFkZXIuaW50MzIoKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSA2OlxuXHRcdFx0XHRcdG1lc3NhZ2UucmlnaHRFbmNvZGVyVG90YWwgPSByZWFkZXIuaW50MzIoKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSA3OlxuXHRcdFx0XHRcdG1lc3NhZ2Uudm9sdGFnZSA9IHJlYWRlci5mbG9hdCgpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIDg6XG5cdFx0XHRcdFx0bWVzc2FnZS5iYXRQZXJjZW50YWdlID0gcmVhZGVyLmZsb2F0KCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgOTpcblx0XHRcdFx0XHRtZXNzYWdlLnRpbWVzdGFtcCA9IHJlYWRlci51aW50MzIoKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRyZWFkZXIuc2tpcFR5cGUodGFnICYgNyk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBtZXNzYWdlO1xuXHR9LFxuXG5cdGZyb21KU09OKG9iamVjdDogYW55KTogTmF2aWdhdGlvblBhY2tldCB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHNlbnNvcnM6IGlzU2V0KG9iamVjdC5zZW5zb3JzKSA/IFNlbnNvclBhY2tldC5mcm9tSlNPTihvYmplY3Quc2Vuc29ycykgOiB1bmRlZmluZWQsXG5cdFx0XHRwb3NpdGlvbjogaXNTZXQob2JqZWN0LnBvc2l0aW9uKSA/IFBvc2l0aW9uLmZyb21KU09OKG9iamVjdC5wb3NpdGlvbikgOiB1bmRlZmluZWQsXG5cdFx0XHRsZWZ0TW90b3JTcGVlZDogaXNTZXQob2JqZWN0LmxlZnRNb3RvclNwZWVkKSA/IE51bWJlcihvYmplY3QubGVmdE1vdG9yU3BlZWQpIDogMCxcblx0XHRcdHJpZ2h0TW90b3JTcGVlZDogaXNTZXQob2JqZWN0LnJpZ2h0TW90b3JTcGVlZCkgPyBOdW1iZXIob2JqZWN0LnJpZ2h0TW90b3JTcGVlZCkgOiAwLFxuXHRcdFx0bGVmdEVuY29kZXJUb3RhbDogaXNTZXQob2JqZWN0LmxlZnRFbmNvZGVyVG90YWwpID8gTnVtYmVyKG9iamVjdC5sZWZ0RW5jb2RlclRvdGFsKSA6IDAsXG5cdFx0XHRyaWdodEVuY29kZXJUb3RhbDogaXNTZXQob2JqZWN0LnJpZ2h0RW5jb2RlclRvdGFsKSA/IE51bWJlcihvYmplY3QucmlnaHRFbmNvZGVyVG90YWwpIDpcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ICAgMCxcblx0XHRcdHZvbHRhZ2U6IGlzU2V0KG9iamVjdC52b2x0YWdlKSA/IE51bWJlcihvYmplY3Qudm9sdGFnZSkgOiAwLFxuXHRcdFx0YmF0UGVyY2VudGFnZTogaXNTZXQob2JqZWN0LmJhdFBlcmNlbnRhZ2UpID8gTnVtYmVyKG9iamVjdC5iYXRQZXJjZW50YWdlKSA6IDAsXG5cdFx0XHR0aW1lc3RhbXA6IGlzU2V0KG9iamVjdC50aW1lc3RhbXApID8gTnVtYmVyKG9iamVjdC50aW1lc3RhbXApIDogMCxcblx0XHR9O1xuXHR9LFxuXG5cdHRvSlNPTihtZXNzYWdlOiBOYXZpZ2F0aW9uUGFja2V0KTogdW5rbm93biB7XG5cdFx0Y29uc3Qgb2JqOiBhbnkgPSB7fTtcblx0XHRtZXNzYWdlLnNlbnNvcnMgIT09IHVuZGVmaW5lZCAmJlxuXHRcdFx0KG9iai5zZW5zb3JzID0gbWVzc2FnZS5zZW5zb3JzID8gU2Vuc29yUGFja2V0LnRvSlNPTihtZXNzYWdlLnNlbnNvcnMpIDogdW5kZWZpbmVkKTtcblx0XHRtZXNzYWdlLnBvc2l0aW9uICE9PSB1bmRlZmluZWQgJiZcblx0XHRcdChvYmoucG9zaXRpb24gPSBtZXNzYWdlLnBvc2l0aW9uID8gUG9zaXRpb24udG9KU09OKG1lc3NhZ2UucG9zaXRpb24pIDogdW5kZWZpbmVkKTtcblx0XHRtZXNzYWdlLmxlZnRNb3RvclNwZWVkICE9PSB1bmRlZmluZWQgJiYgKG9iai5sZWZ0TW90b3JTcGVlZCA9IG1lc3NhZ2UubGVmdE1vdG9yU3BlZWQpO1xuXHRcdG1lc3NhZ2UucmlnaHRNb3RvclNwZWVkICE9PSB1bmRlZmluZWQgJiYgKG9iai5yaWdodE1vdG9yU3BlZWQgPSBtZXNzYWdlLnJpZ2h0TW90b3JTcGVlZCk7XG5cdFx0bWVzc2FnZS5sZWZ0RW5jb2RlclRvdGFsICE9PSB1bmRlZmluZWQgJiZcblx0XHRcdChvYmoubGVmdEVuY29kZXJUb3RhbCA9IE1hdGgucm91bmQobWVzc2FnZS5sZWZ0RW5jb2RlclRvdGFsKSk7XG5cdFx0bWVzc2FnZS5yaWdodEVuY29kZXJUb3RhbCAhPT0gdW5kZWZpbmVkICYmXG5cdFx0XHQob2JqLnJpZ2h0RW5jb2RlclRvdGFsID0gTWF0aC5yb3VuZChtZXNzYWdlLnJpZ2h0RW5jb2RlclRvdGFsKSk7XG5cdFx0bWVzc2FnZS52b2x0YWdlICE9PSB1bmRlZmluZWQgJiYgKG9iai52b2x0YWdlID0gbWVzc2FnZS52b2x0YWdlKTtcblx0XHRtZXNzYWdlLmJhdFBlcmNlbnRhZ2UgIT09IHVuZGVmaW5lZCAmJiAob2JqLmJhdFBlcmNlbnRhZ2UgPSBtZXNzYWdlLmJhdFBlcmNlbnRhZ2UpO1xuXHRcdG1lc3NhZ2UudGltZXN0YW1wICE9PSB1bmRlZmluZWQgJiYgKG9iai50aW1lc3RhbXAgPSBNYXRoLnJvdW5kKG1lc3NhZ2UudGltZXN0YW1wKSk7XG5cdFx0cmV0dXJuIG9iajtcblx0fSxcblxuXHRmcm9tUGFydGlhbDxJIGV4dGVuZHMgRXhhY3Q8RGVlcFBhcnRpYWw8TmF2aWdhdGlvblBhY2tldD4sIEk+PihvYmplY3Q6IEkpOiBOYXZpZ2F0aW9uUGFja2V0IHtcblx0XHRjb25zdCBtZXNzYWdlID0gY3JlYXRlQmFzZU5hdmlnYXRpb25QYWNrZXQoKTtcblx0XHRtZXNzYWdlLnNlbnNvcnMgPSBvYmplY3Quc2Vuc29ycyAhPT0gdW5kZWZpbmVkICYmIG9iamVjdC5zZW5zb3JzICE9PSBudWxsID9cblx0XHRcdFNlbnNvclBhY2tldC5mcm9tUGFydGlhbChvYmplY3Quc2Vuc29ycykgOlxuXHRcdFx0ICB1bmRlZmluZWQ7XG5cdFx0bWVzc2FnZS5wb3NpdGlvbiA9IG9iamVjdC5wb3NpdGlvbiAhPT0gdW5kZWZpbmVkICYmIG9iamVjdC5wb3NpdGlvbiAhPT0gbnVsbCA/XG5cdFx0XHRQb3NpdGlvbi5mcm9tUGFydGlhbChvYmplY3QucG9zaXRpb24pIDpcblx0XHRcdCAgdW5kZWZpbmVkO1xuXHRcdG1lc3NhZ2UubGVmdE1vdG9yU3BlZWQgPSBvYmplY3QubGVmdE1vdG9yU3BlZWQgPz8gMDtcblx0XHRtZXNzYWdlLnJpZ2h0TW90b3JTcGVlZCA9IG9iamVjdC5yaWdodE1vdG9yU3BlZWQgPz8gMDtcblx0XHRtZXNzYWdlLmxlZnRFbmNvZGVyVG90YWwgPSBvYmplY3QubGVmdEVuY29kZXJUb3RhbCA/PyAwO1xuXHRcdG1lc3NhZ2UucmlnaHRFbmNvZGVyVG90YWwgPSBvYmplY3QucmlnaHRFbmNvZGVyVG90YWwgPz8gMDtcblx0XHRtZXNzYWdlLnZvbHRhZ2UgPSBvYmplY3Qudm9sdGFnZSA/PyAwO1xuXHRcdG1lc3NhZ2UuYmF0UGVyY2VudGFnZSA9IG9iamVjdC5iYXRQZXJjZW50YWdlID8/IDA7XG5cdFx0bWVzc2FnZS50aW1lc3RhbXAgPSBvYmplY3QudGltZXN0YW1wID8/IDA7XG5cdFx0cmV0dXJuIG1lc3NhZ2U7XG5cdH0sXG59O1xuXG5mdW5jdGlvbiBjcmVhdGVCYXNlTWF1c091dGdvaW5nTWVzc2FnZSgpOiBNYXVzT3V0Z29pbmdNZXNzYWdlIHtcblx0cmV0dXJuIHthY2s6IHVuZGVmaW5lZCwgbmF2OiB1bmRlZmluZWR9O1xufVxuXG5leHBvcnQgY29uc3QgTWF1c091dGdvaW5nTWVzc2FnZSA9IHtcblx0ZW5jb2RlKG1lc3NhZ2U6IE1hdXNPdXRnb2luZ01lc3NhZ2UsIHdyaXRlcjogV3JpdGVyID0gV3JpdGVyLmNyZWF0ZSgpKTogV3JpdGVyIHtcblx0XHRpZiAobWVzc2FnZS5hY2sgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0QWNrUGFja2V0LmVuY29kZShtZXNzYWdlLmFjaywgd3JpdGVyLnVpbnQzMigxMCkuZm9yaygpKS5sZGVsaW0oKTtcblx0XHR9XG5cdFx0aWYgKG1lc3NhZ2UubmF2ICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdE5hdmlnYXRpb25QYWNrZXQuZW5jb2RlKG1lc3NhZ2UubmF2LCB3cml0ZXIudWludDMyKDE4KS5mb3JrKCkpLmxkZWxpbSgpO1xuXHRcdH1cblx0XHRyZXR1cm4gd3JpdGVyO1xuXHR9LFxuXG5cdGRlY29kZShpbnB1dDogUmVhZGVyfFVpbnQ4QXJyYXksIGxlbmd0aD86IG51bWJlcik6IE1hdXNPdXRnb2luZ01lc3NhZ2Uge1xuXHRcdGNvbnN0IHJlYWRlciA9IGlucHV0IGluc3RhbmNlb2YgUmVhZGVyID8gaW5wdXQgOiBuZXcgUmVhZGVyKGlucHV0KTtcblx0XHRsZXQgZW5kID0gbGVuZ3RoID09PSB1bmRlZmluZWQgPyByZWFkZXIubGVuIDogcmVhZGVyLnBvcyArIGxlbmd0aDtcblx0XHRjb25zdCBtZXNzYWdlID0gY3JlYXRlQmFzZU1hdXNPdXRnb2luZ01lc3NhZ2UoKTtcblx0XHR3aGlsZSAocmVhZGVyLnBvcyA8IGVuZCkge1xuXHRcdFx0Y29uc3QgdGFnID0gcmVhZGVyLnVpbnQzMigpO1xuXHRcdFx0c3dpdGNoICh0YWcgPj4+IDMpIHtcblx0XHRcdFx0Y2FzZSAxOlxuXHRcdFx0XHRcdG1lc3NhZ2UuYWNrID0gQWNrUGFja2V0LmRlY29kZShyZWFkZXIsIHJlYWRlci51aW50MzIoKSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgMjpcblx0XHRcdFx0XHRtZXNzYWdlLm5hdiA9IE5hdmlnYXRpb25QYWNrZXQuZGVjb2RlKHJlYWRlciwgcmVhZGVyLnVpbnQzMigpKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRyZWFkZXIuc2tpcFR5cGUodGFnICYgNyk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBtZXNzYWdlO1xuXHR9LFxuXG5cdGZyb21KU09OKG9iamVjdDogYW55KTogTWF1c091dGdvaW5nTWVzc2FnZSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGFjazogaXNTZXQob2JqZWN0LmFjaykgPyBBY2tQYWNrZXQuZnJvbUpTT04ob2JqZWN0LmFjaykgOiB1bmRlZmluZWQsXG5cdFx0XHRuYXY6IGlzU2V0KG9iamVjdC5uYXYpID8gTmF2aWdhdGlvblBhY2tldC5mcm9tSlNPTihvYmplY3QubmF2KSA6IHVuZGVmaW5lZCxcblx0XHR9O1xuXHR9LFxuXG5cdHRvSlNPTihtZXNzYWdlOiBNYXVzT3V0Z29pbmdNZXNzYWdlKTogdW5rbm93biB7XG5cdFx0Y29uc3Qgb2JqOiBhbnkgPSB7fTtcblx0XHRtZXNzYWdlLmFjayAhPT0gdW5kZWZpbmVkICYmXG5cdFx0XHQob2JqLmFjayA9IG1lc3NhZ2UuYWNrID8gQWNrUGFja2V0LnRvSlNPTihtZXNzYWdlLmFjaykgOiB1bmRlZmluZWQpO1xuXHRcdG1lc3NhZ2UubmF2ICE9PSB1bmRlZmluZWQgJiZcblx0XHRcdChvYmoubmF2ID0gbWVzc2FnZS5uYXYgPyBOYXZpZ2F0aW9uUGFja2V0LnRvSlNPTihtZXNzYWdlLm5hdikgOiB1bmRlZmluZWQpO1xuXHRcdHJldHVybiBvYmo7XG5cdH0sXG5cblx0ZnJvbVBhcnRpYWw8SSBleHRlbmRzIEV4YWN0PERlZXBQYXJ0aWFsPE1hdXNPdXRnb2luZ01lc3NhZ2U+LCBJPj4ob2JqZWN0OiBJKTpcblx0XHRNYXVzT3V0Z29pbmdNZXNzYWdlIHtcblx0XHRcdGNvbnN0IG1lc3NhZ2UgPSBjcmVhdGVCYXNlTWF1c091dGdvaW5nTWVzc2FnZSgpO1xuXHRcdFx0bWVzc2FnZS5hY2sgPSBvYmplY3QuYWNrICE9PSB1bmRlZmluZWQgJiYgb2JqZWN0LmFjayAhPT0gbnVsbCA/XG5cdFx0XHRcdEFja1BhY2tldC5mcm9tUGFydGlhbChvYmplY3QuYWNrKSA6XG5cdFx0XHRcdCAgdW5kZWZpbmVkO1xuXHRcdFx0bWVzc2FnZS5uYXYgPSBvYmplY3QubmF2ICE9PSB1bmRlZmluZWQgJiYgb2JqZWN0Lm5hdiAhPT0gbnVsbCA/XG5cdFx0XHRcdE5hdmlnYXRpb25QYWNrZXQuZnJvbVBhcnRpYWwob2JqZWN0Lm5hdikgOlxuXHRcdFx0XHQgIHVuZGVmaW5lZDtcblx0XHRcdHJldHVybiBtZXNzYWdlO1xuXHRcdH0sXG59O1xuXG5mdW5jdGlvbiBjcmVhdGVCYXNlTXNnSW5pdCgpOiBNc2dJbml0IHtcblx0cmV0dXJuIHt2ZXJzaW9uOiAwfTtcbn1cblxuZXhwb3J0IGNvbnN0IE1zZ0luaXQgPSB7XG5cdGVuY29kZShtZXNzYWdlOiBNc2dJbml0LCB3cml0ZXI6IFdyaXRlciA9IFdyaXRlci5jcmVhdGUoKSk6IFdyaXRlciB7XG5cdFx0aWYgKG1lc3NhZ2UudmVyc2lvbiAhPT0gMCkge1xuXHRcdFx0d3JpdGVyLnVpbnQzMig4KS5pbnQzMihtZXNzYWdlLnZlcnNpb24pO1xuXHRcdH1cblx0XHRyZXR1cm4gd3JpdGVyO1xuXHR9LFxuXG5cdGRlY29kZShpbnB1dDogUmVhZGVyfFVpbnQ4QXJyYXksIGxlbmd0aD86IG51bWJlcik6IE1zZ0luaXQge1xuXHRcdGNvbnN0IHJlYWRlciA9IGlucHV0IGluc3RhbmNlb2YgUmVhZGVyID8gaW5wdXQgOiBuZXcgUmVhZGVyKGlucHV0KTtcblx0XHRsZXQgZW5kID0gbGVuZ3RoID09PSB1bmRlZmluZWQgPyByZWFkZXIubGVuIDogcmVhZGVyLnBvcyArIGxlbmd0aDtcblx0XHRjb25zdCBtZXNzYWdlID0gY3JlYXRlQmFzZU1zZ0luaXQoKTtcblx0XHR3aGlsZSAocmVhZGVyLnBvcyA8IGVuZCkge1xuXHRcdFx0Y29uc3QgdGFnID0gcmVhZGVyLnVpbnQzMigpO1xuXHRcdFx0c3dpdGNoICh0YWcgPj4+IDMpIHtcblx0XHRcdFx0Y2FzZSAxOlxuXHRcdFx0XHRcdG1lc3NhZ2UudmVyc2lvbiA9IHJlYWRlci5pbnQzMigpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdHJlYWRlci5za2lwVHlwZSh0YWcgJiA3KTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIG1lc3NhZ2U7XG5cdH0sXG5cblx0ZnJvbUpTT04ob2JqZWN0OiBhbnkpOiBNc2dJbml0IHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0dmVyc2lvbjogaXNTZXQob2JqZWN0LnZlcnNpb24pID8gTnVtYmVyKG9iamVjdC52ZXJzaW9uKSA6IDAsXG5cdFx0fTtcblx0fSxcblxuXHR0b0pTT04obWVzc2FnZTogTXNnSW5pdCk6IHVua25vd24ge1xuXHRcdGNvbnN0IG9iajogYW55ID0ge307XG5cdFx0bWVzc2FnZS52ZXJzaW9uICE9PSB1bmRlZmluZWQgJiYgKG9iai52ZXJzaW9uID0gTWF0aC5yb3VuZChtZXNzYWdlLnZlcnNpb24pKTtcblx0XHRyZXR1cm4gb2JqO1xuXHR9LFxuXG5cdGZyb21QYXJ0aWFsPEkgZXh0ZW5kcyBFeGFjdDxEZWVwUGFydGlhbDxNc2dJbml0PiwgST4+KG9iamVjdDogSSk6IE1zZ0luaXQge1xuXHRcdGNvbnN0IG1lc3NhZ2UgPSBjcmVhdGVCYXNlTXNnSW5pdCgpO1xuXHRcdG1lc3NhZ2UudmVyc2lvbiA9IG9iamVjdC52ZXJzaW9uID8/IDA7XG5cdFx0cmV0dXJuIG1lc3NhZ2U7XG5cdH0sXG59O1xuXG5mdW5jdGlvbiBjcmVhdGVCYXNlTXNnQ29udHJvbCgpOiBNc2dDb250cm9sIHtcblx0cmV0dXJuIHtkaXJlY3Rpb246IDAsIHNwZWVkOiAwfTtcbn1cblxuZXhwb3J0IGNvbnN0IE1zZ0NvbnRyb2wgPSB7XG5cdGVuY29kZShtZXNzYWdlOiBNc2dDb250cm9sLCB3cml0ZXI6IFdyaXRlciA9IFdyaXRlci5jcmVhdGUoKSk6IFdyaXRlciB7XG5cdFx0aWYgKG1lc3NhZ2UuZGlyZWN0aW9uICE9PSAwKSB7XG5cdFx0XHR3cml0ZXIudWludDMyKDEzKS5mbG9hdChtZXNzYWdlLmRpcmVjdGlvbik7XG5cdFx0fVxuXHRcdGlmIChtZXNzYWdlLnNwZWVkICE9PSAwKSB7XG5cdFx0XHR3cml0ZXIudWludDMyKDE2KS5pbnQzMihtZXNzYWdlLnNwZWVkKTtcblx0XHR9XG5cdFx0cmV0dXJuIHdyaXRlcjtcblx0fSxcblxuXHRkZWNvZGUoaW5wdXQ6IFJlYWRlcnxVaW50OEFycmF5LCBsZW5ndGg/OiBudW1iZXIpOiBNc2dDb250cm9sIHtcblx0XHRjb25zdCByZWFkZXIgPSBpbnB1dCBpbnN0YW5jZW9mIFJlYWRlciA/IGlucHV0IDogbmV3IFJlYWRlcihpbnB1dCk7XG5cdFx0bGV0IGVuZCA9IGxlbmd0aCA9PT0gdW5kZWZpbmVkID8gcmVhZGVyLmxlbiA6IHJlYWRlci5wb3MgKyBsZW5ndGg7XG5cdFx0Y29uc3QgbWVzc2FnZSA9IGNyZWF0ZUJhc2VNc2dDb250cm9sKCk7XG5cdFx0d2hpbGUgKHJlYWRlci5wb3MgPCBlbmQpIHtcblx0XHRcdGNvbnN0IHRhZyA9IHJlYWRlci51aW50MzIoKTtcblx0XHRcdHN3aXRjaCAodGFnID4+PiAzKSB7XG5cdFx0XHRcdGNhc2UgMTpcblx0XHRcdFx0XHRtZXNzYWdlLmRpcmVjdGlvbiA9IHJlYWRlci5mbG9hdCgpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIDI6XG5cdFx0XHRcdFx0bWVzc2FnZS5zcGVlZCA9IHJlYWRlci5pbnQzMigpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdHJlYWRlci5za2lwVHlwZSh0YWcgJiA3KTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIG1lc3NhZ2U7XG5cdH0sXG5cblx0ZnJvbUpTT04ob2JqZWN0OiBhbnkpOiBNc2dDb250cm9sIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0ZGlyZWN0aW9uOiBpc1NldChvYmplY3QuZGlyZWN0aW9uKSA/IE51bWJlcihvYmplY3QuZGlyZWN0aW9uKSA6IDAsXG5cdFx0XHRzcGVlZDogaXNTZXQob2JqZWN0LnNwZWVkKSA/IE51bWJlcihvYmplY3Quc3BlZWQpIDogMCxcblx0XHR9O1xuXHR9LFxuXG5cdHRvSlNPTihtZXNzYWdlOiBNc2dDb250cm9sKTogdW5rbm93biB7XG5cdFx0Y29uc3Qgb2JqOiBhbnkgPSB7fTtcblx0XHRtZXNzYWdlLmRpcmVjdGlvbiAhPT0gdW5kZWZpbmVkICYmIChvYmouZGlyZWN0aW9uID0gbWVzc2FnZS5kaXJlY3Rpb24pO1xuXHRcdG1lc3NhZ2Uuc3BlZWQgIT09IHVuZGVmaW5lZCAmJiAob2JqLnNwZWVkID0gTWF0aC5yb3VuZChtZXNzYWdlLnNwZWVkKSk7XG5cdFx0cmV0dXJuIG9iajtcblx0fSxcblxuXHRmcm9tUGFydGlhbDxJIGV4dGVuZHMgRXhhY3Q8RGVlcFBhcnRpYWw8TXNnQ29udHJvbD4sIEk+PihvYmplY3Q6IEkpOiBNc2dDb250cm9sIHtcblx0XHRjb25zdCBtZXNzYWdlID0gY3JlYXRlQmFzZU1zZ0NvbnRyb2woKTtcblx0XHRtZXNzYWdlLmRpcmVjdGlvbiA9IG9iamVjdC5kaXJlY3Rpb24gPz8gMDtcblx0XHRtZXNzYWdlLnNwZWVkID0gb2JqZWN0LnNwZWVkID8/IDA7XG5cdFx0cmV0dXJuIG1lc3NhZ2U7XG5cdH0sXG59O1xuXG5mdW5jdGlvbiBjcmVhdGVCYXNlTXNnRW5jb2RlckNhbGxpYnJhdGlvbigpOiBNc2dFbmNvZGVyQ2FsbGlicmF0aW9uIHtcblx0cmV0dXJuIHtrUDogMCwga0k6IDAsIGtEOiAwfTtcbn1cblxuZXhwb3J0IGNvbnN0IE1zZ0VuY29kZXJDYWxsaWJyYXRpb24gPSB7XG5cdGVuY29kZShtZXNzYWdlOiBNc2dFbmNvZGVyQ2FsbGlicmF0aW9uLCB3cml0ZXI6IFdyaXRlciA9IFdyaXRlci5jcmVhdGUoKSk6IFdyaXRlciB7XG5cdFx0aWYgKG1lc3NhZ2Uua1AgIT09IDApIHtcblx0XHRcdHdyaXRlci51aW50MzIoMTMpLmZsb2F0KG1lc3NhZ2Uua1ApO1xuXHRcdH1cblx0XHRpZiAobWVzc2FnZS5rSSAhPT0gMCkge1xuXHRcdFx0d3JpdGVyLnVpbnQzMigyMSkuZmxvYXQobWVzc2FnZS5rSSk7XG5cdFx0fVxuXHRcdGlmIChtZXNzYWdlLmtEICE9PSAwKSB7XG5cdFx0XHR3cml0ZXIudWludDMyKDI5KS5mbG9hdChtZXNzYWdlLmtEKTtcblx0XHR9XG5cdFx0cmV0dXJuIHdyaXRlcjtcblx0fSxcblxuXHRkZWNvZGUoaW5wdXQ6IFJlYWRlcnxVaW50OEFycmF5LCBsZW5ndGg/OiBudW1iZXIpOiBNc2dFbmNvZGVyQ2FsbGlicmF0aW9uIHtcblx0XHRjb25zdCByZWFkZXIgPSBpbnB1dCBpbnN0YW5jZW9mIFJlYWRlciA/IGlucHV0IDogbmV3IFJlYWRlcihpbnB1dCk7XG5cdFx0bGV0IGVuZCA9IGxlbmd0aCA9PT0gdW5kZWZpbmVkID8gcmVhZGVyLmxlbiA6IHJlYWRlci5wb3MgKyBsZW5ndGg7XG5cdFx0Y29uc3QgbWVzc2FnZSA9IGNyZWF0ZUJhc2VNc2dFbmNvZGVyQ2FsbGlicmF0aW9uKCk7XG5cdFx0d2hpbGUgKHJlYWRlci5wb3MgPCBlbmQpIHtcblx0XHRcdGNvbnN0IHRhZyA9IHJlYWRlci51aW50MzIoKTtcblx0XHRcdHN3aXRjaCAodGFnID4+PiAzKSB7XG5cdFx0XHRcdGNhc2UgMTpcblx0XHRcdFx0XHRtZXNzYWdlLmtQID0gcmVhZGVyLmZsb2F0KCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgMjpcblx0XHRcdFx0XHRtZXNzYWdlLmtJID0gcmVhZGVyLmZsb2F0KCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgMzpcblx0XHRcdFx0XHRtZXNzYWdlLmtEID0gcmVhZGVyLmZsb2F0KCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0cmVhZGVyLnNraXBUeXBlKHRhZyAmIDcpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gbWVzc2FnZTtcblx0fSxcblxuXHRmcm9tSlNPTihvYmplY3Q6IGFueSk6IE1zZ0VuY29kZXJDYWxsaWJyYXRpb24ge1xuXHRcdHJldHVybiB7XG5cdFx0XHRrUDogaXNTZXQob2JqZWN0LmtQKSA/IE51bWJlcihvYmplY3Qua1ApIDogMCxcblx0XHRcdGtJOiBpc1NldChvYmplY3Qua0kpID8gTnVtYmVyKG9iamVjdC5rSSkgOiAwLFxuXHRcdFx0a0Q6IGlzU2V0KG9iamVjdC5rRCkgPyBOdW1iZXIob2JqZWN0LmtEKSA6IDAsXG5cdFx0fTtcblx0fSxcblxuXHR0b0pTT04obWVzc2FnZTogTXNnRW5jb2RlckNhbGxpYnJhdGlvbik6IHVua25vd24ge1xuXHRcdGNvbnN0IG9iajogYW55ID0ge307XG5cdFx0bWVzc2FnZS5rUCAhPT0gdW5kZWZpbmVkICYmIChvYmoua1AgPSBtZXNzYWdlLmtQKTtcblx0XHRtZXNzYWdlLmtJICE9PSB1bmRlZmluZWQgJiYgKG9iai5rSSA9IG1lc3NhZ2Uua0kpO1xuXHRcdG1lc3NhZ2Uua0QgIT09IHVuZGVmaW5lZCAmJiAob2JqLmtEID0gbWVzc2FnZS5rRCk7XG5cdFx0cmV0dXJuIG9iajtcblx0fSxcblxuXHRmcm9tUGFydGlhbDxJIGV4dGVuZHMgRXhhY3Q8RGVlcFBhcnRpYWw8TXNnRW5jb2RlckNhbGxpYnJhdGlvbj4sIEk+PihvYmplY3Q6IEkpOlxuXHRcdE1zZ0VuY29kZXJDYWxsaWJyYXRpb24ge1xuXHRcdFx0Y29uc3QgbWVzc2FnZSA9IGNyZWF0ZUJhc2VNc2dFbmNvZGVyQ2FsbGlicmF0aW9uKCk7XG5cdFx0XHRtZXNzYWdlLmtQID0gb2JqZWN0LmtQID8/IDA7XG5cdFx0XHRtZXNzYWdlLmtJID0gb2JqZWN0LmtJID8/IDA7XG5cdFx0XHRtZXNzYWdlLmtEID0gb2JqZWN0LmtEID8/IDA7XG5cdFx0XHRyZXR1cm4gbWVzc2FnZTtcblx0XHR9LFxufTtcblxuZnVuY3Rpb24gY3JlYXRlQmFzZU1hdXNJbmNvbWluZ01lc3NhZ2UoKTogTWF1c0luY29taW5nTWVzc2FnZSB7XG5cdHJldHVybiB7XG5cdFx0aW5pdDogdW5kZWZpbmVkLFxuXHRcdGNvbnRyb2w6IHVuZGVmaW5lZCxcblx0XHRlbmNvZGVyQ2FsbGlicmF0aW9uOiB1bmRlZmluZWQsXG5cdH07XG59XG5cbmV4cG9ydCBjb25zdCBNYXVzSW5jb21pbmdNZXNzYWdlID0ge1xuXHRlbmNvZGUobWVzc2FnZTogTWF1c0luY29taW5nTWVzc2FnZSwgd3JpdGVyOiBXcml0ZXIgPSBXcml0ZXIuY3JlYXRlKCkpOiBXcml0ZXIge1xuXHRcdGlmIChtZXNzYWdlLmluaXQgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0TXNnSW5pdC5lbmNvZGUobWVzc2FnZS5pbml0LCB3cml0ZXIudWludDMyKDE4KS5mb3JrKCkpLmxkZWxpbSgpO1xuXHRcdH1cblx0XHRpZiAobWVzc2FnZS5jb250cm9sICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdE1zZ0NvbnRyb2wuZW5jb2RlKG1lc3NhZ2UuY29udHJvbCwgd3JpdGVyLnVpbnQzMigyNikuZm9yaygpKS5sZGVsaW0oKTtcblx0XHR9XG5cdFx0aWYgKG1lc3NhZ2UuZW5jb2RlckNhbGxpYnJhdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRNc2dFbmNvZGVyQ2FsbGlicmF0aW9uLmVuY29kZShtZXNzYWdlLmVuY29kZXJDYWxsaWJyYXRpb24sIHdyaXRlci51aW50MzIoMzQpLmZvcmsoKSlcblx0XHRcdFx0LmxkZWxpbSgpO1xuXHRcdH1cblx0XHRyZXR1cm4gd3JpdGVyO1xuXHR9LFxuXG5cdGRlY29kZShpbnB1dDogUmVhZGVyfFVpbnQ4QXJyYXksIGxlbmd0aD86IG51bWJlcik6IE1hdXNJbmNvbWluZ01lc3NhZ2Uge1xuXHRcdGNvbnN0IHJlYWRlciA9IGlucHV0IGluc3RhbmNlb2YgUmVhZGVyID8gaW5wdXQgOiBuZXcgUmVhZGVyKGlucHV0KTtcblx0XHRsZXQgZW5kID0gbGVuZ3RoID09PSB1bmRlZmluZWQgPyByZWFkZXIubGVuIDogcmVhZGVyLnBvcyArIGxlbmd0aDtcblx0XHRjb25zdCBtZXNzYWdlID0gY3JlYXRlQmFzZU1hdXNJbmNvbWluZ01lc3NhZ2UoKTtcblx0XHR3aGlsZSAocmVhZGVyLnBvcyA8IGVuZCkge1xuXHRcdFx0Y29uc3QgdGFnID0gcmVhZGVyLnVpbnQzMigpO1xuXHRcdFx0c3dpdGNoICh0YWcgPj4+IDMpIHtcblx0XHRcdFx0Y2FzZSAyOlxuXHRcdFx0XHRcdG1lc3NhZ2UuaW5pdCA9IE1zZ0luaXQuZGVjb2RlKHJlYWRlciwgcmVhZGVyLnVpbnQzMigpKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAzOlxuXHRcdFx0XHRcdG1lc3NhZ2UuY29udHJvbCA9IE1zZ0NvbnRyb2wuZGVjb2RlKHJlYWRlciwgcmVhZGVyLnVpbnQzMigpKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSA0OlxuXHRcdFx0XHRcdG1lc3NhZ2UuZW5jb2RlckNhbGxpYnJhdGlvbiA9XG5cdFx0XHRcdFx0XHRNc2dFbmNvZGVyQ2FsbGlicmF0aW9uLmRlY29kZShyZWFkZXIsIHJlYWRlci51aW50MzIoKSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0cmVhZGVyLnNraXBUeXBlKHRhZyAmIDcpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gbWVzc2FnZTtcblx0fSxcblxuXHRmcm9tSlNPTihvYmplY3Q6IGFueSk6IE1hdXNJbmNvbWluZ01lc3NhZ2Uge1xuXHRcdHJldHVybiB7XG5cdFx0XHRpbml0OiBpc1NldChvYmplY3QuaW5pdCkgPyBNc2dJbml0LmZyb21KU09OKG9iamVjdC5pbml0KSA6IHVuZGVmaW5lZCxcblx0XHRcdGNvbnRyb2w6IGlzU2V0KG9iamVjdC5jb250cm9sKSA/IE1zZ0NvbnRyb2wuZnJvbUpTT04ob2JqZWN0LmNvbnRyb2wpIDogdW5kZWZpbmVkLFxuXHRcdFx0ZW5jb2RlckNhbGxpYnJhdGlvbjogaXNTZXQob2JqZWN0LmVuY29kZXJDYWxsaWJyYXRpb24pID9cblx0XHRcdFx0TXNnRW5jb2RlckNhbGxpYnJhdGlvbi5mcm9tSlNPTihvYmplY3QuZW5jb2RlckNhbGxpYnJhdGlvbikgOlxuXHRcdFx0XHQgIHVuZGVmaW5lZCxcblx0XHR9O1xuXHR9LFxuXG5cdHRvSlNPTihtZXNzYWdlOiBNYXVzSW5jb21pbmdNZXNzYWdlKTogdW5rbm93biB7XG5cdFx0Y29uc3Qgb2JqOiBhbnkgPSB7fTtcblx0XHRtZXNzYWdlLmluaXQgIT09IHVuZGVmaW5lZCAmJlxuXHRcdFx0KG9iai5pbml0ID0gbWVzc2FnZS5pbml0ID8gTXNnSW5pdC50b0pTT04obWVzc2FnZS5pbml0KSA6IHVuZGVmaW5lZCk7XG5cdFx0bWVzc2FnZS5jb250cm9sICE9PSB1bmRlZmluZWQgJiZcblx0XHRcdChvYmouY29udHJvbCA9IG1lc3NhZ2UuY29udHJvbCA/IE1zZ0NvbnRyb2wudG9KU09OKG1lc3NhZ2UuY29udHJvbCkgOiB1bmRlZmluZWQpO1xuXHRcdG1lc3NhZ2UuZW5jb2RlckNhbGxpYnJhdGlvbiAhPT0gdW5kZWZpbmVkICYmXG5cdFx0XHQob2JqLmVuY29kZXJDYWxsaWJyYXRpb24gPSBtZXNzYWdlLmVuY29kZXJDYWxsaWJyYXRpb24gP1xuXHRcdFx0XHQgTXNnRW5jb2RlckNhbGxpYnJhdGlvbi50b0pTT04obWVzc2FnZS5lbmNvZGVyQ2FsbGlicmF0aW9uKSA6XG5cdFx0XHRcdCAgIHVuZGVmaW5lZCk7XG5cdFx0cmV0dXJuIG9iajtcblx0fSxcblxuXHRmcm9tUGFydGlhbDxJIGV4dGVuZHMgRXhhY3Q8RGVlcFBhcnRpYWw8TWF1c0luY29taW5nTWVzc2FnZT4sIEk+PihvYmplY3Q6IEkpOlxuXHRcdE1hdXNJbmNvbWluZ01lc3NhZ2Uge1xuXHRcdFx0Y29uc3QgbWVzc2FnZSA9IGNyZWF0ZUJhc2VNYXVzSW5jb21pbmdNZXNzYWdlKCk7XG5cdFx0XHRtZXNzYWdlLmluaXQgPSBvYmplY3QuaW5pdCAhPT0gdW5kZWZpbmVkICYmIG9iamVjdC5pbml0ICE9PSBudWxsID9cblx0XHRcdFx0TXNnSW5pdC5mcm9tUGFydGlhbChvYmplY3QuaW5pdCkgOlxuXHRcdFx0XHQgIHVuZGVmaW5lZDtcblx0XHRcdG1lc3NhZ2UuY29udHJvbCA9IG9iamVjdC5jb250cm9sICE9PSB1bmRlZmluZWQgJiYgb2JqZWN0LmNvbnRyb2wgIT09IG51bGwgP1xuXHRcdFx0XHRNc2dDb250cm9sLmZyb21QYXJ0aWFsKG9iamVjdC5jb250cm9sKSA6XG5cdFx0XHRcdCAgdW5kZWZpbmVkO1xuXHRcdFx0bWVzc2FnZS5lbmNvZGVyQ2FsbGlicmF0aW9uID1cblx0XHRcdFx0b2JqZWN0LmVuY29kZXJDYWxsaWJyYXRpb24gIT09IHVuZGVmaW5lZCAmJiBvYmplY3QuZW5jb2RlckNhbGxpYnJhdGlvbiAhPT0gbnVsbCA/XG5cdFx0XHRcdE1zZ0VuY29kZXJDYWxsaWJyYXRpb24uZnJvbVBhcnRpYWwob2JqZWN0LmVuY29kZXJDYWxsaWJyYXRpb24pIDpcblx0XHRcdFx0ICB1bmRlZmluZWQ7XG5cdFx0XHRyZXR1cm4gbWVzc2FnZTtcblx0XHR9LFxufTtcblxudHlwZSBCdWlsdGluID18RGF0ZXxGdW5jdGlvbnxVaW50OEFycmF5fHN0cmluZ3xudW1iZXJ8Ym9vbGVhbnx1bmRlZmluZWQ7XG5cbmV4cG9ydCB0eXBlIERlZXBQYXJ0aWFsPFQ+ID0gVCBleHRlbmRzIEJ1aWx0aW4gPyBUIDogVCBleHRlbmRzIEFycmF5PGluZmVyIFU+P1xuXHRBcnJheTxEZWVwUGFydGlhbDxVPj46XG5cdCAgVCBleHRlbmRzIFJlYWRvbmx5QXJyYXk8aW5mZXIgVT4/IFJlYWRvbmx5QXJyYXk8RGVlcFBhcnRpYWw8VT4+OiBUIGV4dGVuZHMge30gP1xuXHR7W0sgaW4ga2V5b2YgVF0/OiBEZWVwUGFydGlhbDxUW0tdPn0gOlxuXHQgIFBhcnRpYWw8VD47XG5cbnR5cGUgS2V5c09mVW5pb248VD4gPSBUIGV4dGVuZHMgVCA/IGtleW9mIFQgOiBuZXZlcjtcbmV4cG9ydCB0eXBlIEV4YWN0PFAsIEkgZXh0ZW5kcyBQPiA9IFAgZXh0ZW5kcyBCdWlsdGluID9cblx0UCA6XG5cdCAgUCZ7W0sgaW4ga2V5b2YgUF06IEV4YWN0PFBbS10sIElbS10+fSZSZWNvcmQ8RXhjbHVkZTxrZXlvZiBJLCBLZXlzT2ZVbmlvbjxQPj4sIG5ldmVyPjtcblxuLy8gSWYgeW91IGdldCBhIGNvbXBpbGUtZXJyb3IgYWJvdXQgJ0NvbnN0cnVjdG9yPExvbmc+IGFuZCAuLi4gaGF2ZSBubyBvdmVybGFwJyxcbi8vIGFkZCAnLS10c19wcm90b19vcHQ9ZXNNb2R1bGVJbnRlcm9wPXRydWUnIGFzIGEgZmxhZyB3aGVuIGNhbGxpbmcgJ3Byb3RvYycuXG5pZiAodXRpbC5Mb25nICE9PSBMb25nKSB7XG5cdHV0aWwuTG9uZyA9IExvbmcgYXMgYW55O1xuXHRjb25maWd1cmUoKTtcbn1cblxuZnVuY3Rpb24gaXNTZXQodmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuXHRyZXR1cm4gdmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZDtcbn1cbiIsICJpbXBvcnQge01hdXNJbmNvbWluZ01lc3NhZ2UsIE1hdXNPdXRnb2luZ01lc3NhZ2V9IGZyb20gJy4vcHJvdG8vbWVzc2FnZSc7XG5cbmV4cG9ydCB0eXBlIENvbW11bmljYXRvck9wdGlvbnMgPSB7XG5cdHVybDogc3RyaW5nfFVSTDtcbn07XG5cbmV4cG9ydCBjbGFzcyBDb21tdW5pY2F0b3IgZXh0ZW5kcyBFdmVudFRhcmdldCB7XG5cdHByaXZhdGUgc29ja2V0PzogV2ViU29ja2V0O1xuXG5cdGNvbnN0cnVjdG9yKG9wdGlvbnM6IENvbW11bmljYXRvck9wdGlvbnMpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuc2V0dXBTb2NrZXQob3B0aW9ucyk7XG5cdH1cblxuXHRzZW5kKG1lc3NhZ2U6IFBhcnRpYWw8TWF1c0luY29taW5nTWVzc2FnZT4pIHtcblx0XHRjb25zdCBtc2cgPSBNYXVzSW5jb21pbmdNZXNzYWdlLmVuY29kZShtZXNzYWdlIGFzIE1hdXNJbmNvbWluZ01lc3NhZ2UpLmZpbmlzaCgpO1xuXHRcdGNvbnNvbGUubG9nKG1lc3NhZ2UsIG1zZyk7XG5cdFx0dGhpcy5zb2NrZXQ/LnNlbmQobXNnKTtcblx0fVxuXG5cdHByaXZhdGUgc2V0dXBTb2NrZXQob3B0aW9uczogQ29tbXVuaWNhdG9yT3B0aW9ucykge1xuXHRcdHRoaXMuc29ja2V0ID0gbmV3IFdlYlNvY2tldChvcHRpb25zLnVybCk7XG5cblx0XHR0aGlzLnNvY2tldC5vbm9wZW4gPSAoKSA9PiB7XG5cdFx0XHR0aGlzLnNvY2tldC5iaW5hcnlUeXBlID0gJ2FycmF5YnVmZmVyJztcblx0XHR9O1xuXG5cdFx0dGhpcy5zb2NrZXQub25jbG9zZSA9ICgpID0+IHtcblx0XHRcdGNvbnNvbGUubG9nKCdDbG9zZWQnKTtcblx0XHR9O1xuXG5cdFx0dGhpcy5zb2NrZXQub25tZXNzYWdlID0gKGV2ZW50KSA9PiB7XG5cdFx0XHRpZiAoZXZlbnQuZGF0YSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG5cdFx0XHRcdC8vIGJpbmFyeSBmcmFtZVxuXHRcdFx0XHRjb25zdCBtZXNzYWdlID0gTWF1c091dGdvaW5nTWVzc2FnZS5kZWNvZGUobmV3IFVpbnQ4QXJyYXkoZXZlbnQuZGF0YSkpO1xuXHRcdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQobmV3IE1lc3NhZ2VFdmVudCgnbWVzc2FnZScsIHtkYXRhOiBtZXNzYWdlfSkpO1xuXHRcdFx0XHQvLyBjb25zb2xlLmxvZyh7IC4uLm1lc3NhZ2UubmF2IH0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gdGV4dCBmcmFtZVxuXHRcdFx0XHQvLyBjb25zb2xlLmxvZyhldmVudC5kYXRhKTtcblx0XHRcdH1cblx0XHR9O1xuXHR9XG59XG4iLCAiPHNjcmlwdCBsYW5nPVwidHNcIj5cbiAgaW1wb3J0IFZpcnR1YWxMaXN0IGZyb20gXCJAc3ZlbHRlanMvc3ZlbHRlLXZpcnR1YWwtbGlzdFwiO1xuICBpbXBvcnQgeyBDb21tdW5pY2F0b3IgfSBmcm9tIFwiLi9Db21tdW5pY2F0b3JcIjtcbiAgaW1wb3J0IHsgTWF1c091dGdvaW5nTWVzc2FnZSwgTmF2aWdhdGlvblBhY2tldCB9IGZyb20gXCIuL3Byb3RvL21lc3NhZ2VcIjtcblxuICBleHBvcnQgbGV0IGNvbTogQ29tbXVuaWNhdG9yO1xuXG4gIGxldCBkYXRhOiBOYXZpZ2F0aW9uUGFja2V0W10gPSBbXTtcbiAgY29tLmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIChldnQ6IE1lc3NhZ2VFdmVudDxNYXVzT3V0Z29pbmdNZXNzYWdlPikgPT4ge1xuICAgIGlmIChldnQuZGF0YS5uYXYpIHtcbiAgICAgIGRhdGEgPSBbZXZ0LmRhdGEubmF2LCAuLi5kYXRhXTtcbiAgICB9XG4gIH0pO1xuXG4gIGNvbnN0IGZvcm1hdEluZm8gPSAoaXRlbTogTmF2aWdhdGlvblBhY2tldCkgPT4gYHBvcz0oJHtpdGVtLnBvc2l0aW9uLnh9LCR7XG4gICAgaXRlbS5wb3NpdGlvbi55XG4gIH0pIHNwZWVkPSgke2l0ZW0ubGVmdE1vdG9yU3BlZWQudG9GaXhlZCgzKX0sJHtpdGVtLnJpZ2h0TW90b3JTcGVlZC50b0ZpeGVkKFxuICAgIDNcbiAgKX0pIGRpcj0oJHtpdGVtLnBvc2l0aW9uLmhlYWRpbmcudG9GaXhlZCgzKX0pIGVuY1RvdGFsPSgke1xuICAgIGl0ZW0ubGVmdEVuY29kZXJUb3RhbFxuICB9LCR7aXRlbS5yaWdodEVuY29kZXJUb3RhbH0pXG4gIGA7XG48L3NjcmlwdD5cblxuPGRpdiBjbGFzcz1cImxvZ3NcIj5cbiAgPFZpcnR1YWxMaXN0IGl0ZW1zPXtkYXRhfSBsZXQ6aXRlbT5cbiAgICA8IS0tIHRoaXMgd2lsbCBiZSByZW5kZXJlZCBmb3IgZWFjaCBjdXJyZW50bHkgdmlzaWJsZSBpdGVtIC0tPlxuICAgIDxzcGFuIGNsYXNzPVwiZW50cnlcIj5cbiAgICAgIDxzcGFuIGNsYXNzPVwibGlnaHRcIj5be2l0ZW0udGltZXN0YW1wfV08L3NwYW4+XG4gICAgICB7Zm9ybWF0SW5mbyhpdGVtKX1cbiAgICA8L3NwYW4+XG4gIDwvVmlydHVhbExpc3Q+XG48L2Rpdj5cblxuPHN0eWxlIGxhbmc9XCJzY3NzXCI+XG4gIC5sb2dzIHtcbiAgICBmb250LWZhbWlseTogbW9ub3NwYWNlO1xuICAgIGhlaWdodDogNTB2aDtcbiAgfVxuXG4gIC5saWdodCB7XG4gICAgb3BhY2l0eTogMC40O1xuICB9XG5cbiAgLmVudHJ5IHtcbiAgICBwYWQ6IDAuMjVyZW07XG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlZWU7XG4gIH1cbjwvc3R5bGU+XG4iLCAiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXNjZW5kaW5nKGEsIGIpIHtcbiAgcmV0dXJuIGEgPT0gbnVsbCB8fCBiID09IG51bGwgPyBOYU4gOiBhIDwgYiA/IC0xIDogYSA+IGIgPyAxIDogYSA+PSBiID8gMCA6IE5hTjtcbn1cbiIsICJpbXBvcnQgYXNjZW5kaW5nIGZyb20gXCIuL2FzY2VuZGluZy5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBiaXNlY3RvcihmKSB7XG4gIGxldCBkZWx0YSA9IGY7XG4gIGxldCBjb21wYXJlMSA9IGY7XG4gIGxldCBjb21wYXJlMiA9IGY7XG5cbiAgaWYgKGYubGVuZ3RoICE9PSAyKSB7XG4gICAgZGVsdGEgPSAoZCwgeCkgPT4gZihkKSAtIHg7XG4gICAgY29tcGFyZTEgPSBhc2NlbmRpbmc7XG4gICAgY29tcGFyZTIgPSAoZCwgeCkgPT4gYXNjZW5kaW5nKGYoZCksIHgpO1xuICB9XG5cbiAgZnVuY3Rpb24gbGVmdChhLCB4LCBsbyA9IDAsIGhpID0gYS5sZW5ndGgpIHtcbiAgICBpZiAobG8gPCBoaSkge1xuICAgICAgaWYgKGNvbXBhcmUxKHgsIHgpICE9PSAwKSByZXR1cm4gaGk7XG4gICAgICBkbyB7XG4gICAgICAgIGNvbnN0IG1pZCA9IChsbyArIGhpKSA+Pj4gMTtcbiAgICAgICAgaWYgKGNvbXBhcmUyKGFbbWlkXSwgeCkgPCAwKSBsbyA9IG1pZCArIDE7XG4gICAgICAgIGVsc2UgaGkgPSBtaWQ7XG4gICAgICB9IHdoaWxlIChsbyA8IGhpKTtcbiAgICB9XG4gICAgcmV0dXJuIGxvO1xuICB9XG5cbiAgZnVuY3Rpb24gcmlnaHQoYSwgeCwgbG8gPSAwLCBoaSA9IGEubGVuZ3RoKSB7XG4gICAgaWYgKGxvIDwgaGkpIHtcbiAgICAgIGlmIChjb21wYXJlMSh4LCB4KSAhPT0gMCkgcmV0dXJuIGhpO1xuICAgICAgZG8ge1xuICAgICAgICBjb25zdCBtaWQgPSAobG8gKyBoaSkgPj4+IDE7XG4gICAgICAgIGlmIChjb21wYXJlMihhW21pZF0sIHgpIDw9IDApIGxvID0gbWlkICsgMTtcbiAgICAgICAgZWxzZSBoaSA9IG1pZDtcbiAgICAgIH0gd2hpbGUgKGxvIDwgaGkpO1xuICAgIH1cbiAgICByZXR1cm4gbG87XG4gIH1cblxuICBmdW5jdGlvbiBjZW50ZXIoYSwgeCwgbG8gPSAwLCBoaSA9IGEubGVuZ3RoKSB7XG4gICAgY29uc3QgaSA9IGxlZnQoYSwgeCwgbG8sIGhpIC0gMSk7XG4gICAgcmV0dXJuIGkgPiBsbyAmJiBkZWx0YShhW2kgLSAxXSwgeCkgPiAtZGVsdGEoYVtpXSwgeCkgPyBpIC0gMSA6IGk7XG4gIH1cblxuICByZXR1cm4ge2xlZnQsIGNlbnRlciwgcmlnaHR9O1xufVxuIiwgImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG51bWJlcih4KSB7XG4gIHJldHVybiB4ID09PSBudWxsID8gTmFOIDogK3g7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiogbnVtYmVycyh2YWx1ZXMsIHZhbHVlb2YpIHtcbiAgaWYgKHZhbHVlb2YgPT09IHVuZGVmaW5lZCkge1xuICAgIGZvciAobGV0IHZhbHVlIG9mIHZhbHVlcykge1xuICAgICAgaWYgKHZhbHVlICE9IG51bGwgJiYgKHZhbHVlID0gK3ZhbHVlKSA+PSB2YWx1ZSkge1xuICAgICAgICB5aWVsZCB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgbGV0IGluZGV4ID0gLTE7XG4gICAgZm9yIChsZXQgdmFsdWUgb2YgdmFsdWVzKSB7XG4gICAgICBpZiAoKHZhbHVlID0gdmFsdWVvZih2YWx1ZSwgKytpbmRleCwgdmFsdWVzKSkgIT0gbnVsbCAmJiAodmFsdWUgPSArdmFsdWUpID49IHZhbHVlKSB7XG4gICAgICAgIHlpZWxkIHZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwgImltcG9ydCBhc2NlbmRpbmcgZnJvbSBcIi4vYXNjZW5kaW5nLmpzXCI7XG5pbXBvcnQgYmlzZWN0b3IgZnJvbSBcIi4vYmlzZWN0b3IuanNcIjtcbmltcG9ydCBudW1iZXIgZnJvbSBcIi4vbnVtYmVyLmpzXCI7XG5cbmNvbnN0IGFzY2VuZGluZ0Jpc2VjdCA9IGJpc2VjdG9yKGFzY2VuZGluZyk7XG5leHBvcnQgY29uc3QgYmlzZWN0UmlnaHQgPSBhc2NlbmRpbmdCaXNlY3QucmlnaHQ7XG5leHBvcnQgY29uc3QgYmlzZWN0TGVmdCA9IGFzY2VuZGluZ0Jpc2VjdC5sZWZ0O1xuZXhwb3J0IGNvbnN0IGJpc2VjdENlbnRlciA9IGJpc2VjdG9yKG51bWJlcikuY2VudGVyO1xuZXhwb3J0IGRlZmF1bHQgYmlzZWN0UmlnaHQ7XG4iLCAiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZXh0ZW50KHZhbHVlcywgdmFsdWVvZikge1xuICBsZXQgbWluO1xuICBsZXQgbWF4O1xuICBpZiAodmFsdWVvZiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZm9yIChjb25zdCB2YWx1ZSBvZiB2YWx1ZXMpIHtcbiAgICAgIGlmICh2YWx1ZSAhPSBudWxsKSB7XG4gICAgICAgIGlmIChtaW4gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGlmICh2YWx1ZSA+PSB2YWx1ZSkgbWluID0gbWF4ID0gdmFsdWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKG1pbiA+IHZhbHVlKSBtaW4gPSB2YWx1ZTtcbiAgICAgICAgICBpZiAobWF4IDwgdmFsdWUpIG1heCA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGxldCBpbmRleCA9IC0xO1xuICAgIGZvciAobGV0IHZhbHVlIG9mIHZhbHVlcykge1xuICAgICAgaWYgKCh2YWx1ZSA9IHZhbHVlb2YodmFsdWUsICsraW5kZXgsIHZhbHVlcykpICE9IG51bGwpIHtcbiAgICAgICAgaWYgKG1pbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgaWYgKHZhbHVlID49IHZhbHVlKSBtaW4gPSBtYXggPSB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAobWluID4gdmFsdWUpIG1pbiA9IHZhbHVlO1xuICAgICAgICAgIGlmIChtYXggPCB2YWx1ZSkgbWF4ID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIFttaW4sIG1heF07XG59XG4iLCAidmFyIGUxMCA9IE1hdGguc3FydCg1MCksXG4gICAgZTUgPSBNYXRoLnNxcnQoMTApLFxuICAgIGUyID0gTWF0aC5zcXJ0KDIpO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0aWNrcyhzdGFydCwgc3RvcCwgY291bnQpIHtcbiAgdmFyIHJldmVyc2UsXG4gICAgICBpID0gLTEsXG4gICAgICBuLFxuICAgICAgdGlja3MsXG4gICAgICBzdGVwO1xuXG4gIHN0b3AgPSArc3RvcCwgc3RhcnQgPSArc3RhcnQsIGNvdW50ID0gK2NvdW50O1xuICBpZiAoc3RhcnQgPT09IHN0b3AgJiYgY291bnQgPiAwKSByZXR1cm4gW3N0YXJ0XTtcbiAgaWYgKHJldmVyc2UgPSBzdG9wIDwgc3RhcnQpIG4gPSBzdGFydCwgc3RhcnQgPSBzdG9wLCBzdG9wID0gbjtcbiAgaWYgKChzdGVwID0gdGlja0luY3JlbWVudChzdGFydCwgc3RvcCwgY291bnQpKSA9PT0gMCB8fCAhaXNGaW5pdGUoc3RlcCkpIHJldHVybiBbXTtcblxuICBpZiAoc3RlcCA+IDApIHtcbiAgICBsZXQgcjAgPSBNYXRoLnJvdW5kKHN0YXJ0IC8gc3RlcCksIHIxID0gTWF0aC5yb3VuZChzdG9wIC8gc3RlcCk7XG4gICAgaWYgKHIwICogc3RlcCA8IHN0YXJ0KSArK3IwO1xuICAgIGlmIChyMSAqIHN0ZXAgPiBzdG9wKSAtLXIxO1xuICAgIHRpY2tzID0gbmV3IEFycmF5KG4gPSByMSAtIHIwICsgMSk7XG4gICAgd2hpbGUgKCsraSA8IG4pIHRpY2tzW2ldID0gKHIwICsgaSkgKiBzdGVwO1xuICB9IGVsc2Uge1xuICAgIHN0ZXAgPSAtc3RlcDtcbiAgICBsZXQgcjAgPSBNYXRoLnJvdW5kKHN0YXJ0ICogc3RlcCksIHIxID0gTWF0aC5yb3VuZChzdG9wICogc3RlcCk7XG4gICAgaWYgKHIwIC8gc3RlcCA8IHN0YXJ0KSArK3IwO1xuICAgIGlmIChyMSAvIHN0ZXAgPiBzdG9wKSAtLXIxO1xuICAgIHRpY2tzID0gbmV3IEFycmF5KG4gPSByMSAtIHIwICsgMSk7XG4gICAgd2hpbGUgKCsraSA8IG4pIHRpY2tzW2ldID0gKHIwICsgaSkgLyBzdGVwO1xuICB9XG5cbiAgaWYgKHJldmVyc2UpIHRpY2tzLnJldmVyc2UoKTtcblxuICByZXR1cm4gdGlja3M7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0aWNrSW5jcmVtZW50KHN0YXJ0LCBzdG9wLCBjb3VudCkge1xuICB2YXIgc3RlcCA9IChzdG9wIC0gc3RhcnQpIC8gTWF0aC5tYXgoMCwgY291bnQpLFxuICAgICAgcG93ZXIgPSBNYXRoLmZsb29yKE1hdGgubG9nKHN0ZXApIC8gTWF0aC5MTjEwKSxcbiAgICAgIGVycm9yID0gc3RlcCAvIE1hdGgucG93KDEwLCBwb3dlcik7XG4gIHJldHVybiBwb3dlciA+PSAwXG4gICAgICA/IChlcnJvciA+PSBlMTAgPyAxMCA6IGVycm9yID49IGU1ID8gNSA6IGVycm9yID49IGUyID8gMiA6IDEpICogTWF0aC5wb3coMTAsIHBvd2VyKVxuICAgICAgOiAtTWF0aC5wb3coMTAsIC1wb3dlcikgLyAoZXJyb3IgPj0gZTEwID8gMTAgOiBlcnJvciA+PSBlNSA/IDUgOiBlcnJvciA+PSBlMiA/IDIgOiAxKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRpY2tTdGVwKHN0YXJ0LCBzdG9wLCBjb3VudCkge1xuICB2YXIgc3RlcDAgPSBNYXRoLmFicyhzdG9wIC0gc3RhcnQpIC8gTWF0aC5tYXgoMCwgY291bnQpLFxuICAgICAgc3RlcDEgPSBNYXRoLnBvdygxMCwgTWF0aC5mbG9vcihNYXRoLmxvZyhzdGVwMCkgLyBNYXRoLkxOMTApKSxcbiAgICAgIGVycm9yID0gc3RlcDAgLyBzdGVwMTtcbiAgaWYgKGVycm9yID49IGUxMCkgc3RlcDEgKj0gMTA7XG4gIGVsc2UgaWYgKGVycm9yID49IGU1KSBzdGVwMSAqPSA1O1xuICBlbHNlIGlmIChlcnJvciA+PSBlMikgc3RlcDEgKj0gMjtcbiAgcmV0dXJuIHN0b3AgPCBzdGFydCA/IC1zdGVwMSA6IHN0ZXAxO1xufVxuIiwgImltcG9ydCB7dGlja0luY3JlbWVudH0gZnJvbSBcIi4vdGlja3MuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbmljZShzdGFydCwgc3RvcCwgY291bnQpIHtcbiAgbGV0IHByZXN0ZXA7XG4gIHdoaWxlICh0cnVlKSB7XG4gICAgY29uc3Qgc3RlcCA9IHRpY2tJbmNyZW1lbnQoc3RhcnQsIHN0b3AsIGNvdW50KTtcbiAgICBpZiAoc3RlcCA9PT0gcHJlc3RlcCB8fCBzdGVwID09PSAwIHx8ICFpc0Zpbml0ZShzdGVwKSkge1xuICAgICAgcmV0dXJuIFtzdGFydCwgc3RvcF07XG4gICAgfSBlbHNlIGlmIChzdGVwID4gMCkge1xuICAgICAgc3RhcnQgPSBNYXRoLmZsb29yKHN0YXJ0IC8gc3RlcCkgKiBzdGVwO1xuICAgICAgc3RvcCA9IE1hdGguY2VpbChzdG9wIC8gc3RlcCkgKiBzdGVwO1xuICAgIH0gZWxzZSBpZiAoc3RlcCA8IDApIHtcbiAgICAgIHN0YXJ0ID0gTWF0aC5jZWlsKHN0YXJ0ICogc3RlcCkgLyBzdGVwO1xuICAgICAgc3RvcCA9IE1hdGguZmxvb3Ioc3RvcCAqIHN0ZXApIC8gc3RlcDtcbiAgICB9XG4gICAgcHJlc3RlcCA9IHN0ZXA7XG4gIH1cbn1cbiIsICJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByYW5nZShzdGFydCwgc3RvcCwgc3RlcCkge1xuICBzdGFydCA9ICtzdGFydCwgc3RvcCA9ICtzdG9wLCBzdGVwID0gKG4gPSBhcmd1bWVudHMubGVuZ3RoKSA8IDIgPyAoc3RvcCA9IHN0YXJ0LCBzdGFydCA9IDAsIDEpIDogbiA8IDMgPyAxIDogK3N0ZXA7XG5cbiAgdmFyIGkgPSAtMSxcbiAgICAgIG4gPSBNYXRoLm1heCgwLCBNYXRoLmNlaWwoKHN0b3AgLSBzdGFydCkgLyBzdGVwKSkgfCAwLFxuICAgICAgcmFuZ2UgPSBuZXcgQXJyYXkobik7XG5cbiAgd2hpbGUgKCsraSA8IG4pIHtcbiAgICByYW5nZVtpXSA9IHN0YXJ0ICsgaSAqIHN0ZXA7XG4gIH1cblxuICByZXR1cm4gcmFuZ2U7XG59XG4iLCAiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWFwKHZhbHVlcywgbWFwcGVyKSB7XG4gIGlmICh0eXBlb2YgdmFsdWVzW1N5bWJvbC5pdGVyYXRvcl0gIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcInZhbHVlcyBpcyBub3QgaXRlcmFibGVcIik7XG4gIGlmICh0eXBlb2YgbWFwcGVyICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJtYXBwZXIgaXMgbm90IGEgZnVuY3Rpb25cIik7XG4gIHJldHVybiBBcnJheS5mcm9tKHZhbHVlcywgKHZhbHVlLCBpbmRleCkgPT4gbWFwcGVyKHZhbHVlLCBpbmRleCwgdmFsdWVzKSk7XG59XG4iLCAidmFyIG5vb3AgPSB7dmFsdWU6ICgpID0+IHt9fTtcblxuZnVuY3Rpb24gZGlzcGF0Y2goKSB7XG4gIGZvciAodmFyIGkgPSAwLCBuID0gYXJndW1lbnRzLmxlbmd0aCwgXyA9IHt9LCB0OyBpIDwgbjsgKytpKSB7XG4gICAgaWYgKCEodCA9IGFyZ3VtZW50c1tpXSArIFwiXCIpIHx8ICh0IGluIF8pIHx8IC9bXFxzLl0vLnRlc3QodCkpIHRocm93IG5ldyBFcnJvcihcImlsbGVnYWwgdHlwZTogXCIgKyB0KTtcbiAgICBfW3RdID0gW107XG4gIH1cbiAgcmV0dXJuIG5ldyBEaXNwYXRjaChfKTtcbn1cblxuZnVuY3Rpb24gRGlzcGF0Y2goXykge1xuICB0aGlzLl8gPSBfO1xufVxuXG5mdW5jdGlvbiBwYXJzZVR5cGVuYW1lcyh0eXBlbmFtZXMsIHR5cGVzKSB7XG4gIHJldHVybiB0eXBlbmFtZXMudHJpbSgpLnNwbGl0KC9efFxccysvKS5tYXAoZnVuY3Rpb24odCkge1xuICAgIHZhciBuYW1lID0gXCJcIiwgaSA9IHQuaW5kZXhPZihcIi5cIik7XG4gICAgaWYgKGkgPj0gMCkgbmFtZSA9IHQuc2xpY2UoaSArIDEpLCB0ID0gdC5zbGljZSgwLCBpKTtcbiAgICBpZiAodCAmJiAhdHlwZXMuaGFzT3duUHJvcGVydHkodCkpIHRocm93IG5ldyBFcnJvcihcInVua25vd24gdHlwZTogXCIgKyB0KTtcbiAgICByZXR1cm4ge3R5cGU6IHQsIG5hbWU6IG5hbWV9O1xuICB9KTtcbn1cblxuRGlzcGF0Y2gucHJvdG90eXBlID0gZGlzcGF0Y2gucHJvdG90eXBlID0ge1xuICBjb25zdHJ1Y3RvcjogRGlzcGF0Y2gsXG4gIG9uOiBmdW5jdGlvbih0eXBlbmFtZSwgY2FsbGJhY2spIHtcbiAgICB2YXIgXyA9IHRoaXMuXyxcbiAgICAgICAgVCA9IHBhcnNlVHlwZW5hbWVzKHR5cGVuYW1lICsgXCJcIiwgXyksXG4gICAgICAgIHQsXG4gICAgICAgIGkgPSAtMSxcbiAgICAgICAgbiA9IFQubGVuZ3RoO1xuXG4gICAgLy8gSWYgbm8gY2FsbGJhY2sgd2FzIHNwZWNpZmllZCwgcmV0dXJuIHRoZSBjYWxsYmFjayBvZiB0aGUgZ2l2ZW4gdHlwZSBhbmQgbmFtZS5cbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHtcbiAgICAgIHdoaWxlICgrK2kgPCBuKSBpZiAoKHQgPSAodHlwZW5hbWUgPSBUW2ldKS50eXBlKSAmJiAodCA9IGdldChfW3RdLCB0eXBlbmFtZS5uYW1lKSkpIHJldHVybiB0O1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIElmIGEgdHlwZSB3YXMgc3BlY2lmaWVkLCBzZXQgdGhlIGNhbGxiYWNrIGZvciB0aGUgZ2l2ZW4gdHlwZSBhbmQgbmFtZS5cbiAgICAvLyBPdGhlcndpc2UsIGlmIGEgbnVsbCBjYWxsYmFjayB3YXMgc3BlY2lmaWVkLCByZW1vdmUgY2FsbGJhY2tzIG9mIHRoZSBnaXZlbiBuYW1lLlxuICAgIGlmIChjYWxsYmFjayAhPSBudWxsICYmIHR5cGVvZiBjYWxsYmFjayAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgRXJyb3IoXCJpbnZhbGlkIGNhbGxiYWNrOiBcIiArIGNhbGxiYWNrKTtcbiAgICB3aGlsZSAoKytpIDwgbikge1xuICAgICAgaWYgKHQgPSAodHlwZW5hbWUgPSBUW2ldKS50eXBlKSBfW3RdID0gc2V0KF9bdF0sIHR5cGVuYW1lLm5hbWUsIGNhbGxiYWNrKTtcbiAgICAgIGVsc2UgaWYgKGNhbGxiYWNrID09IG51bGwpIGZvciAodCBpbiBfKSBfW3RdID0gc2V0KF9bdF0sIHR5cGVuYW1lLm5hbWUsIG51bGwpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuICBjb3B5OiBmdW5jdGlvbigpIHtcbiAgICB2YXIgY29weSA9IHt9LCBfID0gdGhpcy5fO1xuICAgIGZvciAodmFyIHQgaW4gXykgY29weVt0XSA9IF9bdF0uc2xpY2UoKTtcbiAgICByZXR1cm4gbmV3IERpc3BhdGNoKGNvcHkpO1xuICB9LFxuICBjYWxsOiBmdW5jdGlvbih0eXBlLCB0aGF0KSB7XG4gICAgaWYgKChuID0gYXJndW1lbnRzLmxlbmd0aCAtIDIpID4gMCkgZm9yICh2YXIgYXJncyA9IG5ldyBBcnJheShuKSwgaSA9IDAsIG4sIHQ7IGkgPCBuOyArK2kpIGFyZ3NbaV0gPSBhcmd1bWVudHNbaSArIDJdO1xuICAgIGlmICghdGhpcy5fLmhhc093blByb3BlcnR5KHR5cGUpKSB0aHJvdyBuZXcgRXJyb3IoXCJ1bmtub3duIHR5cGU6IFwiICsgdHlwZSk7XG4gICAgZm9yICh0ID0gdGhpcy5fW3R5cGVdLCBpID0gMCwgbiA9IHQubGVuZ3RoOyBpIDwgbjsgKytpKSB0W2ldLnZhbHVlLmFwcGx5KHRoYXQsIGFyZ3MpO1xuICB9LFxuICBhcHBseTogZnVuY3Rpb24odHlwZSwgdGhhdCwgYXJncykge1xuICAgIGlmICghdGhpcy5fLmhhc093blByb3BlcnR5KHR5cGUpKSB0aHJvdyBuZXcgRXJyb3IoXCJ1bmtub3duIHR5cGU6IFwiICsgdHlwZSk7XG4gICAgZm9yICh2YXIgdCA9IHRoaXMuX1t0eXBlXSwgaSA9IDAsIG4gPSB0Lmxlbmd0aDsgaSA8IG47ICsraSkgdFtpXS52YWx1ZS5hcHBseSh0aGF0LCBhcmdzKTtcbiAgfVxufTtcblxuZnVuY3Rpb24gZ2V0KHR5cGUsIG5hbWUpIHtcbiAgZm9yICh2YXIgaSA9IDAsIG4gPSB0eXBlLmxlbmd0aCwgYzsgaSA8IG47ICsraSkge1xuICAgIGlmICgoYyA9IHR5cGVbaV0pLm5hbWUgPT09IG5hbWUpIHtcbiAgICAgIHJldHVybiBjLnZhbHVlO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBzZXQodHlwZSwgbmFtZSwgY2FsbGJhY2spIHtcbiAgZm9yICh2YXIgaSA9IDAsIG4gPSB0eXBlLmxlbmd0aDsgaSA8IG47ICsraSkge1xuICAgIGlmICh0eXBlW2ldLm5hbWUgPT09IG5hbWUpIHtcbiAgICAgIHR5cGVbaV0gPSBub29wLCB0eXBlID0gdHlwZS5zbGljZSgwLCBpKS5jb25jYXQodHlwZS5zbGljZShpICsgMSkpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIGlmIChjYWxsYmFjayAhPSBudWxsKSB0eXBlLnB1c2goe25hbWU6IG5hbWUsIHZhbHVlOiBjYWxsYmFja30pO1xuICByZXR1cm4gdHlwZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZGlzcGF0Y2g7XG4iLCAiZXhwb3J0IHZhciB4aHRtbCA9IFwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbFwiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHN2ZzogXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLFxuICB4aHRtbDogeGh0bWwsXG4gIHhsaW5rOiBcImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIixcbiAgeG1sOiBcImh0dHA6Ly93d3cudzMub3JnL1hNTC8xOTk4L25hbWVzcGFjZVwiLFxuICB4bWxuczogXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3htbG5zL1wiXG59O1xuIiwgImltcG9ydCBuYW1lc3BhY2VzIGZyb20gXCIuL25hbWVzcGFjZXMuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obmFtZSkge1xuICB2YXIgcHJlZml4ID0gbmFtZSArPSBcIlwiLCBpID0gcHJlZml4LmluZGV4T2YoXCI6XCIpO1xuICBpZiAoaSA+PSAwICYmIChwcmVmaXggPSBuYW1lLnNsaWNlKDAsIGkpKSAhPT0gXCJ4bWxuc1wiKSBuYW1lID0gbmFtZS5zbGljZShpICsgMSk7XG4gIHJldHVybiBuYW1lc3BhY2VzLmhhc093blByb3BlcnR5KHByZWZpeCkgPyB7c3BhY2U6IG5hbWVzcGFjZXNbcHJlZml4XSwgbG9jYWw6IG5hbWV9IDogbmFtZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcbn1cbiIsICJpbXBvcnQgbmFtZXNwYWNlIGZyb20gXCIuL25hbWVzcGFjZS5qc1wiO1xuaW1wb3J0IHt4aHRtbH0gZnJvbSBcIi4vbmFtZXNwYWNlcy5qc1wiO1xuXG5mdW5jdGlvbiBjcmVhdG9ySW5oZXJpdChuYW1lKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgZG9jdW1lbnQgPSB0aGlzLm93bmVyRG9jdW1lbnQsXG4gICAgICAgIHVyaSA9IHRoaXMubmFtZXNwYWNlVVJJO1xuICAgIHJldHVybiB1cmkgPT09IHhodG1sICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5uYW1lc3BhY2VVUkkgPT09IHhodG1sXG4gICAgICAgID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChuYW1lKVxuICAgICAgICA6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyh1cmksIG5hbWUpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBjcmVhdG9yRml4ZWQoZnVsbG5hbWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLm93bmVyRG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKGZ1bGxuYW1lLnNwYWNlLCBmdWxsbmFtZS5sb2NhbCk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG5hbWUpIHtcbiAgdmFyIGZ1bGxuYW1lID0gbmFtZXNwYWNlKG5hbWUpO1xuICByZXR1cm4gKGZ1bGxuYW1lLmxvY2FsXG4gICAgICA/IGNyZWF0b3JGaXhlZFxuICAgICAgOiBjcmVhdG9ySW5oZXJpdCkoZnVsbG5hbWUpO1xufVxuIiwgImZ1bmN0aW9uIG5vbmUoKSB7fVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihzZWxlY3Rvcikge1xuICByZXR1cm4gc2VsZWN0b3IgPT0gbnVsbCA/IG5vbmUgOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgfTtcbn1cbiIsICJpbXBvcnQge1NlbGVjdGlvbn0gZnJvbSBcIi4vaW5kZXguanNcIjtcbmltcG9ydCBzZWxlY3RvciBmcm9tIFwiLi4vc2VsZWN0b3IuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oc2VsZWN0KSB7XG4gIGlmICh0eXBlb2Ygc2VsZWN0ICE9PSBcImZ1bmN0aW9uXCIpIHNlbGVjdCA9IHNlbGVjdG9yKHNlbGVjdCk7XG5cbiAgZm9yICh2YXIgZ3JvdXBzID0gdGhpcy5fZ3JvdXBzLCBtID0gZ3JvdXBzLmxlbmd0aCwgc3ViZ3JvdXBzID0gbmV3IEFycmF5KG0pLCBqID0gMDsgaiA8IG07ICsraikge1xuICAgIGZvciAodmFyIGdyb3VwID0gZ3JvdXBzW2pdLCBuID0gZ3JvdXAubGVuZ3RoLCBzdWJncm91cCA9IHN1Ymdyb3Vwc1tqXSA9IG5ldyBBcnJheShuKSwgbm9kZSwgc3Vibm9kZSwgaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICAgIGlmICgobm9kZSA9IGdyb3VwW2ldKSAmJiAoc3Vibm9kZSA9IHNlbGVjdC5jYWxsKG5vZGUsIG5vZGUuX19kYXRhX18sIGksIGdyb3VwKSkpIHtcbiAgICAgICAgaWYgKFwiX19kYXRhX19cIiBpbiBub2RlKSBzdWJub2RlLl9fZGF0YV9fID0gbm9kZS5fX2RhdGFfXztcbiAgICAgICAgc3ViZ3JvdXBbaV0gPSBzdWJub2RlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXcgU2VsZWN0aW9uKHN1Ymdyb3VwcywgdGhpcy5fcGFyZW50cyk7XG59XG4iLCAiLy8gR2l2ZW4gc29tZXRoaW5nIGFycmF5IGxpa2UgKG9yIG51bGwpLCByZXR1cm5zIHNvbWV0aGluZyB0aGF0IGlzIHN0cmljdGx5IGFuXG4vLyBhcnJheS4gVGhpcyBpcyB1c2VkIHRvIGVuc3VyZSB0aGF0IGFycmF5LWxpa2Ugb2JqZWN0cyBwYXNzZWQgdG8gZDMuc2VsZWN0QWxsXG4vLyBvciBzZWxlY3Rpb24uc2VsZWN0QWxsIGFyZSBjb252ZXJ0ZWQgaW50byBwcm9wZXIgYXJyYXlzIHdoZW4gY3JlYXRpbmcgYVxuLy8gc2VsZWN0aW9uOyB3ZSBkb25cdTIwMTl0IGV2ZXIgd2FudCB0byBjcmVhdGUgYSBzZWxlY3Rpb24gYmFja2VkIGJ5IGEgbGl2ZVxuLy8gSFRNTENvbGxlY3Rpb24gb3IgTm9kZUxpc3QuIEhvd2V2ZXIsIG5vdGUgdGhhdCBzZWxlY3Rpb24uc2VsZWN0QWxsIHdpbGwgdXNlIGFcbi8vIHN0YXRpYyBOb2RlTGlzdCBhcyBhIGdyb3VwLCBzaW5jZSBpdCBzYWZlbHkgZGVyaXZlZCBmcm9tIHF1ZXJ5U2VsZWN0b3JBbGwuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhcnJheSh4KSB7XG4gIHJldHVybiB4ID09IG51bGwgPyBbXSA6IEFycmF5LmlzQXJyYXkoeCkgPyB4IDogQXJyYXkuZnJvbSh4KTtcbn1cbiIsICJmdW5jdGlvbiBlbXB0eSgpIHtcbiAgcmV0dXJuIFtdO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihzZWxlY3Rvcikge1xuICByZXR1cm4gc2VsZWN0b3IgPT0gbnVsbCA/IGVtcHR5IDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG4gIH07XG59XG4iLCAiaW1wb3J0IHtTZWxlY3Rpb259IGZyb20gXCIuL2luZGV4LmpzXCI7XG5pbXBvcnQgYXJyYXkgZnJvbSBcIi4uL2FycmF5LmpzXCI7XG5pbXBvcnQgc2VsZWN0b3JBbGwgZnJvbSBcIi4uL3NlbGVjdG9yQWxsLmpzXCI7XG5cbmZ1bmN0aW9uIGFycmF5QWxsKHNlbGVjdCkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGFycmF5KHNlbGVjdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oc2VsZWN0KSB7XG4gIGlmICh0eXBlb2Ygc2VsZWN0ID09PSBcImZ1bmN0aW9uXCIpIHNlbGVjdCA9IGFycmF5QWxsKHNlbGVjdCk7XG4gIGVsc2Ugc2VsZWN0ID0gc2VsZWN0b3JBbGwoc2VsZWN0KTtcblxuICBmb3IgKHZhciBncm91cHMgPSB0aGlzLl9ncm91cHMsIG0gPSBncm91cHMubGVuZ3RoLCBzdWJncm91cHMgPSBbXSwgcGFyZW50cyA9IFtdLCBqID0gMDsgaiA8IG07ICsraikge1xuICAgIGZvciAodmFyIGdyb3VwID0gZ3JvdXBzW2pdLCBuID0gZ3JvdXAubGVuZ3RoLCBub2RlLCBpID0gMDsgaSA8IG47ICsraSkge1xuICAgICAgaWYgKG5vZGUgPSBncm91cFtpXSkge1xuICAgICAgICBzdWJncm91cHMucHVzaChzZWxlY3QuY2FsbChub2RlLCBub2RlLl9fZGF0YV9fLCBpLCBncm91cCkpO1xuICAgICAgICBwYXJlbnRzLnB1c2gobm9kZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ldyBTZWxlY3Rpb24oc3ViZ3JvdXBzLCBwYXJlbnRzKTtcbn1cbiIsICJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihzZWxlY3Rvcikge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMubWF0Y2hlcyhzZWxlY3Rvcik7XG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGlsZE1hdGNoZXIoc2VsZWN0b3IpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKG5vZGUpIHtcbiAgICByZXR1cm4gbm9kZS5tYXRjaGVzKHNlbGVjdG9yKTtcbiAgfTtcbn1cblxuIiwgImltcG9ydCB7Y2hpbGRNYXRjaGVyfSBmcm9tIFwiLi4vbWF0Y2hlci5qc1wiO1xuXG52YXIgZmluZCA9IEFycmF5LnByb3RvdHlwZS5maW5kO1xuXG5mdW5jdGlvbiBjaGlsZEZpbmQobWF0Y2gpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBmaW5kLmNhbGwodGhpcy5jaGlsZHJlbiwgbWF0Y2gpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBjaGlsZEZpcnN0KCkge1xuICByZXR1cm4gdGhpcy5maXJzdEVsZW1lbnRDaGlsZDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obWF0Y2gpIHtcbiAgcmV0dXJuIHRoaXMuc2VsZWN0KG1hdGNoID09IG51bGwgPyBjaGlsZEZpcnN0XG4gICAgICA6IGNoaWxkRmluZCh0eXBlb2YgbWF0Y2ggPT09IFwiZnVuY3Rpb25cIiA/IG1hdGNoIDogY2hpbGRNYXRjaGVyKG1hdGNoKSkpO1xufVxuIiwgImltcG9ydCB7Y2hpbGRNYXRjaGVyfSBmcm9tIFwiLi4vbWF0Y2hlci5qc1wiO1xuXG52YXIgZmlsdGVyID0gQXJyYXkucHJvdG90eXBlLmZpbHRlcjtcblxuZnVuY3Rpb24gY2hpbGRyZW4oKSB7XG4gIHJldHVybiBBcnJheS5mcm9tKHRoaXMuY2hpbGRyZW4pO1xufVxuXG5mdW5jdGlvbiBjaGlsZHJlbkZpbHRlcihtYXRjaCkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGZpbHRlci5jYWxsKHRoaXMuY2hpbGRyZW4sIG1hdGNoKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obWF0Y2gpIHtcbiAgcmV0dXJuIHRoaXMuc2VsZWN0QWxsKG1hdGNoID09IG51bGwgPyBjaGlsZHJlblxuICAgICAgOiBjaGlsZHJlbkZpbHRlcih0eXBlb2YgbWF0Y2ggPT09IFwiZnVuY3Rpb25cIiA/IG1hdGNoIDogY2hpbGRNYXRjaGVyKG1hdGNoKSkpO1xufVxuIiwgImltcG9ydCB7U2VsZWN0aW9ufSBmcm9tIFwiLi9pbmRleC5qc1wiO1xuaW1wb3J0IG1hdGNoZXIgZnJvbSBcIi4uL21hdGNoZXIuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obWF0Y2gpIHtcbiAgaWYgKHR5cGVvZiBtYXRjaCAhPT0gXCJmdW5jdGlvblwiKSBtYXRjaCA9IG1hdGNoZXIobWF0Y2gpO1xuXG4gIGZvciAodmFyIGdyb3VwcyA9IHRoaXMuX2dyb3VwcywgbSA9IGdyb3Vwcy5sZW5ndGgsIHN1Ymdyb3VwcyA9IG5ldyBBcnJheShtKSwgaiA9IDA7IGogPCBtOyArK2opIHtcbiAgICBmb3IgKHZhciBncm91cCA9IGdyb3Vwc1tqXSwgbiA9IGdyb3VwLmxlbmd0aCwgc3ViZ3JvdXAgPSBzdWJncm91cHNbal0gPSBbXSwgbm9kZSwgaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICAgIGlmICgobm9kZSA9IGdyb3VwW2ldKSAmJiBtYXRjaC5jYWxsKG5vZGUsIG5vZGUuX19kYXRhX18sIGksIGdyb3VwKSkge1xuICAgICAgICBzdWJncm91cC5wdXNoKG5vZGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXcgU2VsZWN0aW9uKHN1Ymdyb3VwcywgdGhpcy5fcGFyZW50cyk7XG59XG4iLCAiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odXBkYXRlKSB7XG4gIHJldHVybiBuZXcgQXJyYXkodXBkYXRlLmxlbmd0aCk7XG59XG4iLCAiaW1wb3J0IHNwYXJzZSBmcm9tIFwiLi9zcGFyc2UuanNcIjtcbmltcG9ydCB7U2VsZWN0aW9ufSBmcm9tIFwiLi9pbmRleC5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG5ldyBTZWxlY3Rpb24odGhpcy5fZW50ZXIgfHwgdGhpcy5fZ3JvdXBzLm1hcChzcGFyc2UpLCB0aGlzLl9wYXJlbnRzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEVudGVyTm9kZShwYXJlbnQsIGRhdHVtKSB7XG4gIHRoaXMub3duZXJEb2N1bWVudCA9IHBhcmVudC5vd25lckRvY3VtZW50O1xuICB0aGlzLm5hbWVzcGFjZVVSSSA9IHBhcmVudC5uYW1lc3BhY2VVUkk7XG4gIHRoaXMuX25leHQgPSBudWxsO1xuICB0aGlzLl9wYXJlbnQgPSBwYXJlbnQ7XG4gIHRoaXMuX19kYXRhX18gPSBkYXR1bTtcbn1cblxuRW50ZXJOb2RlLnByb3RvdHlwZSA9IHtcbiAgY29uc3RydWN0b3I6IEVudGVyTm9kZSxcbiAgYXBwZW5kQ2hpbGQ6IGZ1bmN0aW9uKGNoaWxkKSB7IHJldHVybiB0aGlzLl9wYXJlbnQuaW5zZXJ0QmVmb3JlKGNoaWxkLCB0aGlzLl9uZXh0KTsgfSxcbiAgaW5zZXJ0QmVmb3JlOiBmdW5jdGlvbihjaGlsZCwgbmV4dCkgeyByZXR1cm4gdGhpcy5fcGFyZW50Lmluc2VydEJlZm9yZShjaGlsZCwgbmV4dCk7IH0sXG4gIHF1ZXJ5U2VsZWN0b3I6IGZ1bmN0aW9uKHNlbGVjdG9yKSB7IHJldHVybiB0aGlzLl9wYXJlbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7IH0sXG4gIHF1ZXJ5U2VsZWN0b3JBbGw6IGZ1bmN0aW9uKHNlbGVjdG9yKSB7IHJldHVybiB0aGlzLl9wYXJlbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7IH1cbn07XG4iLCAiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oeCkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHg7XG4gIH07XG59XG4iLCAiaW1wb3J0IHtTZWxlY3Rpb259IGZyb20gXCIuL2luZGV4LmpzXCI7XG5pbXBvcnQge0VudGVyTm9kZX0gZnJvbSBcIi4vZW50ZXIuanNcIjtcbmltcG9ydCBjb25zdGFudCBmcm9tIFwiLi4vY29uc3RhbnQuanNcIjtcblxuZnVuY3Rpb24gYmluZEluZGV4KHBhcmVudCwgZ3JvdXAsIGVudGVyLCB1cGRhdGUsIGV4aXQsIGRhdGEpIHtcbiAgdmFyIGkgPSAwLFxuICAgICAgbm9kZSxcbiAgICAgIGdyb3VwTGVuZ3RoID0gZ3JvdXAubGVuZ3RoLFxuICAgICAgZGF0YUxlbmd0aCA9IGRhdGEubGVuZ3RoO1xuXG4gIC8vIFB1dCBhbnkgbm9uLW51bGwgbm9kZXMgdGhhdCBmaXQgaW50byB1cGRhdGUuXG4gIC8vIFB1dCBhbnkgbnVsbCBub2RlcyBpbnRvIGVudGVyLlxuICAvLyBQdXQgYW55IHJlbWFpbmluZyBkYXRhIGludG8gZW50ZXIuXG4gIGZvciAoOyBpIDwgZGF0YUxlbmd0aDsgKytpKSB7XG4gICAgaWYgKG5vZGUgPSBncm91cFtpXSkge1xuICAgICAgbm9kZS5fX2RhdGFfXyA9IGRhdGFbaV07XG4gICAgICB1cGRhdGVbaV0gPSBub2RlO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbnRlcltpXSA9IG5ldyBFbnRlck5vZGUocGFyZW50LCBkYXRhW2ldKTtcbiAgICB9XG4gIH1cblxuICAvLyBQdXQgYW55IG5vbi1udWxsIG5vZGVzIHRoYXQgZG9uXHUyMDE5dCBmaXQgaW50byBleGl0LlxuICBmb3IgKDsgaSA8IGdyb3VwTGVuZ3RoOyArK2kpIHtcbiAgICBpZiAobm9kZSA9IGdyb3VwW2ldKSB7XG4gICAgICBleGl0W2ldID0gbm9kZTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gYmluZEtleShwYXJlbnQsIGdyb3VwLCBlbnRlciwgdXBkYXRlLCBleGl0LCBkYXRhLCBrZXkpIHtcbiAgdmFyIGksXG4gICAgICBub2RlLFxuICAgICAgbm9kZUJ5S2V5VmFsdWUgPSBuZXcgTWFwLFxuICAgICAgZ3JvdXBMZW5ndGggPSBncm91cC5sZW5ndGgsXG4gICAgICBkYXRhTGVuZ3RoID0gZGF0YS5sZW5ndGgsXG4gICAgICBrZXlWYWx1ZXMgPSBuZXcgQXJyYXkoZ3JvdXBMZW5ndGgpLFxuICAgICAga2V5VmFsdWU7XG5cbiAgLy8gQ29tcHV0ZSB0aGUga2V5IGZvciBlYWNoIG5vZGUuXG4gIC8vIElmIG11bHRpcGxlIG5vZGVzIGhhdmUgdGhlIHNhbWUga2V5LCB0aGUgZHVwbGljYXRlcyBhcmUgYWRkZWQgdG8gZXhpdC5cbiAgZm9yIChpID0gMDsgaSA8IGdyb3VwTGVuZ3RoOyArK2kpIHtcbiAgICBpZiAobm9kZSA9IGdyb3VwW2ldKSB7XG4gICAgICBrZXlWYWx1ZXNbaV0gPSBrZXlWYWx1ZSA9IGtleS5jYWxsKG5vZGUsIG5vZGUuX19kYXRhX18sIGksIGdyb3VwKSArIFwiXCI7XG4gICAgICBpZiAobm9kZUJ5S2V5VmFsdWUuaGFzKGtleVZhbHVlKSkge1xuICAgICAgICBleGl0W2ldID0gbm9kZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5vZGVCeUtleVZhbHVlLnNldChrZXlWYWx1ZSwgbm9kZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gQ29tcHV0ZSB0aGUga2V5IGZvciBlYWNoIGRhdHVtLlxuICAvLyBJZiB0aGVyZSBhIG5vZGUgYXNzb2NpYXRlZCB3aXRoIHRoaXMga2V5LCBqb2luIGFuZCBhZGQgaXQgdG8gdXBkYXRlLlxuICAvLyBJZiB0aGVyZSBpcyBub3QgKG9yIHRoZSBrZXkgaXMgYSBkdXBsaWNhdGUpLCBhZGQgaXQgdG8gZW50ZXIuXG4gIGZvciAoaSA9IDA7IGkgPCBkYXRhTGVuZ3RoOyArK2kpIHtcbiAgICBrZXlWYWx1ZSA9IGtleS5jYWxsKHBhcmVudCwgZGF0YVtpXSwgaSwgZGF0YSkgKyBcIlwiO1xuICAgIGlmIChub2RlID0gbm9kZUJ5S2V5VmFsdWUuZ2V0KGtleVZhbHVlKSkge1xuICAgICAgdXBkYXRlW2ldID0gbm9kZTtcbiAgICAgIG5vZGUuX19kYXRhX18gPSBkYXRhW2ldO1xuICAgICAgbm9kZUJ5S2V5VmFsdWUuZGVsZXRlKGtleVZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZW50ZXJbaV0gPSBuZXcgRW50ZXJOb2RlKHBhcmVudCwgZGF0YVtpXSk7XG4gICAgfVxuICB9XG5cbiAgLy8gQWRkIGFueSByZW1haW5pbmcgbm9kZXMgdGhhdCB3ZXJlIG5vdCBib3VuZCB0byBkYXRhIHRvIGV4aXQuXG4gIGZvciAoaSA9IDA7IGkgPCBncm91cExlbmd0aDsgKytpKSB7XG4gICAgaWYgKChub2RlID0gZ3JvdXBbaV0pICYmIChub2RlQnlLZXlWYWx1ZS5nZXQoa2V5VmFsdWVzW2ldKSA9PT0gbm9kZSkpIHtcbiAgICAgIGV4aXRbaV0gPSBub2RlO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBkYXR1bShub2RlKSB7XG4gIHJldHVybiBub2RlLl9fZGF0YV9fO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG4gIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIEFycmF5LmZyb20odGhpcywgZGF0dW0pO1xuXG4gIHZhciBiaW5kID0ga2V5ID8gYmluZEtleSA6IGJpbmRJbmRleCxcbiAgICAgIHBhcmVudHMgPSB0aGlzLl9wYXJlbnRzLFxuICAgICAgZ3JvdXBzID0gdGhpcy5fZ3JvdXBzO1xuXG4gIGlmICh0eXBlb2YgdmFsdWUgIT09IFwiZnVuY3Rpb25cIikgdmFsdWUgPSBjb25zdGFudCh2YWx1ZSk7XG5cbiAgZm9yICh2YXIgbSA9IGdyb3Vwcy5sZW5ndGgsIHVwZGF0ZSA9IG5ldyBBcnJheShtKSwgZW50ZXIgPSBuZXcgQXJyYXkobSksIGV4aXQgPSBuZXcgQXJyYXkobSksIGogPSAwOyBqIDwgbTsgKytqKSB7XG4gICAgdmFyIHBhcmVudCA9IHBhcmVudHNbal0sXG4gICAgICAgIGdyb3VwID0gZ3JvdXBzW2pdLFxuICAgICAgICBncm91cExlbmd0aCA9IGdyb3VwLmxlbmd0aCxcbiAgICAgICAgZGF0YSA9IGFycmF5bGlrZSh2YWx1ZS5jYWxsKHBhcmVudCwgcGFyZW50ICYmIHBhcmVudC5fX2RhdGFfXywgaiwgcGFyZW50cykpLFxuICAgICAgICBkYXRhTGVuZ3RoID0gZGF0YS5sZW5ndGgsXG4gICAgICAgIGVudGVyR3JvdXAgPSBlbnRlcltqXSA9IG5ldyBBcnJheShkYXRhTGVuZ3RoKSxcbiAgICAgICAgdXBkYXRlR3JvdXAgPSB1cGRhdGVbal0gPSBuZXcgQXJyYXkoZGF0YUxlbmd0aCksXG4gICAgICAgIGV4aXRHcm91cCA9IGV4aXRbal0gPSBuZXcgQXJyYXkoZ3JvdXBMZW5ndGgpO1xuXG4gICAgYmluZChwYXJlbnQsIGdyb3VwLCBlbnRlckdyb3VwLCB1cGRhdGVHcm91cCwgZXhpdEdyb3VwLCBkYXRhLCBrZXkpO1xuXG4gICAgLy8gTm93IGNvbm5lY3QgdGhlIGVudGVyIG5vZGVzIHRvIHRoZWlyIGZvbGxvd2luZyB1cGRhdGUgbm9kZSwgc3VjaCB0aGF0XG4gICAgLy8gYXBwZW5kQ2hpbGQgY2FuIGluc2VydCB0aGUgbWF0ZXJpYWxpemVkIGVudGVyIG5vZGUgYmVmb3JlIHRoaXMgbm9kZSxcbiAgICAvLyByYXRoZXIgdGhhbiBhdCB0aGUgZW5kIG9mIHRoZSBwYXJlbnQgbm9kZS5cbiAgICBmb3IgKHZhciBpMCA9IDAsIGkxID0gMCwgcHJldmlvdXMsIG5leHQ7IGkwIDwgZGF0YUxlbmd0aDsgKytpMCkge1xuICAgICAgaWYgKHByZXZpb3VzID0gZW50ZXJHcm91cFtpMF0pIHtcbiAgICAgICAgaWYgKGkwID49IGkxKSBpMSA9IGkwICsgMTtcbiAgICAgICAgd2hpbGUgKCEobmV4dCA9IHVwZGF0ZUdyb3VwW2kxXSkgJiYgKytpMSA8IGRhdGFMZW5ndGgpO1xuICAgICAgICBwcmV2aW91cy5fbmV4dCA9IG5leHQgfHwgbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB1cGRhdGUgPSBuZXcgU2VsZWN0aW9uKHVwZGF0ZSwgcGFyZW50cyk7XG4gIHVwZGF0ZS5fZW50ZXIgPSBlbnRlcjtcbiAgdXBkYXRlLl9leGl0ID0gZXhpdDtcbiAgcmV0dXJuIHVwZGF0ZTtcbn1cblxuLy8gR2l2ZW4gc29tZSBkYXRhLCB0aGlzIHJldHVybnMgYW4gYXJyYXktbGlrZSB2aWV3IG9mIGl0OiBhbiBvYmplY3QgdGhhdFxuLy8gZXhwb3NlcyBhIGxlbmd0aCBwcm9wZXJ0eSBhbmQgYWxsb3dzIG51bWVyaWMgaW5kZXhpbmcuIE5vdGUgdGhhdCB1bmxpa2Vcbi8vIHNlbGVjdEFsbCwgdGhpcyBpc25cdTIwMTl0IHdvcnJpZWQgYWJvdXQgXHUyMDFDbGl2ZVx1MjAxRCBjb2xsZWN0aW9ucyBiZWNhdXNlIHRoZSByZXN1bHRpbmdcbi8vIGFycmF5IHdpbGwgb25seSBiZSB1c2VkIGJyaWVmbHkgd2hpbGUgZGF0YSBpcyBiZWluZyBib3VuZC4gKEl0IGlzIHBvc3NpYmxlIHRvXG4vLyBjYXVzZSB0aGUgZGF0YSB0byBjaGFuZ2Ugd2hpbGUgaXRlcmF0aW5nIGJ5IHVzaW5nIGEga2V5IGZ1bmN0aW9uLCBidXQgcGxlYXNlXG4vLyBkb25cdTIwMTl0OyB3ZVx1MjAxOWQgcmF0aGVyIGF2b2lkIGEgZ3JhdHVpdG91cyBjb3B5LilcbmZ1bmN0aW9uIGFycmF5bGlrZShkYXRhKSB7XG4gIHJldHVybiB0eXBlb2YgZGF0YSA9PT0gXCJvYmplY3RcIiAmJiBcImxlbmd0aFwiIGluIGRhdGFcbiAgICA/IGRhdGEgLy8gQXJyYXksIFR5cGVkQXJyYXksIE5vZGVMaXN0LCBhcnJheS1saWtlXG4gICAgOiBBcnJheS5mcm9tKGRhdGEpOyAvLyBNYXAsIFNldCwgaXRlcmFibGUsIHN0cmluZywgb3IgYW55dGhpbmcgZWxzZVxufVxuIiwgImltcG9ydCBzcGFyc2UgZnJvbSBcIi4vc3BhcnNlLmpzXCI7XG5pbXBvcnQge1NlbGVjdGlvbn0gZnJvbSBcIi4vaW5kZXguanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgU2VsZWN0aW9uKHRoaXMuX2V4aXQgfHwgdGhpcy5fZ3JvdXBzLm1hcChzcGFyc2UpLCB0aGlzLl9wYXJlbnRzKTtcbn1cbiIsICJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihvbmVudGVyLCBvbnVwZGF0ZSwgb25leGl0KSB7XG4gIHZhciBlbnRlciA9IHRoaXMuZW50ZXIoKSwgdXBkYXRlID0gdGhpcywgZXhpdCA9IHRoaXMuZXhpdCgpO1xuICBpZiAodHlwZW9mIG9uZW50ZXIgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIGVudGVyID0gb25lbnRlcihlbnRlcik7XG4gICAgaWYgKGVudGVyKSBlbnRlciA9IGVudGVyLnNlbGVjdGlvbigpO1xuICB9IGVsc2Uge1xuICAgIGVudGVyID0gZW50ZXIuYXBwZW5kKG9uZW50ZXIgKyBcIlwiKTtcbiAgfVxuICBpZiAob251cGRhdGUgIT0gbnVsbCkge1xuICAgIHVwZGF0ZSA9IG9udXBkYXRlKHVwZGF0ZSk7XG4gICAgaWYgKHVwZGF0ZSkgdXBkYXRlID0gdXBkYXRlLnNlbGVjdGlvbigpO1xuICB9XG4gIGlmIChvbmV4aXQgPT0gbnVsbCkgZXhpdC5yZW1vdmUoKTsgZWxzZSBvbmV4aXQoZXhpdCk7XG4gIHJldHVybiBlbnRlciAmJiB1cGRhdGUgPyBlbnRlci5tZXJnZSh1cGRhdGUpLm9yZGVyKCkgOiB1cGRhdGU7XG59XG4iLCAiaW1wb3J0IHtTZWxlY3Rpb259IGZyb20gXCIuL2luZGV4LmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGNvbnRleHQpIHtcbiAgdmFyIHNlbGVjdGlvbiA9IGNvbnRleHQuc2VsZWN0aW9uID8gY29udGV4dC5zZWxlY3Rpb24oKSA6IGNvbnRleHQ7XG5cbiAgZm9yICh2YXIgZ3JvdXBzMCA9IHRoaXMuX2dyb3VwcywgZ3JvdXBzMSA9IHNlbGVjdGlvbi5fZ3JvdXBzLCBtMCA9IGdyb3VwczAubGVuZ3RoLCBtMSA9IGdyb3VwczEubGVuZ3RoLCBtID0gTWF0aC5taW4obTAsIG0xKSwgbWVyZ2VzID0gbmV3IEFycmF5KG0wKSwgaiA9IDA7IGogPCBtOyArK2opIHtcbiAgICBmb3IgKHZhciBncm91cDAgPSBncm91cHMwW2pdLCBncm91cDEgPSBncm91cHMxW2pdLCBuID0gZ3JvdXAwLmxlbmd0aCwgbWVyZ2UgPSBtZXJnZXNbal0gPSBuZXcgQXJyYXkobiksIG5vZGUsIGkgPSAwOyBpIDwgbjsgKytpKSB7XG4gICAgICBpZiAobm9kZSA9IGdyb3VwMFtpXSB8fCBncm91cDFbaV0pIHtcbiAgICAgICAgbWVyZ2VbaV0gPSBub2RlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZvciAoOyBqIDwgbTA7ICsraikge1xuICAgIG1lcmdlc1tqXSA9IGdyb3VwczBbal07XG4gIH1cblxuICByZXR1cm4gbmV3IFNlbGVjdGlvbihtZXJnZXMsIHRoaXMuX3BhcmVudHMpO1xufVxuIiwgImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuXG4gIGZvciAodmFyIGdyb3VwcyA9IHRoaXMuX2dyb3VwcywgaiA9IC0xLCBtID0gZ3JvdXBzLmxlbmd0aDsgKytqIDwgbTspIHtcbiAgICBmb3IgKHZhciBncm91cCA9IGdyb3Vwc1tqXSwgaSA9IGdyb3VwLmxlbmd0aCAtIDEsIG5leHQgPSBncm91cFtpXSwgbm9kZTsgLS1pID49IDA7KSB7XG4gICAgICBpZiAobm9kZSA9IGdyb3VwW2ldKSB7XG4gICAgICAgIGlmIChuZXh0ICYmIG5vZGUuY29tcGFyZURvY3VtZW50UG9zaXRpb24obmV4dCkgXiA0KSBuZXh0LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKG5vZGUsIG5leHQpO1xuICAgICAgICBuZXh0ID0gbm9kZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn1cbiIsICJpbXBvcnQge1NlbGVjdGlvbn0gZnJvbSBcIi4vaW5kZXguanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oY29tcGFyZSkge1xuICBpZiAoIWNvbXBhcmUpIGNvbXBhcmUgPSBhc2NlbmRpbmc7XG5cbiAgZnVuY3Rpb24gY29tcGFyZU5vZGUoYSwgYikge1xuICAgIHJldHVybiBhICYmIGIgPyBjb21wYXJlKGEuX19kYXRhX18sIGIuX19kYXRhX18pIDogIWEgLSAhYjtcbiAgfVxuXG4gIGZvciAodmFyIGdyb3VwcyA9IHRoaXMuX2dyb3VwcywgbSA9IGdyb3Vwcy5sZW5ndGgsIHNvcnRncm91cHMgPSBuZXcgQXJyYXkobSksIGogPSAwOyBqIDwgbTsgKytqKSB7XG4gICAgZm9yICh2YXIgZ3JvdXAgPSBncm91cHNbal0sIG4gPSBncm91cC5sZW5ndGgsIHNvcnRncm91cCA9IHNvcnRncm91cHNbal0gPSBuZXcgQXJyYXkobiksIG5vZGUsIGkgPSAwOyBpIDwgbjsgKytpKSB7XG4gICAgICBpZiAobm9kZSA9IGdyb3VwW2ldKSB7XG4gICAgICAgIHNvcnRncm91cFtpXSA9IG5vZGU7XG4gICAgICB9XG4gICAgfVxuICAgIHNvcnRncm91cC5zb3J0KGNvbXBhcmVOb2RlKTtcbiAgfVxuXG4gIHJldHVybiBuZXcgU2VsZWN0aW9uKHNvcnRncm91cHMsIHRoaXMuX3BhcmVudHMpLm9yZGVyKCk7XG59XG5cbmZ1bmN0aW9uIGFzY2VuZGluZyhhLCBiKSB7XG4gIHJldHVybiBhIDwgYiA/IC0xIDogYSA+IGIgPyAxIDogYSA+PSBiID8gMCA6IE5hTjtcbn1cbiIsICJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgdmFyIGNhbGxiYWNrID0gYXJndW1lbnRzWzBdO1xuICBhcmd1bWVudHNbMF0gPSB0aGlzO1xuICBjYWxsYmFjay5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICByZXR1cm4gdGhpcztcbn1cbiIsICJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIEFycmF5LmZyb20odGhpcyk7XG59XG4iLCAiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG5cbiAgZm9yICh2YXIgZ3JvdXBzID0gdGhpcy5fZ3JvdXBzLCBqID0gMCwgbSA9IGdyb3Vwcy5sZW5ndGg7IGogPCBtOyArK2opIHtcbiAgICBmb3IgKHZhciBncm91cCA9IGdyb3Vwc1tqXSwgaSA9IDAsIG4gPSBncm91cC5sZW5ndGg7IGkgPCBuOyArK2kpIHtcbiAgICAgIHZhciBub2RlID0gZ3JvdXBbaV07XG4gICAgICBpZiAobm9kZSkgcmV0dXJuIG5vZGU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG4iLCAiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gIGxldCBzaXplID0gMDtcbiAgZm9yIChjb25zdCBub2RlIG9mIHRoaXMpICsrc2l6ZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICByZXR1cm4gc2l6ZTtcbn1cbiIsICJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgcmV0dXJuICF0aGlzLm5vZGUoKTtcbn1cbiIsICJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihjYWxsYmFjaykge1xuXG4gIGZvciAodmFyIGdyb3VwcyA9IHRoaXMuX2dyb3VwcywgaiA9IDAsIG0gPSBncm91cHMubGVuZ3RoOyBqIDwgbTsgKytqKSB7XG4gICAgZm9yICh2YXIgZ3JvdXAgPSBncm91cHNbal0sIGkgPSAwLCBuID0gZ3JvdXAubGVuZ3RoLCBub2RlOyBpIDwgbjsgKytpKSB7XG4gICAgICBpZiAobm9kZSA9IGdyb3VwW2ldKSBjYWxsYmFjay5jYWxsKG5vZGUsIG5vZGUuX19kYXRhX18sIGksIGdyb3VwKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn1cbiIsICJpbXBvcnQgbmFtZXNwYWNlIGZyb20gXCIuLi9uYW1lc3BhY2UuanNcIjtcblxuZnVuY3Rpb24gYXR0clJlbW92ZShuYW1lKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZShuYW1lKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gYXR0clJlbW92ZU5TKGZ1bGxuYW1lKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZU5TKGZ1bGxuYW1lLnNwYWNlLCBmdWxsbmFtZS5sb2NhbCk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGF0dHJDb25zdGFudChuYW1lLCB2YWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBhdHRyQ29uc3RhbnROUyhmdWxsbmFtZSwgdmFsdWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuc2V0QXR0cmlidXRlTlMoZnVsbG5hbWUuc3BhY2UsIGZ1bGxuYW1lLmxvY2FsLCB2YWx1ZSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGF0dHJGdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHYgPSB2YWx1ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGlmICh2ID09IG51bGwpIHRoaXMucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xuICAgIGVsc2UgdGhpcy5zZXRBdHRyaWJ1dGUobmFtZSwgdik7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGF0dHJGdW5jdGlvbk5TKGZ1bGxuYW1lLCB2YWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHYgPSB2YWx1ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGlmICh2ID09IG51bGwpIHRoaXMucmVtb3ZlQXR0cmlidXRlTlMoZnVsbG5hbWUuc3BhY2UsIGZ1bGxuYW1lLmxvY2FsKTtcbiAgICBlbHNlIHRoaXMuc2V0QXR0cmlidXRlTlMoZnVsbG5hbWUuc3BhY2UsIGZ1bGxuYW1lLmxvY2FsLCB2KTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgdmFyIGZ1bGxuYW1lID0gbmFtZXNwYWNlKG5hbWUpO1xuXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgIHZhciBub2RlID0gdGhpcy5ub2RlKCk7XG4gICAgcmV0dXJuIGZ1bGxuYW1lLmxvY2FsXG4gICAgICAgID8gbm9kZS5nZXRBdHRyaWJ1dGVOUyhmdWxsbmFtZS5zcGFjZSwgZnVsbG5hbWUubG9jYWwpXG4gICAgICAgIDogbm9kZS5nZXRBdHRyaWJ1dGUoZnVsbG5hbWUpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXMuZWFjaCgodmFsdWUgPT0gbnVsbFxuICAgICAgPyAoZnVsbG5hbWUubG9jYWwgPyBhdHRyUmVtb3ZlTlMgOiBhdHRyUmVtb3ZlKSA6ICh0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgPyAoZnVsbG5hbWUubG9jYWwgPyBhdHRyRnVuY3Rpb25OUyA6IGF0dHJGdW5jdGlvbilcbiAgICAgIDogKGZ1bGxuYW1lLmxvY2FsID8gYXR0ckNvbnN0YW50TlMgOiBhdHRyQ29uc3RhbnQpKSkoZnVsbG5hbWUsIHZhbHVlKSk7XG59XG4iLCAiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obm9kZSkge1xuICByZXR1cm4gKG5vZGUub3duZXJEb2N1bWVudCAmJiBub2RlLm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXcpIC8vIG5vZGUgaXMgYSBOb2RlXG4gICAgICB8fCAobm9kZS5kb2N1bWVudCAmJiBub2RlKSAvLyBub2RlIGlzIGEgV2luZG93XG4gICAgICB8fCBub2RlLmRlZmF1bHRWaWV3OyAvLyBub2RlIGlzIGEgRG9jdW1lbnRcbn1cbiIsICJpbXBvcnQgZGVmYXVsdFZpZXcgZnJvbSBcIi4uL3dpbmRvdy5qc1wiO1xuXG5mdW5jdGlvbiBzdHlsZVJlbW92ZShuYW1lKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnN0eWxlLnJlbW92ZVByb3BlcnR5KG5hbWUpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBzdHlsZUNvbnN0YW50KG5hbWUsIHZhbHVlLCBwcmlvcml0eSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5zdHlsZS5zZXRQcm9wZXJ0eShuYW1lLCB2YWx1ZSwgcHJpb3JpdHkpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBzdHlsZUZ1bmN0aW9uKG5hbWUsIHZhbHVlLCBwcmlvcml0eSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHYgPSB2YWx1ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGlmICh2ID09IG51bGwpIHRoaXMuc3R5bGUucmVtb3ZlUHJvcGVydHkobmFtZSk7XG4gICAgZWxzZSB0aGlzLnN0eWxlLnNldFByb3BlcnR5KG5hbWUsIHYsIHByaW9yaXR5KTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obmFtZSwgdmFsdWUsIHByaW9yaXR5KSB7XG4gIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID4gMVxuICAgICAgPyB0aGlzLmVhY2goKHZhbHVlID09IG51bGxcbiAgICAgICAgICAgID8gc3R5bGVSZW1vdmUgOiB0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgICAgICAgPyBzdHlsZUZ1bmN0aW9uXG4gICAgICAgICAgICA6IHN0eWxlQ29uc3RhbnQpKG5hbWUsIHZhbHVlLCBwcmlvcml0eSA9PSBudWxsID8gXCJcIiA6IHByaW9yaXR5KSlcbiAgICAgIDogc3R5bGVWYWx1ZSh0aGlzLm5vZGUoKSwgbmFtZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHlsZVZhbHVlKG5vZGUsIG5hbWUpIHtcbiAgcmV0dXJuIG5vZGUuc3R5bGUuZ2V0UHJvcGVydHlWYWx1ZShuYW1lKVxuICAgICAgfHwgZGVmYXVsdFZpZXcobm9kZSkuZ2V0Q29tcHV0ZWRTdHlsZShub2RlLCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKG5hbWUpO1xufVxuIiwgImZ1bmN0aW9uIHByb3BlcnR5UmVtb3ZlKG5hbWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIGRlbGV0ZSB0aGlzW25hbWVdO1xuICB9O1xufVxuXG5mdW5jdGlvbiBwcm9wZXJ0eUNvbnN0YW50KG5hbWUsIHZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB0aGlzW25hbWVdID0gdmFsdWU7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHByb3BlcnR5RnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciB2ID0gdmFsdWUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAodiA9PSBudWxsKSBkZWxldGUgdGhpc1tuYW1lXTtcbiAgICBlbHNlIHRoaXNbbmFtZV0gPSB2O1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA+IDFcbiAgICAgID8gdGhpcy5lYWNoKCh2YWx1ZSA9PSBudWxsXG4gICAgICAgICAgPyBwcm9wZXJ0eVJlbW92ZSA6IHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiXG4gICAgICAgICAgPyBwcm9wZXJ0eUZ1bmN0aW9uXG4gICAgICAgICAgOiBwcm9wZXJ0eUNvbnN0YW50KShuYW1lLCB2YWx1ZSkpXG4gICAgICA6IHRoaXMubm9kZSgpW25hbWVdO1xufVxuIiwgImZ1bmN0aW9uIGNsYXNzQXJyYXkoc3RyaW5nKSB7XG4gIHJldHVybiBzdHJpbmcudHJpbSgpLnNwbGl0KC9efFxccysvKTtcbn1cblxuZnVuY3Rpb24gY2xhc3NMaXN0KG5vZGUpIHtcbiAgcmV0dXJuIG5vZGUuY2xhc3NMaXN0IHx8IG5ldyBDbGFzc0xpc3Qobm9kZSk7XG59XG5cbmZ1bmN0aW9uIENsYXNzTGlzdChub2RlKSB7XG4gIHRoaXMuX25vZGUgPSBub2RlO1xuICB0aGlzLl9uYW1lcyA9IGNsYXNzQXJyYXkobm9kZS5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKSB8fCBcIlwiKTtcbn1cblxuQ2xhc3NMaXN0LnByb3RvdHlwZSA9IHtcbiAgYWRkOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgdmFyIGkgPSB0aGlzLl9uYW1lcy5pbmRleE9mKG5hbWUpO1xuICAgIGlmIChpIDwgMCkge1xuICAgICAgdGhpcy5fbmFtZXMucHVzaChuYW1lKTtcbiAgICAgIHRoaXMuX25vZGUuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgdGhpcy5fbmFtZXMuam9pbihcIiBcIikpO1xuICAgIH1cbiAgfSxcbiAgcmVtb3ZlOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgdmFyIGkgPSB0aGlzLl9uYW1lcy5pbmRleE9mKG5hbWUpO1xuICAgIGlmIChpID49IDApIHtcbiAgICAgIHRoaXMuX25hbWVzLnNwbGljZShpLCAxKTtcbiAgICAgIHRoaXMuX25vZGUuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgdGhpcy5fbmFtZXMuam9pbihcIiBcIikpO1xuICAgIH1cbiAgfSxcbiAgY29udGFpbnM6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5fbmFtZXMuaW5kZXhPZihuYW1lKSA+PSAwO1xuICB9XG59O1xuXG5mdW5jdGlvbiBjbGFzc2VkQWRkKG5vZGUsIG5hbWVzKSB7XG4gIHZhciBsaXN0ID0gY2xhc3NMaXN0KG5vZGUpLCBpID0gLTEsIG4gPSBuYW1lcy5sZW5ndGg7XG4gIHdoaWxlICgrK2kgPCBuKSBsaXN0LmFkZChuYW1lc1tpXSk7XG59XG5cbmZ1bmN0aW9uIGNsYXNzZWRSZW1vdmUobm9kZSwgbmFtZXMpIHtcbiAgdmFyIGxpc3QgPSBjbGFzc0xpc3Qobm9kZSksIGkgPSAtMSwgbiA9IG5hbWVzLmxlbmd0aDtcbiAgd2hpbGUgKCsraSA8IG4pIGxpc3QucmVtb3ZlKG5hbWVzW2ldKTtcbn1cblxuZnVuY3Rpb24gY2xhc3NlZFRydWUobmFtZXMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIGNsYXNzZWRBZGQodGhpcywgbmFtZXMpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBjbGFzc2VkRmFsc2UobmFtZXMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIGNsYXNzZWRSZW1vdmUodGhpcywgbmFtZXMpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBjbGFzc2VkRnVuY3Rpb24obmFtZXMsIHZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAodmFsdWUuYXBwbHkodGhpcywgYXJndW1lbnRzKSA/IGNsYXNzZWRBZGQgOiBjbGFzc2VkUmVtb3ZlKSh0aGlzLCBuYW1lcyk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gIHZhciBuYW1lcyA9IGNsYXNzQXJyYXkobmFtZSArIFwiXCIpO1xuXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgIHZhciBsaXN0ID0gY2xhc3NMaXN0KHRoaXMubm9kZSgpKSwgaSA9IC0xLCBuID0gbmFtZXMubGVuZ3RoO1xuICAgIHdoaWxlICgrK2kgPCBuKSBpZiAoIWxpc3QuY29udGFpbnMobmFtZXNbaV0pKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZXR1cm4gdGhpcy5lYWNoKCh0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgPyBjbGFzc2VkRnVuY3Rpb24gOiB2YWx1ZVxuICAgICAgPyBjbGFzc2VkVHJ1ZVxuICAgICAgOiBjbGFzc2VkRmFsc2UpKG5hbWVzLCB2YWx1ZSkpO1xufVxuIiwgImZ1bmN0aW9uIHRleHRSZW1vdmUoKSB7XG4gIHRoaXMudGV4dENvbnRlbnQgPSBcIlwiO1xufVxuXG5mdW5jdGlvbiB0ZXh0Q29uc3RhbnQodmFsdWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHRoaXMudGV4dENvbnRlbnQgPSB2YWx1ZTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gdGV4dEZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgdiA9IHZhbHVlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgdGhpcy50ZXh0Q29udGVudCA9IHYgPT0gbnVsbCA/IFwiXCIgOiB2O1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aFxuICAgICAgPyB0aGlzLmVhY2godmFsdWUgPT0gbnVsbFxuICAgICAgICAgID8gdGV4dFJlbW92ZSA6ICh0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgICAgID8gdGV4dEZ1bmN0aW9uXG4gICAgICAgICAgOiB0ZXh0Q29uc3RhbnQpKHZhbHVlKSlcbiAgICAgIDogdGhpcy5ub2RlKCkudGV4dENvbnRlbnQ7XG59XG4iLCAiZnVuY3Rpb24gaHRtbFJlbW92ZSgpIHtcbiAgdGhpcy5pbm5lckhUTUwgPSBcIlwiO1xufVxuXG5mdW5jdGlvbiBodG1sQ29uc3RhbnQodmFsdWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuaW5uZXJIVE1MID0gdmFsdWU7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGh0bWxGdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHYgPSB2YWx1ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHRoaXMuaW5uZXJIVE1MID0gdiA9PSBudWxsID8gXCJcIiA6IHY7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiBhcmd1bWVudHMubGVuZ3RoXG4gICAgICA/IHRoaXMuZWFjaCh2YWx1ZSA9PSBudWxsXG4gICAgICAgICAgPyBodG1sUmVtb3ZlIDogKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiXG4gICAgICAgICAgPyBodG1sRnVuY3Rpb25cbiAgICAgICAgICA6IGh0bWxDb25zdGFudCkodmFsdWUpKVxuICAgICAgOiB0aGlzLm5vZGUoKS5pbm5lckhUTUw7XG59XG4iLCAiZnVuY3Rpb24gcmFpc2UoKSB7XG4gIGlmICh0aGlzLm5leHRTaWJsaW5nKSB0aGlzLnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQodGhpcyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5lYWNoKHJhaXNlKTtcbn1cbiIsICJmdW5jdGlvbiBsb3dlcigpIHtcbiAgaWYgKHRoaXMucHJldmlvdXNTaWJsaW5nKSB0aGlzLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRoaXMsIHRoaXMucGFyZW50Tm9kZS5maXJzdENoaWxkKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmVhY2gobG93ZXIpO1xufVxuIiwgImltcG9ydCBjcmVhdG9yIGZyb20gXCIuLi9jcmVhdG9yLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG5hbWUpIHtcbiAgdmFyIGNyZWF0ZSA9IHR5cGVvZiBuYW1lID09PSBcImZ1bmN0aW9uXCIgPyBuYW1lIDogY3JlYXRvcihuYW1lKTtcbiAgcmV0dXJuIHRoaXMuc2VsZWN0KGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmFwcGVuZENoaWxkKGNyZWF0ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfSk7XG59XG4iLCAiaW1wb3J0IGNyZWF0b3IgZnJvbSBcIi4uL2NyZWF0b3IuanNcIjtcbmltcG9ydCBzZWxlY3RvciBmcm9tIFwiLi4vc2VsZWN0b3IuanNcIjtcblxuZnVuY3Rpb24gY29uc3RhbnROdWxsKCkge1xuICByZXR1cm4gbnVsbDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obmFtZSwgYmVmb3JlKSB7XG4gIHZhciBjcmVhdGUgPSB0eXBlb2YgbmFtZSA9PT0gXCJmdW5jdGlvblwiID8gbmFtZSA6IGNyZWF0b3IobmFtZSksXG4gICAgICBzZWxlY3QgPSBiZWZvcmUgPT0gbnVsbCA/IGNvbnN0YW50TnVsbCA6IHR5cGVvZiBiZWZvcmUgPT09IFwiZnVuY3Rpb25cIiA/IGJlZm9yZSA6IHNlbGVjdG9yKGJlZm9yZSk7XG4gIHJldHVybiB0aGlzLnNlbGVjdChmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5pbnNlcnRCZWZvcmUoY3JlYXRlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyksIHNlbGVjdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IG51bGwpO1xuICB9KTtcbn1cbiIsICJmdW5jdGlvbiByZW1vdmUoKSB7XG4gIHZhciBwYXJlbnQgPSB0aGlzLnBhcmVudE5vZGU7XG4gIGlmIChwYXJlbnQpIHBhcmVudC5yZW1vdmVDaGlsZCh0aGlzKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmVhY2gocmVtb3ZlKTtcbn1cbiIsICJmdW5jdGlvbiBzZWxlY3Rpb25fY2xvbmVTaGFsbG93KCkge1xuICB2YXIgY2xvbmUgPSB0aGlzLmNsb25lTm9kZShmYWxzZSksIHBhcmVudCA9IHRoaXMucGFyZW50Tm9kZTtcbiAgcmV0dXJuIHBhcmVudCA/IHBhcmVudC5pbnNlcnRCZWZvcmUoY2xvbmUsIHRoaXMubmV4dFNpYmxpbmcpIDogY2xvbmU7XG59XG5cbmZ1bmN0aW9uIHNlbGVjdGlvbl9jbG9uZURlZXAoKSB7XG4gIHZhciBjbG9uZSA9IHRoaXMuY2xvbmVOb2RlKHRydWUpLCBwYXJlbnQgPSB0aGlzLnBhcmVudE5vZGU7XG4gIHJldHVybiBwYXJlbnQgPyBwYXJlbnQuaW5zZXJ0QmVmb3JlKGNsb25lLCB0aGlzLm5leHRTaWJsaW5nKSA6IGNsb25lO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihkZWVwKSB7XG4gIHJldHVybiB0aGlzLnNlbGVjdChkZWVwID8gc2VsZWN0aW9uX2Nsb25lRGVlcCA6IHNlbGVjdGlvbl9jbG9uZVNoYWxsb3cpO1xufVxuIiwgImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiBhcmd1bWVudHMubGVuZ3RoXG4gICAgICA/IHRoaXMucHJvcGVydHkoXCJfX2RhdGFfX1wiLCB2YWx1ZSlcbiAgICAgIDogdGhpcy5ub2RlKCkuX19kYXRhX187XG59XG4iLCAiZnVuY3Rpb24gY29udGV4dExpc3RlbmVyKGxpc3RlbmVyKSB7XG4gIHJldHVybiBmdW5jdGlvbihldmVudCkge1xuICAgIGxpc3RlbmVyLmNhbGwodGhpcywgZXZlbnQsIHRoaXMuX19kYXRhX18pO1xuICB9O1xufVxuXG5mdW5jdGlvbiBwYXJzZVR5cGVuYW1lcyh0eXBlbmFtZXMpIHtcbiAgcmV0dXJuIHR5cGVuYW1lcy50cmltKCkuc3BsaXQoL158XFxzKy8pLm1hcChmdW5jdGlvbih0KSB7XG4gICAgdmFyIG5hbWUgPSBcIlwiLCBpID0gdC5pbmRleE9mKFwiLlwiKTtcbiAgICBpZiAoaSA+PSAwKSBuYW1lID0gdC5zbGljZShpICsgMSksIHQgPSB0LnNsaWNlKDAsIGkpO1xuICAgIHJldHVybiB7dHlwZTogdCwgbmFtZTogbmFtZX07XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBvblJlbW92ZSh0eXBlbmFtZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG9uID0gdGhpcy5fX29uO1xuICAgIGlmICghb24pIHJldHVybjtcbiAgICBmb3IgKHZhciBqID0gMCwgaSA9IC0xLCBtID0gb24ubGVuZ3RoLCBvOyBqIDwgbTsgKytqKSB7XG4gICAgICBpZiAobyA9IG9uW2pdLCAoIXR5cGVuYW1lLnR5cGUgfHwgby50eXBlID09PSB0eXBlbmFtZS50eXBlKSAmJiBvLm5hbWUgPT09IHR5cGVuYW1lLm5hbWUpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKG8udHlwZSwgby5saXN0ZW5lciwgby5vcHRpb25zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9uWysraV0gPSBvO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoKytpKSBvbi5sZW5ndGggPSBpO1xuICAgIGVsc2UgZGVsZXRlIHRoaXMuX19vbjtcbiAgfTtcbn1cblxuZnVuY3Rpb24gb25BZGQodHlwZW5hbWUsIHZhbHVlLCBvcHRpb25zKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgb24gPSB0aGlzLl9fb24sIG8sIGxpc3RlbmVyID0gY29udGV4dExpc3RlbmVyKHZhbHVlKTtcbiAgICBpZiAob24pIGZvciAodmFyIGogPSAwLCBtID0gb24ubGVuZ3RoOyBqIDwgbTsgKytqKSB7XG4gICAgICBpZiAoKG8gPSBvbltqXSkudHlwZSA9PT0gdHlwZW5hbWUudHlwZSAmJiBvLm5hbWUgPT09IHR5cGVuYW1lLm5hbWUpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKG8udHlwZSwgby5saXN0ZW5lciwgby5vcHRpb25zKTtcbiAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKG8udHlwZSwgby5saXN0ZW5lciA9IGxpc3RlbmVyLCBvLm9wdGlvbnMgPSBvcHRpb25zKTtcbiAgICAgICAgby52YWx1ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcih0eXBlbmFtZS50eXBlLCBsaXN0ZW5lciwgb3B0aW9ucyk7XG4gICAgbyA9IHt0eXBlOiB0eXBlbmFtZS50eXBlLCBuYW1lOiB0eXBlbmFtZS5uYW1lLCB2YWx1ZTogdmFsdWUsIGxpc3RlbmVyOiBsaXN0ZW5lciwgb3B0aW9uczogb3B0aW9uc307XG4gICAgaWYgKCFvbikgdGhpcy5fX29uID0gW29dO1xuICAgIGVsc2Ugb24ucHVzaChvKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odHlwZW5hbWUsIHZhbHVlLCBvcHRpb25zKSB7XG4gIHZhciB0eXBlbmFtZXMgPSBwYXJzZVR5cGVuYW1lcyh0eXBlbmFtZSArIFwiXCIpLCBpLCBuID0gdHlwZW5hbWVzLmxlbmd0aCwgdDtcblxuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHtcbiAgICB2YXIgb24gPSB0aGlzLm5vZGUoKS5fX29uO1xuICAgIGlmIChvbikgZm9yICh2YXIgaiA9IDAsIG0gPSBvbi5sZW5ndGgsIG87IGogPCBtOyArK2opIHtcbiAgICAgIGZvciAoaSA9IDAsIG8gPSBvbltqXTsgaSA8IG47ICsraSkge1xuICAgICAgICBpZiAoKHQgPSB0eXBlbmFtZXNbaV0pLnR5cGUgPT09IG8udHlwZSAmJiB0Lm5hbWUgPT09IG8ubmFtZSkge1xuICAgICAgICAgIHJldHVybiBvLnZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuXG4gIG9uID0gdmFsdWUgPyBvbkFkZCA6IG9uUmVtb3ZlO1xuICBmb3IgKGkgPSAwOyBpIDwgbjsgKytpKSB0aGlzLmVhY2gob24odHlwZW5hbWVzW2ldLCB2YWx1ZSwgb3B0aW9ucykpO1xuICByZXR1cm4gdGhpcztcbn1cbiIsICJpbXBvcnQgZGVmYXVsdFZpZXcgZnJvbSBcIi4uL3dpbmRvdy5qc1wiO1xuXG5mdW5jdGlvbiBkaXNwYXRjaEV2ZW50KG5vZGUsIHR5cGUsIHBhcmFtcykge1xuICB2YXIgd2luZG93ID0gZGVmYXVsdFZpZXcobm9kZSksXG4gICAgICBldmVudCA9IHdpbmRvdy5DdXN0b21FdmVudDtcblxuICBpZiAodHlwZW9mIGV2ZW50ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBldmVudCA9IG5ldyBldmVudCh0eXBlLCBwYXJhbXMpO1xuICB9IGVsc2Uge1xuICAgIGV2ZW50ID0gd2luZG93LmRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiRXZlbnRcIik7XG4gICAgaWYgKHBhcmFtcykgZXZlbnQuaW5pdEV2ZW50KHR5cGUsIHBhcmFtcy5idWJibGVzLCBwYXJhbXMuY2FuY2VsYWJsZSksIGV2ZW50LmRldGFpbCA9IHBhcmFtcy5kZXRhaWw7XG4gICAgZWxzZSBldmVudC5pbml0RXZlbnQodHlwZSwgZmFsc2UsIGZhbHNlKTtcbiAgfVxuXG4gIG5vZGUuZGlzcGF0Y2hFdmVudChldmVudCk7XG59XG5cbmZ1bmN0aW9uIGRpc3BhdGNoQ29uc3RhbnQodHlwZSwgcGFyYW1zKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZGlzcGF0Y2hFdmVudCh0aGlzLCB0eXBlLCBwYXJhbXMpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBkaXNwYXRjaEZ1bmN0aW9uKHR5cGUsIHBhcmFtcykge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGRpc3BhdGNoRXZlbnQodGhpcywgdHlwZSwgcGFyYW1zLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih0eXBlLCBwYXJhbXMpIHtcbiAgcmV0dXJuIHRoaXMuZWFjaCgodHlwZW9mIHBhcmFtcyA9PT0gXCJmdW5jdGlvblwiXG4gICAgICA/IGRpc3BhdGNoRnVuY3Rpb25cbiAgICAgIDogZGlzcGF0Y2hDb25zdGFudCkodHlwZSwgcGFyYW1zKSk7XG59XG4iLCAiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24qKCkge1xuICBmb3IgKHZhciBncm91cHMgPSB0aGlzLl9ncm91cHMsIGogPSAwLCBtID0gZ3JvdXBzLmxlbmd0aDsgaiA8IG07ICsraikge1xuICAgIGZvciAodmFyIGdyb3VwID0gZ3JvdXBzW2pdLCBpID0gMCwgbiA9IGdyb3VwLmxlbmd0aCwgbm9kZTsgaSA8IG47ICsraSkge1xuICAgICAgaWYgKG5vZGUgPSBncm91cFtpXSkgeWllbGQgbm9kZTtcbiAgICB9XG4gIH1cbn1cbiIsICJpbXBvcnQgc2VsZWN0aW9uX3NlbGVjdCBmcm9tIFwiLi9zZWxlY3QuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fc2VsZWN0QWxsIGZyb20gXCIuL3NlbGVjdEFsbC5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9zZWxlY3RDaGlsZCBmcm9tIFwiLi9zZWxlY3RDaGlsZC5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9zZWxlY3RDaGlsZHJlbiBmcm9tIFwiLi9zZWxlY3RDaGlsZHJlbi5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9maWx0ZXIgZnJvbSBcIi4vZmlsdGVyLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX2RhdGEgZnJvbSBcIi4vZGF0YS5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9lbnRlciBmcm9tIFwiLi9lbnRlci5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9leGl0IGZyb20gXCIuL2V4aXQuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fam9pbiBmcm9tIFwiLi9qb2luLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX21lcmdlIGZyb20gXCIuL21lcmdlLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX29yZGVyIGZyb20gXCIuL29yZGVyLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX3NvcnQgZnJvbSBcIi4vc29ydC5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9jYWxsIGZyb20gXCIuL2NhbGwuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fbm9kZXMgZnJvbSBcIi4vbm9kZXMuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fbm9kZSBmcm9tIFwiLi9ub2RlLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX3NpemUgZnJvbSBcIi4vc2l6ZS5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9lbXB0eSBmcm9tIFwiLi9lbXB0eS5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9lYWNoIGZyb20gXCIuL2VhY2guanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fYXR0ciBmcm9tIFwiLi9hdHRyLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX3N0eWxlIGZyb20gXCIuL3N0eWxlLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX3Byb3BlcnR5IGZyb20gXCIuL3Byb3BlcnR5LmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX2NsYXNzZWQgZnJvbSBcIi4vY2xhc3NlZC5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl90ZXh0IGZyb20gXCIuL3RleHQuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25faHRtbCBmcm9tIFwiLi9odG1sLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX3JhaXNlIGZyb20gXCIuL3JhaXNlLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX2xvd2VyIGZyb20gXCIuL2xvd2VyLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX2FwcGVuZCBmcm9tIFwiLi9hcHBlbmQuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25faW5zZXJ0IGZyb20gXCIuL2luc2VydC5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9yZW1vdmUgZnJvbSBcIi4vcmVtb3ZlLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX2Nsb25lIGZyb20gXCIuL2Nsb25lLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX2RhdHVtIGZyb20gXCIuL2RhdHVtLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX29uIGZyb20gXCIuL29uLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX2Rpc3BhdGNoIGZyb20gXCIuL2Rpc3BhdGNoLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX2l0ZXJhdG9yIGZyb20gXCIuL2l0ZXJhdG9yLmpzXCI7XG5cbmV4cG9ydCB2YXIgcm9vdCA9IFtudWxsXTtcblxuZXhwb3J0IGZ1bmN0aW9uIFNlbGVjdGlvbihncm91cHMsIHBhcmVudHMpIHtcbiAgdGhpcy5fZ3JvdXBzID0gZ3JvdXBzO1xuICB0aGlzLl9wYXJlbnRzID0gcGFyZW50cztcbn1cblxuZnVuY3Rpb24gc2VsZWN0aW9uKCkge1xuICByZXR1cm4gbmV3IFNlbGVjdGlvbihbW2RvY3VtZW50LmRvY3VtZW50RWxlbWVudF1dLCByb290KTtcbn1cblxuZnVuY3Rpb24gc2VsZWN0aW9uX3NlbGVjdGlvbigpIHtcbiAgcmV0dXJuIHRoaXM7XG59XG5cblNlbGVjdGlvbi5wcm90b3R5cGUgPSBzZWxlY3Rpb24ucHJvdG90eXBlID0ge1xuICBjb25zdHJ1Y3RvcjogU2VsZWN0aW9uLFxuICBzZWxlY3Q6IHNlbGVjdGlvbl9zZWxlY3QsXG4gIHNlbGVjdEFsbDogc2VsZWN0aW9uX3NlbGVjdEFsbCxcbiAgc2VsZWN0Q2hpbGQ6IHNlbGVjdGlvbl9zZWxlY3RDaGlsZCxcbiAgc2VsZWN0Q2hpbGRyZW46IHNlbGVjdGlvbl9zZWxlY3RDaGlsZHJlbixcbiAgZmlsdGVyOiBzZWxlY3Rpb25fZmlsdGVyLFxuICBkYXRhOiBzZWxlY3Rpb25fZGF0YSxcbiAgZW50ZXI6IHNlbGVjdGlvbl9lbnRlcixcbiAgZXhpdDogc2VsZWN0aW9uX2V4aXQsXG4gIGpvaW46IHNlbGVjdGlvbl9qb2luLFxuICBtZXJnZTogc2VsZWN0aW9uX21lcmdlLFxuICBzZWxlY3Rpb246IHNlbGVjdGlvbl9zZWxlY3Rpb24sXG4gIG9yZGVyOiBzZWxlY3Rpb25fb3JkZXIsXG4gIHNvcnQ6IHNlbGVjdGlvbl9zb3J0LFxuICBjYWxsOiBzZWxlY3Rpb25fY2FsbCxcbiAgbm9kZXM6IHNlbGVjdGlvbl9ub2RlcyxcbiAgbm9kZTogc2VsZWN0aW9uX25vZGUsXG4gIHNpemU6IHNlbGVjdGlvbl9zaXplLFxuICBlbXB0eTogc2VsZWN0aW9uX2VtcHR5LFxuICBlYWNoOiBzZWxlY3Rpb25fZWFjaCxcbiAgYXR0cjogc2VsZWN0aW9uX2F0dHIsXG4gIHN0eWxlOiBzZWxlY3Rpb25fc3R5bGUsXG4gIHByb3BlcnR5OiBzZWxlY3Rpb25fcHJvcGVydHksXG4gIGNsYXNzZWQ6IHNlbGVjdGlvbl9jbGFzc2VkLFxuICB0ZXh0OiBzZWxlY3Rpb25fdGV4dCxcbiAgaHRtbDogc2VsZWN0aW9uX2h0bWwsXG4gIHJhaXNlOiBzZWxlY3Rpb25fcmFpc2UsXG4gIGxvd2VyOiBzZWxlY3Rpb25fbG93ZXIsXG4gIGFwcGVuZDogc2VsZWN0aW9uX2FwcGVuZCxcbiAgaW5zZXJ0OiBzZWxlY3Rpb25faW5zZXJ0LFxuICByZW1vdmU6IHNlbGVjdGlvbl9yZW1vdmUsXG4gIGNsb25lOiBzZWxlY3Rpb25fY2xvbmUsXG4gIGRhdHVtOiBzZWxlY3Rpb25fZGF0dW0sXG4gIG9uOiBzZWxlY3Rpb25fb24sXG4gIGRpc3BhdGNoOiBzZWxlY3Rpb25fZGlzcGF0Y2gsXG4gIFtTeW1ib2wuaXRlcmF0b3JdOiBzZWxlY3Rpb25faXRlcmF0b3Jcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHNlbGVjdGlvbjtcbiIsICJpbXBvcnQge1NlbGVjdGlvbiwgcm9vdH0gZnJvbSBcIi4vc2VsZWN0aW9uL2luZGV4LmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG4gIHJldHVybiB0eXBlb2Ygc2VsZWN0b3IgPT09IFwic3RyaW5nXCJcbiAgICAgID8gbmV3IFNlbGVjdGlvbihbW2RvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpXV0sIFtkb2N1bWVudC5kb2N1bWVudEVsZW1lbnRdKVxuICAgICAgOiBuZXcgU2VsZWN0aW9uKFtbc2VsZWN0b3JdXSwgcm9vdCk7XG59XG4iLCAiaW1wb3J0IGNyZWF0b3IgZnJvbSBcIi4vY3JlYXRvci5qc1wiO1xuaW1wb3J0IHNlbGVjdCBmcm9tIFwiLi9zZWxlY3QuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obmFtZSkge1xuICByZXR1cm4gc2VsZWN0KGNyZWF0b3IobmFtZSkuY2FsbChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpKTtcbn1cbiIsICJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihjb25zdHJ1Y3RvciwgZmFjdG9yeSwgcHJvdG90eXBlKSB7XG4gIGNvbnN0cnVjdG9yLnByb3RvdHlwZSA9IGZhY3RvcnkucHJvdG90eXBlID0gcHJvdG90eXBlO1xuICBwcm90b3R5cGUuY29uc3RydWN0b3IgPSBjb25zdHJ1Y3Rvcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV4dGVuZChwYXJlbnQsIGRlZmluaXRpb24pIHtcbiAgdmFyIHByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUocGFyZW50LnByb3RvdHlwZSk7XG4gIGZvciAodmFyIGtleSBpbiBkZWZpbml0aW9uKSBwcm90b3R5cGVba2V5XSA9IGRlZmluaXRpb25ba2V5XTtcbiAgcmV0dXJuIHByb3RvdHlwZTtcbn1cbiIsICJpbXBvcnQgZGVmaW5lLCB7ZXh0ZW5kfSBmcm9tIFwiLi9kZWZpbmUuanNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIENvbG9yKCkge31cblxuZXhwb3J0IHZhciBkYXJrZXIgPSAwLjc7XG5leHBvcnQgdmFyIGJyaWdodGVyID0gMSAvIGRhcmtlcjtcblxudmFyIHJlSSA9IFwiXFxcXHMqKFsrLV0/XFxcXGQrKVxcXFxzKlwiLFxuICAgIHJlTiA9IFwiXFxcXHMqKFsrLV0/XFxcXGQqXFxcXC4/XFxcXGQrKD86W2VFXVsrLV0/XFxcXGQrKT8pXFxcXHMqXCIsXG4gICAgcmVQID0gXCJcXFxccyooWystXT9cXFxcZCpcXFxcLj9cXFxcZCsoPzpbZUVdWystXT9cXFxcZCspPyklXFxcXHMqXCIsXG4gICAgcmVIZXggPSAvXiMoWzAtOWEtZl17Myw4fSkkLyxcbiAgICByZVJnYkludGVnZXIgPSBuZXcgUmVnRXhwKFwiXnJnYlxcXFwoXCIgKyBbcmVJLCByZUksIHJlSV0gKyBcIlxcXFwpJFwiKSxcbiAgICByZVJnYlBlcmNlbnQgPSBuZXcgUmVnRXhwKFwiXnJnYlxcXFwoXCIgKyBbcmVQLCByZVAsIHJlUF0gKyBcIlxcXFwpJFwiKSxcbiAgICByZVJnYmFJbnRlZ2VyID0gbmV3IFJlZ0V4cChcIl5yZ2JhXFxcXChcIiArIFtyZUksIHJlSSwgcmVJLCByZU5dICsgXCJcXFxcKSRcIiksXG4gICAgcmVSZ2JhUGVyY2VudCA9IG5ldyBSZWdFeHAoXCJecmdiYVxcXFwoXCIgKyBbcmVQLCByZVAsIHJlUCwgcmVOXSArIFwiXFxcXCkkXCIpLFxuICAgIHJlSHNsUGVyY2VudCA9IG5ldyBSZWdFeHAoXCJeaHNsXFxcXChcIiArIFtyZU4sIHJlUCwgcmVQXSArIFwiXFxcXCkkXCIpLFxuICAgIHJlSHNsYVBlcmNlbnQgPSBuZXcgUmVnRXhwKFwiXmhzbGFcXFxcKFwiICsgW3JlTiwgcmVQLCByZVAsIHJlTl0gKyBcIlxcXFwpJFwiKTtcblxudmFyIG5hbWVkID0ge1xuICBhbGljZWJsdWU6IDB4ZjBmOGZmLFxuICBhbnRpcXVld2hpdGU6IDB4ZmFlYmQ3LFxuICBhcXVhOiAweDAwZmZmZixcbiAgYXF1YW1hcmluZTogMHg3ZmZmZDQsXG4gIGF6dXJlOiAweGYwZmZmZixcbiAgYmVpZ2U6IDB4ZjVmNWRjLFxuICBiaXNxdWU6IDB4ZmZlNGM0LFxuICBibGFjazogMHgwMDAwMDAsXG4gIGJsYW5jaGVkYWxtb25kOiAweGZmZWJjZCxcbiAgYmx1ZTogMHgwMDAwZmYsXG4gIGJsdWV2aW9sZXQ6IDB4OGEyYmUyLFxuICBicm93bjogMHhhNTJhMmEsXG4gIGJ1cmx5d29vZDogMHhkZWI4ODcsXG4gIGNhZGV0Ymx1ZTogMHg1ZjllYTAsXG4gIGNoYXJ0cmV1c2U6IDB4N2ZmZjAwLFxuICBjaG9jb2xhdGU6IDB4ZDI2OTFlLFxuICBjb3JhbDogMHhmZjdmNTAsXG4gIGNvcm5mbG93ZXJibHVlOiAweDY0OTVlZCxcbiAgY29ybnNpbGs6IDB4ZmZmOGRjLFxuICBjcmltc29uOiAweGRjMTQzYyxcbiAgY3lhbjogMHgwMGZmZmYsXG4gIGRhcmtibHVlOiAweDAwMDA4YixcbiAgZGFya2N5YW46IDB4MDA4YjhiLFxuICBkYXJrZ29sZGVucm9kOiAweGI4ODYwYixcbiAgZGFya2dyYXk6IDB4YTlhOWE5LFxuICBkYXJrZ3JlZW46IDB4MDA2NDAwLFxuICBkYXJrZ3JleTogMHhhOWE5YTksXG4gIGRhcmtraGFraTogMHhiZGI3NmIsXG4gIGRhcmttYWdlbnRhOiAweDhiMDA4YixcbiAgZGFya29saXZlZ3JlZW46IDB4NTU2YjJmLFxuICBkYXJrb3JhbmdlOiAweGZmOGMwMCxcbiAgZGFya29yY2hpZDogMHg5OTMyY2MsXG4gIGRhcmtyZWQ6IDB4OGIwMDAwLFxuICBkYXJrc2FsbW9uOiAweGU5OTY3YSxcbiAgZGFya3NlYWdyZWVuOiAweDhmYmM4ZixcbiAgZGFya3NsYXRlYmx1ZTogMHg0ODNkOGIsXG4gIGRhcmtzbGF0ZWdyYXk6IDB4MmY0ZjRmLFxuICBkYXJrc2xhdGVncmV5OiAweDJmNGY0ZixcbiAgZGFya3R1cnF1b2lzZTogMHgwMGNlZDEsXG4gIGRhcmt2aW9sZXQ6IDB4OTQwMGQzLFxuICBkZWVwcGluazogMHhmZjE0OTMsXG4gIGRlZXBza3libHVlOiAweDAwYmZmZixcbiAgZGltZ3JheTogMHg2OTY5NjksXG4gIGRpbWdyZXk6IDB4Njk2OTY5LFxuICBkb2RnZXJibHVlOiAweDFlOTBmZixcbiAgZmlyZWJyaWNrOiAweGIyMjIyMixcbiAgZmxvcmFsd2hpdGU6IDB4ZmZmYWYwLFxuICBmb3Jlc3RncmVlbjogMHgyMjhiMjIsXG4gIGZ1Y2hzaWE6IDB4ZmYwMGZmLFxuICBnYWluc2Jvcm86IDB4ZGNkY2RjLFxuICBnaG9zdHdoaXRlOiAweGY4ZjhmZixcbiAgZ29sZDogMHhmZmQ3MDAsXG4gIGdvbGRlbnJvZDogMHhkYWE1MjAsXG4gIGdyYXk6IDB4ODA4MDgwLFxuICBncmVlbjogMHgwMDgwMDAsXG4gIGdyZWVueWVsbG93OiAweGFkZmYyZixcbiAgZ3JleTogMHg4MDgwODAsXG4gIGhvbmV5ZGV3OiAweGYwZmZmMCxcbiAgaG90cGluazogMHhmZjY5YjQsXG4gIGluZGlhbnJlZDogMHhjZDVjNWMsXG4gIGluZGlnbzogMHg0YjAwODIsXG4gIGl2b3J5OiAweGZmZmZmMCxcbiAga2hha2k6IDB4ZjBlNjhjLFxuICBsYXZlbmRlcjogMHhlNmU2ZmEsXG4gIGxhdmVuZGVyYmx1c2g6IDB4ZmZmMGY1LFxuICBsYXduZ3JlZW46IDB4N2NmYzAwLFxuICBsZW1vbmNoaWZmb246IDB4ZmZmYWNkLFxuICBsaWdodGJsdWU6IDB4YWRkOGU2LFxuICBsaWdodGNvcmFsOiAweGYwODA4MCxcbiAgbGlnaHRjeWFuOiAweGUwZmZmZixcbiAgbGlnaHRnb2xkZW5yb2R5ZWxsb3c6IDB4ZmFmYWQyLFxuICBsaWdodGdyYXk6IDB4ZDNkM2QzLFxuICBsaWdodGdyZWVuOiAweDkwZWU5MCxcbiAgbGlnaHRncmV5OiAweGQzZDNkMyxcbiAgbGlnaHRwaW5rOiAweGZmYjZjMSxcbiAgbGlnaHRzYWxtb246IDB4ZmZhMDdhLFxuICBsaWdodHNlYWdyZWVuOiAweDIwYjJhYSxcbiAgbGlnaHRza3libHVlOiAweDg3Y2VmYSxcbiAgbGlnaHRzbGF0ZWdyYXk6IDB4Nzc4ODk5LFxuICBsaWdodHNsYXRlZ3JleTogMHg3Nzg4OTksXG4gIGxpZ2h0c3RlZWxibHVlOiAweGIwYzRkZSxcbiAgbGlnaHR5ZWxsb3c6IDB4ZmZmZmUwLFxuICBsaW1lOiAweDAwZmYwMCxcbiAgbGltZWdyZWVuOiAweDMyY2QzMixcbiAgbGluZW46IDB4ZmFmMGU2LFxuICBtYWdlbnRhOiAweGZmMDBmZixcbiAgbWFyb29uOiAweDgwMDAwMCxcbiAgbWVkaXVtYXF1YW1hcmluZTogMHg2NmNkYWEsXG4gIG1lZGl1bWJsdWU6IDB4MDAwMGNkLFxuICBtZWRpdW1vcmNoaWQ6IDB4YmE1NWQzLFxuICBtZWRpdW1wdXJwbGU6IDB4OTM3MGRiLFxuICBtZWRpdW1zZWFncmVlbjogMHgzY2IzNzEsXG4gIG1lZGl1bXNsYXRlYmx1ZTogMHg3YjY4ZWUsXG4gIG1lZGl1bXNwcmluZ2dyZWVuOiAweDAwZmE5YSxcbiAgbWVkaXVtdHVycXVvaXNlOiAweDQ4ZDFjYyxcbiAgbWVkaXVtdmlvbGV0cmVkOiAweGM3MTU4NSxcbiAgbWlkbmlnaHRibHVlOiAweDE5MTk3MCxcbiAgbWludGNyZWFtOiAweGY1ZmZmYSxcbiAgbWlzdHlyb3NlOiAweGZmZTRlMSxcbiAgbW9jY2FzaW46IDB4ZmZlNGI1LFxuICBuYXZham93aGl0ZTogMHhmZmRlYWQsXG4gIG5hdnk6IDB4MDAwMDgwLFxuICBvbGRsYWNlOiAweGZkZjVlNixcbiAgb2xpdmU6IDB4ODA4MDAwLFxuICBvbGl2ZWRyYWI6IDB4NmI4ZTIzLFxuICBvcmFuZ2U6IDB4ZmZhNTAwLFxuICBvcmFuZ2VyZWQ6IDB4ZmY0NTAwLFxuICBvcmNoaWQ6IDB4ZGE3MGQ2LFxuICBwYWxlZ29sZGVucm9kOiAweGVlZThhYSxcbiAgcGFsZWdyZWVuOiAweDk4ZmI5OCxcbiAgcGFsZXR1cnF1b2lzZTogMHhhZmVlZWUsXG4gIHBhbGV2aW9sZXRyZWQ6IDB4ZGI3MDkzLFxuICBwYXBheWF3aGlwOiAweGZmZWZkNSxcbiAgcGVhY2hwdWZmOiAweGZmZGFiOSxcbiAgcGVydTogMHhjZDg1M2YsXG4gIHBpbms6IDB4ZmZjMGNiLFxuICBwbHVtOiAweGRkYTBkZCxcbiAgcG93ZGVyYmx1ZTogMHhiMGUwZTYsXG4gIHB1cnBsZTogMHg4MDAwODAsXG4gIHJlYmVjY2FwdXJwbGU6IDB4NjYzMzk5LFxuICByZWQ6IDB4ZmYwMDAwLFxuICByb3N5YnJvd246IDB4YmM4ZjhmLFxuICByb3lhbGJsdWU6IDB4NDE2OWUxLFxuICBzYWRkbGVicm93bjogMHg4YjQ1MTMsXG4gIHNhbG1vbjogMHhmYTgwNzIsXG4gIHNhbmR5YnJvd246IDB4ZjRhNDYwLFxuICBzZWFncmVlbjogMHgyZThiNTcsXG4gIHNlYXNoZWxsOiAweGZmZjVlZSxcbiAgc2llbm5hOiAweGEwNTIyZCxcbiAgc2lsdmVyOiAweGMwYzBjMCxcbiAgc2t5Ymx1ZTogMHg4N2NlZWIsXG4gIHNsYXRlYmx1ZTogMHg2YTVhY2QsXG4gIHNsYXRlZ3JheTogMHg3MDgwOTAsXG4gIHNsYXRlZ3JleTogMHg3MDgwOTAsXG4gIHNub3c6IDB4ZmZmYWZhLFxuICBzcHJpbmdncmVlbjogMHgwMGZmN2YsXG4gIHN0ZWVsYmx1ZTogMHg0NjgyYjQsXG4gIHRhbjogMHhkMmI0OGMsXG4gIHRlYWw6IDB4MDA4MDgwLFxuICB0aGlzdGxlOiAweGQ4YmZkOCxcbiAgdG9tYXRvOiAweGZmNjM0NyxcbiAgdHVycXVvaXNlOiAweDQwZTBkMCxcbiAgdmlvbGV0OiAweGVlODJlZSxcbiAgd2hlYXQ6IDB4ZjVkZWIzLFxuICB3aGl0ZTogMHhmZmZmZmYsXG4gIHdoaXRlc21va2U6IDB4ZjVmNWY1LFxuICB5ZWxsb3c6IDB4ZmZmZjAwLFxuICB5ZWxsb3dncmVlbjogMHg5YWNkMzJcbn07XG5cbmRlZmluZShDb2xvciwgY29sb3IsIHtcbiAgY29weTogZnVuY3Rpb24oY2hhbm5lbHMpIHtcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihuZXcgdGhpcy5jb25zdHJ1Y3RvciwgdGhpcywgY2hhbm5lbHMpO1xuICB9LFxuICBkaXNwbGF5YWJsZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMucmdiKCkuZGlzcGxheWFibGUoKTtcbiAgfSxcbiAgaGV4OiBjb2xvcl9mb3JtYXRIZXgsIC8vIERlcHJlY2F0ZWQhIFVzZSBjb2xvci5mb3JtYXRIZXguXG4gIGZvcm1hdEhleDogY29sb3JfZm9ybWF0SGV4LFxuICBmb3JtYXRIc2w6IGNvbG9yX2Zvcm1hdEhzbCxcbiAgZm9ybWF0UmdiOiBjb2xvcl9mb3JtYXRSZ2IsXG4gIHRvU3RyaW5nOiBjb2xvcl9mb3JtYXRSZ2Jcbn0pO1xuXG5mdW5jdGlvbiBjb2xvcl9mb3JtYXRIZXgoKSB7XG4gIHJldHVybiB0aGlzLnJnYigpLmZvcm1hdEhleCgpO1xufVxuXG5mdW5jdGlvbiBjb2xvcl9mb3JtYXRIc2woKSB7XG4gIHJldHVybiBoc2xDb252ZXJ0KHRoaXMpLmZvcm1hdEhzbCgpO1xufVxuXG5mdW5jdGlvbiBjb2xvcl9mb3JtYXRSZ2IoKSB7XG4gIHJldHVybiB0aGlzLnJnYigpLmZvcm1hdFJnYigpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb2xvcihmb3JtYXQpIHtcbiAgdmFyIG0sIGw7XG4gIGZvcm1hdCA9IChmb3JtYXQgKyBcIlwiKS50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgcmV0dXJuIChtID0gcmVIZXguZXhlYyhmb3JtYXQpKSA/IChsID0gbVsxXS5sZW5ndGgsIG0gPSBwYXJzZUludChtWzFdLCAxNiksIGwgPT09IDYgPyByZ2JuKG0pIC8vICNmZjAwMDBcbiAgICAgIDogbCA9PT0gMyA/IG5ldyBSZ2IoKG0gPj4gOCAmIDB4ZikgfCAobSA+PiA0ICYgMHhmMCksIChtID4+IDQgJiAweGYpIHwgKG0gJiAweGYwKSwgKChtICYgMHhmKSA8PCA0KSB8IChtICYgMHhmKSwgMSkgLy8gI2YwMFxuICAgICAgOiBsID09PSA4ID8gcmdiYShtID4+IDI0ICYgMHhmZiwgbSA+PiAxNiAmIDB4ZmYsIG0gPj4gOCAmIDB4ZmYsIChtICYgMHhmZikgLyAweGZmKSAvLyAjZmYwMDAwMDBcbiAgICAgIDogbCA9PT0gNCA/IHJnYmEoKG0gPj4gMTIgJiAweGYpIHwgKG0gPj4gOCAmIDB4ZjApLCAobSA+PiA4ICYgMHhmKSB8IChtID4+IDQgJiAweGYwKSwgKG0gPj4gNCAmIDB4ZikgfCAobSAmIDB4ZjApLCAoKChtICYgMHhmKSA8PCA0KSB8IChtICYgMHhmKSkgLyAweGZmKSAvLyAjZjAwMFxuICAgICAgOiBudWxsKSAvLyBpbnZhbGlkIGhleFxuICAgICAgOiAobSA9IHJlUmdiSW50ZWdlci5leGVjKGZvcm1hdCkpID8gbmV3IFJnYihtWzFdLCBtWzJdLCBtWzNdLCAxKSAvLyByZ2IoMjU1LCAwLCAwKVxuICAgICAgOiAobSA9IHJlUmdiUGVyY2VudC5leGVjKGZvcm1hdCkpID8gbmV3IFJnYihtWzFdICogMjU1IC8gMTAwLCBtWzJdICogMjU1IC8gMTAwLCBtWzNdICogMjU1IC8gMTAwLCAxKSAvLyByZ2IoMTAwJSwgMCUsIDAlKVxuICAgICAgOiAobSA9IHJlUmdiYUludGVnZXIuZXhlYyhmb3JtYXQpKSA/IHJnYmEobVsxXSwgbVsyXSwgbVszXSwgbVs0XSkgLy8gcmdiYSgyNTUsIDAsIDAsIDEpXG4gICAgICA6IChtID0gcmVSZ2JhUGVyY2VudC5leGVjKGZvcm1hdCkpID8gcmdiYShtWzFdICogMjU1IC8gMTAwLCBtWzJdICogMjU1IC8gMTAwLCBtWzNdICogMjU1IC8gMTAwLCBtWzRdKSAvLyByZ2IoMTAwJSwgMCUsIDAlLCAxKVxuICAgICAgOiAobSA9IHJlSHNsUGVyY2VudC5leGVjKGZvcm1hdCkpID8gaHNsYShtWzFdLCBtWzJdIC8gMTAwLCBtWzNdIC8gMTAwLCAxKSAvLyBoc2woMTIwLCA1MCUsIDUwJSlcbiAgICAgIDogKG0gPSByZUhzbGFQZXJjZW50LmV4ZWMoZm9ybWF0KSkgPyBoc2xhKG1bMV0sIG1bMl0gLyAxMDAsIG1bM10gLyAxMDAsIG1bNF0pIC8vIGhzbGEoMTIwLCA1MCUsIDUwJSwgMSlcbiAgICAgIDogbmFtZWQuaGFzT3duUHJvcGVydHkoZm9ybWF0KSA/IHJnYm4obmFtZWRbZm9ybWF0XSkgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcbiAgICAgIDogZm9ybWF0ID09PSBcInRyYW5zcGFyZW50XCIgPyBuZXcgUmdiKE5hTiwgTmFOLCBOYU4sIDApXG4gICAgICA6IG51bGw7XG59XG5cbmZ1bmN0aW9uIHJnYm4obikge1xuICByZXR1cm4gbmV3IFJnYihuID4+IDE2ICYgMHhmZiwgbiA+PiA4ICYgMHhmZiwgbiAmIDB4ZmYsIDEpO1xufVxuXG5mdW5jdGlvbiByZ2JhKHIsIGcsIGIsIGEpIHtcbiAgaWYgKGEgPD0gMCkgciA9IGcgPSBiID0gTmFOO1xuICByZXR1cm4gbmV3IFJnYihyLCBnLCBiLCBhKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJnYkNvbnZlcnQobykge1xuICBpZiAoIShvIGluc3RhbmNlb2YgQ29sb3IpKSBvID0gY29sb3Iobyk7XG4gIGlmICghbykgcmV0dXJuIG5ldyBSZ2I7XG4gIG8gPSBvLnJnYigpO1xuICByZXR1cm4gbmV3IFJnYihvLnIsIG8uZywgby5iLCBvLm9wYWNpdHkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmdiKHIsIGcsIGIsIG9wYWNpdHkpIHtcbiAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPT09IDEgPyByZ2JDb252ZXJ0KHIpIDogbmV3IFJnYihyLCBnLCBiLCBvcGFjaXR5ID09IG51bGwgPyAxIDogb3BhY2l0eSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBSZ2IociwgZywgYiwgb3BhY2l0eSkge1xuICB0aGlzLnIgPSArcjtcbiAgdGhpcy5nID0gK2c7XG4gIHRoaXMuYiA9ICtiO1xuICB0aGlzLm9wYWNpdHkgPSArb3BhY2l0eTtcbn1cblxuZGVmaW5lKFJnYiwgcmdiLCBleHRlbmQoQ29sb3IsIHtcbiAgYnJpZ2h0ZXI6IGZ1bmN0aW9uKGspIHtcbiAgICBrID0gayA9PSBudWxsID8gYnJpZ2h0ZXIgOiBNYXRoLnBvdyhicmlnaHRlciwgayk7XG4gICAgcmV0dXJuIG5ldyBSZ2IodGhpcy5yICogaywgdGhpcy5nICogaywgdGhpcy5iICogaywgdGhpcy5vcGFjaXR5KTtcbiAgfSxcbiAgZGFya2VyOiBmdW5jdGlvbihrKSB7XG4gICAgayA9IGsgPT0gbnVsbCA/IGRhcmtlciA6IE1hdGgucG93KGRhcmtlciwgayk7XG4gICAgcmV0dXJuIG5ldyBSZ2IodGhpcy5yICogaywgdGhpcy5nICogaywgdGhpcy5iICogaywgdGhpcy5vcGFjaXR5KTtcbiAgfSxcbiAgcmdiOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcbiAgZGlzcGxheWFibGU6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAoLTAuNSA8PSB0aGlzLnIgJiYgdGhpcy5yIDwgMjU1LjUpXG4gICAgICAgICYmICgtMC41IDw9IHRoaXMuZyAmJiB0aGlzLmcgPCAyNTUuNSlcbiAgICAgICAgJiYgKC0wLjUgPD0gdGhpcy5iICYmIHRoaXMuYiA8IDI1NS41KVxuICAgICAgICAmJiAoMCA8PSB0aGlzLm9wYWNpdHkgJiYgdGhpcy5vcGFjaXR5IDw9IDEpO1xuICB9LFxuICBoZXg6IHJnYl9mb3JtYXRIZXgsIC8vIERlcHJlY2F0ZWQhIFVzZSBjb2xvci5mb3JtYXRIZXguXG4gIGZvcm1hdEhleDogcmdiX2Zvcm1hdEhleCxcbiAgZm9ybWF0UmdiOiByZ2JfZm9ybWF0UmdiLFxuICB0b1N0cmluZzogcmdiX2Zvcm1hdFJnYlxufSkpO1xuXG5mdW5jdGlvbiByZ2JfZm9ybWF0SGV4KCkge1xuICByZXR1cm4gXCIjXCIgKyBoZXgodGhpcy5yKSArIGhleCh0aGlzLmcpICsgaGV4KHRoaXMuYik7XG59XG5cbmZ1bmN0aW9uIHJnYl9mb3JtYXRSZ2IoKSB7XG4gIHZhciBhID0gdGhpcy5vcGFjaXR5OyBhID0gaXNOYU4oYSkgPyAxIDogTWF0aC5tYXgoMCwgTWF0aC5taW4oMSwgYSkpO1xuICByZXR1cm4gKGEgPT09IDEgPyBcInJnYihcIiA6IFwicmdiYShcIilcbiAgICAgICsgTWF0aC5tYXgoMCwgTWF0aC5taW4oMjU1LCBNYXRoLnJvdW5kKHRoaXMucikgfHwgMCkpICsgXCIsIFwiXG4gICAgICArIE1hdGgubWF4KDAsIE1hdGgubWluKDI1NSwgTWF0aC5yb3VuZCh0aGlzLmcpIHx8IDApKSArIFwiLCBcIlxuICAgICAgKyBNYXRoLm1heCgwLCBNYXRoLm1pbigyNTUsIE1hdGgucm91bmQodGhpcy5iKSB8fCAwKSlcbiAgICAgICsgKGEgPT09IDEgPyBcIilcIiA6IFwiLCBcIiArIGEgKyBcIilcIik7XG59XG5cbmZ1bmN0aW9uIGhleCh2YWx1ZSkge1xuICB2YWx1ZSA9IE1hdGgubWF4KDAsIE1hdGgubWluKDI1NSwgTWF0aC5yb3VuZCh2YWx1ZSkgfHwgMCkpO1xuICByZXR1cm4gKHZhbHVlIDwgMTYgPyBcIjBcIiA6IFwiXCIpICsgdmFsdWUudG9TdHJpbmcoMTYpO1xufVxuXG5mdW5jdGlvbiBoc2xhKGgsIHMsIGwsIGEpIHtcbiAgaWYgKGEgPD0gMCkgaCA9IHMgPSBsID0gTmFOO1xuICBlbHNlIGlmIChsIDw9IDAgfHwgbCA+PSAxKSBoID0gcyA9IE5hTjtcbiAgZWxzZSBpZiAocyA8PSAwKSBoID0gTmFOO1xuICByZXR1cm4gbmV3IEhzbChoLCBzLCBsLCBhKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhzbENvbnZlcnQobykge1xuICBpZiAobyBpbnN0YW5jZW9mIEhzbCkgcmV0dXJuIG5ldyBIc2woby5oLCBvLnMsIG8ubCwgby5vcGFjaXR5KTtcbiAgaWYgKCEobyBpbnN0YW5jZW9mIENvbG9yKSkgbyA9IGNvbG9yKG8pO1xuICBpZiAoIW8pIHJldHVybiBuZXcgSHNsO1xuICBpZiAobyBpbnN0YW5jZW9mIEhzbCkgcmV0dXJuIG87XG4gIG8gPSBvLnJnYigpO1xuICB2YXIgciA9IG8uciAvIDI1NSxcbiAgICAgIGcgPSBvLmcgLyAyNTUsXG4gICAgICBiID0gby5iIC8gMjU1LFxuICAgICAgbWluID0gTWF0aC5taW4ociwgZywgYiksXG4gICAgICBtYXggPSBNYXRoLm1heChyLCBnLCBiKSxcbiAgICAgIGggPSBOYU4sXG4gICAgICBzID0gbWF4IC0gbWluLFxuICAgICAgbCA9IChtYXggKyBtaW4pIC8gMjtcbiAgaWYgKHMpIHtcbiAgICBpZiAociA9PT0gbWF4KSBoID0gKGcgLSBiKSAvIHMgKyAoZyA8IGIpICogNjtcbiAgICBlbHNlIGlmIChnID09PSBtYXgpIGggPSAoYiAtIHIpIC8gcyArIDI7XG4gICAgZWxzZSBoID0gKHIgLSBnKSAvIHMgKyA0O1xuICAgIHMgLz0gbCA8IDAuNSA/IG1heCArIG1pbiA6IDIgLSBtYXggLSBtaW47XG4gICAgaCAqPSA2MDtcbiAgfSBlbHNlIHtcbiAgICBzID0gbCA+IDAgJiYgbCA8IDEgPyAwIDogaDtcbiAgfVxuICByZXR1cm4gbmV3IEhzbChoLCBzLCBsLCBvLm9wYWNpdHkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaHNsKGgsIHMsIGwsIG9wYWNpdHkpIHtcbiAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPT09IDEgPyBoc2xDb252ZXJ0KGgpIDogbmV3IEhzbChoLCBzLCBsLCBvcGFjaXR5ID09IG51bGwgPyAxIDogb3BhY2l0eSk7XG59XG5cbmZ1bmN0aW9uIEhzbChoLCBzLCBsLCBvcGFjaXR5KSB7XG4gIHRoaXMuaCA9ICtoO1xuICB0aGlzLnMgPSArcztcbiAgdGhpcy5sID0gK2w7XG4gIHRoaXMub3BhY2l0eSA9ICtvcGFjaXR5O1xufVxuXG5kZWZpbmUoSHNsLCBoc2wsIGV4dGVuZChDb2xvciwge1xuICBicmlnaHRlcjogZnVuY3Rpb24oaykge1xuICAgIGsgPSBrID09IG51bGwgPyBicmlnaHRlciA6IE1hdGgucG93KGJyaWdodGVyLCBrKTtcbiAgICByZXR1cm4gbmV3IEhzbCh0aGlzLmgsIHRoaXMucywgdGhpcy5sICogaywgdGhpcy5vcGFjaXR5KTtcbiAgfSxcbiAgZGFya2VyOiBmdW5jdGlvbihrKSB7XG4gICAgayA9IGsgPT0gbnVsbCA/IGRhcmtlciA6IE1hdGgucG93KGRhcmtlciwgayk7XG4gICAgcmV0dXJuIG5ldyBIc2wodGhpcy5oLCB0aGlzLnMsIHRoaXMubCAqIGssIHRoaXMub3BhY2l0eSk7XG4gIH0sXG4gIHJnYjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGggPSB0aGlzLmggJSAzNjAgKyAodGhpcy5oIDwgMCkgKiAzNjAsXG4gICAgICAgIHMgPSBpc05hTihoKSB8fCBpc05hTih0aGlzLnMpID8gMCA6IHRoaXMucyxcbiAgICAgICAgbCA9IHRoaXMubCxcbiAgICAgICAgbTIgPSBsICsgKGwgPCAwLjUgPyBsIDogMSAtIGwpICogcyxcbiAgICAgICAgbTEgPSAyICogbCAtIG0yO1xuICAgIHJldHVybiBuZXcgUmdiKFxuICAgICAgaHNsMnJnYihoID49IDI0MCA/IGggLSAyNDAgOiBoICsgMTIwLCBtMSwgbTIpLFxuICAgICAgaHNsMnJnYihoLCBtMSwgbTIpLFxuICAgICAgaHNsMnJnYihoIDwgMTIwID8gaCArIDI0MCA6IGggLSAxMjAsIG0xLCBtMiksXG4gICAgICB0aGlzLm9wYWNpdHlcbiAgICApO1xuICB9LFxuICBkaXNwbGF5YWJsZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuICgwIDw9IHRoaXMucyAmJiB0aGlzLnMgPD0gMSB8fCBpc05hTih0aGlzLnMpKVxuICAgICAgICAmJiAoMCA8PSB0aGlzLmwgJiYgdGhpcy5sIDw9IDEpXG4gICAgICAgICYmICgwIDw9IHRoaXMub3BhY2l0eSAmJiB0aGlzLm9wYWNpdHkgPD0gMSk7XG4gIH0sXG4gIGZvcm1hdEhzbDogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGEgPSB0aGlzLm9wYWNpdHk7IGEgPSBpc05hTihhKSA/IDEgOiBNYXRoLm1heCgwLCBNYXRoLm1pbigxLCBhKSk7XG4gICAgcmV0dXJuIChhID09PSAxID8gXCJoc2woXCIgOiBcImhzbGEoXCIpXG4gICAgICAgICsgKHRoaXMuaCB8fCAwKSArIFwiLCBcIlxuICAgICAgICArICh0aGlzLnMgfHwgMCkgKiAxMDAgKyBcIiUsIFwiXG4gICAgICAgICsgKHRoaXMubCB8fCAwKSAqIDEwMCArIFwiJVwiXG4gICAgICAgICsgKGEgPT09IDEgPyBcIilcIiA6IFwiLCBcIiArIGEgKyBcIilcIik7XG4gIH1cbn0pKTtcblxuLyogRnJvbSBGdkQgMTMuMzcsIENTUyBDb2xvciBNb2R1bGUgTGV2ZWwgMyAqL1xuZnVuY3Rpb24gaHNsMnJnYihoLCBtMSwgbTIpIHtcbiAgcmV0dXJuIChoIDwgNjAgPyBtMSArIChtMiAtIG0xKSAqIGggLyA2MFxuICAgICAgOiBoIDwgMTgwID8gbTJcbiAgICAgIDogaCA8IDI0MCA/IG0xICsgKG0yIC0gbTEpICogKDI0MCAtIGgpIC8gNjBcbiAgICAgIDogbTEpICogMjU1O1xufVxuIiwgImV4cG9ydCBmdW5jdGlvbiBiYXNpcyh0MSwgdjAsIHYxLCB2MiwgdjMpIHtcbiAgdmFyIHQyID0gdDEgKiB0MSwgdDMgPSB0MiAqIHQxO1xuICByZXR1cm4gKCgxIC0gMyAqIHQxICsgMyAqIHQyIC0gdDMpICogdjBcbiAgICAgICsgKDQgLSA2ICogdDIgKyAzICogdDMpICogdjFcbiAgICAgICsgKDEgKyAzICogdDEgKyAzICogdDIgLSAzICogdDMpICogdjJcbiAgICAgICsgdDMgKiB2MykgLyA2O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih2YWx1ZXMpIHtcbiAgdmFyIG4gPSB2YWx1ZXMubGVuZ3RoIC0gMTtcbiAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICB2YXIgaSA9IHQgPD0gMCA/ICh0ID0gMCkgOiB0ID49IDEgPyAodCA9IDEsIG4gLSAxKSA6IE1hdGguZmxvb3IodCAqIG4pLFxuICAgICAgICB2MSA9IHZhbHVlc1tpXSxcbiAgICAgICAgdjIgPSB2YWx1ZXNbaSArIDFdLFxuICAgICAgICB2MCA9IGkgPiAwID8gdmFsdWVzW2kgLSAxXSA6IDIgKiB2MSAtIHYyLFxuICAgICAgICB2MyA9IGkgPCBuIC0gMSA/IHZhbHVlc1tpICsgMl0gOiAyICogdjIgLSB2MTtcbiAgICByZXR1cm4gYmFzaXMoKHQgLSBpIC8gbikgKiBuLCB2MCwgdjEsIHYyLCB2Myk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHtiYXNpc30gZnJvbSBcIi4vYmFzaXMuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odmFsdWVzKSB7XG4gIHZhciBuID0gdmFsdWVzLmxlbmd0aDtcbiAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICB2YXIgaSA9IE1hdGguZmxvb3IoKCh0ICU9IDEpIDwgMCA/ICsrdCA6IHQpICogbiksXG4gICAgICAgIHYwID0gdmFsdWVzWyhpICsgbiAtIDEpICUgbl0sXG4gICAgICAgIHYxID0gdmFsdWVzW2kgJSBuXSxcbiAgICAgICAgdjIgPSB2YWx1ZXNbKGkgKyAxKSAlIG5dLFxuICAgICAgICB2MyA9IHZhbHVlc1soaSArIDIpICUgbl07XG4gICAgcmV0dXJuIGJhc2lzKCh0IC0gaSAvIG4pICogbiwgdjAsIHYxLCB2MiwgdjMpO1xuICB9O1xufVxuIiwgImV4cG9ydCBkZWZhdWx0IHggPT4gKCkgPT4geDtcbiIsICJpbXBvcnQgY29uc3RhbnQgZnJvbSBcIi4vY29uc3RhbnQuanNcIjtcblxuZnVuY3Rpb24gbGluZWFyKGEsIGQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICByZXR1cm4gYSArIHQgKiBkO1xuICB9O1xufVxuXG5mdW5jdGlvbiBleHBvbmVudGlhbChhLCBiLCB5KSB7XG4gIHJldHVybiBhID0gTWF0aC5wb3coYSwgeSksIGIgPSBNYXRoLnBvdyhiLCB5KSAtIGEsIHkgPSAxIC8geSwgZnVuY3Rpb24odCkge1xuICAgIHJldHVybiBNYXRoLnBvdyhhICsgdCAqIGIsIHkpO1xuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaHVlKGEsIGIpIHtcbiAgdmFyIGQgPSBiIC0gYTtcbiAgcmV0dXJuIGQgPyBsaW5lYXIoYSwgZCA+IDE4MCB8fCBkIDwgLTE4MCA/IGQgLSAzNjAgKiBNYXRoLnJvdW5kKGQgLyAzNjApIDogZCkgOiBjb25zdGFudChpc05hTihhKSA/IGIgOiBhKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdhbW1hKHkpIHtcbiAgcmV0dXJuICh5ID0gK3kpID09PSAxID8gbm9nYW1tYSA6IGZ1bmN0aW9uKGEsIGIpIHtcbiAgICByZXR1cm4gYiAtIGEgPyBleHBvbmVudGlhbChhLCBiLCB5KSA6IGNvbnN0YW50KGlzTmFOKGEpID8gYiA6IGEpO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBub2dhbW1hKGEsIGIpIHtcbiAgdmFyIGQgPSBiIC0gYTtcbiAgcmV0dXJuIGQgPyBsaW5lYXIoYSwgZCkgOiBjb25zdGFudChpc05hTihhKSA/IGIgOiBhKTtcbn1cbiIsICJpbXBvcnQge3JnYiBhcyBjb2xvclJnYn0gZnJvbSBcImQzLWNvbG9yXCI7XG5pbXBvcnQgYmFzaXMgZnJvbSBcIi4vYmFzaXMuanNcIjtcbmltcG9ydCBiYXNpc0Nsb3NlZCBmcm9tIFwiLi9iYXNpc0Nsb3NlZC5qc1wiO1xuaW1wb3J0IG5vZ2FtbWEsIHtnYW1tYX0gZnJvbSBcIi4vY29sb3IuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgKGZ1bmN0aW9uIHJnYkdhbW1hKHkpIHtcbiAgdmFyIGNvbG9yID0gZ2FtbWEoeSk7XG5cbiAgZnVuY3Rpb24gcmdiKHN0YXJ0LCBlbmQpIHtcbiAgICB2YXIgciA9IGNvbG9yKChzdGFydCA9IGNvbG9yUmdiKHN0YXJ0KSkuciwgKGVuZCA9IGNvbG9yUmdiKGVuZCkpLnIpLFxuICAgICAgICBnID0gY29sb3Ioc3RhcnQuZywgZW5kLmcpLFxuICAgICAgICBiID0gY29sb3Ioc3RhcnQuYiwgZW5kLmIpLFxuICAgICAgICBvcGFjaXR5ID0gbm9nYW1tYShzdGFydC5vcGFjaXR5LCBlbmQub3BhY2l0eSk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICAgIHN0YXJ0LnIgPSByKHQpO1xuICAgICAgc3RhcnQuZyA9IGcodCk7XG4gICAgICBzdGFydC5iID0gYih0KTtcbiAgICAgIHN0YXJ0Lm9wYWNpdHkgPSBvcGFjaXR5KHQpO1xuICAgICAgcmV0dXJuIHN0YXJ0ICsgXCJcIjtcbiAgICB9O1xuICB9XG5cbiAgcmdiLmdhbW1hID0gcmdiR2FtbWE7XG5cbiAgcmV0dXJuIHJnYjtcbn0pKDEpO1xuXG5mdW5jdGlvbiByZ2JTcGxpbmUoc3BsaW5lKSB7XG4gIHJldHVybiBmdW5jdGlvbihjb2xvcnMpIHtcbiAgICB2YXIgbiA9IGNvbG9ycy5sZW5ndGgsXG4gICAgICAgIHIgPSBuZXcgQXJyYXkobiksXG4gICAgICAgIGcgPSBuZXcgQXJyYXkobiksXG4gICAgICAgIGIgPSBuZXcgQXJyYXkobiksXG4gICAgICAgIGksIGNvbG9yO1xuICAgIGZvciAoaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICAgIGNvbG9yID0gY29sb3JSZ2IoY29sb3JzW2ldKTtcbiAgICAgIHJbaV0gPSBjb2xvci5yIHx8IDA7XG4gICAgICBnW2ldID0gY29sb3IuZyB8fCAwO1xuICAgICAgYltpXSA9IGNvbG9yLmIgfHwgMDtcbiAgICB9XG4gICAgciA9IHNwbGluZShyKTtcbiAgICBnID0gc3BsaW5lKGcpO1xuICAgIGIgPSBzcGxpbmUoYik7XG4gICAgY29sb3Iub3BhY2l0eSA9IDE7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICAgIGNvbG9yLnIgPSByKHQpO1xuICAgICAgY29sb3IuZyA9IGcodCk7XG4gICAgICBjb2xvci5iID0gYih0KTtcbiAgICAgIHJldHVybiBjb2xvciArIFwiXCI7XG4gICAgfTtcbiAgfTtcbn1cblxuZXhwb3J0IHZhciByZ2JCYXNpcyA9IHJnYlNwbGluZShiYXNpcyk7XG5leHBvcnQgdmFyIHJnYkJhc2lzQ2xvc2VkID0gcmdiU3BsaW5lKGJhc2lzQ2xvc2VkKTtcbiIsICJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihhLCBiKSB7XG4gIGlmICghYikgYiA9IFtdO1xuICB2YXIgbiA9IGEgPyBNYXRoLm1pbihiLmxlbmd0aCwgYS5sZW5ndGgpIDogMCxcbiAgICAgIGMgPSBiLnNsaWNlKCksXG4gICAgICBpO1xuICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgIGZvciAoaSA9IDA7IGkgPCBuOyArK2kpIGNbaV0gPSBhW2ldICogKDEgLSB0KSArIGJbaV0gKiB0O1xuICAgIHJldHVybiBjO1xuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNOdW1iZXJBcnJheSh4KSB7XG4gIHJldHVybiBBcnJheUJ1ZmZlci5pc1ZpZXcoeCkgJiYgISh4IGluc3RhbmNlb2YgRGF0YVZpZXcpO1xufVxuIiwgImltcG9ydCB2YWx1ZSBmcm9tIFwiLi92YWx1ZS5qc1wiO1xuaW1wb3J0IG51bWJlckFycmF5LCB7aXNOdW1iZXJBcnJheX0gZnJvbSBcIi4vbnVtYmVyQXJyYXkuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oYSwgYikge1xuICByZXR1cm4gKGlzTnVtYmVyQXJyYXkoYikgPyBudW1iZXJBcnJheSA6IGdlbmVyaWNBcnJheSkoYSwgYik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmljQXJyYXkoYSwgYikge1xuICB2YXIgbmIgPSBiID8gYi5sZW5ndGggOiAwLFxuICAgICAgbmEgPSBhID8gTWF0aC5taW4obmIsIGEubGVuZ3RoKSA6IDAsXG4gICAgICB4ID0gbmV3IEFycmF5KG5hKSxcbiAgICAgIGMgPSBuZXcgQXJyYXkobmIpLFxuICAgICAgaTtcblxuICBmb3IgKGkgPSAwOyBpIDwgbmE7ICsraSkgeFtpXSA9IHZhbHVlKGFbaV0sIGJbaV0pO1xuICBmb3IgKDsgaSA8IG5iOyArK2kpIGNbaV0gPSBiW2ldO1xuXG4gIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgZm9yIChpID0gMDsgaSA8IG5hOyArK2kpIGNbaV0gPSB4W2ldKHQpO1xuICAgIHJldHVybiBjO1xuICB9O1xufVxuIiwgImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGEsIGIpIHtcbiAgdmFyIGQgPSBuZXcgRGF0ZTtcbiAgcmV0dXJuIGEgPSArYSwgYiA9ICtiLCBmdW5jdGlvbih0KSB7XG4gICAgcmV0dXJuIGQuc2V0VGltZShhICogKDEgLSB0KSArIGIgKiB0KSwgZDtcbiAgfTtcbn1cbiIsICJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihhLCBiKSB7XG4gIHJldHVybiBhID0gK2EsIGIgPSArYiwgZnVuY3Rpb24odCkge1xuICAgIHJldHVybiBhICogKDEgLSB0KSArIGIgKiB0O1xuICB9O1xufVxuIiwgImltcG9ydCB2YWx1ZSBmcm9tIFwiLi92YWx1ZS5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihhLCBiKSB7XG4gIHZhciBpID0ge30sXG4gICAgICBjID0ge30sXG4gICAgICBrO1xuXG4gIGlmIChhID09PSBudWxsIHx8IHR5cGVvZiBhICE9PSBcIm9iamVjdFwiKSBhID0ge307XG4gIGlmIChiID09PSBudWxsIHx8IHR5cGVvZiBiICE9PSBcIm9iamVjdFwiKSBiID0ge307XG5cbiAgZm9yIChrIGluIGIpIHtcbiAgICBpZiAoayBpbiBhKSB7XG4gICAgICBpW2tdID0gdmFsdWUoYVtrXSwgYltrXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNba10gPSBiW2tdO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgZm9yIChrIGluIGkpIGNba10gPSBpW2tdKHQpO1xuICAgIHJldHVybiBjO1xuICB9O1xufVxuIiwgImltcG9ydCBudW1iZXIgZnJvbSBcIi4vbnVtYmVyLmpzXCI7XG5cbnZhciByZUEgPSAvWy0rXT8oPzpcXGQrXFwuP1xcZCp8XFwuP1xcZCspKD86W2VFXVstK10/XFxkKyk/L2csXG4gICAgcmVCID0gbmV3IFJlZ0V4cChyZUEuc291cmNlLCBcImdcIik7XG5cbmZ1bmN0aW9uIHplcm8oYikge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGI7XG4gIH07XG59XG5cbmZ1bmN0aW9uIG9uZShiKSB7XG4gIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgcmV0dXJuIGIodCkgKyBcIlwiO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihhLCBiKSB7XG4gIHZhciBiaSA9IHJlQS5sYXN0SW5kZXggPSByZUIubGFzdEluZGV4ID0gMCwgLy8gc2NhbiBpbmRleCBmb3IgbmV4dCBudW1iZXIgaW4gYlxuICAgICAgYW0sIC8vIGN1cnJlbnQgbWF0Y2ggaW4gYVxuICAgICAgYm0sIC8vIGN1cnJlbnQgbWF0Y2ggaW4gYlxuICAgICAgYnMsIC8vIHN0cmluZyBwcmVjZWRpbmcgY3VycmVudCBudW1iZXIgaW4gYiwgaWYgYW55XG4gICAgICBpID0gLTEsIC8vIGluZGV4IGluIHNcbiAgICAgIHMgPSBbXSwgLy8gc3RyaW5nIGNvbnN0YW50cyBhbmQgcGxhY2Vob2xkZXJzXG4gICAgICBxID0gW107IC8vIG51bWJlciBpbnRlcnBvbGF0b3JzXG5cbiAgLy8gQ29lcmNlIGlucHV0cyB0byBzdHJpbmdzLlxuICBhID0gYSArIFwiXCIsIGIgPSBiICsgXCJcIjtcblxuICAvLyBJbnRlcnBvbGF0ZSBwYWlycyBvZiBudW1iZXJzIGluIGEgJiBiLlxuICB3aGlsZSAoKGFtID0gcmVBLmV4ZWMoYSkpXG4gICAgICAmJiAoYm0gPSByZUIuZXhlYyhiKSkpIHtcbiAgICBpZiAoKGJzID0gYm0uaW5kZXgpID4gYmkpIHsgLy8gYSBzdHJpbmcgcHJlY2VkZXMgdGhlIG5leHQgbnVtYmVyIGluIGJcbiAgICAgIGJzID0gYi5zbGljZShiaSwgYnMpO1xuICAgICAgaWYgKHNbaV0pIHNbaV0gKz0gYnM7IC8vIGNvYWxlc2NlIHdpdGggcHJldmlvdXMgc3RyaW5nXG4gICAgICBlbHNlIHNbKytpXSA9IGJzO1xuICAgIH1cbiAgICBpZiAoKGFtID0gYW1bMF0pID09PSAoYm0gPSBibVswXSkpIHsgLy8gbnVtYmVycyBpbiBhICYgYiBtYXRjaFxuICAgICAgaWYgKHNbaV0pIHNbaV0gKz0gYm07IC8vIGNvYWxlc2NlIHdpdGggcHJldmlvdXMgc3RyaW5nXG4gICAgICBlbHNlIHNbKytpXSA9IGJtO1xuICAgIH0gZWxzZSB7IC8vIGludGVycG9sYXRlIG5vbi1tYXRjaGluZyBudW1iZXJzXG4gICAgICBzWysraV0gPSBudWxsO1xuICAgICAgcS5wdXNoKHtpOiBpLCB4OiBudW1iZXIoYW0sIGJtKX0pO1xuICAgIH1cbiAgICBiaSA9IHJlQi5sYXN0SW5kZXg7XG4gIH1cblxuICAvLyBBZGQgcmVtYWlucyBvZiBiLlxuICBpZiAoYmkgPCBiLmxlbmd0aCkge1xuICAgIGJzID0gYi5zbGljZShiaSk7XG4gICAgaWYgKHNbaV0pIHNbaV0gKz0gYnM7IC8vIGNvYWxlc2NlIHdpdGggcHJldmlvdXMgc3RyaW5nXG4gICAgZWxzZSBzWysraV0gPSBicztcbiAgfVxuXG4gIC8vIFNwZWNpYWwgb3B0aW1pemF0aW9uIGZvciBvbmx5IGEgc2luZ2xlIG1hdGNoLlxuICAvLyBPdGhlcndpc2UsIGludGVycG9sYXRlIGVhY2ggb2YgdGhlIG51bWJlcnMgYW5kIHJlam9pbiB0aGUgc3RyaW5nLlxuICByZXR1cm4gcy5sZW5ndGggPCAyID8gKHFbMF1cbiAgICAgID8gb25lKHFbMF0ueClcbiAgICAgIDogemVybyhiKSlcbiAgICAgIDogKGIgPSBxLmxlbmd0aCwgZnVuY3Rpb24odCkge1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBvOyBpIDwgYjsgKytpKSBzWyhvID0gcVtpXSkuaV0gPSBvLngodCk7XG4gICAgICAgICAgcmV0dXJuIHMuam9pbihcIlwiKTtcbiAgICAgICAgfSk7XG59XG4iLCAiaW1wb3J0IHtjb2xvcn0gZnJvbSBcImQzLWNvbG9yXCI7XG5pbXBvcnQgcmdiIGZyb20gXCIuL3JnYi5qc1wiO1xuaW1wb3J0IHtnZW5lcmljQXJyYXl9IGZyb20gXCIuL2FycmF5LmpzXCI7XG5pbXBvcnQgZGF0ZSBmcm9tIFwiLi9kYXRlLmpzXCI7XG5pbXBvcnQgbnVtYmVyIGZyb20gXCIuL251bWJlci5qc1wiO1xuaW1wb3J0IG9iamVjdCBmcm9tIFwiLi9vYmplY3QuanNcIjtcbmltcG9ydCBzdHJpbmcgZnJvbSBcIi4vc3RyaW5nLmpzXCI7XG5pbXBvcnQgY29uc3RhbnQgZnJvbSBcIi4vY29uc3RhbnQuanNcIjtcbmltcG9ydCBudW1iZXJBcnJheSwge2lzTnVtYmVyQXJyYXl9IGZyb20gXCIuL251bWJlckFycmF5LmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGEsIGIpIHtcbiAgdmFyIHQgPSB0eXBlb2YgYiwgYztcbiAgcmV0dXJuIGIgPT0gbnVsbCB8fCB0ID09PSBcImJvb2xlYW5cIiA/IGNvbnN0YW50KGIpXG4gICAgICA6ICh0ID09PSBcIm51bWJlclwiID8gbnVtYmVyXG4gICAgICA6IHQgPT09IFwic3RyaW5nXCIgPyAoKGMgPSBjb2xvcihiKSkgPyAoYiA9IGMsIHJnYikgOiBzdHJpbmcpXG4gICAgICA6IGIgaW5zdGFuY2VvZiBjb2xvciA/IHJnYlxuICAgICAgOiBiIGluc3RhbmNlb2YgRGF0ZSA/IGRhdGVcbiAgICAgIDogaXNOdW1iZXJBcnJheShiKSA/IG51bWJlckFycmF5XG4gICAgICA6IEFycmF5LmlzQXJyYXkoYikgPyBnZW5lcmljQXJyYXlcbiAgICAgIDogdHlwZW9mIGIudmFsdWVPZiAhPT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBiLnRvU3RyaW5nICE9PSBcImZ1bmN0aW9uXCIgfHwgaXNOYU4oYikgPyBvYmplY3RcbiAgICAgIDogbnVtYmVyKShhLCBiKTtcbn1cbiIsICJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihhLCBiKSB7XG4gIHJldHVybiBhID0gK2EsIGIgPSArYiwgZnVuY3Rpb24odCkge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKGEgKiAoMSAtIHQpICsgYiAqIHQpO1xuICB9O1xufVxuIiwgInZhciBkZWdyZWVzID0gMTgwIC8gTWF0aC5QSTtcblxuZXhwb3J0IHZhciBpZGVudGl0eSA9IHtcbiAgdHJhbnNsYXRlWDogMCxcbiAgdHJhbnNsYXRlWTogMCxcbiAgcm90YXRlOiAwLFxuICBza2V3WDogMCxcbiAgc2NhbGVYOiAxLFxuICBzY2FsZVk6IDFcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGEsIGIsIGMsIGQsIGUsIGYpIHtcbiAgdmFyIHNjYWxlWCwgc2NhbGVZLCBza2V3WDtcbiAgaWYgKHNjYWxlWCA9IE1hdGguc3FydChhICogYSArIGIgKiBiKSkgYSAvPSBzY2FsZVgsIGIgLz0gc2NhbGVYO1xuICBpZiAoc2tld1ggPSBhICogYyArIGIgKiBkKSBjIC09IGEgKiBza2V3WCwgZCAtPSBiICogc2tld1g7XG4gIGlmIChzY2FsZVkgPSBNYXRoLnNxcnQoYyAqIGMgKyBkICogZCkpIGMgLz0gc2NhbGVZLCBkIC89IHNjYWxlWSwgc2tld1ggLz0gc2NhbGVZO1xuICBpZiAoYSAqIGQgPCBiICogYykgYSA9IC1hLCBiID0gLWIsIHNrZXdYID0gLXNrZXdYLCBzY2FsZVggPSAtc2NhbGVYO1xuICByZXR1cm4ge1xuICAgIHRyYW5zbGF0ZVg6IGUsXG4gICAgdHJhbnNsYXRlWTogZixcbiAgICByb3RhdGU6IE1hdGguYXRhbjIoYiwgYSkgKiBkZWdyZWVzLFxuICAgIHNrZXdYOiBNYXRoLmF0YW4oc2tld1gpICogZGVncmVlcyxcbiAgICBzY2FsZVg6IHNjYWxlWCxcbiAgICBzY2FsZVk6IHNjYWxlWVxuICB9O1xufVxuIiwgImltcG9ydCBkZWNvbXBvc2UsIHtpZGVudGl0eX0gZnJvbSBcIi4vZGVjb21wb3NlLmpzXCI7XG5cbnZhciBzdmdOb2RlO1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlZiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlQ3NzKHZhbHVlKSB7XG4gIGNvbnN0IG0gPSBuZXcgKHR5cGVvZiBET01NYXRyaXggPT09IFwiZnVuY3Rpb25cIiA/IERPTU1hdHJpeCA6IFdlYktpdENTU01hdHJpeCkodmFsdWUgKyBcIlwiKTtcbiAgcmV0dXJuIG0uaXNJZGVudGl0eSA/IGlkZW50aXR5IDogZGVjb21wb3NlKG0uYSwgbS5iLCBtLmMsIG0uZCwgbS5lLCBtLmYpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VTdmcodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHJldHVybiBpZGVudGl0eTtcbiAgaWYgKCFzdmdOb2RlKSBzdmdOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXCJnXCIpO1xuICBzdmdOb2RlLnNldEF0dHJpYnV0ZShcInRyYW5zZm9ybVwiLCB2YWx1ZSk7XG4gIGlmICghKHZhbHVlID0gc3ZnTm9kZS50cmFuc2Zvcm0uYmFzZVZhbC5jb25zb2xpZGF0ZSgpKSkgcmV0dXJuIGlkZW50aXR5O1xuICB2YWx1ZSA9IHZhbHVlLm1hdHJpeDtcbiAgcmV0dXJuIGRlY29tcG9zZSh2YWx1ZS5hLCB2YWx1ZS5iLCB2YWx1ZS5jLCB2YWx1ZS5kLCB2YWx1ZS5lLCB2YWx1ZS5mKTtcbn1cbiIsICJpbXBvcnQgbnVtYmVyIGZyb20gXCIuLi9udW1iZXIuanNcIjtcbmltcG9ydCB7cGFyc2VDc3MsIHBhcnNlU3ZnfSBmcm9tIFwiLi9wYXJzZS5qc1wiO1xuXG5mdW5jdGlvbiBpbnRlcnBvbGF0ZVRyYW5zZm9ybShwYXJzZSwgcHhDb21tYSwgcHhQYXJlbiwgZGVnUGFyZW4pIHtcblxuICBmdW5jdGlvbiBwb3Aocykge1xuICAgIHJldHVybiBzLmxlbmd0aCA/IHMucG9wKCkgKyBcIiBcIiA6IFwiXCI7XG4gIH1cblxuICBmdW5jdGlvbiB0cmFuc2xhdGUoeGEsIHlhLCB4YiwgeWIsIHMsIHEpIHtcbiAgICBpZiAoeGEgIT09IHhiIHx8IHlhICE9PSB5Yikge1xuICAgICAgdmFyIGkgPSBzLnB1c2goXCJ0cmFuc2xhdGUoXCIsIG51bGwsIHB4Q29tbWEsIG51bGwsIHB4UGFyZW4pO1xuICAgICAgcS5wdXNoKHtpOiBpIC0gNCwgeDogbnVtYmVyKHhhLCB4Yil9LCB7aTogaSAtIDIsIHg6IG51bWJlcih5YSwgeWIpfSk7XG4gICAgfSBlbHNlIGlmICh4YiB8fCB5Yikge1xuICAgICAgcy5wdXNoKFwidHJhbnNsYXRlKFwiICsgeGIgKyBweENvbW1hICsgeWIgKyBweFBhcmVuKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByb3RhdGUoYSwgYiwgcywgcSkge1xuICAgIGlmIChhICE9PSBiKSB7XG4gICAgICBpZiAoYSAtIGIgPiAxODApIGIgKz0gMzYwOyBlbHNlIGlmIChiIC0gYSA+IDE4MCkgYSArPSAzNjA7IC8vIHNob3J0ZXN0IHBhdGhcbiAgICAgIHEucHVzaCh7aTogcy5wdXNoKHBvcChzKSArIFwicm90YXRlKFwiLCBudWxsLCBkZWdQYXJlbikgLSAyLCB4OiBudW1iZXIoYSwgYil9KTtcbiAgICB9IGVsc2UgaWYgKGIpIHtcbiAgICAgIHMucHVzaChwb3AocykgKyBcInJvdGF0ZShcIiArIGIgKyBkZWdQYXJlbik7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2tld1goYSwgYiwgcywgcSkge1xuICAgIGlmIChhICE9PSBiKSB7XG4gICAgICBxLnB1c2goe2k6IHMucHVzaChwb3AocykgKyBcInNrZXdYKFwiLCBudWxsLCBkZWdQYXJlbikgLSAyLCB4OiBudW1iZXIoYSwgYil9KTtcbiAgICB9IGVsc2UgaWYgKGIpIHtcbiAgICAgIHMucHVzaChwb3AocykgKyBcInNrZXdYKFwiICsgYiArIGRlZ1BhcmVuKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzY2FsZSh4YSwgeWEsIHhiLCB5YiwgcywgcSkge1xuICAgIGlmICh4YSAhPT0geGIgfHwgeWEgIT09IHliKSB7XG4gICAgICB2YXIgaSA9IHMucHVzaChwb3AocykgKyBcInNjYWxlKFwiLCBudWxsLCBcIixcIiwgbnVsbCwgXCIpXCIpO1xuICAgICAgcS5wdXNoKHtpOiBpIC0gNCwgeDogbnVtYmVyKHhhLCB4Yil9LCB7aTogaSAtIDIsIHg6IG51bWJlcih5YSwgeWIpfSk7XG4gICAgfSBlbHNlIGlmICh4YiAhPT0gMSB8fCB5YiAhPT0gMSkge1xuICAgICAgcy5wdXNoKHBvcChzKSArIFwic2NhbGUoXCIgKyB4YiArIFwiLFwiICsgeWIgKyBcIilcIik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKGEsIGIpIHtcbiAgICB2YXIgcyA9IFtdLCAvLyBzdHJpbmcgY29uc3RhbnRzIGFuZCBwbGFjZWhvbGRlcnNcbiAgICAgICAgcSA9IFtdOyAvLyBudW1iZXIgaW50ZXJwb2xhdG9yc1xuICAgIGEgPSBwYXJzZShhKSwgYiA9IHBhcnNlKGIpO1xuICAgIHRyYW5zbGF0ZShhLnRyYW5zbGF0ZVgsIGEudHJhbnNsYXRlWSwgYi50cmFuc2xhdGVYLCBiLnRyYW5zbGF0ZVksIHMsIHEpO1xuICAgIHJvdGF0ZShhLnJvdGF0ZSwgYi5yb3RhdGUsIHMsIHEpO1xuICAgIHNrZXdYKGEuc2tld1gsIGIuc2tld1gsIHMsIHEpO1xuICAgIHNjYWxlKGEuc2NhbGVYLCBhLnNjYWxlWSwgYi5zY2FsZVgsIGIuc2NhbGVZLCBzLCBxKTtcbiAgICBhID0gYiA9IG51bGw7IC8vIGdjXG4gICAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICAgIHZhciBpID0gLTEsIG4gPSBxLmxlbmd0aCwgbztcbiAgICAgIHdoaWxlICgrK2kgPCBuKSBzWyhvID0gcVtpXSkuaV0gPSBvLngodCk7XG4gICAgICByZXR1cm4gcy5qb2luKFwiXCIpO1xuICAgIH07XG4gIH07XG59XG5cbmV4cG9ydCB2YXIgaW50ZXJwb2xhdGVUcmFuc2Zvcm1Dc3MgPSBpbnRlcnBvbGF0ZVRyYW5zZm9ybShwYXJzZUNzcywgXCJweCwgXCIsIFwicHgpXCIsIFwiZGVnKVwiKTtcbmV4cG9ydCB2YXIgaW50ZXJwb2xhdGVUcmFuc2Zvcm1TdmcgPSBpbnRlcnBvbGF0ZVRyYW5zZm9ybShwYXJzZVN2ZywgXCIsIFwiLCBcIilcIiwgXCIpXCIpO1xuIiwgInZhciBmcmFtZSA9IDAsIC8vIGlzIGFuIGFuaW1hdGlvbiBmcmFtZSBwZW5kaW5nP1xuICAgIHRpbWVvdXQgPSAwLCAvLyBpcyBhIHRpbWVvdXQgcGVuZGluZz9cbiAgICBpbnRlcnZhbCA9IDAsIC8vIGFyZSBhbnkgdGltZXJzIGFjdGl2ZT9cbiAgICBwb2tlRGVsYXkgPSAxMDAwLCAvLyBob3cgZnJlcXVlbnRseSB3ZSBjaGVjayBmb3IgY2xvY2sgc2tld1xuICAgIHRhc2tIZWFkLFxuICAgIHRhc2tUYWlsLFxuICAgIGNsb2NrTGFzdCA9IDAsXG4gICAgY2xvY2tOb3cgPSAwLFxuICAgIGNsb2NrU2tldyA9IDAsXG4gICAgY2xvY2sgPSB0eXBlb2YgcGVyZm9ybWFuY2UgPT09IFwib2JqZWN0XCIgJiYgcGVyZm9ybWFuY2Uubm93ID8gcGVyZm9ybWFuY2UgOiBEYXRlLFxuICAgIHNldEZyYW1lID0gdHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIiAmJiB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lID8gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZS5iaW5kKHdpbmRvdykgOiBmdW5jdGlvbihmKSB7IHNldFRpbWVvdXQoZiwgMTcpOyB9O1xuXG5leHBvcnQgZnVuY3Rpb24gbm93KCkge1xuICByZXR1cm4gY2xvY2tOb3cgfHwgKHNldEZyYW1lKGNsZWFyTm93KSwgY2xvY2tOb3cgPSBjbG9jay5ub3coKSArIGNsb2NrU2tldyk7XG59XG5cbmZ1bmN0aW9uIGNsZWFyTm93KCkge1xuICBjbG9ja05vdyA9IDA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBUaW1lcigpIHtcbiAgdGhpcy5fY2FsbCA9XG4gIHRoaXMuX3RpbWUgPVxuICB0aGlzLl9uZXh0ID0gbnVsbDtcbn1cblxuVGltZXIucHJvdG90eXBlID0gdGltZXIucHJvdG90eXBlID0ge1xuICBjb25zdHJ1Y3RvcjogVGltZXIsXG4gIHJlc3RhcnQ6IGZ1bmN0aW9uKGNhbGxiYWNrLCBkZWxheSwgdGltZSkge1xuICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcImNhbGxiYWNrIGlzIG5vdCBhIGZ1bmN0aW9uXCIpO1xuICAgIHRpbWUgPSAodGltZSA9PSBudWxsID8gbm93KCkgOiArdGltZSkgKyAoZGVsYXkgPT0gbnVsbCA/IDAgOiArZGVsYXkpO1xuICAgIGlmICghdGhpcy5fbmV4dCAmJiB0YXNrVGFpbCAhPT0gdGhpcykge1xuICAgICAgaWYgKHRhc2tUYWlsKSB0YXNrVGFpbC5fbmV4dCA9IHRoaXM7XG4gICAgICBlbHNlIHRhc2tIZWFkID0gdGhpcztcbiAgICAgIHRhc2tUYWlsID0gdGhpcztcbiAgICB9XG4gICAgdGhpcy5fY2FsbCA9IGNhbGxiYWNrO1xuICAgIHRoaXMuX3RpbWUgPSB0aW1lO1xuICAgIHNsZWVwKCk7XG4gIH0sXG4gIHN0b3A6IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLl9jYWxsKSB7XG4gICAgICB0aGlzLl9jYWxsID0gbnVsbDtcbiAgICAgIHRoaXMuX3RpbWUgPSBJbmZpbml0eTtcbiAgICAgIHNsZWVwKCk7XG4gICAgfVxuICB9XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gdGltZXIoY2FsbGJhY2ssIGRlbGF5LCB0aW1lKSB7XG4gIHZhciB0ID0gbmV3IFRpbWVyO1xuICB0LnJlc3RhcnQoY2FsbGJhY2ssIGRlbGF5LCB0aW1lKTtcbiAgcmV0dXJuIHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0aW1lckZsdXNoKCkge1xuICBub3coKTsgLy8gR2V0IHRoZSBjdXJyZW50IHRpbWUsIGlmIG5vdCBhbHJlYWR5IHNldC5cbiAgKytmcmFtZTsgLy8gUHJldGVuZCB3ZVx1MjAxOXZlIHNldCBhbiBhbGFybSwgaWYgd2UgaGF2ZW5cdTIwMTl0IGFscmVhZHkuXG4gIHZhciB0ID0gdGFza0hlYWQsIGU7XG4gIHdoaWxlICh0KSB7XG4gICAgaWYgKChlID0gY2xvY2tOb3cgLSB0Ll90aW1lKSA+PSAwKSB0Ll9jYWxsLmNhbGwodW5kZWZpbmVkLCBlKTtcbiAgICB0ID0gdC5fbmV4dDtcbiAgfVxuICAtLWZyYW1lO1xufVxuXG5mdW5jdGlvbiB3YWtlKCkge1xuICBjbG9ja05vdyA9IChjbG9ja0xhc3QgPSBjbG9jay5ub3coKSkgKyBjbG9ja1NrZXc7XG4gIGZyYW1lID0gdGltZW91dCA9IDA7XG4gIHRyeSB7XG4gICAgdGltZXJGbHVzaCgpO1xuICB9IGZpbmFsbHkge1xuICAgIGZyYW1lID0gMDtcbiAgICBuYXAoKTtcbiAgICBjbG9ja05vdyA9IDA7XG4gIH1cbn1cblxuZnVuY3Rpb24gcG9rZSgpIHtcbiAgdmFyIG5vdyA9IGNsb2NrLm5vdygpLCBkZWxheSA9IG5vdyAtIGNsb2NrTGFzdDtcbiAgaWYgKGRlbGF5ID4gcG9rZURlbGF5KSBjbG9ja1NrZXcgLT0gZGVsYXksIGNsb2NrTGFzdCA9IG5vdztcbn1cblxuZnVuY3Rpb24gbmFwKCkge1xuICB2YXIgdDAsIHQxID0gdGFza0hlYWQsIHQyLCB0aW1lID0gSW5maW5pdHk7XG4gIHdoaWxlICh0MSkge1xuICAgIGlmICh0MS5fY2FsbCkge1xuICAgICAgaWYgKHRpbWUgPiB0MS5fdGltZSkgdGltZSA9IHQxLl90aW1lO1xuICAgICAgdDAgPSB0MSwgdDEgPSB0MS5fbmV4dDtcbiAgICB9IGVsc2Uge1xuICAgICAgdDIgPSB0MS5fbmV4dCwgdDEuX25leHQgPSBudWxsO1xuICAgICAgdDEgPSB0MCA/IHQwLl9uZXh0ID0gdDIgOiB0YXNrSGVhZCA9IHQyO1xuICAgIH1cbiAgfVxuICB0YXNrVGFpbCA9IHQwO1xuICBzbGVlcCh0aW1lKTtcbn1cblxuZnVuY3Rpb24gc2xlZXAodGltZSkge1xuICBpZiAoZnJhbWUpIHJldHVybjsgLy8gU29vbmVzdCBhbGFybSBhbHJlYWR5IHNldCwgb3Igd2lsbCBiZS5cbiAgaWYgKHRpbWVvdXQpIHRpbWVvdXQgPSBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gIHZhciBkZWxheSA9IHRpbWUgLSBjbG9ja05vdzsgLy8gU3RyaWN0bHkgbGVzcyB0aGFuIGlmIHdlIHJlY29tcHV0ZWQgY2xvY2tOb3cuXG4gIGlmIChkZWxheSA+IDI0KSB7XG4gICAgaWYgKHRpbWUgPCBJbmZpbml0eSkgdGltZW91dCA9IHNldFRpbWVvdXQod2FrZSwgdGltZSAtIGNsb2NrLm5vdygpIC0gY2xvY2tTa2V3KTtcbiAgICBpZiAoaW50ZXJ2YWwpIGludGVydmFsID0gY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKCFpbnRlcnZhbCkgY2xvY2tMYXN0ID0gY2xvY2subm93KCksIGludGVydmFsID0gc2V0SW50ZXJ2YWwocG9rZSwgcG9rZURlbGF5KTtcbiAgICBmcmFtZSA9IDEsIHNldEZyYW1lKHdha2UpO1xuICB9XG59XG4iLCAiaW1wb3J0IHtUaW1lcn0gZnJvbSBcIi4vdGltZXIuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oY2FsbGJhY2ssIGRlbGF5LCB0aW1lKSB7XG4gIHZhciB0ID0gbmV3IFRpbWVyO1xuICBkZWxheSA9IGRlbGF5ID09IG51bGwgPyAwIDogK2RlbGF5O1xuICB0LnJlc3RhcnQoZWxhcHNlZCA9PiB7XG4gICAgdC5zdG9wKCk7XG4gICAgY2FsbGJhY2soZWxhcHNlZCArIGRlbGF5KTtcbiAgfSwgZGVsYXksIHRpbWUpO1xuICByZXR1cm4gdDtcbn1cbiIsICJpbXBvcnQge2Rpc3BhdGNofSBmcm9tIFwiZDMtZGlzcGF0Y2hcIjtcbmltcG9ydCB7dGltZXIsIHRpbWVvdXR9IGZyb20gXCJkMy10aW1lclwiO1xuXG52YXIgZW1wdHlPbiA9IGRpc3BhdGNoKFwic3RhcnRcIiwgXCJlbmRcIiwgXCJjYW5jZWxcIiwgXCJpbnRlcnJ1cHRcIik7XG52YXIgZW1wdHlUd2VlbiA9IFtdO1xuXG5leHBvcnQgdmFyIENSRUFURUQgPSAwO1xuZXhwb3J0IHZhciBTQ0hFRFVMRUQgPSAxO1xuZXhwb3J0IHZhciBTVEFSVElORyA9IDI7XG5leHBvcnQgdmFyIFNUQVJURUQgPSAzO1xuZXhwb3J0IHZhciBSVU5OSU5HID0gNDtcbmV4cG9ydCB2YXIgRU5ESU5HID0gNTtcbmV4cG9ydCB2YXIgRU5ERUQgPSA2O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihub2RlLCBuYW1lLCBpZCwgaW5kZXgsIGdyb3VwLCB0aW1pbmcpIHtcbiAgdmFyIHNjaGVkdWxlcyA9IG5vZGUuX190cmFuc2l0aW9uO1xuICBpZiAoIXNjaGVkdWxlcykgbm9kZS5fX3RyYW5zaXRpb24gPSB7fTtcbiAgZWxzZSBpZiAoaWQgaW4gc2NoZWR1bGVzKSByZXR1cm47XG4gIGNyZWF0ZShub2RlLCBpZCwge1xuICAgIG5hbWU6IG5hbWUsXG4gICAgaW5kZXg6IGluZGV4LCAvLyBGb3IgY29udGV4dCBkdXJpbmcgY2FsbGJhY2suXG4gICAgZ3JvdXA6IGdyb3VwLCAvLyBGb3IgY29udGV4dCBkdXJpbmcgY2FsbGJhY2suXG4gICAgb246IGVtcHR5T24sXG4gICAgdHdlZW46IGVtcHR5VHdlZW4sXG4gICAgdGltZTogdGltaW5nLnRpbWUsXG4gICAgZGVsYXk6IHRpbWluZy5kZWxheSxcbiAgICBkdXJhdGlvbjogdGltaW5nLmR1cmF0aW9uLFxuICAgIGVhc2U6IHRpbWluZy5lYXNlLFxuICAgIHRpbWVyOiBudWxsLFxuICAgIHN0YXRlOiBDUkVBVEVEXG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5pdChub2RlLCBpZCkge1xuICB2YXIgc2NoZWR1bGUgPSBnZXQobm9kZSwgaWQpO1xuICBpZiAoc2NoZWR1bGUuc3RhdGUgPiBDUkVBVEVEKSB0aHJvdyBuZXcgRXJyb3IoXCJ0b28gbGF0ZTsgYWxyZWFkeSBzY2hlZHVsZWRcIik7XG4gIHJldHVybiBzY2hlZHVsZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldChub2RlLCBpZCkge1xuICB2YXIgc2NoZWR1bGUgPSBnZXQobm9kZSwgaWQpO1xuICBpZiAoc2NoZWR1bGUuc3RhdGUgPiBTVEFSVEVEKSB0aHJvdyBuZXcgRXJyb3IoXCJ0b28gbGF0ZTsgYWxyZWFkeSBydW5uaW5nXCIpO1xuICByZXR1cm4gc2NoZWR1bGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXQobm9kZSwgaWQpIHtcbiAgdmFyIHNjaGVkdWxlID0gbm9kZS5fX3RyYW5zaXRpb247XG4gIGlmICghc2NoZWR1bGUgfHwgIShzY2hlZHVsZSA9IHNjaGVkdWxlW2lkXSkpIHRocm93IG5ldyBFcnJvcihcInRyYW5zaXRpb24gbm90IGZvdW5kXCIpO1xuICByZXR1cm4gc2NoZWR1bGU7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZShub2RlLCBpZCwgc2VsZikge1xuICB2YXIgc2NoZWR1bGVzID0gbm9kZS5fX3RyYW5zaXRpb24sXG4gICAgICB0d2VlbjtcblxuICAvLyBJbml0aWFsaXplIHRoZSBzZWxmIHRpbWVyIHdoZW4gdGhlIHRyYW5zaXRpb24gaXMgY3JlYXRlZC5cbiAgLy8gTm90ZSB0aGUgYWN0dWFsIGRlbGF5IGlzIG5vdCBrbm93biB1bnRpbCB0aGUgZmlyc3QgY2FsbGJhY2shXG4gIHNjaGVkdWxlc1tpZF0gPSBzZWxmO1xuICBzZWxmLnRpbWVyID0gdGltZXIoc2NoZWR1bGUsIDAsIHNlbGYudGltZSk7XG5cbiAgZnVuY3Rpb24gc2NoZWR1bGUoZWxhcHNlZCkge1xuICAgIHNlbGYuc3RhdGUgPSBTQ0hFRFVMRUQ7XG4gICAgc2VsZi50aW1lci5yZXN0YXJ0KHN0YXJ0LCBzZWxmLmRlbGF5LCBzZWxmLnRpbWUpO1xuXG4gICAgLy8gSWYgdGhlIGVsYXBzZWQgZGVsYXkgaXMgbGVzcyB0aGFuIG91ciBmaXJzdCBzbGVlcCwgc3RhcnQgaW1tZWRpYXRlbHkuXG4gICAgaWYgKHNlbGYuZGVsYXkgPD0gZWxhcHNlZCkgc3RhcnQoZWxhcHNlZCAtIHNlbGYuZGVsYXkpO1xuICB9XG5cbiAgZnVuY3Rpb24gc3RhcnQoZWxhcHNlZCkge1xuICAgIHZhciBpLCBqLCBuLCBvO1xuXG4gICAgLy8gSWYgdGhlIHN0YXRlIGlzIG5vdCBTQ0hFRFVMRUQsIHRoZW4gd2UgcHJldmlvdXNseSBlcnJvcmVkIG9uIHN0YXJ0LlxuICAgIGlmIChzZWxmLnN0YXRlICE9PSBTQ0hFRFVMRUQpIHJldHVybiBzdG9wKCk7XG5cbiAgICBmb3IgKGkgaW4gc2NoZWR1bGVzKSB7XG4gICAgICBvID0gc2NoZWR1bGVzW2ldO1xuICAgICAgaWYgKG8ubmFtZSAhPT0gc2VsZi5uYW1lKSBjb250aW51ZTtcblxuICAgICAgLy8gV2hpbGUgdGhpcyBlbGVtZW50IGFscmVhZHkgaGFzIGEgc3RhcnRpbmcgdHJhbnNpdGlvbiBkdXJpbmcgdGhpcyBmcmFtZSxcbiAgICAgIC8vIGRlZmVyIHN0YXJ0aW5nIGFuIGludGVycnVwdGluZyB0cmFuc2l0aW9uIHVudGlsIHRoYXQgdHJhbnNpdGlvbiBoYXMgYVxuICAgICAgLy8gY2hhbmNlIHRvIHRpY2sgKGFuZCBwb3NzaWJseSBlbmQpOyBzZWUgZDMvZDMtdHJhbnNpdGlvbiM1NCFcbiAgICAgIGlmIChvLnN0YXRlID09PSBTVEFSVEVEKSByZXR1cm4gdGltZW91dChzdGFydCk7XG5cbiAgICAgIC8vIEludGVycnVwdCB0aGUgYWN0aXZlIHRyYW5zaXRpb24sIGlmIGFueS5cbiAgICAgIGlmIChvLnN0YXRlID09PSBSVU5OSU5HKSB7XG4gICAgICAgIG8uc3RhdGUgPSBFTkRFRDtcbiAgICAgICAgby50aW1lci5zdG9wKCk7XG4gICAgICAgIG8ub24uY2FsbChcImludGVycnVwdFwiLCBub2RlLCBub2RlLl9fZGF0YV9fLCBvLmluZGV4LCBvLmdyb3VwKTtcbiAgICAgICAgZGVsZXRlIHNjaGVkdWxlc1tpXTtcbiAgICAgIH1cblxuICAgICAgLy8gQ2FuY2VsIGFueSBwcmUtZW1wdGVkIHRyYW5zaXRpb25zLlxuICAgICAgZWxzZSBpZiAoK2kgPCBpZCkge1xuICAgICAgICBvLnN0YXRlID0gRU5ERUQ7XG4gICAgICAgIG8udGltZXIuc3RvcCgpO1xuICAgICAgICBvLm9uLmNhbGwoXCJjYW5jZWxcIiwgbm9kZSwgbm9kZS5fX2RhdGFfXywgby5pbmRleCwgby5ncm91cCk7XG4gICAgICAgIGRlbGV0ZSBzY2hlZHVsZXNbaV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gRGVmZXIgdGhlIGZpcnN0IHRpY2sgdG8gZW5kIG9mIHRoZSBjdXJyZW50IGZyYW1lOyBzZWUgZDMvZDMjMTU3Ni5cbiAgICAvLyBOb3RlIHRoZSB0cmFuc2l0aW9uIG1heSBiZSBjYW5jZWxlZCBhZnRlciBzdGFydCBhbmQgYmVmb3JlIHRoZSBmaXJzdCB0aWNrIVxuICAgIC8vIE5vdGUgdGhpcyBtdXN0IGJlIHNjaGVkdWxlZCBiZWZvcmUgdGhlIHN0YXJ0IGV2ZW50OyBzZWUgZDMvZDMtdHJhbnNpdGlvbiMxNiFcbiAgICAvLyBBc3N1bWluZyB0aGlzIGlzIHN1Y2Nlc3NmdWwsIHN1YnNlcXVlbnQgY2FsbGJhY2tzIGdvIHN0cmFpZ2h0IHRvIHRpY2suXG4gICAgdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgIGlmIChzZWxmLnN0YXRlID09PSBTVEFSVEVEKSB7XG4gICAgICAgIHNlbGYuc3RhdGUgPSBSVU5OSU5HO1xuICAgICAgICBzZWxmLnRpbWVyLnJlc3RhcnQodGljaywgc2VsZi5kZWxheSwgc2VsZi50aW1lKTtcbiAgICAgICAgdGljayhlbGFwc2VkKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIERpc3BhdGNoIHRoZSBzdGFydCBldmVudC5cbiAgICAvLyBOb3RlIHRoaXMgbXVzdCBiZSBkb25lIGJlZm9yZSB0aGUgdHdlZW4gYXJlIGluaXRpYWxpemVkLlxuICAgIHNlbGYuc3RhdGUgPSBTVEFSVElORztcbiAgICBzZWxmLm9uLmNhbGwoXCJzdGFydFwiLCBub2RlLCBub2RlLl9fZGF0YV9fLCBzZWxmLmluZGV4LCBzZWxmLmdyb3VwKTtcbiAgICBpZiAoc2VsZi5zdGF0ZSAhPT0gU1RBUlRJTkcpIHJldHVybjsgLy8gaW50ZXJydXB0ZWRcbiAgICBzZWxmLnN0YXRlID0gU1RBUlRFRDtcblxuICAgIC8vIEluaXRpYWxpemUgdGhlIHR3ZWVuLCBkZWxldGluZyBudWxsIHR3ZWVuLlxuICAgIHR3ZWVuID0gbmV3IEFycmF5KG4gPSBzZWxmLnR3ZWVuLmxlbmd0aCk7XG4gICAgZm9yIChpID0gMCwgaiA9IC0xOyBpIDwgbjsgKytpKSB7XG4gICAgICBpZiAobyA9IHNlbGYudHdlZW5baV0udmFsdWUuY2FsbChub2RlLCBub2RlLl9fZGF0YV9fLCBzZWxmLmluZGV4LCBzZWxmLmdyb3VwKSkge1xuICAgICAgICB0d2VlblsrK2pdID0gbztcbiAgICAgIH1cbiAgICB9XG4gICAgdHdlZW4ubGVuZ3RoID0gaiArIDE7XG4gIH1cblxuICBmdW5jdGlvbiB0aWNrKGVsYXBzZWQpIHtcbiAgICB2YXIgdCA9IGVsYXBzZWQgPCBzZWxmLmR1cmF0aW9uID8gc2VsZi5lYXNlLmNhbGwobnVsbCwgZWxhcHNlZCAvIHNlbGYuZHVyYXRpb24pIDogKHNlbGYudGltZXIucmVzdGFydChzdG9wKSwgc2VsZi5zdGF0ZSA9IEVORElORywgMSksXG4gICAgICAgIGkgPSAtMSxcbiAgICAgICAgbiA9IHR3ZWVuLmxlbmd0aDtcblxuICAgIHdoaWxlICgrK2kgPCBuKSB7XG4gICAgICB0d2VlbltpXS5jYWxsKG5vZGUsIHQpO1xuICAgIH1cblxuICAgIC8vIERpc3BhdGNoIHRoZSBlbmQgZXZlbnQuXG4gICAgaWYgKHNlbGYuc3RhdGUgPT09IEVORElORykge1xuICAgICAgc2VsZi5vbi5jYWxsKFwiZW5kXCIsIG5vZGUsIG5vZGUuX19kYXRhX18sIHNlbGYuaW5kZXgsIHNlbGYuZ3JvdXApO1xuICAgICAgc3RvcCgpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHN0b3AoKSB7XG4gICAgc2VsZi5zdGF0ZSA9IEVOREVEO1xuICAgIHNlbGYudGltZXIuc3RvcCgpO1xuICAgIGRlbGV0ZSBzY2hlZHVsZXNbaWRdO1xuICAgIGZvciAodmFyIGkgaW4gc2NoZWR1bGVzKSByZXR1cm47IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICBkZWxldGUgbm9kZS5fX3RyYW5zaXRpb247XG4gIH1cbn1cbiIsICJpbXBvcnQge1NUQVJUSU5HLCBFTkRJTkcsIEVOREVEfSBmcm9tIFwiLi90cmFuc2l0aW9uL3NjaGVkdWxlLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG5vZGUsIG5hbWUpIHtcbiAgdmFyIHNjaGVkdWxlcyA9IG5vZGUuX190cmFuc2l0aW9uLFxuICAgICAgc2NoZWR1bGUsXG4gICAgICBhY3RpdmUsXG4gICAgICBlbXB0eSA9IHRydWUsXG4gICAgICBpO1xuXG4gIGlmICghc2NoZWR1bGVzKSByZXR1cm47XG5cbiAgbmFtZSA9IG5hbWUgPT0gbnVsbCA/IG51bGwgOiBuYW1lICsgXCJcIjtcblxuICBmb3IgKGkgaW4gc2NoZWR1bGVzKSB7XG4gICAgaWYgKChzY2hlZHVsZSA9IHNjaGVkdWxlc1tpXSkubmFtZSAhPT0gbmFtZSkgeyBlbXB0eSA9IGZhbHNlOyBjb250aW51ZTsgfVxuICAgIGFjdGl2ZSA9IHNjaGVkdWxlLnN0YXRlID4gU1RBUlRJTkcgJiYgc2NoZWR1bGUuc3RhdGUgPCBFTkRJTkc7XG4gICAgc2NoZWR1bGUuc3RhdGUgPSBFTkRFRDtcbiAgICBzY2hlZHVsZS50aW1lci5zdG9wKCk7XG4gICAgc2NoZWR1bGUub24uY2FsbChhY3RpdmUgPyBcImludGVycnVwdFwiIDogXCJjYW5jZWxcIiwgbm9kZSwgbm9kZS5fX2RhdGFfXywgc2NoZWR1bGUuaW5kZXgsIHNjaGVkdWxlLmdyb3VwKTtcbiAgICBkZWxldGUgc2NoZWR1bGVzW2ldO1xuICB9XG5cbiAgaWYgKGVtcHR5KSBkZWxldGUgbm9kZS5fX3RyYW5zaXRpb247XG59XG4iLCAiaW1wb3J0IGludGVycnVwdCBmcm9tIFwiLi4vaW50ZXJydXB0LmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG5hbWUpIHtcbiAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcbiAgICBpbnRlcnJ1cHQodGhpcywgbmFtZSk7XG4gIH0pO1xufVxuIiwgImltcG9ydCB7Z2V0LCBzZXR9IGZyb20gXCIuL3NjaGVkdWxlLmpzXCI7XG5cbmZ1bmN0aW9uIHR3ZWVuUmVtb3ZlKGlkLCBuYW1lKSB7XG4gIHZhciB0d2VlbjAsIHR3ZWVuMTtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBzY2hlZHVsZSA9IHNldCh0aGlzLCBpZCksXG4gICAgICAgIHR3ZWVuID0gc2NoZWR1bGUudHdlZW47XG5cbiAgICAvLyBJZiB0aGlzIG5vZGUgc2hhcmVkIHR3ZWVuIHdpdGggdGhlIHByZXZpb3VzIG5vZGUsXG4gICAgLy8ganVzdCBhc3NpZ24gdGhlIHVwZGF0ZWQgc2hhcmVkIHR3ZWVuIGFuZCB3ZVx1MjAxOXJlIGRvbmUhXG4gICAgLy8gT3RoZXJ3aXNlLCBjb3B5LW9uLXdyaXRlLlxuICAgIGlmICh0d2VlbiAhPT0gdHdlZW4wKSB7XG4gICAgICB0d2VlbjEgPSB0d2VlbjAgPSB0d2VlbjtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBuID0gdHdlZW4xLmxlbmd0aDsgaSA8IG47ICsraSkge1xuICAgICAgICBpZiAodHdlZW4xW2ldLm5hbWUgPT09IG5hbWUpIHtcbiAgICAgICAgICB0d2VlbjEgPSB0d2VlbjEuc2xpY2UoKTtcbiAgICAgICAgICB0d2VlbjEuc3BsaWNlKGksIDEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgc2NoZWR1bGUudHdlZW4gPSB0d2VlbjE7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHR3ZWVuRnVuY3Rpb24oaWQsIG5hbWUsIHZhbHVlKSB7XG4gIHZhciB0d2VlbjAsIHR3ZWVuMTtcbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgRXJyb3I7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgc2NoZWR1bGUgPSBzZXQodGhpcywgaWQpLFxuICAgICAgICB0d2VlbiA9IHNjaGVkdWxlLnR3ZWVuO1xuXG4gICAgLy8gSWYgdGhpcyBub2RlIHNoYXJlZCB0d2VlbiB3aXRoIHRoZSBwcmV2aW91cyBub2RlLFxuICAgIC8vIGp1c3QgYXNzaWduIHRoZSB1cGRhdGVkIHNoYXJlZCB0d2VlbiBhbmQgd2VcdTIwMTlyZSBkb25lIVxuICAgIC8vIE90aGVyd2lzZSwgY29weS1vbi13cml0ZS5cbiAgICBpZiAodHdlZW4gIT09IHR3ZWVuMCkge1xuICAgICAgdHdlZW4xID0gKHR3ZWVuMCA9IHR3ZWVuKS5zbGljZSgpO1xuICAgICAgZm9yICh2YXIgdCA9IHtuYW1lOiBuYW1lLCB2YWx1ZTogdmFsdWV9LCBpID0gMCwgbiA9IHR3ZWVuMS5sZW5ndGg7IGkgPCBuOyArK2kpIHtcbiAgICAgICAgaWYgKHR3ZWVuMVtpXS5uYW1lID09PSBuYW1lKSB7XG4gICAgICAgICAgdHdlZW4xW2ldID0gdDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGkgPT09IG4pIHR3ZWVuMS5wdXNoKHQpO1xuICAgIH1cblxuICAgIHNjaGVkdWxlLnR3ZWVuID0gdHdlZW4xO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICB2YXIgaWQgPSB0aGlzLl9pZDtcblxuICBuYW1lICs9IFwiXCI7XG5cbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB7XG4gICAgdmFyIHR3ZWVuID0gZ2V0KHRoaXMubm9kZSgpLCBpZCkudHdlZW47XG4gICAgZm9yICh2YXIgaSA9IDAsIG4gPSB0d2Vlbi5sZW5ndGgsIHQ7IGkgPCBuOyArK2kpIHtcbiAgICAgIGlmICgodCA9IHR3ZWVuW2ldKS5uYW1lID09PSBuYW1lKSB7XG4gICAgICAgIHJldHVybiB0LnZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJldHVybiB0aGlzLmVhY2goKHZhbHVlID09IG51bGwgPyB0d2VlblJlbW92ZSA6IHR3ZWVuRnVuY3Rpb24pKGlkLCBuYW1lLCB2YWx1ZSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdHdlZW5WYWx1ZSh0cmFuc2l0aW9uLCBuYW1lLCB2YWx1ZSkge1xuICB2YXIgaWQgPSB0cmFuc2l0aW9uLl9pZDtcblxuICB0cmFuc2l0aW9uLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNjaGVkdWxlID0gc2V0KHRoaXMsIGlkKTtcbiAgICAoc2NoZWR1bGUudmFsdWUgfHwgKHNjaGVkdWxlLnZhbHVlID0ge30pKVtuYW1lXSA9IHZhbHVlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH0pO1xuXG4gIHJldHVybiBmdW5jdGlvbihub2RlKSB7XG4gICAgcmV0dXJuIGdldChub2RlLCBpZCkudmFsdWVbbmFtZV07XG4gIH07XG59XG4iLCAiaW1wb3J0IHtjb2xvcn0gZnJvbSBcImQzLWNvbG9yXCI7XG5pbXBvcnQge2ludGVycG9sYXRlTnVtYmVyLCBpbnRlcnBvbGF0ZVJnYiwgaW50ZXJwb2xhdGVTdHJpbmd9IGZyb20gXCJkMy1pbnRlcnBvbGF0ZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihhLCBiKSB7XG4gIHZhciBjO1xuICByZXR1cm4gKHR5cGVvZiBiID09PSBcIm51bWJlclwiID8gaW50ZXJwb2xhdGVOdW1iZXJcbiAgICAgIDogYiBpbnN0YW5jZW9mIGNvbG9yID8gaW50ZXJwb2xhdGVSZ2JcbiAgICAgIDogKGMgPSBjb2xvcihiKSkgPyAoYiA9IGMsIGludGVycG9sYXRlUmdiKVxuICAgICAgOiBpbnRlcnBvbGF0ZVN0cmluZykoYSwgYik7XG59XG4iLCAiaW1wb3J0IHtpbnRlcnBvbGF0ZVRyYW5zZm9ybVN2ZyBhcyBpbnRlcnBvbGF0ZVRyYW5zZm9ybX0gZnJvbSBcImQzLWludGVycG9sYXRlXCI7XG5pbXBvcnQge25hbWVzcGFjZX0gZnJvbSBcImQzLXNlbGVjdGlvblwiO1xuaW1wb3J0IHt0d2VlblZhbHVlfSBmcm9tIFwiLi90d2Vlbi5qc1wiO1xuaW1wb3J0IGludGVycG9sYXRlIGZyb20gXCIuL2ludGVycG9sYXRlLmpzXCI7XG5cbmZ1bmN0aW9uIGF0dHJSZW1vdmUobmFtZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGF0dHJSZW1vdmVOUyhmdWxsbmFtZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGVOUyhmdWxsbmFtZS5zcGFjZSwgZnVsbG5hbWUubG9jYWwpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBhdHRyQ29uc3RhbnQobmFtZSwgaW50ZXJwb2xhdGUsIHZhbHVlMSkge1xuICB2YXIgc3RyaW5nMDAsXG4gICAgICBzdHJpbmcxID0gdmFsdWUxICsgXCJcIixcbiAgICAgIGludGVycG9sYXRlMDtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBzdHJpbmcwID0gdGhpcy5nZXRBdHRyaWJ1dGUobmFtZSk7XG4gICAgcmV0dXJuIHN0cmluZzAgPT09IHN0cmluZzEgPyBudWxsXG4gICAgICAgIDogc3RyaW5nMCA9PT0gc3RyaW5nMDAgPyBpbnRlcnBvbGF0ZTBcbiAgICAgICAgOiBpbnRlcnBvbGF0ZTAgPSBpbnRlcnBvbGF0ZShzdHJpbmcwMCA9IHN0cmluZzAsIHZhbHVlMSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGF0dHJDb25zdGFudE5TKGZ1bGxuYW1lLCBpbnRlcnBvbGF0ZSwgdmFsdWUxKSB7XG4gIHZhciBzdHJpbmcwMCxcbiAgICAgIHN0cmluZzEgPSB2YWx1ZTEgKyBcIlwiLFxuICAgICAgaW50ZXJwb2xhdGUwO1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHN0cmluZzAgPSB0aGlzLmdldEF0dHJpYnV0ZU5TKGZ1bGxuYW1lLnNwYWNlLCBmdWxsbmFtZS5sb2NhbCk7XG4gICAgcmV0dXJuIHN0cmluZzAgPT09IHN0cmluZzEgPyBudWxsXG4gICAgICAgIDogc3RyaW5nMCA9PT0gc3RyaW5nMDAgPyBpbnRlcnBvbGF0ZTBcbiAgICAgICAgOiBpbnRlcnBvbGF0ZTAgPSBpbnRlcnBvbGF0ZShzdHJpbmcwMCA9IHN0cmluZzAsIHZhbHVlMSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGF0dHJGdW5jdGlvbihuYW1lLCBpbnRlcnBvbGF0ZSwgdmFsdWUpIHtcbiAgdmFyIHN0cmluZzAwLFxuICAgICAgc3RyaW5nMTAsXG4gICAgICBpbnRlcnBvbGF0ZTA7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgc3RyaW5nMCwgdmFsdWUxID0gdmFsdWUodGhpcyksIHN0cmluZzE7XG4gICAgaWYgKHZhbHVlMSA9PSBudWxsKSByZXR1cm4gdm9pZCB0aGlzLnJlbW92ZUF0dHJpYnV0ZShuYW1lKTtcbiAgICBzdHJpbmcwID0gdGhpcy5nZXRBdHRyaWJ1dGUobmFtZSk7XG4gICAgc3RyaW5nMSA9IHZhbHVlMSArIFwiXCI7XG4gICAgcmV0dXJuIHN0cmluZzAgPT09IHN0cmluZzEgPyBudWxsXG4gICAgICAgIDogc3RyaW5nMCA9PT0gc3RyaW5nMDAgJiYgc3RyaW5nMSA9PT0gc3RyaW5nMTAgPyBpbnRlcnBvbGF0ZTBcbiAgICAgICAgOiAoc3RyaW5nMTAgPSBzdHJpbmcxLCBpbnRlcnBvbGF0ZTAgPSBpbnRlcnBvbGF0ZShzdHJpbmcwMCA9IHN0cmluZzAsIHZhbHVlMSkpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBhdHRyRnVuY3Rpb25OUyhmdWxsbmFtZSwgaW50ZXJwb2xhdGUsIHZhbHVlKSB7XG4gIHZhciBzdHJpbmcwMCxcbiAgICAgIHN0cmluZzEwLFxuICAgICAgaW50ZXJwb2xhdGUwO1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHN0cmluZzAsIHZhbHVlMSA9IHZhbHVlKHRoaXMpLCBzdHJpbmcxO1xuICAgIGlmICh2YWx1ZTEgPT0gbnVsbCkgcmV0dXJuIHZvaWQgdGhpcy5yZW1vdmVBdHRyaWJ1dGVOUyhmdWxsbmFtZS5zcGFjZSwgZnVsbG5hbWUubG9jYWwpO1xuICAgIHN0cmluZzAgPSB0aGlzLmdldEF0dHJpYnV0ZU5TKGZ1bGxuYW1lLnNwYWNlLCBmdWxsbmFtZS5sb2NhbCk7XG4gICAgc3RyaW5nMSA9IHZhbHVlMSArIFwiXCI7XG4gICAgcmV0dXJuIHN0cmluZzAgPT09IHN0cmluZzEgPyBudWxsXG4gICAgICAgIDogc3RyaW5nMCA9PT0gc3RyaW5nMDAgJiYgc3RyaW5nMSA9PT0gc3RyaW5nMTAgPyBpbnRlcnBvbGF0ZTBcbiAgICAgICAgOiAoc3RyaW5nMTAgPSBzdHJpbmcxLCBpbnRlcnBvbGF0ZTAgPSBpbnRlcnBvbGF0ZShzdHJpbmcwMCA9IHN0cmluZzAsIHZhbHVlMSkpO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICB2YXIgZnVsbG5hbWUgPSBuYW1lc3BhY2UobmFtZSksIGkgPSBmdWxsbmFtZSA9PT0gXCJ0cmFuc2Zvcm1cIiA/IGludGVycG9sYXRlVHJhbnNmb3JtIDogaW50ZXJwb2xhdGU7XG4gIHJldHVybiB0aGlzLmF0dHJUd2VlbihuYW1lLCB0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgPyAoZnVsbG5hbWUubG9jYWwgPyBhdHRyRnVuY3Rpb25OUyA6IGF0dHJGdW5jdGlvbikoZnVsbG5hbWUsIGksIHR3ZWVuVmFsdWUodGhpcywgXCJhdHRyLlwiICsgbmFtZSwgdmFsdWUpKVxuICAgICAgOiB2YWx1ZSA9PSBudWxsID8gKGZ1bGxuYW1lLmxvY2FsID8gYXR0clJlbW92ZU5TIDogYXR0clJlbW92ZSkoZnVsbG5hbWUpXG4gICAgICA6IChmdWxsbmFtZS5sb2NhbCA/IGF0dHJDb25zdGFudE5TIDogYXR0ckNvbnN0YW50KShmdWxsbmFtZSwgaSwgdmFsdWUpKTtcbn1cbiIsICJpbXBvcnQge25hbWVzcGFjZX0gZnJvbSBcImQzLXNlbGVjdGlvblwiO1xuXG5mdW5jdGlvbiBhdHRySW50ZXJwb2xhdGUobmFtZSwgaSkge1xuICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgIHRoaXMuc2V0QXR0cmlidXRlKG5hbWUsIGkuY2FsbCh0aGlzLCB0KSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGF0dHJJbnRlcnBvbGF0ZU5TKGZ1bGxuYW1lLCBpKSB7XG4gIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgdGhpcy5zZXRBdHRyaWJ1dGVOUyhmdWxsbmFtZS5zcGFjZSwgZnVsbG5hbWUubG9jYWwsIGkuY2FsbCh0aGlzLCB0KSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGF0dHJUd2Vlbk5TKGZ1bGxuYW1lLCB2YWx1ZSkge1xuICB2YXIgdDAsIGkwO1xuICBmdW5jdGlvbiB0d2VlbigpIHtcbiAgICB2YXIgaSA9IHZhbHVlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgaWYgKGkgIT09IGkwKSB0MCA9IChpMCA9IGkpICYmIGF0dHJJbnRlcnBvbGF0ZU5TKGZ1bGxuYW1lLCBpKTtcbiAgICByZXR1cm4gdDA7XG4gIH1cbiAgdHdlZW4uX3ZhbHVlID0gdmFsdWU7XG4gIHJldHVybiB0d2Vlbjtcbn1cblxuZnVuY3Rpb24gYXR0clR3ZWVuKG5hbWUsIHZhbHVlKSB7XG4gIHZhciB0MCwgaTA7XG4gIGZ1bmN0aW9uIHR3ZWVuKCkge1xuICAgIHZhciBpID0gdmFsdWUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAoaSAhPT0gaTApIHQwID0gKGkwID0gaSkgJiYgYXR0ckludGVycG9sYXRlKG5hbWUsIGkpO1xuICAgIHJldHVybiB0MDtcbiAgfVxuICB0d2Vlbi5fdmFsdWUgPSB2YWx1ZTtcbiAgcmV0dXJuIHR3ZWVuO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICB2YXIga2V5ID0gXCJhdHRyLlwiICsgbmFtZTtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSByZXR1cm4gKGtleSA9IHRoaXMudHdlZW4oa2V5KSkgJiYga2V5Ll92YWx1ZTtcbiAgaWYgKHZhbHVlID09IG51bGwpIHJldHVybiB0aGlzLnR3ZWVuKGtleSwgbnVsbCk7XG4gIGlmICh0eXBlb2YgdmFsdWUgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IEVycm9yO1xuICB2YXIgZnVsbG5hbWUgPSBuYW1lc3BhY2UobmFtZSk7XG4gIHJldHVybiB0aGlzLnR3ZWVuKGtleSwgKGZ1bGxuYW1lLmxvY2FsID8gYXR0clR3ZWVuTlMgOiBhdHRyVHdlZW4pKGZ1bGxuYW1lLCB2YWx1ZSkpO1xufVxuIiwgImltcG9ydCB7Z2V0LCBpbml0fSBmcm9tIFwiLi9zY2hlZHVsZS5qc1wiO1xuXG5mdW5jdGlvbiBkZWxheUZ1bmN0aW9uKGlkLCB2YWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgaW5pdCh0aGlzLCBpZCkuZGVsYXkgPSArdmFsdWUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gZGVsYXlDb25zdGFudChpZCwgdmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlID0gK3ZhbHVlLCBmdW5jdGlvbigpIHtcbiAgICBpbml0KHRoaXMsIGlkKS5kZWxheSA9IHZhbHVlO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih2YWx1ZSkge1xuICB2YXIgaWQgPSB0aGlzLl9pZDtcblxuICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aFxuICAgICAgPyB0aGlzLmVhY2goKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiXG4gICAgICAgICAgPyBkZWxheUZ1bmN0aW9uXG4gICAgICAgICAgOiBkZWxheUNvbnN0YW50KShpZCwgdmFsdWUpKVxuICAgICAgOiBnZXQodGhpcy5ub2RlKCksIGlkKS5kZWxheTtcbn1cbiIsICJpbXBvcnQge2dldCwgc2V0fSBmcm9tIFwiLi9zY2hlZHVsZS5qc1wiO1xuXG5mdW5jdGlvbiBkdXJhdGlvbkZ1bmN0aW9uKGlkLCB2YWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgc2V0KHRoaXMsIGlkKS5kdXJhdGlvbiA9ICt2YWx1ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBkdXJhdGlvbkNvbnN0YW50KGlkLCB2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgPSArdmFsdWUsIGZ1bmN0aW9uKCkge1xuICAgIHNldCh0aGlzLCBpZCkuZHVyYXRpb24gPSB2YWx1ZTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odmFsdWUpIHtcbiAgdmFyIGlkID0gdGhpcy5faWQ7XG5cbiAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGhcbiAgICAgID8gdGhpcy5lYWNoKCh0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgICAgID8gZHVyYXRpb25GdW5jdGlvblxuICAgICAgICAgIDogZHVyYXRpb25Db25zdGFudCkoaWQsIHZhbHVlKSlcbiAgICAgIDogZ2V0KHRoaXMubm9kZSgpLCBpZCkuZHVyYXRpb247XG59XG4iLCAiaW1wb3J0IHtnZXQsIHNldH0gZnJvbSBcIi4vc2NoZWR1bGUuanNcIjtcblxuZnVuY3Rpb24gZWFzZUNvbnN0YW50KGlkLCB2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBFcnJvcjtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHNldCh0aGlzLCBpZCkuZWFzZSA9IHZhbHVlO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih2YWx1ZSkge1xuICB2YXIgaWQgPSB0aGlzLl9pZDtcblxuICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aFxuICAgICAgPyB0aGlzLmVhY2goZWFzZUNvbnN0YW50KGlkLCB2YWx1ZSkpXG4gICAgICA6IGdldCh0aGlzLm5vZGUoKSwgaWQpLmVhc2U7XG59XG4iLCAiaW1wb3J0IHtzZXR9IGZyb20gXCIuL3NjaGVkdWxlLmpzXCI7XG5cbmZ1bmN0aW9uIGVhc2VWYXJ5aW5nKGlkLCB2YWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHYgPSB2YWx1ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGlmICh0eXBlb2YgdiAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgRXJyb3I7XG4gICAgc2V0KHRoaXMsIGlkKS5lYXNlID0gdjtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgRXJyb3I7XG4gIHJldHVybiB0aGlzLmVhY2goZWFzZVZhcnlpbmcodGhpcy5faWQsIHZhbHVlKSk7XG59XG4iLCAiaW1wb3J0IHttYXRjaGVyfSBmcm9tIFwiZDMtc2VsZWN0aW9uXCI7XG5pbXBvcnQge1RyYW5zaXRpb259IGZyb20gXCIuL2luZGV4LmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG1hdGNoKSB7XG4gIGlmICh0eXBlb2YgbWF0Y2ggIT09IFwiZnVuY3Rpb25cIikgbWF0Y2ggPSBtYXRjaGVyKG1hdGNoKTtcblxuICBmb3IgKHZhciBncm91cHMgPSB0aGlzLl9ncm91cHMsIG0gPSBncm91cHMubGVuZ3RoLCBzdWJncm91cHMgPSBuZXcgQXJyYXkobSksIGogPSAwOyBqIDwgbTsgKytqKSB7XG4gICAgZm9yICh2YXIgZ3JvdXAgPSBncm91cHNbal0sIG4gPSBncm91cC5sZW5ndGgsIHN1Ymdyb3VwID0gc3ViZ3JvdXBzW2pdID0gW10sIG5vZGUsIGkgPSAwOyBpIDwgbjsgKytpKSB7XG4gICAgICBpZiAoKG5vZGUgPSBncm91cFtpXSkgJiYgbWF0Y2guY2FsbChub2RlLCBub2RlLl9fZGF0YV9fLCBpLCBncm91cCkpIHtcbiAgICAgICAgc3ViZ3JvdXAucHVzaChub2RlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3IFRyYW5zaXRpb24oc3ViZ3JvdXBzLCB0aGlzLl9wYXJlbnRzLCB0aGlzLl9uYW1lLCB0aGlzLl9pZCk7XG59XG4iLCAiaW1wb3J0IHtUcmFuc2l0aW9ufSBmcm9tIFwiLi9pbmRleC5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih0cmFuc2l0aW9uKSB7XG4gIGlmICh0cmFuc2l0aW9uLl9pZCAhPT0gdGhpcy5faWQpIHRocm93IG5ldyBFcnJvcjtcblxuICBmb3IgKHZhciBncm91cHMwID0gdGhpcy5fZ3JvdXBzLCBncm91cHMxID0gdHJhbnNpdGlvbi5fZ3JvdXBzLCBtMCA9IGdyb3VwczAubGVuZ3RoLCBtMSA9IGdyb3VwczEubGVuZ3RoLCBtID0gTWF0aC5taW4obTAsIG0xKSwgbWVyZ2VzID0gbmV3IEFycmF5KG0wKSwgaiA9IDA7IGogPCBtOyArK2opIHtcbiAgICBmb3IgKHZhciBncm91cDAgPSBncm91cHMwW2pdLCBncm91cDEgPSBncm91cHMxW2pdLCBuID0gZ3JvdXAwLmxlbmd0aCwgbWVyZ2UgPSBtZXJnZXNbal0gPSBuZXcgQXJyYXkobiksIG5vZGUsIGkgPSAwOyBpIDwgbjsgKytpKSB7XG4gICAgICBpZiAobm9kZSA9IGdyb3VwMFtpXSB8fCBncm91cDFbaV0pIHtcbiAgICAgICAgbWVyZ2VbaV0gPSBub2RlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZvciAoOyBqIDwgbTA7ICsraikge1xuICAgIG1lcmdlc1tqXSA9IGdyb3VwczBbal07XG4gIH1cblxuICByZXR1cm4gbmV3IFRyYW5zaXRpb24obWVyZ2VzLCB0aGlzLl9wYXJlbnRzLCB0aGlzLl9uYW1lLCB0aGlzLl9pZCk7XG59XG4iLCAiaW1wb3J0IHtnZXQsIHNldCwgaW5pdH0gZnJvbSBcIi4vc2NoZWR1bGUuanNcIjtcblxuZnVuY3Rpb24gc3RhcnQobmFtZSkge1xuICByZXR1cm4gKG5hbWUgKyBcIlwiKS50cmltKCkuc3BsaXQoL158XFxzKy8pLmV2ZXJ5KGZ1bmN0aW9uKHQpIHtcbiAgICB2YXIgaSA9IHQuaW5kZXhPZihcIi5cIik7XG4gICAgaWYgKGkgPj0gMCkgdCA9IHQuc2xpY2UoMCwgaSk7XG4gICAgcmV0dXJuICF0IHx8IHQgPT09IFwic3RhcnRcIjtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIG9uRnVuY3Rpb24oaWQsIG5hbWUsIGxpc3RlbmVyKSB7XG4gIHZhciBvbjAsIG9uMSwgc2l0ID0gc3RhcnQobmFtZSkgPyBpbml0IDogc2V0O1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNjaGVkdWxlID0gc2l0KHRoaXMsIGlkKSxcbiAgICAgICAgb24gPSBzY2hlZHVsZS5vbjtcblxuICAgIC8vIElmIHRoaXMgbm9kZSBzaGFyZWQgYSBkaXNwYXRjaCB3aXRoIHRoZSBwcmV2aW91cyBub2RlLFxuICAgIC8vIGp1c3QgYXNzaWduIHRoZSB1cGRhdGVkIHNoYXJlZCBkaXNwYXRjaCBhbmQgd2VcdTIwMTlyZSBkb25lIVxuICAgIC8vIE90aGVyd2lzZSwgY29weS1vbi13cml0ZS5cbiAgICBpZiAob24gIT09IG9uMCkgKG9uMSA9IChvbjAgPSBvbikuY29weSgpKS5vbihuYW1lLCBsaXN0ZW5lcik7XG5cbiAgICBzY2hlZHVsZS5vbiA9IG9uMTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obmFtZSwgbGlzdGVuZXIpIHtcbiAgdmFyIGlkID0gdGhpcy5faWQ7XG5cbiAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPCAyXG4gICAgICA/IGdldCh0aGlzLm5vZGUoKSwgaWQpLm9uLm9uKG5hbWUpXG4gICAgICA6IHRoaXMuZWFjaChvbkZ1bmN0aW9uKGlkLCBuYW1lLCBsaXN0ZW5lcikpO1xufVxuIiwgImZ1bmN0aW9uIHJlbW92ZUZ1bmN0aW9uKGlkKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgcGFyZW50ID0gdGhpcy5wYXJlbnROb2RlO1xuICAgIGZvciAodmFyIGkgaW4gdGhpcy5fX3RyYW5zaXRpb24pIGlmICgraSAhPT0gaWQpIHJldHVybjtcbiAgICBpZiAocGFyZW50KSBwYXJlbnQucmVtb3ZlQ2hpbGQodGhpcyk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5vbihcImVuZC5yZW1vdmVcIiwgcmVtb3ZlRnVuY3Rpb24odGhpcy5faWQpKTtcbn1cbiIsICJpbXBvcnQge3NlbGVjdG9yfSBmcm9tIFwiZDMtc2VsZWN0aW9uXCI7XG5pbXBvcnQge1RyYW5zaXRpb259IGZyb20gXCIuL2luZGV4LmpzXCI7XG5pbXBvcnQgc2NoZWR1bGUsIHtnZXR9IGZyb20gXCIuL3NjaGVkdWxlLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHNlbGVjdCkge1xuICB2YXIgbmFtZSA9IHRoaXMuX25hbWUsXG4gICAgICBpZCA9IHRoaXMuX2lkO1xuXG4gIGlmICh0eXBlb2Ygc2VsZWN0ICE9PSBcImZ1bmN0aW9uXCIpIHNlbGVjdCA9IHNlbGVjdG9yKHNlbGVjdCk7XG5cbiAgZm9yICh2YXIgZ3JvdXBzID0gdGhpcy5fZ3JvdXBzLCBtID0gZ3JvdXBzLmxlbmd0aCwgc3ViZ3JvdXBzID0gbmV3IEFycmF5KG0pLCBqID0gMDsgaiA8IG07ICsraikge1xuICAgIGZvciAodmFyIGdyb3VwID0gZ3JvdXBzW2pdLCBuID0gZ3JvdXAubGVuZ3RoLCBzdWJncm91cCA9IHN1Ymdyb3Vwc1tqXSA9IG5ldyBBcnJheShuKSwgbm9kZSwgc3Vibm9kZSwgaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICAgIGlmICgobm9kZSA9IGdyb3VwW2ldKSAmJiAoc3Vibm9kZSA9IHNlbGVjdC5jYWxsKG5vZGUsIG5vZGUuX19kYXRhX18sIGksIGdyb3VwKSkpIHtcbiAgICAgICAgaWYgKFwiX19kYXRhX19cIiBpbiBub2RlKSBzdWJub2RlLl9fZGF0YV9fID0gbm9kZS5fX2RhdGFfXztcbiAgICAgICAgc3ViZ3JvdXBbaV0gPSBzdWJub2RlO1xuICAgICAgICBzY2hlZHVsZShzdWJncm91cFtpXSwgbmFtZSwgaWQsIGksIHN1Ymdyb3VwLCBnZXQobm9kZSwgaWQpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3IFRyYW5zaXRpb24oc3ViZ3JvdXBzLCB0aGlzLl9wYXJlbnRzLCBuYW1lLCBpZCk7XG59XG4iLCAiaW1wb3J0IHtzZWxlY3RvckFsbH0gZnJvbSBcImQzLXNlbGVjdGlvblwiO1xuaW1wb3J0IHtUcmFuc2l0aW9ufSBmcm9tIFwiLi9pbmRleC5qc1wiO1xuaW1wb3J0IHNjaGVkdWxlLCB7Z2V0fSBmcm9tIFwiLi9zY2hlZHVsZS5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihzZWxlY3QpIHtcbiAgdmFyIG5hbWUgPSB0aGlzLl9uYW1lLFxuICAgICAgaWQgPSB0aGlzLl9pZDtcblxuICBpZiAodHlwZW9mIHNlbGVjdCAhPT0gXCJmdW5jdGlvblwiKSBzZWxlY3QgPSBzZWxlY3RvckFsbChzZWxlY3QpO1xuXG4gIGZvciAodmFyIGdyb3VwcyA9IHRoaXMuX2dyb3VwcywgbSA9IGdyb3Vwcy5sZW5ndGgsIHN1Ymdyb3VwcyA9IFtdLCBwYXJlbnRzID0gW10sIGogPSAwOyBqIDwgbTsgKytqKSB7XG4gICAgZm9yICh2YXIgZ3JvdXAgPSBncm91cHNbal0sIG4gPSBncm91cC5sZW5ndGgsIG5vZGUsIGkgPSAwOyBpIDwgbjsgKytpKSB7XG4gICAgICBpZiAobm9kZSA9IGdyb3VwW2ldKSB7XG4gICAgICAgIGZvciAodmFyIGNoaWxkcmVuID0gc2VsZWN0LmNhbGwobm9kZSwgbm9kZS5fX2RhdGFfXywgaSwgZ3JvdXApLCBjaGlsZCwgaW5oZXJpdCA9IGdldChub2RlLCBpZCksIGsgPSAwLCBsID0gY2hpbGRyZW4ubGVuZ3RoOyBrIDwgbDsgKytrKSB7XG4gICAgICAgICAgaWYgKGNoaWxkID0gY2hpbGRyZW5ba10pIHtcbiAgICAgICAgICAgIHNjaGVkdWxlKGNoaWxkLCBuYW1lLCBpZCwgaywgY2hpbGRyZW4sIGluaGVyaXQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzdWJncm91cHMucHVzaChjaGlsZHJlbik7XG4gICAgICAgIHBhcmVudHMucHVzaChub2RlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3IFRyYW5zaXRpb24oc3ViZ3JvdXBzLCBwYXJlbnRzLCBuYW1lLCBpZCk7XG59XG4iLCAiaW1wb3J0IHtzZWxlY3Rpb259IGZyb20gXCJkMy1zZWxlY3Rpb25cIjtcblxudmFyIFNlbGVjdGlvbiA9IHNlbGVjdGlvbi5wcm90b3R5cGUuY29uc3RydWN0b3I7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gbmV3IFNlbGVjdGlvbih0aGlzLl9ncm91cHMsIHRoaXMuX3BhcmVudHMpO1xufVxuIiwgImltcG9ydCB7aW50ZXJwb2xhdGVUcmFuc2Zvcm1Dc3MgYXMgaW50ZXJwb2xhdGVUcmFuc2Zvcm19IGZyb20gXCJkMy1pbnRlcnBvbGF0ZVwiO1xuaW1wb3J0IHtzdHlsZX0gZnJvbSBcImQzLXNlbGVjdGlvblwiO1xuaW1wb3J0IHtzZXR9IGZyb20gXCIuL3NjaGVkdWxlLmpzXCI7XG5pbXBvcnQge3R3ZWVuVmFsdWV9IGZyb20gXCIuL3R3ZWVuLmpzXCI7XG5pbXBvcnQgaW50ZXJwb2xhdGUgZnJvbSBcIi4vaW50ZXJwb2xhdGUuanNcIjtcblxuZnVuY3Rpb24gc3R5bGVOdWxsKG5hbWUsIGludGVycG9sYXRlKSB7XG4gIHZhciBzdHJpbmcwMCxcbiAgICAgIHN0cmluZzEwLFxuICAgICAgaW50ZXJwb2xhdGUwO1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHN0cmluZzAgPSBzdHlsZSh0aGlzLCBuYW1lKSxcbiAgICAgICAgc3RyaW5nMSA9ICh0aGlzLnN0eWxlLnJlbW92ZVByb3BlcnR5KG5hbWUpLCBzdHlsZSh0aGlzLCBuYW1lKSk7XG4gICAgcmV0dXJuIHN0cmluZzAgPT09IHN0cmluZzEgPyBudWxsXG4gICAgICAgIDogc3RyaW5nMCA9PT0gc3RyaW5nMDAgJiYgc3RyaW5nMSA9PT0gc3RyaW5nMTAgPyBpbnRlcnBvbGF0ZTBcbiAgICAgICAgOiBpbnRlcnBvbGF0ZTAgPSBpbnRlcnBvbGF0ZShzdHJpbmcwMCA9IHN0cmluZzAsIHN0cmluZzEwID0gc3RyaW5nMSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHN0eWxlUmVtb3ZlKG5hbWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuc3R5bGUucmVtb3ZlUHJvcGVydHkobmFtZSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHN0eWxlQ29uc3RhbnQobmFtZSwgaW50ZXJwb2xhdGUsIHZhbHVlMSkge1xuICB2YXIgc3RyaW5nMDAsXG4gICAgICBzdHJpbmcxID0gdmFsdWUxICsgXCJcIixcbiAgICAgIGludGVycG9sYXRlMDtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBzdHJpbmcwID0gc3R5bGUodGhpcywgbmFtZSk7XG4gICAgcmV0dXJuIHN0cmluZzAgPT09IHN0cmluZzEgPyBudWxsXG4gICAgICAgIDogc3RyaW5nMCA9PT0gc3RyaW5nMDAgPyBpbnRlcnBvbGF0ZTBcbiAgICAgICAgOiBpbnRlcnBvbGF0ZTAgPSBpbnRlcnBvbGF0ZShzdHJpbmcwMCA9IHN0cmluZzAsIHZhbHVlMSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHN0eWxlRnVuY3Rpb24obmFtZSwgaW50ZXJwb2xhdGUsIHZhbHVlKSB7XG4gIHZhciBzdHJpbmcwMCxcbiAgICAgIHN0cmluZzEwLFxuICAgICAgaW50ZXJwb2xhdGUwO1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHN0cmluZzAgPSBzdHlsZSh0aGlzLCBuYW1lKSxcbiAgICAgICAgdmFsdWUxID0gdmFsdWUodGhpcyksXG4gICAgICAgIHN0cmluZzEgPSB2YWx1ZTEgKyBcIlwiO1xuICAgIGlmICh2YWx1ZTEgPT0gbnVsbCkgc3RyaW5nMSA9IHZhbHVlMSA9ICh0aGlzLnN0eWxlLnJlbW92ZVByb3BlcnR5KG5hbWUpLCBzdHlsZSh0aGlzLCBuYW1lKSk7XG4gICAgcmV0dXJuIHN0cmluZzAgPT09IHN0cmluZzEgPyBudWxsXG4gICAgICAgIDogc3RyaW5nMCA9PT0gc3RyaW5nMDAgJiYgc3RyaW5nMSA9PT0gc3RyaW5nMTAgPyBpbnRlcnBvbGF0ZTBcbiAgICAgICAgOiAoc3RyaW5nMTAgPSBzdHJpbmcxLCBpbnRlcnBvbGF0ZTAgPSBpbnRlcnBvbGF0ZShzdHJpbmcwMCA9IHN0cmluZzAsIHZhbHVlMSkpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBzdHlsZU1heWJlUmVtb3ZlKGlkLCBuYW1lKSB7XG4gIHZhciBvbjAsIG9uMSwgbGlzdGVuZXIwLCBrZXkgPSBcInN0eWxlLlwiICsgbmFtZSwgZXZlbnQgPSBcImVuZC5cIiArIGtleSwgcmVtb3ZlO1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNjaGVkdWxlID0gc2V0KHRoaXMsIGlkKSxcbiAgICAgICAgb24gPSBzY2hlZHVsZS5vbixcbiAgICAgICAgbGlzdGVuZXIgPSBzY2hlZHVsZS52YWx1ZVtrZXldID09IG51bGwgPyByZW1vdmUgfHwgKHJlbW92ZSA9IHN0eWxlUmVtb3ZlKG5hbWUpKSA6IHVuZGVmaW5lZDtcblxuICAgIC8vIElmIHRoaXMgbm9kZSBzaGFyZWQgYSBkaXNwYXRjaCB3aXRoIHRoZSBwcmV2aW91cyBub2RlLFxuICAgIC8vIGp1c3QgYXNzaWduIHRoZSB1cGRhdGVkIHNoYXJlZCBkaXNwYXRjaCBhbmQgd2VcdTIwMTlyZSBkb25lIVxuICAgIC8vIE90aGVyd2lzZSwgY29weS1vbi13cml0ZS5cbiAgICBpZiAob24gIT09IG9uMCB8fCBsaXN0ZW5lcjAgIT09IGxpc3RlbmVyKSAob24xID0gKG9uMCA9IG9uKS5jb3B5KCkpLm9uKGV2ZW50LCBsaXN0ZW5lcjAgPSBsaXN0ZW5lcik7XG5cbiAgICBzY2hlZHVsZS5vbiA9IG9uMTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obmFtZSwgdmFsdWUsIHByaW9yaXR5KSB7XG4gIHZhciBpID0gKG5hbWUgKz0gXCJcIikgPT09IFwidHJhbnNmb3JtXCIgPyBpbnRlcnBvbGF0ZVRyYW5zZm9ybSA6IGludGVycG9sYXRlO1xuICByZXR1cm4gdmFsdWUgPT0gbnVsbCA/IHRoaXNcbiAgICAgIC5zdHlsZVR3ZWVuKG5hbWUsIHN0eWxlTnVsbChuYW1lLCBpKSlcbiAgICAgIC5vbihcImVuZC5zdHlsZS5cIiArIG5hbWUsIHN0eWxlUmVtb3ZlKG5hbWUpKVxuICAgIDogdHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIgPyB0aGlzXG4gICAgICAuc3R5bGVUd2VlbihuYW1lLCBzdHlsZUZ1bmN0aW9uKG5hbWUsIGksIHR3ZWVuVmFsdWUodGhpcywgXCJzdHlsZS5cIiArIG5hbWUsIHZhbHVlKSkpXG4gICAgICAuZWFjaChzdHlsZU1heWJlUmVtb3ZlKHRoaXMuX2lkLCBuYW1lKSlcbiAgICA6IHRoaXNcbiAgICAgIC5zdHlsZVR3ZWVuKG5hbWUsIHN0eWxlQ29uc3RhbnQobmFtZSwgaSwgdmFsdWUpLCBwcmlvcml0eSlcbiAgICAgIC5vbihcImVuZC5zdHlsZS5cIiArIG5hbWUsIG51bGwpO1xufVxuIiwgImZ1bmN0aW9uIHN0eWxlSW50ZXJwb2xhdGUobmFtZSwgaSwgcHJpb3JpdHkpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICB0aGlzLnN0eWxlLnNldFByb3BlcnR5KG5hbWUsIGkuY2FsbCh0aGlzLCB0KSwgcHJpb3JpdHkpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBzdHlsZVR3ZWVuKG5hbWUsIHZhbHVlLCBwcmlvcml0eSkge1xuICB2YXIgdCwgaTA7XG4gIGZ1bmN0aW9uIHR3ZWVuKCkge1xuICAgIHZhciBpID0gdmFsdWUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAoaSAhPT0gaTApIHQgPSAoaTAgPSBpKSAmJiBzdHlsZUludGVycG9sYXRlKG5hbWUsIGksIHByaW9yaXR5KTtcbiAgICByZXR1cm4gdDtcbiAgfVxuICB0d2Vlbi5fdmFsdWUgPSB2YWx1ZTtcbiAgcmV0dXJuIHR3ZWVuO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihuYW1lLCB2YWx1ZSwgcHJpb3JpdHkpIHtcbiAgdmFyIGtleSA9IFwic3R5bGUuXCIgKyAobmFtZSArPSBcIlwiKTtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSByZXR1cm4gKGtleSA9IHRoaXMudHdlZW4oa2V5KSkgJiYga2V5Ll92YWx1ZTtcbiAgaWYgKHZhbHVlID09IG51bGwpIHJldHVybiB0aGlzLnR3ZWVuKGtleSwgbnVsbCk7XG4gIGlmICh0eXBlb2YgdmFsdWUgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IEVycm9yO1xuICByZXR1cm4gdGhpcy50d2VlbihrZXksIHN0eWxlVHdlZW4obmFtZSwgdmFsdWUsIHByaW9yaXR5ID09IG51bGwgPyBcIlwiIDogcHJpb3JpdHkpKTtcbn1cbiIsICJpbXBvcnQge3R3ZWVuVmFsdWV9IGZyb20gXCIuL3R3ZWVuLmpzXCI7XG5cbmZ1bmN0aW9uIHRleHRDb25zdGFudCh2YWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy50ZXh0Q29udGVudCA9IHZhbHVlO1xuICB9O1xufVxuXG5mdW5jdGlvbiB0ZXh0RnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciB2YWx1ZTEgPSB2YWx1ZSh0aGlzKTtcbiAgICB0aGlzLnRleHRDb250ZW50ID0gdmFsdWUxID09IG51bGwgPyBcIlwiIDogdmFsdWUxO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gdGhpcy50d2VlbihcInRleHRcIiwgdHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCJcbiAgICAgID8gdGV4dEZ1bmN0aW9uKHR3ZWVuVmFsdWUodGhpcywgXCJ0ZXh0XCIsIHZhbHVlKSlcbiAgICAgIDogdGV4dENvbnN0YW50KHZhbHVlID09IG51bGwgPyBcIlwiIDogdmFsdWUgKyBcIlwiKSk7XG59XG4iLCAiZnVuY3Rpb24gdGV4dEludGVycG9sYXRlKGkpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICB0aGlzLnRleHRDb250ZW50ID0gaS5jYWxsKHRoaXMsIHQpO1xuICB9O1xufVxuXG5mdW5jdGlvbiB0ZXh0VHdlZW4odmFsdWUpIHtcbiAgdmFyIHQwLCBpMDtcbiAgZnVuY3Rpb24gdHdlZW4oKSB7XG4gICAgdmFyIGkgPSB2YWx1ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGlmIChpICE9PSBpMCkgdDAgPSAoaTAgPSBpKSAmJiB0ZXh0SW50ZXJwb2xhdGUoaSk7XG4gICAgcmV0dXJuIHQwO1xuICB9XG4gIHR3ZWVuLl92YWx1ZSA9IHZhbHVlO1xuICByZXR1cm4gdHdlZW47XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHZhciBrZXkgPSBcInRleHRcIjtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAxKSByZXR1cm4gKGtleSA9IHRoaXMudHdlZW4oa2V5KSkgJiYga2V5Ll92YWx1ZTtcbiAgaWYgKHZhbHVlID09IG51bGwpIHJldHVybiB0aGlzLnR3ZWVuKGtleSwgbnVsbCk7XG4gIGlmICh0eXBlb2YgdmFsdWUgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IEVycm9yO1xuICByZXR1cm4gdGhpcy50d2VlbihrZXksIHRleHRUd2Vlbih2YWx1ZSkpO1xufVxuIiwgImltcG9ydCB7VHJhbnNpdGlvbiwgbmV3SWR9IGZyb20gXCIuL2luZGV4LmpzXCI7XG5pbXBvcnQgc2NoZWR1bGUsIHtnZXR9IGZyb20gXCIuL3NjaGVkdWxlLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICB2YXIgbmFtZSA9IHRoaXMuX25hbWUsXG4gICAgICBpZDAgPSB0aGlzLl9pZCxcbiAgICAgIGlkMSA9IG5ld0lkKCk7XG5cbiAgZm9yICh2YXIgZ3JvdXBzID0gdGhpcy5fZ3JvdXBzLCBtID0gZ3JvdXBzLmxlbmd0aCwgaiA9IDA7IGogPCBtOyArK2opIHtcbiAgICBmb3IgKHZhciBncm91cCA9IGdyb3Vwc1tqXSwgbiA9IGdyb3VwLmxlbmd0aCwgbm9kZSwgaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICAgIGlmIChub2RlID0gZ3JvdXBbaV0pIHtcbiAgICAgICAgdmFyIGluaGVyaXQgPSBnZXQobm9kZSwgaWQwKTtcbiAgICAgICAgc2NoZWR1bGUobm9kZSwgbmFtZSwgaWQxLCBpLCBncm91cCwge1xuICAgICAgICAgIHRpbWU6IGluaGVyaXQudGltZSArIGluaGVyaXQuZGVsYXkgKyBpbmhlcml0LmR1cmF0aW9uLFxuICAgICAgICAgIGRlbGF5OiAwLFxuICAgICAgICAgIGR1cmF0aW9uOiBpbmhlcml0LmR1cmF0aW9uLFxuICAgICAgICAgIGVhc2U6IGluaGVyaXQuZWFzZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3IFRyYW5zaXRpb24oZ3JvdXBzLCB0aGlzLl9wYXJlbnRzLCBuYW1lLCBpZDEpO1xufVxuIiwgImltcG9ydCB7c2V0fSBmcm9tIFwiLi9zY2hlZHVsZS5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgdmFyIG9uMCwgb24xLCB0aGF0ID0gdGhpcywgaWQgPSB0aGF0Ll9pZCwgc2l6ZSA9IHRoYXQuc2l6ZSgpO1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgdmFyIGNhbmNlbCA9IHt2YWx1ZTogcmVqZWN0fSxcbiAgICAgICAgZW5kID0ge3ZhbHVlOiBmdW5jdGlvbigpIHsgaWYgKC0tc2l6ZSA9PT0gMCkgcmVzb2x2ZSgpOyB9fTtcblxuICAgIHRoYXQuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBzY2hlZHVsZSA9IHNldCh0aGlzLCBpZCksXG4gICAgICAgICAgb24gPSBzY2hlZHVsZS5vbjtcblxuICAgICAgLy8gSWYgdGhpcyBub2RlIHNoYXJlZCBhIGRpc3BhdGNoIHdpdGggdGhlIHByZXZpb3VzIG5vZGUsXG4gICAgICAvLyBqdXN0IGFzc2lnbiB0aGUgdXBkYXRlZCBzaGFyZWQgZGlzcGF0Y2ggYW5kIHdlXHUyMDE5cmUgZG9uZSFcbiAgICAgIC8vIE90aGVyd2lzZSwgY29weS1vbi13cml0ZS5cbiAgICAgIGlmIChvbiAhPT0gb24wKSB7XG4gICAgICAgIG9uMSA9IChvbjAgPSBvbikuY29weSgpO1xuICAgICAgICBvbjEuXy5jYW5jZWwucHVzaChjYW5jZWwpO1xuICAgICAgICBvbjEuXy5pbnRlcnJ1cHQucHVzaChjYW5jZWwpO1xuICAgICAgICBvbjEuXy5lbmQucHVzaChlbmQpO1xuICAgICAgfVxuXG4gICAgICBzY2hlZHVsZS5vbiA9IG9uMTtcbiAgICB9KTtcblxuICAgIC8vIFRoZSBzZWxlY3Rpb24gd2FzIGVtcHR5LCByZXNvbHZlIGVuZCBpbW1lZGlhdGVseVxuICAgIGlmIChzaXplID09PSAwKSByZXNvbHZlKCk7XG4gIH0pO1xufVxuIiwgImltcG9ydCB7c2VsZWN0aW9ufSBmcm9tIFwiZDMtc2VsZWN0aW9uXCI7XG5pbXBvcnQgdHJhbnNpdGlvbl9hdHRyIGZyb20gXCIuL2F0dHIuanNcIjtcbmltcG9ydCB0cmFuc2l0aW9uX2F0dHJUd2VlbiBmcm9tIFwiLi9hdHRyVHdlZW4uanNcIjtcbmltcG9ydCB0cmFuc2l0aW9uX2RlbGF5IGZyb20gXCIuL2RlbGF5LmpzXCI7XG5pbXBvcnQgdHJhbnNpdGlvbl9kdXJhdGlvbiBmcm9tIFwiLi9kdXJhdGlvbi5qc1wiO1xuaW1wb3J0IHRyYW5zaXRpb25fZWFzZSBmcm9tIFwiLi9lYXNlLmpzXCI7XG5pbXBvcnQgdHJhbnNpdGlvbl9lYXNlVmFyeWluZyBmcm9tIFwiLi9lYXNlVmFyeWluZy5qc1wiO1xuaW1wb3J0IHRyYW5zaXRpb25fZmlsdGVyIGZyb20gXCIuL2ZpbHRlci5qc1wiO1xuaW1wb3J0IHRyYW5zaXRpb25fbWVyZ2UgZnJvbSBcIi4vbWVyZ2UuanNcIjtcbmltcG9ydCB0cmFuc2l0aW9uX29uIGZyb20gXCIuL29uLmpzXCI7XG5pbXBvcnQgdHJhbnNpdGlvbl9yZW1vdmUgZnJvbSBcIi4vcmVtb3ZlLmpzXCI7XG5pbXBvcnQgdHJhbnNpdGlvbl9zZWxlY3QgZnJvbSBcIi4vc2VsZWN0LmpzXCI7XG5pbXBvcnQgdHJhbnNpdGlvbl9zZWxlY3RBbGwgZnJvbSBcIi4vc2VsZWN0QWxsLmpzXCI7XG5pbXBvcnQgdHJhbnNpdGlvbl9zZWxlY3Rpb24gZnJvbSBcIi4vc2VsZWN0aW9uLmpzXCI7XG5pbXBvcnQgdHJhbnNpdGlvbl9zdHlsZSBmcm9tIFwiLi9zdHlsZS5qc1wiO1xuaW1wb3J0IHRyYW5zaXRpb25fc3R5bGVUd2VlbiBmcm9tIFwiLi9zdHlsZVR3ZWVuLmpzXCI7XG5pbXBvcnQgdHJhbnNpdGlvbl90ZXh0IGZyb20gXCIuL3RleHQuanNcIjtcbmltcG9ydCB0cmFuc2l0aW9uX3RleHRUd2VlbiBmcm9tIFwiLi90ZXh0VHdlZW4uanNcIjtcbmltcG9ydCB0cmFuc2l0aW9uX3RyYW5zaXRpb24gZnJvbSBcIi4vdHJhbnNpdGlvbi5qc1wiO1xuaW1wb3J0IHRyYW5zaXRpb25fdHdlZW4gZnJvbSBcIi4vdHdlZW4uanNcIjtcbmltcG9ydCB0cmFuc2l0aW9uX2VuZCBmcm9tIFwiLi9lbmQuanNcIjtcblxudmFyIGlkID0gMDtcblxuZXhwb3J0IGZ1bmN0aW9uIFRyYW5zaXRpb24oZ3JvdXBzLCBwYXJlbnRzLCBuYW1lLCBpZCkge1xuICB0aGlzLl9ncm91cHMgPSBncm91cHM7XG4gIHRoaXMuX3BhcmVudHMgPSBwYXJlbnRzO1xuICB0aGlzLl9uYW1lID0gbmFtZTtcbiAgdGhpcy5faWQgPSBpZDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdHJhbnNpdGlvbihuYW1lKSB7XG4gIHJldHVybiBzZWxlY3Rpb24oKS50cmFuc2l0aW9uKG5hbWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbmV3SWQoKSB7XG4gIHJldHVybiArK2lkO1xufVxuXG52YXIgc2VsZWN0aW9uX3Byb3RvdHlwZSA9IHNlbGVjdGlvbi5wcm90b3R5cGU7XG5cblRyYW5zaXRpb24ucHJvdG90eXBlID0gdHJhbnNpdGlvbi5wcm90b3R5cGUgPSB7XG4gIGNvbnN0cnVjdG9yOiBUcmFuc2l0aW9uLFxuICBzZWxlY3Q6IHRyYW5zaXRpb25fc2VsZWN0LFxuICBzZWxlY3RBbGw6IHRyYW5zaXRpb25fc2VsZWN0QWxsLFxuICBzZWxlY3RDaGlsZDogc2VsZWN0aW9uX3Byb3RvdHlwZS5zZWxlY3RDaGlsZCxcbiAgc2VsZWN0Q2hpbGRyZW46IHNlbGVjdGlvbl9wcm90b3R5cGUuc2VsZWN0Q2hpbGRyZW4sXG4gIGZpbHRlcjogdHJhbnNpdGlvbl9maWx0ZXIsXG4gIG1lcmdlOiB0cmFuc2l0aW9uX21lcmdlLFxuICBzZWxlY3Rpb246IHRyYW5zaXRpb25fc2VsZWN0aW9uLFxuICB0cmFuc2l0aW9uOiB0cmFuc2l0aW9uX3RyYW5zaXRpb24sXG4gIGNhbGw6IHNlbGVjdGlvbl9wcm90b3R5cGUuY2FsbCxcbiAgbm9kZXM6IHNlbGVjdGlvbl9wcm90b3R5cGUubm9kZXMsXG4gIG5vZGU6IHNlbGVjdGlvbl9wcm90b3R5cGUubm9kZSxcbiAgc2l6ZTogc2VsZWN0aW9uX3Byb3RvdHlwZS5zaXplLFxuICBlbXB0eTogc2VsZWN0aW9uX3Byb3RvdHlwZS5lbXB0eSxcbiAgZWFjaDogc2VsZWN0aW9uX3Byb3RvdHlwZS5lYWNoLFxuICBvbjogdHJhbnNpdGlvbl9vbixcbiAgYXR0cjogdHJhbnNpdGlvbl9hdHRyLFxuICBhdHRyVHdlZW46IHRyYW5zaXRpb25fYXR0clR3ZWVuLFxuICBzdHlsZTogdHJhbnNpdGlvbl9zdHlsZSxcbiAgc3R5bGVUd2VlbjogdHJhbnNpdGlvbl9zdHlsZVR3ZWVuLFxuICB0ZXh0OiB0cmFuc2l0aW9uX3RleHQsXG4gIHRleHRUd2VlbjogdHJhbnNpdGlvbl90ZXh0VHdlZW4sXG4gIHJlbW92ZTogdHJhbnNpdGlvbl9yZW1vdmUsXG4gIHR3ZWVuOiB0cmFuc2l0aW9uX3R3ZWVuLFxuICBkZWxheTogdHJhbnNpdGlvbl9kZWxheSxcbiAgZHVyYXRpb246IHRyYW5zaXRpb25fZHVyYXRpb24sXG4gIGVhc2U6IHRyYW5zaXRpb25fZWFzZSxcbiAgZWFzZVZhcnlpbmc6IHRyYW5zaXRpb25fZWFzZVZhcnlpbmcsXG4gIGVuZDogdHJhbnNpdGlvbl9lbmQsXG4gIFtTeW1ib2wuaXRlcmF0b3JdOiBzZWxlY3Rpb25fcHJvdG90eXBlW1N5bWJvbC5pdGVyYXRvcl1cbn07XG4iLCAiZXhwb3J0IGNvbnN0IGxpbmVhciA9IHQgPT4gK3Q7XG4iLCAiZXhwb3J0IGZ1bmN0aW9uIGN1YmljSW4odCkge1xuICByZXR1cm4gdCAqIHQgKiB0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3ViaWNPdXQodCkge1xuICByZXR1cm4gLS10ICogdCAqIHQgKyAxO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3ViaWNJbk91dCh0KSB7XG4gIHJldHVybiAoKHQgKj0gMikgPD0gMSA/IHQgKiB0ICogdCA6ICh0IC09IDIpICogdCAqIHQgKyAyKSAvIDI7XG59XG4iLCAiaW1wb3J0IHtUcmFuc2l0aW9uLCBuZXdJZH0gZnJvbSBcIi4uL3RyYW5zaXRpb24vaW5kZXguanNcIjtcbmltcG9ydCBzY2hlZHVsZSBmcm9tIFwiLi4vdHJhbnNpdGlvbi9zY2hlZHVsZS5qc1wiO1xuaW1wb3J0IHtlYXNlQ3ViaWNJbk91dH0gZnJvbSBcImQzLWVhc2VcIjtcbmltcG9ydCB7bm93fSBmcm9tIFwiZDMtdGltZXJcIjtcblxudmFyIGRlZmF1bHRUaW1pbmcgPSB7XG4gIHRpbWU6IG51bGwsIC8vIFNldCBvbiB1c2UuXG4gIGRlbGF5OiAwLFxuICBkdXJhdGlvbjogMjUwLFxuICBlYXNlOiBlYXNlQ3ViaWNJbk91dFxufTtcblxuZnVuY3Rpb24gaW5oZXJpdChub2RlLCBpZCkge1xuICB2YXIgdGltaW5nO1xuICB3aGlsZSAoISh0aW1pbmcgPSBub2RlLl9fdHJhbnNpdGlvbikgfHwgISh0aW1pbmcgPSB0aW1pbmdbaWRdKSkge1xuICAgIGlmICghKG5vZGUgPSBub2RlLnBhcmVudE5vZGUpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYHRyYW5zaXRpb24gJHtpZH0gbm90IGZvdW5kYCk7XG4gICAgfVxuICB9XG4gIHJldHVybiB0aW1pbmc7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG5hbWUpIHtcbiAgdmFyIGlkLFxuICAgICAgdGltaW5nO1xuXG4gIGlmIChuYW1lIGluc3RhbmNlb2YgVHJhbnNpdGlvbikge1xuICAgIGlkID0gbmFtZS5faWQsIG5hbWUgPSBuYW1lLl9uYW1lO1xuICB9IGVsc2Uge1xuICAgIGlkID0gbmV3SWQoKSwgKHRpbWluZyA9IGRlZmF1bHRUaW1pbmcpLnRpbWUgPSBub3coKSwgbmFtZSA9IG5hbWUgPT0gbnVsbCA/IG51bGwgOiBuYW1lICsgXCJcIjtcbiAgfVxuXG4gIGZvciAodmFyIGdyb3VwcyA9IHRoaXMuX2dyb3VwcywgbSA9IGdyb3Vwcy5sZW5ndGgsIGogPSAwOyBqIDwgbTsgKytqKSB7XG4gICAgZm9yICh2YXIgZ3JvdXAgPSBncm91cHNbal0sIG4gPSBncm91cC5sZW5ndGgsIG5vZGUsIGkgPSAwOyBpIDwgbjsgKytpKSB7XG4gICAgICBpZiAobm9kZSA9IGdyb3VwW2ldKSB7XG4gICAgICAgIHNjaGVkdWxlKG5vZGUsIG5hbWUsIGlkLCBpLCBncm91cCwgdGltaW5nIHx8IGluaGVyaXQobm9kZSwgaWQpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3IFRyYW5zaXRpb24oZ3JvdXBzLCB0aGlzLl9wYXJlbnRzLCBuYW1lLCBpZCk7XG59XG4iLCAiaW1wb3J0IHtzZWxlY3Rpb259IGZyb20gXCJkMy1zZWxlY3Rpb25cIjtcbmltcG9ydCBzZWxlY3Rpb25faW50ZXJydXB0IGZyb20gXCIuL2ludGVycnVwdC5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl90cmFuc2l0aW9uIGZyb20gXCIuL3RyYW5zaXRpb24uanNcIjtcblxuc2VsZWN0aW9uLnByb3RvdHlwZS5pbnRlcnJ1cHQgPSBzZWxlY3Rpb25faW50ZXJydXB0O1xuc2VsZWN0aW9uLnByb3RvdHlwZS50cmFuc2l0aW9uID0gc2VsZWN0aW9uX3RyYW5zaXRpb247XG4iLCAiaW1wb3J0IHtkaXNwYXRjaH0gZnJvbSBcImQzLWRpc3BhdGNoXCI7XG5pbXBvcnQge2RyYWdEaXNhYmxlLCBkcmFnRW5hYmxlfSBmcm9tIFwiZDMtZHJhZ1wiO1xuaW1wb3J0IHtpbnRlcnBvbGF0ZX0gZnJvbSBcImQzLWludGVycG9sYXRlXCI7XG5pbXBvcnQge3BvaW50ZXIsIHNlbGVjdH0gZnJvbSBcImQzLXNlbGVjdGlvblwiO1xuaW1wb3J0IHtpbnRlcnJ1cHR9IGZyb20gXCJkMy10cmFuc2l0aW9uXCI7XG5pbXBvcnQgY29uc3RhbnQgZnJvbSBcIi4vY29uc3RhbnQuanNcIjtcbmltcG9ydCBCcnVzaEV2ZW50IGZyb20gXCIuL2V2ZW50LmpzXCI7XG5pbXBvcnQgbm9ldmVudCwge25vcHJvcGFnYXRpb259IGZyb20gXCIuL25vZXZlbnQuanNcIjtcblxudmFyIE1PREVfRFJBRyA9IHtuYW1lOiBcImRyYWdcIn0sXG4gICAgTU9ERV9TUEFDRSA9IHtuYW1lOiBcInNwYWNlXCJ9LFxuICAgIE1PREVfSEFORExFID0ge25hbWU6IFwiaGFuZGxlXCJ9LFxuICAgIE1PREVfQ0VOVEVSID0ge25hbWU6IFwiY2VudGVyXCJ9O1xuXG5jb25zdCB7YWJzLCBtYXgsIG1pbn0gPSBNYXRoO1xuXG5mdW5jdGlvbiBudW1iZXIxKGUpIHtcbiAgcmV0dXJuIFsrZVswXSwgK2VbMV1dO1xufVxuXG5mdW5jdGlvbiBudW1iZXIyKGUpIHtcbiAgcmV0dXJuIFtudW1iZXIxKGVbMF0pLCBudW1iZXIxKGVbMV0pXTtcbn1cblxudmFyIFggPSB7XG4gIG5hbWU6IFwieFwiLFxuICBoYW5kbGVzOiBbXCJ3XCIsIFwiZVwiXS5tYXAodHlwZSksXG4gIGlucHV0OiBmdW5jdGlvbih4LCBlKSB7IHJldHVybiB4ID09IG51bGwgPyBudWxsIDogW1sreFswXSwgZVswXVsxXV0sIFsreFsxXSwgZVsxXVsxXV1dOyB9LFxuICBvdXRwdXQ6IGZ1bmN0aW9uKHh5KSB7IHJldHVybiB4eSAmJiBbeHlbMF1bMF0sIHh5WzFdWzBdXTsgfVxufTtcblxudmFyIFkgPSB7XG4gIG5hbWU6IFwieVwiLFxuICBoYW5kbGVzOiBbXCJuXCIsIFwic1wiXS5tYXAodHlwZSksXG4gIGlucHV0OiBmdW5jdGlvbih5LCBlKSB7IHJldHVybiB5ID09IG51bGwgPyBudWxsIDogW1tlWzBdWzBdLCAreVswXV0sIFtlWzFdWzBdLCAreVsxXV1dOyB9LFxuICBvdXRwdXQ6IGZ1bmN0aW9uKHh5KSB7IHJldHVybiB4eSAmJiBbeHlbMF1bMV0sIHh5WzFdWzFdXTsgfVxufTtcblxudmFyIFhZID0ge1xuICBuYW1lOiBcInh5XCIsXG4gIGhhbmRsZXM6IFtcIm5cIiwgXCJ3XCIsIFwiZVwiLCBcInNcIiwgXCJud1wiLCBcIm5lXCIsIFwic3dcIiwgXCJzZVwiXS5tYXAodHlwZSksXG4gIGlucHV0OiBmdW5jdGlvbih4eSkgeyByZXR1cm4geHkgPT0gbnVsbCA/IG51bGwgOiBudW1iZXIyKHh5KTsgfSxcbiAgb3V0cHV0OiBmdW5jdGlvbih4eSkgeyByZXR1cm4geHk7IH1cbn07XG5cbnZhciBjdXJzb3JzID0ge1xuICBvdmVybGF5OiBcImNyb3NzaGFpclwiLFxuICBzZWxlY3Rpb246IFwibW92ZVwiLFxuICBuOiBcIm5zLXJlc2l6ZVwiLFxuICBlOiBcImV3LXJlc2l6ZVwiLFxuICBzOiBcIm5zLXJlc2l6ZVwiLFxuICB3OiBcImV3LXJlc2l6ZVwiLFxuICBudzogXCJud3NlLXJlc2l6ZVwiLFxuICBuZTogXCJuZXN3LXJlc2l6ZVwiLFxuICBzZTogXCJud3NlLXJlc2l6ZVwiLFxuICBzdzogXCJuZXN3LXJlc2l6ZVwiXG59O1xuXG52YXIgZmxpcFggPSB7XG4gIGU6IFwid1wiLFxuICB3OiBcImVcIixcbiAgbnc6IFwibmVcIixcbiAgbmU6IFwibndcIixcbiAgc2U6IFwic3dcIixcbiAgc3c6IFwic2VcIlxufTtcblxudmFyIGZsaXBZID0ge1xuICBuOiBcInNcIixcbiAgczogXCJuXCIsXG4gIG53OiBcInN3XCIsXG4gIG5lOiBcInNlXCIsXG4gIHNlOiBcIm5lXCIsXG4gIHN3OiBcIm53XCJcbn07XG5cbnZhciBzaWduc1ggPSB7XG4gIG92ZXJsYXk6ICsxLFxuICBzZWxlY3Rpb246ICsxLFxuICBuOiBudWxsLFxuICBlOiArMSxcbiAgczogbnVsbCxcbiAgdzogLTEsXG4gIG53OiAtMSxcbiAgbmU6ICsxLFxuICBzZTogKzEsXG4gIHN3OiAtMVxufTtcblxudmFyIHNpZ25zWSA9IHtcbiAgb3ZlcmxheTogKzEsXG4gIHNlbGVjdGlvbjogKzEsXG4gIG46IC0xLFxuICBlOiBudWxsLFxuICBzOiArMSxcbiAgdzogbnVsbCxcbiAgbnc6IC0xLFxuICBuZTogLTEsXG4gIHNlOiArMSxcbiAgc3c6ICsxXG59O1xuXG5mdW5jdGlvbiB0eXBlKHQpIHtcbiAgcmV0dXJuIHt0eXBlOiB0fTtcbn1cblxuLy8gSWdub3JlIHJpZ2h0LWNsaWNrLCBzaW5jZSB0aGF0IHNob3VsZCBvcGVuIHRoZSBjb250ZXh0IG1lbnUuXG5mdW5jdGlvbiBkZWZhdWx0RmlsdGVyKGV2ZW50KSB7XG4gIHJldHVybiAhZXZlbnQuY3RybEtleSAmJiAhZXZlbnQuYnV0dG9uO1xufVxuXG5mdW5jdGlvbiBkZWZhdWx0RXh0ZW50KCkge1xuICB2YXIgc3ZnID0gdGhpcy5vd25lclNWR0VsZW1lbnQgfHwgdGhpcztcbiAgaWYgKHN2Zy5oYXNBdHRyaWJ1dGUoXCJ2aWV3Qm94XCIpKSB7XG4gICAgc3ZnID0gc3ZnLnZpZXdCb3guYmFzZVZhbDtcbiAgICByZXR1cm4gW1tzdmcueCwgc3ZnLnldLCBbc3ZnLnggKyBzdmcud2lkdGgsIHN2Zy55ICsgc3ZnLmhlaWdodF1dO1xuICB9XG4gIHJldHVybiBbWzAsIDBdLCBbc3ZnLndpZHRoLmJhc2VWYWwudmFsdWUsIHN2Zy5oZWlnaHQuYmFzZVZhbC52YWx1ZV1dO1xufVxuXG5mdW5jdGlvbiBkZWZhdWx0VG91Y2hhYmxlKCkge1xuICByZXR1cm4gbmF2aWdhdG9yLm1heFRvdWNoUG9pbnRzIHx8IChcIm9udG91Y2hzdGFydFwiIGluIHRoaXMpO1xufVxuXG4vLyBMaWtlIGQzLmxvY2FsLCBidXQgd2l0aCB0aGUgbmFtZSBcdTIwMUNfX2JydXNoXHUyMDFEIHJhdGhlciB0aGFuIGF1dG8tZ2VuZXJhdGVkLlxuZnVuY3Rpb24gbG9jYWwobm9kZSkge1xuICB3aGlsZSAoIW5vZGUuX19icnVzaCkgaWYgKCEobm9kZSA9IG5vZGUucGFyZW50Tm9kZSkpIHJldHVybjtcbiAgcmV0dXJuIG5vZGUuX19icnVzaDtcbn1cblxuZnVuY3Rpb24gZW1wdHkoZXh0ZW50KSB7XG4gIHJldHVybiBleHRlbnRbMF1bMF0gPT09IGV4dGVudFsxXVswXVxuICAgICAgfHwgZXh0ZW50WzBdWzFdID09PSBleHRlbnRbMV1bMV07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBicnVzaFNlbGVjdGlvbihub2RlKSB7XG4gIHZhciBzdGF0ZSA9IG5vZGUuX19icnVzaDtcbiAgcmV0dXJuIHN0YXRlID8gc3RhdGUuZGltLm91dHB1dChzdGF0ZS5zZWxlY3Rpb24pIDogbnVsbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJydXNoWCgpIHtcbiAgcmV0dXJuIGJydXNoKFgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYnJ1c2hZKCkge1xuICByZXR1cm4gYnJ1c2goWSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gYnJ1c2goWFkpO1xufVxuXG5mdW5jdGlvbiBicnVzaChkaW0pIHtcbiAgdmFyIGV4dGVudCA9IGRlZmF1bHRFeHRlbnQsXG4gICAgICBmaWx0ZXIgPSBkZWZhdWx0RmlsdGVyLFxuICAgICAgdG91Y2hhYmxlID0gZGVmYXVsdFRvdWNoYWJsZSxcbiAgICAgIGtleXMgPSB0cnVlLFxuICAgICAgbGlzdGVuZXJzID0gZGlzcGF0Y2goXCJzdGFydFwiLCBcImJydXNoXCIsIFwiZW5kXCIpLFxuICAgICAgaGFuZGxlU2l6ZSA9IDYsXG4gICAgICB0b3VjaGVuZGluZztcblxuICBmdW5jdGlvbiBicnVzaChncm91cCkge1xuICAgIHZhciBvdmVybGF5ID0gZ3JvdXBcbiAgICAgICAgLnByb3BlcnR5KFwiX19icnVzaFwiLCBpbml0aWFsaXplKVxuICAgICAgLnNlbGVjdEFsbChcIi5vdmVybGF5XCIpXG4gICAgICAuZGF0YShbdHlwZShcIm92ZXJsYXlcIildKTtcblxuICAgIG92ZXJsYXkuZW50ZXIoKS5hcHBlbmQoXCJyZWN0XCIpXG4gICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJvdmVybGF5XCIpXG4gICAgICAgIC5hdHRyKFwicG9pbnRlci1ldmVudHNcIiwgXCJhbGxcIilcbiAgICAgICAgLmF0dHIoXCJjdXJzb3JcIiwgY3Vyc29ycy5vdmVybGF5KVxuICAgICAgLm1lcmdlKG92ZXJsYXkpXG4gICAgICAgIC5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBleHRlbnQgPSBsb2NhbCh0aGlzKS5leHRlbnQ7XG4gICAgICAgICAgc2VsZWN0KHRoaXMpXG4gICAgICAgICAgICAgIC5hdHRyKFwieFwiLCBleHRlbnRbMF1bMF0pXG4gICAgICAgICAgICAgIC5hdHRyKFwieVwiLCBleHRlbnRbMF1bMV0pXG4gICAgICAgICAgICAgIC5hdHRyKFwid2lkdGhcIiwgZXh0ZW50WzFdWzBdIC0gZXh0ZW50WzBdWzBdKVxuICAgICAgICAgICAgICAuYXR0cihcImhlaWdodFwiLCBleHRlbnRbMV1bMV0gLSBleHRlbnRbMF1bMV0pO1xuICAgICAgICB9KTtcblxuICAgIGdyb3VwLnNlbGVjdEFsbChcIi5zZWxlY3Rpb25cIilcbiAgICAgIC5kYXRhKFt0eXBlKFwic2VsZWN0aW9uXCIpXSlcbiAgICAgIC5lbnRlcigpLmFwcGVuZChcInJlY3RcIilcbiAgICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcInNlbGVjdGlvblwiKVxuICAgICAgICAuYXR0cihcImN1cnNvclwiLCBjdXJzb3JzLnNlbGVjdGlvbilcbiAgICAgICAgLmF0dHIoXCJmaWxsXCIsIFwiIzc3N1wiKVxuICAgICAgICAuYXR0cihcImZpbGwtb3BhY2l0eVwiLCAwLjMpXG4gICAgICAgIC5hdHRyKFwic3Ryb2tlXCIsIFwiI2ZmZlwiKVxuICAgICAgICAuYXR0cihcInNoYXBlLXJlbmRlcmluZ1wiLCBcImNyaXNwRWRnZXNcIik7XG5cbiAgICB2YXIgaGFuZGxlID0gZ3JvdXAuc2VsZWN0QWxsKFwiLmhhbmRsZVwiKVxuICAgICAgLmRhdGEoZGltLmhhbmRsZXMsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQudHlwZTsgfSk7XG5cbiAgICBoYW5kbGUuZXhpdCgpLnJlbW92ZSgpO1xuXG4gICAgaGFuZGxlLmVudGVyKCkuYXBwZW5kKFwicmVjdFwiKVxuICAgICAgICAuYXR0cihcImNsYXNzXCIsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIFwiaGFuZGxlIGhhbmRsZS0tXCIgKyBkLnR5cGU7IH0pXG4gICAgICAgIC5hdHRyKFwiY3Vyc29yXCIsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGN1cnNvcnNbZC50eXBlXTsgfSk7XG5cbiAgICBncm91cFxuICAgICAgICAuZWFjaChyZWRyYXcpXG4gICAgICAgIC5hdHRyKFwiZmlsbFwiLCBcIm5vbmVcIilcbiAgICAgICAgLmF0dHIoXCJwb2ludGVyLWV2ZW50c1wiLCBcImFsbFwiKVxuICAgICAgICAub24oXCJtb3VzZWRvd24uYnJ1c2hcIiwgc3RhcnRlZClcbiAgICAgIC5maWx0ZXIodG91Y2hhYmxlKVxuICAgICAgICAub24oXCJ0b3VjaHN0YXJ0LmJydXNoXCIsIHN0YXJ0ZWQpXG4gICAgICAgIC5vbihcInRvdWNobW92ZS5icnVzaFwiLCB0b3VjaG1vdmVkKVxuICAgICAgICAub24oXCJ0b3VjaGVuZC5icnVzaCB0b3VjaGNhbmNlbC5icnVzaFwiLCB0b3VjaGVuZGVkKVxuICAgICAgICAuc3R5bGUoXCJ0b3VjaC1hY3Rpb25cIiwgXCJub25lXCIpXG4gICAgICAgIC5zdHlsZShcIi13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvclwiLCBcInJnYmEoMCwwLDAsMClcIik7XG4gIH1cblxuICBicnVzaC5tb3ZlID0gZnVuY3Rpb24oZ3JvdXAsIHNlbGVjdGlvbiwgZXZlbnQpIHtcbiAgICBpZiAoZ3JvdXAudHdlZW4pIHtcbiAgICAgIGdyb3VwXG4gICAgICAgICAgLm9uKFwic3RhcnQuYnJ1c2hcIiwgZnVuY3Rpb24oZXZlbnQpIHsgZW1pdHRlcih0aGlzLCBhcmd1bWVudHMpLmJlZm9yZXN0YXJ0KCkuc3RhcnQoZXZlbnQpOyB9KVxuICAgICAgICAgIC5vbihcImludGVycnVwdC5icnVzaCBlbmQuYnJ1c2hcIiwgZnVuY3Rpb24oZXZlbnQpIHsgZW1pdHRlcih0aGlzLCBhcmd1bWVudHMpLmVuZChldmVudCk7IH0pXG4gICAgICAgICAgLnR3ZWVuKFwiYnJ1c2hcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXMsXG4gICAgICAgICAgICAgICAgc3RhdGUgPSB0aGF0Ll9fYnJ1c2gsXG4gICAgICAgICAgICAgICAgZW1pdCA9IGVtaXR0ZXIodGhhdCwgYXJndW1lbnRzKSxcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb24wID0gc3RhdGUuc2VsZWN0aW9uLFxuICAgICAgICAgICAgICAgIHNlbGVjdGlvbjEgPSBkaW0uaW5wdXQodHlwZW9mIHNlbGVjdGlvbiA9PT0gXCJmdW5jdGlvblwiID8gc2VsZWN0aW9uLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgOiBzZWxlY3Rpb24sIHN0YXRlLmV4dGVudCksXG4gICAgICAgICAgICAgICAgaSA9IGludGVycG9sYXRlKHNlbGVjdGlvbjAsIHNlbGVjdGlvbjEpO1xuXG4gICAgICAgICAgICBmdW5jdGlvbiB0d2Vlbih0KSB7XG4gICAgICAgICAgICAgIHN0YXRlLnNlbGVjdGlvbiA9IHQgPT09IDEgJiYgc2VsZWN0aW9uMSA9PT0gbnVsbCA/IG51bGwgOiBpKHQpO1xuICAgICAgICAgICAgICByZWRyYXcuY2FsbCh0aGF0KTtcbiAgICAgICAgICAgICAgZW1pdC5icnVzaCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gc2VsZWN0aW9uMCAhPT0gbnVsbCAmJiBzZWxlY3Rpb24xICE9PSBudWxsID8gdHdlZW4gOiB0d2VlbigxKTtcbiAgICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ3JvdXBcbiAgICAgICAgICAuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcyxcbiAgICAgICAgICAgICAgICBhcmdzID0gYXJndW1lbnRzLFxuICAgICAgICAgICAgICAgIHN0YXRlID0gdGhhdC5fX2JydXNoLFxuICAgICAgICAgICAgICAgIHNlbGVjdGlvbjEgPSBkaW0uaW5wdXQodHlwZW9mIHNlbGVjdGlvbiA9PT0gXCJmdW5jdGlvblwiID8gc2VsZWN0aW9uLmFwcGx5KHRoYXQsIGFyZ3MpIDogc2VsZWN0aW9uLCBzdGF0ZS5leHRlbnQpLFxuICAgICAgICAgICAgICAgIGVtaXQgPSBlbWl0dGVyKHRoYXQsIGFyZ3MpLmJlZm9yZXN0YXJ0KCk7XG5cbiAgICAgICAgICAgIGludGVycnVwdCh0aGF0KTtcbiAgICAgICAgICAgIHN0YXRlLnNlbGVjdGlvbiA9IHNlbGVjdGlvbjEgPT09IG51bGwgPyBudWxsIDogc2VsZWN0aW9uMTtcbiAgICAgICAgICAgIHJlZHJhdy5jYWxsKHRoYXQpO1xuICAgICAgICAgICAgZW1pdC5zdGFydChldmVudCkuYnJ1c2goZXZlbnQpLmVuZChldmVudCk7XG4gICAgICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIGJydXNoLmNsZWFyID0gZnVuY3Rpb24oZ3JvdXAsIGV2ZW50KSB7XG4gICAgYnJ1c2gubW92ZShncm91cCwgbnVsbCwgZXZlbnQpO1xuICB9O1xuXG4gIGZ1bmN0aW9uIHJlZHJhdygpIHtcbiAgICB2YXIgZ3JvdXAgPSBzZWxlY3QodGhpcyksXG4gICAgICAgIHNlbGVjdGlvbiA9IGxvY2FsKHRoaXMpLnNlbGVjdGlvbjtcblxuICAgIGlmIChzZWxlY3Rpb24pIHtcbiAgICAgIGdyb3VwLnNlbGVjdEFsbChcIi5zZWxlY3Rpb25cIilcbiAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIG51bGwpXG4gICAgICAgICAgLmF0dHIoXCJ4XCIsIHNlbGVjdGlvblswXVswXSlcbiAgICAgICAgICAuYXR0cihcInlcIiwgc2VsZWN0aW9uWzBdWzFdKVxuICAgICAgICAgIC5hdHRyKFwid2lkdGhcIiwgc2VsZWN0aW9uWzFdWzBdIC0gc2VsZWN0aW9uWzBdWzBdKVxuICAgICAgICAgIC5hdHRyKFwiaGVpZ2h0XCIsIHNlbGVjdGlvblsxXVsxXSAtIHNlbGVjdGlvblswXVsxXSk7XG5cbiAgICAgIGdyb3VwLnNlbGVjdEFsbChcIi5oYW5kbGVcIilcbiAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIG51bGwpXG4gICAgICAgICAgLmF0dHIoXCJ4XCIsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQudHlwZVtkLnR5cGUubGVuZ3RoIC0gMV0gPT09IFwiZVwiID8gc2VsZWN0aW9uWzFdWzBdIC0gaGFuZGxlU2l6ZSAvIDIgOiBzZWxlY3Rpb25bMF1bMF0gLSBoYW5kbGVTaXplIC8gMjsgfSlcbiAgICAgICAgICAuYXR0cihcInlcIiwgZnVuY3Rpb24oZCkgeyByZXR1cm4gZC50eXBlWzBdID09PSBcInNcIiA/IHNlbGVjdGlvblsxXVsxXSAtIGhhbmRsZVNpemUgLyAyIDogc2VsZWN0aW9uWzBdWzFdIC0gaGFuZGxlU2l6ZSAvIDI7IH0pXG4gICAgICAgICAgLmF0dHIoXCJ3aWR0aFwiLCBmdW5jdGlvbihkKSB7IHJldHVybiBkLnR5cGUgPT09IFwiblwiIHx8IGQudHlwZSA9PT0gXCJzXCIgPyBzZWxlY3Rpb25bMV1bMF0gLSBzZWxlY3Rpb25bMF1bMF0gKyBoYW5kbGVTaXplIDogaGFuZGxlU2l6ZTsgfSlcbiAgICAgICAgICAuYXR0cihcImhlaWdodFwiLCBmdW5jdGlvbihkKSB7IHJldHVybiBkLnR5cGUgPT09IFwiZVwiIHx8IGQudHlwZSA9PT0gXCJ3XCIgPyBzZWxlY3Rpb25bMV1bMV0gLSBzZWxlY3Rpb25bMF1bMV0gKyBoYW5kbGVTaXplIDogaGFuZGxlU2l6ZTsgfSk7XG4gICAgfVxuXG4gICAgZWxzZSB7XG4gICAgICBncm91cC5zZWxlY3RBbGwoXCIuc2VsZWN0aW9uLC5oYW5kbGVcIilcbiAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwibm9uZVwiKVxuICAgICAgICAgIC5hdHRyKFwieFwiLCBudWxsKVxuICAgICAgICAgIC5hdHRyKFwieVwiLCBudWxsKVxuICAgICAgICAgIC5hdHRyKFwid2lkdGhcIiwgbnVsbClcbiAgICAgICAgICAuYXR0cihcImhlaWdodFwiLCBudWxsKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBlbWl0dGVyKHRoYXQsIGFyZ3MsIGNsZWFuKSB7XG4gICAgdmFyIGVtaXQgPSB0aGF0Ll9fYnJ1c2guZW1pdHRlcjtcbiAgICByZXR1cm4gZW1pdCAmJiAoIWNsZWFuIHx8ICFlbWl0LmNsZWFuKSA/IGVtaXQgOiBuZXcgRW1pdHRlcih0aGF0LCBhcmdzLCBjbGVhbik7XG4gIH1cblxuICBmdW5jdGlvbiBFbWl0dGVyKHRoYXQsIGFyZ3MsIGNsZWFuKSB7XG4gICAgdGhpcy50aGF0ID0gdGhhdDtcbiAgICB0aGlzLmFyZ3MgPSBhcmdzO1xuICAgIHRoaXMuc3RhdGUgPSB0aGF0Ll9fYnJ1c2g7XG4gICAgdGhpcy5hY3RpdmUgPSAwO1xuICAgIHRoaXMuY2xlYW4gPSBjbGVhbjtcbiAgfVxuXG4gIEVtaXR0ZXIucHJvdG90eXBlID0ge1xuICAgIGJlZm9yZXN0YXJ0OiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICgrK3RoaXMuYWN0aXZlID09PSAxKSB0aGlzLnN0YXRlLmVtaXR0ZXIgPSB0aGlzLCB0aGlzLnN0YXJ0aW5nID0gdHJ1ZTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG4gICAgc3RhcnQ6IGZ1bmN0aW9uKGV2ZW50LCBtb2RlKSB7XG4gICAgICBpZiAodGhpcy5zdGFydGluZykgdGhpcy5zdGFydGluZyA9IGZhbHNlLCB0aGlzLmVtaXQoXCJzdGFydFwiLCBldmVudCwgbW9kZSk7XG4gICAgICBlbHNlIHRoaXMuZW1pdChcImJydXNoXCIsIGV2ZW50KTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG4gICAgYnJ1c2g6IGZ1bmN0aW9uKGV2ZW50LCBtb2RlKSB7XG4gICAgICB0aGlzLmVtaXQoXCJicnVzaFwiLCBldmVudCwgbW9kZSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuICAgIGVuZDogZnVuY3Rpb24oZXZlbnQsIG1vZGUpIHtcbiAgICAgIGlmICgtLXRoaXMuYWN0aXZlID09PSAwKSBkZWxldGUgdGhpcy5zdGF0ZS5lbWl0dGVyLCB0aGlzLmVtaXQoXCJlbmRcIiwgZXZlbnQsIG1vZGUpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcbiAgICBlbWl0OiBmdW5jdGlvbih0eXBlLCBldmVudCwgbW9kZSkge1xuICAgICAgdmFyIGQgPSBzZWxlY3QodGhpcy50aGF0KS5kYXR1bSgpO1xuICAgICAgbGlzdGVuZXJzLmNhbGwoXG4gICAgICAgIHR5cGUsXG4gICAgICAgIHRoaXMudGhhdCxcbiAgICAgICAgbmV3IEJydXNoRXZlbnQodHlwZSwge1xuICAgICAgICAgIHNvdXJjZUV2ZW50OiBldmVudCxcbiAgICAgICAgICB0YXJnZXQ6IGJydXNoLFxuICAgICAgICAgIHNlbGVjdGlvbjogZGltLm91dHB1dCh0aGlzLnN0YXRlLnNlbGVjdGlvbiksXG4gICAgICAgICAgbW9kZSxcbiAgICAgICAgICBkaXNwYXRjaDogbGlzdGVuZXJzXG4gICAgICAgIH0pLFxuICAgICAgICBkXG4gICAgICApO1xuICAgIH1cbiAgfTtcblxuICBmdW5jdGlvbiBzdGFydGVkKGV2ZW50KSB7XG4gICAgaWYgKHRvdWNoZW5kaW5nICYmICFldmVudC50b3VjaGVzKSByZXR1cm47XG4gICAgaWYgKCFmaWx0ZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSkgcmV0dXJuO1xuXG4gICAgdmFyIHRoYXQgPSB0aGlzLFxuICAgICAgICB0eXBlID0gZXZlbnQudGFyZ2V0Ll9fZGF0YV9fLnR5cGUsXG4gICAgICAgIG1vZGUgPSAoa2V5cyAmJiBldmVudC5tZXRhS2V5ID8gdHlwZSA9IFwib3ZlcmxheVwiIDogdHlwZSkgPT09IFwic2VsZWN0aW9uXCIgPyBNT0RFX0RSQUcgOiAoa2V5cyAmJiBldmVudC5hbHRLZXkgPyBNT0RFX0NFTlRFUiA6IE1PREVfSEFORExFKSxcbiAgICAgICAgc2lnblggPSBkaW0gPT09IFkgPyBudWxsIDogc2lnbnNYW3R5cGVdLFxuICAgICAgICBzaWduWSA9IGRpbSA9PT0gWCA/IG51bGwgOiBzaWduc1lbdHlwZV0sXG4gICAgICAgIHN0YXRlID0gbG9jYWwodGhhdCksXG4gICAgICAgIGV4dGVudCA9IHN0YXRlLmV4dGVudCxcbiAgICAgICAgc2VsZWN0aW9uID0gc3RhdGUuc2VsZWN0aW9uLFxuICAgICAgICBXID0gZXh0ZW50WzBdWzBdLCB3MCwgdzEsXG4gICAgICAgIE4gPSBleHRlbnRbMF1bMV0sIG4wLCBuMSxcbiAgICAgICAgRSA9IGV4dGVudFsxXVswXSwgZTAsIGUxLFxuICAgICAgICBTID0gZXh0ZW50WzFdWzFdLCBzMCwgczEsXG4gICAgICAgIGR4ID0gMCxcbiAgICAgICAgZHkgPSAwLFxuICAgICAgICBtb3ZpbmcsXG4gICAgICAgIHNoaWZ0aW5nID0gc2lnblggJiYgc2lnblkgJiYga2V5cyAmJiBldmVudC5zaGlmdEtleSxcbiAgICAgICAgbG9ja1gsXG4gICAgICAgIGxvY2tZLFxuICAgICAgICBwb2ludHMgPSBBcnJheS5mcm9tKGV2ZW50LnRvdWNoZXMgfHwgW2V2ZW50XSwgdCA9PiB7XG4gICAgICAgICAgY29uc3QgaSA9IHQuaWRlbnRpZmllcjtcbiAgICAgICAgICB0ID0gcG9pbnRlcih0LCB0aGF0KTtcbiAgICAgICAgICB0LnBvaW50MCA9IHQuc2xpY2UoKTtcbiAgICAgICAgICB0LmlkZW50aWZpZXIgPSBpO1xuICAgICAgICAgIHJldHVybiB0O1xuICAgICAgICB9KTtcblxuICAgIGludGVycnVwdCh0aGF0KTtcbiAgICB2YXIgZW1pdCA9IGVtaXR0ZXIodGhhdCwgYXJndW1lbnRzLCB0cnVlKS5iZWZvcmVzdGFydCgpO1xuXG4gICAgaWYgKHR5cGUgPT09IFwib3ZlcmxheVwiKSB7XG4gICAgICBpZiAoc2VsZWN0aW9uKSBtb3ZpbmcgPSB0cnVlO1xuICAgICAgY29uc3QgcHRzID0gW3BvaW50c1swXSwgcG9pbnRzWzFdIHx8IHBvaW50c1swXV07XG4gICAgICBzdGF0ZS5zZWxlY3Rpb24gPSBzZWxlY3Rpb24gPSBbW1xuICAgICAgICAgIHcwID0gZGltID09PSBZID8gVyA6IG1pbihwdHNbMF1bMF0sIHB0c1sxXVswXSksXG4gICAgICAgICAgbjAgPSBkaW0gPT09IFggPyBOIDogbWluKHB0c1swXVsxXSwgcHRzWzFdWzFdKVxuICAgICAgICBdLCBbXG4gICAgICAgICAgZTAgPSBkaW0gPT09IFkgPyBFIDogbWF4KHB0c1swXVswXSwgcHRzWzFdWzBdKSxcbiAgICAgICAgICBzMCA9IGRpbSA9PT0gWCA/IFMgOiBtYXgocHRzWzBdWzFdLCBwdHNbMV1bMV0pXG4gICAgICAgIF1dO1xuICAgICAgaWYgKHBvaW50cy5sZW5ndGggPiAxKSBtb3ZlKGV2ZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdzAgPSBzZWxlY3Rpb25bMF1bMF07XG4gICAgICBuMCA9IHNlbGVjdGlvblswXVsxXTtcbiAgICAgIGUwID0gc2VsZWN0aW9uWzFdWzBdO1xuICAgICAgczAgPSBzZWxlY3Rpb25bMV1bMV07XG4gICAgfVxuXG4gICAgdzEgPSB3MDtcbiAgICBuMSA9IG4wO1xuICAgIGUxID0gZTA7XG4gICAgczEgPSBzMDtcblxuICAgIHZhciBncm91cCA9IHNlbGVjdCh0aGF0KVxuICAgICAgICAuYXR0cihcInBvaW50ZXItZXZlbnRzXCIsIFwibm9uZVwiKTtcblxuICAgIHZhciBvdmVybGF5ID0gZ3JvdXAuc2VsZWN0QWxsKFwiLm92ZXJsYXlcIilcbiAgICAgICAgLmF0dHIoXCJjdXJzb3JcIiwgY3Vyc29yc1t0eXBlXSk7XG5cbiAgICBpZiAoZXZlbnQudG91Y2hlcykge1xuICAgICAgZW1pdC5tb3ZlZCA9IG1vdmVkO1xuICAgICAgZW1pdC5lbmRlZCA9IGVuZGVkO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdmlldyA9IHNlbGVjdChldmVudC52aWV3KVxuICAgICAgICAgIC5vbihcIm1vdXNlbW92ZS5icnVzaFwiLCBtb3ZlZCwgdHJ1ZSlcbiAgICAgICAgICAub24oXCJtb3VzZXVwLmJydXNoXCIsIGVuZGVkLCB0cnVlKTtcbiAgICAgIGlmIChrZXlzKSB2aWV3XG4gICAgICAgICAgLm9uKFwia2V5ZG93bi5icnVzaFwiLCBrZXlkb3duZWQsIHRydWUpXG4gICAgICAgICAgLm9uKFwia2V5dXAuYnJ1c2hcIiwga2V5dXBwZWQsIHRydWUpXG5cbiAgICAgIGRyYWdEaXNhYmxlKGV2ZW50LnZpZXcpO1xuICAgIH1cblxuICAgIHJlZHJhdy5jYWxsKHRoYXQpO1xuICAgIGVtaXQuc3RhcnQoZXZlbnQsIG1vZGUubmFtZSk7XG5cbiAgICBmdW5jdGlvbiBtb3ZlZChldmVudCkge1xuICAgICAgZm9yIChjb25zdCBwIG9mIGV2ZW50LmNoYW5nZWRUb3VjaGVzIHx8IFtldmVudF0pIHtcbiAgICAgICAgZm9yIChjb25zdCBkIG9mIHBvaW50cylcbiAgICAgICAgICBpZiAoZC5pZGVudGlmaWVyID09PSBwLmlkZW50aWZpZXIpIGQuY3VyID0gcG9pbnRlcihwLCB0aGF0KTtcbiAgICAgIH1cbiAgICAgIGlmIChzaGlmdGluZyAmJiAhbG9ja1ggJiYgIWxvY2tZICYmIHBvaW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgY29uc3QgcG9pbnQgPSBwb2ludHNbMF07XG4gICAgICAgIGlmIChhYnMocG9pbnQuY3VyWzBdIC0gcG9pbnRbMF0pID4gYWJzKHBvaW50LmN1clsxXSAtIHBvaW50WzFdKSlcbiAgICAgICAgICBsb2NrWSA9IHRydWU7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICBsb2NrWCA9IHRydWU7XG4gICAgICB9XG4gICAgICBmb3IgKGNvbnN0IHBvaW50IG9mIHBvaW50cylcbiAgICAgICAgaWYgKHBvaW50LmN1cikgcG9pbnRbMF0gPSBwb2ludC5jdXJbMF0sIHBvaW50WzFdID0gcG9pbnQuY3VyWzFdO1xuICAgICAgbW92aW5nID0gdHJ1ZTtcbiAgICAgIG5vZXZlbnQoZXZlbnQpO1xuICAgICAgbW92ZShldmVudCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbW92ZShldmVudCkge1xuICAgICAgY29uc3QgcG9pbnQgPSBwb2ludHNbMF0sIHBvaW50MCA9IHBvaW50LnBvaW50MDtcbiAgICAgIHZhciB0O1xuXG4gICAgICBkeCA9IHBvaW50WzBdIC0gcG9pbnQwWzBdO1xuICAgICAgZHkgPSBwb2ludFsxXSAtIHBvaW50MFsxXTtcblxuICAgICAgc3dpdGNoIChtb2RlKSB7XG4gICAgICAgIGNhc2UgTU9ERV9TUEFDRTpcbiAgICAgICAgY2FzZSBNT0RFX0RSQUc6IHtcbiAgICAgICAgICBpZiAoc2lnblgpIGR4ID0gbWF4KFcgLSB3MCwgbWluKEUgLSBlMCwgZHgpKSwgdzEgPSB3MCArIGR4LCBlMSA9IGUwICsgZHg7XG4gICAgICAgICAgaWYgKHNpZ25ZKSBkeSA9IG1heChOIC0gbjAsIG1pbihTIC0gczAsIGR5KSksIG4xID0gbjAgKyBkeSwgczEgPSBzMCArIGR5O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgTU9ERV9IQU5ETEU6IHtcbiAgICAgICAgICBpZiAocG9pbnRzWzFdKSB7XG4gICAgICAgICAgICBpZiAoc2lnblgpIHcxID0gbWF4KFcsIG1pbihFLCBwb2ludHNbMF1bMF0pKSwgZTEgPSBtYXgoVywgbWluKEUsIHBvaW50c1sxXVswXSkpLCBzaWduWCA9IDE7XG4gICAgICAgICAgICBpZiAoc2lnblkpIG4xID0gbWF4KE4sIG1pbihTLCBwb2ludHNbMF1bMV0pKSwgczEgPSBtYXgoTiwgbWluKFMsIHBvaW50c1sxXVsxXSkpLCBzaWduWSA9IDE7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChzaWduWCA8IDApIGR4ID0gbWF4KFcgLSB3MCwgbWluKEUgLSB3MCwgZHgpKSwgdzEgPSB3MCArIGR4LCBlMSA9IGUwO1xuICAgICAgICAgICAgZWxzZSBpZiAoc2lnblggPiAwKSBkeCA9IG1heChXIC0gZTAsIG1pbihFIC0gZTAsIGR4KSksIHcxID0gdzAsIGUxID0gZTAgKyBkeDtcbiAgICAgICAgICAgIGlmIChzaWduWSA8IDApIGR5ID0gbWF4KE4gLSBuMCwgbWluKFMgLSBuMCwgZHkpKSwgbjEgPSBuMCArIGR5LCBzMSA9IHMwO1xuICAgICAgICAgICAgZWxzZSBpZiAoc2lnblkgPiAwKSBkeSA9IG1heChOIC0gczAsIG1pbihTIC0gczAsIGR5KSksIG4xID0gbjAsIHMxID0gczAgKyBkeTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBNT0RFX0NFTlRFUjoge1xuICAgICAgICAgIGlmIChzaWduWCkgdzEgPSBtYXgoVywgbWluKEUsIHcwIC0gZHggKiBzaWduWCkpLCBlMSA9IG1heChXLCBtaW4oRSwgZTAgKyBkeCAqIHNpZ25YKSk7XG4gICAgICAgICAgaWYgKHNpZ25ZKSBuMSA9IG1heChOLCBtaW4oUywgbjAgLSBkeSAqIHNpZ25ZKSksIHMxID0gbWF4KE4sIG1pbihTLCBzMCArIGR5ICogc2lnblkpKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZTEgPCB3MSkge1xuICAgICAgICBzaWduWCAqPSAtMTtcbiAgICAgICAgdCA9IHcwLCB3MCA9IGUwLCBlMCA9IHQ7XG4gICAgICAgIHQgPSB3MSwgdzEgPSBlMSwgZTEgPSB0O1xuICAgICAgICBpZiAodHlwZSBpbiBmbGlwWCkgb3ZlcmxheS5hdHRyKFwiY3Vyc29yXCIsIGN1cnNvcnNbdHlwZSA9IGZsaXBYW3R5cGVdXSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChzMSA8IG4xKSB7XG4gICAgICAgIHNpZ25ZICo9IC0xO1xuICAgICAgICB0ID0gbjAsIG4wID0gczAsIHMwID0gdDtcbiAgICAgICAgdCA9IG4xLCBuMSA9IHMxLCBzMSA9IHQ7XG4gICAgICAgIGlmICh0eXBlIGluIGZsaXBZKSBvdmVybGF5LmF0dHIoXCJjdXJzb3JcIiwgY3Vyc29yc1t0eXBlID0gZmxpcFlbdHlwZV1dKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlLnNlbGVjdGlvbikgc2VsZWN0aW9uID0gc3RhdGUuc2VsZWN0aW9uOyAvLyBNYXkgYmUgc2V0IGJ5IGJydXNoLm1vdmUhXG4gICAgICBpZiAobG9ja1gpIHcxID0gc2VsZWN0aW9uWzBdWzBdLCBlMSA9IHNlbGVjdGlvblsxXVswXTtcbiAgICAgIGlmIChsb2NrWSkgbjEgPSBzZWxlY3Rpb25bMF1bMV0sIHMxID0gc2VsZWN0aW9uWzFdWzFdO1xuXG4gICAgICBpZiAoc2VsZWN0aW9uWzBdWzBdICE9PSB3MVxuICAgICAgICAgIHx8IHNlbGVjdGlvblswXVsxXSAhPT0gbjFcbiAgICAgICAgICB8fCBzZWxlY3Rpb25bMV1bMF0gIT09IGUxXG4gICAgICAgICAgfHwgc2VsZWN0aW9uWzFdWzFdICE9PSBzMSkge1xuICAgICAgICBzdGF0ZS5zZWxlY3Rpb24gPSBbW3cxLCBuMV0sIFtlMSwgczFdXTtcbiAgICAgICAgcmVkcmF3LmNhbGwodGhhdCk7XG4gICAgICAgIGVtaXQuYnJ1c2goZXZlbnQsIG1vZGUubmFtZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZW5kZWQoZXZlbnQpIHtcbiAgICAgIG5vcHJvcGFnYXRpb24oZXZlbnQpO1xuICAgICAgaWYgKGV2ZW50LnRvdWNoZXMpIHtcbiAgICAgICAgaWYgKGV2ZW50LnRvdWNoZXMubGVuZ3RoKSByZXR1cm47XG4gICAgICAgIGlmICh0b3VjaGVuZGluZykgY2xlYXJUaW1lb3V0KHRvdWNoZW5kaW5nKTtcbiAgICAgICAgdG91Y2hlbmRpbmcgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkgeyB0b3VjaGVuZGluZyA9IG51bGw7IH0sIDUwMCk7IC8vIEdob3N0IGNsaWNrcyBhcmUgZGVsYXllZCFcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRyYWdFbmFibGUoZXZlbnQudmlldywgbW92aW5nKTtcbiAgICAgICAgdmlldy5vbihcImtleWRvd24uYnJ1c2gga2V5dXAuYnJ1c2ggbW91c2Vtb3ZlLmJydXNoIG1vdXNldXAuYnJ1c2hcIiwgbnVsbCk7XG4gICAgICB9XG4gICAgICBncm91cC5hdHRyKFwicG9pbnRlci1ldmVudHNcIiwgXCJhbGxcIik7XG4gICAgICBvdmVybGF5LmF0dHIoXCJjdXJzb3JcIiwgY3Vyc29ycy5vdmVybGF5KTtcbiAgICAgIGlmIChzdGF0ZS5zZWxlY3Rpb24pIHNlbGVjdGlvbiA9IHN0YXRlLnNlbGVjdGlvbjsgLy8gTWF5IGJlIHNldCBieSBicnVzaC5tb3ZlIChvbiBzdGFydCkhXG4gICAgICBpZiAoZW1wdHkoc2VsZWN0aW9uKSkgc3RhdGUuc2VsZWN0aW9uID0gbnVsbCwgcmVkcmF3LmNhbGwodGhhdCk7XG4gICAgICBlbWl0LmVuZChldmVudCwgbW9kZS5uYW1lKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBrZXlkb3duZWQoZXZlbnQpIHtcbiAgICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuICAgICAgICBjYXNlIDE2OiB7IC8vIFNISUZUXG4gICAgICAgICAgc2hpZnRpbmcgPSBzaWduWCAmJiBzaWduWTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIDE4OiB7IC8vIEFMVFxuICAgICAgICAgIGlmIChtb2RlID09PSBNT0RFX0hBTkRMRSkge1xuICAgICAgICAgICAgaWYgKHNpZ25YKSBlMCA9IGUxIC0gZHggKiBzaWduWCwgdzAgPSB3MSArIGR4ICogc2lnblg7XG4gICAgICAgICAgICBpZiAoc2lnblkpIHMwID0gczEgLSBkeSAqIHNpZ25ZLCBuMCA9IG4xICsgZHkgKiBzaWduWTtcbiAgICAgICAgICAgIG1vZGUgPSBNT0RFX0NFTlRFUjtcbiAgICAgICAgICAgIG1vdmUoZXZlbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIDMyOiB7IC8vIFNQQUNFOyB0YWtlcyBwcmlvcml0eSBvdmVyIEFMVFxuICAgICAgICAgIGlmIChtb2RlID09PSBNT0RFX0hBTkRMRSB8fCBtb2RlID09PSBNT0RFX0NFTlRFUikge1xuICAgICAgICAgICAgaWYgKHNpZ25YIDwgMCkgZTAgPSBlMSAtIGR4OyBlbHNlIGlmIChzaWduWCA+IDApIHcwID0gdzEgLSBkeDtcbiAgICAgICAgICAgIGlmIChzaWduWSA8IDApIHMwID0gczEgLSBkeTsgZWxzZSBpZiAoc2lnblkgPiAwKSBuMCA9IG4xIC0gZHk7XG4gICAgICAgICAgICBtb2RlID0gTU9ERV9TUEFDRTtcbiAgICAgICAgICAgIG92ZXJsYXkuYXR0cihcImN1cnNvclwiLCBjdXJzb3JzLnNlbGVjdGlvbik7XG4gICAgICAgICAgICBtb3ZlKGV2ZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgZGVmYXVsdDogcmV0dXJuO1xuICAgICAgfVxuICAgICAgbm9ldmVudChldmVudCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24ga2V5dXBwZWQoZXZlbnQpIHtcbiAgICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuICAgICAgICBjYXNlIDE2OiB7IC8vIFNISUZUXG4gICAgICAgICAgaWYgKHNoaWZ0aW5nKSB7XG4gICAgICAgICAgICBsb2NrWCA9IGxvY2tZID0gc2hpZnRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIG1vdmUoZXZlbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIDE4OiB7IC8vIEFMVFxuICAgICAgICAgIGlmIChtb2RlID09PSBNT0RFX0NFTlRFUikge1xuICAgICAgICAgICAgaWYgKHNpZ25YIDwgMCkgZTAgPSBlMTsgZWxzZSBpZiAoc2lnblggPiAwKSB3MCA9IHcxO1xuICAgICAgICAgICAgaWYgKHNpZ25ZIDwgMCkgczAgPSBzMTsgZWxzZSBpZiAoc2lnblkgPiAwKSBuMCA9IG4xO1xuICAgICAgICAgICAgbW9kZSA9IE1PREVfSEFORExFO1xuICAgICAgICAgICAgbW92ZShldmVudCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgMzI6IHsgLy8gU1BBQ0VcbiAgICAgICAgICBpZiAobW9kZSA9PT0gTU9ERV9TUEFDRSkge1xuICAgICAgICAgICAgaWYgKGV2ZW50LmFsdEtleSkge1xuICAgICAgICAgICAgICBpZiAoc2lnblgpIGUwID0gZTEgLSBkeCAqIHNpZ25YLCB3MCA9IHcxICsgZHggKiBzaWduWDtcbiAgICAgICAgICAgICAgaWYgKHNpZ25ZKSBzMCA9IHMxIC0gZHkgKiBzaWduWSwgbjAgPSBuMSArIGR5ICogc2lnblk7XG4gICAgICAgICAgICAgIG1vZGUgPSBNT0RFX0NFTlRFUjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGlmIChzaWduWCA8IDApIGUwID0gZTE7IGVsc2UgaWYgKHNpZ25YID4gMCkgdzAgPSB3MTtcbiAgICAgICAgICAgICAgaWYgKHNpZ25ZIDwgMCkgczAgPSBzMTsgZWxzZSBpZiAoc2lnblkgPiAwKSBuMCA9IG4xO1xuICAgICAgICAgICAgICBtb2RlID0gTU9ERV9IQU5ETEU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvdmVybGF5LmF0dHIoXCJjdXJzb3JcIiwgY3Vyc29yc1t0eXBlXSk7XG4gICAgICAgICAgICBtb3ZlKGV2ZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgZGVmYXVsdDogcmV0dXJuO1xuICAgICAgfVxuICAgICAgbm9ldmVudChldmVudCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdG91Y2htb3ZlZChldmVudCkge1xuICAgIGVtaXR0ZXIodGhpcywgYXJndW1lbnRzKS5tb3ZlZChldmVudCk7XG4gIH1cblxuICBmdW5jdGlvbiB0b3VjaGVuZGVkKGV2ZW50KSB7XG4gICAgZW1pdHRlcih0aGlzLCBhcmd1bWVudHMpLmVuZGVkKGV2ZW50KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXRpYWxpemUoKSB7XG4gICAgdmFyIHN0YXRlID0gdGhpcy5fX2JydXNoIHx8IHtzZWxlY3Rpb246IG51bGx9O1xuICAgIHN0YXRlLmV4dGVudCA9IG51bWJlcjIoZXh0ZW50LmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICAgIHN0YXRlLmRpbSA9IGRpbTtcbiAgICByZXR1cm4gc3RhdGU7XG4gIH1cblxuICBicnVzaC5leHRlbnQgPSBmdW5jdGlvbihfKSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAoZXh0ZW50ID0gdHlwZW9mIF8gPT09IFwiZnVuY3Rpb25cIiA/IF8gOiBjb25zdGFudChudW1iZXIyKF8pKSwgYnJ1c2gpIDogZXh0ZW50O1xuICB9O1xuXG4gIGJydXNoLmZpbHRlciA9IGZ1bmN0aW9uKF8pIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IChmaWx0ZXIgPSB0eXBlb2YgXyA9PT0gXCJmdW5jdGlvblwiID8gXyA6IGNvbnN0YW50KCEhXyksIGJydXNoKSA6IGZpbHRlcjtcbiAgfTtcblxuICBicnVzaC50b3VjaGFibGUgPSBmdW5jdGlvbihfKSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAodG91Y2hhYmxlID0gdHlwZW9mIF8gPT09IFwiZnVuY3Rpb25cIiA/IF8gOiBjb25zdGFudCghIV8pLCBicnVzaCkgOiB0b3VjaGFibGU7XG4gIH07XG5cbiAgYnJ1c2guaGFuZGxlU2l6ZSA9IGZ1bmN0aW9uKF8pIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IChoYW5kbGVTaXplID0gK18sIGJydXNoKSA6IGhhbmRsZVNpemU7XG4gIH07XG5cbiAgYnJ1c2gua2V5TW9kaWZpZXJzID0gZnVuY3Rpb24oXykge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKGtleXMgPSAhIV8sIGJydXNoKSA6IGtleXM7XG4gIH07XG5cbiAgYnJ1c2gub24gPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgdmFsdWUgPSBsaXN0ZW5lcnMub24uYXBwbHkobGlzdGVuZXJzLCBhcmd1bWVudHMpO1xuICAgIHJldHVybiB2YWx1ZSA9PT0gbGlzdGVuZXJzID8gYnJ1c2ggOiB2YWx1ZTtcbiAgfTtcblxuICByZXR1cm4gYnJ1c2g7XG59XG4iLCAiY29uc3QgcGkgPSBNYXRoLlBJLFxuICAgIHRhdSA9IDIgKiBwaSxcbiAgICBlcHNpbG9uID0gMWUtNixcbiAgICB0YXVFcHNpbG9uID0gdGF1IC0gZXBzaWxvbjtcblxuZnVuY3Rpb24gUGF0aCgpIHtcbiAgdGhpcy5feDAgPSB0aGlzLl95MCA9IC8vIHN0YXJ0IG9mIGN1cnJlbnQgc3VicGF0aFxuICB0aGlzLl94MSA9IHRoaXMuX3kxID0gbnVsbDsgLy8gZW5kIG9mIGN1cnJlbnQgc3VicGF0aFxuICB0aGlzLl8gPSBcIlwiO1xufVxuXG5mdW5jdGlvbiBwYXRoKCkge1xuICByZXR1cm4gbmV3IFBhdGg7XG59XG5cblBhdGgucHJvdG90eXBlID0gcGF0aC5wcm90b3R5cGUgPSB7XG4gIGNvbnN0cnVjdG9yOiBQYXRoLFxuICBtb3ZlVG86IGZ1bmN0aW9uKHgsIHkpIHtcbiAgICB0aGlzLl8gKz0gXCJNXCIgKyAodGhpcy5feDAgPSB0aGlzLl94MSA9ICt4KSArIFwiLFwiICsgKHRoaXMuX3kwID0gdGhpcy5feTEgPSAreSk7XG4gIH0sXG4gIGNsb3NlUGF0aDogZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMuX3gxICE9PSBudWxsKSB7XG4gICAgICB0aGlzLl94MSA9IHRoaXMuX3gwLCB0aGlzLl95MSA9IHRoaXMuX3kwO1xuICAgICAgdGhpcy5fICs9IFwiWlwiO1xuICAgIH1cbiAgfSxcbiAgbGluZVRvOiBmdW5jdGlvbih4LCB5KSB7XG4gICAgdGhpcy5fICs9IFwiTFwiICsgKHRoaXMuX3gxID0gK3gpICsgXCIsXCIgKyAodGhpcy5feTEgPSAreSk7XG4gIH0sXG4gIHF1YWRyYXRpY0N1cnZlVG86IGZ1bmN0aW9uKHgxLCB5MSwgeCwgeSkge1xuICAgIHRoaXMuXyArPSBcIlFcIiArICgreDEpICsgXCIsXCIgKyAoK3kxKSArIFwiLFwiICsgKHRoaXMuX3gxID0gK3gpICsgXCIsXCIgKyAodGhpcy5feTEgPSAreSk7XG4gIH0sXG4gIGJlemllckN1cnZlVG86IGZ1bmN0aW9uKHgxLCB5MSwgeDIsIHkyLCB4LCB5KSB7XG4gICAgdGhpcy5fICs9IFwiQ1wiICsgKCt4MSkgKyBcIixcIiArICgreTEpICsgXCIsXCIgKyAoK3gyKSArIFwiLFwiICsgKCt5MikgKyBcIixcIiArICh0aGlzLl94MSA9ICt4KSArIFwiLFwiICsgKHRoaXMuX3kxID0gK3kpO1xuICB9LFxuICBhcmNUbzogZnVuY3Rpb24oeDEsIHkxLCB4MiwgeTIsIHIpIHtcbiAgICB4MSA9ICt4MSwgeTEgPSAreTEsIHgyID0gK3gyLCB5MiA9ICt5MiwgciA9ICtyO1xuICAgIHZhciB4MCA9IHRoaXMuX3gxLFxuICAgICAgICB5MCA9IHRoaXMuX3kxLFxuICAgICAgICB4MjEgPSB4MiAtIHgxLFxuICAgICAgICB5MjEgPSB5MiAtIHkxLFxuICAgICAgICB4MDEgPSB4MCAtIHgxLFxuICAgICAgICB5MDEgPSB5MCAtIHkxLFxuICAgICAgICBsMDFfMiA9IHgwMSAqIHgwMSArIHkwMSAqIHkwMTtcblxuICAgIC8vIElzIHRoZSByYWRpdXMgbmVnYXRpdmU/IEVycm9yLlxuICAgIGlmIChyIDwgMCkgdGhyb3cgbmV3IEVycm9yKFwibmVnYXRpdmUgcmFkaXVzOiBcIiArIHIpO1xuXG4gICAgLy8gSXMgdGhpcyBwYXRoIGVtcHR5PyBNb3ZlIHRvICh4MSx5MSkuXG4gICAgaWYgKHRoaXMuX3gxID09PSBudWxsKSB7XG4gICAgICB0aGlzLl8gKz0gXCJNXCIgKyAodGhpcy5feDEgPSB4MSkgKyBcIixcIiArICh0aGlzLl95MSA9IHkxKTtcbiAgICB9XG5cbiAgICAvLyBPciwgaXMgKHgxLHkxKSBjb2luY2lkZW50IHdpdGggKHgwLHkwKT8gRG8gbm90aGluZy5cbiAgICBlbHNlIGlmICghKGwwMV8yID4gZXBzaWxvbikpO1xuXG4gICAgLy8gT3IsIGFyZSAoeDAseTApLCAoeDEseTEpIGFuZCAoeDIseTIpIGNvbGxpbmVhcj9cbiAgICAvLyBFcXVpdmFsZW50bHksIGlzICh4MSx5MSkgY29pbmNpZGVudCB3aXRoICh4Mix5Mik/XG4gICAgLy8gT3IsIGlzIHRoZSByYWRpdXMgemVybz8gTGluZSB0byAoeDEseTEpLlxuICAgIGVsc2UgaWYgKCEoTWF0aC5hYnMoeTAxICogeDIxIC0geTIxICogeDAxKSA+IGVwc2lsb24pIHx8ICFyKSB7XG4gICAgICB0aGlzLl8gKz0gXCJMXCIgKyAodGhpcy5feDEgPSB4MSkgKyBcIixcIiArICh0aGlzLl95MSA9IHkxKTtcbiAgICB9XG5cbiAgICAvLyBPdGhlcndpc2UsIGRyYXcgYW4gYXJjIVxuICAgIGVsc2Uge1xuICAgICAgdmFyIHgyMCA9IHgyIC0geDAsXG4gICAgICAgICAgeTIwID0geTIgLSB5MCxcbiAgICAgICAgICBsMjFfMiA9IHgyMSAqIHgyMSArIHkyMSAqIHkyMSxcbiAgICAgICAgICBsMjBfMiA9IHgyMCAqIHgyMCArIHkyMCAqIHkyMCxcbiAgICAgICAgICBsMjEgPSBNYXRoLnNxcnQobDIxXzIpLFxuICAgICAgICAgIGwwMSA9IE1hdGguc3FydChsMDFfMiksXG4gICAgICAgICAgbCA9IHIgKiBNYXRoLnRhbigocGkgLSBNYXRoLmFjb3MoKGwyMV8yICsgbDAxXzIgLSBsMjBfMikgLyAoMiAqIGwyMSAqIGwwMSkpKSAvIDIpLFxuICAgICAgICAgIHQwMSA9IGwgLyBsMDEsXG4gICAgICAgICAgdDIxID0gbCAvIGwyMTtcblxuICAgICAgLy8gSWYgdGhlIHN0YXJ0IHRhbmdlbnQgaXMgbm90IGNvaW5jaWRlbnQgd2l0aCAoeDAseTApLCBsaW5lIHRvLlxuICAgICAgaWYgKE1hdGguYWJzKHQwMSAtIDEpID4gZXBzaWxvbikge1xuICAgICAgICB0aGlzLl8gKz0gXCJMXCIgKyAoeDEgKyB0MDEgKiB4MDEpICsgXCIsXCIgKyAoeTEgKyB0MDEgKiB5MDEpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl8gKz0gXCJBXCIgKyByICsgXCIsXCIgKyByICsgXCIsMCwwLFwiICsgKCsoeTAxICogeDIwID4geDAxICogeTIwKSkgKyBcIixcIiArICh0aGlzLl94MSA9IHgxICsgdDIxICogeDIxKSArIFwiLFwiICsgKHRoaXMuX3kxID0geTEgKyB0MjEgKiB5MjEpO1xuICAgIH1cbiAgfSxcbiAgYXJjOiBmdW5jdGlvbih4LCB5LCByLCBhMCwgYTEsIGNjdykge1xuICAgIHggPSAreCwgeSA9ICt5LCByID0gK3IsIGNjdyA9ICEhY2N3O1xuICAgIHZhciBkeCA9IHIgKiBNYXRoLmNvcyhhMCksXG4gICAgICAgIGR5ID0gciAqIE1hdGguc2luKGEwKSxcbiAgICAgICAgeDAgPSB4ICsgZHgsXG4gICAgICAgIHkwID0geSArIGR5LFxuICAgICAgICBjdyA9IDEgXiBjY3csXG4gICAgICAgIGRhID0gY2N3ID8gYTAgLSBhMSA6IGExIC0gYTA7XG5cbiAgICAvLyBJcyB0aGUgcmFkaXVzIG5lZ2F0aXZlPyBFcnJvci5cbiAgICBpZiAociA8IDApIHRocm93IG5ldyBFcnJvcihcIm5lZ2F0aXZlIHJhZGl1czogXCIgKyByKTtcblxuICAgIC8vIElzIHRoaXMgcGF0aCBlbXB0eT8gTW92ZSB0byAoeDAseTApLlxuICAgIGlmICh0aGlzLl94MSA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5fICs9IFwiTVwiICsgeDAgKyBcIixcIiArIHkwO1xuICAgIH1cblxuICAgIC8vIE9yLCBpcyAoeDAseTApIG5vdCBjb2luY2lkZW50IHdpdGggdGhlIHByZXZpb3VzIHBvaW50PyBMaW5lIHRvICh4MCx5MCkuXG4gICAgZWxzZSBpZiAoTWF0aC5hYnModGhpcy5feDEgLSB4MCkgPiBlcHNpbG9uIHx8IE1hdGguYWJzKHRoaXMuX3kxIC0geTApID4gZXBzaWxvbikge1xuICAgICAgdGhpcy5fICs9IFwiTFwiICsgeDAgKyBcIixcIiArIHkwO1xuICAgIH1cblxuICAgIC8vIElzIHRoaXMgYXJjIGVtcHR5PyBXZVx1MjAxOXJlIGRvbmUuXG4gICAgaWYgKCFyKSByZXR1cm47XG5cbiAgICAvLyBEb2VzIHRoZSBhbmdsZSBnbyB0aGUgd3Jvbmcgd2F5PyBGbGlwIHRoZSBkaXJlY3Rpb24uXG4gICAgaWYgKGRhIDwgMCkgZGEgPSBkYSAlIHRhdSArIHRhdTtcblxuICAgIC8vIElzIHRoaXMgYSBjb21wbGV0ZSBjaXJjbGU/IERyYXcgdHdvIGFyY3MgdG8gY29tcGxldGUgdGhlIGNpcmNsZS5cbiAgICBpZiAoZGEgPiB0YXVFcHNpbG9uKSB7XG4gICAgICB0aGlzLl8gKz0gXCJBXCIgKyByICsgXCIsXCIgKyByICsgXCIsMCwxLFwiICsgY3cgKyBcIixcIiArICh4IC0gZHgpICsgXCIsXCIgKyAoeSAtIGR5KSArIFwiQVwiICsgciArIFwiLFwiICsgciArIFwiLDAsMSxcIiArIGN3ICsgXCIsXCIgKyAodGhpcy5feDEgPSB4MCkgKyBcIixcIiArICh0aGlzLl95MSA9IHkwKTtcbiAgICB9XG5cbiAgICAvLyBJcyB0aGlzIGFyYyBub24tZW1wdHk/IERyYXcgYW4gYXJjIVxuICAgIGVsc2UgaWYgKGRhID4gZXBzaWxvbikge1xuICAgICAgdGhpcy5fICs9IFwiQVwiICsgciArIFwiLFwiICsgciArIFwiLDAsXCIgKyAoKyhkYSA+PSBwaSkpICsgXCIsXCIgKyBjdyArIFwiLFwiICsgKHRoaXMuX3gxID0geCArIHIgKiBNYXRoLmNvcyhhMSkpICsgXCIsXCIgKyAodGhpcy5feTEgPSB5ICsgciAqIE1hdGguc2luKGExKSk7XG4gICAgfVxuICB9LFxuICByZWN0OiBmdW5jdGlvbih4LCB5LCB3LCBoKSB7XG4gICAgdGhpcy5fICs9IFwiTVwiICsgKHRoaXMuX3gwID0gdGhpcy5feDEgPSAreCkgKyBcIixcIiArICh0aGlzLl95MCA9IHRoaXMuX3kxID0gK3kpICsgXCJoXCIgKyAoK3cpICsgXCJ2XCIgKyAoK2gpICsgXCJoXCIgKyAoLXcpICsgXCJaXCI7XG4gIH0sXG4gIHRvU3RyaW5nOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBwYXRoO1xuIiwgImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHgpIHtcbiAgcmV0dXJuIE1hdGguYWJzKHggPSBNYXRoLnJvdW5kKHgpKSA+PSAxZTIxXG4gICAgICA/IHgudG9Mb2NhbGVTdHJpbmcoXCJlblwiKS5yZXBsYWNlKC8sL2csIFwiXCIpXG4gICAgICA6IHgudG9TdHJpbmcoMTApO1xufVxuXG4vLyBDb21wdXRlcyB0aGUgZGVjaW1hbCBjb2VmZmljaWVudCBhbmQgZXhwb25lbnQgb2YgdGhlIHNwZWNpZmllZCBudW1iZXIgeCB3aXRoXG4vLyBzaWduaWZpY2FudCBkaWdpdHMgcCwgd2hlcmUgeCBpcyBwb3NpdGl2ZSBhbmQgcCBpcyBpbiBbMSwgMjFdIG9yIHVuZGVmaW5lZC5cbi8vIEZvciBleGFtcGxlLCBmb3JtYXREZWNpbWFsUGFydHMoMS4yMykgcmV0dXJucyBbXCIxMjNcIiwgMF0uXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0RGVjaW1hbFBhcnRzKHgsIHApIHtcbiAgaWYgKChpID0gKHggPSBwID8geC50b0V4cG9uZW50aWFsKHAgLSAxKSA6IHgudG9FeHBvbmVudGlhbCgpKS5pbmRleE9mKFwiZVwiKSkgPCAwKSByZXR1cm4gbnVsbDsgLy8gTmFOLCBcdTAwQjFJbmZpbml0eVxuICB2YXIgaSwgY29lZmZpY2llbnQgPSB4LnNsaWNlKDAsIGkpO1xuXG4gIC8vIFRoZSBzdHJpbmcgcmV0dXJuZWQgYnkgdG9FeHBvbmVudGlhbCBlaXRoZXIgaGFzIHRoZSBmb3JtIFxcZFxcLlxcZCtlWy0rXVxcZCtcbiAgLy8gKGUuZy4sIDEuMmUrMykgb3IgdGhlIGZvcm0gXFxkZVstK11cXGQrIChlLmcuLCAxZSszKS5cbiAgcmV0dXJuIFtcbiAgICBjb2VmZmljaWVudC5sZW5ndGggPiAxID8gY29lZmZpY2llbnRbMF0gKyBjb2VmZmljaWVudC5zbGljZSgyKSA6IGNvZWZmaWNpZW50LFxuICAgICt4LnNsaWNlKGkgKyAxKVxuICBdO1xufVxuIiwgImltcG9ydCB7Zm9ybWF0RGVjaW1hbFBhcnRzfSBmcm9tIFwiLi9mb3JtYXREZWNpbWFsLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHgpIHtcbiAgcmV0dXJuIHggPSBmb3JtYXREZWNpbWFsUGFydHMoTWF0aC5hYnMoeCkpLCB4ID8geFsxXSA6IE5hTjtcbn1cbiIsICJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihncm91cGluZywgdGhvdXNhbmRzKSB7XG4gIHJldHVybiBmdW5jdGlvbih2YWx1ZSwgd2lkdGgpIHtcbiAgICB2YXIgaSA9IHZhbHVlLmxlbmd0aCxcbiAgICAgICAgdCA9IFtdLFxuICAgICAgICBqID0gMCxcbiAgICAgICAgZyA9IGdyb3VwaW5nWzBdLFxuICAgICAgICBsZW5ndGggPSAwO1xuXG4gICAgd2hpbGUgKGkgPiAwICYmIGcgPiAwKSB7XG4gICAgICBpZiAobGVuZ3RoICsgZyArIDEgPiB3aWR0aCkgZyA9IE1hdGgubWF4KDEsIHdpZHRoIC0gbGVuZ3RoKTtcbiAgICAgIHQucHVzaCh2YWx1ZS5zdWJzdHJpbmcoaSAtPSBnLCBpICsgZykpO1xuICAgICAgaWYgKChsZW5ndGggKz0gZyArIDEpID4gd2lkdGgpIGJyZWFrO1xuICAgICAgZyA9IGdyb3VwaW5nW2ogPSAoaiArIDEpICUgZ3JvdXBpbmcubGVuZ3RoXTtcbiAgICB9XG5cbiAgICByZXR1cm4gdC5yZXZlcnNlKCkuam9pbih0aG91c2FuZHMpO1xuICB9O1xufVxuIiwgImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG51bWVyYWxzKSB7XG4gIHJldHVybiBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZS5yZXBsYWNlKC9bMC05XS9nLCBmdW5jdGlvbihpKSB7XG4gICAgICByZXR1cm4gbnVtZXJhbHNbK2ldO1xuICAgIH0pO1xuICB9O1xufVxuIiwgIi8vIFtbZmlsbF1hbGlnbl1bc2lnbl1bc3ltYm9sXVswXVt3aWR0aF1bLF1bLnByZWNpc2lvbl1bfl1bdHlwZV1cbnZhciByZSA9IC9eKD86KC4pPyhbPD49Xl0pKT8oWytcXC0oIF0pPyhbJCNdKT8oMCk/KFxcZCspPygsKT8oXFwuXFxkKyk/KH4pPyhbYS16JV0pPyQvaTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZm9ybWF0U3BlY2lmaWVyKHNwZWNpZmllcikge1xuICBpZiAoIShtYXRjaCA9IHJlLmV4ZWMoc3BlY2lmaWVyKSkpIHRocm93IG5ldyBFcnJvcihcImludmFsaWQgZm9ybWF0OiBcIiArIHNwZWNpZmllcik7XG4gIHZhciBtYXRjaDtcbiAgcmV0dXJuIG5ldyBGb3JtYXRTcGVjaWZpZXIoe1xuICAgIGZpbGw6IG1hdGNoWzFdLFxuICAgIGFsaWduOiBtYXRjaFsyXSxcbiAgICBzaWduOiBtYXRjaFszXSxcbiAgICBzeW1ib2w6IG1hdGNoWzRdLFxuICAgIHplcm86IG1hdGNoWzVdLFxuICAgIHdpZHRoOiBtYXRjaFs2XSxcbiAgICBjb21tYTogbWF0Y2hbN10sXG4gICAgcHJlY2lzaW9uOiBtYXRjaFs4XSAmJiBtYXRjaFs4XS5zbGljZSgxKSxcbiAgICB0cmltOiBtYXRjaFs5XSxcbiAgICB0eXBlOiBtYXRjaFsxMF1cbiAgfSk7XG59XG5cbmZvcm1hdFNwZWNpZmllci5wcm90b3R5cGUgPSBGb3JtYXRTcGVjaWZpZXIucHJvdG90eXBlOyAvLyBpbnN0YW5jZW9mXG5cbmV4cG9ydCBmdW5jdGlvbiBGb3JtYXRTcGVjaWZpZXIoc3BlY2lmaWVyKSB7XG4gIHRoaXMuZmlsbCA9IHNwZWNpZmllci5maWxsID09PSB1bmRlZmluZWQgPyBcIiBcIiA6IHNwZWNpZmllci5maWxsICsgXCJcIjtcbiAgdGhpcy5hbGlnbiA9IHNwZWNpZmllci5hbGlnbiA9PT0gdW5kZWZpbmVkID8gXCI+XCIgOiBzcGVjaWZpZXIuYWxpZ24gKyBcIlwiO1xuICB0aGlzLnNpZ24gPSBzcGVjaWZpZXIuc2lnbiA9PT0gdW5kZWZpbmVkID8gXCItXCIgOiBzcGVjaWZpZXIuc2lnbiArIFwiXCI7XG4gIHRoaXMuc3ltYm9sID0gc3BlY2lmaWVyLnN5bWJvbCA9PT0gdW5kZWZpbmVkID8gXCJcIiA6IHNwZWNpZmllci5zeW1ib2wgKyBcIlwiO1xuICB0aGlzLnplcm8gPSAhIXNwZWNpZmllci56ZXJvO1xuICB0aGlzLndpZHRoID0gc3BlY2lmaWVyLndpZHRoID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiArc3BlY2lmaWVyLndpZHRoO1xuICB0aGlzLmNvbW1hID0gISFzcGVjaWZpZXIuY29tbWE7XG4gIHRoaXMucHJlY2lzaW9uID0gc3BlY2lmaWVyLnByZWNpc2lvbiA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogK3NwZWNpZmllci5wcmVjaXNpb247XG4gIHRoaXMudHJpbSA9ICEhc3BlY2lmaWVyLnRyaW07XG4gIHRoaXMudHlwZSA9IHNwZWNpZmllci50eXBlID09PSB1bmRlZmluZWQgPyBcIlwiIDogc3BlY2lmaWVyLnR5cGUgKyBcIlwiO1xufVxuXG5Gb3JtYXRTcGVjaWZpZXIucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmZpbGxcbiAgICAgICsgdGhpcy5hbGlnblxuICAgICAgKyB0aGlzLnNpZ25cbiAgICAgICsgdGhpcy5zeW1ib2xcbiAgICAgICsgKHRoaXMuemVybyA/IFwiMFwiIDogXCJcIilcbiAgICAgICsgKHRoaXMud2lkdGggPT09IHVuZGVmaW5lZCA/IFwiXCIgOiBNYXRoLm1heCgxLCB0aGlzLndpZHRoIHwgMCkpXG4gICAgICArICh0aGlzLmNvbW1hID8gXCIsXCIgOiBcIlwiKVxuICAgICAgKyAodGhpcy5wcmVjaXNpb24gPT09IHVuZGVmaW5lZCA/IFwiXCIgOiBcIi5cIiArIE1hdGgubWF4KDAsIHRoaXMucHJlY2lzaW9uIHwgMCkpXG4gICAgICArICh0aGlzLnRyaW0gPyBcIn5cIiA6IFwiXCIpXG4gICAgICArIHRoaXMudHlwZTtcbn07XG4iLCAiLy8gVHJpbXMgaW5zaWduaWZpY2FudCB6ZXJvcywgZS5nLiwgcmVwbGFjZXMgMS4yMDAwayB3aXRoIDEuMmsuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihzKSB7XG4gIG91dDogZm9yICh2YXIgbiA9IHMubGVuZ3RoLCBpID0gMSwgaTAgPSAtMSwgaTE7IGkgPCBuOyArK2kpIHtcbiAgICBzd2l0Y2ggKHNbaV0pIHtcbiAgICAgIGNhc2UgXCIuXCI6IGkwID0gaTEgPSBpOyBicmVhaztcbiAgICAgIGNhc2UgXCIwXCI6IGlmIChpMCA9PT0gMCkgaTAgPSBpOyBpMSA9IGk7IGJyZWFrO1xuICAgICAgZGVmYXVsdDogaWYgKCErc1tpXSkgYnJlYWsgb3V0OyBpZiAoaTAgPiAwKSBpMCA9IDA7IGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gaTAgPiAwID8gcy5zbGljZSgwLCBpMCkgKyBzLnNsaWNlKGkxICsgMSkgOiBzO1xufVxuIiwgImltcG9ydCB7Zm9ybWF0RGVjaW1hbFBhcnRzfSBmcm9tIFwiLi9mb3JtYXREZWNpbWFsLmpzXCI7XG5cbmV4cG9ydCB2YXIgcHJlZml4RXhwb25lbnQ7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHgsIHApIHtcbiAgdmFyIGQgPSBmb3JtYXREZWNpbWFsUGFydHMoeCwgcCk7XG4gIGlmICghZCkgcmV0dXJuIHggKyBcIlwiO1xuICB2YXIgY29lZmZpY2llbnQgPSBkWzBdLFxuICAgICAgZXhwb25lbnQgPSBkWzFdLFxuICAgICAgaSA9IGV4cG9uZW50IC0gKHByZWZpeEV4cG9uZW50ID0gTWF0aC5tYXgoLTgsIE1hdGgubWluKDgsIE1hdGguZmxvb3IoZXhwb25lbnQgLyAzKSkpICogMykgKyAxLFxuICAgICAgbiA9IGNvZWZmaWNpZW50Lmxlbmd0aDtcbiAgcmV0dXJuIGkgPT09IG4gPyBjb2VmZmljaWVudFxuICAgICAgOiBpID4gbiA/IGNvZWZmaWNpZW50ICsgbmV3IEFycmF5KGkgLSBuICsgMSkuam9pbihcIjBcIilcbiAgICAgIDogaSA+IDAgPyBjb2VmZmljaWVudC5zbGljZSgwLCBpKSArIFwiLlwiICsgY29lZmZpY2llbnQuc2xpY2UoaSlcbiAgICAgIDogXCIwLlwiICsgbmV3IEFycmF5KDEgLSBpKS5qb2luKFwiMFwiKSArIGZvcm1hdERlY2ltYWxQYXJ0cyh4LCBNYXRoLm1heCgwLCBwICsgaSAtIDEpKVswXTsgLy8gbGVzcyB0aGFuIDF5IVxufVxuIiwgImltcG9ydCB7Zm9ybWF0RGVjaW1hbFBhcnRzfSBmcm9tIFwiLi9mb3JtYXREZWNpbWFsLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHgsIHApIHtcbiAgdmFyIGQgPSBmb3JtYXREZWNpbWFsUGFydHMoeCwgcCk7XG4gIGlmICghZCkgcmV0dXJuIHggKyBcIlwiO1xuICB2YXIgY29lZmZpY2llbnQgPSBkWzBdLFxuICAgICAgZXhwb25lbnQgPSBkWzFdO1xuICByZXR1cm4gZXhwb25lbnQgPCAwID8gXCIwLlwiICsgbmV3IEFycmF5KC1leHBvbmVudCkuam9pbihcIjBcIikgKyBjb2VmZmljaWVudFxuICAgICAgOiBjb2VmZmljaWVudC5sZW5ndGggPiBleHBvbmVudCArIDEgPyBjb2VmZmljaWVudC5zbGljZSgwLCBleHBvbmVudCArIDEpICsgXCIuXCIgKyBjb2VmZmljaWVudC5zbGljZShleHBvbmVudCArIDEpXG4gICAgICA6IGNvZWZmaWNpZW50ICsgbmV3IEFycmF5KGV4cG9uZW50IC0gY29lZmZpY2llbnQubGVuZ3RoICsgMikuam9pbihcIjBcIik7XG59XG4iLCAiaW1wb3J0IGZvcm1hdERlY2ltYWwgZnJvbSBcIi4vZm9ybWF0RGVjaW1hbC5qc1wiO1xuaW1wb3J0IGZvcm1hdFByZWZpeEF1dG8gZnJvbSBcIi4vZm9ybWF0UHJlZml4QXV0by5qc1wiO1xuaW1wb3J0IGZvcm1hdFJvdW5kZWQgZnJvbSBcIi4vZm9ybWF0Um91bmRlZC5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIFwiJVwiOiAoeCwgcCkgPT4gKHggKiAxMDApLnRvRml4ZWQocCksXG4gIFwiYlwiOiAoeCkgPT4gTWF0aC5yb3VuZCh4KS50b1N0cmluZygyKSxcbiAgXCJjXCI6ICh4KSA9PiB4ICsgXCJcIixcbiAgXCJkXCI6IGZvcm1hdERlY2ltYWwsXG4gIFwiZVwiOiAoeCwgcCkgPT4geC50b0V4cG9uZW50aWFsKHApLFxuICBcImZcIjogKHgsIHApID0+IHgudG9GaXhlZChwKSxcbiAgXCJnXCI6ICh4LCBwKSA9PiB4LnRvUHJlY2lzaW9uKHApLFxuICBcIm9cIjogKHgpID0+IE1hdGgucm91bmQoeCkudG9TdHJpbmcoOCksXG4gIFwicFwiOiAoeCwgcCkgPT4gZm9ybWF0Um91bmRlZCh4ICogMTAwLCBwKSxcbiAgXCJyXCI6IGZvcm1hdFJvdW5kZWQsXG4gIFwic1wiOiBmb3JtYXRQcmVmaXhBdXRvLFxuICBcIlhcIjogKHgpID0+IE1hdGgucm91bmQoeCkudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCksXG4gIFwieFwiOiAoeCkgPT4gTWF0aC5yb3VuZCh4KS50b1N0cmluZygxNilcbn07XG4iLCAiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oeCkge1xuICByZXR1cm4geDtcbn1cbiIsICJpbXBvcnQgZXhwb25lbnQgZnJvbSBcIi4vZXhwb25lbnQuanNcIjtcbmltcG9ydCBmb3JtYXRHcm91cCBmcm9tIFwiLi9mb3JtYXRHcm91cC5qc1wiO1xuaW1wb3J0IGZvcm1hdE51bWVyYWxzIGZyb20gXCIuL2Zvcm1hdE51bWVyYWxzLmpzXCI7XG5pbXBvcnQgZm9ybWF0U3BlY2lmaWVyIGZyb20gXCIuL2Zvcm1hdFNwZWNpZmllci5qc1wiO1xuaW1wb3J0IGZvcm1hdFRyaW0gZnJvbSBcIi4vZm9ybWF0VHJpbS5qc1wiO1xuaW1wb3J0IGZvcm1hdFR5cGVzIGZyb20gXCIuL2Zvcm1hdFR5cGVzLmpzXCI7XG5pbXBvcnQge3ByZWZpeEV4cG9uZW50fSBmcm9tIFwiLi9mb3JtYXRQcmVmaXhBdXRvLmpzXCI7XG5pbXBvcnQgaWRlbnRpdHkgZnJvbSBcIi4vaWRlbnRpdHkuanNcIjtcblxudmFyIG1hcCA9IEFycmF5LnByb3RvdHlwZS5tYXAsXG4gICAgcHJlZml4ZXMgPSBbXCJ5XCIsXCJ6XCIsXCJhXCIsXCJmXCIsXCJwXCIsXCJuXCIsXCJcdTAwQjVcIixcIm1cIixcIlwiLFwia1wiLFwiTVwiLFwiR1wiLFwiVFwiLFwiUFwiLFwiRVwiLFwiWlwiLFwiWVwiXTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obG9jYWxlKSB7XG4gIHZhciBncm91cCA9IGxvY2FsZS5ncm91cGluZyA9PT0gdW5kZWZpbmVkIHx8IGxvY2FsZS50aG91c2FuZHMgPT09IHVuZGVmaW5lZCA/IGlkZW50aXR5IDogZm9ybWF0R3JvdXAobWFwLmNhbGwobG9jYWxlLmdyb3VwaW5nLCBOdW1iZXIpLCBsb2NhbGUudGhvdXNhbmRzICsgXCJcIiksXG4gICAgICBjdXJyZW5jeVByZWZpeCA9IGxvY2FsZS5jdXJyZW5jeSA9PT0gdW5kZWZpbmVkID8gXCJcIiA6IGxvY2FsZS5jdXJyZW5jeVswXSArIFwiXCIsXG4gICAgICBjdXJyZW5jeVN1ZmZpeCA9IGxvY2FsZS5jdXJyZW5jeSA9PT0gdW5kZWZpbmVkID8gXCJcIiA6IGxvY2FsZS5jdXJyZW5jeVsxXSArIFwiXCIsXG4gICAgICBkZWNpbWFsID0gbG9jYWxlLmRlY2ltYWwgPT09IHVuZGVmaW5lZCA/IFwiLlwiIDogbG9jYWxlLmRlY2ltYWwgKyBcIlwiLFxuICAgICAgbnVtZXJhbHMgPSBsb2NhbGUubnVtZXJhbHMgPT09IHVuZGVmaW5lZCA/IGlkZW50aXR5IDogZm9ybWF0TnVtZXJhbHMobWFwLmNhbGwobG9jYWxlLm51bWVyYWxzLCBTdHJpbmcpKSxcbiAgICAgIHBlcmNlbnQgPSBsb2NhbGUucGVyY2VudCA9PT0gdW5kZWZpbmVkID8gXCIlXCIgOiBsb2NhbGUucGVyY2VudCArIFwiXCIsXG4gICAgICBtaW51cyA9IGxvY2FsZS5taW51cyA9PT0gdW5kZWZpbmVkID8gXCJcdTIyMTJcIiA6IGxvY2FsZS5taW51cyArIFwiXCIsXG4gICAgICBuYW4gPSBsb2NhbGUubmFuID09PSB1bmRlZmluZWQgPyBcIk5hTlwiIDogbG9jYWxlLm5hbiArIFwiXCI7XG5cbiAgZnVuY3Rpb24gbmV3Rm9ybWF0KHNwZWNpZmllcikge1xuICAgIHNwZWNpZmllciA9IGZvcm1hdFNwZWNpZmllcihzcGVjaWZpZXIpO1xuXG4gICAgdmFyIGZpbGwgPSBzcGVjaWZpZXIuZmlsbCxcbiAgICAgICAgYWxpZ24gPSBzcGVjaWZpZXIuYWxpZ24sXG4gICAgICAgIHNpZ24gPSBzcGVjaWZpZXIuc2lnbixcbiAgICAgICAgc3ltYm9sID0gc3BlY2lmaWVyLnN5bWJvbCxcbiAgICAgICAgemVybyA9IHNwZWNpZmllci56ZXJvLFxuICAgICAgICB3aWR0aCA9IHNwZWNpZmllci53aWR0aCxcbiAgICAgICAgY29tbWEgPSBzcGVjaWZpZXIuY29tbWEsXG4gICAgICAgIHByZWNpc2lvbiA9IHNwZWNpZmllci5wcmVjaXNpb24sXG4gICAgICAgIHRyaW0gPSBzcGVjaWZpZXIudHJpbSxcbiAgICAgICAgdHlwZSA9IHNwZWNpZmllci50eXBlO1xuXG4gICAgLy8gVGhlIFwiblwiIHR5cGUgaXMgYW4gYWxpYXMgZm9yIFwiLGdcIi5cbiAgICBpZiAodHlwZSA9PT0gXCJuXCIpIGNvbW1hID0gdHJ1ZSwgdHlwZSA9IFwiZ1wiO1xuXG4gICAgLy8gVGhlIFwiXCIgdHlwZSwgYW5kIGFueSBpbnZhbGlkIHR5cGUsIGlzIGFuIGFsaWFzIGZvciBcIi4xMn5nXCIuXG4gICAgZWxzZSBpZiAoIWZvcm1hdFR5cGVzW3R5cGVdKSBwcmVjaXNpb24gPT09IHVuZGVmaW5lZCAmJiAocHJlY2lzaW9uID0gMTIpLCB0cmltID0gdHJ1ZSwgdHlwZSA9IFwiZ1wiO1xuXG4gICAgLy8gSWYgemVybyBmaWxsIGlzIHNwZWNpZmllZCwgcGFkZGluZyBnb2VzIGFmdGVyIHNpZ24gYW5kIGJlZm9yZSBkaWdpdHMuXG4gICAgaWYgKHplcm8gfHwgKGZpbGwgPT09IFwiMFwiICYmIGFsaWduID09PSBcIj1cIikpIHplcm8gPSB0cnVlLCBmaWxsID0gXCIwXCIsIGFsaWduID0gXCI9XCI7XG5cbiAgICAvLyBDb21wdXRlIHRoZSBwcmVmaXggYW5kIHN1ZmZpeC5cbiAgICAvLyBGb3IgU0ktcHJlZml4LCB0aGUgc3VmZml4IGlzIGxhemlseSBjb21wdXRlZC5cbiAgICB2YXIgcHJlZml4ID0gc3ltYm9sID09PSBcIiRcIiA/IGN1cnJlbmN5UHJlZml4IDogc3ltYm9sID09PSBcIiNcIiAmJiAvW2JveFhdLy50ZXN0KHR5cGUpID8gXCIwXCIgKyB0eXBlLnRvTG93ZXJDYXNlKCkgOiBcIlwiLFxuICAgICAgICBzdWZmaXggPSBzeW1ib2wgPT09IFwiJFwiID8gY3VycmVuY3lTdWZmaXggOiAvWyVwXS8udGVzdCh0eXBlKSA/IHBlcmNlbnQgOiBcIlwiO1xuXG4gICAgLy8gV2hhdCBmb3JtYXQgZnVuY3Rpb24gc2hvdWxkIHdlIHVzZT9cbiAgICAvLyBJcyB0aGlzIGFuIGludGVnZXIgdHlwZT9cbiAgICAvLyBDYW4gdGhpcyB0eXBlIGdlbmVyYXRlIGV4cG9uZW50aWFsIG5vdGF0aW9uP1xuICAgIHZhciBmb3JtYXRUeXBlID0gZm9ybWF0VHlwZXNbdHlwZV0sXG4gICAgICAgIG1heWJlU3VmZml4ID0gL1tkZWZncHJzJV0vLnRlc3QodHlwZSk7XG5cbiAgICAvLyBTZXQgdGhlIGRlZmF1bHQgcHJlY2lzaW9uIGlmIG5vdCBzcGVjaWZpZWQsXG4gICAgLy8gb3IgY2xhbXAgdGhlIHNwZWNpZmllZCBwcmVjaXNpb24gdG8gdGhlIHN1cHBvcnRlZCByYW5nZS5cbiAgICAvLyBGb3Igc2lnbmlmaWNhbnQgcHJlY2lzaW9uLCBpdCBtdXN0IGJlIGluIFsxLCAyMV0uXG4gICAgLy8gRm9yIGZpeGVkIHByZWNpc2lvbiwgaXQgbXVzdCBiZSBpbiBbMCwgMjBdLlxuICAgIHByZWNpc2lvbiA9IHByZWNpc2lvbiA9PT0gdW5kZWZpbmVkID8gNlxuICAgICAgICA6IC9bZ3Byc10vLnRlc3QodHlwZSkgPyBNYXRoLm1heCgxLCBNYXRoLm1pbigyMSwgcHJlY2lzaW9uKSlcbiAgICAgICAgOiBNYXRoLm1heCgwLCBNYXRoLm1pbigyMCwgcHJlY2lzaW9uKSk7XG5cbiAgICBmdW5jdGlvbiBmb3JtYXQodmFsdWUpIHtcbiAgICAgIHZhciB2YWx1ZVByZWZpeCA9IHByZWZpeCxcbiAgICAgICAgICB2YWx1ZVN1ZmZpeCA9IHN1ZmZpeCxcbiAgICAgICAgICBpLCBuLCBjO1xuXG4gICAgICBpZiAodHlwZSA9PT0gXCJjXCIpIHtcbiAgICAgICAgdmFsdWVTdWZmaXggPSBmb3JtYXRUeXBlKHZhbHVlKSArIHZhbHVlU3VmZml4O1xuICAgICAgICB2YWx1ZSA9IFwiXCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWx1ZSA9ICt2YWx1ZTtcblxuICAgICAgICAvLyBEZXRlcm1pbmUgdGhlIHNpZ24uIC0wIGlzIG5vdCBsZXNzIHRoYW4gMCwgYnV0IDEgLyAtMCBpcyFcbiAgICAgICAgdmFyIHZhbHVlTmVnYXRpdmUgPSB2YWx1ZSA8IDAgfHwgMSAvIHZhbHVlIDwgMDtcblxuICAgICAgICAvLyBQZXJmb3JtIHRoZSBpbml0aWFsIGZvcm1hdHRpbmcuXG4gICAgICAgIHZhbHVlID0gaXNOYU4odmFsdWUpID8gbmFuIDogZm9ybWF0VHlwZShNYXRoLmFicyh2YWx1ZSksIHByZWNpc2lvbik7XG5cbiAgICAgICAgLy8gVHJpbSBpbnNpZ25pZmljYW50IHplcm9zLlxuICAgICAgICBpZiAodHJpbSkgdmFsdWUgPSBmb3JtYXRUcmltKHZhbHVlKTtcblxuICAgICAgICAvLyBJZiBhIG5lZ2F0aXZlIHZhbHVlIHJvdW5kcyB0byB6ZXJvIGFmdGVyIGZvcm1hdHRpbmcsIGFuZCBubyBleHBsaWNpdCBwb3NpdGl2ZSBzaWduIGlzIHJlcXVlc3RlZCwgaGlkZSB0aGUgc2lnbi5cbiAgICAgICAgaWYgKHZhbHVlTmVnYXRpdmUgJiYgK3ZhbHVlID09PSAwICYmIHNpZ24gIT09IFwiK1wiKSB2YWx1ZU5lZ2F0aXZlID0gZmFsc2U7XG5cbiAgICAgICAgLy8gQ29tcHV0ZSB0aGUgcHJlZml4IGFuZCBzdWZmaXguXG4gICAgICAgIHZhbHVlUHJlZml4ID0gKHZhbHVlTmVnYXRpdmUgPyAoc2lnbiA9PT0gXCIoXCIgPyBzaWduIDogbWludXMpIDogc2lnbiA9PT0gXCItXCIgfHwgc2lnbiA9PT0gXCIoXCIgPyBcIlwiIDogc2lnbikgKyB2YWx1ZVByZWZpeDtcbiAgICAgICAgdmFsdWVTdWZmaXggPSAodHlwZSA9PT0gXCJzXCIgPyBwcmVmaXhlc1s4ICsgcHJlZml4RXhwb25lbnQgLyAzXSA6IFwiXCIpICsgdmFsdWVTdWZmaXggKyAodmFsdWVOZWdhdGl2ZSAmJiBzaWduID09PSBcIihcIiA/IFwiKVwiIDogXCJcIik7XG5cbiAgICAgICAgLy8gQnJlYWsgdGhlIGZvcm1hdHRlZCB2YWx1ZSBpbnRvIHRoZSBpbnRlZ2VyIFx1MjAxQ3ZhbHVlXHUyMDFEIHBhcnQgdGhhdCBjYW4gYmVcbiAgICAgICAgLy8gZ3JvdXBlZCwgYW5kIGZyYWN0aW9uYWwgb3IgZXhwb25lbnRpYWwgXHUyMDFDc3VmZml4XHUyMDFEIHBhcnQgdGhhdCBpcyBub3QuXG4gICAgICAgIGlmIChtYXliZVN1ZmZpeCkge1xuICAgICAgICAgIGkgPSAtMSwgbiA9IHZhbHVlLmxlbmd0aDtcbiAgICAgICAgICB3aGlsZSAoKytpIDwgbikge1xuICAgICAgICAgICAgaWYgKGMgPSB2YWx1ZS5jaGFyQ29kZUF0KGkpLCA0OCA+IGMgfHwgYyA+IDU3KSB7XG4gICAgICAgICAgICAgIHZhbHVlU3VmZml4ID0gKGMgPT09IDQ2ID8gZGVjaW1hbCArIHZhbHVlLnNsaWNlKGkgKyAxKSA6IHZhbHVlLnNsaWNlKGkpKSArIHZhbHVlU3VmZml4O1xuICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnNsaWNlKDAsIGkpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gSWYgdGhlIGZpbGwgY2hhcmFjdGVyIGlzIG5vdCBcIjBcIiwgZ3JvdXBpbmcgaXMgYXBwbGllZCBiZWZvcmUgcGFkZGluZy5cbiAgICAgIGlmIChjb21tYSAmJiAhemVybykgdmFsdWUgPSBncm91cCh2YWx1ZSwgSW5maW5pdHkpO1xuXG4gICAgICAvLyBDb21wdXRlIHRoZSBwYWRkaW5nLlxuICAgICAgdmFyIGxlbmd0aCA9IHZhbHVlUHJlZml4Lmxlbmd0aCArIHZhbHVlLmxlbmd0aCArIHZhbHVlU3VmZml4Lmxlbmd0aCxcbiAgICAgICAgICBwYWRkaW5nID0gbGVuZ3RoIDwgd2lkdGggPyBuZXcgQXJyYXkod2lkdGggLSBsZW5ndGggKyAxKS5qb2luKGZpbGwpIDogXCJcIjtcblxuICAgICAgLy8gSWYgdGhlIGZpbGwgY2hhcmFjdGVyIGlzIFwiMFwiLCBncm91cGluZyBpcyBhcHBsaWVkIGFmdGVyIHBhZGRpbmcuXG4gICAgICBpZiAoY29tbWEgJiYgemVybykgdmFsdWUgPSBncm91cChwYWRkaW5nICsgdmFsdWUsIHBhZGRpbmcubGVuZ3RoID8gd2lkdGggLSB2YWx1ZVN1ZmZpeC5sZW5ndGggOiBJbmZpbml0eSksIHBhZGRpbmcgPSBcIlwiO1xuXG4gICAgICAvLyBSZWNvbnN0cnVjdCB0aGUgZmluYWwgb3V0cHV0IGJhc2VkIG9uIHRoZSBkZXNpcmVkIGFsaWdubWVudC5cbiAgICAgIHN3aXRjaCAoYWxpZ24pIHtcbiAgICAgICAgY2FzZSBcIjxcIjogdmFsdWUgPSB2YWx1ZVByZWZpeCArIHZhbHVlICsgdmFsdWVTdWZmaXggKyBwYWRkaW5nOyBicmVhaztcbiAgICAgICAgY2FzZSBcIj1cIjogdmFsdWUgPSB2YWx1ZVByZWZpeCArIHBhZGRpbmcgKyB2YWx1ZSArIHZhbHVlU3VmZml4OyBicmVhaztcbiAgICAgICAgY2FzZSBcIl5cIjogdmFsdWUgPSBwYWRkaW5nLnNsaWNlKDAsIGxlbmd0aCA9IHBhZGRpbmcubGVuZ3RoID4+IDEpICsgdmFsdWVQcmVmaXggKyB2YWx1ZSArIHZhbHVlU3VmZml4ICsgcGFkZGluZy5zbGljZShsZW5ndGgpOyBicmVhaztcbiAgICAgICAgZGVmYXVsdDogdmFsdWUgPSBwYWRkaW5nICsgdmFsdWVQcmVmaXggKyB2YWx1ZSArIHZhbHVlU3VmZml4OyBicmVhaztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG51bWVyYWxzKHZhbHVlKTtcbiAgICB9XG5cbiAgICBmb3JtYXQudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBzcGVjaWZpZXIgKyBcIlwiO1xuICAgIH07XG5cbiAgICByZXR1cm4gZm9ybWF0O1xuICB9XG5cbiAgZnVuY3Rpb24gZm9ybWF0UHJlZml4KHNwZWNpZmllciwgdmFsdWUpIHtcbiAgICB2YXIgZiA9IG5ld0Zvcm1hdCgoc3BlY2lmaWVyID0gZm9ybWF0U3BlY2lmaWVyKHNwZWNpZmllciksIHNwZWNpZmllci50eXBlID0gXCJmXCIsIHNwZWNpZmllcikpLFxuICAgICAgICBlID0gTWF0aC5tYXgoLTgsIE1hdGgubWluKDgsIE1hdGguZmxvb3IoZXhwb25lbnQodmFsdWUpIC8gMykpKSAqIDMsXG4gICAgICAgIGsgPSBNYXRoLnBvdygxMCwgLWUpLFxuICAgICAgICBwcmVmaXggPSBwcmVmaXhlc1s4ICsgZSAvIDNdO1xuICAgIHJldHVybiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgcmV0dXJuIGYoayAqIHZhbHVlKSArIHByZWZpeDtcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBmb3JtYXQ6IG5ld0Zvcm1hdCxcbiAgICBmb3JtYXRQcmVmaXg6IGZvcm1hdFByZWZpeFxuICB9O1xufVxuIiwgImltcG9ydCBmb3JtYXRMb2NhbGUgZnJvbSBcIi4vbG9jYWxlLmpzXCI7XG5cbnZhciBsb2NhbGU7XG5leHBvcnQgdmFyIGZvcm1hdDtcbmV4cG9ydCB2YXIgZm9ybWF0UHJlZml4O1xuXG5kZWZhdWx0TG9jYWxlKHtcbiAgdGhvdXNhbmRzOiBcIixcIixcbiAgZ3JvdXBpbmc6IFszXSxcbiAgY3VycmVuY3k6IFtcIiRcIiwgXCJcIl1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkZWZhdWx0TG9jYWxlKGRlZmluaXRpb24pIHtcbiAgbG9jYWxlID0gZm9ybWF0TG9jYWxlKGRlZmluaXRpb24pO1xuICBmb3JtYXQgPSBsb2NhbGUuZm9ybWF0O1xuICBmb3JtYXRQcmVmaXggPSBsb2NhbGUuZm9ybWF0UHJlZml4O1xuICByZXR1cm4gbG9jYWxlO1xufVxuIiwgImltcG9ydCBleHBvbmVudCBmcm9tIFwiLi9leHBvbmVudC5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihzdGVwKSB7XG4gIHJldHVybiBNYXRoLm1heCgwLCAtZXhwb25lbnQoTWF0aC5hYnMoc3RlcCkpKTtcbn1cbiIsICJpbXBvcnQgZXhwb25lbnQgZnJvbSBcIi4vZXhwb25lbnQuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oc3RlcCwgdmFsdWUpIHtcbiAgcmV0dXJuIE1hdGgubWF4KDAsIE1hdGgubWF4KC04LCBNYXRoLm1pbig4LCBNYXRoLmZsb29yKGV4cG9uZW50KHZhbHVlKSAvIDMpKSkgKiAzIC0gZXhwb25lbnQoTWF0aC5hYnMoc3RlcCkpKTtcbn1cbiIsICJpbXBvcnQgZXhwb25lbnQgZnJvbSBcIi4vZXhwb25lbnQuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oc3RlcCwgbWF4KSB7XG4gIHN0ZXAgPSBNYXRoLmFicyhzdGVwKSwgbWF4ID0gTWF0aC5hYnMobWF4KSAtIHN0ZXA7XG4gIHJldHVybiBNYXRoLm1heCgwLCBleHBvbmVudChtYXgpIC0gZXhwb25lbnQoc3RlcCkpICsgMTtcbn1cbiIsICJleHBvcnQgZnVuY3Rpb24gaW5pdFJhbmdlKGRvbWFpbiwgcmFuZ2UpIHtcbiAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgY2FzZSAwOiBicmVhaztcbiAgICBjYXNlIDE6IHRoaXMucmFuZ2UoZG9tYWluKTsgYnJlYWs7XG4gICAgZGVmYXVsdDogdGhpcy5yYW5nZShyYW5nZSkuZG9tYWluKGRvbWFpbik7IGJyZWFrO1xuICB9XG4gIHJldHVybiB0aGlzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5pdEludGVycG9sYXRvcihkb21haW4sIGludGVycG9sYXRvcikge1xuICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICBjYXNlIDA6IGJyZWFrO1xuICAgIGNhc2UgMToge1xuICAgICAgaWYgKHR5cGVvZiBkb21haW4gPT09IFwiZnVuY3Rpb25cIikgdGhpcy5pbnRlcnBvbGF0b3IoZG9tYWluKTtcbiAgICAgIGVsc2UgdGhpcy5yYW5nZShkb21haW4pO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGRlZmF1bHQ6IHtcbiAgICAgIHRoaXMuZG9tYWluKGRvbWFpbik7XG4gICAgICBpZiAodHlwZW9mIGludGVycG9sYXRvciA9PT0gXCJmdW5jdGlvblwiKSB0aGlzLmludGVycG9sYXRvcihpbnRlcnBvbGF0b3IpO1xuICAgICAgZWxzZSB0aGlzLnJhbmdlKGludGVycG9sYXRvcik7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59XG4iLCAiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29uc3RhbnRzKHgpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB4O1xuICB9O1xufVxuIiwgImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG51bWJlcih4KSB7XG4gIHJldHVybiAreDtcbn1cbiIsICJpbXBvcnQge2Jpc2VjdH0gZnJvbSBcImQzLWFycmF5XCI7XG5pbXBvcnQge2ludGVycG9sYXRlIGFzIGludGVycG9sYXRlVmFsdWUsIGludGVycG9sYXRlTnVtYmVyLCBpbnRlcnBvbGF0ZVJvdW5kfSBmcm9tIFwiZDMtaW50ZXJwb2xhdGVcIjtcbmltcG9ydCBjb25zdGFudCBmcm9tIFwiLi9jb25zdGFudC5qc1wiO1xuaW1wb3J0IG51bWJlciBmcm9tIFwiLi9udW1iZXIuanNcIjtcblxudmFyIHVuaXQgPSBbMCwgMV07XG5cbmV4cG9ydCBmdW5jdGlvbiBpZGVudGl0eSh4KSB7XG4gIHJldHVybiB4O1xufVxuXG5mdW5jdGlvbiBub3JtYWxpemUoYSwgYikge1xuICByZXR1cm4gKGIgLT0gKGEgPSArYSkpXG4gICAgICA/IGZ1bmN0aW9uKHgpIHsgcmV0dXJuICh4IC0gYSkgLyBiOyB9XG4gICAgICA6IGNvbnN0YW50KGlzTmFOKGIpID8gTmFOIDogMC41KTtcbn1cblxuZnVuY3Rpb24gY2xhbXBlcihhLCBiKSB7XG4gIHZhciB0O1xuICBpZiAoYSA+IGIpIHQgPSBhLCBhID0gYiwgYiA9IHQ7XG4gIHJldHVybiBmdW5jdGlvbih4KSB7IHJldHVybiBNYXRoLm1heChhLCBNYXRoLm1pbihiLCB4KSk7IH07XG59XG5cbi8vIG5vcm1hbGl6ZShhLCBiKSh4KSB0YWtlcyBhIGRvbWFpbiB2YWx1ZSB4IGluIFthLGJdIGFuZCByZXR1cm5zIHRoZSBjb3JyZXNwb25kaW5nIHBhcmFtZXRlciB0IGluIFswLDFdLlxuLy8gaW50ZXJwb2xhdGUoYSwgYikodCkgdGFrZXMgYSBwYXJhbWV0ZXIgdCBpbiBbMCwxXSBhbmQgcmV0dXJucyB0aGUgY29ycmVzcG9uZGluZyByYW5nZSB2YWx1ZSB4IGluIFthLGJdLlxuZnVuY3Rpb24gYmltYXAoZG9tYWluLCByYW5nZSwgaW50ZXJwb2xhdGUpIHtcbiAgdmFyIGQwID0gZG9tYWluWzBdLCBkMSA9IGRvbWFpblsxXSwgcjAgPSByYW5nZVswXSwgcjEgPSByYW5nZVsxXTtcbiAgaWYgKGQxIDwgZDApIGQwID0gbm9ybWFsaXplKGQxLCBkMCksIHIwID0gaW50ZXJwb2xhdGUocjEsIHIwKTtcbiAgZWxzZSBkMCA9IG5vcm1hbGl6ZShkMCwgZDEpLCByMCA9IGludGVycG9sYXRlKHIwLCByMSk7XG4gIHJldHVybiBmdW5jdGlvbih4KSB7IHJldHVybiByMChkMCh4KSk7IH07XG59XG5cbmZ1bmN0aW9uIHBvbHltYXAoZG9tYWluLCByYW5nZSwgaW50ZXJwb2xhdGUpIHtcbiAgdmFyIGogPSBNYXRoLm1pbihkb21haW4ubGVuZ3RoLCByYW5nZS5sZW5ndGgpIC0gMSxcbiAgICAgIGQgPSBuZXcgQXJyYXkoaiksXG4gICAgICByID0gbmV3IEFycmF5KGopLFxuICAgICAgaSA9IC0xO1xuXG4gIC8vIFJldmVyc2UgZGVzY2VuZGluZyBkb21haW5zLlxuICBpZiAoZG9tYWluW2pdIDwgZG9tYWluWzBdKSB7XG4gICAgZG9tYWluID0gZG9tYWluLnNsaWNlKCkucmV2ZXJzZSgpO1xuICAgIHJhbmdlID0gcmFuZ2Uuc2xpY2UoKS5yZXZlcnNlKCk7XG4gIH1cblxuICB3aGlsZSAoKytpIDwgaikge1xuICAgIGRbaV0gPSBub3JtYWxpemUoZG9tYWluW2ldLCBkb21haW5baSArIDFdKTtcbiAgICByW2ldID0gaW50ZXJwb2xhdGUocmFuZ2VbaV0sIHJhbmdlW2kgKyAxXSk7XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24oeCkge1xuICAgIHZhciBpID0gYmlzZWN0KGRvbWFpbiwgeCwgMSwgaikgLSAxO1xuICAgIHJldHVybiByW2ldKGRbaV0oeCkpO1xuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29weShzb3VyY2UsIHRhcmdldCkge1xuICByZXR1cm4gdGFyZ2V0XG4gICAgICAuZG9tYWluKHNvdXJjZS5kb21haW4oKSlcbiAgICAgIC5yYW5nZShzb3VyY2UucmFuZ2UoKSlcbiAgICAgIC5pbnRlcnBvbGF0ZShzb3VyY2UuaW50ZXJwb2xhdGUoKSlcbiAgICAgIC5jbGFtcChzb3VyY2UuY2xhbXAoKSlcbiAgICAgIC51bmtub3duKHNvdXJjZS51bmtub3duKCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNmb3JtZXIoKSB7XG4gIHZhciBkb21haW4gPSB1bml0LFxuICAgICAgcmFuZ2UgPSB1bml0LFxuICAgICAgaW50ZXJwb2xhdGUgPSBpbnRlcnBvbGF0ZVZhbHVlLFxuICAgICAgdHJhbnNmb3JtLFxuICAgICAgdW50cmFuc2Zvcm0sXG4gICAgICB1bmtub3duLFxuICAgICAgY2xhbXAgPSBpZGVudGl0eSxcbiAgICAgIHBpZWNld2lzZSxcbiAgICAgIG91dHB1dCxcbiAgICAgIGlucHV0O1xuXG4gIGZ1bmN0aW9uIHJlc2NhbGUoKSB7XG4gICAgdmFyIG4gPSBNYXRoLm1pbihkb21haW4ubGVuZ3RoLCByYW5nZS5sZW5ndGgpO1xuICAgIGlmIChjbGFtcCAhPT0gaWRlbnRpdHkpIGNsYW1wID0gY2xhbXBlcihkb21haW5bMF0sIGRvbWFpbltuIC0gMV0pO1xuICAgIHBpZWNld2lzZSA9IG4gPiAyID8gcG9seW1hcCA6IGJpbWFwO1xuICAgIG91dHB1dCA9IGlucHV0ID0gbnVsbDtcbiAgICByZXR1cm4gc2NhbGU7XG4gIH1cblxuICBmdW5jdGlvbiBzY2FsZSh4KSB7XG4gICAgcmV0dXJuIHggPT0gbnVsbCB8fCBpc05hTih4ID0gK3gpID8gdW5rbm93biA6IChvdXRwdXQgfHwgKG91dHB1dCA9IHBpZWNld2lzZShkb21haW4ubWFwKHRyYW5zZm9ybSksIHJhbmdlLCBpbnRlcnBvbGF0ZSkpKSh0cmFuc2Zvcm0oY2xhbXAoeCkpKTtcbiAgfVxuXG4gIHNjYWxlLmludmVydCA9IGZ1bmN0aW9uKHkpIHtcbiAgICByZXR1cm4gY2xhbXAodW50cmFuc2Zvcm0oKGlucHV0IHx8IChpbnB1dCA9IHBpZWNld2lzZShyYW5nZSwgZG9tYWluLm1hcCh0cmFuc2Zvcm0pLCBpbnRlcnBvbGF0ZU51bWJlcikpKSh5KSkpO1xuICB9O1xuXG4gIHNjYWxlLmRvbWFpbiA9IGZ1bmN0aW9uKF8pIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IChkb21haW4gPSBBcnJheS5mcm9tKF8sIG51bWJlciksIHJlc2NhbGUoKSkgOiBkb21haW4uc2xpY2UoKTtcbiAgfTtcblxuICBzY2FsZS5yYW5nZSA9IGZ1bmN0aW9uKF8pIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IChyYW5nZSA9IEFycmF5LmZyb20oXyksIHJlc2NhbGUoKSkgOiByYW5nZS5zbGljZSgpO1xuICB9O1xuXG4gIHNjYWxlLnJhbmdlUm91bmQgPSBmdW5jdGlvbihfKSB7XG4gICAgcmV0dXJuIHJhbmdlID0gQXJyYXkuZnJvbShfKSwgaW50ZXJwb2xhdGUgPSBpbnRlcnBvbGF0ZVJvdW5kLCByZXNjYWxlKCk7XG4gIH07XG5cbiAgc2NhbGUuY2xhbXAgPSBmdW5jdGlvbihfKSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAoY2xhbXAgPSBfID8gdHJ1ZSA6IGlkZW50aXR5LCByZXNjYWxlKCkpIDogY2xhbXAgIT09IGlkZW50aXR5O1xuICB9O1xuXG4gIHNjYWxlLmludGVycG9sYXRlID0gZnVuY3Rpb24oXykge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKGludGVycG9sYXRlID0gXywgcmVzY2FsZSgpKSA6IGludGVycG9sYXRlO1xuICB9O1xuXG4gIHNjYWxlLnVua25vd24gPSBmdW5jdGlvbihfKSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAodW5rbm93biA9IF8sIHNjYWxlKSA6IHVua25vd247XG4gIH07XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKHQsIHUpIHtcbiAgICB0cmFuc2Zvcm0gPSB0LCB1bnRyYW5zZm9ybSA9IHU7XG4gICAgcmV0dXJuIHJlc2NhbGUoKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udGludW91cygpIHtcbiAgcmV0dXJuIHRyYW5zZm9ybWVyKCkoaWRlbnRpdHksIGlkZW50aXR5KTtcbn1cbiIsICJpbXBvcnQge3RpY2tTdGVwfSBmcm9tIFwiZDMtYXJyYXlcIjtcbmltcG9ydCB7Zm9ybWF0LCBmb3JtYXRQcmVmaXgsIGZvcm1hdFNwZWNpZmllciwgcHJlY2lzaW9uRml4ZWQsIHByZWNpc2lvblByZWZpeCwgcHJlY2lzaW9uUm91bmR9IGZyb20gXCJkMy1mb3JtYXRcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdGlja0Zvcm1hdChzdGFydCwgc3RvcCwgY291bnQsIHNwZWNpZmllcikge1xuICB2YXIgc3RlcCA9IHRpY2tTdGVwKHN0YXJ0LCBzdG9wLCBjb3VudCksXG4gICAgICBwcmVjaXNpb247XG4gIHNwZWNpZmllciA9IGZvcm1hdFNwZWNpZmllcihzcGVjaWZpZXIgPT0gbnVsbCA/IFwiLGZcIiA6IHNwZWNpZmllcik7XG4gIHN3aXRjaCAoc3BlY2lmaWVyLnR5cGUpIHtcbiAgICBjYXNlIFwic1wiOiB7XG4gICAgICB2YXIgdmFsdWUgPSBNYXRoLm1heChNYXRoLmFicyhzdGFydCksIE1hdGguYWJzKHN0b3ApKTtcbiAgICAgIGlmIChzcGVjaWZpZXIucHJlY2lzaW9uID09IG51bGwgJiYgIWlzTmFOKHByZWNpc2lvbiA9IHByZWNpc2lvblByZWZpeChzdGVwLCB2YWx1ZSkpKSBzcGVjaWZpZXIucHJlY2lzaW9uID0gcHJlY2lzaW9uO1xuICAgICAgcmV0dXJuIGZvcm1hdFByZWZpeChzcGVjaWZpZXIsIHZhbHVlKTtcbiAgICB9XG4gICAgY2FzZSBcIlwiOlxuICAgIGNhc2UgXCJlXCI6XG4gICAgY2FzZSBcImdcIjpcbiAgICBjYXNlIFwicFwiOlxuICAgIGNhc2UgXCJyXCI6IHtcbiAgICAgIGlmIChzcGVjaWZpZXIucHJlY2lzaW9uID09IG51bGwgJiYgIWlzTmFOKHByZWNpc2lvbiA9IHByZWNpc2lvblJvdW5kKHN0ZXAsIE1hdGgubWF4KE1hdGguYWJzKHN0YXJ0KSwgTWF0aC5hYnMoc3RvcCkpKSkpIHNwZWNpZmllci5wcmVjaXNpb24gPSBwcmVjaXNpb24gLSAoc3BlY2lmaWVyLnR5cGUgPT09IFwiZVwiKTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBjYXNlIFwiZlwiOlxuICAgIGNhc2UgXCIlXCI6IHtcbiAgICAgIGlmIChzcGVjaWZpZXIucHJlY2lzaW9uID09IG51bGwgJiYgIWlzTmFOKHByZWNpc2lvbiA9IHByZWNpc2lvbkZpeGVkKHN0ZXApKSkgc3BlY2lmaWVyLnByZWNpc2lvbiA9IHByZWNpc2lvbiAtIChzcGVjaWZpZXIudHlwZSA9PT0gXCIlXCIpICogMjtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZm9ybWF0KHNwZWNpZmllcik7XG59XG4iLCAiaW1wb3J0IHt0aWNrcywgdGlja0luY3JlbWVudH0gZnJvbSBcImQzLWFycmF5XCI7XG5pbXBvcnQgY29udGludW91cywge2NvcHl9IGZyb20gXCIuL2NvbnRpbnVvdXMuanNcIjtcbmltcG9ydCB7aW5pdFJhbmdlfSBmcm9tIFwiLi9pbml0LmpzXCI7XG5pbXBvcnQgdGlja0Zvcm1hdCBmcm9tIFwiLi90aWNrRm9ybWF0LmpzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBsaW5lYXJpc2goc2NhbGUpIHtcbiAgdmFyIGRvbWFpbiA9IHNjYWxlLmRvbWFpbjtcblxuICBzY2FsZS50aWNrcyA9IGZ1bmN0aW9uKGNvdW50KSB7XG4gICAgdmFyIGQgPSBkb21haW4oKTtcbiAgICByZXR1cm4gdGlja3MoZFswXSwgZFtkLmxlbmd0aCAtIDFdLCBjb3VudCA9PSBudWxsID8gMTAgOiBjb3VudCk7XG4gIH07XG5cbiAgc2NhbGUudGlja0Zvcm1hdCA9IGZ1bmN0aW9uKGNvdW50LCBzcGVjaWZpZXIpIHtcbiAgICB2YXIgZCA9IGRvbWFpbigpO1xuICAgIHJldHVybiB0aWNrRm9ybWF0KGRbMF0sIGRbZC5sZW5ndGggLSAxXSwgY291bnQgPT0gbnVsbCA/IDEwIDogY291bnQsIHNwZWNpZmllcik7XG4gIH07XG5cbiAgc2NhbGUubmljZSA9IGZ1bmN0aW9uKGNvdW50KSB7XG4gICAgaWYgKGNvdW50ID09IG51bGwpIGNvdW50ID0gMTA7XG5cbiAgICB2YXIgZCA9IGRvbWFpbigpO1xuICAgIHZhciBpMCA9IDA7XG4gICAgdmFyIGkxID0gZC5sZW5ndGggLSAxO1xuICAgIHZhciBzdGFydCA9IGRbaTBdO1xuICAgIHZhciBzdG9wID0gZFtpMV07XG4gICAgdmFyIHByZXN0ZXA7XG4gICAgdmFyIHN0ZXA7XG4gICAgdmFyIG1heEl0ZXIgPSAxMDtcblxuICAgIGlmIChzdG9wIDwgc3RhcnQpIHtcbiAgICAgIHN0ZXAgPSBzdGFydCwgc3RhcnQgPSBzdG9wLCBzdG9wID0gc3RlcDtcbiAgICAgIHN0ZXAgPSBpMCwgaTAgPSBpMSwgaTEgPSBzdGVwO1xuICAgIH1cbiAgICBcbiAgICB3aGlsZSAobWF4SXRlci0tID4gMCkge1xuICAgICAgc3RlcCA9IHRpY2tJbmNyZW1lbnQoc3RhcnQsIHN0b3AsIGNvdW50KTtcbiAgICAgIGlmIChzdGVwID09PSBwcmVzdGVwKSB7XG4gICAgICAgIGRbaTBdID0gc3RhcnRcbiAgICAgICAgZFtpMV0gPSBzdG9wXG4gICAgICAgIHJldHVybiBkb21haW4oZCk7XG4gICAgICB9IGVsc2UgaWYgKHN0ZXAgPiAwKSB7XG4gICAgICAgIHN0YXJ0ID0gTWF0aC5mbG9vcihzdGFydCAvIHN0ZXApICogc3RlcDtcbiAgICAgICAgc3RvcCA9IE1hdGguY2VpbChzdG9wIC8gc3RlcCkgKiBzdGVwO1xuICAgICAgfSBlbHNlIGlmIChzdGVwIDwgMCkge1xuICAgICAgICBzdGFydCA9IE1hdGguY2VpbChzdGFydCAqIHN0ZXApIC8gc3RlcDtcbiAgICAgICAgc3RvcCA9IE1hdGguZmxvb3Ioc3RvcCAqIHN0ZXApIC8gc3RlcDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgcHJlc3RlcCA9IHN0ZXA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNjYWxlO1xuICB9O1xuXG4gIHJldHVybiBzY2FsZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbGluZWFyKCkge1xuICB2YXIgc2NhbGUgPSBjb250aW51b3VzKCk7XG5cbiAgc2NhbGUuY29weSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBjb3B5KHNjYWxlLCBsaW5lYXIoKSk7XG4gIH07XG5cbiAgaW5pdFJhbmdlLmFwcGx5KHNjYWxlLCBhcmd1bWVudHMpO1xuXG4gIHJldHVybiBsaW5lYXJpc2goc2NhbGUpO1xufVxuIiwgImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHgpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGNvbnN0YW50KCkge1xuICAgIHJldHVybiB4O1xuICB9O1xufVxuIiwgImV4cG9ydCBjb25zdCBhYnMgPSBNYXRoLmFicztcbmV4cG9ydCBjb25zdCBhdGFuMiA9IE1hdGguYXRhbjI7XG5leHBvcnQgY29uc3QgY29zID0gTWF0aC5jb3M7XG5leHBvcnQgY29uc3QgbWF4ID0gTWF0aC5tYXg7XG5leHBvcnQgY29uc3QgbWluID0gTWF0aC5taW47XG5leHBvcnQgY29uc3Qgc2luID0gTWF0aC5zaW47XG5leHBvcnQgY29uc3Qgc3FydCA9IE1hdGguc3FydDtcblxuZXhwb3J0IGNvbnN0IGVwc2lsb24gPSAxZS0xMjtcbmV4cG9ydCBjb25zdCBwaSA9IE1hdGguUEk7XG5leHBvcnQgY29uc3QgaGFsZlBpID0gcGkgLyAyO1xuZXhwb3J0IGNvbnN0IHRhdSA9IDIgKiBwaTtcblxuZXhwb3J0IGZ1bmN0aW9uIGFjb3MoeCkge1xuICByZXR1cm4geCA+IDEgPyAwIDogeCA8IC0xID8gcGkgOiBNYXRoLmFjb3MoeCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc2luKHgpIHtcbiAgcmV0dXJuIHggPj0gMSA/IGhhbGZQaSA6IHggPD0gLTEgPyAtaGFsZlBpIDogTWF0aC5hc2luKHgpO1xufVxuIiwgImV4cG9ydCB2YXIgc2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHgpIHtcbiAgcmV0dXJuIHR5cGVvZiB4ID09PSBcIm9iamVjdFwiICYmIFwibGVuZ3RoXCIgaW4geFxuICAgID8geCAvLyBBcnJheSwgVHlwZWRBcnJheSwgTm9kZUxpc3QsIGFycmF5LWxpa2VcbiAgICA6IEFycmF5LmZyb20oeCk7IC8vIE1hcCwgU2V0LCBpdGVyYWJsZSwgc3RyaW5nLCBvciBhbnl0aGluZyBlbHNlXG59XG4iLCAiZnVuY3Rpb24gTGluZWFyKGNvbnRleHQpIHtcbiAgdGhpcy5fY29udGV4dCA9IGNvbnRleHQ7XG59XG5cbkxpbmVhci5wcm90b3R5cGUgPSB7XG4gIGFyZWFTdGFydDogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5fbGluZSA9IDA7XG4gIH0sXG4gIGFyZWFFbmQ6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX2xpbmUgPSBOYU47XG4gIH0sXG4gIGxpbmVTdGFydDogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5fcG9pbnQgPSAwO1xuICB9LFxuICBsaW5lRW5kOiBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy5fbGluZSB8fCAodGhpcy5fbGluZSAhPT0gMCAmJiB0aGlzLl9wb2ludCA9PT0gMSkpIHRoaXMuX2NvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgdGhpcy5fbGluZSA9IDEgLSB0aGlzLl9saW5lO1xuICB9LFxuICBwb2ludDogZnVuY3Rpb24oeCwgeSkge1xuICAgIHggPSAreCwgeSA9ICt5O1xuICAgIHN3aXRjaCAodGhpcy5fcG9pbnQpIHtcbiAgICAgIGNhc2UgMDogdGhpcy5fcG9pbnQgPSAxOyB0aGlzLl9saW5lID8gdGhpcy5fY29udGV4dC5saW5lVG8oeCwgeSkgOiB0aGlzLl9jb250ZXh0Lm1vdmVUbyh4LCB5KTsgYnJlYWs7XG4gICAgICBjYXNlIDE6IHRoaXMuX3BvaW50ID0gMjsgLy8gZmFsbHMgdGhyb3VnaFxuICAgICAgZGVmYXVsdDogdGhpcy5fY29udGV4dC5saW5lVG8oeCwgeSk7IGJyZWFrO1xuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oY29udGV4dCkge1xuICByZXR1cm4gbmV3IExpbmVhcihjb250ZXh0KTtcbn1cbiIsICJleHBvcnQgZnVuY3Rpb24geChwKSB7XG4gIHJldHVybiBwWzBdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24geShwKSB7XG4gIHJldHVybiBwWzFdO1xufVxuIiwgImltcG9ydCB7cGF0aH0gZnJvbSBcImQzLXBhdGhcIjtcbmltcG9ydCBhcnJheSBmcm9tIFwiLi9hcnJheS5qc1wiO1xuaW1wb3J0IGNvbnN0YW50IGZyb20gXCIuL2NvbnN0YW50LmpzXCI7XG5pbXBvcnQgY3VydmVMaW5lYXIgZnJvbSBcIi4vY3VydmUvbGluZWFyLmpzXCI7XG5pbXBvcnQge3ggYXMgcG9pbnRYLCB5IGFzIHBvaW50WX0gZnJvbSBcIi4vcG9pbnQuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oeCwgeSkge1xuICB2YXIgZGVmaW5lZCA9IGNvbnN0YW50KHRydWUpLFxuICAgICAgY29udGV4dCA9IG51bGwsXG4gICAgICBjdXJ2ZSA9IGN1cnZlTGluZWFyLFxuICAgICAgb3V0cHV0ID0gbnVsbDtcblxuICB4ID0gdHlwZW9mIHggPT09IFwiZnVuY3Rpb25cIiA/IHggOiAoeCA9PT0gdW5kZWZpbmVkKSA/IHBvaW50WCA6IGNvbnN0YW50KHgpO1xuICB5ID0gdHlwZW9mIHkgPT09IFwiZnVuY3Rpb25cIiA/IHkgOiAoeSA9PT0gdW5kZWZpbmVkKSA/IHBvaW50WSA6IGNvbnN0YW50KHkpO1xuXG4gIGZ1bmN0aW9uIGxpbmUoZGF0YSkge1xuICAgIHZhciBpLFxuICAgICAgICBuID0gKGRhdGEgPSBhcnJheShkYXRhKSkubGVuZ3RoLFxuICAgICAgICBkLFxuICAgICAgICBkZWZpbmVkMCA9IGZhbHNlLFxuICAgICAgICBidWZmZXI7XG5cbiAgICBpZiAoY29udGV4dCA9PSBudWxsKSBvdXRwdXQgPSBjdXJ2ZShidWZmZXIgPSBwYXRoKCkpO1xuXG4gICAgZm9yIChpID0gMDsgaSA8PSBuOyArK2kpIHtcbiAgICAgIGlmICghKGkgPCBuICYmIGRlZmluZWQoZCA9IGRhdGFbaV0sIGksIGRhdGEpKSA9PT0gZGVmaW5lZDApIHtcbiAgICAgICAgaWYgKGRlZmluZWQwID0gIWRlZmluZWQwKSBvdXRwdXQubGluZVN0YXJ0KCk7XG4gICAgICAgIGVsc2Ugb3V0cHV0LmxpbmVFbmQoKTtcbiAgICAgIH1cbiAgICAgIGlmIChkZWZpbmVkMCkgb3V0cHV0LnBvaW50KCt4KGQsIGksIGRhdGEpLCAreShkLCBpLCBkYXRhKSk7XG4gICAgfVxuXG4gICAgaWYgKGJ1ZmZlcikgcmV0dXJuIG91dHB1dCA9IG51bGwsIGJ1ZmZlciArIFwiXCIgfHwgbnVsbDtcbiAgfVxuXG4gIGxpbmUueCA9IGZ1bmN0aW9uKF8pIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/ICh4ID0gdHlwZW9mIF8gPT09IFwiZnVuY3Rpb25cIiA/IF8gOiBjb25zdGFudCgrXyksIGxpbmUpIDogeDtcbiAgfTtcblxuICBsaW5lLnkgPSBmdW5jdGlvbihfKSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAoeSA9IHR5cGVvZiBfID09PSBcImZ1bmN0aW9uXCIgPyBfIDogY29uc3RhbnQoK18pLCBsaW5lKSA6IHk7XG4gIH07XG5cbiAgbGluZS5kZWZpbmVkID0gZnVuY3Rpb24oXykge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKGRlZmluZWQgPSB0eXBlb2YgXyA9PT0gXCJmdW5jdGlvblwiID8gXyA6IGNvbnN0YW50KCEhXyksIGxpbmUpIDogZGVmaW5lZDtcbiAgfTtcblxuICBsaW5lLmN1cnZlID0gZnVuY3Rpb24oXykge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKGN1cnZlID0gXywgY29udGV4dCAhPSBudWxsICYmIChvdXRwdXQgPSBjdXJ2ZShjb250ZXh0KSksIGxpbmUpIDogY3VydmU7XG4gIH07XG5cbiAgbGluZS5jb250ZXh0ID0gZnVuY3Rpb24oXykge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKF8gPT0gbnVsbCA/IGNvbnRleHQgPSBvdXRwdXQgPSBudWxsIDogb3V0cHV0ID0gY3VydmUoY29udGV4dCA9IF8pLCBsaW5lKSA6IGNvbnRleHQ7XG4gIH07XG5cbiAgcmV0dXJuIGxpbmU7XG59XG4iLCAiZXhwb3J0IGZ1bmN0aW9uIHBvaW50KHRoYXQsIHgsIHkpIHtcbiAgdGhhdC5fY29udGV4dC5iZXppZXJDdXJ2ZVRvKFxuICAgIHRoYXQuX3gxICsgdGhhdC5fayAqICh0aGF0Ll94MiAtIHRoYXQuX3gwKSxcbiAgICB0aGF0Ll95MSArIHRoYXQuX2sgKiAodGhhdC5feTIgLSB0aGF0Ll95MCksXG4gICAgdGhhdC5feDIgKyB0aGF0Ll9rICogKHRoYXQuX3gxIC0geCksXG4gICAgdGhhdC5feTIgKyB0aGF0Ll9rICogKHRoYXQuX3kxIC0geSksXG4gICAgdGhhdC5feDIsXG4gICAgdGhhdC5feTJcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIENhcmRpbmFsKGNvbnRleHQsIHRlbnNpb24pIHtcbiAgdGhpcy5fY29udGV4dCA9IGNvbnRleHQ7XG4gIHRoaXMuX2sgPSAoMSAtIHRlbnNpb24pIC8gNjtcbn1cblxuQ2FyZGluYWwucHJvdG90eXBlID0ge1xuICBhcmVhU3RhcnQ6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX2xpbmUgPSAwO1xuICB9LFxuICBhcmVhRW5kOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLl9saW5lID0gTmFOO1xuICB9LFxuICBsaW5lU3RhcnQ6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX3gwID0gdGhpcy5feDEgPSB0aGlzLl94MiA9XG4gICAgdGhpcy5feTAgPSB0aGlzLl95MSA9IHRoaXMuX3kyID0gTmFOO1xuICAgIHRoaXMuX3BvaW50ID0gMDtcbiAgfSxcbiAgbGluZUVuZDogZnVuY3Rpb24oKSB7XG4gICAgc3dpdGNoICh0aGlzLl9wb2ludCkge1xuICAgICAgY2FzZSAyOiB0aGlzLl9jb250ZXh0LmxpbmVUbyh0aGlzLl94MiwgdGhpcy5feTIpOyBicmVhaztcbiAgICAgIGNhc2UgMzogcG9pbnQodGhpcywgdGhpcy5feDEsIHRoaXMuX3kxKTsgYnJlYWs7XG4gICAgfVxuICAgIGlmICh0aGlzLl9saW5lIHx8ICh0aGlzLl9saW5lICE9PSAwICYmIHRoaXMuX3BvaW50ID09PSAxKSkgdGhpcy5fY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICB0aGlzLl9saW5lID0gMSAtIHRoaXMuX2xpbmU7XG4gIH0sXG4gIHBvaW50OiBmdW5jdGlvbih4LCB5KSB7XG4gICAgeCA9ICt4LCB5ID0gK3k7XG4gICAgc3dpdGNoICh0aGlzLl9wb2ludCkge1xuICAgICAgY2FzZSAwOiB0aGlzLl9wb2ludCA9IDE7IHRoaXMuX2xpbmUgPyB0aGlzLl9jb250ZXh0LmxpbmVUbyh4LCB5KSA6IHRoaXMuX2NvbnRleHQubW92ZVRvKHgsIHkpOyBicmVhaztcbiAgICAgIGNhc2UgMTogdGhpcy5fcG9pbnQgPSAyOyB0aGlzLl94MSA9IHgsIHRoaXMuX3kxID0geTsgYnJlYWs7XG4gICAgICBjYXNlIDI6IHRoaXMuX3BvaW50ID0gMzsgLy8gZmFsbHMgdGhyb3VnaFxuICAgICAgZGVmYXVsdDogcG9pbnQodGhpcywgeCwgeSk7IGJyZWFrO1xuICAgIH1cbiAgICB0aGlzLl94MCA9IHRoaXMuX3gxLCB0aGlzLl94MSA9IHRoaXMuX3gyLCB0aGlzLl94MiA9IHg7XG4gICAgdGhpcy5feTAgPSB0aGlzLl95MSwgdGhpcy5feTEgPSB0aGlzLl95MiwgdGhpcy5feTIgPSB5O1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCAoZnVuY3Rpb24gY3VzdG9tKHRlbnNpb24pIHtcblxuICBmdW5jdGlvbiBjYXJkaW5hbChjb250ZXh0KSB7XG4gICAgcmV0dXJuIG5ldyBDYXJkaW5hbChjb250ZXh0LCB0ZW5zaW9uKTtcbiAgfVxuXG4gIGNhcmRpbmFsLnRlbnNpb24gPSBmdW5jdGlvbih0ZW5zaW9uKSB7XG4gICAgcmV0dXJuIGN1c3RvbSgrdGVuc2lvbik7XG4gIH07XG5cbiAgcmV0dXJuIGNhcmRpbmFsO1xufSkoMCk7XG4iLCAiaW1wb3J0IHtlcHNpbG9ufSBmcm9tIFwiLi4vbWF0aC5qc1wiO1xuaW1wb3J0IHtDYXJkaW5hbH0gZnJvbSBcIi4vY2FyZGluYWwuanNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHBvaW50KHRoYXQsIHgsIHkpIHtcbiAgdmFyIHgxID0gdGhhdC5feDEsXG4gICAgICB5MSA9IHRoYXQuX3kxLFxuICAgICAgeDIgPSB0aGF0Ll94MixcbiAgICAgIHkyID0gdGhhdC5feTI7XG5cbiAgaWYgKHRoYXQuX2wwMV9hID4gZXBzaWxvbikge1xuICAgIHZhciBhID0gMiAqIHRoYXQuX2wwMV8yYSArIDMgKiB0aGF0Ll9sMDFfYSAqIHRoYXQuX2wxMl9hICsgdGhhdC5fbDEyXzJhLFxuICAgICAgICBuID0gMyAqIHRoYXQuX2wwMV9hICogKHRoYXQuX2wwMV9hICsgdGhhdC5fbDEyX2EpO1xuICAgIHgxID0gKHgxICogYSAtIHRoYXQuX3gwICogdGhhdC5fbDEyXzJhICsgdGhhdC5feDIgKiB0aGF0Ll9sMDFfMmEpIC8gbjtcbiAgICB5MSA9ICh5MSAqIGEgLSB0aGF0Ll95MCAqIHRoYXQuX2wxMl8yYSArIHRoYXQuX3kyICogdGhhdC5fbDAxXzJhKSAvIG47XG4gIH1cblxuICBpZiAodGhhdC5fbDIzX2EgPiBlcHNpbG9uKSB7XG4gICAgdmFyIGIgPSAyICogdGhhdC5fbDIzXzJhICsgMyAqIHRoYXQuX2wyM19hICogdGhhdC5fbDEyX2EgKyB0aGF0Ll9sMTJfMmEsXG4gICAgICAgIG0gPSAzICogdGhhdC5fbDIzX2EgKiAodGhhdC5fbDIzX2EgKyB0aGF0Ll9sMTJfYSk7XG4gICAgeDIgPSAoeDIgKiBiICsgdGhhdC5feDEgKiB0aGF0Ll9sMjNfMmEgLSB4ICogdGhhdC5fbDEyXzJhKSAvIG07XG4gICAgeTIgPSAoeTIgKiBiICsgdGhhdC5feTEgKiB0aGF0Ll9sMjNfMmEgLSB5ICogdGhhdC5fbDEyXzJhKSAvIG07XG4gIH1cblxuICB0aGF0Ll9jb250ZXh0LmJlemllckN1cnZlVG8oeDEsIHkxLCB4MiwgeTIsIHRoYXQuX3gyLCB0aGF0Ll95Mik7XG59XG5cbmZ1bmN0aW9uIENhdG11bGxSb20oY29udGV4dCwgYWxwaGEpIHtcbiAgdGhpcy5fY29udGV4dCA9IGNvbnRleHQ7XG4gIHRoaXMuX2FscGhhID0gYWxwaGE7XG59XG5cbkNhdG11bGxSb20ucHJvdG90eXBlID0ge1xuICBhcmVhU3RhcnQ6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX2xpbmUgPSAwO1xuICB9LFxuICBhcmVhRW5kOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLl9saW5lID0gTmFOO1xuICB9LFxuICBsaW5lU3RhcnQ6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX3gwID0gdGhpcy5feDEgPSB0aGlzLl94MiA9XG4gICAgdGhpcy5feTAgPSB0aGlzLl95MSA9IHRoaXMuX3kyID0gTmFOO1xuICAgIHRoaXMuX2wwMV9hID0gdGhpcy5fbDEyX2EgPSB0aGlzLl9sMjNfYSA9XG4gICAgdGhpcy5fbDAxXzJhID0gdGhpcy5fbDEyXzJhID0gdGhpcy5fbDIzXzJhID1cbiAgICB0aGlzLl9wb2ludCA9IDA7XG4gIH0sXG4gIGxpbmVFbmQ6IGZ1bmN0aW9uKCkge1xuICAgIHN3aXRjaCAodGhpcy5fcG9pbnQpIHtcbiAgICAgIGNhc2UgMjogdGhpcy5fY29udGV4dC5saW5lVG8odGhpcy5feDIsIHRoaXMuX3kyKTsgYnJlYWs7XG4gICAgICBjYXNlIDM6IHRoaXMucG9pbnQodGhpcy5feDIsIHRoaXMuX3kyKTsgYnJlYWs7XG4gICAgfVxuICAgIGlmICh0aGlzLl9saW5lIHx8ICh0aGlzLl9saW5lICE9PSAwICYmIHRoaXMuX3BvaW50ID09PSAxKSkgdGhpcy5fY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICB0aGlzLl9saW5lID0gMSAtIHRoaXMuX2xpbmU7XG4gIH0sXG4gIHBvaW50OiBmdW5jdGlvbih4LCB5KSB7XG4gICAgeCA9ICt4LCB5ID0gK3k7XG5cbiAgICBpZiAodGhpcy5fcG9pbnQpIHtcbiAgICAgIHZhciB4MjMgPSB0aGlzLl94MiAtIHgsXG4gICAgICAgICAgeTIzID0gdGhpcy5feTIgLSB5O1xuICAgICAgdGhpcy5fbDIzX2EgPSBNYXRoLnNxcnQodGhpcy5fbDIzXzJhID0gTWF0aC5wb3coeDIzICogeDIzICsgeTIzICogeTIzLCB0aGlzLl9hbHBoYSkpO1xuICAgIH1cblxuICAgIHN3aXRjaCAodGhpcy5fcG9pbnQpIHtcbiAgICAgIGNhc2UgMDogdGhpcy5fcG9pbnQgPSAxOyB0aGlzLl9saW5lID8gdGhpcy5fY29udGV4dC5saW5lVG8oeCwgeSkgOiB0aGlzLl9jb250ZXh0Lm1vdmVUbyh4LCB5KTsgYnJlYWs7XG4gICAgICBjYXNlIDE6IHRoaXMuX3BvaW50ID0gMjsgYnJlYWs7XG4gICAgICBjYXNlIDI6IHRoaXMuX3BvaW50ID0gMzsgLy8gZmFsbHMgdGhyb3VnaFxuICAgICAgZGVmYXVsdDogcG9pbnQodGhpcywgeCwgeSk7IGJyZWFrO1xuICAgIH1cblxuICAgIHRoaXMuX2wwMV9hID0gdGhpcy5fbDEyX2EsIHRoaXMuX2wxMl9hID0gdGhpcy5fbDIzX2E7XG4gICAgdGhpcy5fbDAxXzJhID0gdGhpcy5fbDEyXzJhLCB0aGlzLl9sMTJfMmEgPSB0aGlzLl9sMjNfMmE7XG4gICAgdGhpcy5feDAgPSB0aGlzLl94MSwgdGhpcy5feDEgPSB0aGlzLl94MiwgdGhpcy5feDIgPSB4O1xuICAgIHRoaXMuX3kwID0gdGhpcy5feTEsIHRoaXMuX3kxID0gdGhpcy5feTIsIHRoaXMuX3kyID0geTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgKGZ1bmN0aW9uIGN1c3RvbShhbHBoYSkge1xuXG4gIGZ1bmN0aW9uIGNhdG11bGxSb20oY29udGV4dCkge1xuICAgIHJldHVybiBhbHBoYSA/IG5ldyBDYXRtdWxsUm9tKGNvbnRleHQsIGFscGhhKSA6IG5ldyBDYXJkaW5hbChjb250ZXh0LCAwKTtcbiAgfVxuXG4gIGNhdG11bGxSb20uYWxwaGEgPSBmdW5jdGlvbihhbHBoYSkge1xuICAgIHJldHVybiBjdXN0b20oK2FscGhhKTtcbiAgfTtcblxuICByZXR1cm4gY2F0bXVsbFJvbTtcbn0pKDAuNSk7XG4iLCAiZXhwb3J0IGZ1bmN0aW9uIFRyYW5zZm9ybShrLCB4LCB5KSB7XG4gIHRoaXMuayA9IGs7XG4gIHRoaXMueCA9IHg7XG4gIHRoaXMueSA9IHk7XG59XG5cblRyYW5zZm9ybS5wcm90b3R5cGUgPSB7XG4gIGNvbnN0cnVjdG9yOiBUcmFuc2Zvcm0sXG4gIHNjYWxlOiBmdW5jdGlvbihrKSB7XG4gICAgcmV0dXJuIGsgPT09IDEgPyB0aGlzIDogbmV3IFRyYW5zZm9ybSh0aGlzLmsgKiBrLCB0aGlzLngsIHRoaXMueSk7XG4gIH0sXG4gIHRyYW5zbGF0ZTogZnVuY3Rpb24oeCwgeSkge1xuICAgIHJldHVybiB4ID09PSAwICYgeSA9PT0gMCA/IHRoaXMgOiBuZXcgVHJhbnNmb3JtKHRoaXMuaywgdGhpcy54ICsgdGhpcy5rICogeCwgdGhpcy55ICsgdGhpcy5rICogeSk7XG4gIH0sXG4gIGFwcGx5OiBmdW5jdGlvbihwb2ludCkge1xuICAgIHJldHVybiBbcG9pbnRbMF0gKiB0aGlzLmsgKyB0aGlzLngsIHBvaW50WzFdICogdGhpcy5rICsgdGhpcy55XTtcbiAgfSxcbiAgYXBwbHlYOiBmdW5jdGlvbih4KSB7XG4gICAgcmV0dXJuIHggKiB0aGlzLmsgKyB0aGlzLng7XG4gIH0sXG4gIGFwcGx5WTogZnVuY3Rpb24oeSkge1xuICAgIHJldHVybiB5ICogdGhpcy5rICsgdGhpcy55O1xuICB9LFxuICBpbnZlcnQ6IGZ1bmN0aW9uKGxvY2F0aW9uKSB7XG4gICAgcmV0dXJuIFsobG9jYXRpb25bMF0gLSB0aGlzLngpIC8gdGhpcy5rLCAobG9jYXRpb25bMV0gLSB0aGlzLnkpIC8gdGhpcy5rXTtcbiAgfSxcbiAgaW52ZXJ0WDogZnVuY3Rpb24oeCkge1xuICAgIHJldHVybiAoeCAtIHRoaXMueCkgLyB0aGlzLms7XG4gIH0sXG4gIGludmVydFk6IGZ1bmN0aW9uKHkpIHtcbiAgICByZXR1cm4gKHkgLSB0aGlzLnkpIC8gdGhpcy5rO1xuICB9LFxuICByZXNjYWxlWDogZnVuY3Rpb24oeCkge1xuICAgIHJldHVybiB4LmNvcHkoKS5kb21haW4oeC5yYW5nZSgpLm1hcCh0aGlzLmludmVydFgsIHRoaXMpLm1hcCh4LmludmVydCwgeCkpO1xuICB9LFxuICByZXNjYWxlWTogZnVuY3Rpb24oeSkge1xuICAgIHJldHVybiB5LmNvcHkoKS5kb21haW4oeS5yYW5nZSgpLm1hcCh0aGlzLmludmVydFksIHRoaXMpLm1hcCh5LmludmVydCwgeSkpO1xuICB9LFxuICB0b1N0cmluZzogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIFwidHJhbnNsYXRlKFwiICsgdGhpcy54ICsgXCIsXCIgKyB0aGlzLnkgKyBcIikgc2NhbGUoXCIgKyB0aGlzLmsgKyBcIilcIjtcbiAgfVxufTtcblxuZXhwb3J0IHZhciBpZGVudGl0eSA9IG5ldyBUcmFuc2Zvcm0oMSwgMCwgMCk7XG5cbnRyYW5zZm9ybS5wcm90b3R5cGUgPSBUcmFuc2Zvcm0ucHJvdG90eXBlO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0cmFuc2Zvcm0obm9kZSkge1xuICB3aGlsZSAoIW5vZGUuX196b29tKSBpZiAoIShub2RlID0gbm9kZS5wYXJlbnROb2RlKSkgcmV0dXJuIGlkZW50aXR5O1xuICByZXR1cm4gbm9kZS5fX3pvb207XG59XG4iLCAiaW1wb3J0ICogYXMgZDMgZnJvbSBcImQzXCI7XG5cbmNvbnN0IHJlbmRlckxlZ2VuZCA9ICgpID0+IHtcbiAgLy8gICBzdmdcbiAgLy8gICAgIC5hcHBlbmQoXCJnXCIpXG4gIC8vICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBgdHJhbnNsYXRlKDAsJHtoZWlnaHQgLSBtYXJnaW5Cb3R0b219KWApXG4gIC8vICAgICAuY2FsbCh4QXhpcylcbiAgLy8gICAgIC5jYWxsKChnKSA9PiBnLnNlbGVjdChcIi5kb21haW5cIikucmVtb3ZlKCkpXG4gIC8vICAgICAuY2FsbCgoZykgPT5cbiAgLy8gICAgICAgZ1xuICAvLyAgICAgICAgIC5zZWxlY3RBbGwoXCIudGljayBsaW5lXCIpXG4gIC8vICAgICAgICAgLmNsb25lKClcbiAgLy8gICAgICAgICAuYXR0cihcInkyXCIsIG1hcmdpblRvcCArIG1hcmdpbkJvdHRvbSAtIGhlaWdodClcbiAgLy8gICAgICAgICAuYXR0cihcInN0cm9rZS1vcGFjaXR5XCIsIDAuMSlcbiAgLy8gICAgIClcbiAgLy8gICAgIC5jYWxsKChnKSA9PlxuICAvLyAgICAgICBnXG4gIC8vICAgICAgICAgLmFwcGVuZChcInRleHRcIilcbiAgLy8gICAgICAgICAuYXR0cihcInhcIiwgd2lkdGgpXG4gIC8vICAgICAgICAgLmF0dHIoXCJ5XCIsIG1hcmdpbkJvdHRvbSAtIDQpXG4gIC8vICAgICAgICAgLmF0dHIoXCJmaWxsXCIsIFwiY3VycmVudENvbG9yXCIpXG4gIC8vICAgICAgICAgLmF0dHIoXCJ0ZXh0LWFuY2hvclwiLCBcImVuZFwiKVxuICAvLyAgICAgICAgIC50ZXh0KHhMYWJlbClcbiAgLy8gICAgICk7XG4gIC8vICAgc3ZnXG4gIC8vICAgICAuYXBwZW5kKFwiZ1wiKVxuICAvLyAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgYHRyYW5zbGF0ZSgke21hcmdpbkxlZnR9LDApYClcbiAgLy8gICAgIC5jYWxsKHlBeGlzKVxuICAvLyAgICAgLmNhbGwoKGcpID0+IGcuc2VsZWN0KFwiLmRvbWFpblwiKS5yZW1vdmUoKSlcbiAgLy8gICAgIC5jYWxsKChnKSA9PlxuICAvLyAgICAgICBnXG4gIC8vICAgICAgICAgLnNlbGVjdEFsbChcIi50aWNrIGxpbmVcIilcbiAgLy8gICAgICAgICAuY2xvbmUoKVxuICAvLyAgICAgICAgIC5hdHRyKFwieDJcIiwgd2lkdGggLSBtYXJnaW5MZWZ0IC0gbWFyZ2luUmlnaHQpXG4gIC8vICAgICAgICAgLmF0dHIoXCJzdHJva2Utb3BhY2l0eVwiLCAwLjEpXG4gIC8vICAgICApXG4gIC8vICAgICAuY2FsbCgoZykgPT5cbiAgLy8gICAgICAgZ1xuICAvLyAgICAgICAgIC5hcHBlbmQoXCJ0ZXh0XCIpXG4gIC8vICAgICAgICAgLmF0dHIoXCJ4XCIsIC1tYXJnaW5MZWZ0KVxuICAvLyAgICAgICAgIC5hdHRyKFwieVwiLCAxMClcbiAgLy8gICAgICAgICAuYXR0cihcImZpbGxcIiwgXCJjdXJyZW50Q29sb3JcIilcbiAgLy8gICAgICAgICAuYXR0cihcInRleHQtYW5jaG9yXCIsIFwic3RhcnRcIilcbiAgLy8gICAgICAgICAudGV4dCh5TGFiZWwpXG4gIC8vICAgICApO1xufTtcblxuLy8gQ29weXJpZ2h0IDIwMjEgT2JzZXJ2YWJsZSwgSW5jLlxuLy8gUmVsZWFzZWQgdW5kZXIgdGhlIElTQyBsaWNlbnNlLlxuLy8gaHR0cHM6Ly9vYnNlcnZhYmxlaHEuY29tL0BkMy9jb25uZWN0ZWQtc2NhdHRlcnBsb3RcbmV4cG9ydCBmdW5jdGlvbiBDb25uZWN0ZWRTY2F0dGVycGxvdDxUPihcbiAgZGF0YSxcbiAge1xuICAgIHggPSAoW1RdKSA9PiB4LCAvLyBnaXZlbiBkIGluIGRhdGEsIHJldHVybnMgdGhlIChxdWFudGl0YXRpdmUpIHgtdmFsdWVcbiAgICB5ID0gKFssIFRdKSA9PiB5LCAvLyBnaXZlbiBkIGluIGRhdGEsIHJldHVybnMgdGhlIChxdWFudGl0YXRpdmUpIHktdmFsdWVcbiAgICByID0gMywgLy8gKGZpeGVkKSByYWRpdXMgb2YgZG90cywgaW4gcGl4ZWxzXG4gICAgdGl0bGUsIC8vIGdpdmVuIGQgaW4gZGF0YSwgcmV0dXJucyB0aGUgbGFiZWxcbiAgICBvcmllbnQgPSAoKSA9PiBcInRvcFwiLCAvLyBnaXZlbiBkIGluIGRhdGEsIHJldHVybnMgYSBsYWJlbCBvcmllbnRhdGlvbiAodG9wLCByaWdodCwgYm90dG9tLCBsZWZ0KVxuICAgIGRlZmluZWQsIC8vIGZvciBnYXBzIGluIGRhdGFcbiAgICBjdXJ2ZSA9IGQzLmN1cnZlQ2F0bXVsbFJvbSwgLy8gY3VydmUgZ2VuZXJhdG9yIGZvciB0aGUgbGluZVxuICAgIHdpZHRoID0gNjQwLCAvLyBvdXRlciB3aWR0aCwgaW4gcGl4ZWxzXG4gICAgaGVpZ2h0ID0gNDAwLCAvLyBvdXRlciBoZWlnaHQsIGluIHBpeGVsc1xuICAgIG1hcmdpblRvcCA9IDAsIC8vIHRvcCBtYXJnaW4sIGluIHBpeGVsc1xuICAgIG1hcmdpblJpZ2h0ID0gMCwgLy8gcmlnaHQgbWFyZ2luLCBpbiBwaXhlbHNcbiAgICBtYXJnaW5Cb3R0b20gPSAwLCAvLyBib3R0b20gbWFyZ2luLCBpbiBwaXhlbHNcbiAgICBtYXJnaW5MZWZ0ID0gMCwgLy8gbGVmdCBtYXJnaW4sIGluIHBpeGVsc1xuICAgIGluc2V0ID0gciAqIDIsIC8vIGluc2V0IHRoZSBkZWZhdWx0IHJhbmdlLCBpbiBwaXhlbHNcbiAgICBpbnNldFRvcCA9IGluc2V0LCAvLyBpbnNldCB0aGUgZGVmYXVsdCB5LXJhbmdlXG4gICAgaW5zZXRSaWdodCA9IGluc2V0LCAvLyBpbnNldCB0aGUgZGVmYXVsdCB4LXJhbmdlXG4gICAgaW5zZXRCb3R0b20gPSBpbnNldCwgLy8gaW5zZXQgdGhlIGRlZmF1bHQgeS1yYW5nZVxuICAgIGluc2V0TGVmdCA9IGluc2V0LCAvLyBpbnNldCB0aGUgZGVmYXVsdCB4LXJhbmdlXG4gICAgeFR5cGUgPSBkMy5zY2FsZUxpbmVhciwgLy8gdHlwZSBvZiB4LXNjYWxlXG4gICAgeERvbWFpbiwgLy8gW3htaW4sIHhtYXhdXG4gICAgeFJhbmdlID0gW21hcmdpbkxlZnQgKyBpbnNldExlZnQsIHdpZHRoIC0gbWFyZ2luUmlnaHQgLSBpbnNldFJpZ2h0XSwgLy8gW2xlZnQsIHJpZ2h0XVxuICAgIHhGb3JtYXQsIC8vIGEgZm9ybWF0IHNwZWNpZmllciBzdHJpbmcgZm9yIHRoZSB4LWF4aXNcbiAgICB4TGFiZWwsIC8vIGEgbGFiZWwgZm9yIHRoZSB4LWF4aXNcbiAgICB5VHlwZSA9IGQzLnNjYWxlTGluZWFyLCAvLyB0eXBlIG9mIHktc2NhbGVcbiAgICB5RG9tYWluLCAvLyBbeW1pbiwgeW1heF1cbiAgICB5UmFuZ2UgPSBbaGVpZ2h0IC0gbWFyZ2luQm90dG9tIC0gaW5zZXRCb3R0b20sIG1hcmdpblRvcCArIGluc2V0VG9wXSwgLy8gW2JvdHRvbSwgdG9wXVxuICAgIHlGb3JtYXQsIC8vIGEgZm9ybWF0IHNwZWNpZmllciBzdHJpbmcgZm9yIHRoZSB5LWF4aXNcbiAgICB5TGFiZWwsIC8vIGEgbGFiZWwgZm9yIHRoZSB5LWF4aXNcbiAgICBmaWxsID0gXCJ3aGl0ZVwiLCAvLyBmaWxsIGNvbG9yIG9mIGRvdHNcbiAgICBzdHJva2UgPSBcImN1cnJlbnRDb2xvclwiLCAvLyBzdHJva2UgY29sb3Igb2YgbGluZSBhbmQgZG90c1xuICAgIHN0cm9rZVdpZHRoID0gMiwgLy8gc3Ryb2tlIHdpZHRoIG9mIGxpbmUgYW5kIGRvdHNcbiAgICBzdHJva2VMaW5lY2FwID0gXCJyb3VuZFwiLCAvLyBzdHJva2UgbGluZSBjYXAgb2YgbGluZVxuICAgIHN0cm9rZUxpbmVqb2luID0gXCJyb3VuZFwiLCAvLyBzdHJva2UgbGluZSBqb2luIG9mIGxpbmVcbiAgICBoYWxvID0gXCIjZmZmXCIsIC8vIGhhbG8gY29sb3IgZm9yIHRoZSBsYWJlbHNcbiAgICBoYWxvV2lkdGggPSA2LCAvLyBoYWxvIHdpZHRoIGZvciB0aGUgbGFiZWxzXG4gICAgZHVyYXRpb24gPSAwLCAvLyBpbnRybyBhbmltYXRpb24gaW4gbWlsbGlzZWNvbmRzICgwIHRvIGRpc2FibGUpXG4gIH0gPSB7fVxuKSB7XG4gIC8vIENvbXB1dGUgdmFsdWVzLlxuICBjb25zdCBYID0gZDMubWFwKGRhdGEsIHgpO1xuICBjb25zdCBZID0gZDMubWFwKGRhdGEsIHkpO1xuICBjb25zdCBUID0gdGl0bGUgPT0gbnVsbCA/IG51bGwgOiBkMy5tYXAoZGF0YSwgdGl0bGUpO1xuICBjb25zdCBPID0gZDMubWFwKGRhdGEsIG9yaWVudCk7XG4gIGNvbnN0IEkgPSBkMy5yYW5nZShYLmxlbmd0aCk7XG4gIGlmIChkZWZpbmVkID09PSB1bmRlZmluZWQpIGRlZmluZWQgPSAoZCwgaSkgPT4gIWlzTmFOKFhbaV0pICYmICFpc05hTihZW2ldKTtcbiAgY29uc3QgRCA9IGQzLm1hcChkYXRhLCBkZWZpbmVkKTtcblxuICAvLyBDb21wdXRlIGRlZmF1bHQgZG9tYWlucy5cbiAgaWYgKHhEb21haW4gPT09IHVuZGVmaW5lZCkgeERvbWFpbiA9IGQzLm5pY2UoLi4uZDMuZXh0ZW50KFgpLCB3aWR0aCAvIDgwKTtcbiAgaWYgKHlEb21haW4gPT09IHVuZGVmaW5lZCkgeURvbWFpbiA9IGQzLm5pY2UoLi4uZDMuZXh0ZW50KFkpLCBoZWlnaHQgLyA1MCk7XG5cbiAgLy8gQ29uc3RydWN0IHNjYWxlcyBhbmQgYXhlcy5cbiAgY29uc3QgeFNjYWxlID0geFR5cGUoeERvbWFpbiwgeFJhbmdlKTtcbiAgY29uc3QgeVNjYWxlID0geVR5cGUoeURvbWFpbiwgeVJhbmdlKTtcblxuICAvLyBDb25zdHJ1Y3QgdGhlIGxpbmUgZ2VuZXJhdG9yLlxuICBsZXQgbGluZSA9IGQzXG4gICAgLmxpbmUoKVxuICAgIC5jdXJ2ZShjdXJ2ZSlcbiAgICAuZGVmaW5lZCgoaSkgPT4gRFtpXSlcbiAgICAueCgoaSkgPT4geFNjYWxlKFhbaV0pKVxuICAgIC55KChpKSA9PiB5U2NhbGUoWVtpXSkpO1xuXG4gIGNvbnN0IHN2ZyA9IGQzXG4gICAgLmNyZWF0ZShcInN2Z1wiKVxuICAgIC5hdHRyKFwid2lkdGhcIiwgd2lkdGgpXG4gICAgLmF0dHIoXCJoZWlnaHRcIiwgaGVpZ2h0KVxuICAgIC5hdHRyKFwidmlld0JveFwiLCBbMCwgMCwgd2lkdGgsIGhlaWdodF0pXG4gICAgLmF0dHIoXCJzdHlsZVwiLCBcIm1heC13aWR0aDogMTAwJTsgaGVpZ2h0OiBhdXRvOyBoZWlnaHQ6IGludHJpbnNpYztcIik7XG5cbiAgY29uc3QgcGF0aCA9IHN2Z1xuICAgIC5hcHBlbmQoXCJwYXRoXCIpXG4gICAgLmF0dHIoXCJmaWxsXCIsIFwibm9uZVwiKVxuICAgIC5hdHRyKFwic3Ryb2tlXCIsIHN0cm9rZSlcbiAgICAuYXR0cihcInN0cm9rZS13aWR0aFwiLCBzdHJva2VXaWR0aClcbiAgICAuYXR0cihcInN0cm9rZS1saW5lam9pblwiLCBzdHJva2VMaW5lam9pbilcbiAgICAuYXR0cihcInN0cm9rZS1saW5lY2FwXCIsIHN0cm9rZUxpbmVjYXApXG4gICAgLmF0dHIoXCJkXCIsIGxpbmUoSSkpO1xuXG4gIHN2Z1xuICAgIC5hcHBlbmQoXCJnXCIpXG4gICAgLmF0dHIoXCJmaWxsXCIsIGZpbGwpXG4gICAgLmF0dHIoXCJzdHJva2VcIiwgc3Ryb2tlKVxuICAgIC5hdHRyKFwic3Ryb2tlLXdpZHRoXCIsIHN0cm9rZVdpZHRoKVxuICAgIC5zZWxlY3RBbGwoXCJjaXJjbGVcIilcbiAgICAuZGF0YShJLmZpbHRlcigoaSkgPT4gRFtpXSkpXG4gICAgLmpvaW4oXCJjaXJjbGVcIilcbiAgICAuYXR0cihcImN4XCIsIChpKSA9PiB4U2NhbGUoWFtpXSkpXG4gICAgLmF0dHIoXCJjeVwiLCAoaSkgPT4geVNjYWxlKFlbaV0pKVxuICAgIC5hdHRyKFwiclwiLCByKTtcblxuICAvLyBjb25zdCBsYWJlbCA9IHN2Z1xuICAvLyAgIC5hcHBlbmQoXCJnXCIpXG4gIC8vICAgLmF0dHIoXCJmb250LWZhbWlseVwiLCBcInNhbnMtc2VyaWZcIilcbiAgLy8gICAuYXR0cihcImZvbnQtc2l6ZVwiLCAxMClcbiAgLy8gICAuYXR0cihcInN0cm9rZS1saW5lam9pblwiLCBcInJvdW5kXCIpXG4gIC8vICAgLnNlbGVjdEFsbChcImdcIilcbiAgLy8gICAuZGF0YShJLmZpbHRlcigoaSkgPT4gRFtpXSkpXG4gIC8vICAgLmpvaW4oXCJnXCIpXG4gIC8vICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgKGkpID0+IGB0cmFuc2xhdGUoJHt4U2NhbGUoWFtpXSl9LCR7eVNjYWxlKFlbaV0pfSlgKTtcblxuICAvLyBpZiAoVCkge1xuICAvLyAgIGxhYmVsXG4gIC8vICAgICAuYXBwZW5kKFwidGV4dFwiKVxuICAvLyAgICAgLnRleHQoKGkpID0+IFRbaV0pXG4gIC8vICAgICAuZWFjaChmdW5jdGlvbiAoaSkge1xuICAvLyAgICAgICBjb25zdCB0ID0gZDMuc2VsZWN0KHRoaXMpO1xuICAvLyAgICAgICBzd2l0Y2ggKE9baV0pIHtcbiAgLy8gICAgICAgICBjYXNlIFwiYm90dG9tXCI6XG4gIC8vICAgICAgICAgICB0LmF0dHIoXCJ0ZXh0LWFuY2hvclwiLCBcIm1pZGRsZVwiKS5hdHRyKFwiZHlcIiwgXCIxLjRlbVwiKTtcbiAgLy8gICAgICAgICAgIGJyZWFrO1xuICAvLyAgICAgICAgIGNhc2UgXCJsZWZ0XCI6XG4gIC8vICAgICAgICAgICB0LmF0dHIoXCJkeFwiLCBcIi0wLjVlbVwiKVxuICAvLyAgICAgICAgICAgICAuYXR0cihcImR5XCIsIFwiMC4zMmVtXCIpXG4gIC8vICAgICAgICAgICAgIC5hdHRyKFwidGV4dC1hbmNob3JcIiwgXCJlbmRcIik7XG4gIC8vICAgICAgICAgICBicmVhaztcbiAgLy8gICAgICAgICBjYXNlIFwicmlnaHRcIjpcbiAgLy8gICAgICAgICAgIHQuYXR0cihcImR4XCIsIFwiMC41ZW1cIilcbiAgLy8gICAgICAgICAgICAgLmF0dHIoXCJkeVwiLCBcIjAuMzJlbVwiKVxuICAvLyAgICAgICAgICAgICAuYXR0cihcInRleHQtYW5jaG9yXCIsIFwic3RhcnRcIik7XG4gIC8vICAgICAgICAgICBicmVhaztcbiAgLy8gICAgICAgICBkZWZhdWx0OlxuICAvLyAgICAgICAgICAgdC5hdHRyKFwidGV4dC1hbmNob3JcIiwgXCJtaWRkbGVcIikuYXR0cihcImR5XCIsIFwiLTAuN2VtXCIpO1xuICAvLyAgICAgICAgICAgYnJlYWs7XG4gIC8vICAgICAgIH1cbiAgLy8gICAgIH0pXG4gIC8vICAgICAuY2FsbCgodGV4dCkgPT4gdGV4dC5jbG9uZSh0cnVlKSlcbiAgLy8gICAgIC5hdHRyKFwiZmlsbFwiLCBcIm5vbmVcIilcbiAgLy8gICAgIC5hdHRyKFwic3Ryb2tlXCIsIGhhbG8pXG4gIC8vICAgICAuYXR0cihcInN0cm9rZS13aWR0aFwiLCBoYWxvV2lkdGgpO1xuICAvLyB9XG5cbiAgLy8gTWVhc3VyZSB0aGUgbGVuZ3RoIG9mIHRoZSBnaXZlbiBTVkcgcGF0aCBzdHJpbmcuXG4gIGZ1bmN0aW9uIGxlbmd0aChwYXRoKSB7XG4gICAgcmV0dXJuIGQzLmNyZWF0ZShcInN2ZzpwYXRoXCIpLmF0dHIoXCJkXCIsIHBhdGgpLm5vZGUoKS5nZXRUb3RhbExlbmd0aCgpO1xuICB9XG5cbiAgZnVuY3Rpb24gYW5pbWF0ZSgpIHtcbiAgICBpZiAoZHVyYXRpb24gPiAwKSB7XG4gICAgICBjb25zdCBsID0gbGVuZ3RoKGxpbmUoSSkpO1xuXG4gICAgICBwYXRoXG4gICAgICAgIC5pbnRlcnJ1cHQoKVxuICAgICAgICAuYXR0cihcInN0cm9rZS1kYXNoYXJyYXlcIiwgYDAsJHtsfWApXG4gICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgLmR1cmF0aW9uKGR1cmF0aW9uKVxuICAgICAgICAuZWFzZShkMy5lYXNlTGluZWFyKVxuICAgICAgICAuYXR0cihcInN0cm9rZS1kYXNoYXJyYXlcIiwgYCR7bH0sJHtsfWApO1xuXG4gICAgICAvLyBsYWJlbFxuICAgICAgLy8gICAuaW50ZXJydXB0KClcbiAgICAgIC8vICAgLmF0dHIoXCJvcGFjaXR5XCIsIDApXG4gICAgICAvLyAgIC50cmFuc2l0aW9uKClcbiAgICAgIC8vICAgLmRlbGF5KFxuICAgICAgLy8gICAgIChpKSA9PiAobGVuZ3RoKGxpbmUoSS5maWx0ZXIoKGopID0+IGogPD0gaSkpKSAvIGwpICogKGR1cmF0aW9uIC0gMTI1KVxuICAgICAgLy8gICApXG4gICAgICAvLyAgIC5hdHRyKFwib3BhY2l0eVwiLCAxKTtcbiAgICB9XG4gIH1cblxuICBjb25zdCByZW5kZXJQYXRoID0gKGRhdGE6IFRbXSkgPT4ge1xuICAgIGNvbnN0IEQgPSBkMy5tYXAoZGF0YSwgZGVmaW5lZCk7XG4gICAgLy8gQ29uc3RydWN0IHRoZSBsaW5lIGdlbmVyYXRvci5cbiAgICBsaW5lID0gZDNcbiAgICAgIC5saW5lKClcbiAgICAgIC5jdXJ2ZShjdXJ2ZSlcbiAgICAgIC5kZWZpbmVkKChpKSA9PiBEW2ldKVxuICAgICAgLngoKGkpID0+IHhTY2FsZShYW2ldKSlcbiAgICAgIC55KChpKSA9PiB5U2NhbGUoWVtpXSkpO1xuXG4gICAgcGF0aC5hdHRyKFwiZFwiLCBsaW5lKEkpKTtcbiAgfTtcblxuICBjb25zdCB1cGRhdGUgPSAobmV3RGF0YTogVFtdKSA9PiB7XG4gICAgY29uc29sZS5sb2cobmV3RGF0YSk7XG4gICAgcmVuZGVyUGF0aChuZXdEYXRhKTtcbiAgfTtcblxuICBhbmltYXRlKCk7XG5cbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24oc3ZnLm5vZGUoKSwgeyBhbmltYXRlLCB1cGRhdGUgfSk7XG59XG4iLCAiZXhwb3J0IGNvbnN0IGdldEdsb2JhbFN0eWxlID0gKG5hbWU6IHN0cmluZykgPT5cblx0Z2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5ib2R5KS5nZXRQcm9wZXJ0eVZhbHVlKG5hbWUpO1xuIiwgIi8vIGNvcGllZCBmcm9tXG4vLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xMjU1NTEyL2hvdy10by1kcmF3LWEtcm91bmRlZC1yZWN0YW5nbGUtdXNpbmctaHRtbC1jYW52YXNcblxuaW1wb3J0IHtTaXplfSBmcm9tICcuL2dlbyc7XG5pbXBvcnQge2dldEdsb2JhbFN0eWxlfSBmcm9tICcuL3N0eWxlJztcblxuLyoqXG4gKiBEcmF3cyBhIHJvdW5kZWQgcmVjdGFuZ2xlIHVzaW5nIHRoZSBjdXJyZW50IHN0YXRlIG9mIHRoZSBjYW52YXMuXG4gKiBJZiB5b3Ugb21pdCB0aGUgbGFzdCB0aHJlZSBwYXJhbXMsIGl0IHdpbGwgZHJhdyBhIHJlY3RhbmdsZVxuICogb3V0bGluZSB3aXRoIGEgNSBwaXhlbCBib3JkZXIgcmFkaXVzXG4gKiBAcGFyYW0ge0NhbnZhc1JlbmRlcmluZ0NvbnRleHQyRH0gY3R4XG4gKiBAcGFyYW0ge051bWJlcn0geCBUaGUgdG9wIGxlZnQgeCBjb29yZGluYXRlXG4gKiBAcGFyYW0ge051bWJlcn0geSBUaGUgdG9wIGxlZnQgeSBjb29yZGluYXRlXG4gKiBAcGFyYW0ge051bWJlcn0gd2lkdGggVGhlIHdpZHRoIG9mIHRoZSByZWN0YW5nbGVcbiAqIEBwYXJhbSB7TnVtYmVyfSBoZWlnaHQgVGhlIGhlaWdodCBvZiB0aGUgcmVjdGFuZ2xlXG4gKiBAcGFyYW0ge051bWJlcn0gW3JhZGl1cyA9IDVdIFRoZSBjb3JuZXIgcmFkaXVzOyBJdCBjYW4gYWxzbyBiZSBhbiBvYmplY3RcbiAqICAgICAgICAgICAgICAgICB0byBzcGVjaWZ5IGRpZmZlcmVudCByYWRpaSBmb3IgY29ybmVyc1xuICogQHBhcmFtIHtOdW1iZXJ9IFtyYWRpdXMudGwgPSAwXSBUb3AgbGVmdFxuICogQHBhcmFtIHtOdW1iZXJ9IFtyYWRpdXMudHIgPSAwXSBUb3AgcmlnaHRcbiAqIEBwYXJhbSB7TnVtYmVyfSBbcmFkaXVzLmJyID0gMF0gQm90dG9tIHJpZ2h0XG4gKiBAcGFyYW0ge051bWJlcn0gW3JhZGl1cy5ibCA9IDBdIEJvdHRvbSBsZWZ0XG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtmaWxsID0gZmFsc2VdIFdoZXRoZXIgdG8gZmlsbCB0aGUgcmVjdGFuZ2xlLlxuICogQHBhcmFtIHtCb29sZWFufSBbc3Ryb2tlID0gdHJ1ZV0gV2hldGhlciB0byBzdHJva2UgdGhlIHJlY3RhbmdsZS5cbiAqL1xuZnVuY3Rpb24gcm91bmRSZWN0KGN0eCwgeCwgeSwgd2lkdGgsIGhlaWdodCwgcmFkaXVzLCBmaWxsLCBzdHJva2UpIHtcblx0aWYgKHR5cGVvZiBzdHJva2UgPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0c3Ryb2tlID0gdHJ1ZTtcblx0fVxuXHRpZiAodHlwZW9mIHJhZGl1cyA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRyYWRpdXMgPSA1O1xuXHR9XG5cdGlmICh0eXBlb2YgcmFkaXVzID09PSAnbnVtYmVyJykge1xuXHRcdHJhZGl1cyA9IHt0bDogcmFkaXVzLCB0cjogcmFkaXVzLCBicjogcmFkaXVzLCBibDogcmFkaXVzfTtcblx0fSBlbHNlIHtcblx0XHR2YXIgZGVmYXVsdFJhZGl1cyA9IHt0bDogMCwgdHI6IDAsIGJyOiAwLCBibDogMH07XG5cdFx0Zm9yICh2YXIgc2lkZSBpbiBkZWZhdWx0UmFkaXVzKSB7XG5cdFx0XHRyYWRpdXNbc2lkZV0gPSByYWRpdXNbc2lkZV0gfHwgZGVmYXVsdFJhZGl1c1tzaWRlXTtcblx0XHR9XG5cdH1cblx0Y3R4LmJlZ2luUGF0aCgpO1xuXHRjdHgubW92ZVRvKHggKyByYWRpdXMudGwsIHkpO1xuXHRjdHgubGluZVRvKHggKyB3aWR0aCAtIHJhZGl1cy50ciwgeSk7XG5cdGN0eC5xdWFkcmF0aWNDdXJ2ZVRvKHggKyB3aWR0aCwgeSwgeCArIHdpZHRoLCB5ICsgcmFkaXVzLnRyKTtcblx0Y3R4LmxpbmVUbyh4ICsgd2lkdGgsIHkgKyBoZWlnaHQgLSByYWRpdXMuYnIpO1xuXHRjdHgucXVhZHJhdGljQ3VydmVUbyh4ICsgd2lkdGgsIHkgKyBoZWlnaHQsIHggKyB3aWR0aCAtIHJhZGl1cy5iciwgeSArIGhlaWdodCk7XG5cdGN0eC5saW5lVG8oeCArIHJhZGl1cy5ibCwgeSArIGhlaWdodCk7XG5cdGN0eC5xdWFkcmF0aWNDdXJ2ZVRvKHgsIHkgKyBoZWlnaHQsIHgsIHkgKyBoZWlnaHQgLSByYWRpdXMuYmwpO1xuXHRjdHgubGluZVRvKHgsIHkgKyByYWRpdXMudGwpO1xuXHRjdHgucXVhZHJhdGljQ3VydmVUbyh4LCB5LCB4ICsgcmFkaXVzLnRsLCB5KTtcblx0Y3R4LmNsb3NlUGF0aCgpO1xuXHRpZiAoZmlsbCkge1xuXHRcdGN0eC5maWxsKCk7XG5cdH1cblx0aWYgKHN0cm9rZSkge1xuXHRcdGN0eC5zdHJva2UoKTtcblx0fVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZHJhd0dyaWQoXG5cdGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgZ2FwOiBudW1iZXIsIG1hemVTaXplOiBTaXplKSB7XG5cdGZvciAobGV0IGkgPSAwOyBpIDwgbWF6ZVNpemUud2lkdGg7IGkrKykge1xuXHRcdGZvciAobGV0IGogPSAwOyBqIDwgbWF6ZVNpemUuaGVpZ2h0OyBqKyspIHtcblx0XHRcdGNvbnN0IHkgPSBnYXAgKyAoaGVpZ2h0ICsgZ2FwKSAqIGk7XG5cdFx0XHRjb25zdCB4ID0gZ2FwICsgKHdpZHRoICsgZ2FwKSAqIGo7XG5cdFx0XHRjb25zb2xlLmxvZyhnZXRHbG9iYWxTdHlsZSgnLS1tYWluLWJnLXNlY29uZGFyeScpKTtcblx0XHRcdGN0eC5maWxsU3R5bGUgPSAnI2NjY2NjYyc7XG5cdFx0XHRyb3VuZFJlY3QoY3R4LCB4LCB5LCB3aWR0aCwgaGVpZ2h0LCAxNSwgdHJ1ZSwgZmFsc2UpO1xuXHRcdH1cblx0fVxufVxuIiwgImV4cG9ydCB0eXBlIFZlY3RvcjJEID0ge1xuXHR4OiBudW1iZXI7IHk6IG51bWJlcjtcbn07XG5cbmV4cG9ydCB0eXBlIFNpemUgPSB7XG5cdHdpZHRoOiBudW1iZXI7IGhlaWdodDogbnVtYmVyO1xufTtcblxuZXhwb3J0IGNvbnN0IG1hemVTaXplOiBTaXplID0ge1xuXHR3aWR0aDogNixcblx0aGVpZ2h0OiA2LFxufTtcbiIsICI8c2NyaXB0IGxhbmc9XCJ0c1wiPlxuICBpbXBvcnQgeyBDb21tdW5pY2F0b3IgfSBmcm9tIFwiLi9Db21tdW5pY2F0b3JcIjtcblxuICBpbXBvcnQgeyBDb25uZWN0ZWRTY2F0dGVycGxvdCB9IGZyb20gXCIuL3Bsb3QvQ29ubmVjdGVkU2NhdHRlcnBsb3RcIjtcblxuICBpbXBvcnQgeyBNYXVzT3V0Z29pbmdNZXNzYWdlLCBOYXZpZ2F0aW9uUGFja2V0IH0gZnJvbSBcIi4vcHJvdG8vbWVzc2FnZVwiO1xuICBpbXBvcnQgeyBkcmF3R3JpZCB9IGZyb20gXCIuL3V0aWxzL2NhbnZhc1wiO1xuICBpbXBvcnQgeyBtYXplU2l6ZSwgVmVjdG9yMkQgfSBmcm9tIFwiLi91dGlscy9nZW9cIjtcblxuICBleHBvcnQgbGV0IGNvbTogQ29tbXVuaWNhdG9yO1xuXG4gIGxldCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xuICBsZXQgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gIGxldCBsYXN0Q29vcmRzOiBbbnVtYmVyLCBudW1iZXJdO1xuXG4gIGNvbnN0IGRhdGE6IFZlY3RvcjJEW10gPSBbXTtcblxuICBjb25zdCBvbk5hdlBhY2tldCA9IChuYXY6IE5hdmlnYXRpb25QYWNrZXQpID0+IHtcbiAgICBjb25zdCB3aWR0aCA9IGNhbnZhcy5jbGllbnRXaWR0aDtcbiAgICBjb25zdCBoZWlnaHQgPSBjYW52YXMuY2xpZW50SGVpZ2h0O1xuXG4gICAgY29uc3QgeCA9IChuYXYucG9zaXRpb24ueCArIDIpICogKGNhbnZhcy5jbGllbnRXaWR0aCAvIDUpO1xuICAgIGNvbnN0IHkgPSAobmF2LnBvc2l0aW9uLnkgKyAyKSAqIChjYW52YXMuY2xpZW50SGVpZ2h0IC8gNSk7XG4gICAgaWYgKCFsYXN0Q29vcmRzKSB7XG4gICAgICBsYXN0Q29vcmRzID0gW3gsIHldO1xuICAgIH1cbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4LnN0cm9rZVN0eWxlID0gXCIjZmZmZmZmXCI7XG4gICAgY3R4Lm1vdmVUbyguLi5sYXN0Q29vcmRzKTtcbiAgICBjdHgubGluZVRvKHgsIHkpO1xuICAgIGN0eC5zdHJva2UoKTtcbiAgICBsYXN0Q29vcmRzID0gW3gsIHldO1xuXG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuXG4gICAgY3R4LmFyYyhcbiAgICAgIHggKyBuYXYuc2Vuc29ycy5sZWZ0ICogKHdpZHRoIC8gMjApLFxuICAgICAgeSArIG5hdi5zZW5zb3JzLmxlZnQgKiAoaGVpZ2h0IC8gMjApLFxuICAgICAgMTQsXG4gICAgICAwLFxuICAgICAgMiAqIE1hdGguUEksXG4gICAgICBmYWxzZVxuICAgICk7XG4gICAgY3R4LmZpbGxTdHlsZSA9IFwicmdiYSg1MiwgMjAwLCAyMTksIDAuMylcIjtcbiAgICBjdHguZmlsbCgpO1xuICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgfTtcblxuICBmdW5jdGlvbiBDYW52YXNFbChub2RlOiBIVE1MQ2FudmFzRWxlbWVudCkge1xuICAgIGNhbnZhcyA9IG5vZGU7XG4gICAgY29uc3Qgd2lkdGggPSBjYW52YXMuY2xpZW50V2lkdGg7XG4gICAgY29uc3QgaGVpZ2h0ID0gY2FudmFzLmNsaWVudEhlaWdodDtcblxuICAgIGlmIChjYW52YXMud2lkdGggIT09IHdpZHRoIHx8IGNhbnZhcy5oZWlnaHQgIT09IGhlaWdodCkge1xuICAgICAgY2FudmFzLndpZHRoID0gd2lkdGg7XG4gICAgICBjYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIH1cbiAgICBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIGNvbnN0IGdhcCA9IDU7XG4gICAgZHJhd0dyaWQoXG4gICAgICBjdHgsXG4gICAgICAod2lkdGggLSBnYXApIC8gbWF6ZVNpemUud2lkdGggLSBnYXAsXG4gICAgICAoaGVpZ2h0IC0gZ2FwKSAvIG1hemVTaXplLmhlaWdodCAtIGdhcCxcbiAgICAgIGdhcCxcbiAgICAgIG1hemVTaXplXG4gICAgKTtcblxuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHgubW92ZVRvKDAsIDApO1xuXG4gICAgY29tLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICBcIm1lc3NhZ2VcIixcbiAgICAgIChldnQ6IE1lc3NhZ2VFdmVudDxNYXVzT3V0Z29pbmdNZXNzYWdlPikgPT4ge1xuICAgICAgICBpZiAoZXZ0LmRhdGEubmF2KSB7XG4gICAgICAgICAgb25OYXZQYWNrZXQoZXZ0LmRhdGEubmF2KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBsZXQgcGF0aENoYXJ0OiBSZXR1cm5UeXBlPHR5cGVvZiBDb25uZWN0ZWRTY2F0dGVycGxvdD47XG5cbiAgZnVuY3Rpb24gUm9ib3RQYXRoKG5vZGU6IEhUTUxFbGVtZW50KSB7XG4gICAgY29uc3QgcmVjdCA9IG5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3QgZGF0YTogVmVjdG9yMkRbXSA9IFtcbiAgICAgIHtcbiAgICAgICAgeDogMC41LFxuICAgICAgICB5OiAwLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgeDogMC41NSxcbiAgICAgICAgeTogMC41LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgeDogMC40OSxcbiAgICAgICAgeTogMSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHg6IDAuNixcbiAgICAgICAgeTogMS4yLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgeDogMS42LFxuICAgICAgICB5OiAxLjIsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB4OiAyLjYsXG4gICAgICAgIHk6IDQuMixcbiAgICAgIH0sXG5cbiAgICAgIHtcbiAgICAgICAgeDogNi4wLFxuICAgICAgICB5OiA0LjIsXG4gICAgICB9LFxuICAgIF07XG5cbiAgICBwYXRoQ2hhcnQgPSBDb25uZWN0ZWRTY2F0dGVycGxvdChkYXRhLCB7XG4gICAgICB4OiAoZCkgPT4gZC54LFxuICAgICAgeTogKGQpID0+IGQueSxcbiAgICAgIHRpdGxlOiAoZCkgPT4gZC55ZWFyLFxuICAgICAgb3JpZW50OiAoZCkgPT4gZC5zaWRlLFxuICAgICAgeERvbWFpbjogWzAsIDZdLFxuICAgICAgeURvbWFpbjogWzAsIDZdLFxuICAgICAgd2lkdGg6IHJlY3Qud2lkdGgsXG4gICAgICBoZWlnaHQ6IHJlY3QuaGVpZ2h0LFxuICAgICAgZHVyYXRpb246IDAsIC8vIGZvciB0aGUgaW50cm8gYW5pbWF0aW9uOyAwIHRvIGRpc2FibGVcbiAgICB9KTtcbiAgICBub2RlLmFwcGVuZENoaWxkKHBhdGhDaGFydCk7XG4gIH1cblxuICBjb25zdCBhZGRQb2ludCA9ICgpID0+IHtcbiAgICBjb25zb2xlLmxvZyhcImFkZCBwb2ludFwiKTtcbiAgICBkYXRhLnB1c2goe1xuICAgICAgeDogTWF0aC5yYW5kb20oKSAqIDYsXG4gICAgICB5OiBNYXRoLnJhbmRvbSgpICogNixcbiAgICB9KTtcbiAgICBwYXRoQ2hhcnQudXBkYXRlKGRhdGEpO1xuICB9O1xuPC9zY3JpcHQ+XG5cbjxkaXYgY2xhc3M9XCJjYXJkIG1hcFwiPlxuICA8Y2FudmFzIHVzZTpDYW52YXNFbCAvPlxuICA8ZGl2IHVzZTpSb2JvdFBhdGggLz5cbiAgPGRpdj5cbiAgICA8YnV0dG9uIG9uOmNsaWNrPXthZGRQb2ludH0+QWRkIHBvaW50IHRlc3Q8L2J1dHRvbj5cbiAgPC9kaXY+XG48L2Rpdj5cblxuPHN0eWxlIGxhbmc9XCJzY3NzXCI+XG4gIC5tYXAge1xuICAgIHBhZGRpbmc6IDA7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIGFzcGVjdC1yYXRpbzogMSAvIDE7XG5cbiAgICA+ICoge1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgbWFyZ2luOiAwLjVyZW07XG4gICAgICB3aWR0aDogY2FsYygxMDAlIC0gMXJlbSk7XG4gICAgICBoZWlnaHQ6IGNhbGMoMTAwJSAtIDFyZW0pO1xuICAgIH1cbiAgfVxuPC9zdHlsZT5cbiIsICI8c2NyaXB0IGxhbmc9XCJ0c1wiPlxuICBpbXBvcnQgU2Vuc29yVGFibGUgZnJvbSBcIi4vc2Vuc29yVGFibGUuc3ZlbHRlXCI7XG4gIGltcG9ydCBNYXplVmlldyBmcm9tIFwiLi9NYXplVmlld0NhcmQuc3ZlbHRlXCI7XG4gIGltcG9ydCB7IENvbW11bmljYXRvciB9IGZyb20gXCIuL0NvbW11bmljYXRvclwiO1xuICBpbXBvcnQgeyBNYXVzT3V0Z29pbmdNZXNzYWdlLCBOYXZpZ2F0aW9uUGFja2V0IH0gZnJvbSBcIi4vcHJvdG8vbWVzc2FnZVwiO1xuXG4gIGV4cG9ydCBjb25zdCBjb20gPSBuZXcgQ29tbXVuaWNhdG9yKHtcbiAgICB1cmw6IFwid3M6Ly9sb2NhbGhvc3Q6ODA4MC93c1wiLFxuICB9KTtcblxuICBsZXQga0QgPSAwLjA7XG4gIGxldCBrSSA9IDAuMDtcbiAgbGV0IGtQID0gMC4wO1xuXG4gIGxldCBkaXJlY3Rpb24gPSAwO1xuICBsZXQgc3BlZWQgPSAwO1xuXG4gIGNvbnN0IG9uVXBkYXRlTW90b3JDYWxpYnJhdGlvbiA9ICgpID0+IHtcbiAgICBjb20uc2VuZCh7XG4gICAgICBlbmNvZGVyQ2FsbGlicmF0aW9uOiB7XG4gICAgICAgIGtELFxuICAgICAgICBrSSxcbiAgICAgICAga1AsXG4gICAgICB9LFxuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IG9uVXBkYXRlQ29udHJvbHMgPSAoKSA9PiB7XG4gICAgY29tLnNlbmQoe1xuICAgICAgY29udHJvbDoge1xuICAgICAgICBzcGVlZCxcbiAgICAgICAgZGlyZWN0aW9uLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfTtcbjwvc2NyaXB0PlxuXG48bWFpbj5cbiAgPE1hemVWaWV3IHtjb219IC8+XG4gIDxkaXYgY2xhc3M9XCJjYXJkXCI+PFNlbnNvclRhYmxlIHtjb219IC8+PC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJjYXJkXCI+XG4gICAgPGgyPkNvbnRyb2xzPC9oMj5cbiAgICA8bGFiZWw+XG4gICAgICBTcGVlZDpcbiAgICAgIDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgYmluZDp2YWx1ZT17c3BlZWR9IC8+XG4gICAgPC9sYWJlbD5cbiAgICA8bGFiZWw+XG4gICAgICBEaXJlY3Rpb246XG4gICAgICA8aW5wdXQgdHlwZT1cIm51bWJlclwiIGJpbmQ6dmFsdWU9e2RpcmVjdGlvbn0gLz5cbiAgICA8L2xhYmVsPlxuICAgIDxidXR0b24gb246Y2xpY2s9e29uVXBkYXRlQ29udHJvbHN9PlVwZGF0ZTwvYnV0dG9uPlxuXG4gICAgPGgyPlR1bmluZzwvaDI+XG4gICAgPGxhYmVsPlxuICAgICAga1A6XG4gICAgICA8aW5wdXQgc3RlcD1cIjAuMDAxXCIgdHlwZT1cIm51bWJlclwiIGJpbmQ6dmFsdWU9e2tQfSAvPlxuICAgIDwvbGFiZWw+XG4gICAgPGxhYmVsPlxuICAgICAga0Q6XG4gICAgICA8aW5wdXQgc3RlcD1cIjAuMDAxXCIgdHlwZT1cIm51bWJlclwiIGJpbmQ6dmFsdWU9e2tEfSAvPlxuICAgIDwvbGFiZWw+XG4gICAgPGxhYmVsPlxuICAgICAga0k6XG4gICAgICA8aW5wdXQgc3RlcD1cIjAuMDAxXCIgdHlwZT1cIm51bWJlclwiIGJpbmQ6dmFsdWU9e2tJfSAvPlxuICAgIDwvbGFiZWw+XG4gICAgPGJ1dHRvbiBvbjpjbGljaz17b25VcGRhdGVNb3RvckNhbGlicmF0aW9ufT5VcGRhdGU8L2J1dHRvbj5cbiAgPC9kaXY+XG48L21haW4+XG5cbjxzdHlsZSBsYW5nPVwic2Nzc1wiPlxuICA6Z2xvYmFsKGh0bWwpLFxuICA6Z2xvYmFsKGJvZHkpIHtcbiAgICBwYWRkaW5nOiAwO1xuICAgIG1hcmdpbjogMDtcbiAgICBmb250LXNpemU6IDE4cHg7XG4gICAgZm9udC1mYW1pbHk6IC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgU2Vnb2UgVUksIFJvYm90bywgT3h5Z2VuLFxuICAgICAgVWJ1bnR1LCBDYW50YXJlbGwsIEZpcmEgU2FucywgRHJvaWQgU2FucywgSGVsdmV0aWNhIE5ldWUsIHNhbnMtc2VyaWY7XG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgfVxuXG4gIDpnbG9iYWwoYm9keSkge1xuICAgIC0tbWFpbi1iZy1zZWNvbmRhcnk6ICNkYWRhZGE7XG4gICAgLS1tYWluLWJnLWNvbG9yOiAjZThlOGU4O1xuICAgIC0tbWFpbi10ZXh0LWNvbG9yOiAjMzMzO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLW1haW4tYmctY29sb3IpO1xuICAgIHBhZGRpbmc6IDFyZW07XG4gICAgY29sb3I6IHZhcigtLW1haW4tdGV4dC1jb2xvcik7XG4gICAgYmFja2dyb3VuZDogI2U4ZThlODtcblxuICAgIC5jYXJkIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLW1haW4tYmctc2Vjb25kYXJ5KTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDEuMjVyZW07XG4gICAgICBib3gtc2hhZG93OiAyMHB4IDIwcHggNjBweCAjYzVjNWM1LCAtMjBweCAtMjBweCA2MHB4ICNmZmZmZmY7XG4gICAgICBwYWRkaW5nOiAwLjVyZW07XG4gICAgfVxuICB9XG5cbiAgbWFpbiB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbWFpbi1iZy1jb2xvcik7XG4gICAgZGlzcGxheTogZ3JpZDtcblxuICAgIEBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xuICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyO1xuICAgIH1cblxuICAgIEBtZWRpYSAobWluLXdpZHRoOiAxMDI0cHgpIHtcbiAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDJmcjtcbiAgICB9XG4gICAgZ2FwOiAycmVtO1xuICB9XG48L3N0eWxlPlxuIiwgImltcG9ydCBUZXN0IGZyb20gXCIuL2luZGV4LnN2ZWx0ZVwiO1xuXG5jb25zdCBzZXR1cEZyb250ZW5kID0gKCkgPT4ge307XG5cbnNldHVwRnJvbnRlbmQoKTtcblxubmV3IFRlc3Qoe1xuICB0YXJnZXQ6IGRvY3VtZW50LmJvZHksXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUNBLFlBQU8sVUFBVTtBQW1CakIsdUJBQW1CLElBQUksS0FBbUI7QUFDdEMsVUFBSSxTQUFVLElBQUksTUFBTSxVQUFVLFNBQVMsQ0FBQyxHQUN4QyxTQUFVLEdBQ1YsUUFBVSxHQUNWLFVBQVU7QUFDZCxhQUFPLFFBQVEsVUFBVTtBQUNyQixlQUFPLFlBQVksVUFBVTtBQUNqQyxhQUFPLElBQUksUUFBUSxrQkFBa0IsU0FBUyxRQUFRO0FBQ2xELGVBQU8sVUFBVSxrQkFBa0IsS0FBbUI7QUFDbEQsY0FBSSxTQUFTO0FBQ1Qsc0JBQVU7QUFDVixnQkFBSTtBQUNBLHFCQUFPLEdBQUc7QUFBQSxpQkFDVDtBQUNELGtCQUFJLFVBQVMsSUFBSSxNQUFNLFVBQVUsU0FBUyxDQUFDLEdBQ3ZDLFVBQVM7QUFDYixxQkFBTyxVQUFTLFFBQU87QUFDbkIsd0JBQU8sYUFBWSxVQUFVO0FBQ2pDLHNCQUFRLE1BQU0sTUFBTSxPQUFNO0FBQUEsWUFDOUI7QUFBQSxVQUNKO0FBQUEsUUFDSjtBQUNBLFlBQUk7QUFDQSxhQUFHLE1BQU0sT0FBTyxNQUFNLE1BQU07QUFBQSxRQUNoQyxTQUFTLEtBQVA7QUFDRSxjQUFJLFNBQVM7QUFDVCxzQkFBVTtBQUNWLG1CQUFPLEdBQUc7QUFBQSxVQUNkO0FBQUEsUUFDSjtBQUFBLE1BQ0osQ0FBQztBQUFBLElBQ0w7QUFBQTtBQUFBOzs7QUNuREE7QUFBQTtBQUFBO0FBT0EsUUFBSSxTQUFTO0FBT2IsV0FBTyxTQUFTLGdCQUFnQixRQUFRO0FBQ3BDLFVBQUksSUFBSSxPQUFPO0FBQ2YsVUFBSSxDQUFDO0FBQ0QsZUFBTztBQUNYLFVBQUksSUFBSTtBQUNSLGFBQU8sRUFBRSxJQUFJLElBQUksS0FBSyxPQUFPLE9BQU8sQ0FBQyxNQUFNO0FBQ3ZDLFVBQUU7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QSxJQUFHO0FBQUEsSUFBRztBQUFBLElBQUc7QUFBQSxJQUFLO0FBQUEsSUFBSztBQUFBLElBQUs7QUFBQSxJQUFJO0FBQUEsSUFBSztBQUFBLElBQUc7QUFBQSxJQUFHO0FBQUEsSUFBRztBQUFBLElBQUs7QUFBQSxJQUFLO0FBQUEsSUFBSztBQUFBLElBQUk7QUFBQSxJQUFLO0FBQUEsSUFBRztBQUFBLElBQUc7QUFBQSxJQUFHO0FBQUEsSUFBSztBQUFBLElBQUs7QUFBQSxJQUFLO0FBQUEsSUFBSTtBQUFBLElBQUs7QUFBQSxJQUFHO0FBQUEsSUFBRztBQUFBLElBQUc7QUFBQSxJQUFLO0FBQUEsSUFBSztBQUFBLElBQUs7QUFBQSxJQUFJO0FBQUEsSUFBSztBQUFBLElBQUc7QUFBQSxJQUFHO0FBQUEsSUFBRztBQUFBLElBQUs7QUFBQSxJQUFLO0FBQUEsSUFBSztBQUFBLElBQUk7QUFBQSxJQUFLO0FBQUEsSUFBSztBQUFBLElBQUs7QUFBQSxJQUFLO0FBQUEsSUFBRztBQUFBLElBQUc7QUFBQSxJQUFJO0FBQUEsSUFBSztBQUFBLElBQUc7QUFBQSxJQUFHO0FBQUEsSUFBRztBQUFBLElBQUc7QUFBQSxJQUFJO0FBQUEsSUFBRztBQUFBLElBQUk7QUFBQSxJQUFJO0FBQUEsSUFBRztBQUFBLElBQUc7QUFBQSxJQUFLO0FBQUEsSUFBSTtBQUFBLElBQUc7QUFBQSxJQUFLO0FBQUEsSUFBSTtBQUFBLElBQUc7QUFBQSxJQUFLO0FBQUEsSUFBSTtBQUFBLElBQUk7QUFBQSxJQUFLO0FBQUEsSUFBSztBQUFBLElBQUk7QUFBQSxJQUFHO0FBQUEsSUFBSztBQUFBLElBQUk7QUFBQSxJQUFHO0FBQUEsSUFBSztBQUFBLElBQUk7QUFBQSxJQUFJO0FBQUEsSUFBSztBQUFBLElBQUs7QUFBQSxJQUFLO0FBQUEsSUFBSTtBQUFBLElBQUc7QUFBQSxJQUFJO0FBQUEsSUFBSTtBQUFBLElBQUs7QUFBQSxJQUFLO0FBQUEsSUFBSTtBQUFBLElBQUc7QUFBQSxJQUFJO0FBQUEsSUFBRztBQUFBLElBQUs7QUFBQSxJQUFJO0FBQUEsSUFBSTtBQUFBLElBQUc7QUFBQSxJQUFHO0FBQUEsSUFBSztBQUFBLElBQUk7QUFBQSxJQUFHO0FBQUEsSUFBSztBQUFBLElBQUk7QUFBQSxJQUFHO0FBQUEsSUFBSztBQUFBLElBQUk7QUFBQSxJQUFJO0FBQUEsSUFBSztBQUFBLElBQUs7QUFBQSxJQUFJO0FBQUEsSUFBRztBQUFBLElBQUs7QUFBQSxJQUFJO0FBQUEsSUFBRztBQUFBLElBQUs7QUFBQSxJQUFJO0FBQUEsSUFBSTtBQUFBLElBQUs7QUFBQSxJQUFLO0FBQUEsSUFBSztBQUFBLElBQUk7QUFBQSxJQUFHO0FBQUEsSUFBSTtBQUFBLElBQUk7QUFBQSxJQUFLO0FBQUEsSUFBSztBQUFBLElBQUk7QUFBQSxJQUFHO0FBQUEsSUFBSTtBQUFBLElBQUc7QUFBQSxJQUFLO0FBQUEsSUFBSTtBQUFBLElBQUk7QUFBQSxJQUFHO0FBQUEsSUFBRztBQUFBLElBQUs7QUFBQSxJQUFJO0FBQUEsSUFBRztBQUFBLElBQUs7QUFBQSxJQUFJO0FBQUEsSUFBRztBQUFBLElBQUs7QUFBQSxJQUFJO0FBQUEsSUFBSTtBQUFBLElBQUs7QUFBQSxJQUFLO0FBQUEsSUFBSTtBQUFBLElBQUc7QUFBQSxJQUFLO0FBQUEsSUFBSTtBQUFBLElBQUc7QUFBQSxJQUFLO0FBQUEsSUFBSTtBQUFBLElBQUk7QUFBQSxJQUFLO0FBQUEsSUFBSztBQUFBLElBQUs7QUFBQSxJQUFJO0FBQUEsSUFBRztBQUFBLElBQUk7QUFBQSxJQUFJO0FBQUEsSUFBSztBQUFBLElBQUs7QUFBQSxJQUFJO0FBQUEsSUFBRztBQUFBLElBQUk7QUFBQSxJQUFHO0FBQUEsSUFBSztBQUFBLElBQUk7QUFBQSxJQUFJO0FBQUEsSUFBRztBQUFBLElBQUc7QUFBQSxJQUFLO0FBQUEsSUFBSTtBQUFBLElBQUc7QUFBQSxJQUFLO0FBQUEsSUFBSTtBQUFBLElBQUc7QUFBQSxJQUFLO0FBQUEsSUFBSTtBQUFBLElBQUk7QUFBQSxJQUFLO0FBQUEsSUFBSztBQUFBLElBQUk7QUFB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
