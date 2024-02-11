import { ComponentPropsWithoutRef, PropsWithChildren } from "react";
import { styled, css } from "styled-components";

import * as styles from "./styles";
import border from "../styles/border";
import typography from "../styles/typography";
import variant from "../utils/variant";

interface Props {
  variant?: styles.Variant;
  size?: styles.Size;
}

const size = variant<styles.Size>("$size", {
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
  ${styles.color};
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
