import React, { useState, useEffect } from "react";
import * as v from "valibot";
import { Logo } from "./components/brand/atoms/Logo";
import { Header, ListBox, Text, Button } from "react-aria-components";
import { Email } from "./components/sidebar/molecules/Email";
import { useStableSpin } from "@stable-spin/react";
import { Skeleton } from "./components/loading/atoms/Skeleton";
import { SkeletonEmail } from "./components/sidebar/molecules/SkeletonEmail";

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
  setEmails: React.Dispatch<React.SetStateAction<SimplifiedEmail[]>>;
  setUnreadCount: React.Dispatch<React.SetStateAction<number>>;
};

function useMailBox(): UseMailBoxReturn & { isLoading: boolean } {
  const [unreadCount, setUnreadCount] = useState(0);
  const [emails, setEmails] = useState<SimplifiedEmail[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      setIsLoading(true);
      try {
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, []);

  return { unreadCount, emails, isLoading, setEmails, setUnreadCount };
}

export function App() {
  const { unreadCount, emails, isLoading, setEmails, setUnreadCount } =
    useMailBox();
  const showSkeleton = useStableSpin(isLoading, {
    delay: 0,
    minDuration: 400,
  });

  const handleDeleteAll = async () => {
    setEmails([]);
    setUnreadCount(0);

    try {
      const response = await fetch("/api/v1/messages", {
        method: "DELETE",
      });

      if (!response.ok) {
        console.error(
          "Failed to delete messages:",
          response.status,
          await response.text()
        );
      }
    } catch (error) {
      console.error("Error deleting messages:", error);
    }
  };

  return (
    <div className="bg-gray-50 grid grid-cols-[240px_1fr] grid-rows-[auto_1fr] h-screen w-full py-6 px-8 gap-4.5">
      <header className="col-span-2">
        <Logo aria-hidden />
      </header>

      <aside>
        <div className="flex items-center justify-between">
          <Header className="text-xl font-semibold text-gray-900">Inbox</Header>
          {emails.length > 0 && (
            <Button
              className="text-sm text-red-600 hover:text-red-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 rounded cursor-pointer"
              onPress={handleDeleteAll}
            >
              Delete All
            </Button>
          )}
        </div>

        {showSkeleton ? (
          <Skeleton className="h-3 my-1 w-32" />
        ) : isLoading ? null : (
          <Text className="block text-sm">{unreadCount} unread emails</Text>
        )}

        <div className="pt-4" />

        {showSkeleton ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="py-4">
              <SkeletonEmail />
            </div>
          ))
        ) : (
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
        )}
      </aside>

      <main className="bg-white rounded-lg border border-gray-300"></main>
    </div>
  );
}
