import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import styles from "./Button.module.css";

type Variant = "primary" | "outline" | "ghost";

interface BaseProps {
  variant?: Variant;
  children: ReactNode;
  className?: string;
}

type AsLink = BaseProps & { href: string } & Omit<
    ComponentProps<typeof Link>,
    "href" | "children" | "className"
  >;

type AsButton = BaseProps & { href?: undefined } & Omit<
    ComponentProps<"button">,
    "children" | "className"
  >;

export type ButtonProps = AsLink | AsButton;

export default function Button(props: ButtonProps) {
  const { variant = "primary", className = "", children } = props;
  const cls = `${styles.btn} ${styles[variant]} ${className}`;

  if ("href" in props && props.href !== undefined) {
    const { href, variant: _v, className: _c, children: _ch, ...rest } = props;
    void _v;
    void _c;
    void _ch;
    return (
      <Link href={href} className={cls} {...rest}>
        {children}
      </Link>
    );
  }

  const { variant: _v, className: _c, children: _ch, ...rest } = props;
  void _v;
  void _c;
  void _ch;
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
