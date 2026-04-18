import Svg, { Path, type SvgProps } from 'react-native-svg';

export type AppleLogoProps = Omit<SvgProps, 'viewBox'> & {
  size?: number;
  color?: string;
};

export function AppleLogo({ size = 18, color = '#ffffff', ...rest }: AppleLogoProps) {
  const height = (size * 22) / 20;
  return (
    <Svg width={size} height={height} viewBox="0 0 18 22" fill="none" {...rest}>
      <Path
        d="M14.94 11.69c-.03-2.84 2.32-4.2 2.43-4.27-1.32-1.94-3.39-2.2-4.12-2.23-1.76-.18-3.43 1.03-4.32 1.03-.9 0-2.27-1.01-3.73-.98-1.92.03-3.69 1.12-4.68 2.83-2 3.47-.51 8.6 1.44 11.41.95 1.38 2.08 2.93 3.56 2.87 1.43-.06 1.97-.93 3.7-.93 1.72 0 2.22.93 3.73.9 1.54-.03 2.52-1.4 3.46-2.79 1.09-1.6 1.54-3.15 1.56-3.23-.03-.01-2.99-1.14-3.03-4.55V11.69ZM12.11 3.34C12.89 2.4 13.42 1.1 13.27 0c-1.12.05-2.48.74-3.29 1.68-.72.83-1.36 2.16-1.19 3.24 1.25.1 2.53-.64 3.32-1.58Z"
        fill={color}
      />
    </Svg>
  );
}
