import { LogginInterceptor } from './commom/interceptors/logging,interceptor';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as momentTimezone from 'moment-timezone';
import { AllExceptionsFilter } from './commom/filters/http-exception.filter';
import { TimeoutInterceptor } from './commom/interceptors/timeout.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new LogginInterceptor, new TimeoutInterceptor);
  app.useGlobalFilters(new AllExceptionsFilter());
  
  Date.prototype.toJSON = function (): any {
    return momentTimezone(this)
      .tz('America/Sao-Paulo')
      .format('YYYY-MM-DD HH:mm:ss.SSS');
  }

  await app.listen(8010);
}
bootstrap();
