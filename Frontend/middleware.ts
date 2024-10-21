import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest){

    const isAuthenticated = request.cookies.get("isAuthenticated")?.value === "true";


   if (!isAuthenticated){
    return NextResponse.redirect(
        new URL('/', request.url)
    )
   }
   return NextResponse.next()
}

export const config = {
    matcher: ['/user', "/post" ]
}