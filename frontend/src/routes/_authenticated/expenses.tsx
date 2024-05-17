import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import {
  getAllExpensesQueryOptions,
  loadingCreateExpenseQueryOptions,
} from '@/lib/api';
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { ExpenseSkeleton } from '@/components/ExpenseSkeleton';
import { ExpenseRow } from '@/components/ExpenseRow';

export const Route = createFileRoute('/_authenticated/expenses')({
  component: Expenses,
});

function Expenses() {
  const { isPending, error, data } = useQuery(getAllExpensesQueryOptions);
  const { data: loadingCreateExpense } = useQuery(
    loadingCreateExpenseQueryOptions
  );

  if (error) return 'An error has occurred: ' + error.message;
  return (
    <div className="p-2 max-w-3xl m-auto ">
      <Table>
        <TableCaption>A list of all your expenses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="hidden sm:table-cell">Date</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loadingCreateExpense?.expense && <ExpenseSkeleton />}
          {isPending
            ? Array(5)
                .fill(0)
                .map((_, i) => <ExpenseSkeleton key={i} />)
            : data?.expenses.map((expense) => (
                <ExpenseRow key={expense.id} expense={expense} />
              ))}
        </TableBody>
      </Table>
    </div>
  );
}
