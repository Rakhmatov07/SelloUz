import { Module } from '@nestjs/common';
import { MailerService } from './utils/mailer.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './models/user.model';
import { Company, CompanySchema } from './models/company.model';

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }, { name: Company.name, schema: CompanySchema }])],
    exports: [ MailerService ],
    providers: [ MailerService ]
})
export class LibsModule {}
