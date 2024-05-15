import app from './app.ts';

Bun.serve({
  fetch: app.fetch,
});

app.get('/', (c) => c.text('Hono!'));
