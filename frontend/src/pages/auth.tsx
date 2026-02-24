import DefaultLayout from "@/layouts/default";

interface AuthenticationPageProps{
    authType:"login" | "register";
}
export default function AuthenticatePage(props:AuthenticationPageProps){
    return(
        <DefaultLayout>
            {props.authType=="login"?(
                <div>login page</div>
            ):(
                <div>register page</div>
            )}
        </DefaultLayout>
    )
}