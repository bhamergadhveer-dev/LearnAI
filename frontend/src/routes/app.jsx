import { createFileRoute, Outlet, useParams } from "@tanstack/react-router";
import AppLayout from "@/components/layout/AppLayout";

/**
 * Layout route for the learning application.
 * Wraps every /app route in the floating-sidebar shell; child routes render
 * inside <Outlet />.
 */
export const Route = createFileRoute("/app")({
  component: AppShellRoute,
});

function AppShellRoute() {
  // `strict: false` so this works for both /app and /app/learn/$id
  const params = useParams({ strict: false });
  return (
    <AppLayout activeId={params.id}>
      <Outlet />
    </AppLayout>
  );
}
