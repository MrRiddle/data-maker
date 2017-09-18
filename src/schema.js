const Schema = {

    /**
     *
     * @param {number} truePercent true的比率，默认50%
     */
    Boolean(truePercent = 0.5) {
        let _truePercent = 0.5;
        if (truePercent < 0) {
            _truePercent = 0;
        } else if (truePercent > 1) {
            _truePercent = 1;
        } else {
            _truePercent = truePercent;
        }

        return (Math.random() < _truePercent);
    },

    /**
     *
     * @param {number} min 最小值
     * @param {number} max 最大值
     */
    Integer(min = 0, max = 1000) {
        const distance = max - min;
        return Math.floor((distance * Math.random()) + min);
    },

    /**
     *
     * @param {number} min 最小值
     * @param {number} max 最大值
     */
    Real(min = 0, max = 1000) {
        const distance = max - min;
        return (distance * Math.random()) + min;
    },

    /**
     *
     * @param {*} values 可选值列表
     */
    Enum(values = []) {
        const { length = 0 } = values;
        if (length === 0) {
            return '';
        }
        return values[Math.floor(length * Math.random())];
    },

    /**
     *
     * @param {*} opt 配置信息
     */
    Char(opt = {}) {
        const { number = true, upperCase = true, lowerCase = true } = opt;
        const NUMBER = '0123456789';
        const UPPER_CASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const LOWER_CASE = 'abcdefghijklmnopqrstuvwxyz';

        const BASE_STRING = `${(number ? NUMBER : '')}${(upperCase ? UPPER_CASE : '')}${(lowerCase ? LOWER_CASE : '')}`;
        const LENGTH = BASE_STRING.length;

        if (LENGTH === 0) {
            return ' ';
        }
        return BASE_STRING.charAt(Math.floor((LENGTH * Math.random())));
    },

    /**
     *
     * @param {number} wordCount 单词数
     * @param {number} maxWordLength 最大单词长度
     */
    String(wordCount = 5, maxWordLength = 9) {
        const LOWER_CASE = [97, 123];
        return Array.from({ length: wordCount }).map(() => (
            Array.from({ length: this.Integer(1, maxWordLength + 1) })
                .map(() => (String.fromCharCode(this.Integer(...LOWER_CASE)))).join('')
        )).join(' ');
    },

    /**
     *
     * @param {Date} from 起始日期
     * @param {Date} to 终止日期
     */
    Date(from = 0, to = Date.now()) {
        const _from = (from instanceof Date) ? from.getTime() : from;
        const _to = (to instanceof Date) ? to.getTime() : to;
        return new Date(this.Integer(_from, _to));
    },
};

export default Schema;
