import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../user/UserSchema';
import { ApiProperty } from '@nestjs/swagger';
import { Transaction } from '../transaction/TransactionSchema';
import { Document, Types } from 'mongoose';

export type AccountDocument = mongoose.HydratedDocument<Account>;

@Schema()
export class Account extends Document {
  @ApiProperty({
    example: '123-qwe-asd',
    description: 'Entity ID',
    required: true,
  })
  @Prop({ required: true })
  id: mongoose.Schema.Types.UUID;

  @ApiProperty({ example: 'Main', description: 'Account Name', required: true })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ example: 'My Savings', description: 'Account Description' })
  @Prop()
  description: string;

  @ApiProperty({
    example: 123.45,
    description: 'Auto-calculated field, depending on transactions',
  })
  @Prop({ default: 0 })
  currentBalance: number;

  @ApiProperty({
    example: 1234.5,
    description: 'Budget, set by user',
  })
  @Prop({ default: 0 })
  budget: number;

  @ApiProperty({ example: false, description: 'Account favorite status' })
  @Prop({ default: false })
  isFavorite: boolean;

  @ApiProperty({
    example: '6asd6ahshiudh',
    description: 'User key',
    required: true,
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @ApiProperty({ type: () => [Transaction] })
  @Prop([Transaction])
  transactions: Array<Transaction>;

  @ApiProperty()
  @Prop()
  createdAt: mongoose.Schema.Types.Date;

  @ApiProperty()
  @Prop()
  updatedAt: mongoose.Schema.Types.Date;
}

export const AccountSchema = SchemaFactory.createForClass(Account);

AccountSchema.pre('updateOne', function () {
  this.set({ updatedAt: new Date() });
});
