import { Box, Button, Flex, Input, InputGroup, InputRightElement, Text } from "@chakra-ui/react";
import { useState } from "react";
import { CommentLogo, NotificationsLogo, UnlikeLogo } from "../../assets/constants";
import usePostComment from "../../hooks/usePostComment";
import useAuthStore from "../../store/authStore";

export default function PostFooter({ post, username, isProfilePage }) {
  const [isLiked, setIsLiked] = useState(false);
  const [numberOfLikes, setNumberOfLikes] = useState(1525);
  const {isCommenting, handlePostComment} = usePostComment();
  const [comment, setComment] = useState("");

  const authUser = useAuthStore((state) => state.user);

  async function handleSubmitComment() {
    await handlePostComment(post.id, comment);
    setComment("");
  };

  function handleLike() {
    if (isLiked) {
      setIsLiked(false);
      setNumberOfLikes(numberOfLikes - 1);
    } else {
      setIsLiked(true);
      setNumberOfLikes(numberOfLikes + 1);
    }
  };

  return (
    <Box mb={10} marginTop={"auto"}>
      <Flex alignItems={"center"} gap={4} w={"full"} pt={0} mb={2} mt={4}>
        <Box onClick={handleLike} cursor={"pointer"} fontSize={18}>
          {!isLiked ? (<NotificationsLogo />) : (<UnlikeLogo />)}
        </Box>

        <Box cursor={"pointer"} fontSize={18}>
          <CommentLogo />
        </Box>
      </Flex>

      <Text fontWeight={600} fontSize={"sm"}>
        {numberOfLikes} likes
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