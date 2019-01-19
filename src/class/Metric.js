export default class Metric {
    constructor(metric) {
        this.value = metric.value;
        this.comparisons = [...metric.comparisons];
        this.uplifts = [...metric.uplifts];
        this.forecast = metric.forecast;
    }

    getValue() {
        return this.value;
    }
};