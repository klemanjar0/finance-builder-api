import { ApiProperty } from '@nestjs/swagger';
import { IPageable, PageableCountDto } from '../../utils/common/types';
import { Account } from '../../models/account/AccountSchema';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
import { Transaction } from '../../models/transaction/TransactionSchema';

export interface CreateAccountPayload {
  name: string;
  description: string;
}

export class WithUuidDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  id: string;
}

export class DeleteTransactionDto extends WithUuidDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  transactionId: string;
}

export class CreateAccountDto implements CreateAccountPayload {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsNumber()
  @ApiProperty()
  budget: string;
}

export class UpdateAccountDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsNumber()
  @ApiProperty()
  budget: string;
}

export class GetAccountsDto {
  @ApiProperty()
  limit: number;

  @ApiProperty()
  offset: number;

  @ApiProperty()
  sort?: string;
}

export class GetTransactionsDto implements IPageable {
  @ApiProperty()
  limit: number;

  @ApiProperty()
  offset: number;
}

export class ToggleFavoriteAccountDto {
  @ApiProperty()
  status: boolean;
}

export class GetAccountsResponseDto {
  @ApiProperty({ description: 'Accounts array', type: () => [Account] })
  data: Account[];

  @ApiProperty()
  pageable: PageableCountDto;
}

export class GetTransactionsResponseDto {
  @ApiProperty({ description: 'Transactions array', type: () => [Transaction] })
  data: Transaction[];

  @ApiProperty()
  pageable: PageableCountDto;
}

export const isCreateAccountPayload = (
  payload: any,
): payload is CreateAccountPayload => {
  return (
    !!payload.name &&
    !!payload.description &&
    typeof payload.name == 'string' &&
    typeof payload.description == 'string'
  );
};

export type GetAccountsOptions = IPageable;

export const accountKeys: (keyof Account)[] = [
  'name',
  'description',
  'isFavorite',
  'budget',
  'currentBalance',
];

class SpentByTypeDto {
  [key: string]: number;
}

export class GetGlobalInfoDto {
  @ApiProperty()
  totalBudget: number;

  @ApiProperty()
  totalSpent: number;

  @ApiProperty()
  totalSpentThisMonth: number;

  @ApiProperty({ type: () => SpentByTypeDto })
  spentByType: SpentByTypeDto;
}
