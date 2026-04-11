import { Avatar } from "@heroui/react"

interface MessageAvatarProps {
    username: string
}

export default function MessageAvatar(props: MessageAvatarProps) {
    return (
        <Avatar
            name={props.username}
            classNames={{
                base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]",
                icon: "text-black/80",
            }}
            size="lg"
        />
    )

}