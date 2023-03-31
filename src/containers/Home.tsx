import { ToolList } from "@/components/Home/Tool";
import { DefaultLayout } from "@/layouts/Default";
import { Text } from "@chakra-ui/react";

export const HomeContainer = () => {
  return (
    <DefaultLayout>
      <ToolList />
    </DefaultLayout>
  );
};
