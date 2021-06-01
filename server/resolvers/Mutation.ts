import { ResolverFn } from "apollo-server";
import fs from "fs";
import path from "path";
import { StoryType } from "../types";

export const editStoryName: ResolverFn = (parent, args, ctx, info) => {
  const { id, name } = args;
  const strStories = fs.readFileSync(
    path.resolve(__dirname, "../stories.json"),
    "utf-8"
  );
  const arrStories = JSON.parse(strStories);
  const arrNewStories = arrStories.map((objStory: StoryType) => {
    if (objStory.id === id) {
      return {
        ...objStory,
        name,
      };
    }
    return objStory;
  });
  fs.writeFileSync(
    path.resolve(__dirname, "../stories.json"),
    JSON.stringify(arrNewStories)
  );
  return arrNewStories.find((objStory: StoryType) => objStory.id === id);
};
