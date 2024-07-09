import express, { Request, Response } from "express";
import registry from "./registry";
import loadbalancer, { LoadBalancer } from "../util/loadBalancer";

const router = express.Router();

router.all("/:apiName/*", async (req: Request, res: Response) => {
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
      const options: RequestInit = {
        method: req.method as string,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      };

      fetch(url, options)
        .then(async (response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          res.send(data);
        })
        .catch((error) => {
          console.error("Fetch error:", error);
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
