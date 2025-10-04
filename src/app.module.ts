import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './module/v1/admin/admin.module';
import { AuthModule } from './module/v1/auth/auth.module';
import { TestModule } from './module/v1/test/test.module';

@Module({
  imports: [AdminModule, AuthModule, TestModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
