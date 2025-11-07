// PushButton.jsx
import React, { useState } from "react";

export default function PushButton() {
  const [loading, setLoading] = useState(false);

  const sendPush = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://ftkosdynbsmojo2zvtyxt3b64y0fcpqc.lambda-url.ap-southeast-2.on.aws/?dry=1",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token:
              "eubyoNp7QlWNvSh6vw0exR:APA91bGeK-Hmusf3qHgbe2VJ6YLKjIYwC1gx2CDXFo6p0YCPkIEaQh_IDaU6BVe0B50IwB-LDhCeNezsnoMv0mnz5AIcRRECY1mtCLt3VOHaY8MHuhbP97U",
            title: "📢 웹에서 앱으로 푸시 성공!!",
            body: "Lambda Function URL을 통해 보냈습니다!",
          }),
        }
      );
      const result = await res.json();
      alert(result.ok ? "✅ 푸시 전송 성공!" : `❌ 실패: ${result.error}`);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>💬 웹 → 앱 푸시 알림 테스트</h1>
      <p style={styles.desc}>
        아래 버튼을 누르면 Lambda Function URL을 통해 앱으로 푸시 요청이 전송됩니다.
      </p>

      <button onClick={sendPush} disabled={loading} style={styles.button}>
        {loading ? "📡 전송 중..." : "🚀 푸시 보내기"}
      </button>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    fontFamily: "'Noto Sans KR', sans-serif",
    padding: "60px 20px",
    backgroundColor: "#f9fafb",
    borderRadius: "16px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    maxWidth: "480px",
    margin: "80px auto",
  },
  title: {
    fontSize: "24px",
    marginBottom: "12px",
    color: "#111827",
  },
  desc: {
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "24px",
  },
  button: {
    padding: "16px 32px",
    fontSize: "18px",
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.2s, transform 0.1s",
  },
};

// 호버 효과
styles.button["&:hover"] = {
  backgroundColor: "#1d4ed8",
  transform: "scale(1.02)",
};
