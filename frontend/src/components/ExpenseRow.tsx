import { Expense } from '@server/sharedTypes';
import { DeleteButton } from './DeleteExpenseButton';
import { TableRow, TableCell } from './ui/table';

export const ExpenseRow = ({ expense }: { expense: Expense }) => {
  return (
    <TableRow key={expense.id}>
      <TableCell className="font-medium">{expense.title}</TableCell>
      <TableCell>{expense.description}</TableCell>
      <TableCell className="hidden sm:table-cell">{expense.date}</TableCell>
      <TableCell className="text-right">{expense.amount}</TableCell>
      <TableCell className="text-right">
        <DeleteButton id={expense.id} />
      </TableCell>
    </TableRow>
  );
};
