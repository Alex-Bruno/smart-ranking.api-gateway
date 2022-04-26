import { AwsModule } from '../aws/aws.module';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    AwsModule
  ],
  controllers: [AuthController]
})
export class AuthModule {}
