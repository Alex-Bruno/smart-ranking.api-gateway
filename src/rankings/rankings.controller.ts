import { Observable } from 'rxjs';
import { Controller, Get, Logger, Query, BadRequestException } from '@nestjs/common';
import { ClientProxySmartRanking } from 'src/proxyrmq/client-proxy';

@Controller('/api/v1/rankings')
export class RankingsController {

    private logger = new Logger(RankingsController.name);

    constructor(
        private clientProxySmartRanking: ClientProxySmartRanking,
    ) { }

    private clientRankingsBackend = this.clientProxySmartRanking.getClientProxyRankingsInstance();

    @Get()
    consultarRankings(
        @Query('idCategoria') idCategoria: string,
        @Query('dataRef') dataRef: string
    ): Observable<any> {

        if (!idCategoria)
            throw new BadRequestException(`O id da categoria é obrigatório`);

        return this.clientRankingsBackend.send('consultar-rankings', { idCategoria: idCategoria, dataRef: dataRef ? dataRef : '' });

    }

}
