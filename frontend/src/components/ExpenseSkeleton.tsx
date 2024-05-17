import { TableCell, TableRow } from './ui/table';
import { Skeleton } from './ui/skeleton';

export const ExpenseSkeleton = () => {
  return (
    <TableRow>
      <TableCell className="w-[100px]">
        <Skeleton className="h-4 " />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 " />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 " />
      </TableCell>
      <TableCell className="text-right">
        <Skeleton className="h-4 " />
      </TableCell>
    </TableRow>
  );
};
