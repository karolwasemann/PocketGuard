import app from "./app.ts";
import { logger } from 'hono/logger'

Bun.serve({
    fetch: app.fetch
   });
app.use(logger())

   app.get('/', (c) => c.text('Hono!'))