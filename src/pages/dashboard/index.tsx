import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RecentSales from "../../components/dashboard/components/recent-sales";
import Overview from "@/components/dashboard/components/overview";
import PopularGenre from "@/components/dashboard/components/popular-genre";
import { useSearchParams } from "react-router-dom";
import { useGetStudents } from "../users/queries/queries";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/routes/hooks";
import RecentUserTable from "@/components/dashboard/components/recent-users-table";
import Stats from "@/components/dashboard/components/stats";

export default function DashboardPage() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || 1);
  const pageLimit = Number(searchParams.get("limit") || 10);
  const country = searchParams.get("search") || "";
  const offset = (page - 1) * pageLimit;
  const { isLoading } = useGetStudents({ offset, pageLimit, country });

  const router = useRouter();

  if (isLoading) {
    return <h1>Loading!!!</h1>;
  }
  return (
    <>
      <div className="max-h-screen flex-1 space-y-4 overflow-y-auto p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Hi, Welcome To Boi Poka Dashboard 👋
          </h2>
        </div>
        <Stats />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Most Popular Genre</CardTitle>
            </CardHeader>
            <CardContent className="pl-2 ">
              <PopularGenre />
            </CardContent>
          </Card>
          <Card className="col-span-4 md:col-span-3">
            <CardHeader>
              <CardTitle>Top 5 Books</CardTitle>
              <CardDescription>You made 265 sales this month.</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentSales />
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Types of Books</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <Overview />
            </CardContent>
          </Card>
          <Card className="col-span-4 md:col-span-3">
            <CardHeader>
              <CardTitle>Source Of Books</CardTitle>
              <CardDescription>You made 265 sales this month.</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentSales />
            </CardContent>
          </Card>
        </div>
        <div className="w-full">
          <Card>
            <CardHeader>
              <CardTitle>
                <div className="flex flex-row justify-between items-center">
                  <span>Recently Added Users</span>

                  <Button
                    onClick={() => {
                      router.push("/users");
                    }}
                  >
                    View All
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RecentUserTable />
              {/* <DataTable columns={columns} data={users} pageCount={pageCount} /> */}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
