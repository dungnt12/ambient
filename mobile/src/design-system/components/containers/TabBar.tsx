import { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, View, type ViewStyle } from 'react-native';
import { BookOpen, Home, Plus, User, Users, type LucideIcon } from 'lucide-react-native';
import { Text } from '../Text';
import { useTheme, type Theme } from '../../theme';
import { palette } from '../../tokens/colors';

export type TabKey = 'garden' | 'journal' | 'group' | 'you';

export type TabBarLabels = Record<TabKey, string>;

export type TabBarProps = {
  active: TabKey;
  onChange: (tab: TabKey) => void;
  onFabPress?: () => void;
  labels?: Partial<TabBarLabels>;
  style?: ViewStyle;
};

const BAR_WIDTH = 358;
const ACTIVE_PILL_HEIGHT = 28;
const ACTIVE_PILL_WIDTH = 40;
const ACTIVE_PILL_RADIUS = 14;
const ACTIVE_BG_OPACITY = '1a'; // ~0.1 alpha on the brand terracotta
const PRESS_SCALE = 0.92;
const FAB_SIZE = 48;
const FAB_SHADOW_OPACITY = 0.35;
const FAB_PRESS_SCALE = 0.9;
const GLASS_BORDER_ALPHA = '99'; // ~0.6 alpha — matches Figma rgba(255,255,255,0.6)
const GLASS_BORDER_COLOR = `${palette.surface.white}${GLASS_BORDER_ALPHA}`;

const DEFAULT_LABELS: TabBarLabels = {
  garden: 'Garden',
  journal: 'Journal',
  group: 'Group',
  you: 'You',
};

type TabDef = { key: TabKey; icon: LucideIcon };
const LEFT_TABS: TabDef[] = [
  { key: 'garden', icon: Home },
  { key: 'journal', icon: BookOpen },
];
const RIGHT_TABS: TabDef[] = [
  { key: 'group', icon: Users },
  { key: 'you', icon: User },
];
const TABS: TabDef[] = [...LEFT_TABS, ...RIGHT_TABS];

type PillFrame = { x: number; y: number; w: number; h: number };

type TabButtonProps = {
  tab: TabDef;
  label: string;
  isActive: boolean;
  pressScale: Animated.Value;
  pillRef: (node: View | null) => void;
  onMeasure: () => void;
  onPress: () => void;
  t: Theme;
};

function TabButton({
  tab,
  label,
  isActive,
  pressScale,
  pillRef,
  onMeasure,
  onPress,
  t,
}: TabButtonProps) {
  const { icon: Icon } = tab;
  const color = isActive ? t.colors.brand : t.colors.fgFaint;
  return (
    <Pressable
      accessibilityRole="tab"
      accessibilityState={{ selected: isActive }}
      onPress={onPress}
      onPressIn={() => {
        Animated.spring(pressScale, {
          toValue: PRESS_SCALE,
          useNativeDriver: false,
          damping: 20,
          stiffness: 400,
          mass: 0.6,
        }).start();
      }}
      onPressOut={() => {
        Animated.spring(pressScale, {
          toValue: 1,
          useNativeDriver: false,
          damping: 14,
          stiffness: 260,
          mass: 0.7,
        }).start();
      }}
      style={{
        flex: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        gap: t.spacing.xs,
      }}
    >
      <Animated.View
        style={{ alignItems: 'center', transform: [{ scale: pressScale }], gap: t.spacing.xs }}
      >
        <View
          ref={pillRef}
          onLayout={onMeasure}
          style={{
            width: ACTIVE_PILL_WIDTH,
            height: ACTIVE_PILL_HEIGHT,
            borderRadius: ACTIVE_PILL_RADIUS,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon color={color} size={t.iconSize.tab} strokeWidth={t.stroke.standard} />
        </View>
        <Text variant="overline" style={{ color, textAlign: 'center' }}>
          {label}
        </Text>
      </Animated.View>
    </Pressable>
  );
}

type CenterFabProps = { t: Theme; onPress?: () => void };

function CenterFab({ t, onPress }: CenterFabProps) {
  const scale = useRef(new Animated.Value(1)).current;
  return (
    <View style={{ width: FAB_SIZE + t.spacing.xs * 2, alignItems: 'center' }}>
      <Animated.View
        style={{
          width: FAB_SIZE,
          height: FAB_SIZE,
          borderRadius: FAB_SIZE / 2,
          backgroundColor: t.colors.brand,
          alignItems: 'center',
          justifyContent: 'center',
          transform: [{ scale }],
          shadowColor: t.colors.brand,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: FAB_SHADOW_OPACITY,
          shadowRadius: 12,
          elevation: 6,
        }}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="New entry"
          onPress={onPress}
          onPressIn={() => {
            Animated.spring(scale, {
              toValue: FAB_PRESS_SCALE,
              useNativeDriver: false,
              damping: 18,
              stiffness: 380,
              mass: 0.6,
            }).start();
          }}
          onPressOut={() => {
            Animated.spring(scale, {
              toValue: 1,
              useNativeDriver: false,
              damping: 10,
              stiffness: 220,
              mass: 0.7,
            }).start();
          }}
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Plus color={t.colors.fgOnBrand} size={t.iconSize.lg} strokeWidth={t.stroke.standard} />
        </Pressable>
      </Animated.View>
    </View>
  );
}

/**
 * TabBar — 358×68 pill container with 4 tabs + center FAB (Figma node 125:115).
 * Sliding brand-tint indicator springs between tabs; active icon bounces.
 */
export function TabBar({ active, onChange, onFabPress, labels, style }: TabBarProps) {
  const t = useTheme();
  const resolved = { ...DEFAULT_LABELS, ...labels };
  const activeTint = `${t.colors.brand}${ACTIVE_BG_OPACITY}`;

  const activeIndex = TABS.findIndex((tab) => tab.key === active);

  const progress = useRef(new Animated.Value(activeIndex)).current;
  const pressScales = useRef(TABS.map(() => new Animated.Value(1))).current;

  const barRef = useRef<View>(null);
  const pillRefs = useRef<(View | null)[]>([]);
  const [pillFrames, setPillFrames] = useState<PillFrame[]>([]);

  useEffect(() => {
    Animated.spring(progress, {
      toValue: activeIndex,
      useNativeDriver: false,
      damping: 18,
      stiffness: 220,
      mass: 0.9,
      overshootClamping: false,
    }).start();
  }, [activeIndex, progress]);

  const measureFrames = () => {
    const bar = barRef.current;
    if (!bar) return;
    pillRefs.current.forEach((pill, i) => {
      if (!pill) return;
      pill.measureLayout(
        bar as unknown as number,
        (x, y, w, h) => {
          setPillFrames((prev) => {
            const next = prev.slice();
            const existing = next[i];
            if (existing && existing.x === x && existing.y === y && existing.w === w) return prev;
            next[i] = { x, y, w, h };
            return next;
          });
        },
        () => {},
      );
    });
  };

  const framesReady = pillFrames.length === TABS.length && pillFrames.every(Boolean);
  const indicatorTranslateX = framesReady
    ? progress.interpolate({
        inputRange: pillFrames.map((_, i) => i),
        outputRange: pillFrames.map((f) => f.x),
      })
    : 0;

  const renderTab = (tab: TabDef, absoluteIndex: number) => (
    <TabButton
      key={tab.key}
      tab={tab}
      label={resolved[tab.key]}
      isActive={tab.key === active}
      pressScale={pressScales[absoluteIndex]}
      pillRef={(node) => {
        pillRefs.current[absoluteIndex] = node;
      }}
      onMeasure={measureFrames}
      onPress={() => onChange(tab.key)}
      t={t}
    />
  );

  return (
    <View
      ref={barRef}
      onLayout={measureFrames}
      style={[
        {
          width: BAR_WIDTH,
          height: t.layout.tabBarHeight,
          borderRadius: t.radius.pill,
          backgroundColor: t.colors.bgRaised,
          borderWidth: t.brand.border.hairline,
          borderColor: GLASS_BORDER_COLOR,
          flexDirection: 'row',
          alignItems: 'center',
          overflow: 'hidden',
          ...t.shadow.ringDeep,
        },
        style,
      ]}
    >
      {framesReady && (
        <Animated.View
          pointerEvents="none"
          style={{
            position: 'absolute',
            left: 0,
            top: pillFrames[0].y,
            width: pillFrames[0].w,
            height: pillFrames[0].h,
            borderRadius: ACTIVE_PILL_RADIUS,
            backgroundColor: activeTint,
            transform: [{ translateX: indicatorTranslateX }],
          }}
        />
      )}

      {LEFT_TABS.map((tab, i) => renderTab(tab, i))}
      <CenterFab t={t} onPress={onFabPress} />
      {RIGHT_TABS.map((tab, i) => renderTab(tab, LEFT_TABS.length + i))}
    </View>
  );
}
