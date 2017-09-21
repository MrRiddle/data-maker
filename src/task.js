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
        process.stdout.write(`Task ${name} start.\n`);
        const START_POINT = Date.now();

        let i = count;
        const write = () => {
            let ok = true;
            do {
                i -= 1;
                if (i === 0) {
                    writerStream.write(`${generator(i)}\n`, () => {
                        writerStream.end();
                        const FINISH_POINT = Date.now();
                        process.stdout.clearLine();
                        process.stdout.cursorTo(0);
                        process.stdout.write(`Task ${name} finish.\n`);
                        process.stdout.write(`Task ${name} costs ${((FINISH_POINT - START_POINT) / 1000).toFixed(2)} seconds.\n`);
                    });
                } else {
                    ok = writerStream.write(`${generator(i)}\n`);
                }
            } while (i > 0 && ok);
            if (i > 0) {
                writerStream.once('drain', () => {
                    write();
                    process.stdout.clearLine();
                    process.stdout.cursorTo(0);
                    process.stdout.write(`Task ${name} progress ${((1 - (i / count)) * 100).toFixed(2)}%.`);
                });
            }
        };

        write();
    }
}
