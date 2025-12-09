import {useContext, useEffect} from "react";
import {AppContext} from "../context/AppContext.jsx";
import {useNavigate} from "react-router-dom";

import axiosConfig from "../utils/AxiosConfig.jsx";
import {API_ENDPOINTS} from "../utils/apiEndpoints.js";

export const useUser = () =>{
    const {user,setUser,clearUserInfo} = useContext(AppContext)
  const navigation =  useNavigate()


    useEffect(()=>{
        if(user){
            return ;
        }

        let isMounted = true;

        const fecthUserInfo =  async ()=>{
            try {
              const response = await axiosConfig.get(API_ENDPOINTS.GET_USER_INFO)

                if(isMounted && response.data){
                    setUser(response.data)
                }
            }catch (e) {
                console.log("Failed to fetch user data : => ",e)
                if(isMounted){
                    clearUserInfo();
                    navigation("/login")
                }
            }
        }

        fecthUserInfo();

        return () =>{
            isMounted = false
        }

    },[setUser,clearUserInfo,navigation])

}