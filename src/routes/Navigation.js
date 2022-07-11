import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import routes from "./routes";
import { map } from "lodash"

export function Navigation() {
    return (
    <Router>
      <Routes>
        {map(routes, (route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              <route.layout>
                <route.component />
              </route.layout>
            }
          >
          </Route>
        ))}
      </Routes>
    </Router>
  );
}