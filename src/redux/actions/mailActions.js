import axios from "axios";

import { newMailFailed, newMailRequest, newMailSuccess } from "../reducers/mailReducer";

// 1. New Mail
export const createMail = (formData) => async (dispatch) => {
    dispatch(newMailRequest());

    try {
        const { data } = await axios.post(
            "https://mern-chat-q4gt.onrender.com/api/mail/new", formData
        );

        dispatch(newMailSuccess(data));
    } catch (error) {
        dispatch(
            newMailFailed(
                error?.response?.data.message ||
                error.message ||
                "Something went wrong !"
            )
        );
    }
};