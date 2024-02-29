import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true, // to make it available for every module without importing it
      envFilePath: '.env',
      // to configure another custom env file path ==> replace the envFilePath
    }),
  ],
})
export class AppModule {}
