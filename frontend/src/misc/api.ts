export async function getAuthenticationInfo():Promise<SwappyBooksResponse>{
    const response:SwappyBooksResponse={
        successful:false,
        message:"Successfully logged in",
        username:"Sigma"
    };
    return response;
}