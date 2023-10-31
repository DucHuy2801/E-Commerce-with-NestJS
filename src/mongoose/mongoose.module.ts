import { Module } from '@nestjs/common';
import { MongooseModule as NestMongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        NestMongooseModule.forRootAsync({
          useFactory: () => ({
            uri: process.env.MONGOOSE_URI,
          }),
        }),
      ],
    exports: [NestMongooseModule],
})
export class MongooseModule {}