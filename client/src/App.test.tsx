import React from "react";
import { MockedProvider } from "@apollo/client/testing";
import { STORIES_QUERY } from "./graphql/queries";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("<App/>", () => {
  it("should render app", () => {
    const mocks = [
      {
        request: {
          query: STORIES_QUERY,
        },
        result: {
          data: {
            stories: [
              {
                id: "1",
                name: "story 1",
                image: "story1.jpg",
                description: "test description",
                extra: "",
              },
            ],
          },
        },
      },
    ];
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <App />
      </MockedProvider>
    );
    const bannerElement = screen.getByText(/GET A GRIP/i);
    expect(bannerElement).toBeInTheDocument();
  });
});
