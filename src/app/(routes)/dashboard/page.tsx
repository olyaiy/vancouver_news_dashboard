import Link from "next/link";
import { redirect } from "next/navigation";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { fetchArticles, createArticle } from "@/lib/supabase";
import { PaginatedArticleList } from "@/components/paginated-article-list";
import { Button } from "@/components/ui/button";

async function createAndRedirect() {
  "use server"
  const newArticle = await createArticle();
  redirect(`/editor/${newArticle.id}`);
}

export default async function DashboardPage() {
  const articles = await fetchArticles();

  return (
    <ContentLayout title="Dashboard">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Articles</h2>
        <form action={createAndRedirect}>
          <Button type="submit">Create New Article</Button>
        </form>
      </div>
      <PaginatedArticleList articles={articles} articlesPerPage={9} />
    </ContentLayout>
  );
}
