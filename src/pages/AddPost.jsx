import React from "react";
import { PostForm as PostFormComp, Container } from "../components";
function AddPost() {
  return (
    <div className="py-8">
      <Container>
        <PostFormComp />
      </Container>
    </div>
  );
}

export default AddPost;
