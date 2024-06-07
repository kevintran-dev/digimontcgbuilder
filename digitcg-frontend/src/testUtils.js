import React from "react";
import UserContext from "./auth/UserContext";

const UserProvider =
    ({ children, currentUsername = "testuser", currentUser = [], update = false }) => (
        <UserContext.Provider value={{ currentUser, currentUsername, update }}>
            {children}
        </UserContext.Provider>
    );

export { UserProvider };

