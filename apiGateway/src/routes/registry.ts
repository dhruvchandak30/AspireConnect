export type Service = {
  apiName: string;
  host: string;
  port: number;
  url: string;
};

export type ServiceInstance = {
  index: number;
  instances: Service[]; // Changed to an array of Service objects
  loadBalancerStrategy: "ROUND_ROBIN" | "LEAST_USED";
};

const registry: { services: Record<string, ServiceInstance> } = {
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
          apiName: "testapi",
          host: "http://localhost",
          port: 3001,
          url: "http://localhost:3001",
        },
      ],
    },
  },
};

export default registry;
