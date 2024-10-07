"use server"
import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import { isLogin } from "@/lib/nextAuthOptions";
import DefaultLayout from "./DefaultLayout";
import GuestLayout from "./GuestLayout";

// export default function ClientLayout({children,}: Readonly<{children: React.ReactNode}>) {
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     setTimeout(() => setLoading(false), 100);
//   }, []);

//   return (<>{loading ? <Loader /> : children}</>);
// }


export default async function({children}:any) {
    const login = await isLogin()
    return login ? <DefaultLayout>{children}</DefaultLayout> : <GuestLayout>{children}</GuestLayout>
}