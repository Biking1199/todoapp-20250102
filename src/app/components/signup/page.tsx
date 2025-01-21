"use client";

import { useState } from "react";
import { supabase } from "../../../../utils/supabase";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async () => {
    // 二重ログイン防止
    if (isLoading) return;
    setIsLoading(true);

    //バリデーションチェック
    if (!email || !password) {
      setMessage("メールアドレスとパスワードを入力してください。");
      return;
    }

    if (password.length < 6) {
      setMessage("パスワードは6文字以上である必要があります。");
      return;
    }
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    // エラーチェック
    if (error) {
      setMessage(`登録エラー：${error.message}`);
    } else {
      setMessage("登録に成功しました！確認メールをチェックしてください。");

      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  };

  return (
    <div>
      <h1>ユーザー登録</h1>
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
        onClick={handleSignUp}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        登録
      </button>
      <p>{message}</p>
    </div>
  );
}
