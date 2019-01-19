import Dval from './Dval';
import Metric from './Metric';

export class Branch {
    constructor(branch) {
        this.dval = branch.dval ? new Dval(branch.dval) : null;
        this.path = branch.path ? [...branch.path] : null;
        this.metrics = branch.metrics ? this.createMetrics(branch.metrics) : null;
        this.children = branch.children ? this.createChildren(branch.children) : null;
        this.natural = branch.natural;
        this.filtered = branch.filtered;
    }

    extractValueFromTree (array, metric) {
        let result = 0;
        if(this.dval && this.dval.getValue() === array[0]) {
            result = this.metrics[metric].getValue();
        } else {
            this.children.forEach((child) => {
                if (child.dval && child.dval.getValue() === array[0]) {
                    result = child.extractValueFromTree([array.pop()], metric);
                }
            });
        }
        return parseFloat(result);
    }

    getColumns(firstRow) {
        let columns = [];
        let first = firstRow ? firstRow : false;
        if(this.children && this.children.length) {
            this.children.forEach((child) => {
                columns.push(child.getColumns(true));
            });
        } else {
            columns.push(this.dval.getValue());
        }
        if (first) {
            columns = (columns.length === 1) ? columns[0] : columns;
        } else {
            columns = columns[0];
        }
        return columns;
    }

    getRows() {
        let rows = [];
        if (this.dval) {
            rows.push(this.dval.getValue());
        } else {
            rows = this.getChildrenDval();
        }
        return (rows.length === 1) ? rows[0] : rows;
    }

    getChildrenDval() {
        let titles = [];
        this.children.forEach((child) => {
            titles.push(child.getRows());
        });
        return (titles.length === 1) ? titles[0] : titles;
    }

    createMetrics(metrics) {
        const met = {};
        Object.keys(metrics).forEach((key) => {
            met[key] = new Metric(metrics[key]);
        });
        return met;
    };

    createChildren(children) {
        const array = [];
        children.forEach((child) => {
            array.push(new Branch(child));
        });
        return array;
    }
};
