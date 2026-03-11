import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from "@clerk/clerk-react";
import { useEffect } from "react";

const API = import.meta.env.VITE_API_URL;

function App() {
  useEffect(() => {
    fetch(`${API}/api/test`)
      .then(res => res.json())
      .then(data => console.log(data));
  }, []);

  return (
    <>
      <SignedOut>
        <SignInButton mode="modal" />
      </SignedOut>

      <SignedIn>
        <SignOutButton />
        <UserButton />
      </SignedIn>
    </>
  );
}

export default App;