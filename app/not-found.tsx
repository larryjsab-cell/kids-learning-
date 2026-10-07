import { PageStub } from "@/components/layout/PageStub";

export default function NotFound() {
  return (
    <PageStub
      title="This page wandered off"
      body="We couldn't find that page. It may have moved, or the link has a typo."
      links={[
        { href: "/", label: "Go to the home page" },
        { href: "/shop", label: "Browse the shop" },
      ]}
    />
  );
}
