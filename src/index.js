import Schema from './schema';
import Task from './task';

const fromDate = new Date('2017-09-10 00:00:00');
const toDate = new Date('2017-09-16 23:59:59');
const SPEED_DATA_COUNT = 1000000;
const PAGE_DATA_COUNT = 1000;
const APP_DATA_COUNT = 100;

const speedDataTask = new Task('generate speed data', './output/speed', () => {
    const pid = Schema.Integer(1, PAGE_DATA_COUNT);
    const time = Schema.Date(fromDate, toDate);
    const ip = [Schema.Integer(0, 256), Schema.Integer(0, 256), Schema.Integer(0, 256), Schema.Integer(0, 256)].join('.');
    const machineType = Schema.Enum(['iOS', 'Android', 'PC']);
    const networkType = Schema.Enum(['2G', '3G', '4G', 'Wi-Fi']);
    const cost = Schema.Integer();

    return [pid, time.getTime(), ip, machineType, networkType, cost].join();
}, SPEED_DATA_COUNT);

const pageDataTask = new Task('generate page data', './output/page', (index) => {
    const pid = index + 1;
    const aid = Schema.Integer(1, APP_DATA_COUNT);
    const name = Schema.String(3, 5).replace(/\s/gm, '_');
    const url = `https://${[Schema.String(1, 5), Schema.String(1, 5), Schema.String(1, 5)].join('/')}.html`;

    return [pid, aid, name, url].join();
}, PAGE_DATA_COUNT);

const appDataTask = new Task('generate app data', './output/app', (index) => {
    const aid = index + 1;
    const name = Schema.String(2, 5).replace(/\s/gm, '-');
    const uid = Schema.Integer();

    return [aid, name, uid].join();
}, APP_DATA_COUNT);

speedDataTask.run();
pageDataTask.run();
appDataTask.run();
