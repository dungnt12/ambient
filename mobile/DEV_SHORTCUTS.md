# Dev shortcuts (REMOVE before ship)

Mock/test-only hacks. Xóa hết trước khi release.

## Triple-tap skip auth on Onboarding

**What:** Tap 3 lần (trong 600ms) vào góc **trên-trái** màn `OnboardingWelcomeScreen` (vùng vô hình 64×64) → reset navigation thẳng vào `Tabs/Journal`, bỏ qua toàn bộ flow auth.

**Why:** Để dev test nhanh các màn sau auth mà không phải nhập email/OTP mỗi lần.

**Files cần dọn:**

- `mobile/src/screens/onboarding/OnboardingWelcomeScreen.tsx`
  - Prop `onDevSkipAuth?: () => void`
  - Refs `devTapCount`, `devTapTimer`
  - Hàm `handleDevTap`
  - `<Pressable accessibilityLabel="dev-skip-auth" ... />` overlay đầu `<View style={{ flex: 1 }}>`
- `mobile/src/navigation/RootNavigator.tsx` — bỏ prop `onDevSkipAuth={...}` trong `OnboardingRoute`.
- File này (`mobile/DEV_SHORTCUTS.md`).
