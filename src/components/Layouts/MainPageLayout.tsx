import { AuthProvider } from "../Providers/authProvider";

export default function ({children, user} :any) {
    return <>
    {/* <AuthProvider user={user}> */}
        <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            {children}
            </div>
        </main>
    {/* </AuthProvider> */}
    </>
}