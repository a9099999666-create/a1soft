import type { ChannelId } from "@/lib/contacts";

export function ChannelIcon({ id }: { id: ChannelId }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (id === "telegram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path
          {...common}
          className="icon-path"
          d="M20.4 4.6 3.8 11.1c-.7.3-.7 1.2.1 1.5l3.9 1.2 1.5 4.7c.2.6 1 .8 1.5.4l2.2-1.8 3.9 2.9c.6.4 1.4.1 1.6-.6l3.1-13c.2-.8-.6-1.4-1.4-1z"
        />
        <path {...common} className="icon-path delay" d="m9.3 13.6 8.6-6.2-6 7.5-.4 3" />
      </svg>
    );
  }

  if (id === "whatsapp") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path
          {...common}
          className="icon-path"
          d="M6.2 18.4 5 21.2l2.9-1.1A8.7 8.7 0 1 0 6.2 18.4Z"
        />
        <path
          {...common}
          className="icon-path delay"
          d="M9.1 9.4c.2-.4.4-.4.7-.4h.6c.2 0 .4.1.5.4l.7 1.7c.1.2 0 .5-.2.6l-.5.4c-.2.2-.2.4 0 .6.3.4.8.9 1.3 1.3.2.2.5.2.6 0l.4-.5c.2-.2.4-.3.6-.2l1.7.7c.3.1.4.3.4.5v.6c0 .3 0 .5-.4.7A4.4 4.4 0 0 1 12 16a5 5 0 0 1-2.9-1.5 5 5 0 0 1-1.5-2.9c0-.9.4-1.3.7-1.6z"
        />
      </svg>
    );
  }

  if (id === "max") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden>
        <rect {...common} className="icon-path" x="4.2" y="4.2" width="15.6" height="15.6" rx="4.2" />
        <path {...common} className="icon-path delay" d="M8 15.2V8.8l4 4.2 4-4.2v6.4" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <rect {...common} className="icon-path" x="3.6" y="5.5" width="16.8" height="13" rx="2" />
      <path {...common} className="icon-path delay" d="m4.4 7.2 7.6 6.2 7.6-6.2" />
    </svg>
  );
}
