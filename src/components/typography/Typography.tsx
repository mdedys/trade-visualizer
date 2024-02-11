import { CSSProperties, PropsWithChildren } from "react";
import { styled } from "styled-components";

import typography from "../styles/typography";

type FontWeight = "400" | "500" | "600" | "700";
type Variant = "display" | "text";
type Size = "2xl" | "xl" | "lg" | "md" | "sm" | "xs";

interface Props {
  size?: Size;
  variant?: Variant;
  weight?: FontWeight;
}

function style(props: StyledProps<Props>) {
  const { $size = "md", $variant = "text", $weight = "400" } = props;
  const variant = typography[$variant];
  const size = variant[$size];
  return {
    fontSize: size.fontsize.rem,
    lineHeight: size.lineheight.rem,
    fontWeight: $weight,
  };
}

const Text = styled.span<StyledProps<Props>>`
  ${props => style(props)}
`;

interface TypographyProps extends Props {
  style?: CSSProperties;
}

export default function Typography(props: PropsWithChildren<TypographyProps>) {
  const { size, variant, weight, children, ...rest } = props;
  return (
    <Text $size={size} $variant={variant} $weight={weight} {...rest}>
      {children}
    </Text>
  );
}
