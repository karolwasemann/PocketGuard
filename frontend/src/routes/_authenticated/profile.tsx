import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { userQueryOptions } from '@/lib/api';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { getInitials } from '@/lib/utils';

export const Route = createFileRoute('/_authenticated/profile')({
  component: Profile,
});

function Profile() {
  const { isPending, error, data } = useQuery(userQueryOptions);

  if (isPending) return 'loading';
  if (error) return 'not logged in';

  return (
    <div className="p-2">
      <div className="flex flex-col items-center gap-2 justify-center ">
        <Avatar>
          {data.user.picture && (
            <AvatarImage src={data.user.picture} alt={data.user.given_name} />
          )}
          <AvatarFallback>
            {getInitials(data.user.given_name, data.user.family_name)}
          </AvatarFallback>
        </Avatar>
        <p>
          {data.user.given_name} {data.user.family_name}
        </p>
        <Button asChild className="my-4">
          <a href="/api/logout">Logout!</a>
        </Button>
      </div>
    </div>
  );
}
