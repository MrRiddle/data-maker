const Schema = {

    /**
     * @param {number} truePercent true的比率，默认50%
     */
    Boolean({ truePercent = 0.5 }) {
        let _truePercent = 0.5;
        if (truePercent < 0) {
            _truePercent = 0;
        } else if (truePercent > 1) {
            _truePercent = 1;
        }

        return (Math.random() > _truePercent);
    },

    /**
     * @param {number} min 最小值
     * @param {number} max 最大值
     */
    Integer({ min = 0, max = 1000 }) {
        const distance = max - min;
        return Math.round((distance * Math.random()) + min);
    },

    /**
     * @param {number} min 最小值
     * @param {number} max 最大值
     */
    Real({ min = 0, max = 1000 }) {
        const distance = max - min;
        return (distance * Math.random()) + min + Math.random();
    },

    Word({ maxLength = 7 })
};

export default Schema;
