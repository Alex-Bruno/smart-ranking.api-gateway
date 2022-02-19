import { LogginInterceptor } from './commom/interceptors/logging,interceptor';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './commom/filters/http-exception.filter';
import { TimeoutInterceptor } from './commom/interceptors/timeout.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new LogginInterceptor, new TimeoutInterceptor);
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(8010);
}
bootstrap();
