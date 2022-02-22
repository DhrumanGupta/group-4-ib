import NextLink from "next/link";

function Link({ href, children, ...props }) {
  return (
    <NextLink href={href}>
      <a {...props}>{children}</a>
    </NextLink>
  );
}

export default Link;
