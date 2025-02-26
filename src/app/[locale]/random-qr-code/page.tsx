// pages/index.js
import React, { Suspense } from 'react'; // 确保导入 React
import { getPostDataByLocale } from '@/lib/posts'
// import { getCategories } from '@/lib/data';

// import TarotCard from '@/components/TarotCard'; // 新增导入
import RandomQrCode from '@/components/RandomQrCode';

import {getTranslations, getLocale} from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('qrcode');
  return {
    title: t("meta_title"),
    description: t("meta_description"),
  };
}


// type categoryType = { 
//   name: string; 
//   src: string; 
//   description: string;
//   link: string; 
// }


export default async function Home() {
  const locale = await getLocale();
  const postData = await getPostDataByLocale(locale, "qrcode");
  const t = await getTranslations('home');
  // categories data
  // const categories = getCategories(locale);
  // console.log('categories: ', categories)

  // const allPostsData = getSortedPostsData().slice(0, 6)
  
  // deployment

  return (
    <div className="container mx-auto py-12 space-y-16">
      <section className="flex flex-col items-center justify-center text-center space-y-6">
        <h1 className="mx-auto max-w-3xl text-3xl font-bold lg:text-7xl tracking-tighter">
          <span className="inline-block">Instant Random QR Code Generator - 6+ Dynamic Types</span>
        </h1>
      </section>

      {/* 新增计算器部分 */}
      <section className="flex flex-col items-center justify-center min-h-[60vh]">
        <Suspense fallback={<div className="text-center">{t("loading")}</div>}>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
            <RandomQrCode/>
          </div>
        </Suspense>
      </section>

      {/* <section className="flex flex-col items-center justify-center text-center space-y-6">
        <h1 className="mx-auto max-w-3xl text-3xl font-bold lg:text-7xl tracking-tighter">
          <span className="inline-block">Anything Random</span>
        </h1>
        <p className="mx-auto max-w-[700px] md:text-xl tracking-tight">
          {t("description")}
        </p>
      </section> */}
      <div
        className="prose prose-lg dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
      />
      {/* ... existing commented code ... */}
    </div>
  )
}