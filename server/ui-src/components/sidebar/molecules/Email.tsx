import React from "react";
import { Text, ListBoxItem } from "react-aria-components";

interface Props {
  senderName: string;
  subject: string;
  description: string;
}

export function Email({ senderName, subject, description }: Props) {
  return (
    <ListBoxItem className="p-4 outline-blue-500 rounded-lg cursor-pointer hover:bg-gray-200">
      <Text className="block font-semibold">{senderName}</Text>

      <Text className="block">{subject}</Text>

      <Text className="text-gray-500 text-sm line-clamp-2 text-pretty">
        {description}
      </Text>
    </ListBoxItem>
  );
}
