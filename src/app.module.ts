import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthModuleGql } from './graphql/resolvers/auth/auths.module';

@Module({
  imports: [
    AuthModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
    }),
    AuthModuleGql,

    ConfigModule.forRoot({
      isGlobal: true, // to make it available for every module without importing it
      envFilePath: '.env',
      // to configure another custom env file path ==> replace the envFilePath
    }),
  ],
})
export class AppModule {}
