import Svg, { Circle, G, Path } from 'react-native-svg';
import { useTheme } from '../../theme';

const VIEWBOX = 280;
const CENTER = VIEWBOX / 2;

type HeroStep = 'welcome' | 'signal' | 'hints';

type HeroIllustrationProps = {
  step: HeroStep;
  size?: number;
};

export function HeroIllustration({ step, size = 280 }: HeroIllustrationProps) {
  const theme = useTheme();
  const { colors } = theme;

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`} fill="none">
      {step === 'welcome' && (
        <G>
          {/* Outer soft halo */}
          <Circle cx={CENTER} cy={CENTER} r={128} fill={colors.bgMuted} />
          {/* Orbit ring */}
          <Circle
            cx={CENTER}
            cy={CENTER}
            r={96}
            stroke={colors.border}
            strokeWidth={1.5}
            fill="none"
          />
          {/* Inner warm circle */}
          <Circle cx={CENTER} cy={CENTER} r={64} fill={colors.borderSoft} />
          {/* Faint inner ring */}
          <Circle
            cx={CENTER}
            cy={CENTER}
            r={40}
            stroke={colors.fgGhost}
            strokeWidth={1.5}
            fill="none"
          />
          {/* Small terracotta dot orbiting */}
          <Circle cx={CENTER + 96} cy={CENTER} r={10} fill={colors.brand} />
          {/* Tiny companion dot */}
          <Circle cx={CENTER - 64} cy={CENTER - 48} r={4} fill={colors.brandSoft} />
        </G>
      )}

      {step === 'signal' && (
        <G>
          {/* Outer pulse ring (faintest) */}
          <Circle
            cx={CENTER}
            cy={CENTER}
            r={120}
            stroke={colors.fgGhost}
            strokeWidth={1.5}
            fill="none"
          />
          {/* Mid pulse */}
          <Circle
            cx={CENTER}
            cy={CENTER}
            r={88}
            stroke={colors.fgFaint}
            strokeWidth={1.5}
            fill="none"
          />
          {/* Inner pulse */}
          <Circle
            cx={CENTER}
            cy={CENTER}
            r={56}
            stroke={colors.brandSoft}
            strokeWidth={2}
            fill="none"
          />
          {/* Core */}
          <Circle cx={CENTER} cy={CENTER} r={28} fill={colors.brand} />
          {/* Member dots around outer ring */}
          <Circle cx={CENTER} cy={CENTER - 120} r={6} fill={colors.brandSoft} />
          <Circle cx={CENTER + 104} cy={CENTER + 60} r={6} fill={colors.brandSoft} />
          <Circle cx={CENTER - 104} cy={CENTER + 60} r={6} fill={colors.brandSoft} />
        </G>
      )}

      {step === 'hints' && (
        <G>
          {/* Soft backdrop */}
          <Circle cx={CENTER} cy={CENTER} r={120} fill={colors.bgMuted} />
          {/* Crescent: full brand circle + offset bg circle to carve it */}
          <Circle cx={CENTER - 10} cy={CENTER} r={82} fill={colors.brand} />
          <Circle cx={CENTER + 18} cy={CENTER - 8} r={78} fill={colors.bgMuted} />
          {/* Faint sparkles */}
          <Path
            d={`M ${CENTER + 80} ${CENTER - 80} l 0 14 M ${CENTER + 73} ${CENTER - 73} l 14 0`}
            stroke={colors.brandSoft}
            strokeWidth={2}
            strokeLinecap="round"
          />
          <Path
            d={`M ${CENTER - 88} ${CENTER + 70} l 0 10 M ${CENTER - 93} ${CENTER + 75} l 10 0`}
            stroke={colors.fgFaint}
            strokeWidth={1.5}
            strokeLinecap="round"
          />
          <Circle cx={CENTER + 96} cy={CENTER + 40} r={3} fill={colors.fgFaint} />
          <Circle cx={CENTER - 56} cy={CENTER - 96} r={2.5} fill={colors.brandSoft} />
        </G>
      )}
    </Svg>
  );
}
