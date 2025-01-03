import { getStudents } from "@/lib/api";

interface GetStudentsParams {
  offset: number;
  pageLimit: number;
  token: string;
}

export const useGetStudents = ({
  offset,
  pageLimit,
  token,
}: GetStudentsParams) => {
  return getStudents(offset, pageLimit, token);
};
