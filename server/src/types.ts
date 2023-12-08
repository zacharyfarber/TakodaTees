export interface PrintfulSyncProduct {
  name: string;
}

export interface PrintfulSyncVariant {
  id: number;
  name: string;
}

export interface PrintfulGetProductApiResponse {
  result: {
    sync_product: PrintfulSyncProduct;
    sync_variants: PrintfulSyncVariant[];
  };
}

export interface PrintfulCreateProductApiResponse {
  data: {
    sync_product: {
      id: number;
    };
  };
}
