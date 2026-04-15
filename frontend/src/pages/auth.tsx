import { useAuth } from "@/contexts/AuthContextHandler";
import DefaultLayout from "@/layouts/default";
import { login, register } from "@/misc/api";
import { SwappyBooksProfileResponse } from "@/types/interfaces";
import { Input } from "@heroui/input";
import { addToast, Button, Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface AuthenticationPageProps {
    authType: "login" | "register";
}
export default function AuthenticatePage(props: AuthenticationPageProps) {
    const [username, setPageUsername] = useState<string>("");
    const [password, setPagePassword] = useState<string>("");
    const navigate = useNavigate();
    const { setIsAuthenticated, setUsername } = useAuth();

    async function authenticate() {
        const response: SwappyBooksProfileResponse = props.authType === "login" ? await login(username, password) : await register(username, password);
        if (response.successful === true) {
            setIsAuthenticated(true);
            setUsername(response.username);
            navigate("/");
        }

        addToast(
            {
                title: response.message,
                color: response.successful === true ? "success" : "danger"
            }
        );
    }

    return (
        <DefaultLayout>
            <div className="flex w-full h-full items-center justify-center w-1/2 ">
                <Card shadow="lg" className="md:w-1/2 lg:w-1/3 p-2" disableRipple>
                    <CardHeader>
                        {props.authType === "login" ? "Login" : "Register"}
                    </CardHeader>
                    <CardBody className="gap-3">
                        <Input
                            placeholder="insert here"
                            label="Username"
                            type="text"
                            onChange={(e) => {
                                setPageUsername(e.target.value);
                            }} />
                        <Input
                            placeholder="insert here"
                            label="Password"
                            type="password"
                            onChange={(e) => {
                                setPagePassword(e.target.value);
                            }} />
                        <Button color="primary"
                            onPress={() => {
                                authenticate();
                            }}>
                            {props.authType === "login" ? "Login" : "Register"}
                        </Button>
                    </CardBody>
                    <CardFooter>
                        <p className="pr-1.5">
                            {props.authType==="login"?
                            (
                                <div>Need to register?</div>):
                                (<div>Need to login?</div>)}
                        </p>
                        <Link
                            to={props.authType === "login" ? "/register" : "/login"}
                            className="text-primary">
                            Click here
                        </Link>
                    </CardFooter>
                </Card>
            </div>

        </DefaultLayout>
    )
}