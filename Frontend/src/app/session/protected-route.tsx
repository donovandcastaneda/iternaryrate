import { useAuth } from '@/src/app/session/use-auth-context';
import { useRouter } from 'next/router';

interface pageProps {
    children: React.ReactNode
  
}

const ProtectRoute = (children: pageProps) => {


    const { isAuthenticated } = useAuth();
    const { push }  = useRouter()

    if(!isAuthenticated){
        return push("/auth/login")
    }
    else {
        return children;
    }
}

export default ProtectRoute;

