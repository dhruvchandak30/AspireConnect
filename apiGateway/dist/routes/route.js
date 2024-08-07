"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const registry_1 = __importDefault(require("./registry"));
const loadBalancer_1 = __importDefault(require("../util/loadBalancer"));
const router = express_1.default.Router();
router.all('/:apiName/*', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const apiName = req.params.apiName;
    const path = req.params[0];
    const serviceInstance = registry_1.default.services.registrytest;
    if (serviceInstance) {
        const service = serviceInstance.instances.find((instance) => instance.apiName === apiName);
        if (service) {
            const strategy = serviceInstance.loadBalancerStrategy;
            const newIndex = loadBalancer_1.default[strategy](serviceInstance);
            console.log('Going to Service', newIndex);
            const url = new URL(service.url + '/' + path);
            Object.keys(req.query).forEach((key) => url.searchParams.append(key, req.query[key]));
            console.log(url.toString(), req.body, req.method);
            const headers = Object.fromEntries(Object.entries(req.headers)
                .filter(([key]) => ['content-type', 'accept', 'authorization'].includes(key.toLowerCase()))
                .map(([key, value]) => [key, String(value)]));
            try {
                const response = yield fetch(url.toString(), {
                    method: req.method,
                    headers: headers,
                    body: JSON.stringify(req.body),
                });
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                const data = yield response.json();
                res.status(response.status).json(data);
            }
            catch (error) {
                //@ts-ignore
                console.error('Fetch error:', error.message);
                res.status(500).send({ message: 'Internal Server Error' });
            }
        }
        else {
            res.status(404).send('Service not found');
        }
    }
    else {
        res.status(404).send('Service instance not found');
    }
}));
exports.default = router;
