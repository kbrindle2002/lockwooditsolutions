import { builder } from '@builder.io/react';

if (!process.env.NEXT_PUBLIC_BUILDER_API_KEY) {
  console.warn('Missing NEXT_PUBLIC_BUILDER_API_KEY for Builder.io');
}
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY || '');

export { builder };
