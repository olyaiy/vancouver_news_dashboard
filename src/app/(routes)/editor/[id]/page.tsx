import Link from "next/link";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Article, fetchArticle } from "@/lib/supabase";
import ArticleEditor from "../article-editor";

interface EditorPageProps {
  params: {
    id: string;
  };
}

export default async function EditorPage({ params }: { params: { id: string } }) {

  const article = await fetchArticle(params.id) as Article;

  if (!article) {
    // Handle the case where the article is not found
    return <div>Article not found</div>;
  }

  return (
    <ContentLayout title={`Edit Article: ${article.Title}`}>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Edit Article</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <ArticleEditor articleData={article} />
    </ContentLayout>
  );
}