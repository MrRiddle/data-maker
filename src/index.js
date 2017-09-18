import fs from 'fs';
import Schema from './schema';

const fromDate = new Date('2017-09-10 00:00:00');
const toDate = new Date('2017-09-16 23:59:59');

const DemoDataGenerator = () => {
    const id = Schema.Integer();
    const time = Schema.Date(fromDate, toDate);
    const ip = [Schema.Integer(0, 256), Schema.Integer(0, 256), Schema.Integer(0, 256), Schema.Integer(0, 256)].join('.');
    const machineType = Schema.Enum(['iOS', 'Android', 'PC']);
    const networkType = Schema.Enum(['2G', '3G', '4G', 'Wi-Fi']);
    const cost = Schema.Integer();

    return [id, time.getTime(), ip, machineType, networkType, cost].join(',');
};

const writerStream = fs.createWriteStream('./output/data');
console.log('Begin to write.');
const START_POINT = Date.now();
writerStream.on('finish', () => {
    const FINISH_POINT = Date.now();
    console.log('Data write done.');
    console.log(`Cost ${FINISH_POINT - START_POINT} millsecounds.`);
});

const DATA_COUNT = 1000000;
for (let i = 0; i < DATA_COUNT; i += 1) {
    writerStream.write(`${DemoDataGenerator()}\n`);
}
writerStream.end();
