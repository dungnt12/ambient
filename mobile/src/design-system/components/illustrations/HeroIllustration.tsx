import Svg, { Circle, G, Path } from 'react-native-svg';
import { useTheme } from '../../theme';

const VIEWBOX = 280;

type HeroStep = 'welcome' | 'signal' | 'hints';
type HeroIllustrationProps = { step: HeroStep; size?: number };
type SceneColors = ReturnType<typeof useTheme>['colors'];

export function HeroIllustration({ step, size = 280 }: HeroIllustrationProps) {
  const { colors } = useTheme();
  return (
    <Svg width={size} height={size} viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`} fill="none">
      {step === 'welcome' && <WelcomeScene colors={colors} />}
      {step === 'signal' && <SignalScene colors={colors} />}
      {step === 'hints' && <HintsScene colors={colors} />}
    </Svg>
  );
}

// Exact paths from Figma node 396:16
function WelcomeScene({ colors }: { colors: SceneColors }) {
  return (
    <G>
      <Path
        opacity={0.05}
        d="M140 230C189.706 230 230 189.706 230 140C230 90.2944 189.706 50 140 50C90.2944 50 50 90.2944 50 140C50 189.706 90.2944 230 140 230Z"
        fill={colors.brand}
      />
      <Path
        opacity={0.08}
        d="M140 200C173.137 200 200 173.137 200 140C200 106.863 173.137 80 140 80C106.863 80 80 106.863 80 140C80 173.137 106.863 200 140 200Z"
        fill={colors.brand}
      />
      <Path
        d="M140 185C145.523 185 150 180.523 150 175C150 169.477 145.523 165 140 165C134.477 165 130 169.477 130 175C130 180.523 134.477 185 140 185Z"
        fill={colors.brand}
      />
      <Path
        opacity={0.85}
        d="M92 132C102 128 120 126 138 128"
        stroke={colors.fgSubtle}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
      <Path
        opacity={0.7}
        d="M86 112C100 106 130 104 170 108C180 108 184 110 188 112"
        stroke={colors.fgSubtle}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
      <Path
        opacity={0.5}
        d="M96 92C110 88 140 86 170 88"
        stroke={colors.fgSubtle}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
      <Path
        opacity={0.6}
        d="M170 155C162 159.667 154.667 165.333 148 172"
        stroke={colors.brand}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </G>
  );
}

// Exact paths from Figma node 396:24
function SignalScene({ colors }: { colors: SceneColors }) {
  return (
    <G>
      <Path
        opacity={0.18}
        d="M140 255C203.513 255 255 203.513 255 140C255 76.4873 203.513 25 140 25C76.4873 25 25 76.4873 25 140C25 203.513 76.4873 255 140 255Z"
        stroke={colors.brand}
      />
      <Path
        opacity={0.35}
        d="M140 220C184.183 220 220 184.183 220 140C220 95.8172 184.183 60 140 60C95.8172 60 60 95.8172 60 140C60 184.183 95.8172 220 140 220Z"
        stroke={colors.brand}
        strokeWidth={1.3}
      />
      <Path
        opacity={0.6}
        d="M140 185C164.853 185 185 164.853 185 140C185 115.147 164.853 95 140 95C115.147 95 95 115.147 95 140C95 164.853 115.147 185 140 185Z"
        stroke={colors.brand}
        strokeWidth={1.6}
      />
      <Path
        d="M140 151C146.075 151 151 146.075 151 140C151 133.925 146.075 129 140 129C133.925 129 129 133.925 129 140C129 146.075 133.925 151 140 151Z"
        fill={colors.brand}
      />
      <Path
        opacity={0.85}
        d="M235 111C238.314 111 241 108.314 241 105C241 101.686 238.314 99 235 99C231.686 99 229 101.686 229 105C229 108.314 231.686 111 235 111Z"
        fill={colors.brandSoft}
      />
      <Path
        opacity={0.85}
        d="M58 171C61.3137 171 64 168.314 64 165C64 161.686 61.3137 159 58 159C54.6863 159 52 161.686 52 165C52 168.314 54.6863 171 58 171Z"
        fill={colors.brandSoft}
      />
      <Path
        opacity={0.85}
        d="M175 241C178.314 241 181 238.314 181 235C181 231.686 178.314 229 175 229C171.686 229 169 231.686 169 235C169 238.314 171.686 241 175 241Z"
        fill={colors.brandSoft}
      />
      <Path
        opacity={0.25}
        d="M150 135C180 121.667 206.667 112.667 230 108"
        stroke={colors.brand}
        strokeLinecap="round"
      />
      <Path
        opacity={0.25}
        d="M130 145C106.667 151.667 84 158 62 164"
        stroke={colors.brand}
        strokeLinecap="round"
      />
      <Path
        opacity={0.25}
        d="M145 150C156.333 176.667 165.667 203.333 173 230"
        stroke={colors.brand}
        strokeLinecap="round"
      />
    </G>
  );
}

// Exact paths from Figma node 396:35
function HintsScene({ colors }: { colors: SceneColors }) {
  return (
    <G>
      <Path
        opacity={0.04}
        d="M140 240C195.228 240 240 195.228 240 140C240 84.7715 195.228 40 140 40C84.7715 40 40 84.7715 40 140C40 195.228 84.7715 240 140 240Z"
        fill={colors.brand}
      />
      <Path
        opacity={0.7}
        d="M175 120C182.813 112.627 192.614 107.703 203.193 105.837C213.772 103.97 224.666 105.242 234.53 109.497C244.394 113.751 252.796 120.8 258.7 129.775C264.603 138.75 267.749 149.258 267.749 160C267.749 170.742 264.603 181.25 258.7 190.225C252.796 199.2 244.394 206.249 234.53 210.503C224.666 214.758 213.772 216.03 203.193 214.163C192.614 212.297 182.813 207.373 175 200C181.298 202.016 187.983 202.517 194.511 201.461C201.039 200.406 207.225 197.824 212.566 193.925C217.908 190.027 222.253 184.922 225.249 179.027C228.245 173.132 229.806 166.613 229.806 160C229.806 153.387 228.245 146.868 225.249 140.973C222.253 135.078 217.908 129.973 212.566 126.075C207.225 122.176 201.039 119.594 194.511 118.539C187.983 117.483 181.298 117.984 175 120Z"
        fill={colors.brand}
      />
      <Circle cx={108} cy={108} r={4} fill={colors.brand} />
      <Circle cx={92} cy={85} r={2} fill={colors.brand} opacity={0.6} />
      <Path
        opacity={0.5}
        d="M100 215C126.667 211.667 153.333 211.667 180 215"
        stroke={colors.fgSubtle}
        strokeWidth={1.6}
        strokeLinecap="round"
      />
    </G>
  );
}
