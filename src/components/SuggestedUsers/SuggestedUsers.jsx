import { Box, Flex, Link, Text, VStack } from "@chakra-ui/react";
import SuggestedHeader from "./SuggestedHeader";
import SuggestedUser from "./SuggestedUser";
import useGetSuggestedUsers from "../../hooks/useGetSuggestedUsers";

export default function SuggestedUsers() {
  const {isLoading, suggestedUsers} = useGetSuggestedUsers();

  if (isLoading) return null;

  return (
    <VStack py={8} px={6} gap={4}>
      <SuggestedHeader />

      {suggestedUsers.length !== 0 &&
        <Flex mt={6} alignItems={"center"} justifyContent={"space-between"} w={"full"}>
          <Text fontSize={12} fontWeight={"bold"} color={"gray.500"}>
            Suggested for you
          </Text>

          <Text fontSize={12} fontWeight={"bold"} _hover={{color: "gray.400"}} cursor={"pointer"}>
            See All
          </Text>
        </Flex>
      }

      {suggestedUsers.map(user => (
        <SuggestedUser user={user} key={user.uid} />
      ))}

      <Box fontSize={12} color={"gray.500"} mt={5} alignSelf={"start"}>
        © 2024 Built By {" "}
        <Link href="https://github.com/mervebalci" target="_black" color={"blue.500"} fontSize={14}>
          MB
        </Link>
      </Box>
    </VStack>
  )
}