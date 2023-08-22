import { useRouter } from "next/router";
import { api } from "~/utils/api";


export default function Page() {
  const router = useRouter();
  const { id } = router.query;



  return (
    <div>
      <h1>Post: {id}</h1>
    </div>
  );
}
