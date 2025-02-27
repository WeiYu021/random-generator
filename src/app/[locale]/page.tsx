// pages/index.js
import React, { Suspense } from 'react'; // 确保导入 React
import { getPostDataByLocale } from '@/lib/posts'
// import { getCategories } from '@/lib/data';

// import TarotCard from '@/components/TarotCard'; // 新增导入
import ToolsList from '@/components/ToolsList';
import {getTranslations, getLocale} from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('home');
  const locale = await getLocale();
  return {
    title: t("meta_title"),
    description: t("meta_description"),
    alternates: {
      "canonical": locale === 'en' ? `${process.env.WEB_URL}` : `${process.env.WEB_URL}/${locale}`,
    }
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
  const postData = await getPostDataByLocale(locale, "homepage");
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
          <span className="inline-block">Anything Random</span>
        </h1>
      </section>

      <section className="flex flex-col items-center justify-center min-h-[60vh]">
        <Suspense fallback={<div className="text-center">{t("loading")}</div>}>
          <ToolsList locale={locale} />
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
      {/* <div
        className="prose prose-lg dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
      /> */}
      {/* ... existing commented code ... */}
    </div>
  )
}