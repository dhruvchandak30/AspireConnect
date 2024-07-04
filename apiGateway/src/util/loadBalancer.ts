import { ServiceInstance as RegistryServiceInstance } from "../routes/registry";

export type ServiceInstance = RegistryServiceInstance;

export interface LoadBalancer {
  ROUND_ROBIN: (service: ServiceInstance) => number;
  LEAST_USED: (service: ServiceInstance) => number;
}

const loadbalancer: LoadBalancer = {
  ROUND_ROBIN: (service: ServiceInstance) => {
    const newIndex =
      ++service.index >= Object.keys(service.instances).length
        ? 0
        : service.index;
    service.index = newIndex;
    return newIndex;
  },
  LEAST_USED: (service: ServiceInstance) => {
    // Implement LEAST_USED logic here
    return 0;
  },
};

export default loadbalancer;
