import { SimpleGrid } from "@chakra-ui/react";
import { ToolItem } from "./Item";

export type ToolListItem = {
  name: string;
  description: string;
  link: string;
};

const toolList: ToolListItem[] = [
  {
    name: "Makale",
    description:
      "Bu araç, makalelerinizi yazarken kullanabileceğiniz bir araçtır.",
    link: "/create-article",
  },
];

export const ToolList = () => {
  return (
    <SimpleGrid
      spacing={4}
      templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
    >
      {toolList.map((tool) => (
        <ToolItem
          name={tool.name}
          description={tool.description}
          link={tool.link}
        />
      ))}
    </SimpleGrid>
  );
};
