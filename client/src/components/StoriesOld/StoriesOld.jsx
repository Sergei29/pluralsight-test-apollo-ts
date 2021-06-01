import React from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { STORIES_QUERY } from "../../graphql/queries";
import { EDIT_STORY_NAME } from "../../graphql/mutations";

const StoriesOld = () => {
  const { loading, error, data } = useQuery(STORIES_QUERY, {
    errorPolicy: "all",
  });
  const [editStory, { error: editErrors }] = useMutation(EDIT_STORY_NAME, {
    onError: () => {},
  });
  const [editInputs, setEditInputs] = React.useState({});
  const [editState, setEditState] = React.useState({});
  if (loading) return <p>Loading...</p>;
  const handleNameChange = (event, id) => {
    setEditInputs({
      [id]: {
        value: event.target.value,
      },
    });
  };

  const showEditField = (story) => {
    setEditState({ ...editState, id: story.id });
  };

  const handleEdit = (id) => {
    editStory({
      variables: {
        id,
        name: editInputs[id].value,
      },
    });
  };

  const stories = data?.stories?.map((story) => (
    <div className="col-lg-3 col-md-6" key={story.id}>
      {editErrors && <p>Error editing story name </p>}
      <div className="crf-story--image">
        <img alt={story.name} src={story.image} />
      </div>
      <div className="crf-story--text">
        <h3>
          {story.name}
          <button
            onClick={() => showEditField(story)}
            className="btn btn-primary"
            data-testid={`edit-${story.id}`}
          >
            Edit
          </button>
        </h3>
        {editState.id === story.id && (
          <div className="form-group">
            <input
              onChange={(e) => handleNameChange(e, story.id)}
              type="text"
              className="form-control"
              data-testid={`input-${story.id}`}
              value={editInputs[story.id]?.value || ""}
            />
            <div>
              <button
                onClick={() => handleEdit(story.id)}
                className="btn btn-secondary"
                type="button"
              >
                Save
              </button>
            </div>
          </div>
        )}
        <div>{story.description}</div>
      </div>
    </div>
  ));
  return (
    <div className="container crf-story">
      {error && <p>Error loading all of the data</p>}
      <div className="row">{stories}</div>
    </div>
  );
};

export default StoriesOld;
