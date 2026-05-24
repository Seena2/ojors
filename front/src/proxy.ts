export {auth as proxy} from '@/auth'


// import { auth } from "@/auth"

// export default auth((req) => {
//   // Logic to handle redirects or custom behavior
//   // For example, if !req.auth && not on a public route, redirect
// })

// export const config = {
//   // Use a matcher to specify which routes should be protected
//   // This example protects everything EXCEPT api, static files, and specific images
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// }