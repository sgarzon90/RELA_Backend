import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './products/products.module';
import { SalesModule } from './sales/sales.module';
import { PaymentsModule } from './payments/payments.module';
import { ReportsModule } from './reports/reports.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AttributesModule } from './attributes/attributes.module';
@Module({ imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, ProductsModule, SalesModule, PaymentsModule, ReportsModule, AuthModule, UsersModule, AttributesModule] })
export class AppModule {}
