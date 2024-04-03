import { Button, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import Comment from "../Comment/Comment";
import usePostComment from "../../hooks/usePostComment";
import { useEffect, useRef } from "react";

export default function CommentsModal({ isOpen, onClose, post }) {
  const { isCommenting, handlePostComment } = usePostComment();

  const commentRef = useRef(null);

  // After click on view comments, comment modal will automatically scroll down to the last posted comment
  const commentsContainerRef = useRef(null);

  async function handleSubmitComment(e) {
    // Add preventDefault to prevent refreshing the page
    e.preventDefault();

    // handlePostComment func has 2 parameters => postId and comment
    // To get the COMMENT value, use commentRef
    await handlePostComment(post.id, commentRef.current.value);

    // Once the comment is posted, to clear the input
    commentRef.current.value = "";
  };

  useEffect(() => {
    function scrollToBottom() {
      commentsContainerRef.current.scrollTop = commentsContainerRef.current.scrollHeight;
    };

    if (isOpen) {
      // When click on the comments to view, commentsContainerRef will come as null bcz of its first state.
      // To prevent this, setTimeout is used and useEffect is delayed
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }
  }, [isOpen, post.comments.length]);
  // useEffect should run whenever the modal is opened and a new comment is posted

  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInLeft">
      <ModalOverlay />
      <ModalContent bg={"black"} border={"1px solid gray"} maxW={"400px"}>
        <ModalHeader>Comments</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Flex
            mb={4}
            gap={4}
            flexDir={"column"}
            maxH={"250px"}
            overflow={"auto"}
            ref={commentsContainerRef}
          >
            {post.comments.map((comment, idx) => (
              <Comment key={idx} comment={comment} />
            ))}
          </Flex>
          <form onSubmit={handleSubmitComment} style={{marginTop: "2rem"}}>
            <Input placeholder="Comment" size={"sm"} ref={commentRef} />
            <Flex w={"full"} justifyContent={"flex-end"}>
              <Button type="submit" ml={"auto"} size={"sm"} my={4} isLoading={isCommenting}>
                Post
              </Button>
            </Flex>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}