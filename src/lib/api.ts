import axiosInstance from "@/utils/axios-instance";
// ---------------------------- Student API ------------------------------------------------- //
// export async function resendEmail(email: string) {
//     try {
//       const res = await axios.post("/auth/register/resend-email/", { email });
//       return res.data;
//     } catch (error) {
//       console.log(error);
//       return error;
//     }
// }

export async function getStudents(
  offset: number,
  pageLimit: number,
  token: string
) {
  try {
    const res = await axiosInstance.get(
      `/admin/users?offset=${offset}&pageLimit=${pageLimit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}
