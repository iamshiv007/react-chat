import axios from "axios";

import { newMessageFailed, newMessageRequest, newMessageSuccess } from "../reducers/messageReducer";
import { twoMessagesFailed, twoMessagesRequest, twoMessagesSuccess } from "../reducers/twoMessagesReducer";

const url = import.meta.env.VITE_BASE_URL

// 1. New Message
export const newMessage = (formData) => async (dispatch) => {
    dispatch(newMessageRequest());

    try {
        const { data } = await axios.post(
            `${url}/api/message/new`, formData
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

// 2. Get two messages
export const getTwoMessages = (formData) => async (dispatch) => {
    dispatch(twoMessagesRequest())
    try {
        const { data } = await axios.post(`${url}/api/message/two`, formData)

        dispatch(twoMessagesSuccess(data))

    } catch (error) {
        dispatch(twoMessagesFailed(
            error?.response?.data.message ||
            error.message ||
            "Something went wrong !"))
    }
}