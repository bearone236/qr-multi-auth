"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Webcam from "react-webcam";
import jsQR from "jsqr";
import { decryptData } from "../../utils/otp";
import users from "../../data/users.json";

const QRReader = () => {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const router = useRouter();
  const webcamRef = useRef<Webcam>(null);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

  useEffect(() => {
    const username = sessionStorage.getItem("username");
    const password = sessionStorage.getItem("password");
    if (!username || !password) {
      router.push("/login");
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  const validateQRCode = (scannedCode: string) => {
    try {
      const decryptedData = decryptData(scannedCode);
      const { authCode, timestamp } = JSON.parse(decryptedData);
      const currentTime = Math.floor(Date.now() / 1000);

      if (currentTime - timestamp > 20) {
        alert("QRコードの有効期限が切れています");
        return;
      }

      const username = sessionStorage.getItem("username");
      const user = users.find((user) => user.username === username);

      if (user && authCode === user.authCode) {
        alert("認証に成功しました");
        router.push("/");
      } else {
        alert("QRコードの認証に失敗しました");
      }
    } catch (error) {
      console.error("Error decrypting QR code:", error);
      alert("QRコードの認証に失敗しました");
    }
  };

  useEffect(() => {
    if (scanResult) {
      validateQRCode(scanResult);
    }
  }, [scanResult, router]);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      const image = new Image();
      image.src = imageSrc;
      image.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height);
          if (code) {
            setScanResult(code.data);
          }
        }
      };
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(capture, 1000); // 1秒ごとにキャプチャ
    return () => clearInterval(interval);
  }, [capture]);

  if (!isAuthorized) {
    return null;
  }

  return (
    <div className="flex flex-col items-center">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={320}
        height={240}
      />
      <p className="mt-3">
        あなたの手持ちにあるワンタイムQRコードをかざしてください
      </p>
    </div>
  );
};

export default QRReader;
