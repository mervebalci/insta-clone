import Home from "./Home";
import Search from "./Search";
import Notifications from "./Notifications";
import CreatePost from "./CreatePost";
import ProfileLink from "./ProfileLink";

export default function SidebarItems() {
  return (
    <>
      <Home />
      <Search />
      <Notifications />
      <CreatePost />
      <ProfileLink />
    </>
  )
}