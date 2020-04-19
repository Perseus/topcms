interface ResolverResponse {
  code: string;
  success: boolean;
  message?: string;
}

interface ResolverSuccessResponse extends ResolverResponse {
  // Can't think of a way to define types for the data property. Resolvers can respond with data in any format.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

interface ResolverErrorResponse extends ResolverResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: Record<string, any>;
}
