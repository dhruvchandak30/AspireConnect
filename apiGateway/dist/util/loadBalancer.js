"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loadbalancer = {
    ROUND_ROBIN: (service) => {
        const newIndex = ++service.index >= Object.keys(service.instances).length
            ? 0
            : service.index;
        service.index = newIndex;
        return newIndex;
    },
    LEAST_USED: (service) => {
        // Implement LEAST_USED logic here
        return 0;
    },
};
exports.default = loadbalancer;
