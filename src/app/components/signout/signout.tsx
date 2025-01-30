import { supabase } from "../../../../utils/supabase";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("ログアウトに失敗しました:", error.message);
    } else {
      router.push("/components/signin"); // ログアウト後にサインインページへ
    }
  };

  return (
    <button
      onClick={handleSignOut}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
    >
      サインアウト
    </button>
  );
}
