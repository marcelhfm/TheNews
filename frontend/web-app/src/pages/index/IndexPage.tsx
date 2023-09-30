import { Flex, Button, Text } from "@radix-ui/themes";
import { trpc } from "../../utils/trpc";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

export const IndexPage = () => {
  const healthQuery = trpc.health.useQuery();
  const { login, register } = useKindeAuth();

  return (
    <Flex direction="column" gap="2">
      <Text>Hello from Radix Themes :)</Text>
      <Text>{healthQuery.data?.server}</Text>
      <Button onClick={login as any}>Sign In</Button>

      <Button onClick={register as any}>Register</Button>
    </Flex>
  );
};
