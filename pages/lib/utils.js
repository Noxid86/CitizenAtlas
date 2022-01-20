export default {
    distance(p1, p2) {
        let distance = Math.sqrt(this.sqr(p1.x-p2.x)+this.sqr(p1.y-p2.y)+this.sqr(p1.z-p2.z))
        return distance
    },

    sqr(a) {
        return a * a;
    },

    norm(a) {
        return Math.sqrt(sqr(a.x) + sqr(a.y) + sqr(a.z));
    },

    dot(a, b) {
        return a.x * b.x + a.y * b.y + a.z * b.z;
    },

    vector_subtract(a, b) {
        return {
            x: a.x - b.x,
            y: a.y - b.y,
            z: a.z - b.z
        };
    },

    vector_add(a, b) {
        return {
            x: a.x + b.x,
            y: a.y + b.y,
            z: a.z + b.z
        };
    },

    vector_divide(a, b) {
        return {
            x: a.x / b,
            y: a.y / b,
            z: a.z / b
        };
    },

    vector_multiply(a, b) {
        return {
            x: a.x * b,
            y: a.y * b,
            z: a.z * b
        };
    },

    vector_cross(a, b) {
        return {
            x: a.y * b.z - a.z * b.y,
            y: a.z * b.x - a.x * b.z,
            z: a.x * b.y - a.y * b.x
        };
    }
}