import {SnackbarMessage} from "notistack";
import {errorSnackbar, successSnackbar} from "../components/snackbar/snackbar";

export const handleSuccessAndError = async (
    request: () => Promise<any>,
    successMessage: SnackbarMessage,
    handleErrorRequest?: (value?: any) => void) => {
    try {
        await request()
        successMessage && successSnackbar(successMessage);
        return true
    } catch (ex: any) {
        console.log(ex);
        if (!ex.data) {
            errorSnackbar("Something went wrong!");
            return false;
        }
        handleErrorRequest?.(ex) ;
        ex.data?.message && errorSnackbar(ex.data?.message.join('\n'));
        return false
    }
}