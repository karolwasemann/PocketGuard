import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from '@tanstack/react-router';
import { type QueryClient } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: Root,
});

function NavBar() {
  return (
    <div className="flex flex-wrap justify-around items-baseline p-4 m-auto">
      <Link to="/" className="[&.active]:font-bold">
        <h1 className=" text-2xl">Pocket Guard</h1>
      </Link>
      <div className="flex gap-4">
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
        <Link to="/expenses" className="[&.active]:font-bold">
          Expenses
        </Link>
        <Link to="/create-expense" className="[&.active]:font-bold">
          Create
        </Link>
        <Link to="/profile" className="[&.active]:font-bold">
          Profile
        </Link>
      </div>
    </div>
  );
}

function Root() {
  return (
    <>
      <NavBar />
      <hr />
      <Outlet />
      <Toaster />
    </>
  );
}
