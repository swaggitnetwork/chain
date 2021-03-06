/*
 * Copyright (c) 2019. The Swaggit Network (www.swaggit.net)
 * Copyright (c) 2019. Nicolas Cloutier (nicknailers69@gmail.com)
 *
 *  This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

'use strict';

import crypto from 'crypto';
import bs58 from 'bs58';

const forge = require('node-forge');

class Hashing {

    private readonly dataToHash: string | Buffer;
    private readonly hash: Buffer;
    private hashString: string;
    private hashEncoded: string;

    constructor(hashType: string = "sha3-512", hashData: string | Buffer, toString: boolean = true, bs58encoded: boolean = false, doubleHash: boolean = false) {


        if (hashData) {

            this.dataToHash = hashData;
            this.hash = crypto.createHash(hashType).update(this.dataToHash).digest();


            if (toString === true) {
                this._toString();
            } else if (bs58encoded === true) {
                this._toBS58();
            }

            this.returnHash();

        } else {
            throw Error('no data to hash');
        }


    }


    _SHA256 = (hex: string) => {

        let md = forge.md.sha256.create();
        md.update(hex);
        return md.digest().toHex();

    };

    _SHA512 = (str: string) => {
        let md = forge.md.sha512.create();
        md.update(str);
        return md.digest().toHex();
    };

    _SHA512256 = (str: string) => {
        let md = forge.md.sha512.sha256.create();
        md.update(str);
        return md.digest().toHex();
    };

    _toString = () => {

        this.hashString = this.hash.toString('hex');

    };

    _toBS58 = () => {

        this.hashEncoded = bs58.stringify(this.hash);

    };

    returnHash = () => {
      return this.hashString;
    }


}

export default Hashing;