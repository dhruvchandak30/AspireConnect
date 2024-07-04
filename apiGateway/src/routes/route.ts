import express, { Request, Response } from "express";
import axios from "axios";
import registry, { Service } from "./registry";
import loadbalancer, {
  LoadBalancer,
  ServiceInstance,
} from "../util/loadBalancer";

const router = express.Router();

router.all("/:apiName/*", (req: Request, res: Response) => {
  const apiName = req.params.apiName;
  const path = req.params[0];

  const serviceInstance = registry.services["registrytest"];

  if (serviceInstance) {
    const service = serviceInstance.instances[0].apiName;

    if (service) {
      const strategy =
        serviceInstance.loadBalancerStrategy as keyof LoadBalancer;
      const newIndex = loadbalancer[strategy](serviceInstance);
      console.log("Going to Service", newIndex);
      const url = serviceInstance.instances[newIndex].url + "/" + path;
      console.log(url);
      axios({
        method: req.method as any,
        url: url,
        headers: req.headers,
        data: req.body,
      })
        .then((response: any) => {
          res.send(response.data);
        })
        .catch((error: any) => {
          res.status(500).send({ message: "Internal Server Error" });
        });
    } else {
      res.status(404).send("Service not found");
    }
  } else {
    res.status(404).send("Service instance not found");
  }
});

export default router;
