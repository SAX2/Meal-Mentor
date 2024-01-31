import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  return router.back();
};

export default page;
