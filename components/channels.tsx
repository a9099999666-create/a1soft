import { ChannelIcon } from "@/components/channel-icon";
import { channels } from "@/lib/contacts";
import type { Lang } from "@/lib/i18n";

export function Channels({ lang }: { lang: Lang }) {
  return (
    <ul className="channels">
      {channels.map((channel) => {
        const external = channel.href.startsWith("http");
        return (
          <li key={channel.id}>
            <a
              className="channel"
              href={channel.href}
              aria-label={channel[lang]}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              <span className="channel-orb" aria-hidden />
              <ChannelIcon id={channel.id} />
              <span className="channel-name">{channel[lang]}</span>
              <span className="channel-trail" aria-hidden />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
