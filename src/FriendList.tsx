import { useLoaderData } from "react-router-dom";
import FriendsForm from "./FriendsForm";

export default function FriendList() {
  const curr = useLoaderData() as string[];
  return <FriendsForm curr={curr} />;
}
