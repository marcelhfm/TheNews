import { Flex, Button, Text } from "@radix-ui/themes";
import { trpc } from "../utils/trpc";

export const IndexPage = () => {
  const healthQuery = trpc.health.useQuery();

  return (
    <Flex direction="column" gap="2">
      <Text>Hello from Radix Themes :)</Text>
      <Text>{healthQuery.data?.server}</Text>
      <Button>Let's go</Button>
    </Flex>
  );
};
