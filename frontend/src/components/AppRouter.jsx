import React, {useContext} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {privateRoutes, publicRoutes, adminRoutes} from "../router";
import {AuthContext, AdminContext} from "../context";
import Error from "../pages/Error";

const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext);
    const {isAdmin} = useContext(AdminContext);

    if (isLoading) {
        return <Error/>
    }
    return (
        isAuth
        ? isAdmin
                ?
                <Routes>
                    {adminRoutes.map(route =>
                        <Route
                            path={route.path}
                            element={<route.element/>}
                            key={route.path}
                        />
                    )}
                    <Route
                        path="*"
                        element={<Navigate to="/medicaments" />}
                    />
                </Routes>
                :
        <Routes>
            {privateRoutes.map(route =>
                <Route
                    path={route.path}
                    element={<route.element/>}
                    key={route.path}
                />
            )}
            <Route
                path="*"
                element={<Navigate to="/medicaments" />}
            />
        </Routes>
            :
            <Routes>
                {publicRoutes.map(route =>
                    <Route
                        path={route.path}
                        element={<route.element/>}
                        key={route.path}
                    />
                )}
                <Route
                    path="*"
                    element={<Navigate to="/login" />}
                />
            </Routes>
    );
};

export default AppRouter;