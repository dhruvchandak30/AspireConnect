"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registry = {
    services: {
        registrytest: {
            loadBalancerStrategy: "ROUND_ROBIN",
            index: 0,
            instances: [
                {
                    apiName: "testapi",
                    host: "http://localhost",
                    port: 3001,
                    url: "http://localhost:3001",
                },
                {
                    apiName: "testapi",
                    host: "http://localhost",
                    port: 3001,
                    url: "http://localhost:3001",
                },
                {
                    apiName: "storeprofile",
                    host: "http://localhost",
                    port: 3001,
                    url: "http://localhost:3001",
                },
            ],
        },
    },
};
exports.default = registry;
