import { Box, Container, Flex } from "@chakra-ui/react";
import FeedPosts from "../../components/FeedPosts/FeedPosts";

export default function HomePage() {
  return (
    <Container maxW={"container.lg"}>
      <Flex gap={20}>
        <Box flex={2} py={10} border={"1px solid blue"}>
          <FeedPosts></FeedPosts>
        </Box>

        <Box flex={3} mr={20} display={{base: "none", md: "block"}} maxW={"300px"} border={"1px solid red"}>
          Suggested Users
        </Box>
      </Flex>
    </Container>
  )
}