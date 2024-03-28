import { Avatar, Box, Flex, Skeleton, SkeletonCircle, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function PostHeader({ post, creatorProfile }) {
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
        <Text 
          fontSize={12} 
          color={"blue.500"} 
          fontWeight={"bold"} 
          _hover={{color: "white"}}
          transition={"0.2s ease-in-out"}
        >
          Unfollow
        </Text>
      </Box>
    </Flex>
  )
}