
import axios from "axios";
import { setAlert } from "./alert";
//import Config from "../api/config";

export const createPharmaRecord =
    (formData) =>
        async (dispatch) => {

            let serviceUrl = "";
            serviceUrl = process.env.REACT_APP_SERVICE_URL + '/pharma/createPharmaRecord'

            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                    },
                };

                const res = await axios.post(serviceUrl, formData, config);
                if (res.data !== false) {
                    dispatch(
                        setAlert(
                            "Record Added/Updated",
                            "success"
                        )
                    );
                }
                else {
                    dispatch(
                        setAlert(
                            "Could not add/update record",
                            "danger"
                        )
                    );
                }

            } catch (err) {
                console.log(err);
                dispatch(
                    setAlert(
                        "Could not add/update record",
                        "danger"
                    )
                );
            }
};

export const updatePharmaRecord =
    (formData,id) =>
        async (dispatch) => {

            let serviceUrl = "";
            serviceUrl = process.env.REACT_APP_SERVICE_URL + '/pharma/' + id;

            const confirmBox = window.confirm(
                "Do you really want to update this record ?"
            )
            if (confirmBox === true) { } else { return; }

            console.log(serviceUrl)
            console.log(id)
            console.log(formData)

            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                    },
                };

                const res = await axios.put(serviceUrl, formData, config);
                if (res.data !== false) {
                    dispatch(
                        setAlert(
                            "Record Added/Updated",
                            "success"
                        )
                    );
                }
                else {
                    dispatch(
                        setAlert(
                            "Could not add/update record",
                            "danger"
                        )
                    );
                }

            } catch (err) {
                console.log(err);
                dispatch(
                    setAlert(
                        "Could not add/update record",
                        "danger"
                    )
                );
            }
};

export const deletePharmaRecord = (id) =>
    async (dispatch) => {

        const confirmBox = window.confirm(
            "Do you really want to delete this record ?"
        )
        if (confirmBox === true) { } else { return; }

        if (id !== '') {
            let endpoint = process.env.REACT_APP_SERVICE_URL + '/pharma/' + id;
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            try {
                const res = await axios.delete(endpoint, config);
                if (res.data !== false) {
                    dispatch(
                        setAlert(
                            "Record Deleted",
                            "success"
                        )
                    );
                }
                else {
                    dispatch(
                        setAlert(
                            "Could not add/update record",
                            "danger"
                        )
                    );
                }
                
            } catch (error) {
                console.log(error.message)
                dispatch(
                    setAlert(
                        "Could not add/update record",
                        "danger"
                    )
                );;
            }

        }
}

export const getPharmaRecord = (id) =>
    async (dispatch) => {


        if (id !== '') {
            let endpoint = process.env.REACT_APP_SERVICE_URL + '/pharma/' + id;
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            try {
                const res = await axios.get(endpoint, config);
                if (res.status === 200) {
            
                    return res.data
                 }
                 else {
                    
                     dispatch(
                         setAlert(
                             "Could not find record",
                             "danger"
                         )
                     );
                     return []
                 }
                
            } catch (error) {
                console.log(error.message)
                dispatch(
                    setAlert(
                        "Could not add/update record",
                        "danger"
                    )
                );;
            }

        }
}

export const searchPharmaRecord =
    (formData) =>
        async (dispatch) => {

            let serviceUrl = "";
            serviceUrl = process.env.REACT_APP_SERVICE_URL + '/pharma/searchPharmaRecord'
            console.log(serviceUrl)

            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                    },
                };

                const res = await axios.post(serviceUrl, formData, config);
                if (res.status === 200) {
            
                   return res.data
                }
                else {
                    return []
                    dispatch(
                        setAlert(
                            "Could not find record",
                            "danger"
                        )
                    );
                }

            } catch (err) {
                console.log(err);
                dispatch(
                    setAlert(
                        "Could not find record",
                        "danger"
                    )
                );
            }
};




