import { Promotion } from '~/features/afisha';

export type GetPromotionsResponse={
    promotions: Promotion[]
}

export type GetPromotionsRequest={
    jerryId: string;
}
