import { createFileRoute } from '@tanstack/react-router';

import { GoalProgressbar } from '@/components/GoalProgressbar';
import { TotalSpent } from '../../components/TotalSpent';

export const Route = createFileRoute('/_authenticated/')({
  component: Index,
});

function Index() {
  return (
    <div className=" flex  flex-col gap-y-8 my-4">
      <TotalSpent />
      <GoalProgressbar />
    </div>
  );
}
