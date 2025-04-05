const validator = (schema, request) => {
  const result = schema.safeParse(request);

  if (!result.success) {
    const firstError = result.error.errors[0];

    const field = firstError?.path[0] ?? "unknown";
    const message = firstError?.message ?? "validation failed";

    const validationError = new Error(`${field}: ${message}`);
    validationError.statusCode = 400;
    throw validationError;
  }

  return result.data;
};

export { validator };
