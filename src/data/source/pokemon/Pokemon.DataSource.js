import axios from 'axios';
import * as Config from '_constants/Config';
import * as Util from '_helpers/Util';



export const getListPokemon = async (pageSize, overrideURL="") => {
    var requestURL = "";
    
    // Check if there is next page url available
    if (Util.isNullOrEmpty(overrideURL)) {
        requestURL = `${Config.BASE_API}${Config.API_VERSION}/pokemon?limit=${pageSize}&offset=0`;
    } else requestURL = overrideURL;

    return axios.get(requestURL);
}


