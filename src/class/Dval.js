export default class Dval {
    constructor(dval) {
        this.id = dval.id ? dval.id : undefined;
        this.dimesion_id = dval.dimesion_id ? dval.dimesion_id : undefined;
        this.value = dval.value ? dval.value : undefined;
        this.name = dval.name ? dval.name : undefined;
        this.colour = dval.colour ? dval.colour : undefined;
        this.filtered = dval.filtered ? dval.filtered : undefined;
    }

    getValue() {
        return this.value;
    }
};