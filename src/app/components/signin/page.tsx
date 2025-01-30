"use client";

import { useState } from "react";
import { supabase } from "../../../../utils/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async () => {
    if (isLoading) return;
    setIsLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!email || !password) {
      setMessage("メールアドレスとパスワードを入力してください。");
      return;
    }
    if (password.length < 6) {
      setMessage("パスワードは６文字以上である必要があります。");
      return;
    }
    if (error) {
      setMessage(`ログインエラー：${error.message}`);
    } else {
      setMessage("ログイン成功！");

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setMessage("ユーザー情報の取得に失敗しました。");
        setIsLoading(false);
        return;
      }

      const { data: tasks, error: taskError } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", user.id);
    }
    setTimeout(() => {
      router.push("/");
    }, 2000);
    setIsLoading(false);
  };

  return (
    <div>
      <h1>ログイン</h1>
      <Link
        href="/components/signup"
        className="bg-yellow-500 text-white px-4 py-2 rounded"
      >
        サインアップ
      </Link>
      <input
        type="email"
        placeholder="メールアドレス"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="password"
        placeholder="パスワード"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <button
        onClick={handleSignIn}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        ログイン
      </button>
      <p>{message}</p>
    </div>
  );
}
