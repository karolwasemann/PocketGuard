import { Hono } from 'hono'
import { expensesRoute } from './routes/expenses'
const app = new Hono()

app.get('/', (c) => c.text('Hono!'))


app.route('/api/expenses', expensesRoute)
export default app