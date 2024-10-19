import { NextResponse } from "next/server";

export function middleware(request: { cookies: { get: (arg0: string) => { value: string; }; }; url: string | URL | undefined; }){

    const isAuthenticated = request.cookies.get("isAuthenticated")?.value === "true";


   if (!isAuthenticated){
    return NextResponse.redirect(
        new URL('/', request.url)
    )
   }
   return NextResponse.next()
}

export const config = {
    matcher: ['/user']
}