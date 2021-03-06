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

const Datastore = require("nedb");
import path from "path";


class MemoryAdapter {


    protected data: any;
    protected dbFile: string;
    protected db;
    protected _collections: [any];
    protected _dataType;
    protected state;

    protected collections = [
        'blocks',
        'block_headers',
        'payloads',
        'receipts',
        'contracts',
        'chain',
        'coinbase',
        'block_queue',
        'tx_queue',
        'merkle',
        'changes',
        'snapshots'
    ];

    constructor(dataType = "", _MODE = "dev") {

        let datadir;
        if (_MODE === "dev") {
            datadir = process.env.DATA_DEV_CHAIN_PATH;
        } else if (_MODE === "live") {
            datadir = process.env.DATA_LIVE_CHAIN_PATH;
        } else if (_MODE === "test") {
            datadir = process.env.DATA_TEST_CHAIN_PATH;

        } else if (_MODE === "local") {
            datadir = process.env.DATA_LOCAL_CHAIN_PATH;
        }
        this.dbFile = path.resolve(__dirname, `../../data/dev/`, `chain.db`);

        this.db = {
            'chain': new Datastore({filename: this.dbFile, autoload: true}),
            'blocks': new Datastore({filename:  path.resolve(__dirname, `../../data/dev/`, `blocks.db`), autoload: true}),
            'headers': new Datastore({filename:  path.resolve(__dirname, `../../data/dev/`, `headers.db`), autoload: true}),
            'receipts': new Datastore({filename:  path.resolve(__dirname, `../../data/dev/`, `receipts.db`), autoload: true}),
            'contracts': new Datastore({filename:  path.resolve(__dirname, `../../data/dev/`, `contracts.db`), autoload: true}),
            'block_queue': new Datastore({filename:  path.resolve(__dirname, `../../data/dev/`, `block_queue.db`), autoload: true}),
            'tx_queue': new Datastore({filename:  path.resolve(__dirname, `../../data/dev/`, `tx_queue.db`), autoload: true}),
            'snapshots': new Datastore({filename:  path.resolve(__dirname, `../../data/dev/`, `snapshots.db`), autoload: true})
        };


    }


    public getCollection(collection) {

        return this.db[collection];

    }


    public insertData(coll, data, cb) {

        coll.insert(data, cb);
    };

    static getData(self: MemoryAdapter, collection, criterias) {

        const col = self.db.getCollection(collection);
        let result;

        result = col.find(criterias);
        return result.data();

    }


}

export default MemoryAdapter;