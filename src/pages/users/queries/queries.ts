import { getStudents } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

interface GetStudentsParams {
    offset: number;
    pageLimit: number;
    country: string;
}

export const useGetStudents = ({ offset, pageLimit, country }: GetStudentsParams) => {
    return useQuery({
        queryKey: ["students", offset, pageLimit, country],
        queryFn: async () => getStudents(offset, pageLimit, country),
    });
};
