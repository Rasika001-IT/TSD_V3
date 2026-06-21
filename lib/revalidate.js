import { revalidatePath } from 'next/cache';

// Purge the public caches after a post is created / edited / deleted so changes
// show up on the next request instead of waiting for the 5-min ISR window
// (every public page uses `export const revalidate = 300`). Must be called from
// within a request (route handler / server action).
export function revalidatePublicContent() {
  revalidatePath('/', 'layout'); // homepage + all SSR listings / category / hub pages
  revalidatePath('/article/[slug]', 'page'); // all dynamic article pages
  revalidatePath('/api/posts'); // client "load more" + section lists
  revalidatePath('/api/posts/paginated'); // /news + /blogs pagination
}
