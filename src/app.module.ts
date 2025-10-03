import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './module/v1/admin/admin.module';
import { AuthModule } from './module/v1/auth/auth.module';

@Module({
  imports: [AdminModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
