import { logoutUser } from "@/actions/user";

export default function LogoutButton() {
  return (
    <form action={logoutUser}>
      <button
        type="submit"
        className="border px-4 py-2 rounded bg-red-500 text-white "
      >
        Logout
      </button>
    </form>
  );
}