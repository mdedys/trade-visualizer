import { ComponentPropsWithoutRef, PropsWithChildren } from "react";
import { styled, css } from "styled-components";

import border from "../styles/border";
import focus from "../styles/focus";
import typography from "../styles/typography";
import { cssvar, vars } from "../theme/vars";
import variant from "../utils/variant";

type Variant = "primary" | "secondary" | "link";
type Size = "sm" | "md" | "lg" | "xl" | "2xl";

interface Props {
  variant?: Variant;
  size?: Size;
}

const color = variant<Variant>("$variant", {
  primary: css`
    background: ${cssvar(vars.button.primary.bg)};
    border: 1px solid ${cssvar(vars.button.primary.border)};
    color: ${cssvar(vars.button.primary.fg)};
    &:hover {
      background: ${cssvar(vars.button.primary.bghover)};
      border: 1px solid ${cssvar(vars.button.primary.borderhover)};
      color: ${cssvar(vars.button.primary.fghover)};
    }
    &:active {
      background: ${cssvar(vars.button.primary.bg)};
      border: 1px solid ${cssvar(vars.button.primary.border)};
      box-shadow: ${focus.shadow.brandxs};
      color: ${cssvar(vars.button.primary.fg)};
    }
  `,
  secondary: css`
    background: ${cssvar(vars.button.secondary.bg)};
    border: 1px solid ${cssvar(vars.button.secondary.border)};
    color: ${cssvar(vars.button.secondary.fg)};
    &:hover {
      background: ${cssvar(vars.button.secondary.bghover)};
      border: 1px solid ${cssvar(vars.button.secondary.borderhover)};
      color: ${cssvar(vars.button.secondary.fghover)};
    }
    &:active {
      background: ${cssvar(vars.button.secondary.bg)};
      border: 1px solid ${cssvar(vars.button.secondary.border)};
      box-shadow: ${focus.shadow.grayxs};
      color: ${cssvar(vars.button.secondary.fg)};
    }
  `,
  link: css`
    background: none;
    border: none;
    color: ${cssvar(vars.button.tertiarycolor.fg)};
    padding: 0;
    &:hover {
      color: ${cssvar(vars.button.tertiarycolor.fghover)};
    }
    &:active {
      color: ${cssvar(vars.button.tertiarycolor.fg)};
    }
  `,
});

const size = variant<Size>("$size", {
  sm: css`
    gap: 4px;
    font-size: ${typography.text.sm};
    padding: 0.5rem 12px;
  `,
  md: css`
    gap: 4px;
    font-size: ${typography.text.sm};
    padding: 0.625rem 14px;
  `,
  lg: css`
    gap: 6px;
    font-size: ${typography.text.md};
    padding: 0.625rem 16px;
  `,
  xl: css`
    gap: 6px;
    font-size: ${typography.text.md};
    padding: 0.75rem 18px;
  `,
  "2xl": css`
    gap: 10px;
    font-size: ${typography.text.lg};
    padding: 1rem 22px;
  `,
});

const _Button = styled.button<StyledProps<Props>>`
  display: flex;
  align-items: center;

  border-radius: ${border.md};
  font-weight: 600;

  ${size};
  ${color};
`;

export interface ButtonProps
  extends Props,
    ComponentPropsWithoutRef<"button"> {}

function Button(props: PropsWithChildren<ButtonProps>) {
  const { variant = "primary", size = "lg", children, ...rest } = props;
  return (
    <_Button $variant={variant} $size={size} {...rest}>
      {children}
    </_Button>
  );
}

export default Button;
