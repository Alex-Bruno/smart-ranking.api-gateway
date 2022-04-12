import { ProxyrmqModule } from 'src/proxyrmq/proxyrmq.module';
import { Module } from '@nestjs/common';
import { RankingsController } from './rankings.controller';
import { RankingsService } from './rankings.service';

@Module({
  imports: [
    ProxyrmqModule
  ],
  controllers: [RankingsController],
  providers: [RankingsService]
})
export class RankingsModule {}
