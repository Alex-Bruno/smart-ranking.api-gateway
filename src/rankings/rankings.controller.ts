import { RankingsService } from './rankings.service';
import { Observable } from 'rxjs';
import { Controller, Get, Logger, Query } from '@nestjs/common';

@Controller('/api/v1/rankings')
export class RankingsController {

    private logger = new Logger(RankingsController.name);

    constructor(
        private rankingsService: RankingsService,
    ) { }

    @Get()
    async consultarRankings(
        @Query('idCategoria') idCategoria: string,
        @Query('dataRef') dataRef: string
    ): Promise<any> {

        return await this.rankingsService.consultarRankings(idCategoria, dataRef);

    }

}
