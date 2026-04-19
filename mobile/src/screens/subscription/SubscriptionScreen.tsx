import { useState, type ComponentType } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import {
  BellDot,
  CalendarHeart,
  Download,
  Sparkles,
  Users,
  type LucideProps,
} from 'lucide-react-native';
import {
  Card,
  CTAButton,
  EditorialHeader,
  ScreenLayout,
  Text,
  TextButton,
  useTheme,
} from '../../design-system';
import {
  SUBSCRIPTION_MONTHLY_PRICE,
  SUBSCRIPTION_YEARLY_PRICE,
  SUBSCRIPTION_YEARLY_SAVINGS_PERCENT,
} from '../../mocks/subscription';

type Cadence = 'monthly' | 'yearly';

export type SubscriptionScreenProps = {
  monthlyPrice?: string;
  yearlyPrice?: string;
  yearlySavingsPercent?: number;
  initialCadence?: Cadence;
  onStart?: (cadence: Cadence) => void;
  onBack?: () => void;
  onLater?: () => void;
};

type LucideIcon = ComponentType<LucideProps>;

const FEATURE_ICONS: readonly LucideIcon[] = [Users, Sparkles, CalendarHeart, BellDot, Download];

export function SubscriptionScreen({
  monthlyPrice = SUBSCRIPTION_MONTHLY_PRICE,
  yearlyPrice = SUBSCRIPTION_YEARLY_PRICE,
  yearlySavingsPercent = SUBSCRIPTION_YEARLY_SAVINGS_PERCENT,
  initialCadence = 'monthly',
  onStart,
  onBack,
  onLater,
}: SubscriptionScreenProps) {
  const t = useTheme();
  const { t: tr } = useTranslation();
  const [cadence, setCadence] = useState<Cadence>(initialCadence);

  const selectedPrice = cadence === 'monthly' ? monthlyPrice : yearlyPrice;
  const ctaKey =
    cadence === 'monthly' ? 'subscription.cta.startMonthly' : 'subscription.cta.startYearly';

  const header = (
    <EditorialHeader
      back={{ onPress: onBack }}
      overline={tr('subscription.eyebrow')}
      title={tr('subscription.title')}
      body={tr('subscription.body')}
    />
  );

  const footer = (
    <View
      style={{
        paddingHorizontal: t.layout.screenPaddingX,
        paddingBottom: t.spacing.lg,
        gap: t.spacing.md,
      }}
    >
      <CTAButton
        variant="dark"
        label={tr(ctaKey, { price: selectedPrice })}
        onPress={() => onStart?.(cadence)}
      />
      <TextButton label={tr('subscription.cta.later')} onPress={onLater ?? (() => {})} />
      <Text variant="bodySmall" color="fgFaint" align="center">
        {tr('subscription.trustNote')}
      </Text>
    </View>
  );

  return (
    <ScreenLayout header={header} footer={footer}>
      <View
        style={{
          paddingHorizontal: t.layout.screenPaddingX,
          paddingTop: t.spacing.xxl,
          gap: t.spacing.xl,
        }}
      >
        <View style={{ gap: t.spacing.md }}>
          <PlanOption
            cadence="monthly"
            selected={cadence === 'monthly'}
            price={monthlyPrice}
            onSelect={() => setCadence('monthly')}
          />
          <PlanOption
            cadence="yearly"
            selected={cadence === 'yearly'}
            price={yearlyPrice}
            savingsPercent={yearlySavingsPercent}
            onSelect={() => setCadence('yearly')}
          />
        </View>
        <FeatureList />
      </View>
    </ScreenLayout>
  );
}

function PlanOption({
  cadence,
  selected,
  price,
  savingsPercent,
  onSelect,
}: {
  cadence: Cadence;
  selected: boolean;
  price: string;
  savingsPercent?: number;
  onSelect: () => void;
}) {
  const t = useTheme();
  const { t: tr } = useTranslation();
  const eyebrow = tr(`subscription.plan.${cadence}.eyebrow`);
  const perLabel = tr(`subscription.plan.${cadence}.per`);
  const body = tr(`subscription.plan.${cadence}.body`);

  return (
    <Card
      tone={selected ? 'raised' : 'plain'}
      onPress={onSelect}
      accessibilityRole="radio"
      accessibilityLabel={`${eyebrow} ${price}`}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: t.spacing.base,
        borderColor: selected ? t.colors.brand : t.colors.borderSoft,
        borderWidth: t.brand.border.hairline,
      }}
    >
      <RadioDot selected={selected} />
      <View style={{ flex: 1, gap: t.spacing.xs }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing.sm }}>
          <Text variant="overline" color={selected ? 'brand' : 'fgFaint'}>
            {eyebrow}
          </Text>
          {cadence === 'yearly' && savingsPercent !== undefined ? (
            <SavingsPill percent={savingsPercent} />
          ) : null}
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: t.spacing.xs }}>
          <Text variant="headingSubLarge" color="fg">
            {price}
          </Text>
          <Text variant="bodyStandard" color="fgSubtle">
            {perLabel}
          </Text>
        </View>
        <Text variant="bodySmall" color="fgSubtle">
          {body}
        </Text>
      </View>
    </Card>
  );
}

function RadioDot({ selected }: { selected: boolean }) {
  const t = useTheme();
  const outer = t.layout.moodDot;
  const inner = outer - t.spacing.sm;
  return (
    <View
      style={{
        width: outer,
        height: outer,
        borderRadius: t.radius.pill,
        borderWidth: t.brand.border.hairline,
        borderColor: selected ? t.colors.brand : t.colors.border,
        backgroundColor: t.colors.bgRaised,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {selected ? (
        <View
          style={{
            width: inner,
            height: inner,
            borderRadius: t.radius.pill,
            backgroundColor: t.colors.brand,
          }}
        />
      ) : null}
    </View>
  );
}

function SavingsPill({ percent }: { percent: number }) {
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
        {tr('subscription.plan.savingsPill', { percent })}
      </Text>
    </View>
  );
}

function FeatureList() {
  const t = useTheme();
  const { t: tr } = useTranslation();
  const keys = ['circles', 'intelligence', 'meetups', 'rhythm', 'export'] as const;
  return (
    <View style={{ gap: t.spacing.lg }}>
      <Text variant="overline" color="fgFaint">
        {tr('subscription.features.eyebrow')}
      </Text>
      <View style={{ gap: t.spacing.base }}>
        {keys.map((key, i) => (
          <FeatureRow
            key={key}
            Icon={FEATURE_ICONS[i]}
            title={tr(`subscription.features.${key}.title`)}
            body={tr(`subscription.features.${key}.body`)}
          />
        ))}
      </View>
    </View>
  );
}

function FeatureRow({ Icon, title, body }: { Icon: LucideIcon; title: string; body: string }) {
  const t = useTheme();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: t.spacing.base }}>
      <View
        style={{
          width: t.layout.moodDot,
          height: t.layout.moodDot,
          borderRadius: t.radius.pill,
          backgroundColor: t.colors.bgRaised,
          borderColor: t.colors.borderSoft,
          borderWidth: t.brand.border.hairline,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: t.spacing.xxs,
        }}
      >
        <Icon size={t.iconSize.sm} strokeWidth={t.stroke.standard} color={t.colors.brand} />
      </View>
      <View style={{ flex: 1, gap: t.spacing.xxs }}>
        <Text variant="headingFeature" color="fg">
          {title}
        </Text>
        <Text variant="bodyStandard" color="fgSubtle">
          {body}
        </Text>
      </View>
    </View>
  );
}
