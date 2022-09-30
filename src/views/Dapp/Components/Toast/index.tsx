import { ReactComponent as Close } from "../../../../assets/appSvgs/close-circle.svg";
import { ReactComponent as Caution } from "../../../../assets/appSvgs/caution.svg";
import { ReactComponent as Ligthning } from "../../../../assets/appSvgs/lightning.svg";
import { ReactComponent as Checkmark } from "../../../../assets/appSvgs/checkmark.svg";
import "./ToastBody.styles.scss";

export enum STATUS {
    ERROR = "Error",
    PENDING = "Pending",
    SUCCESSFULL = "Successfull"
}

export enum TYPE {
    TRANSACTION = "transaction",
    ERROR = "error",
    SUCCESSFULL = "successfull"
}

const images = {
    transaction: <Ligthning />,
    error: <Caution />,
    successfull: <Checkmark />
};

export const ToastBody =
    (message: string, status: STATUS, type: TYPE) =>
    ({ closeToast }: { closeToast: any }) =>
        (
            <div className="toast_body">
                <div className="image">{images[type]}</div>
                <div className="text">
                    <Close className="close" onClick={closeToast} />
                    <span className="message">{message}</span>
                    <span className="status">Status - {status}</span>
                </div>
            </div>
        );
