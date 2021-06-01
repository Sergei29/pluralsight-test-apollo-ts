import { ResolverFn, ApolloError } from "apollo-server";
import fs from "fs";
import path from "path";

export const stories: ResolverFn = (parent, args, ctx, info) => {
  const data = fs.readFileSync(
    path.resolve(__dirname, "../stories.json"),
    "utf-8"
  );
  const stories = JSON.parse(data);
  return stories;
};

export const extra: ResolverFn = (parent, args, ctx, info) => {
  throw new ApolloError("This is not a real field");
};
