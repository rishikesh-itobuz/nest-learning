import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // to make it available for every module without importing it
      envFilePath: '.env',
      // to configure another custom env file path ==> replace the envFilePath
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
