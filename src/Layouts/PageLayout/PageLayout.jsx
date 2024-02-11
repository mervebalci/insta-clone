import { Box, Flex, Spinner } from "@chakra-ui/react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import Navbar from "../../components/Navbar/Navbar";


/* instead of adding the Sidebar component to every page, 
   we can add it only once to the PageLayout component and wrap the children with it. 
   This way, we can have a sidebar on every page except the AuthPage. */

export default function PageLayout({children}) {
  const {pathname} = useLocation();
  const [user, loading] = useAuthState(auth);

  const canRenderSidebar = pathname !== "/auth" && user;
  const canRenderNavbar = !user && !loading && pathname !== "/auth";

  const checkingUserIsAuth = !user && loading
  if (checkingUserIsAuth) {
    <PageLayoutSpinner />
  }

  return (
    <Flex flexDir={canRenderNavbar ? "column" : "row"}>
      {/* SIDEBAR on the LEFT side */}
      {canRenderSidebar ? (
        <Box w={{base: "70px", md: "240px"}}>
          <Sidebar />
        </Box>
      ) : null}


      {/* NAVBAR */}
      {canRenderNavbar ? <Navbar /> : null}


      {/* PAGE CONTENT on the RIGHT side */}
      <Box flex={1} w={{base: "calc(100% - 70px", md: "calc(100% - 240px)"}} mx={"auto"}>{children}</Box>
    </Flex>
  )
}

function PageLayoutSpinner() {
  return (
    <Flex flexDir={"column"} h={"100vh"} alignItems={"center"} justifyContent={"center"}>
      <Spinner size={"xl"} />
    </Flex>
  )
}