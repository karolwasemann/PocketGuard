import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';

const expenseSchema = z.object({
  id: z.number(),
  title: z.string(),
  amount: z.number(),
  description: z.string(),
});
type Expense = z.infer<typeof expenseSchema>;
const createPostSchema = expenseSchema.omit({ id: true });
const fakeExpenses: Expense[] = [
  {
    id: 1,
    title: 'Expense 1',
    amount: 10,
    description: 'First expense',
  },
  {
    id: 2,
    title: 'Expense 2',
    amount: 20,
    description: 'Second expense',
  },
  {
    id: 3,
    title: 'Expense 3',
    amount: 30,
    description: 'Third expense',
  },
];

export const expensesRoute = new Hono()
  .get('/', (c) => c.json({ expenses: [] }))
  .post('/', zValidator('json', createPostSchema), async (c) => {
    const data = await c.req.valid('json');
    const expense = createPostSchema.parse(data);
    fakeExpenses.push({ ...expense, id: fakeExpenses.length + 1 });
    c.status(201);
    return c.json(expense);
  })
  .get('/total-spent', (c) => {
    const total = fakeExpenses.reduce((acc, e) => acc + e.amount, 0);
    return c.json({ total });
  })
  .get('/:id{[0-9]+}', (c) => {
    const id = Number.parseInt(c.req.param('id'));
    const expense = fakeExpenses.find((e) => e.id === id);
    if (!expense) {
      return c.notFound();
    }
    return c.json({ expense });
  })
  .delete('/:id{[0-9]+}', (c) => {
    const id = Number.parseInt(c.req.param('id'));
    const index = fakeExpenses.findIndex((e) => e.id === id);
    if (index === -1) {
      return c.notFound();
    }
    const deletedExpense = fakeExpenses.splice(index, 1)[0];
    return c.json({ message: 'Expense deleted', expense: deletedExpense });
  });
