import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RootState } from '@/store';
import axiosInstance from '@/utils/axios-instance';
import { Book, BookA, CalendarRange, User, User2, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

interface DashboardData {
  totalBooks: number;
  totalUsers: number;
  totalInnerCircles: number;
  booksAddedLastMonth: number;
}

export default function Stats() {
const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

const token = useSelector((state: RootState) => state.auth.token);

useEffect(() => {
  const fetchDashboardData = async () => {
    try {
      const response = await axiosInstance.get("/admin/getDashboardData", {
        headers: {
            Authorization: `Bearer ${token}`,
        }
      });
      setDashboardData(response.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  fetchDashboardData();
}, [token]);

if (!dashboardData) {
  return <div>Loading...</div>;
}

const {totalBooks, totalUsers, totalInnerCircles, booksAddedLastMonth} = dashboardData;
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Books</CardTitle>
          <Book className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalBooks}</div>
          <p className="text-xs text-muted-foreground">
            +20.1% from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          <User className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalUsers}</div>
          <p className="text-xs text-muted-foreground">
            +180.1% from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Number of Inner Circle
          </CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+{totalInnerCircles}</div>
          <p className="text-xs text-muted-foreground">+19% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Books Added Last Month
          </CardTitle>
          <CalendarRange className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+{booksAddedLastMonth}</div>
          <p className="text-xs text-muted-foreground">+201 since last hour</p>
        </CardContent>
      </Card>
    </div>
  );
}
