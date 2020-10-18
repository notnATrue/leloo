export const buffer = {
    bufferPool: [],
    addBuffer: async function(jsonData) {
        await this.bufferController();
        const buffer = Buffer.from(JSON.stringify(jsonData));
        this.bufferPool.push(buffer);
        return buffer;
    },
    getBufferPool: async function() {
        let jsonData = [];
        for (const buff of this.bufferPool) {
            const jsonFromBuff = JSON.parse(this.bufferPool[this.bufferPool.indexOf(buff)].toString());
            jsonData.push(jsonFromBuff);
        }
        return this.bufferPool;
    },
    bufferController: async function () {
        if (this.bufferPool.length > 10) {
            this.bufferPool.shift();
        }
    }
};
