"use client";

import { useEffect, useState } from "react";
import { generateQRCode } from "../../utils/otp";
import Image from "next/image";
import users from "../../data/users.json";

const QRPage = () => {
  const updateInterval = 20; // 更新間隔を管理する変数
  const [qrCode, setQrCode] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState<number>(updateInterval);

  useEffect(() => {
    const fetchQRCode = async () => {
      try {
        const user = users.find((user) => user.username === "kazuya");
        if (user) {
          const qrCodeDataUrl = await generateQRCode(user.authCode);
          setQrCode(qrCodeDataUrl!);
        } else {
          throw new Error("User not found");
        }
      } catch (error) {
        setError("Failed to fetch QR code");
        console.error("Error fetching QR code:", error);
      }
    };

    fetchQRCode();
    const interval = setInterval(fetchQRCode, updateInterval * 1000);

    return () => clearInterval(interval);
  }, [updateInterval]);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : updateInterval));
    }, 1000); // 1秒ごとにカウントダウン

    return () => clearInterval(countdown);
  }, [updateInterval]);

  useEffect(() => {
    if (timeLeft === 0) {
      setTimeLeft(updateInterval);
    }
  }, [timeLeft, updateInterval]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl mb-4">QR Code</h1>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <Image src={qrCode} alt="QR Code" width={200} height={200} />
          <p className="mt-4 text-lg">
            QRの有効期限切れまで残り: {timeLeft} 秒
          </p>
        </>
      )}
    </div>
  );
};

export default QRPage;
