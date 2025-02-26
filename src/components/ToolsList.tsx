'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { QrCodeIcon } from "lucide-react";
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl'

export default function ToolsList() {
  const router = useRouter();
  return (
    <Card 
      className="w-full max-w-md cursor-pointer hover:shadow-lg transition-shadow" 
      onClick={() => router.push('/random-qr-code')}
    >
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <QrCodeIcon className="w-20 h-20 text-gray-500" />
      </CardContent>
    </Card>
  );
}