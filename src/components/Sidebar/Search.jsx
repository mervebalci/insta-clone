import { Box, Flex, Tooltip } from "@chakra-ui/react";
import { SearchLogo } from "../../assests/constants";

export default function Search() {
  return (
    <Tooltip
      hasArrow
      label={"Search"}
      placement="right"
      ml={1}
      openDelay={500}
      display={{base: "block", md: "none"}}
    >
      <Flex
        alignItems={"center"}
        gap={4}
        _hover={{bg: "whiteAlpha.400"}}
        borderRadius={6}
        w={{base: 10, md: "full"}}
        justifyContent={{base: "center", md: "flex-start"}}
      >
        <SearchLogo />
        <Box display={{base: "none", md: "block"}}>Search</Box>
      </Flex>
    </Tooltip>
  )
}