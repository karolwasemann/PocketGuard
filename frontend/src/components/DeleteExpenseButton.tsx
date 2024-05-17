import { useQueryClient, useMutation } from '@tanstack/react-query';
import { Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { deleteExpense, getAllExpensesQueryOptions } from '../lib/api';

export function DeleteButton({ id }: { id: number }) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteExpense,
    onError: () => {
      toast('Error', { description: 'Failed to delete expense' });
    },
    onSuccess: () => {
      toast('Success', { description: 'Expense has been deleted' });

      queryClient.setQueryData(
        getAllExpensesQueryOptions.queryKey,
        (existingExpenses) => ({
          ...existingExpenses,
          expenses: existingExpenses!.expenses.filter((e) => e.id !== id),
        })
      );
    },
  });
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => mutation.mutate({ id })}
      disabled={mutation.isPending}
    >
      {mutation.isPending ? (
        <Loader2 className="h-4 w-4" />
      ) : (
        <Trash2 className="h-4 w-4" />
      )}
    </Button>
  );
}
