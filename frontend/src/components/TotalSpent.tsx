import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

const getTotalSpent = async () => {
  const res = await api.expenses['total-spent'].$get();
  if (!res.ok) throw new Error('Failed to fetch total spent');
  const data = await res.json();
  return data;
};

export const TotalSpent = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['get-total-spent'],
    queryFn: getTotalSpent,
  });

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <Card className="w-[350px] m-auto">
      <CardHeader>
        <CardTitle>Total Spent:</CardTitle>
        <CardDescription>The total amount you've spent.</CardDescription>
      </CardHeader>
      <CardContent>
        {isPending ? <Skeleton className="h-4 w-14" /> : data.total}
      </CardContent>
    </Card>
  );
};
