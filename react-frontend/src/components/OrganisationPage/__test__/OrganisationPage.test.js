import React from "react";
import { render, screen } from "@testing-library/react";

import OrganisationPage from "../OrganisationPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders organisation page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <OrganisationPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("organisation-datatable")).toBeInTheDocument();
    expect(screen.getByRole("organisation-add-button")).toBeInTheDocument();
});
