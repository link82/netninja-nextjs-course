import { notFound } from 'next/navigation'

// catch all route with component invoking nofFound in order to use our custom 404 page everywhere
// will serve the nearest 404 page in the tree of pages
export default function NotFoundCatchAll() {
  notFound()
}
