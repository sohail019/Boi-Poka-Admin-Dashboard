import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import { useSearchParams } from "react-router-dom";

import { useGetStudents } from "../../../pages/users/queries/queries";

const RecentUserTable = () => {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || 1);
  const pageLimit = Number(5);
  const country = searchParams.get("search") || "";
  const offset = (page - 1) * pageLimit;
  const { data, isLoading } = useGetStudents({ offset, pageLimit, country });
  const users = data?.users;
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Job</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user: any) => (
            <TableRow key={user.id}>
              <TableCell>{user.first_name + " " + user.last_name}</TableCell>

              <TableCell>{user.email}</TableCell>
              <TableCell>{user.gender}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.job}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecentUserTable;
