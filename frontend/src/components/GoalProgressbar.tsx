import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { useCallback, useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getSpentGoal, updateSpentGoal } from '@/lib/api';
import { toast } from 'sonner';

export const GoalProgressbar = () => {
  const { error, data } = useQuery({
    queryKey: ['get-spent-goal'],
    queryFn: getSpentGoal,
  });

  const [spentGoal, setSpentGoal] = useState<number>(0);

  useEffect(() => {
    if (data) {
      setSpentGoal(data.spentGoal);
    }
  }, [data]);

  const mutation = useMutation({
    mutationFn: updateSpentGoal,
    onError: () => {
      toast('Error', { description: 'Failed to update Spent Goal' });
    },
    onSuccess: () => {
      toast('Success', { description: 'Spent Goal has been updated' });
    },
  });

  const [timer, setTimer] = useState<Timer | null>(null);

  const handleChange = (e: number) => {
    setSpentGoal(e);
    debouncedMutation(e);
  };

  const debouncedMutation = useCallback(
    (e: number) => {
      if (timer) clearTimeout(timer);

      const newTimer = setTimeout(() => {
        mutation.mutate({ spentGoal: e });
      }, 1000);

      setTimer(newTimer);
    },
    [mutation, timer]
  );

  if (error) return 'An error has occurred: ' + error?.message;
  return (
    <Card className="w-[350px] m-auto">
      <CardHeader>
        <CardTitle>Spent Goal:</CardTitle>
        <CardDescription>The max amount you want to spent.</CardDescription>
      </CardHeader>

      <CardContent className="text-lg flex flex-col items-center gap-y-6">
        <Input
          className="w-[100px] text-center"
          type="number"
          max={10000}
          step={25}
          defaultValue={spentGoal}
          value={spentGoal}
          placeholder="Spent Goal"
          onChange={(e) => handleChange(+e.target.value)}
        />
        <Slider
          defaultValue={[spentGoal]}
          max={10000}
          step={25}
          onValueChange={(e) => handleChange(+e[0])}
          value={[spentGoal]}
        />
      </CardContent>
    </Card>
  );
};
