import { Module } from '@nestjs/common';
import { AuthService } from './auth.servicegql';
import { authResolver } from './auth.resolver';
import { PrismaService } from 'src/prisma.service';
@Module({
  imports: [],
  providers: [AuthService, authResolver, PrismaService],
})
export class AuthModuleGql {}
