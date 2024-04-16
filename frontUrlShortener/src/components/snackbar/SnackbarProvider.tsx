import {closeSnackbar, SnackbarProvider} from "notistack";
import {Button} from "@mui/material";
import {Cancel} from "@mui/icons-material";
export default function CustomSnackbarProvider() {
    return (
        <SnackbarProvider maxSnack={3} anchorOrigin={{horizontal:"right", vertical:"bottom" }} action={(snackbarId) => (
            <Button  color="inherit"  onClick={() => closeSnackbar(snackbarId)}>
                <Cancel/>
            </Button>
        )}>
        </SnackbarProvider>
    );
}