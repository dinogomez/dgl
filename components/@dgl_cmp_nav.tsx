import { Navbar, Button, Text } from "@nextui-org/react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import Link from "next/link";

const NavbarComponent = () => {
  //Supabase Database Handler
  const supabaseClient = useSupabaseClient();
  //User State from Supabase
  const user = useUser();
  //Next Router
  const router = useRouter();

  //Signout Handler Function
  //TODO: Rewrite routing
  function signOut() {
    supabaseClient.auth.signOut();
    router.push("/"); //route to index
  }
  return (
    <Navbar isBordered isCompact variant="sticky">
      <Navbar.Brand as={Link} href="/">
        <Text h2 weight="bold">
          eve
        </Text>
      </Navbar.Brand>

      {/* 
                <Navbar.Content>
                    <Navbar.Link href="/about">About</Navbar.Link> 
                </Navbar.Content>
                */}
      <Navbar.Content>
        {!user ? (
          /* if user object doesnt exist */
          <></>
        ) : (
          /* if user object does exist */
          /* TODO: Add username replace email */
          <>
            <Navbar.Link href="/menu">Menu</Navbar.Link>
          </>
        )}
      </Navbar.Content>

      <Navbar.Content>
        {!user ? (
          /* if user object doesnt exist */
          <>
            <Navbar.Link href="/login">
              <Button auto color="success">
                Login
              </Button>
            </Navbar.Link>
          </>
        ) : (
          /* if user object does exist */
          /* TODO: Add username replace email */
          <>
            <Navbar.Item>
              <Text>Hey, {user?.email}</Text>
            </Navbar.Item>

            <Navbar.Item>
              <Button auto color="secondary" onPress={() => signOut()}>
                Sign Out
              </Button>
            </Navbar.Item>
          </>
        )}
      </Navbar.Content>
    </Navbar>
  );
};

export default NavbarComponent;
