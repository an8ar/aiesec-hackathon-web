import { Promotion } from '~/features/afisha';

export type GetPromotionsResponse={
    promotions: Promotion[]
}

export type GetPromotionsRequest={
    jerryId: string;
}

export type SupportRequest={
    jerryId: string;
}

export type SupportResponse={
message: string;
}
