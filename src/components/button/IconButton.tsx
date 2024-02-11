import { ComponentPropsWithoutRef } from "react";
import { styled, css } from "styled-components";

import * as styles from "./styles";
import Icons from "../icons/Icons";
import border from "../styles/border";
import variant from "../utils/variant";

interface Props {
  variant?: Omit<styles.Variant, "link">;
  size?: styles.Size;
}

const size = variant<styles.Size>("$size", {
  sm: css`
    padding: 0.5rem;
  `,
  md: css`
    padding: 0.625rem;
  `,
  lg: css`
    padding: 0.75rem;
  `,
  xl: css`
    padding: 0.875rem;
  `,
  "2xl": css`
    padding: 1rem;
  `,
});

const Button = styled.button<StyledProps<Props>>`
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: ${border.md};

  ${size};
  ${styles.color};
`;

interface IconButtonProps extends Props, ComponentPropsWithoutRef<"button"> {
  icon: keyof typeof Icons;
}

export default function IconButton(props: IconButtonProps) {
  const { icon, variant, size, ...rest } = props;
  const Icon = Icons[icon];
  return (
    <Button $variant={variant} $size={size} {...rest}>
      <Icon />
    </Button>
  );
}
