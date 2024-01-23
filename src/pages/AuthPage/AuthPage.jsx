import { Box, Container, Flex, Image, VStack } from "@chakra-ui/react";
import AuthForm from "../../components/AuthForm/AuthForm";

export default function AuthPage() {
  return (
    <Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"} px={4}>
      <Container maxW={"container.md"} padding={0}>
        <Flex justifyContent={"center"} alignItems={"center"} gap={10}>
          {/* LEFT HAND-SIDE OF AUTH PAGE */}
          <Box display={{base: "none", md: "block"}}>
          {/* base is for smaller screen and above, md is for medium screen and above (such as tablet screen).
              When base is NONE, it means do not display the children elements in small screens such as mobile. */}
            <Image src="/auth.png" h={650} alt="Phone img"/>
          </Box>


          {/* RIGHT HAND-SIDE OF AUTH PAGE */}
          <VStack spacing={4} align={"stretch"}>
            <AuthForm />
            <Box textAlign={"center"}>Get the app.</Box>
            <Flex gap={3} justifyContent={"center"}>
              <Image src="/appstore.png" h={10} alt="Appstore logo" />
              <Image src="/playstore.png" h={10} alt="Playstore logo"  />
            </Flex>
          </VStack>
        </Flex>
      </Container>
    </Flex>
  )
}