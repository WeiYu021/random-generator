import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { QrCodeIcon } from "lucide-react";
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl'
import { getToolList } from '@/lib/data';

// 定义工具类型
type Tool = {
  name: string;
  description: string;
  slug: string;
  // 可以根据需要添加其他属性
};

export default function ToolsList({locale}: {locale: string}) {
  const toolList: Tool[] = getToolList(locale); // 获取工具列表并指定类型
  return (
    <div>
      {toolList.map((tool: Tool) => ( // 显式指定 tool 的类型
        <a 
          key={tool.slug} // 使用工具的 slug 作为唯一标识
          href={`/${tool.slug}`} // 使用 href 属性进行跳转
          className="w-full max-w-md cursor-pointer hover:shadow-lg transition-shadow" 
        >
          <Card className="shadow-lg transition-shadow hover:shadow-2xl mb-4">
            <CardHeader>
              <CardTitle className="text-lg font-bold">{tool.name}</CardTitle>
              <CardDescription className="text-sm text-gray-600">{tool.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <QrCodeIcon className="w-20 h-20 text-gray-500" />
            </CardContent>
          </Card>
        </a>
      ))}
    </div>
  );
}