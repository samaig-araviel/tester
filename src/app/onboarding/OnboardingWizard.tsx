"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";
import ScreenTransition from "@/components/onboarding/ScreenTransition";
import WelcomeScreen from "./screens/WelcomeScreen";
import IntroductionScreen from "./screens/IntroductionScreen";
import AboutYouScreen from "./screens/AboutYouScreen";
import ChildCountScreen from "./screens/ChildCountScreen";
import ChildAgesScreen from "./screens/ChildAgesScreen";
import LocationScreen from "./screens/LocationScreen";
import SupportNeedsScreen from "./screens/SupportNeedsScreen";
import ReviewScreen from "./screens/ReviewScreen";
import DoneScreen from "./screens/DoneScreen";
import {
  saveIdentityType,
  saveChildInfo,
  saveChildAges,
  saveLocation,
  saveSupportNeeds,
  completeOnboarding,
} from "./actions";
import type { OnboardingData } from "@/lib/onboarding";

interface OnboardingWizardProps {
  initialData: OnboardingData;
}

const WELCOME_SCREEN = 0;
const INTRODUCTION_SCREEN = 1;
const FIRST_STEPPED_SCREEN = 2;
const REVIEW_SCREEN = 7;
const DONE_SCREEN = 8;

export default function OnboardingWizard({ initialData }: OnboardingWizardProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [currentScreen, setCurrentScreen] = useState(0);
  const [returnToReview, setReturnToReview] = useState(false);

  const [data, setData] = useState<OnboardingData>({
    identity_type: initialData.identity_type,
    child_count: initialData.child_count,
    is_expecting: initialData.is_expecting ?? false,
    child_age_buckets: initialData.child_age_buckets,
    postcode: initialData.postcode,
    support_needs: initialData.support_needs,
    onboarding_completed: initialData.onboarding_completed ?? false,
  });

  function goToDashboard() {
    router.push("/dashboard");
  }

  function advance() {
    if (returnToReview && currentScreen !== REVIEW_SCREEN) {
      setReturnToReview(false);
      setCurrentScreen(REVIEW_SCREEN);
    } else {
      setCurrentScreen((s) => s + 1);
    }
  }

  function goBack() {
    if (currentScreen > 0) {
      setCurrentScreen((s) => s - 1);
    }
  }

  function handleSkipEarly() {
    startTransition(async () => {
      await completeOnboarding();
      goToDashboard();
    });
  }

  function handleSkipStep() {
    advance();
  }

  function handleSkipAll() {
    startTransition(async () => {
      await completeOnboarding();
      goToDashboard();
    });
  }

  function handleSkipReview() {
    startTransition(async () => {
      await completeOnboarding();
      goToDashboard();
    });
  }

  function handleEditFromReview(screenIndex: number) {
    setReturnToReview(true);
    setCurrentScreen(screenIndex);
  }

  function renderScreen() {
    switch (currentScreen) {
      case WELCOME_SCREEN:
        return (
          <WelcomeScreen
            onNext={() => setCurrentScreen(INTRODUCTION_SCREEN)}
            onSkip={handleSkipEarly}
          />
        );
      case INTRODUCTION_SCREEN:
        return (
          <IntroductionScreen
            onNext={() => setCurrentScreen(FIRST_STEPPED_SCREEN)}
            onBack={goBack}
            onSkip={handleSkipEarly}
          />
        );
      case 2:
        return (
          <AboutYouScreen
            value={data.identity_type}
            onNext={(identityType) => {
              startTransition(async () => {
                await saveIdentityType(identityType);
                setData((d) => ({ ...d, identity_type: identityType }));
                advance();
              });
            }}
            onBack={goBack}
            onSkip={handleSkipStep}
            onSkipAll={handleSkipAll}
            isPending={isPending}
          />
        );
      case 3:
        return (
          <ChildCountScreen
            childCount={data.child_count}
            isExpecting={data.is_expecting}
            onNext={(childCount, isExpecting) => {
              startTransition(async () => {
                await saveChildInfo(childCount, isExpecting);
                setData((d) => ({ ...d, child_count: childCount, is_expecting: isExpecting }));
                advance();
              });
            }}
            onBack={goBack}
            onSkip={handleSkipStep}
            onSkipAll={handleSkipAll}
            isPending={isPending}
          />
        );
      case 4:
        return (
          <ChildAgesScreen
            value={data.child_age_buckets}
            onNext={(ageBuckets) => {
              startTransition(async () => {
                await saveChildAges(ageBuckets);
                setData((d) => ({ ...d, child_age_buckets: ageBuckets }));
                advance();
              });
            }}
            onBack={goBack}
            onSkip={handleSkipStep}
            onSkipAll={handleSkipAll}
            isPending={isPending}
          />
        );
      case 5:
        return (
          <LocationScreen
            postcode={data.postcode}
            onNext={(postcode) => {
              startTransition(async () => {
                await saveLocation(postcode);
                setData((d) => ({ ...d, postcode }));
                advance();
              });
            }}
            onBack={goBack}
            onSkip={handleSkipStep}
            onSkipAll={handleSkipAll}
            isPending={isPending}
          />
        );
      case 6:
        return (
          <SupportNeedsScreen
            value={data.support_needs}
            onNext={(needs) => {
              startTransition(async () => {
                await saveSupportNeeds(needs);
                setData((d) => ({ ...d, support_needs: needs }));
                advance();
              });
            }}
            onBack={goBack}
            onSkip={handleSkipStep}
            onSkipAll={handleSkipAll}
            isPending={isPending}
          />
        );
      case REVIEW_SCREEN:
        return (
          <ReviewScreen
            data={data}
            onConfirm={() => setCurrentScreen(DONE_SCREEN)}
            onBack={goBack}
            onSkip={handleSkipReview}
            onEdit={handleEditFromReview}
            isPending={isPending}
          />
        );
      case DONE_SCREEN:
        return (
          <DoneScreen
            onFinish={() => {
              startTransition(async () => {
                await completeOnboarding();
                goToDashboard();
              });
            }}
            isPending={isPending}
          />
        );
      default:
        return null;
    }
  }

  // Screens 0 and 1 are "intro" screens with the blue hero panel; from
  // screen 2 onwards the stepper drives the left panel.
  const isHero = currentScreen < FIRST_STEPPED_SCREEN;
  const stepIndex = Math.max(0, currentScreen - FIRST_STEPPED_SCREEN);

  return (
    <OnboardingLayout
      variant={isHero ? "hero" : "stepped"}
      stepIndex={stepIndex}
    >
      <ScreenTransition key={currentScreen}>{renderScreen()}</ScreenTransition>
    </OnboardingLayout>
  );
}
