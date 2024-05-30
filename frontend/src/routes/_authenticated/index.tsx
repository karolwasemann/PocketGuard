import { createFileRoute } from '@tanstack/react-router';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { api } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { GoalProgressbar } from '@/components/GoalProgressbar';

export const Route = createFileRoute('/_authenticated/')({
  component: Index,
});

const getTotalSpent = async () => {
  const res = await api.expenses['total-spent'].$get();
  if (!res.ok) throw new Error('Failed to fetch total spent');
  const data = await res.json();
  return data;
};
function Index() {
  const { isPending, error, data } = useQuery({
    queryKey: ['get-total-spent'],
    queryFn: getTotalSpent,
  });

  if (error) return 'An error has occurred: ' + error.message;
  return (
    <div className=" flex  flex-col gap-y-8 my-4">
      <Card className="w-[350px] m-auto">
        <CardHeader>
          <CardTitle>Total Spent:</CardTitle>
          <CardDescription>The total amount you've spent.</CardDescription>
        </CardHeader>
        <CardContent>{isPending ? '....' : data.total}</CardContent>
      </Card>
      <GoalProgressbar />
    </div>
  );
}
