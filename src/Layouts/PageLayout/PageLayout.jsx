import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useLocation } from "react-router-dom";


/* instead of adding the Sidebar component to every page, 
   we can add it only once to the PageLayout component and wrap the children with it. 
   This way, we can have a sidebar on every page except the AuthPage. */

export default function PageLayout({children}) {
  const {pathname} = useLocation();

  return (
    <Flex>
      {/* SIDEBAR on the LEFT side */}
      {pathname !== "/auth" ? (
        <Box w={{base: "70px", md: "240px"}}>
          <Sidebar />
        </Box>
      ) : null}


      {/* PAGE CONTENT on the RIGHT side */}
      <Box flex={1} w={{base: "calc(100% - 70px", md: "calc(100% - 240px)"}}>{children}</Box>
    </Flex>
  )
}