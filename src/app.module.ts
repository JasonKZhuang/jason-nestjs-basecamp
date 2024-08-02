import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';

@Module({
  imports: [],
  // using nest command line interface to generate a new controller, it will automatically be added here
  // $ nest g controller [name]
  controllers: [AppController, CatsController],
  providers: [AppService],
})
export class AppModule {}
