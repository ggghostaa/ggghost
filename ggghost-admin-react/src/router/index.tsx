import React, { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import routes from "./routes";

const Router: React.FC = () => {
    return (
        <Fragment>
            <BrowserRouter>
                <Routes>
                    {
                        routes.map((item, index) => {
                            return (
                                <Route key={index} path={item.path} element={<item.component/>}></Route>
                            )
                        })
                    }
                </Routes>
            </BrowserRouter>
        </Fragment>
    )
}
export default Router
