"use client";

export default function SignIn() {
  return (
    <>
      <div>
        <p>Sign In</p>
        <form>
          <input type="email" placeholder="Email" className="border" required />
          <input
            type="password"
            placeholder="Password"
            className="border"
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
}
