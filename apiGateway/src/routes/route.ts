import express, { Request, Response } from 'express';
import registry from './registry';
import loadbalancer, { LoadBalancer } from '../util/loadBalancer';

const router = express.Router();

router.all('/:apiName/*', async (req: Request, res: Response) => {
    const apiName = req.params.apiName;
    const path = req.params[0];

    const serviceInstance = registry.services.registrytest;

    if (serviceInstance) {
        const service = serviceInstance.instances.find(
            (instance) => instance.apiName === apiName
        );

        if (service) {
            const strategy =
                serviceInstance.loadBalancerStrategy as keyof LoadBalancer;
            const newIndex = loadbalancer[strategy](serviceInstance);
            console.log('Going to Service', newIndex);
            const url = new URL(service.url + '/' + path);
            Object.keys(req.query).forEach((key) =>
                url.searchParams.append(key, req.query[key] as string)
            );

            console.log(url.toString(), req.body, req.method);

            const headers = Object.fromEntries(
                Object.entries(req.headers)
                    .filter(([key]) =>
                        ['content-type', 'accept', 'authorization'].includes(
                            key.toLowerCase()
                        )
                    )
                    .map(([key, value]) => [key, String(value)])
            );

            try {
                const response = await fetch(url.toString(), {
                    method: req.method,
                    headers: headers,
                    body: JSON.stringify(req.body),
                });

                if (!response.ok) {
                    throw new Error(
                        `Network response was not ok: ${response.statusText}`
                    );
                }

                const data = await response.json();

                res.status(response.status).json(data);
            } catch (error) {
                //@ts-ignore
                console.error('Fetch error:', error.message);
                res.status(500).send({ message: 'Internal Server Error' });
            }
        } else {
            res.status(404).send('Service not found');
        }
    } else {
        res.status(404).send('Service instance not found');
    }
});

export default router;
