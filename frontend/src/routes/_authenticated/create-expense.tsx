import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { useForm } from '@tanstack/react-form';
import { createExpense } from '@/lib/api';
import { Textarea } from '@/components/ui/textarea';

import { zodValidator } from '@tanstack/zod-form-adapter';
import {
  getAllExpensesQueryOptions,
  loadingCreateExpenseQueryOptions,
} from '@/lib/api';
import { useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';

import { createExpenseSchema } from '@server/sharedTypes';
import { toast } from 'sonner';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '../../lib/utils';
import { CalendarIcon } from 'lucide-react';
export const Route = createFileRoute('/_authenticated/create-expense')({
  component: CreateExpense,
});

function CreateExpense() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const form = useForm({
    validatorAdapter: zodValidator,
    defaultValues: {
      title: '',
      description: '',
      amount: '0',
      date: new Date().toLocaleDateString('en-CA'),
    },
    onSubmit: async ({ value }) => {
      const existingExpenses = await queryClient.ensureQueryData(
        getAllExpensesQueryOptions
      );
      navigate({ to: '/expenses' });

      queryClient.setQueryData(loadingCreateExpenseQueryOptions.queryKey, {
        expense: value,
      });

      try {
        const newExpense = await createExpense({ value });
        queryClient.setQueryData(getAllExpensesQueryOptions.queryKey, {
          ...existingExpenses,
          expenses: [newExpense, ...existingExpenses.expenses],
        });
        toast('Expense has been added', {
          description: `Expense has been created successfully: ${newExpense.title}`,
        });
      } catch (e) {
        toast('Somthing went wrong', {
          description: 'Unfortunatly we could not create the expense.',
        });
        console.log('e', e);
      } finally {
        queryClient.setQueryData(loadingCreateExpenseQueryOptions.queryKey, {});
      }
    },
  });
  return (
    <div className="p-2  max-w-xl m-auto ">
      <h2 className="text-center my-3">Create expense</h2>
      <form
        className="flex flex-col gap-4 "
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.Field
          name="title"
          validators={{
            onChange: createExpenseSchema.shape.title,
          }}
          children={(field) => (
            <>
              <Label htmlFor={field.name}>Title</Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.touchedErrors ? (
                <em>{field.state.meta.touchedErrors}</em>
              ) : null}
            </>
          )}
        />
        <form.Field
          name="description"
          validators={{
            onChange: createExpenseSchema.shape.description,
          }}
          children={(field) => (
            <>
              <Label htmlFor={field.name}>Description</Label>
              <Textarea
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.touchedErrors ? (
                <em>{field.state.meta.touchedErrors}</em>
              ) : null}
            </>
          )}
        />
        <form.Field
          name="amount"
          validators={{
            onChange: createExpenseSchema.shape.amount,
          }}
          children={(field) => (
            <>
              <Label htmlFor={field.name}>Amount</Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                type="number"
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.touchedErrors ? (
                <em>{field.state.meta.touchedErrors}</em>
              ) : null}
            </>
          )}
        />
        <form.Field
          name="date"
          validators={{
            onChange: createExpenseSchema.shape.date,
          }}
          children={(field) => (
            <div className="self-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    className={cn('w-[240px] pl-3 text-left font-normal')}
                  >
                    {field.state.value ? (
                      format(field.state.value, 'PPP')
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={new Date(field.state.value)}
                    onSelect={(date) =>
                      field.handleChange(
                        (date ?? new Date()).toLocaleDateString('en-CA')
                      )
                    }
                  />
                </PopoverContent>
              </Popover>
              {field.state.meta.touchedErrors ? (
                <em>{field.state.meta.touchedErrors}</em>
              ) : null}
            </div>
          )}
        />
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button className="mt-3" type="submit" disabled={!canSubmit}>
              {isSubmitting ? '...' : 'Submit'}
            </Button>
          )}
        />
      </form>
    </div>
  );
}
