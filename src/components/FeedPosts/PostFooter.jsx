import { Box, Button, Flex, Input, InputGroup, InputRightElement, Text } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { CommentLogo, NotificationsLogo, UnlikeLogo } from "../../assets/constants";
import usePostComment from "../../hooks/usePostComment";
import useAuthStore from "../../store/authStore";
import useLikePost from "../../hooks/useLikePost";

export default function PostFooter({ post, username, isProfilePage }) {
  const {isCommenting, handlePostComment} = usePostComment();
  const [comment, setComment] = useState("");

  const authUser = useAuthStore((state) => state.user);

  // To make the cursor focus on Adding a comment..., when user clicks on comment logo
  const commentRef = useRef(null);

	const { handleLikePost, isLiked, likes } = useLikePost(post);

  async function handleSubmitComment() {
    await handlePostComment(post.id, comment);
    setComment("");
  };

  return (
    <Box mb={10} marginTop={"auto"}>
      <Flex alignItems={"center"} gap={4} w={"full"} pt={0} mb={2} mt={4}>
        <Box onClick={handleLikePost} cursor={"pointer"} fontSize={18}>
					{!isLiked ? <NotificationsLogo /> : <UnlikeLogo />}
        </Box>

        {/* To make the cursor focus on Adding a comment..., when user clicks on comment logo */}
        <Box cursor={"pointer"} fontSize={18} onClick={() => commentRef.current.focus()}>
          <CommentLogo />
        </Box>
      </Flex>

      <Text fontWeight={600} fontSize={"sm"}>
        {likes} likes
      </Text>

      {!isProfilePage && (
        <>
          <Text fontSize={"sm"} fontWeight={700}>
            {username}_ {" "}
            <Text as="span" fontWeight={400}>
              Here is my first post!
            </Text>
          </Text>

          <Text fontSize={"sm"} color={"gray"}>
            View all the comments
          </Text>
        </>
      )}


      {authUser && (
        <Flex alignItems={"center"} gap={2} justifyContent={"space-between"} w={"full"}>
          <InputGroup>
            <Input
              variant={"flushed"}
              placeholder="Add a comment..."
              fontSize={14}
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              ref={commentRef}
            />            
            <InputRightElement>
              <Button
                fontSize={14}
                color={"blue.500"}
                fontWeight={600}
                cursor={"pointer"}
                _hover={{color: "white"}}
                bg={"transparent"}
                onClick={handleSubmitComment}
                isLoading={isCommenting}
              >
                Post
              </Button>
            </InputRightElement>
          </InputGroup>
        </Flex>
      )}
    </Box>
  )
}