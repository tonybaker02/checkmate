
import axios from "axios";
import { setAlert } from "./alert";
import Config from "../api/config";

export const createManagerRecord =
    (formData) =>
        async (dispatch) => {

            let serviceUrl = "";
            serviceUrl = process.env.REACT_APP_SERVICE_URL + '/manager/createManagerRecord'

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

export const updateManagerRecord =
    (formData,id) =>
        async (dispatch) => {

            let serviceUrl = "";
            serviceUrl = process.env.REACT_APP_SERVICE_URL + '/manager/' + id;

            const confirmBox = window.confirm(
                "Do you really want to update this record ?"
            )
            if (confirmBox === true) { } else { return; }

          

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

export const deleteManagerRecord = (id) =>
    async (dispatch) => {

        const confirmBox = window.confirm(
            "Do you really want to delete this record ?"
        )
        if (confirmBox === true) { } else { return; }

        if (id !== '') {
            let endpoint = process.env.REACT_APP_SERVICE_URL + '/manager/' + id;
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

export const getManagerRecord = (id) =>
    async (dispatch) => {


        if (id !== '') {
            let endpoint = process.env.REACT_APP_SERVICE_URL + '/manager/' + id;
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

export const searchManagerRecord =
    (formData) =>
        async (dispatch) => {

            let serviceUrl = "";
            serviceUrl = process.env.REACT_APP_SERVICE_URL + '/manager/searchManagerRecord'

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

export const fetchManagerFirstAndLastName =() =>
        async (dispatch) => {

            let serviceUrl = "";
            serviceUrl = process.env.REACT_APP_SERVICE_URL + '/manager/fetchManagerFirstAndLastName'

            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                    },
                };

                const res = await axios.get(serviceUrl,config);
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



