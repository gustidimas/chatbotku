"use client";

export default function SignUp() {
  return (
    <>
      <div>
        <p>SignUp</p>
        <form>
          <input type="email" placeholder="Email" className="border" required />
          <input
            type="password"
            placeholder="Password"
            className="border"
            required
          />
          <button type="submit">Register</button>
        </form>
      </div>
    </>
  );
}
