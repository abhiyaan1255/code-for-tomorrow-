import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { ServiceModule } from './service/service.module';
import { PrismaService } from './prisma.service';


@Module({
  imports: [AuthModule, CategoryModule, ServiceModule],
  providers: [PrismaService],
})
export class AppModule {}
