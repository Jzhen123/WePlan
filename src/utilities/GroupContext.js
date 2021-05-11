import React, { createContext, useEffect, useState, useContext } from "react"
import { useHistory } from "react-router-dom";
import { axiosHelper } from "./axiosHelper";
import { useAuth } from "./AuthContext";

const GroupContext = createContext({});

// Helper function that exports just the needed/wanted data for the Group provider
export const GroupHelper = () => {

    const history = useHistory();
    const { index } = useAuth();
    
    function createGroup(groupData, customFailureMethod) {
        axiosHelper({
            data: groupData,
            method: 'post',
            url: '/api/group/create',
            successMethod: index,
            failureMethod: customFailureMethod,
        })
    }

    // function delete() {

    // }

    // function read() {

    // }

    // function addMember(){

    // }
    

    return { createGroup }
}

export const GroupProvider = (props) => {
    const initialContext = GroupHelper();
    return (
        <GroupContext.Provider value={initialContext}>
            {props.children}
        </GroupContext.Provider>
    )
}

export const useGroup = () => useContext(GroupContext);

export default GroupContext;