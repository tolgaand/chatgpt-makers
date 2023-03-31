import { Box, Button, Text } from "@chakra-ui/react";
import { ToolListItem } from ".";
import RouterLink from "next/link";

export const ToolItem = (props: ToolListItem) => {
  const { name, description, link } = props;

  return (
    <Box
      background="rgba(255, 255, 255, 0.02)"
      border="1px solid rgba(255, 255, 255, 0.03)"
      padding="1rem"
      cursor="pointer"
      transition="all 0.2s ease-in-out"
      borderRadius="0.5rem"
      boxShadow="0 0 0 1px rgba(255, 255, 255, 0.05)"
      _hover={{
        background: "rgba(255, 255, 255, 0.03)",
        border: "1px solid rgba(255, 255, 255, 0.05)",
      }}
    >
      <Text fontSize="30px" fontWeight="bold">
        {name}
      </Text>
      <Text fontSize="15px">{description}</Text>
      <Button
        as={RouterLink}
        href={link}
        size="sm"
        marginTop="20px"
        fontSize="16px"
      >
        Görüntüle
      </Button>
    </Box>
  );
};
