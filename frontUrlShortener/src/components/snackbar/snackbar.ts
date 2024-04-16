import {enqueueSnackbar, OptionsObject, OptionsWithExtraProps, SnackbarMessage, VariantType} from "notistack";

export const successSnackbar =  <V extends VariantType>(message: SnackbarMessage, options?: OptionsWithExtraProps<V>) => {
    enqueueSnackbar(message, { ...options as OptionsObject<V>, variant: 'success'});
}

export const errorSnackbar =  <V extends VariantType>(message: SnackbarMessage, options?: OptionsWithExtraProps<V>) => {
    enqueueSnackbar(message, { ...options as OptionsObject<V>, variant: 'error' });
}

export const notifySnackbar =  <V extends VariantType>(message: SnackbarMessage, options?: OptionsWithExtraProps<V>) => {
    enqueueSnackbar(message, { ...options as OptionsObject<V>, variant: 'info' });
}