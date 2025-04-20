import React from "react";
import { Logo } from "./components/brand/atoms/Logo";
import { Header, ListBox, Text } from "react-aria-components";
import { Email } from "./components/sidebar/molecules/Email";

export function App() {
  return (
    <div className="bg-gray-50 grid grid-cols-[240px_1fr] grid-rows-[auto_1fr] h-screen w-full py-6 px-8 gap-4.5">
      <header className="col-span-2">
        <Logo aria-hidden />
      </header>

      <aside>
        <Header className="text-xl font-semibold text-gray-900">Inbox</Header>

        <Text className="block text-sm">{24} unread emails</Text>

        <div className="pt-4" />

        <ListBox className="-ms-4">
          <Email
            senderName="Amazon.com"
            subject="Your order has shipped"
            description="You've ordered a book about Antifragility by Nassim Nicholas Taleb"
          />

          <Email
            senderName="John Doe"
            subject="Hello, world!"
            description="Hello, how are you?"
          />
        </ListBox>
      </aside>

      <main className="bg-white rounded-lg border border-gray-300"></main>
    </div>
  );
}
