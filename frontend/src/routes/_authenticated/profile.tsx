import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { userQueryOptions } from '@/lib/api'

export const Route = createFileRoute('/_authenticated/profile')({
  component: Profile,
})

async function getCurrentUser() {
  const res = await api.me.$get();
  if (!res.ok) {
    throw new Error("server error");
  }
  const data = await res.json();
  return data;
}

function Profile() {
  // Queries
  const { isPending, error, data } = useQuery(userQueryOptions);

  if (isPending) return "loading"
  if (error) return "not logged in"

  return <div className="p-2">
    <p>Hello {data.user.given_name} {data.user.family_name}</p>
    <a href="/api/logout">Logout</a>
    </div>
}