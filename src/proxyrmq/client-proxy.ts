// Provider centralizador do ClientProxy
import { Injectable } from "@nestjs/common";
import { ClientProxy, ClientProxyFactory, Transport } from "@nestjs/microservices";

@Injectable()
export class ClientProxySmartRanking {
    getClientProxyAdminBackendInstance(): ClientProxy {

        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: ['amqp://user:PROBk3xcaH0b@54.144.175.54:5672/smartranking'],
                queue: 'admin-backend'
            },
        });

    }
}