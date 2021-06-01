import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import Stories from "./StoriesOld";
import { STORIES_QUERY } from "../../graphql/queries";
import { EDIT_STORY_NAME } from "../../graphql/mutations";
// import Stories from '../Stories/Stories'
import { MockedProvider } from "@apollo/client/testing";
import { GraphQLError } from "graphql";

describe("<Stories />", () => {
  test("should display a loading message when a component is fetching data", () => {
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
        <Stories />
      </MockedProvider>
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("should display a story after a successful query", async () => {
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
        <Stories />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/story 1/i)).toBeInTheDocument();
      expect(screen.getByText(/test description/i)).toBeInTheDocument();
      expect(screen.getByAltText(/story 1/i)).toBeInTheDocument();
    });
  });

  test("should display an error message on error", async () => {
    const mocks = [
      {
        request: {
          query: STORIES_QUERY,
        },
        error: new Error("oops"),
      },
    ];

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Stories />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(
        screen.getByText(/error loading all of the data/i)
      ).toBeInTheDocument();
    });
  });

  test("should display an error message AND the successful stories", async () => {
    const mocks = [
      {
        request: {
          query: STORIES_QUERY,
        },
        result: {
          errors: [new GraphQLError("error with the apollo server")],
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
      <MockedProvider
        mocks={mocks}
        addTypename={false}
        defaultOptions={{
          watchQuery: {
            errorPolicy: "all",
          },
        }}
      >
        <Stories />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(
        screen.getByText(/error loading all of the data/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/story 1/i)).toBeInTheDocument();
    });
  });

  test("should be able to edit the name of a story", async () => {
    let mutationCalled = false;
    const mocks = [
      {
        request: {
          query: EDIT_STORY_NAME,
          variables: {
            id: "1",
            name: "A new name",
          },
        },
        result: () => {
          mutationCalled = true;
          return {
            data: {
              editStoryName: {
                id: "1",
                name: "A new name",
              },
            },
          };
        },
      },
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
        <Stories />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/story 1/i)).toBeInTheDocument();
    });

    userEvent.click(screen.getByTestId("edit-1"));
    userEvent.type(screen.getByTestId("input-1"), "A new name");
    userEvent.click(screen.getByRole("button", { name: /save/i }));

    await waitFor(() => {
      expect(mutationCalled).toBe(true);
    });
  });

  test("should display an error message when a mutation fails", async () => {
    const mocks = [
      {
        request: {
          query: EDIT_STORY_NAME,
          variables: {
            id: "1",
            name: "A new name",
          },
        },
        error: new Error("mutation error"),
      },
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
        <Stories />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/story 1/i)).toBeInTheDocument();
    });

    userEvent.click(screen.getByTestId("edit-1"));
    userEvent.type(screen.getByTestId("input-1"), "A new name");
    userEvent.click(screen.getByRole("button", { name: /save/i }));

    await waitFor(() => {
      expect(screen.getByText(/error editing story name/i)).toBeInTheDocument();
    });
  });
});
