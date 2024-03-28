import { Avatar, Box, Button, Flex, Skeleton, SkeletonCircle } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useFollowUser from "../../hooks/useFollowUser";

export default function PostHeader({ post, creatorProfile }) {
  // To function the "Follow" button in the feed post header,
  // as calling the user that we would like to follow => post.createdBy
  const { isUpdating, isFollowing, handleFollowUser } = useFollowUser(post.createdBy);

  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"} my={2}>
      <Flex alignItems={"center"} gap={2}>
        {creatorProfile ? (
          <Link to={`/${creatorProfile.userProfile?.username}`}>
            <Avatar src={creatorProfile.userProfile?.profilePicURL} alt="user profile pic" size={"sm"} />
          </Link>
        ) : (
          <SkeletonCircle size={10} />
        )}

        <Flex fontSize={12} fontWeight={"bold"} gap={2}>
          {creatorProfile ? (
            <Link to={`/${creatorProfile.userProfile?.username}`}>
              {creatorProfile.userProfile?.username}
            </Link>
          ) : (
            <Skeleton w={"100px"} h={"10px"} />
          )}
          <Box color={"gray.500"}>• 1w</Box>
        </Flex>
      </Flex>

      <Box cursor={"pointer"}>
        <Button
          size={"xs"}
          bg={"transparent"}
          fontSize={12} 
          color={"blue.500"} 
          fontWeight={"bold"} 
          _hover={{color: "white"}}
          transition={"0.2s ease-in-out"}
          onClick={handleFollowUser}
          isLoading={isUpdating}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </Button>
      </Box>
    </Flex>
  )
}