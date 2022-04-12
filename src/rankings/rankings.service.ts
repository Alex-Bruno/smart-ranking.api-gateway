import { Observable, lastValueFrom } from 'rxjs';
import { ClientProxySmartRanking } from 'src/proxyrmq/client-proxy';
import { Injectable, Logger, BadRequestException } from '@nestjs/common';

@Injectable()
export class RankingsService {

    constructor(
        private clientProxySmartRanking: ClientProxySmartRanking,
    ) { }

    private logger = new Logger(RankingsService.name);

    private clientRankingsBackend = this.clientProxySmartRanking.getClientProxyRankingsInstance();

    consultarRankings(idCategoria: string, dataRef: string): Promise<any> {

        if (!idCategoria)
            throw new BadRequestException(`O id da categoria é obrigatório`);

        return lastValueFrom(this.clientRankingsBackend.send('consultar-rankings', { idCategoria: idCategoria, dataRef: (dataRef) ? dataRef : '' }));

    }
}
