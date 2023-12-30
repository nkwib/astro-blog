import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import { findMatch } from '../../utils';

export const GET: APIRoute = async ({ url }): Promise<Response> => {
  const query: string | null = url.searchParams.get('query');

  // Handle if query is not present
  if (query === null) {
    return new Response(
      JSON.stringify({
        error: 'Query param is missing',
      }),
      {
        status: 400, // Bad request
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  const allBlogArticles: CollectionEntry<'blog'>[] = await getCollection(
    'blog'
  );


  
  // Filter articles based on query
  const searchResults = allBlogArticles.filter(article => {
      if (!query) return true;
      let { data, body, slug} = article;
      return (findMatch(data.title, query) || findMatch(body, query) || findMatch(slug, query));
  });

  return new Response(JSON.stringify(searchResults), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};