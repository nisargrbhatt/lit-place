import type { NextPage } from "next";
import { getAuthors } from "./actions";
import CreateLitWrapper from "./__components/CreateLitWrapper";

interface Props {}

const CreateLiterature: NextPage<Props> = async () => {
  const authors = await getAuthors();

  return <CreateLitWrapper authors={authors} />;
};

export default CreateLiterature;
