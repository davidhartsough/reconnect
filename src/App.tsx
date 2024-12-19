import { Link, useLoaderData } from "react-router-dom";
import FriendsForm from "./FriendsForm";
import { getPrompts } from "./s";

export default function App() {
  const { friends, today } = useLoaderData() as {
    friends: string[];
    today: string;
  };
  if (friends.length === 0) {
    return (
      <section>
        <header>
          <h1>Welcome</h1>
          <p>Add your list of friends.</p>
        </header>
        <FriendsForm curr={[]} />
      </section>
    );
  }
  const date = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  return (
    <section>
      <header>
        <h3>{date}</h3>
        <h1>
          Connect with: <strong>{today}</strong>
        </h1>
      </header>
      <ul>
        {getPrompts(today).map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
      <hr />
      <footer>
        <Link to="/friends">Edit your friend list</Link>
      </footer>
    </section>
  );
}
