import { toast } from "react-toastify";
interface NotificationProps {
  type: string;
  message: string;
  configuration?: CustomNotificationProperties;
}
interface CustomNotificationProperties {
  position: any;
  autoClose: number;
  hideProgressBar: boolean;
  closeOnClick: boolean;
  pauseOnHover: boolean;
  draggable: boolean;
  progress: any;
}
export const NotificationSystem = (props: NotificationProps) => {
  const generateNotification = (props: NotificationProps) => {
    let notificationConfiguration;
    if (!props?.configuration) {
      notificationConfiguration = {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      };
    } else {
      notificationConfiguration = props.configuration;
    }
    switch (props.type) {
      case "success":
        return toast.success(props.message, notificationConfiguration);
      case "error":
        return toast.error(props.message, notificationConfiguration);
      case "warning":
        return toast.warn(props.message, notificationConfiguration);
      case "info":
        return toast.info(props.message, notificationConfiguration);
      default:
        return toast(props.message, notificationConfiguration);
    }
  };
  return generateNotification(props);
};
export default NotificationSystem;
