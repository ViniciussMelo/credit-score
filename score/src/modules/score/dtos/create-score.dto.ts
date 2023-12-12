import { ItemType } from '@prisma/client';

import { UserDto } from '../../../shared/dtos/user.dto';


export class CreateItemDto {
  id: number;
  price: number;
  name: string;
  quantity: number;
  type: ItemType;
}

export class CreateAssetItemDto {
  userId: number;
  quantity: number;
  price: number;
  type: string;
}

export class CreateScoreDto extends UserDto {
  score: number;
  items?: CreateItemDto[]
}