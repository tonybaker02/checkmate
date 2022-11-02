import Config from './config';
import axios from 'axios';

import React from 'react'

   

    export const fetchClientRecord = async (_SEARCH_STRING_) => {
        var url = Config.REST_URL + 'api/Client/fetchSingleClientRecord/'
        url +=_SEARCH_STRING_;
        try
        {
            return await axios.get(url)
            .then(res => {
                return res.data;
            });
        } catch (err)
        {
          console.log("Issue Fetching Records " + err)
          return []
        }
    }

    export const FetchClientInformationFromRedirect = async (id) => {
        var url = Config.REST_URL + 'api/Client/FetchClientInformationFromRedirect/'
        url +=id;
        try
        {
            return await axios.get(url)
            .then(res => {
                return res.data;
            });
        } catch (err)
        {
          console.log("Issue Fetching Records " + err)
          return []
        }
    }

    //FetchMainAccountInfo
    export const FetchMainAccountInfo = async (_SCATXID) => {
        var url = Config.REST_URL + 'api/PropertyInfo/FetchMainAccountInfo/'
        url +=_SCATXID;
        try
        {
            return await axios.get(url)
            .then(res => {
                return res.data;
            });
        } catch (err)
        {
          console.log("Issue Fetching Records " + err)
          return []
        }
    }

    export const FetchAllClientsForBTTable = async () => {
        var url = Config.REST_URL + 'api/client/FetchAllClientsForBTTable/'
        try
        {
            return await axios.get(url)
            .then(res => {
                return res.data;
            });
        } catch (err)
        {
          console.log("Issue Fetching Records " + err)
          return []
        }
    }

   
 

