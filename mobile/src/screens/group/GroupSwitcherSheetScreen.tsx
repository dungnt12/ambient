import { Pressable, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ChevronRight, Plus, X } from 'lucide-react-native';
import {
  BottomSheetModal,
  Card,
  Text,
  useTheme,
  type ColorToken,
  type PulseMood,
  type Theme,
} from '../../design-system';
import type { GroupSummary, Tier } from '../../mocks/group';

export type GroupSwitcherSheetScreenProps = {
  groups: GroupSummary[];
  activeGroupId: string;
  tier: Tier;
  onSelectGroup: (id: string) => void;
  onCreateNew: () => void;
  onDismiss: () => void;
};

// Mirrors the mood vocabulary used on PulseMemberCard so the switcher dot and
// the pulse cards read as the same signal language.
const MOOD_DOT_COLORS: Record<PulseMood, ColorToken> = {
  1: 'ringStrong',
  2: 'ringSoft',
  3: 'borderSoft',
  4: 'brandSoft',
  5: 'brand',
  empty: 'bgMuted',
};

export function GroupSwitcherSheetScreen({
  groups,
  activeGroupId,
  tier,
  onSelectGroup,
  onCreateNew,
  onDismiss,
}: GroupSwitcherSheetScreenProps) {
  const t = useTheme();
  const { t: tr } = useTranslation();

  const locked = tier === 'free' && groups.length >= 1;

  return (
    <BottomSheetModal onDismiss={onDismiss}>
      {({ dismiss }) => (
        <>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Text variant="headingPulse" color="fg">
              {tr('group.switcher.title')}
            </Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={tr('group.switcher.close')}
              onPress={() => dismiss()}
              hitSlop={t.spacing.sm}
              style={({ pressed }) => ({
                padding: t.spacing.xs,
                opacity: pressed ? t.opacity.pressedSubtle : t.opacity.full,
              })}
            >
              <X size={t.iconSize.md} strokeWidth={t.stroke.standard} color={t.colors.fgFaint} />
            </Pressable>
          </View>

          <View style={{ gap: t.rhythm.list }}>
            {groups.map((g) => (
              <GroupRow
                key={g.id}
                group={g}
                active={g.id === activeGroupId}
                onPress={() => dismiss(() => onSelectGroup(g.id))}
              />
            ))}
            <NewGroupRow locked={locked} onPress={() => dismiss(() => onCreateNew())} />
          </View>
        </>
      )}
    </BottomSheetModal>
  );
}

function GroupRow({
  group,
  active,
  onPress,
}: {
  group: GroupSummary;
  active: boolean;
  onPress: () => void;
}) {
  const t = useTheme();
  const { t: tr } = useTranslation();
  return (
    <Card
      tone={active ? 'raised' : 'plain'}
      density="row"
      onPress={onPress}
      style={{ flexDirection: 'row', alignItems: 'center' }}
    >
      <ActiveIndicator active={active} />
      <MoodDot mood={group.aggregateMood} theme={t} />
      <View style={{ flex: 1, gap: t.spacing.xs }}>
        <Text variant="buttonLabelSocial" color="fg">
          {group.name}
        </Text>
        <Text variant="metaLabel" color="fgFaint">
          {tr('group.switcher.memberCount', { count: group.memberCount })}
        </Text>
      </View>
      <ChevronRight size={t.iconSize.sm} strokeWidth={t.stroke.standard} color={t.colors.fgFaint} />
    </Card>
  );
}

function ActiveIndicator({ active }: { active: boolean }) {
  const t = useTheme();
  const size = t.spacing.sm;
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: t.radius.pill,
        backgroundColor: active ? t.colors.brand : 'transparent',
      }}
    />
  );
}

function MoodDot({ mood, theme }: { mood: PulseMood; theme: Theme }) {
  return (
    <View
      style={{
        width: theme.layout.moodDot,
        height: theme.layout.moodDot,
        borderRadius: theme.radius.pill,
        backgroundColor: theme.colors[MOOD_DOT_COLORS[mood]],
      }}
    />
  );
}

function NewGroupRow({ locked, onPress }: { locked: boolean; onPress: () => void }) {
  const t = useTheme();
  const { t: tr } = useTranslation();
  const textColor: ColorToken = locked ? 'fgFaint' : 'fg';

  return (
    <Card
      tone="plain"
      density="row"
      pressable={{ disabled: locked }}
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderStyle: 'dashed',
      }}
    >
      <View style={{ width: t.spacing.sm, height: t.spacing.sm }} />
      <View
        style={{
          width: t.layout.moodDot,
          height: t.layout.moodDot,
          borderRadius: t.radius.pill,
          backgroundColor: t.colors.bgMuted,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Plus size={t.iconSize.sm} strokeWidth={t.stroke.standard} color={t.colors.fgFaint} />
      </View>
      <Text variant="buttonLabelSocial" color={textColor} style={{ flex: 1 }}>
        {tr('group.switcher.newGroup')}
      </Text>
      {locked ? <ProPill /> : null}
    </Card>
  );
}

function ProPill() {
  const t = useTheme();
  const { t: tr } = useTranslation();
  return (
    <View
      style={{
        paddingHorizontal: t.spacing.sm,
        paddingVertical: t.spacing.xxs,
        borderRadius: t.radius.pill,
        backgroundColor: t.colors.brand,
      }}
    >
      <Text variant="metaLabel" color="fgOnBrand">
        {tr('group.switcher.proBadge')}
      </Text>
    </View>
  );
}
