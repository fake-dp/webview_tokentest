// PushButton.jsx
import React, { useState } from "react";

export default function PushButton() {
  const [loading, setLoading] = useState(false);

  const sendPush = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://ftkosdynbsmojo2zvtyxt3b64y0fcpqc.lambda-url.ap-southeast-2.on.aws/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: "eubyoNp7QlWNvSh6vw0exR:APA91bGeK-Hmusf3qHgbe2VJ6YLKjIYwC1gx2CDXFo6p0YCPkIEaQh_IDaU6BVe0B50IwB-LDhCeNezsnoMv0mnz5AIcRRECY1mtCLt3VOHaY8MHuhbP97U",
          title: "📢 웹에서 앱으로 푸시 성공!!",
          body: "Lambda Function URL을 통해 보냈습니다!",
        }),
      });
      const result = await res.json();
      alert(result.ok ? "✅ 푸시 전송 성공!" : `❌ 실패: ${result.error}`);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={sendPush} disabled={loading}>
      {loading ? "전송 중..." : "푸시 보내기"}
    </button>
  );
}
