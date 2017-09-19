import fs from 'fs';

/**
 *
 * @param {string} name 任务名
 * @param {string} outputPath 生成文件路径
 * @param {function} generator 生成器函数，传入参数为index
 * @param {number} count 数据条数
 */
export default class Task {
    constructor(name, outputPath, generator, count) {
        this.name = name;
        this.path = outputPath;
        this.generator = generator;
        this.count = count;
    }

    run() {
        const {
            name, path, generator, count,
        } = this;
        const writerStream = fs.createWriteStream(path);
        console.log(`Task ${name} start.`);
        const START_POINT = Date.now();
        writerStream.on('finish', () => {
            const FINISH_POINT = Date.now();
            console.log(`Task ${name} finish.`);
            console.log(`Task ${name} costs ${FINISH_POINT - START_POINT} millseconds.`);
        });

        for (let i = 0; i < count; i += 1) {
            writerStream.write(`${generator(i)}\n`);
        }
        writerStream.end();
    }
}
