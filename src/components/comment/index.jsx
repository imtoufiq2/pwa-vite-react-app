import { useState } from "react";
import Drawer from "../Drawer";
import FormModalExample from "../addComment";

const Comments = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Drawer open={open} setOpen={setOpen} />
      <FormModalExample open={open} setOpen={setOpen} />
    </>
  );
};

export default Comments;
