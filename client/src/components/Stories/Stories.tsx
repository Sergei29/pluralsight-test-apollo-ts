import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { STORIES_QUERY } from "../../graphql/queries";
import { EDIT_STORY_NAME } from "../../graphql/mutations";
import Story from "../Story/Story";
import { defaultMessages } from "../../constants";
import { StoryType } from "../../types";

const Stories: React.FC = () => {
  const [objEditInputs, setObjEditInputs] = useState<Record<string, any>>({});
  const [objEditState, setObjEditState] = useState<Record<string, any>>({});

  const { loading, error, data } = useQuery(STORIES_QUERY, {
    errorPolicy: "all",
  });
  const [editStoryNameMutation, { error: editError }] = useMutation(
    EDIT_STORY_NAME,
    {
      onError: () => {},
    }
  );

  if (loading) return <p>Loading...</p>;

  const handleNameChange =
    (strId: string) => (objEvent: React.ChangeEvent<HTMLInputElement>) =>
      setObjEditInputs((prevObjStories) => ({
        ...prevObjStories,
        [strId]: { value: objEvent.target.value },
      }));

  const showEditField = (strId: string) => () =>
    setObjEditState((prevState) => ({
      ...prevState,
      id: strId,
    }));

  const handleEditName = (strId: string) => () => {
    editStoryNameMutation({
      variables: { id: strId, name: objEditInputs[strId]?.value },
    });
  };

  const stories = data?.stories?.map((story: StoryType) => (
    <Story
      key={story.id}
      story={story}
      handleChangeName={handleNameChange}
      bIsEditing={objEditState.id === story.id}
      handleShowEditField={showEditField}
      strFieldValue={objEditInputs[story.id]?.value || ""}
      handleEditName={handleEditName}
      editError={editError}
    />
  ));

  return (
    <div className="container crf-story">
      {error && <p>{defaultMessages.ERROR_LOADING_DATA}</p>}
      <div className="row">{stories}</div>
    </div>
  );
};

export default Stories;
