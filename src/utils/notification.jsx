import { Notification, toast } from "components/ui"

export const openNotification = (
    type, message
) => {
    toast.push(
        <Notification
            title={type.charAt(0).toUpperCase() + type.slice(1)}
            type={type}
        >
            {message}
        </Notification>
    )
}