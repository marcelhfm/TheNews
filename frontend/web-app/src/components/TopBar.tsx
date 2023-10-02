import { Button, DropdownMenu, Heading } from "@radix-ui/themes";
import { useNavigate } from "react-router";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import * as Separator from "@radix-ui/react-separator";
import { useAuth0 } from "@auth0/auth0-react";
import { LoadingSpinner } from "./LoadingSpinner";

export const TopBar = () => {
  const { loginWithRedirect, logout, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();

  return (
    <nav className="bg-white border-gray-200">
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-80 backdrop-blur-md z-50">
          <LoadingSpinner width="32px" height="32px" />
        </div>
      )}

      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Heading
          onClick={() => {
            navigate("/");
          }}
        >
          TheNews
        </Heading>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger></DropdownMenu.Trigger>
          <DropdownMenu.Content></DropdownMenu.Content>
        </DropdownMenu.Root>

        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <button className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
              <HamburgerMenuIcon />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item onClick={() => navigate("/")}>
              Home
            </DropdownMenu.Item>
            <DropdownMenu.Separator />
            {isAuthenticated ? (
              <DropdownMenu.Item onClick={() => logout()}>
                Log Out
              </DropdownMenu.Item>
            ) : (
              <>
                <DropdownMenu.Item
                  onClick={() => loginWithRedirect()}
                  color="blue"
                >
                  Log In
                </DropdownMenu.Item>
              </>
            )}
          </DropdownMenu.Content>
        </DropdownMenu.Root>

        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col justify-center align-middle p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
            <li>
              <Button
                size="3"
                variant="ghost"
                onClick={() => navigate("/")}
                color="gray"
              >
                Home
              </Button>
            </li>
            <li>
              <Separator.Root
                orientation="vertical"
                className="bg-gray-700 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px mx-[15px]"
                decorative
              />
            </li>
            {isAuthenticated ? (
              <li>
                <Button
                  variant="ghost"
                  size="3"
                  color="gray"
                  onClick={() => logout()}
                >
                  Log Out
                </Button>
              </li>
            ) : (
              <>
                <li>
                  <Button
                    variant="ghost"
                    size="3"
                    color="blue"
                    onClick={() => loginWithRedirect()}
                  >
                    Log In
                  </Button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
