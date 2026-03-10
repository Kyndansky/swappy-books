import DefaultLayout from "@/layouts/default";
import { Button, Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <DefaultLayout>
            <div className="flex flex-col mx-auto h-full items-center justify-center">
                <Card className="" isPressable>
                    <CardHeader>
                        <p className="mx-auto text-xl">
                            Page not found
                        </p>

                    </CardHeader>
                    <CardBody className="p-10">
                        <p className="text-9xl overflow-y-hidden text-danger font-bold">
                            404
                        </p>
                    </CardBody>

                    <CardFooter>
                        <Button color="primary" variant="light" className="mx-auto" size="lg">
                            <Link to={"/"}>
                                Go to the homepage
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </DefaultLayout>
    )
}