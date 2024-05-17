import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { getUser } from '../kinde';
import { db } from '../db';
import {
  expenses as expensesTable,
  insertExpensesSchema,
} from '../db/schema/expenses';
import { eq, desc, sum, and } from 'drizzle-orm';
import { createExpenseSchema } from '../sharedTypes';

export const expensesRoute = new Hono()
  .get('/', getUser, async (c) => {
    const user = c.var.user;
    const expenses = await db
      .select()
      .from(expensesTable)
      .where(eq(expensesTable.userId, user.id))
      .orderBy(desc(expensesTable.createdAt))
      .limit(100);

    return c.json({ expenses });
  })
  .post('/', getUser, zValidator('json', createExpenseSchema), async (c) => {
    const user = c.var.user;
    const expense = c.req.valid('json');
    const validatedExpense = insertExpensesSchema.parse({
      ...expense,
      userId: user.id,
    });

    const result = await db
      .insert(expensesTable)
      .values(validatedExpense)
      .returning()
      .then((res) => res[0]);

    c.status(201);
    return c.json(result);
  })
  .get('/total-spent', getUser, async (c) => {
    const user = c.var.user;
    const result = await db
      .select({ total: sum(expensesTable.amount) })
      .from(expensesTable)
      .where(eq(expensesTable.userId, user.id))
      .limit(1)
      .then((r) => r[0]);

    return c.json(result);
  })
  .get('/:id{[0-9]+}', getUser, async (c) => {
    const id = Number.parseInt(c.req.param('id'));
    const user = c.var.user;
    const expense = await db
      .select()
      .from(expensesTable)
      .where(and(eq(expensesTable.userId, user.id), eq(expensesTable.id, id)))
      .then((r) => r[0]);

    if (!expense) {
      return c.notFound();
    }
    return c.json({ expense });
  })
  .delete('/:id{[0-9]+}', getUser, async (c) => {
    const user = c.var.user;
    const id = Number.parseInt(c.req.param('id'));
    const expense = await db
      .delete(expensesTable)
      .where(and(eq(expensesTable.userId, user.id), eq(expensesTable.id, id)))
      .returning()
      .then((r) => r[0]);

    if (!expense) {
      return c.notFound();
    }
    return c.json({ expense: expense });
  });
