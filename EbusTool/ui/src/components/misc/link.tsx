type LinkProps = {
  link: string;
  linkText?: string;
};

export const Link: React.FC<LinkProps> = ({link, linkText}: LinkProps) => {
  return (
    <a href={link} target='_blank'>
      {linkText ? linkText : link}
    </a>
  );
};
