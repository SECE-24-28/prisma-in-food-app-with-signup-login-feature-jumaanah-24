import { loginUser } from "@/actions/user";

export default function Login() {
    
  return (
    <div className="p-8 mx-auto border rounded w-100  mt-8 justify-center">
      <h1 className="text-2xl font-bold mb-6">Login</h1>

      <form action={loginUser}>
        <div className="mb-4">
          <label>Email</label>
          <br />
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            required
            className="border p-2  rounded"
          />
        </div>

        <div className="mb-4">
          <label>Password</label>
          <br />
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            required
            className="border p-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="border px-4 py-2 rounded bg-blue-500 text-white"
        >
          Login
        </button>
      </form>

      <p className="mt-4">
        New User - <a href="/signup">Register</a>
      </p>
    </div>
  );
}