import { Form, useNavigation } from "react-router-dom";

export default function FriendsForm({ curr }: { curr: string[] }) {
  const navigation = useNavigation();
  const busy = navigation.state === "submitting";
  return (
    <Form action="/friends" method="post">
      <fieldset disabled={busy}>
        <label htmlFor="friends">
          Put the name of each person on a separate line.
        </label>
        <textarea
          name="friends"
          id="friends"
          placeholder="List your friends' names here, one per line."
          rows={16}
          minLength={5}
          defaultValue={curr.join("\n")}
          required
          autoFocus
        ></textarea>
        <button type="submit" disabled={busy}>
          {busy ? "Saving" : "Save"}
        </button>
      </fieldset>
    </Form>
  );
}
