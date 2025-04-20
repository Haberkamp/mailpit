import React, { useState, useEffect } from "react";
import * as v from "valibot";
import { Logo } from "./components/brand/atoms/Logo";
import { Header, ListBox, Text } from "react-aria-components";
import { Email } from "./components/sidebar/molecules/Email";

const addressSchema = v.object({
  Name: v.optional(v.string(), ""),
  Address: v.string(),
});

const messageSummarySchema = v.object({
  ID: v.string(),
  From: v.optional(addressSchema),
  Subject: v.string(),
  Snippet: v.string(),
});

const messagesResponseSchema = v.object({
  messages_unread: v.number(),
  messages: v.array(messageSummarySchema),
});

type SimplifiedEmail = {
  id: string;
  senderName: string;
  subject: string;
  description: string;
};

type UseMailBoxReturn = {
  unreadCount: number;
  emails: SimplifiedEmail[];
};

function useMailBox(): UseMailBoxReturn {
  const [unreadCount, setUnreadCount] = useState(0);
  const [emails, setEmails] = useState<SimplifiedEmail[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await fetch("/api/v1/messages");
      const rawData = await response.json();
      const parsedData = v.parse(messagesResponseSchema, rawData);

      const simplifiedEmails = parsedData.messages.map(
        (msg): SimplifiedEmail => ({
          id: msg.ID,
          senderName: msg.From?.Name || msg.From?.Address || "Unknown Sender",
          subject: msg.Subject,
          description: msg.Snippet,
        })
      );

      setUnreadCount(parsedData.messages_unread);
      setEmails(simplifiedEmails);
    };

    fetchMessages();
  }, []);

  return { unreadCount, emails };
}

export function App() {
  const { unreadCount, emails } = useMailBox();

  return (
    <div className="bg-gray-50 grid grid-cols-[240px_1fr] grid-rows-[auto_1fr] h-screen w-full py-6 px-8 gap-4.5">
      <header className="col-span-2">
        <Logo aria-hidden />
      </header>

      <aside>
        <Header className="text-xl font-semibold text-gray-900">Inbox</Header>

        <Text className="block text-sm">{unreadCount} unread emails</Text>

        <div className="pt-4" />

        <ListBox className="-ms-4">
          {emails.map((email) => (
            <Email
              key={email.id}
              senderName={email.senderName}
              subject={email.subject}
              description={email.description}
            />
          ))}
        </ListBox>
      </aside>

      <main className="bg-white rounded-lg border border-gray-300"></main>
    </div>
  );
}
