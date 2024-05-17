import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from '@tanstack/react-form';
import { api } from '@/lib/api';
import { Textarea } from '@/components/ui/textarea';
export const Route = createFileRoute('/_authenticated/create-expense')({
  component: CreateExpense,
});

function CreateExpense() {
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      title: '',
      description: '',
      amount: '0',
    },
    onSubmit: async ({ value }) => {
      const res = await api.expenses.$post({ json: value });
      if (!res.ok) throw new Error('Failed to create expense');
      navigate({ to: '/expenses' });
    },
  });
  return (
    <div className="p-2  max-w-xl m-auto ">
      <h2 className="text-center my-3">Create expense</h2>
      <form
        className="flex flex-col gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.Field
          name="title"
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
              <Label htmlFor="title">Title</Label>
              {field.state.meta.touchedErrors ? (
                <em>{field.state.meta.touchedErrors}</em>
              ) : null}
            </>
          )}
        />
        <form.Field
          name="description"
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

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button type="submit" disabled={!canSubmit}>
              {isSubmitting ? '...' : 'Submit'}
            </Button>
          )}
        />
      </form>
    </div>
  );
}

// function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
//   return (
//     <>
//       {field.state.meta.touchedErrors ? (
//         <em>{field.state.meta.touchedErrors}</em>
//       ) : null}
//       {field.state.meta.isValidating ? 'Validating...' : null}
//     </>
//   );
// }
