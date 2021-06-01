import React from "react";
import { MockedProvider } from "@apollo/client/testing";
import { GraphQLError } from "graphql";
import {
  render,
  screen,
  waitFor,
  fireEvent,
  act,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import { STORIES_QUERY } from "../../graphql/queries";
import { EDIT_STORY_NAME } from "../../graphql/mutations";
import { defaultMessages } from "../../constants";
import Stories from "./Stories";

describe("<Stories/>", () => {
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
              image: "story-1.jpg",
              description: "story description",
              extra: "",
            },
          ],
        },
      },
    },
  ];

  it("should display a loading message when component is fetching data", () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Stories />
      </MockedProvider>
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("should display stories after a successful query", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Stories />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/story 1/i)).toBeInTheDocument();
      expect(screen.getByText(/story description/i)).toBeInTheDocument();
      expect(screen.getByAltText(/story 1/i)).toBeInTheDocument();
    });
  });

  it("should display error message if there is an error", async () => {
    const mocksError = [
      {
        request: {
          query: STORIES_QUERY,
        },
        error: new Error("Oups!"),
      },
    ];

    render(
      <MockedProvider mocks={mocksError} addTypename={false}>
        <Stories />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(
        screen.getByText(defaultMessages.ERROR_LOADING_DATA)
      ).toBeInTheDocument();
    });
  });

  it("should display error message AND successful stories", async () => {
    const arrMocksError = [
      {
        request: {
          query: STORIES_QUERY,
        },
        result: {
          errors: [new GraphQLError("Error with the Apollo server.")],
          data: {
            stories: [
              {
                id: "1",
                name: "story 1",
                image: "story-1.jpg",
                description: "story description",
                extra: "",
              },
            ],
          },
        },
      },
    ];

    render(
      <MockedProvider
        mocks={arrMocksError}
        addTypename={false}
        defaultOptions={{ watchQuery: { errorPolicy: "all" } }}
      >
        <Stories />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(
        screen.getByText(defaultMessages.ERROR_LOADING_DATA)
      ).toBeInTheDocument();
      expect(screen.getByText(/story 1/i)).toBeInTheDocument();
    });
  });

  it("should be able to edit the story name", async () => {
    const editStoryName = jest.fn().mockReturnValue({
      id: "1",
      name: "A new name",
    });

    const mocks = [
      {
        request: {
          query: EDIT_STORY_NAME,
          variables: {
            id: "1",
            name: "A new name",
          },
        },
        result: {
          data: { editStoryName: editStoryName() },
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
      expect(editStoryName).toBeCalled();
    });
  });

  it("should display an error message when mutation fails", async () => {
    const mocks = [
      {
        request: {
          query: EDIT_STORY_NAME,
          variables: {
            id: "1",
            name: "A new name",
          },
        },
        result: new Error("mutation error"),
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
      expect(
        screen.getByText(defaultMessages.ERROR_EDITING)
      ).toBeInTheDocument();
    });
  });
});
