import NodeCache from  "node-cache";

export const buffer = {
    responseCache: new NodeCache(),
    responseCount: 0,
    responseCacheController: async function () {
        this.responseCount++;
        if (this.responseCount >= 9) {
            this.responseCache.del(0)
            this.responseCount = 0;
        }
        if (this.responseCache.has(this.responseCount) === true) {
            console.log(this.responseCount)
            this.responseCache.del(this.responseCount);
        }
    },
    setBuffer: async function(jsonData) {
        await this.responseCacheController();
        console.log(this.responseCount)
        this.responseCache.set(this.responseCount, jsonData);
    },
    getBufferPool: async function() {
        let keys = [];
        for (let i = 0; i <= this.responseCount; i++) {
            keys.push(i);
        }
        return this.responseCache.mget(keys);
    },
    bufferController: async function () {

    }
};
