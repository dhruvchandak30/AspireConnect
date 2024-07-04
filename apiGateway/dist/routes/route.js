"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const registry_1 = __importDefault(require("./registry"));
const loadBalancer_1 = __importDefault(require("../util/loadBalancer"));
const router = express_1.default.Router();
router.all("/:apiName/*", (req, res) => {
    const apiName = req.params.apiName;
    const path = req.params[0];
    const serviceInstance = registry_1.default.services["registrytest"];
    if (serviceInstance) {
        const service = serviceInstance.instances[0].apiName;
        if (service) {
            const strategy = serviceInstance.loadBalancerStrategy;
            const newIndex = loadBalancer_1.default[strategy](serviceInstance);
            console.log("Going to Service", newIndex);
            const url = serviceInstance.instances[newIndex].url + "/" + path;
            console.log(url);
            (0, axios_1.default)({
                method: req.method,
                url: url,
                headers: req.headers,
                data: req.body,
            })
                .then((response) => {
                res.send(response.data);
            })
                .catch((error) => {
                res.status(500).send({ message: "Internal Server Error" });
            });
        }
        else {
            res.status(404).send("Service not found");
        }
    }
    else {
        res.status(404).send("Service instance not found");
    }
});
exports.default = router;
