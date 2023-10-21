import axios from "axios";

import { newMessageFailed, newMessageRequest, newMessageSuccess } from "../reducers/mailReducer";

const url = import.meta.env.VITE_BASE_URL

// 1. New Message
export const newMessage = (formData) => async (dispatch) => {
    dispatch(newMessageRequest());

    try {
        const { data } = await axios.post(
            `${url}/message/new`, formData
        );

        dispatch(newMessageSuccess(data));
    } catch (error) {
        dispatch(
            newMessageFailed(
                error?.response?.data.message ||
                error.message ||
                "Something went wrong !"
            )
        );
    }
};