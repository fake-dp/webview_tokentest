import React, { useEffect, useRef, useState } from "react";

export default function App() {
  const [token, setToken] = useState(null);
  const [log, setLog] = useState([]);
  const userIdRef = useRef("demo-user-123");

  const addLog = (msg) =>
    setLog((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev]);

  // 1) 앱에서 전역/커스텀 이벤트로 토큰 받기
  useEffect(() => {
    // 앱이 주입해줄 전역 콜백
    window.onExpoPushToken = (t) => {
      setToken(t);
      addLog(`onExpoPushToken: ${t}`);
    };

    // 앱이 CustomEvent("expo:push-token", { detail: { token } })로 보낼 수도 있음
    const h = (e) => {
      const t = e?.detail?.token;
      if (t) {
        setToken(t);
        addLog(`CustomEvent expo:push-token -> ${t}`);
      }
    };
    window.addEventListener("expo:push-token", h);
    return () => window.removeEventListener("expo:push-token", h);
  }, []);

  // 2) App → Web (RN WebView의 postMessage) 수신
  useEffect(() => {
    const handler = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "TOKEN") {
          setToken(data.token);
          addLog(`postMessage TOKEN: ${data.token}`);
        } else if (data.type === "ERROR") {
          addLog(`ERROR: ${data.message}`);
        } else if (data.type === "REGISTERED") {
          addLog(`REGISTERED: ${JSON.stringify(data)}`);
        }
      } catch {
        // 무시
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  // 3) Web → App 요청
  const requestToken = () => {
    window.ReactNativeWebView?.postMessage(
      JSON.stringify({ type: "REQUEST_TOKEN" })
    );
    addLog("REQUEST_TOKEN sent");
  };

  const registerToken = () => {
    window.ReactNativeWebView?.postMessage(
      JSON.stringify({ type: "REGISTER_TOKEN", userId: userIdRef.current })
    );
    addLog("REGISTER_TOKEN sent");
  };

  const openExternal = () => {
    window.ReactNativeWebView?.postMessage(
      JSON.stringify({ type: "OPEN_URL", url: "https://google.com" })
    );
    addLog("OPEN_URL sent");
  };

  return (
    <div style={{ padding: 20, fontFamily: "system-ui" }}>
      <h1>WebView Push Token Demo (CRA)</h1>
      <p>
        <strong>Token:</strong> <code>{token || "(no token yet)"}</code>
      </p>

      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <button onClick={requestToken}>앱에 토큰 요청</button>
        <button onClick={registerToken} disabled={!token}>
          서버등록
        </button>
        <button onClick={openExternal}>외부 URL 열기</button>
      </div>

      <h3>Logs</h3>
      <ul>{log.map((l, i) => <li key={i}>{l}</li>)}</ul>

      <hr />
      <p style={{ color: "#666" }}>
        앱이 주입할 수 있는 전역 <code>window.__EXPO_PUSH_TOKEN__</code> :
        <code> {window.__EXPO_PUSH_TOKEN__ || "(undefined)"} </code>
      </p>
    </div>
  );
}
