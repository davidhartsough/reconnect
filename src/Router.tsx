import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import App from "./App.tsx";
import FriendList from "./FriendList.tsx";
import { getFriends, getTodaysItem, setFriends } from "./s.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: () => {
      const friends = getFriends();
      if (friends.length === 0) return { friends, today: null };
      const today = getTodaysItem();
      return { friends, today };
    },
  },
  {
    path: "friends",
    element: <FriendList />,
    loader: getFriends,
    action: async ({ request }) => {
      const formData = await request.formData();
      const newList = formData.get("friends")!.toString();
      setFriends(newList.split("\n"));
      return redirect("/");
    },
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
