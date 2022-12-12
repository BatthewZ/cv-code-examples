type LinkProps = {
  url: string;
  linkText?: string;
};

export const Link: React.FC<LinkProps> = ({url: link, linkText}: LinkProps) => {
  return (
    <a href={link} target='_blank'>
      {linkText ? linkText : link}
    </a>
  );
};
