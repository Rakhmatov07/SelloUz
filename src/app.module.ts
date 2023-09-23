import { Module } from '@nestjs/common';
import { AuthModule } from './api/auth/auth.module';
import { LibsModule } from './libs/libs.module';
import { UserModule } from './api/user/user.module';
import { CompanyModule } from './api/company/company.module';
import { ProductModule } from './api/product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './api/admin/admin.module';
import { OrderModule } from './api/order/order.module';
import { FileModule } from './api/file/file.module';
import { ReviewModule } from './api/review/review.module';
import { WalletModule } from './api/wallet/wallet.module';
const db_url = process.env.DB_URL;

@Module({
  imports: [AuthModule, LibsModule, UserModule, CompanyModule, ProductModule, 
    MongooseModule.forRoot(db_url), AdminModule, OrderModule, FileModule, ReviewModule, WalletModule],
})
export class AppModule {}
