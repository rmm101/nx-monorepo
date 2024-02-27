type BaseProduct = {
  title: string;
  image: {
    url: string;
    description: string;
  };
};

type OptionalProductProperties = Partial<BaseProduct>;

export type DetailedProduct = OptionalProductProperties & {
  slug: string;
};
